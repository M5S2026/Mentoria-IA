# Story 2.4: Knowledge Base & RAG Integration

## Status

To Do

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build"]

## Story

**As a** mentor IA,
**I want** ter acesso a uma knowledge base com conteudo real dos frameworks e metodologias,
**so that** minhas respostas sejam precisas, baseadas em metodologias reais, e citem fontes quando aplicavel.

## Acceptance Criteria

- [ ] 1. Estrutura de knowledge base criada: diretorio `knowledge-base/` com subpastas por mentor, cada uma com `frameworks/`, `topics/`, `examples/`
- [ ] 2. Conteudo markdown criado para cada mentor: minimo 5 frameworks + 5 topicos documentados por mentor
- [ ] 3. Extensao pgvector habilitada no Supabase (SQL migration)
- [ ] 4. Tabela `knowledge_chunks` criada no Supabase com campo `embedding vector(1536)`
- [ ] 5. Pipeline de embedding: script que le markdown, faz chunking por headers, gera embeddings e insere no Supabase
- [ ] 6. Funcao SQL `match_knowledge_chunks` para busca por similaridade vetorial com filtros por mentor e nivel
- [ ] 7. Retriever que recebe mensagem do usuario, gera embedding, busca chunks relevantes e retorna contexto formatado
- [ ] 8. Integracao do RAG no prompt assembler: contexto recuperado e injetado no placeholder `{KNOWLEDGE_CONTEXT}`
- [ ] 9. Respostas dos mentores citam fonte quando aplicavel ("Como Alan Nicolas ensina no metodo PREP...")
- [ ] 10. Fallback gracioso: quando nao ha contexto relevante (similarity < threshold), mentor usa apenas conhecimento base do system prompt
- [ ] 11. Knowledge base editavel: adicionar/editar markdown e rodar script para re-indexar
- [ ] 12. Tipagem TypeScript para KnowledgeChunk, EmbeddingResult, RAGContext

## Tasks / Subtasks

- [ ] Task 1: Criar estrutura de knowledge base e conteudo markdown (AC: 1, 2)
  - [ ] 1.1 Criar diretorio `knowledge-base/` na raiz do projeto
  - [ ] 1.2 Criar estrutura por mentor: `knowledge-base/{slug}/frameworks/`, `topics/`, `examples/`
  - [ ] 1.3 Escrever conteudo para Nicolas: 5 frameworks (PREP, escada-automacao, agentes, stack-ia, roi-ia) + 5 topicos
  - [ ] 1.4 Escrever conteudo para Gary: 6 frameworks (pilar, $1.80, document-dont-create, jab-jab-jab, reverse-attention, day-trading) + 5 topicos
  - [ ] 1.5 Escrever conteudo para Erico: 6 frameworks (formula-lancamento, cpl, 6-em-7, gatilhos-mentais, lancamento-semente, lancamento-perpetuo) + 5 topicos
  - [ ] 1.6 Escrever conteudo para Russell: 6 frameworks (value-ladder, hook-story-offer, attractive-character, dream-100, expert-secrets, perfect-webinar) + 5 topicos
  - [ ] 1.7 Escrever conteudo para Hormozi: 6 frameworks (grand-slam-offer, value-equation, lead-magnets, $100m-leads, pricing-psychology, ltgp) + 5 topicos
  - [ ] 1.8 Escrever conteudo para Elon: 6 frameworks (first-principles, 10x-thinking, feedback-loop, mission-driven, physics-reasoning, vertical-integration) + 5 topicos
  - [ ] 1.9 Escrever conteudo para Altman: 6 frameworks (startup-playbook, pmf, ai-first, compounding, moat-building, future-mapping) + 5 topicos
  - [ ] 1.10 Cada arquivo markdown usa frontmatter: `mentor`, `category`, `level`, `title`

- [ ] Task 2: Criar migration SQL para pgvector e knowledge_chunks (AC: 3, 4, 6)
  - [ ] 2.1 Criar `supabase/migrations/002_knowledge_chunks.sql`
  - [ ] 2.2 Habilitar extensao vector: `CREATE EXTENSION IF NOT EXISTS "vector"`
  - [ ] 2.3 Criar tabela `knowledge_chunks` com campos: id, mentor_id, content, metadata (jsonb), embedding (vector(1536)), created_at
  - [ ] 2.4 Criar indice IVFFlat no campo embedding para performance
  - [ ] 2.5 Criar funcao `match_knowledge_chunks` com parametros: query_embedding, match_threshold, match_count, filter_mentor_id, filter_level
  - [ ] 2.6 Criar RLS policy para leitura publica dos chunks

