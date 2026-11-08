import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
OUTPUT = DATA_DIR / "manifest.js"

DISC_FIELDS = ("num", "nome", "titulo", "autor", "emoji", "resumo")
BLOCK_FIELDS = ("id", "label")
TOPIC_FIELDS = ("id", "bloco", "mod", "emoji", "read", "title", "short")
PRACTICE_FIELDS = ("id", "title", "topics", "cenario")


class ManifestError(Exception):
    pass


def extract_payload(path, wrapper):
    text = path.read_text(encoding="utf-8")
    match = re.match(r"^\s*" + wrapper + r"\.push\((.*)\);?\s*$", text, re.S)
    if not match:
        raise ManifestError(f"{path.name}: expected a {wrapper}.push(...) wrapper")
    try:
        return json.loads(match.group(1))
    except json.JSONDecodeError as error:
        raise ManifestError(f"{path.name}: invalid JSON payload: {error}")


def require(record, fields, label):
    for field in fields:
        if field not in record or record[field] is None:
            raise ManifestError(f"{label}: missing field '{field}'")


def build_topic(topic, label, block_ids):
    require(topic, TOPIC_FIELDS, label)
    if topic["bloco"] not in block_ids:
        raise ManifestError(f"{label}: unknown block '{topic['bloco']}'")
    cola = topic.get("cola")
    if not isinstance(cola, list) or any(not isinstance(pair, list) or len(pair) != 2 for pair in cola):
        raise ManifestError(f"{label}: 'cola' must be a list of [term, text] pairs")
    entry = {field: topic[field] for field in TOPIC_FIELDS}
    entry["hasCode"] = bool(topic.get("codigo"))
    entry["terms"] = [pair[0] for pair in cola]
    return entry


def build_practice_item(item, label):
    require(item, PRACTICE_FIELDS, label)
    code = item.get("code")
    code_lang = None
    if isinstance(code, dict) and code.get("src"):
        code_lang = code.get("lang") or ""
    entry = {field: item[field] for field in PRACTICE_FIELDS}
    entry["codeLang"] = code_lang
    return entry


def build_discipline(study_path, practice_path):
    study = extract_payload(study_path, "STUDY")
    practice = extract_payload(practice_path, "PRACTICE")
    label = study_path.name
    for field in ("disc", "blocos", "topics"):
        if field not in study:
            raise ManifestError(f"{label}: missing field '{field}'")
    require(study["disc"], DISC_FIELDS, f"{label} disc")
    num = study["disc"]["num"]
    if practice.get("disc") != num:
        raise ManifestError(f"{practice_path.name}: disc '{practice.get('disc')}' does not match '{num}'")
    if "intro" not in practice or "items" not in practice:
        raise ManifestError(f"{practice_path.name}: missing 'intro' or 'items'")
    for block in study["blocos"]:
        require(block, BLOCK_FIELDS, f"{label} block")
    block_ids = {block["id"] for block in study["blocos"]}
    topics = [build_topic(t, f"{label} topic {t.get('id', '?')}", block_ids) for t in study["topics"]]
    topic_ids = {t["id"] for t in topics}
    items = [build_practice_item(i, f"{practice_path.name} item {i.get('id', '?')}") for i in practice["items"]]
    for item in items:
        for topic_id in item["topics"]:
            if topic_id not in topic_ids:
                raise ManifestError(f"{practice_path.name} item {item['id']}: unknown topic '{topic_id}'")
    entry = {
        "disc": {field: study["disc"][field] for field in DISC_FIELDS},
        "blocos": [{field: b[field] for field in BLOCK_FIELDS} for b in study["blocos"]],
        "topics": topics,
        "materiais": study.get("materiais") or [],
        "practice": {"intro": practice["intro"], "items": items},
    }
    if study.get("aviso"):
        entry["aviso"] = study["aviso"]
    return entry


def main():
    study_files = sorted(DATA_DIR.glob("d[0-9][0-9].js"))
    if not study_files:
        raise ManifestError("no data/dNN.js files found")
    disciplines = []
    for study_path in study_files:
        practice_path = DATA_DIR / ("p" + study_path.name[1:])
        if not practice_path.is_file():
            raise ManifestError(f"{practice_path.name} not found")
        disciplines.append(build_discipline(study_path, practice_path))
    body = json.dumps({"disciplines": disciplines}, ensure_ascii=False, separators=(",", ":"))
    OUTPUT.write_text(f"window.MANIFEST={body};\n", encoding="utf-8")
    topics = sum(len(d["topics"]) for d in disciplines)
    practices = sum(len(d["practice"]["items"]) for d in disciplines)
    print(f"{OUTPUT.relative_to(ROOT)}: {len(disciplines)} disciplines, {topics} topics, {practices} practices, {OUTPUT.stat().st_size} bytes")


if __name__ == "__main__":
    try:
        main()
    except ManifestError as error:
        print(f"error: {error}", file=sys.stderr)
        sys.exit(1)
