import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DISCIPLINES_DIR = ROOT / "disciplinas"
DATA_DIR = ROOT / "data"

LIST_RE = re.compile(r"^(\s*)([-*+]|\d+[.)])\s+(.*)$")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*?)\s*#*\s*$")
HR_RE = re.compile(r"^\s{0,3}([-*_])(\s*\1){2,}\s*$")
FENCE_RE = re.compile(r"^\s*(```+|~~~+)\s*([\w+-]*)\s*$")
TABLE_SEP_RE = re.compile(r"^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$")
LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)\s]+)\)")


class BuildError(Exception):
    pass


def escape(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


class LinkResolver:
    def __init__(self, topic_ids):
        self.topic_ids = topic_ids

    def resolve(self, href, source):
        if re.match(r"^https?://", href):
            return href, True
        if re.match(r"^[a-z][a-z0-9+.-]*:", href, re.I) or href.startswith("#"):
            raise BuildError(f"{source}: unsupported link {href}")
        if "#" in href:
            raise BuildError(f"{source}: link with fragment not supported: {href}")
        target = (source.parent / href).resolve()
        try:
            rel = target.relative_to(DISCIPLINES_DIR.resolve())
        except ValueError:
            raise BuildError(f"{source}: link outside disciplinas: {href}")
        if not target.is_file():
            raise BuildError(f"{source}: link target does not exist: {href}")
        parts = rel.parts
        if parts == ("study-roadmap.md",):
            return "#trilha", False
        match = re.match(r"^(\d{2})-", parts[0])
        if not match:
            raise BuildError(f"{source}: unresolvable link: {href}")
        disc = match.group(1)
        if len(parts) == 2 and parts[1] == "README.md":
            return f"#d/{disc}", False
        if len(parts) == 2 and parts[1] == "exam-answers.md":
            return f"#prova/{disc}", False
        if len(parts) == 3 and parts[1] == "projeto-de-leitura":
            name = parts[2]
            if name == "study-priorities.md":
                return f"#vale/{disc}", False
            if name == "README.md":
                return f"#d/{disc}", False
            topic = re.match(r"^(\d{2})-", name)
            if topic:
                topic_id = f"D{int(disc)}-{topic.group(1)}"
                if topic_id not in self.topic_ids:
                    raise BuildError(f"{source}: topic {topic_id} not found in data/d{disc}.js ({href})")
                return f"#{topic_id}", False
        raise BuildError(f"{source}: unresolvable link: {href}")


def render_inline(text, resolver, source):
    stash = []

    def keep(html):
        stash.append(html)
        return f"\x00{len(stash) - 1}\x00"

    def code_span(match):
        return keep(f"<code>{escape(match.group(2))}</code>")

    text = re.sub(r"(`+)(.+?)\1", code_span, text)

    def link(match):
        href, external = resolver.resolve(match.group(2), source)
        label = render_inline(match.group(1), resolver, source)
        attrs = ' target="_blank" rel="noopener"' if external else ""
        return keep(f'<a href="{escape(href)}"{attrs}>{label}</a>')

    text = LINK_RE.sub(link, text)
    text = escape(text)
    text = re.sub(r"\*\*(?=\S)(.+?)(?<=\S)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*(?=[^\s*])(.+?)(?<=[^\s*])\*(?![\w*])", r"<em>\1</em>", text)
    text = re.sub(r"(?<![\w])_(?=[^\s_])(.+?)(?<=[^\s_])_(?![\w])", r"<em>\1</em>", text)
    text = re.sub(r"\\([\\`*_{}\[\]()#+\-.!|])", r"\1", text)

    def restore(match):
        return stash[int(match.group(1))]

    while "\x00" in text:
        text = re.sub(r"\x00(\d+)\x00", restore, text)
    return text


def split_row(line):
    line = line.strip()
    if line.startswith("|"):
        line = line[1:]
    if line.endswith("|") and not line.endswith("\\|"):
        line = line[:-1]
    return [cell.strip().replace("\\|", "|") for cell in re.split(r"(?<!\\)\|", line)]


def is_block_start(line, next_line):
    return bool(
        HEADING_RE.match(line)
        or FENCE_RE.match(line)
        or HR_RE.match(line)
        or line.lstrip().startswith(">")
        or LIST_RE.match(line)
        or (line.lstrip().startswith("|") and next_line is not None and TABLE_SEP_RE.match(next_line))
    )


class Converter:
    def __init__(self, resolver, source):
        self.resolver = resolver
        self.source = source

    def inline(self, text):
        return render_inline(text, self.resolver, self.source)

    def blocks(self, lines, tight=False):
        out = []
        i = 0
        n = len(lines)
        while i < n:
            line = lines[i]
            if not line.strip():
                i += 1
                continue
            fence = FENCE_RE.match(line)
            if fence:
                marker = fence.group(1)
                lang = fence.group(2)
                i += 1
                body = []
                while i < n and not lines[i].strip().startswith(marker):
                    body.append(lines[i])
                    i += 1
                if i >= n:
                    raise BuildError(f"{self.source}: unterminated code fence")
                i += 1
                cls = f' class="language-{escape(lang)}"' if lang else ""
                out.append(f'<pre class="code"><code{cls}>{escape(chr(10).join(body))}</code></pre>')
                continue
            heading = HEADING_RE.match(line)
            if heading:
                level = len(heading.group(1))
                out.append(f"<h{level}>{self.inline(heading.group(2))}</h{level}>")
                i += 1
                continue
            if HR_RE.match(line):
                out.append("<hr>")
                i += 1
                continue
            nxt = lines[i + 1] if i + 1 < n else None
            if line.lstrip().startswith("|") and nxt is not None and TABLE_SEP_RE.match(nxt):
                header = split_row(line)
                aligns = []
                for cell in split_row(nxt):
                    left, right = cell.startswith(":"), cell.endswith(":")
                    aligns.append("center" if left and right else "right" if right else "left" if left else "")
                i += 2
                rows = []
                while i < n and lines[i].strip().startswith("|"):
                    rows.append(split_row(lines[i]))
                    i += 1

                def cell_html(tag, text, idx):
                    align = aligns[idx] if idx < len(aligns) and aligns[idx] else ""
                    style = f' style="text-align:{align}"' if align else ""
                    return f"<{tag}{style}>{self.inline(text)}</{tag}>"

                head_html = "".join(cell_html("th", c, k) for k, c in enumerate(header))
                body_html = "".join(
                    "<tr>" + "".join(cell_html("td", c, k) for k, c in enumerate(row)) + "</tr>" for row in rows
                )
                out.append(
                    f'<div class="table-wrap"><table><thead><tr>{head_html}</tr></thead><tbody>{body_html}</tbody></table></div>'
                )
                continue
            if line.lstrip().startswith(">"):
                quoted = []
                while i < n and lines[i].lstrip().startswith(">"):
                    quoted.append(re.sub(r"^\s*>\s?", "", lines[i]))
                    i += 1
                out.append(f"<blockquote>{self.blocks(quoted)}</blockquote>")
                continue
            if LIST_RE.match(line):
                html, i = self.list_block(lines, i)
                out.append(html)
                continue
            para = [line.strip()]
            i += 1
            while i < n and lines[i].strip():
                nxt2 = lines[i + 1] if i + 1 < n else None
                if is_block_start(lines[i], nxt2):
                    break
                para.append(lines[i].strip())
                i += 1
            text = " ".join(para)
            html = self.inline(text)
            out.append(html if tight else f"<p>{html}</p>")
        return "".join(out)

    def list_block(self, lines, i):
        n = len(lines)
        first = LIST_RE.match(lines[i])
        base = len(first.group(1).expandtabs(4))
        ordered = bool(re.match(r"\d", first.group(2)))
        start = int(re.match(r"\d+", first.group(2)).group()) if ordered else 1
        items = []
        while i < n:
            match = LIST_RE.match(lines[i])
            if not match or len(match.group(1).expandtabs(4)) != base:
                break
            if bool(re.match(r"\d", match.group(2))) != ordered:
                break
            content_indent = base + len(match.group(2)) + 1
            body = [match.group(3)]
            i += 1
            while i < n:
                cur = lines[i]
                if not cur.strip():
                    j = i
                    while j < n and not lines[j].strip():
                        j += 1
                    if j < n and len(lines[j]) - len(lines[j].lstrip()) > base:
                        body.extend([""] * (j - i))
                        i = j
                        continue
                    break
                indent = len(cur) - len(cur.lstrip())
                if indent > base:
                    body.append(cur[min(indent, content_indent):])
                    i += 1
                    continue
                if indent == base and LIST_RE.match(cur):
                    break
                if body[-1].strip() and not is_block_start(cur, None):
                    body.append(cur.strip())
                    i += 1
                    continue
                break
            items.append(body)
            while i < n and not lines[i].strip() and i + 1 < n and LIST_RE.match(lines[i + 1]) and len(
                lines[i + 1]
            ) - len(lines[i + 1].lstrip()) == base:
                i += 1
        tag = "ol" if ordered else "ul"
        attr = f' start="{start}"' if ordered and start != 1 else ""
        rendered = "".join(f"<li>{self.item(body)}</li>" for body in items)
        return f"<{tag}{attr}>{rendered}</{tag}>", i

    def item(self, body):
        return self.blocks(body, tight=not any(not line.strip() for line in body))


def extract_title(markdown_text, source):
    lines = markdown_text.split("\n")
    for idx, line in enumerate(lines):
        if line.strip():
            match = re.match(r"^#\s+(.*?)\s*$", line)
            if not match:
                raise BuildError(f"{source}: first block is not an h1")
            return match.group(1), "\n".join(lines[idx + 1:])
    raise BuildError(f"{source}: empty file")


def load_topic_ids():
    ids = set()
    for path in sorted(DATA_DIR.glob("d[0-9][0-9].js")):
        ids.update(re.findall(r'"id":\s*"(D\d+-\d+)"', path.read_text(encoding="utf-8")))
    if not ids:
        raise BuildError("no topic ids found in data/dNN.js")
    return ids


def build_doc(path, doc_id, disc, kind, resolver):
    text = path.read_text(encoding="utf-8").replace("\r\n", "\n")
    title, rest = extract_title(text, path)
    html = Converter(resolver, path).blocks(rest.split("\n"))
    if not html.strip():
        raise BuildError(f"{path}: produced empty html")
    return {"id": doc_id, "disc": disc, "kind": kind, "title": title, "html": html}


def write_js(path, docs):
    body = ",\n".join(json.dumps(doc, ensure_ascii=False, indent=1) for doc in docs)
    path.write_text(f"DOCS.push({body});\n", encoding="utf-8")


def main():
    resolver = LinkResolver(load_topic_ids())
    discipline_dirs = sorted(p for p in DISCIPLINES_DIR.iterdir() if p.is_dir() and re.match(r"^\d{2}-", p.name))
    if len(discipline_dirs) != 11:
        raise BuildError(f"expected 11 disciplines, found {len(discipline_dirs)}")
    for folder in discipline_dirs:
        disc = folder.name[:2]
        docs = [
            build_doc(folder / "exam-answers.md", f"exam-{disc}", disc, "exam", resolver),
            build_doc(folder / "projeto-de-leitura" / "study-priorities.md", f"priorities-{disc}", disc, "priorities", resolver),
        ]
        write_js(DATA_DIR / f"e{disc}.js", docs)
    roadmap = build_doc(DISCIPLINES_DIR / "study-roadmap.md", "roadmap", "", "roadmap", resolver)
    write_js(DATA_DIR / "roadmap.js", [roadmap])
    print(f"generated {len(discipline_dirs)} e*.js files and roadmap.js")


if __name__ == "__main__":
    try:
        main()
    except BuildError as error:
        print(f"error: {error}", file=sys.stderr)
        sys.exit(1)