- [ ] Task 3: Implementar embedding pipeline (AC: 5, 11)
  - [ ] 3.1 Criar `scripts/index-knowledge-base.ts`
  - [ ] 3.2 Ler todos os arquivos markdown de `knowledge-base/`
  - [ ] 3.3 Chunking: split por headers `##`, max 500 tokens por chunk
  - [ ] 3.4 Extrair metadata do frontmatter (mentor, category, level)
  - [ ] 3.5 Gerar embeddings usando OpenAI `text-embedding-3-small` (mais barato que Claude)
  - [ ] 3.6 Inserir chunks + embeddings no Supabase `knowledge_chunks`
  - [ ] 3.7 Modo re-index: deletar chunks existentes do mentor antes de inserir novos
  - [ ] 3.8 Adicionar script ao package.json: `"index-kb": "tsx scripts/index-knowledge-base.ts"`

- [ ] Task 4: Implementar RAG retriever (AC: 7, 10, 12)
  - [ ] 4.1 Criar `src/lib/ai/rag/retriever.ts`
  - [ ] 4.2 Funcao `retrieveContext(mentorId, userMessage, userLevel, limit?)`: gera embedding da pergunta, busca chunks similares, retorna contexto formatado
  - [ ] 4.3 Threshold de similaridade: 0.7 (ajustavel)
  - [ ] 4.4 Limite: top 5 chunks por query
  - [ ] 4.5 Formato de retorno: texto com marcadores de fonte para injecao no prompt
  - [ ] 4.6 Fallback: retornar string vazia se nenhum chunk passa o threshold
  - [ ] 4.7 Criar `src/lib/ai/rag/embedding.ts` com funcao `generateEmbedding(text)`

- [ ] Task 5: Integrar RAG no prompt assembler e API (AC: 8, 9)
  - [ ] 5.1 Modificar `src/lib/ai/prompts/prompt-assembler.ts` - `knowledgeContext` param ja existe, garantir que e injetado corretamente no `{KNOWLEDGE_CONTEXT}`
  - [ ] 5.2 Modificar `src/app/api/chat/route.ts` - antes de montar prompt, chamar `retrieveContext()` e passar resultado ao assembler
  - [ ] 5.3 Quando mentor nao e concierge, buscar RAG context automaticamente
  - [ ] 5.4 Concierge nao usa RAG (continua com prompt fixo)

- [ ] Task 6: Criar tipos e utilitarios (AC: 12)
  - [ ] 6.1 Criar `src/types/rag.ts` com interfaces: KnowledgeChunk, EmbeddingResult, RAGContext, ChunkMetadata
  - [ ] 6.2 Criar `src/lib/ai/rag/index.ts` como barrel export

## Dev Notes

### Estrutura do Knowledge Base

```
knowledge-base/
  nicolas/
    frameworks/
      prep-method.md       # Metodo PREP completo
      automation-ladder.md # Escada de Automacao
      agent-framework.md   # Framework de Agentes
      ai-stack.md          # Stack de IA para Negocios
      ai-roi.md            # ROI de implementacao de IA
    topics/
      chatgpt-basics.md    # Como usar ChatGPT
      prompt-engineering.md # Engenharia de prompts
      ai-tools-2026.md     # Ferramentas essenciais
      ai-differences.md    # ChatGPT vs Claude vs Gemini
      first-agent.md       # Primeiro agente IA
  gary/
    frameworks/
      pillar-content.md    # Modelo de Conteudo Pilar
      180-strategy.md      # $1.80 Strategy
      document-dont-create.md
      jab-jab-jab.md       # Jab Jab Jab Right Hook
      reverse-attention.md # Reverse Engineering Attention
      day-trading-attention.md
    topics/
      volume-over-perfection.md
      1-to-15-content.md   # Transformar 1 video em 15
      hashtag-strategy.md
      personal-branding.md
      content-with-ai.md
  ... (mesma estrutura para todos os 7 mentores)
```

### Formato do Markdown com Frontmatter

