# 00 · Introdução ao curso — a proposta e como estudar

> **Módulo 1 da disciplina (Caps. 1 e 2)** · Leitura: ~6 min · Pré-requisito: nenhum

## 🎯 Em uma frase
Esta pós **não forma cientistas de dados** — forma **desenvolvedores** que usam IA no dia a dia, com foco total em prática, usando **JavaScript** para rodar IA direto no navegador e em projetos locais.

---

## 👵 Explicando para a vovó

Imagine uma escola de culinária. Existem dois tipos de curso: um ensina a **química dos alimentos** (por que a massa cresce, a fórmula da fermentação) e outro ensina a **cozinhar de verdade** — pôr a mão na massa e servir o prato.

Este curso é o segundo tipo. Ele não vai afundar a senhora em matemática e estatística pesada. Vai ensinar a **usar as ferramentas** para resolver problemas reais, testando cada receita na própria cozinha (o navegador) em vez de depender de um restaurante caro (servidores na nuvem).

E tem uma regra de ouro que a vovó conhece bem: **não adianta só assistir**. Aprender a cozinhar assistindo vídeo não enche barriga de ninguém — tem que ir pro fogão, errar o ponto, repetir. Aqui é igual: quem só assiste às aulas e não pratica, esquece tudo.

> 🧠 O recado do professor: *"Não consuma esse curso como conteúdo passivo. Coloque a mão na massa, compartilhe, participe, questione."*

---

## 🔧 Tecnicamente

### O posicionamento do curso
- **Público-alvo:** desenvolvedores, não cientistas de dados. Foco em **aplicação**, não em derivar a matemática por trás dos modelos.
- **Objetivo:** entender conceitos, conhecer boas práticas, explorar ferramentas acessíveis (gratuitas ou pagas) e **aplicar IA diretamente no navegador ou em projetos locais**.
- **Entregável:** mais de **12 projetos práticos** com potencial de uso real em empresas, produtos e portfólio.
- **O que o professor promete:** sair do discurso mágico sobre IA e entender o que se faz, como funciona e como aplicar no dia a dia. Temas: JavaScript, Web AI, LLMs, RAG, embeddings, vector databases e agentes; ferramentas: Teachable Machine, Ollama, OpenRouter e o VS Code adaptado para produtividade com IA.
- **O que o curso não é:** formação de cientista de dados. Conteúdos de IA costumam mergulhar em matemática, estatística e infraestrutura complexa; aqui o objetivo é usar IA no desenvolvimento.

### Por que JavaScript (e não Python)?
Embora IA seja tradicionalmente associada ao Python, o curso aposta em JS por uma vantagem única:

- **É a linguagem nativa dos navegadores.** Qualquer dev, venha de onde vier, cedo ou tarde encosta em JavaScript.
- **Roda IA no cliente:** com a evolução da "Web 4.0" (no uso da apostila: sites adaptados para que IAs busquem respostas direto na fonte, e navegadores com APIs nativas para executar modelos), dá para processar áudio/vídeo e criar interfaces inteligentes **sem custo adicional de servidor** e com boa performance.
- **Autonomia:** você deixa de ser apenas alguém que "integra APIs de terceiros" e passa a rodar IA com controle e economia de recursos.
- **Ponte com Python:** a biblioteca-base do curso, o **TensorFlow.js**, também permite **portar modelos treinados em Python** para execução no navegador ou no Node.js.

### O mapa da disciplina (o que vem pela frente)
A jornada começa diferenciando conceitos que costumam se confundir — **Machine Learning, Deep Learning e IA** — e evolui até sistemas de IA em produção:

| Tema | Onde aprofundar |
|------|-----------------|
| Redes neurais, tensores, treino do zero | [Doc 01](./01-ml-dl-ia-redes-neurais.md) |
| Sistemas de recomendação | [Doc 02](./02-sistemas-de-recomendacao.md) |
| Visão computacional / vencer jogos | [Doc 03](./03-visao-computacional-yolo.md) |
| Algoritmos genéticos e reforço | [Doc 04](./04-algoritmos-geneticos-e-reforco.md) |
| Transformers, embeddings, attention | [Doc 05](./05-como-funcionam-llms.md) |
| IA no navegador e multimodal | [Doc 06](./06-web-ai-e-multimodal.md) |
| Prompt Engineering (TOON/JSON) | [Doc 07](./07-prompt-engineering.md) |
| Ferramentas de IA e agentes | [Doc 08](./08-ferramentas-dev-e-agentes.md) |
| MCPs e automação | [Doc 09](./09-mcp-e-automacao.md) |
| Modelos open vs. fechados | [Doc 10](./10-modelos-open-vs-fechados.md) |
| RAG, embeddings, busca semântica | [Doc 11](./11-rag-embeddings-busca-semantica.md) |

### Como tirar o máximo (método sugerido pelo professor)
1. **Foque em prática:** pegue cada exemplo e adapte a outro contexto (processou imagem? tente áudio ou vídeo; lidou com PDF? tente CSV/planilha).
2. **Leia o complementar:** artigos e docs indicados não são enfeite — leia e teste.
3. **Desenvolva um projeto pessoal** ao longo do curso e compartilhe o progresso (gera networking e portfólio).
4. **Participe da comunidade** (Discord da turma): o aprendizado real acontece fora do tempo de aula, quando você encara um problema de verdade.

---

### Nota sobre a apostila
A apostila é um texto derivado das aulas e traz grafias trocadas. Neste material usamos os nomes corretos: "Oriama", "Yama" e "Olyama" são o **Ollama**; "Reg" (e "Retrieval Mentor Generation") é **RAG**; "BetterOff" é o **Better Auth**; "ASCII" é o modo **ASK** do VS Code; "QuenCoder" provavelmente é o Qwen Coder. Quando o código do repositório diverge da apostila (variável de ambiente, métrica, uso de Docker), o tópico aponta a divergência.

---

## 🧩 Cola rápida

| Termo | O que é |
|-------|---------|
| **Foco do curso** | Aplicar IA como desenvolvedor, não fazer ciência de dados |
| **TensorFlow.js** | Biblioteca base: roda ML no navegador e no Node.js; porta modelos do Python |
| **Web 4.0** | Geração da web em que a IA é nativa ao navegador (roda local) |
| **Aprendizado ativo** | Praticar, adaptar e compartilhar — não apenas assistir |
| **Projeto pessoal** | Fio condutor recomendado para fixar e virar portfólio |

---

## 💻 No curso
- **Ambiente:** editor de código (VS Code e similares) + Node.js; muitos exemplos rodam **100% no navegador**, sem back-end.
- **Ferramentas apresentadas logo de início:** Teachable Machine, OpenRouter, Ollama e o próprio VS Code adaptado para produtividade com IA.
- **Compromisso mútuo:** o professor entrega conteúdo baseado em experiência real de mercado; o aluno se compromete a praticar, comentar e avaliar cada aula (o feedback ajusta o ritmo da turma).

---

## 🔗 Para ir além
- Repositório oficial da disciplina — https://github.com/unipds-engenharia-de-ia-aplicada
- Jogo do Pac-Man com transfer learning (demo do curso) — https://storage.googleapis.com/tfjs-examples/webcam-transfer-learning/dist/index.html
- ML vs Deep Learning (visão geral) — https://www.datacamp.com/tutorial/machine-deep-learning
