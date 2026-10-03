# 14 · War Room: interface web sobre a mesma API e publicação no GitHub Pages

> **Unidade 8 · Aulas 1 e 2** · Leitura: ~8 min · Bloco: War Room e multiagente

## 🎯 Em uma frase
A **War Room** (React + Vite) é só mais uma **porta de entrada** para o mesmo OpsPilot: chat no `/chat`, trace lateral e cartões de aprovação. Vai para o **GitHub Pages** por **GitHub Actions**; como o Pages é estático, o backend segue local, exposto por **Cloudflare Tunnel**.

---

## 👵 Explicando para a vovó

É a vitrine da loja: mostra o que está no estoque e deixa o cliente pedir, mas o estoque e a cozinha continuam nos fundos. Se a vitrine fica aberta mas a porta dos fundos está trancada (o túnel caiu), ela abre mas nada é entregue.

---

## 🔧 Tecnicamente

### O que é
- **Instructions de design para o agente:** arquivo de instruções aplicado aos arquivos de `web/`, genérico de propósito: hierarquia visual, espaçamento, estados vazios e de erro, dark mode e acessibilidade (e um equivalente para o Cursor).
- **Spec da War Room:** chat conectado ao `/chat`, área lateral para o trace (ação, observação, resposta), cartões para ações que pedem aprovação e uma engrenagem para configurar a URL base da API. O front não repete o raciocínio do agente: só transforma contratos que já existem em experiência visual.
- **Primeira versão:** um MVP, com hierarquia e responsividade a refinar; loading e Markdown ficam como melhorias. A validação abre um incidente pela interface e pede um resumo do plantão.
- **Memória pela UI:** a preferência “críticos primeiro” é informada na interface, vira memória semântica e a resposta passa a ordenar assim. A aula explica por que não ordena no backend: regra global (“críticos sempre primeiro para todos”) pertence ao backend; preferência de um usuário pertence à memória. Aqui ordenar pela memória é uma escolha didática.
- **Publicação:** habilitar o Pages (Source = GitHub Actions); workflow disparado por push na branch principal, com jobs de build (Node 22, `npm ci` e build na pasta `web`) e deploy; permissões de leitura de conteúdo, escrita no Pages e emissão de token de identidade. O **base path do Vite** precisa do prefixo do repositório, senão o HTML abre e os assets 404. Falhas do build voltam ao agente com o log do erro.
- **Backend por túnel:** o Pages não roda Node, SQLite nem LangGraph. Para o teste usa-se `cloudflared` que expõe o servidor local numa URL temporária; a War Room é apontada para ela pela engrenagem. A validação usa uma operação curta (listar incidentes) para reduzir variáveis.
- **Próximos passos citados:** hospedar o backend, criar CI de typecheck e testes do backend, domínio próprio e variáveis por ambiente.

### Como funciona
- Specify, plan, tasks e implement sem referência extensa: a camada web é convencional e as design instructions orientam. Depois do implement, sobe o backend e o servidor do front.
- Para o Pages, uma segunda spec (017) descreve o workflow e a documentação. A Aula 1 para antes de validar a publicação; a Aula 2 completa: ativar o Pages, corrigir o build com o agente, abrir a URL pública e conectar o túnel.
- O caminho completo da requisição na demo: navegador, GitHub Pages, URL do túnel, Cloudflare Tunnel e servidor Node local.

### Onde aplicar
- Dar interface a um agente sem criar uma segunda implementação da lógica.
- Publicar o front estático de graça e manter o backend onde ele já roda.

### Vantagens e limites
**Vantagens**
- Uma lógica de negócio, várias portas (terminal, MCP, web).
- Trace e aprovação visíveis ao plantonista.
- Deploy automático do front a cada push.

**Limites**
- O backend precisa de hospedagem real para a War Room publicada ser útil.
- O túnel temporário muda de URL e expõe o servidor local.