```markdown
---
mentor: nicolas
category: framework
level: all
title: Metodo PREP para Prompts
---

# Metodo PREP para Prompts

O Metodo PREP e um framework de 4 etapas para criar prompts eficazes:

## P - Persona
Defina quem a IA deve ser. Exemplo: "Voce e um especialista em marketing digital com 15 anos de experiencia."

## R - Request
Faca um pedido claro e especifico. Exemplo: "Crie 5 headlines para uma landing page de curso de IA."

## E - Examples
Forneca exemplos do que voce espera. Exemplo: "Aqui estao 2 headlines que gostei: ..."

## P - Parameters
Defina restricoes e formato. Exemplo: "Maximo 10 palavras cada, tom profissional, em portugues."

### Quando usar
- Para qualquer interacao com ChatGPT, Claude ou Gemini
- Especialmente util para tarefas de criacao de conteudo
- Melhora drasticamente a qualidade das respostas

### Exemplo completo
Persona: Voce e um copywriter especializado em educacao online
Request: Escreva 3 emails de venda para um curso de IA para iniciantes
Examples: [exemplo de email anterior que funcionou]
Parameters: Cada email com maximo 200 palavras, tom conversacional, incluir CTA claro
```

### SQL Migration - pgvector

```sql
-- supabase/migrations/002_knowledge_chunks.sql

-- Habilitar extensao vector
CREATE EXTENSION IF NOT EXISTS "vector";

-- Tabela de chunks da knowledge base
CREATE TABLE knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id TEXT NOT NULL,           -- slug: 'nicolas', 'hormozi', etc.
  content TEXT NOT NULL,             -- Conteudo do chunk
  metadata JSONB NOT NULL DEFAULT '{}',  -- { source_file, category, level, title }
  embedding vector(1536),           -- Embedding do text-embedding-3-small
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indice para busca vetorial
CREATE INDEX ON knowledge_chunks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Indice para filtro por mentor
CREATE INDEX idx_knowledge_chunks_mentor ON knowledge_chunks(mentor_id);

-- Funcao de busca por similaridade
CREATE OR REPLACE FUNCTION match_knowledge_chunks(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5,
  filter_mentor_id text DEFAULT NULL,
  filter_level text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  mentor_id text,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kc.id,
    kc.mentor_id,
    kc.content,
    kc.metadata,
    1 - (kc.embedding <=> query_embedding) AS similarity
  FROM knowledge_chunks kc
  WHERE
    (filter_mentor_id IS NULL OR kc.mentor_id = filter_mentor_id)
    AND (filter_level IS NULL OR kc.metadata->>'level' IN (filter_level, 'all'))
    AND 1 - (kc.embedding <=> query_embedding) > match_threshold
  ORDER BY kc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- RLS: leitura publica (chunks nao sao dados sensiveis)
ALTER TABLE knowledge_chunks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Knowledge chunks are viewable by everyone"
  ON knowledge_chunks FOR SELECT
  USING (true);
```

### Embedding Pipeline Script

