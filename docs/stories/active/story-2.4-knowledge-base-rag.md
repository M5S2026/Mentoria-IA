# Story 2.4: Knowledge Base & RAG Integration

## Status

Done

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build"]

## Story

**As a** mentor IA do AI Mentor Academy,
**I want** ter acesso a uma base de conhecimento indexada com meus frameworks e topicos,
**so that** eu possa dar respostas fundamentadas e especificas baseadas em conteudo real.

## Acceptance Criteria

- [x] 1. Knowledge base com 70 arquivos markdown (35 frameworks + 35 topics) cobrindo 7 mentores
- [x] 2. Cada arquivo com frontmatter padrao (mentor, category, title, level, tags)
- [x] 3. Conteudo em portugues BR sem acentos, pratico e acionavel
- [x] 4. Script de indexacao (`npm run index-kb`) para gerar embeddings e inserir no Supabase
- [x] 5. Chunking inteligente por headers `##` (max ~2000 chars)
- [x] 6. Suporte a indexacao filtrada por mentor (`npm run index-kb -- nicolas`)
- [x] 7. Rate limiting de 200ms entre chamadas de embedding
- [x] 8. Barrel export do modulo RAG (`src/lib/ai/rag/index.ts`)
- [x] 9. Migration SQL para tabela `knowledge_chunks` com pgvector
- [x] 10. Retriever com fallback filesystem quando Supabase nao disponivel
- [x] 11. Build passa sem erros
- [x] 12. Integracao com chat API via `retrieveKnowledge()` ja funcional

## Tasks / Subtasks

- [x] Task 1: Instalar dependencias e configurar script
  - [x] 1.1 Instalar `gray-matter` e `tsx` como devDependencies
  - [x] 1.2 Adicionar script `index-kb` no package.json

- [x] Task 2: Criar 40 novos arquivos markdown de knowledge base
  - [x] 2.1 Nicolas: 4 arquivos (ai-stack, ai-roi, ai-differences, first-agent)
  - [x] 2.2 Hormozi: 6 arquivos (lead-magnets, 100m-leads, ltgp, escala-negocio, retention, gym-launch)
  - [x] 2.3 Altman: 6 arquivos (ai-first, compounding, moat-building, futuro-trabalho, fundraising, scaling)
  - [x] 2.4 Elon: 6 arquivos (feedback-loop, mission-driven, vertical-integration, manufacturing, space-thinking, risk-mgmt)
  - [x] 2.5 Erico: 6 arquivos (cpl, gatilhos-mentais, lancamento-semente, audiencia, lista-email, oferta-digital)
  - [x] 2.6 Gary: 6 arquivos (pillar-content, 180-strategy, document-dont-create, volume-vs-perfection, content-with-ai, hashtag-strategy)
  - [x] 2.7 Russell: 6 arquivos (hook-story-offer, attractive-character, expert-secrets, webinar, dream-100, traffic-secrets)

- [x] Task 3: Criar script de indexacao
  - [x] 3.1 Criar `scripts/index-knowledge-base.ts`
  - [x] 3.2 Parse de frontmatter com gray-matter
  - [x] 3.3 Chunking por headers `##`
  - [x] 3.4 Geracao de embeddings via OpenAI API
  - [x] 3.5 Upsert no Supabase com delete + insert por mentor
  - [x] 3.6 Rate limiting entre chamadas

- [x] Task 4: Criar barrel export do modulo RAG
  - [x] 4.1 Criar `src/lib/ai/rag/index.ts` com exports publicos

- [x] Task 5: Executar migration no Supabase
  - [x] 5.1 Habilitar extensao pgvector no Supabase Dashboard
  - [x] 5.2 Executar `002_knowledge_chunks.sql`

- [x] Task 6: Executar pipeline de indexacao
  - [x] 6.1 Configurar OPENAI_API_KEY no .env.local
  - [x] 6.2 Executar `npm run index-kb`
  - [x] 6.3 Verificar chunks no Supabase (407/407, 0 falhas)

## Dev Notes

### Cobertura por Mentor

| Mentor | Frameworks | Topics | Total |
|--------|-----------|--------|-------|
| nicolas | 5 | 5 | 10 |
| hormozi | 5 | 5 | 10 |
| altman | 5 | 5 | 10 |
| elon | 5 | 5 | 10 |
| erico | 5 | 5 | 10 |
| gary | 5 | 5 | 10 |
| russell | 5 | 5 | 10 |
| **Total** | **35** | **35** | **70** |

### Arquitetura RAG

```
knowledge-base/{mentor}/{frameworks|topics}/*.md
    | npm run index-kb
scripts/index-knowledge-base.ts
    | gray-matter parse + chunking
    | OpenAI text-embedding-3-small (1536 dims)
Supabase knowledge_chunks (pgvector)
    | match_knowledge_chunks RPC
src/lib/ai/rag/retriever.ts
    | retrieveKnowledge()
src/app/api/chat/route.ts
```

### Dependencias Adicionadas

- `gray-matter` (devDependency) - Parse de frontmatter markdown
- `tsx` (devDependency) - Execucao de TypeScript scripts

## Dependencies

- **Story 1.1** (Project Setup) - base tecnica
- **Story 2.1** (Chat Interface) - integracao com chat API

## Definition of Done

- [x] 70 arquivos markdown na knowledge-base (35 frameworks + 35 topics)
- [x] Script de indexacao funcional (`npm run index-kb`)
- [x] Barrel export do modulo RAG
- [x] Build passa sem erros
- [x] Migration executada no Supabase (pgvector)
- [x] Pipeline de indexacao executado com sucesso (407/407 chunks, 0 falhas)
- [x] Chat com mentor retorna respostas baseadas em knowledge base

## Size Estimate

**L** (Large) - 70 arquivos de conteudo + script de indexacao + integracao

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-16 | 1.0 | Story criada e implementada | Dev Agent (Claude Opus 4.6) |
| 2026-02-19 | 1.1 | Sincronizado status para Done (story file principal estava desatualizado) | Orion (AIOS Master) |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes List

- 40 novos arquivos KB criados em paralelo (7 agents simultaneos)
- Script de indexacao com chunking inteligente e rate limiting
- Barrel export limpo para modulo RAG
- Build verificado - passa sem erros
- Migration e indexacao executados com sucesso (407/407 chunks)

### File List

- `scripts/index-knowledge-base.ts` (NEW)
- `src/lib/ai/rag/index.ts` (NEW)
- `package.json` (MODIFIED - added gray-matter, tsx, index-kb script)
- 40 arquivos de knowledge base (NEW) - ver detalhes na versao completa

## QA Results

_A ser preenchido pelo QA agent_