### 🚫 Armadilhas
- Esquecer o `base` do Vite no Pages.
- Achar que o Pages hospedou a aplicação inteira.
- Expor um backend sem autenticação por túnel público.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| War Room | Interface web do OpsPilot: chat, trace e aprovação |
| Vite base | Prefixo de caminho dos assets quando o site é servido sob /repositorio/ |
| GitHub Pages / Actions | Hospedagem estática e pipeline que a publica |
| Cloudflare Tunnel | cloudflared expõe o servidor local numa URL pública temporária |
| Design instructions | Instruction com escopo (web/**) para o agente de código |

---

## 💻 No código do repo

**Projeto:** [08-projeto-pratico-opspilot-publicado](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/08-projeto-pratico-opspilot-publicado)

Specs 016 (War Room) e 017 (deploy no Pages): a pasta web/ em Vite, React 19 e TypeScript, CORS configurável na API e o workflow de deploy. Do 08 para o 09 a web só ganha o evento `handoff` (campo `to`, exibido como “para:” no painel de raciocínio).

**Fluxo**
1. `web/src/api/client.ts`: `postChat` (userId padrão `war-room`, `awaitHumanApproval`, resposta 200 ou 202) e `postApproval` (`{decision, userId}`); a resposta é validada com Zod em `web/src/api/types.ts`, que espelha o trace e o contrato do chat.
2. `web/src/api/config.ts`: a URL da API fica em `localStorage` (`opspilot.warRoom.apiBaseUrl`), default `http://localhost:3000`, só aceita http ou https.
3. `web/src/App.tsx`: estado dos turnos e do `conversationId`; checkbox de aprovação humana; `ApprovalCard` quando a resposta é 202 (aprovar ou negar); `TraceDrawer` (“Raciocínio”) lista tipo, nó, tool e “para:” do handoff; repetição da última mensagem falha e abort da requisição.
4. `web/vite.config.ts` com `base: "/opspilot/"`; `.github/workflows/deploy.yml`: `actions/checkout`, `setup-node` (22), `npm ci` e `npm run build -- --base=/ops-pilot/` em `web/`, `upload-pages-artifact` e `deploy-pages`; permissões `contents: read`, `pages: write`, `id-token: write`.
5. `src/http/cors.ts`: `OPSPILOT_CORS_ORIGINS` (lista separada por vírgula); por padrão libera qualquer origem refletindo o `Origin`; `OPTIONS` responde 204; cabeçalhos `GET,POST,OPTIONS` e `Content-Type, X-Request-Id`.
6. `.github/instructions/design.instructions.md` (`applyTo: "web/**"`) e `.cursor/rules/design.mdc`, com o mesmo conteúdo: hierarquia, escala de 4 px, estados vazio e erro, dark mode por tokens, acessibilidade.

**Como rodar**
- API: `npm run dev` (porta 3000). Front: `cd web && npm ci && npm run dev` e abra `http://localhost:5173/opspilot/`.
- Build igual ao CI: `npm --prefix web run build -- --base=/ops-pilot/`.
- Testes do front: `npm --prefix web test` (na minha execução, 13 testes em 8 arquivos passaram) e `typecheck` sem erros.

**Armadilhas e achados no código**
- O UNIDADE.md da U8 cita a variável `CORS_ORIGIN`; a variável real é `OPSPILOT_CORS_ORIGINS`, e o padrão é liberar todas as origens.
- O workflow está numa subpasta do repositório do curso; o GitHub só executa `.github/workflows` da raiz de um repositório, então aqui ele não roda. Ele serve ao repositório original do autor (`ThiagoBussola/ops-pilot`, citado no README e no YAML), e o gatilho é a branch `master`.
- Duas bases: `/opspilot/` no Vite local e `/ops-pilot/` (com hífen) no CI; é fácil errar uma das duas.
- O `userId` é fixo (`war-room`): toda a interface compartilha a mesma memória semântica.
- A apostila deixa loading e Markdown como melhorias futuras; no snapshot final o loading virou o botão “Enviando…” com Cancelar (abort da requisição), e as respostas seguem sem Markdown.
- Os README das pastas 06 e 07 citam o workflow `pages.yml`, que não existe, e o script `web:dev`, que está no `package.json` mas aponta para uma `web/` ausente nesses snapshots; o workflow real das pastas 08 e 09 é `deploy.yml`.
- A demo expõe o backend por túnel público com CORS liberado e sem autenticação: quem tiver a URL consegue chamar o `/chat` (inferência da leitura do código).

---

## 🔗 Para ir além
- [Snapshot da Unidade 8 (GitHub)](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/tree/main/modulo04-criacao-de-agentes-autonomos-novo/08-projeto-pratico-opspilot-publicado)
- [UNIDADE.md da Unidade 8](https://github.com/unipds-engenharia-de-ia-aplicada/engenharia-de-software-com-ia-aplicada/blob/main/modulo04-criacao-de-agentes-autonomos-novo/08-projeto-pratico-opspilot-publicado/UNIDADE.md)

---

⬅️ [13 · Observabilidade e limites de autonomia: trace persistido, logs, métricas e aprovação humana](./13-observabilidade-e-limites-de-autonomia.md)  ·  [15 · Multi-agent systems: supervisor, papéis, handoffs e blackboard](./15-multi-agent-systems.md) ➡️