```typescript
// scripts/index-knowledge-base.ts

import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // Service role para bypass RLS
)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

interface ChunkMetadata {
  source_file: string
  category: 'framework' | 'topic' | 'example'
  level: 'iniciante' | 'intermediario' | 'avancado' | 'all'
  title: string
  mentor: string
}

// Chunking: split por headers ##, max ~500 tokens
function chunkMarkdown(content: string, metadata: ChunkMetadata): Array<{ content: string; metadata: ChunkMetadata }> {
  const sections = content.split(/\n(?=## )/)
  const chunks: Array<{ content: string; metadata: ChunkMetadata }> = []

  for (const section of sections) {
    if (section.trim().length < 20) continue // Pular secoes muito curtas

    // Se secao muito longa (>2000 chars ~500 tokens), dividir em paragrafos
    if (section.length > 2000) {
      const paragraphs = section.split(/\n\n/)
      let currentChunk = ''

      for (const para of paragraphs) {
        if ((currentChunk + para).length > 2000) {
          if (currentChunk.trim()) {
            chunks.push({ content: currentChunk.trim(), metadata })
          }
          currentChunk = para
        } else {
          currentChunk += '\n\n' + para
        }
      }
      if (currentChunk.trim()) {
        chunks.push({ content: currentChunk.trim(), metadata })
      }
    } else {
      chunks.push({ content: section.trim(), metadata })
    }
  }

  return chunks
}

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}

async function indexMentor(mentorSlug: string) {
  const basePath = path.join(process.cwd(), 'knowledge-base', mentorSlug)

  if (!fs.existsSync(basePath)) {
    console.log(`Skipping ${mentorSlug}: directory not found`)
    return
  }

  // Deletar chunks existentes deste mentor
  await supabase
    .from('knowledge_chunks')
    .delete()
    .eq('mentor_id', mentorSlug)

  console.log(`Indexing ${mentorSlug}...`)

  const categories = ['frameworks', 'topics', 'examples']
  let totalChunks = 0

  for (const category of categories) {
    const categoryPath = path.join(basePath, category)
    if (!fs.existsSync(categoryPath)) continue

    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'))

    for (const file of files) {
      const filePath = path.join(categoryPath, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter, content } = matter(raw)

      const metadata: ChunkMetadata = {
        source_file: `${mentorSlug}/${category}/${file}`,
        category: (frontmatter.category ?? category.slice(0, -1)) as ChunkMetadata['category'],
        level: (frontmatter.level ?? 'all') as ChunkMetadata['level'],
        title: frontmatter.title ?? file.replace('.md', ''),
        mentor: mentorSlug,
      }

      const chunks = chunkMarkdown(content, metadata)

      for (const chunk of chunks) {
        const embedding = await generateEmbedding(chunk.content)

        await supabase.from('knowledge_chunks').insert({
          mentor_id: mentorSlug,
          content: chunk.content,
          metadata: chunk.metadata,
          embedding,
        })

        totalChunks++
      }

      // Rate limit: OpenAI embeddings
      await new Promise(r => setTimeout(r, 200))
    }
  }

  console.log(`  ${mentorSlug}: ${totalChunks} chunks indexed`)
}

async function main() {
  const mentors = ['nicolas', 'gary', 'erico', 'russell', 'hormozi', 'elon', 'altman']

  // Se argumento passado, indexar apenas esse mentor
  const target = process.argv[2]
  const toIndex = target ? [target] : mentors

  for (const mentor of toIndex) {
    await indexMentor(mentor)
  }

  console.log('Done!')
}

main().catch(console.error)
```

### RAG Retriever

```typescript
// src/lib/ai/rag/retriever.ts

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function retrieveContext(
  mentorId: string,
  userMessage: string,
  userLevel: string,
  limit: number = 5
): Promise<string> {
  // 1. Gerar embedding da pergunta do usuario
  const queryEmbedding = await generateEmbedding(userMessage)

  // 2. Busca por similaridade no Supabase
  const { data: chunks, error } = await supabase.rpc('match_knowledge_chunks', {
    query_embedding: queryEmbedding,
    match_threshold: 0.7,
    match_count: limit,
    filter_mentor_id: mentorId,
    filter_level: userLevel,
  })

  if (error || !chunks || chunks.length === 0) {
    return '' // Fallback: mentor usa apenas conhecimento base
  }

  // 3. Formatar contexto para injecao no prompt
  const contextParts = chunks.map(
    (c: { content: string; metadata: { source_file: string; title: string } }) =>
      `[Fonte: ${c.metadata.title}]\n${c.content}`
  )

  return `
CONHECIMENTO RELEVANTE (use para embasar sua resposta):
---
${contextParts.join('\n---\n')}
---
Baseie sua resposta neste conhecimento quando aplicavel. Cite a fonte naturalmente na conversa.
`
}
```

### Embedding Helper

```typescript
// src/lib/ai/rag/embedding.ts

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return response.data[0].embedding
}
```

### Integracao na API de Chat

```typescript
// Mudanca no src/app/api/chat/route.ts

import { retrieveContext } from '@/lib/ai/rag/retriever'

// Dentro do POST handler, antes de montar o prompt:
let knowledgeContext = ''
if (body.mentorId && body.mentorId !== 'concierge') {
  knowledgeContext = await retrieveContext(
    body.mentorId,
    body.message,
    body.assessmentResult?.level ?? 'iniciante',
  )
}

// Passar ao prompt assembler:
const systemPrompt = assembleMentorPrompt({
  mentorId: body.mentorId,
  userLevel: body.assessmentResult?.level ?? 'iniciante',
  accessType: 'free',
  messageCount: body.history?.length ?? 0,
  interest: body.assessmentResult?.interest ?? 'ia_pratica',
  knowledgeContext,  // RAG context injetado aqui
})
```

### Dependencias npm Adicionais

```
openai            # SDK OpenAI para embeddings (text-embedding-3-small)
gray-matter       # Parse de frontmatter YAML nos markdown files
tsx               # Runner de TypeScript para scripts (se nao existir)
```

### Variaveis de Ambiente Necessarias

```
OPENAI_API_KEY=sk-...            # Para gerar embeddings
SUPABASE_URL=https://...         # Ja existe
SUPABASE_SERVICE_ROLE_KEY=...    # Para o script de indexacao (bypass RLS)
```

### Custo Estimado

- **text-embedding-3-small**: $0.02 por 1M tokens
- ~70 documentos x ~500 tokens = ~35.000 tokens para indexar tudo
- Custo de indexacao: < $0.01
- Custo por query (embedding da pergunta): ~$0.00001
- Custo mensal com 10.000 queries: ~$0.10

### Referencia: Codigo Existente

- `src/lib/ai/prompts/prompt-assembler.ts` (Story 2.1) - Ja tem placeholder `{KNOWLEDGE_CONTEXT}`
- `src/app/api/chat/route.ts` (Story 2.2) - Sera modificado para chamar retriever antes do assembler
- Supabase client ja configurado no projeto (Story 1.1)

## File List

**Novos arquivos a criar:**
- `knowledge-base/nicolas/frameworks/prep-method.md`
- `knowledge-base/nicolas/frameworks/automation-ladder.md`
- `knowledge-base/nicolas/frameworks/agent-framework.md`
- `knowledge-base/nicolas/frameworks/ai-stack.md`
- `knowledge-base/nicolas/frameworks/ai-roi.md`
- `knowledge-base/nicolas/topics/chatgpt-basics.md`
- `knowledge-base/nicolas/topics/prompt-engineering.md`
- `knowledge-base/nicolas/topics/ai-tools-2026.md`
- `knowledge-base/nicolas/topics/ai-differences.md`
- `knowledge-base/nicolas/topics/first-agent.md`
- (mesma estrutura para gary, erico, russell, hormozi, elon, altman - ~70 arquivos total)
- `supabase/migrations/002_knowledge_chunks.sql`
- `scripts/index-knowledge-base.ts`
- `src/lib/ai/rag/retriever.ts`
- `src/lib/ai/rag/embedding.ts`
- `src/lib/ai/rag/index.ts`
- `src/types/rag.ts`

**Arquivos a modificar:**
- `src/lib/ai/prompts/prompt-assembler.ts` - Garantir que `{KNOWLEDGE_CONTEXT}` e substituido corretamente
- `src/app/api/chat/route.ts` - Adicionar chamada ao retriever antes de montar prompt
- `package.json` - Adicionar script `index-kb` e dependencias `openai`, `gray-matter`

## Dependencies

- **Story 2.1** (Mentor Prompts) - OBRIGATORIA. Prompt assembler com placeholder `{KNOWLEDGE_CONTEXT}`
- **Story 2.2** (Routing Engine) - OBRIGATORIA. API atualizada com mentorId no request
- **Story 1.1** (Project Setup) - COMPLETA. Supabase client configurado
- **Supabase com pgvector** - Precisa habilitar extensao vector no projeto Supabase
- **OpenAI API Key** - Necessaria para gerar embeddings (text-embedding-3-small)
- **Supabase Service Role Key** - Para o script de indexacao (bypass RLS)

## Definition of Done

- [ ] Knowledge base com ~70 arquivos markdown criados (5 frameworks + 5 topicos por mentor)
- [ ] Migration SQL executada com sucesso no Supabase (pgvector + knowledge_chunks)
- [ ] Script de indexacao funciona: le markdown, chunkeia, gera embeddings, insere no Supabase
- [ ] Retriever busca chunks relevantes por similaridade vetorial
- [ ] RAG context e injetado no prompt do mentor via prompt assembler
- [ ] Mentor cita fontes naturalmente nas respostas quando contexto relevante e encontrado
- [ ] Fallback funciona: sem contexto relevante, mentor responde normalmente
- [ ] Build passa sem erros (`npm run build`)
- [ ] TypeScript check passa (`npm run typecheck`)
- [ ] Lint passa (`npm run lint`)
- [ ] Script `npm run index-kb` executa sem erros

## Size Estimate

**L** (Large) - 1 sessao focada de desenvolvimento (~5-6 horas). Volume grande de conteudo markdown + infra Supabase + pipeline de embeddings + integracao RAG.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-12 | 1.0 | Story criada a partir do PRD, Architecture Doc e Knowledge Bases | Morgan (PM Agent) |

## QA Results

_A ser preenchido pelo QA agent_
