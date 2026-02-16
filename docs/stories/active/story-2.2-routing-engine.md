# Story 2.2: Level Assessment & Routing Engine

## Status

Done

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build"]

## Story

**As a** visitante,
**I want** ser avaliado naturalmente durante a conversa com a concierge e direcionado ao mentor IA ideal,
**so that** eu aprenda com quem mais pode me ajudar no meu nivel e area de interesse.

## Acceptance Criteria

- [x] 1. Algoritmo de scoring que avalia nivel (1-15+) baseado nas respostas do visitante durante conversa com concierge
- [x] 2. Classificacao em 3 niveis: Iniciante (score 1-4), Intermediario (score 5-8), Avancado (score 9+)
- [x] 3. Deteccao de area de interesse: ia_pratica, marketing, vendas, conteudo, inovacao, estrategia
- [x] 4. Recomendacao de 2-3 mentores baseada em nivel + interesse (matriz de roteamento)
- [x] 5. State machine de fases da conversa: greeting > assessment > recommendation > mentor_session
- [x] 6. Transicao suave do concierge para mentor selecionado (contexto da avaliacao preservado e enviado ao mentor)
- [x] 7. Dados de avaliacao (nivel, score, interesse, mentores recomendados) salvos no state (Supabase vem na Epic 3)
- [x] 8. Fallback: se avaliacao inconclusiva apos 5 mensagens, oferecer lista completa dos 7 mentores para escolha manual
- [x] 9. API route `/api/chat` atualizada para usar AgentRouter e PromptAssembler (escolhe system prompt pelo mentor ativo)
- [x] 10. Chat store atualizado para suportar troca de mentor e preservar assessment data

## Tasks / Subtasks

- [x] Task 1: Criar tipos e interfaces do routing engine (AC: 1, 2, 3, 5)
  - [x] 1.1 Criar `src/types/routing.ts` com interfaces: ConversationPhase, RoutingDecision, AssessmentResult, ScoringCriteria
  - [x] 1.2 Definir type `ConversationPhase = 'greeting' | 'assessment' | 'recommendation' | 'mentor_session'`
  - [x] 1.3 Interface `AssessmentResult { level, score, interest, recommendedMentors[] }`
  - [x] 1.4 Interface `RoutingDecision { phase, mentorId, systemPrompt, metadata }`

- [x] Task 2: Implementar scoring engine (AC: 1, 2, 3, 4)
  - [x] 2.1 Criar `src/lib/ai/orchestrator/scoring-engine.ts`
  - [x] 2.2 Implementar funcao `analyzeAssessment(messages: Message[]): Promise<AssessmentResult>`
  - [x] 2.3 Usar Claude API para analisar respostas do visitante e retornar JSON estruturado
  - [x] 2.4 Prompt de analise pede: score numerico, nivel, interesse, 2-3 mentores recomendados
  - [x] 2.5 Parse de JSON com fallback seguro (se parse falhar, retorna assessment default)

- [x] Task 3: Implementar agent router / state machine (AC: 5, 6, 8)
  - [x] 3.1 Criar `src/lib/ai/orchestrator/agent-router.ts`
  - [x] 3.2 Classe `AgentRouter` com metodo statico `route(context): Promise<RoutingDecision>`
  - [x] 3.3 Logica de fases: se mentorId === 'concierge' e messageCount < 5 -> assessment
  - [x] 3.4 Se mentorId === 'concierge' e messageCount >= 5 -> analisar e recomendar
  - [x] 3.5 Se mentor selecionado -> mentor_session (usar prompt assembler da Story 2.1)
  - [x] 3.6 Fallback: se analise inconclusiva, retornar fase 'recommendation' com todos os 7 mentores
  - [x] 3.7 Na transicao concierge -> mentor, incluir resumo do assessment no contexto do mentor

- [x] Task 4: Criar prompts de assessment e recommendation (AC: 5, 6)
  - [x] 4.1 Criar `src/lib/ai/prompts/assessment-prompt.ts`
  - [x] 4.2 Prompt de assessment: instrui concierge a fazer perguntas naturais (experiencia, negocio, objetivo)
  - [x] 4.3 Prompt de recommendation: instrui concierge a apresentar mentores recomendados
  - [x] 4.4 Prompt de transicao: mensagem que o mentor recebe com contexto do visitante

- [x] Task 5: Atualizar API `/api/chat` para usar routing (AC: 9)
  - [x] 5.1 Modificar `src/app/api/chat/route.ts`
  - [x] 5.2 Receber novo campo `mentorId` no request body
  - [x] 5.3 Se mentorId === 'concierge', usar AgentRouter para decidir prompt
  - [x] 5.4 Se mentorId !== 'concierge', usar PromptAssembler (Story 2.1) para montar prompt do mentor
  - [x] 5.5 Incluir assessment data (nivel, interesse) no contexto enviado ao Claude
  - [x] 5.6 Manter backward compatibility (se mentorId nao enviado, assume 'concierge')

- [x] Task 6: Atualizar chat store para multi-mentor (AC: 10)
  - [x] 6.1 Modificar `src/stores/chat-store.ts`
  - [x] 6.2 Adicionar state: `assessmentResult`, `conversationPhase`, `mentorHistory` (mapa mentorId -> messages)
  - [x] 6.3 Adicionar action: `setMentor(mentorId)` - troca mentor ativo, preserva historico por mentor
  - [x] 6.4 Adicionar action: `setAssessmentResult(result)` - salva resultado da avaliacao
  - [x] 6.5 Adicionar action: `setConversationPhase(phase)` - atualiza fase
  - [x] 6.6 Ao trocar mentor, carregar historico existente ou iniciar novo

## Dev Notes

### Fluxo de Assessment (do Knowledge Bases Doc)

```
Pergunta 1 - Experiencia com IA:
  - Nunca usei            -> Score +1
  - Uso basico            -> Score +3
  - Uso intermediario     -> Score +5
  - Uso avancado          -> Score +8

Pergunta 2 - Contexto profissional:
  - Comecando / quer criar algo           -> Score +1, Interesse: fundamentos
  - Tem negocio, quer crescer             -> Score +3, Interesse: escala
  - Fatura bem, quer automatizar/inovar   -> Score +5, Interesse: inovacao
  - C-level / lider tech                  -> Score +7, Interesse: estrategia

Pergunta 3 - Objetivo:
  - Aprender o basico       -> Tag: fundamentos   -> Nicolas
  - Criar conteudo          -> Tag: conteudo       -> Gary
  - Vender mais             -> Tag: vendas         -> Erico + Russell + Hormozi
  - Escalar negocio         -> Tag: escala         -> Hormozi + Elon
  - Inovar/futuro           -> Tag: inovacao       -> Elon + Altman
```

### Matriz de Roteamento

```
Score 1-4  (Iniciante):       Nicolas (sempre) + Gary (se conteudo)
Score 5-8  (Intermediario):   Erico (vendas) / Russell (funis) / Gary (conteudo)
Score 9-12 (Inter-Avancado):  Hormozi (escala) / Russell (funis avancados)
Score 13+  (Avancado):        Elon (inovacao) / Altman (estrategia IA)
```

### Scoring Engine - Prompt de Analise

```typescript
// src/lib/ai/orchestrator/scoring-engine.ts

const ANALYSIS_PROMPT = `
Analise as respostas do visitante na conversa com a concierge e determine:

1. Score numerico (1-15) baseado em:
   - Experiencia com IA (1-8 pontos)
   - Contexto profissional (1-7 pontos)

2. Nivel derivado do score:
   - 1-4: "iniciante"
   - 5-8: "intermediario"
   - 9-12: "intermediario-avancado" (tratar como "avancado" para simplificar)
   - 13+: "avancado"

3. Area de interesse principal (uma das seguintes):
   - "ia_pratica" (quer aprender ferramentas)
   - "conteudo" (quer criar conteudo)
   - "vendas" (quer vender mais)
   - "escala" (quer escalar negocio)
   - "inovacao" (quer inovar com IA)
   - "estrategia" (quer visao estrategica)

4. Top 2-3 mentores recomendados (slugs: nicolas, gary, erico, russell, hormozi, elon, altman)

Respostas do visitante:
{USER_MESSAGES}

IMPORTANTE: Responda APENAS com JSON valido, sem texto adicional:
{
  "score": <numero>,
  "level": "<iniciante|intermediario|avancado>",
  "interest": "<ia_pratica|conteudo|vendas|escala|inovacao|estrategia>",
  "mentors": ["<slug1>", "<slug2>"],
  "reasoning": "<breve explicacao em 1 frase>"
}
`;

export async function analyzeAssessment(
  messages: Array<{ role: string; content: string }>
): Promise<AssessmentResult> {
  const userMessages = messages
    .filter(m => m.role === 'user')
    .map(m => m.content)
    .join('\n---\n')

  const prompt = ANALYSIS_PROMPT.replace('{USER_MESSAGES}', userMessages)

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    const result = JSON.parse(text)

    return {
      score: result.score,
      level: result.level,
      interest: result.interest,
      recommendedMentors: result.mentors,
      reasoning: result.reasoning,
    }
  } catch {
    // Fallback: retorna assessment padrao
    return {
      score: 3,
      level: 'iniciante',
      interest: 'ia_pratica',
      recommendedMentors: ['nicolas', 'gary'],
      reasoning: 'Assessment automatico (fallback)',
    }
  }
}
```

### Agent Router - State Machine

```typescript
// src/lib/ai/orchestrator/agent-router.ts

import { assembleMentorPrompt } from '@/lib/ai/prompts/prompt-assembler'
import { analyzeAssessment } from '@/lib/ai/orchestrator/scoring-engine'
import { CONCIERGE_SYSTEM_PROMPT } from '@/lib/ai/prompts/concierge'

interface RouterContext {
  mentorId: string
  messageCount: number
  messages: Array<{ role: string; content: string }>
  assessmentResult?: AssessmentResult | null
  userLevel?: string
  interest?: string
  accessType: 'free' | 'premium'
}

export class AgentRouter {
  static async route(context: RouterContext): Promise<RoutingDecision> {
    // Fase concierge
    if (context.mentorId === 'concierge') {
      return this.routeConcierge(context)
    }

    // Fase mentor: usar prompt assembler
    return {
      phase: 'mentor_session',
      mentorId: context.mentorId,
      systemPrompt: assembleMentorPrompt({
        mentorId: context.mentorId,
        userLevel: (context.userLevel as UserLevel) ?? 'iniciante',
        accessType: context.accessType,
        messageCount: context.messageCount,
        interest: context.interest ?? 'ia_pratica',
      }),
      metadata: {},
    }
  }

  private static async routeConcierge(context: RouterContext): Promise<RoutingDecision> {
    // Menos de 5 mensagens do usuario: ainda avaliando
    const userMessageCount = context.messages.filter(m => m.role === 'user').length

    if (userMessageCount < 3) {
      return {
        phase: 'assessment',
        mentorId: 'concierge',
        systemPrompt: CONCIERGE_SYSTEM_PROMPT,
        metadata: {},
      }
    }

    // 3+ mensagens: hora de analisar e recomendar
    const assessment = await analyzeAssessment(context.messages)

    return {
      phase: 'recommendation',
      mentorId: 'concierge',
      systemPrompt: CONCIERGE_SYSTEM_PROMPT,
      metadata: {
        assessmentResult: assessment,
        triggerRecommendation: true,
      },
    }
  }
}
```

### Atualizacao da API `/api/chat`

```typescript
// Mudancas no src/app/api/chat/route.ts

interface ChatRequest {
  conversationId: string
  message: string
  sessionId: string
  mentorId?: string                    // NOVO: slug do mentor ativo
  history?: Array<{ role: 'user' | 'assistant'; content: string }>
  assessmentResult?: AssessmentResult  // NOVO: resultado da avaliacao
}

// Na funcao POST:
// 1. Se mentorId === 'concierge' ou undefined -> usar CONCIERGE_SYSTEM_PROMPT
// 2. Se mentorId !== 'concierge' -> usar assembleMentorPrompt()
// 3. Incluir assessment data no contexto

const systemPrompt = body.mentorId && body.mentorId !== 'concierge'
  ? assembleMentorPrompt({
      mentorId: body.mentorId,
      userLevel: body.assessmentResult?.level ?? 'iniciante',
      accessType: 'free',
      messageCount: body.history?.length ?? 0,
      interest: body.assessmentResult?.interest ?? 'ia_pratica',
    })
  : CONCIERGE_SYSTEM_PROMPT
```

### Atualizacao do Chat Store

```typescript
// Novas propriedades no src/stores/chat-store.ts

interface ChatState {
  // ... existentes ...
  assessmentResult: AssessmentResult | null  // NOVO
  conversationPhase: ConversationPhase       // NOVO
  mentorHistory: Record<string, Message[]>   // NOVO: historico por mentor
}

interface ChatActions {
  // ... existentes ...
  setMentor: (mentorId: string) => void       // NOVO
  setAssessmentResult: (result: AssessmentResult) => void  // NOVO
  setConversationPhase: (phase: ConversationPhase) => void // NOVO
}

// Action setMentor:
setMentor: (mentorId) => set((state) => {
  // Salvar mensagens atuais no historico do mentor atual
  const updatedHistory = { ...state.mentorHistory }
  if (state.mentorId && state.messages.length > 0) {
    updatedHistory[state.mentorId] = state.messages
  }

  // Carregar historico do novo mentor (ou iniciar vazio)
  const newMessages = updatedHistory[mentorId] ?? []

  return {
    mentorId,
    messages: newMessages,
    mentorHistory: updatedHistory,
    messageCount: newMessages.length,
  }
})
```

### Prompt de Transicao (Concierge -> Mentor)

Quando o usuario seleciona um mentor, a primeira mensagem do mentor deve incluir contexto:

```typescript
// Adicionado ao system prompt do mentor como contexto:
const TRANSITION_CONTEXT = `
CONTEXTO DO VISITANTE (avaliado pela concierge):
- Nivel detectado: ${assessment.level}
- Area de interesse: ${assessment.interest}
- Score: ${assessment.score}
- Razao da recomendacao: ${assessment.reasoning}

Inicie a conversa se apresentando brevemente e mostrando que sabe
o que o visitante busca. Nao repita a avaliacao — va direto ao ensino.
`
```

### Referencia: Codigo Existente

- `src/app/api/chat/route.ts` - API que sera modificada (usa `CONCIERGE_SYSTEM_PROMPT` hardcoded)
- `src/stores/chat-store.ts` - Store que sera estendida (mentorId existe mas nao muda)
- `src/lib/ai/prompts/concierge.ts` - Prompt da concierge (nao modificar, continua como esta)
- `src/config/mentors.ts` - Config dos mentores com slugs, cores, etc.

## File List

**Novos arquivos a criar:**
- `src/types/routing.ts`
- `src/lib/ai/orchestrator/scoring-engine.ts`
- `src/lib/ai/orchestrator/agent-router.ts`
- `src/lib/ai/prompts/assessment-prompt.ts`

**Arquivos a modificar:**
- `src/app/api/chat/route.ts` - Integrar AgentRouter e PromptAssembler
- `src/stores/chat-store.ts` - Adicionar assessmentResult, conversationPhase, mentorHistory, setMentor

## Dependencies

- **Story 2.1** (Mentor Prompts) - OBRIGATORIA. O PromptAssembler e os system prompts dos mentores devem existir
- **Story 1.4** (Concierge Chat) - COMPLETA. API de chat, store, SSE streaming existentes
- **Anthropic API Key** - Necessaria para scoring engine (chamada adicional ao Claude para analise)

## Definition of Done

- [x] Scoring engine analisa respostas e retorna nivel/interesse/mentores
- [x] Agent router direciona para prompt correto baseado na fase
- [x] API `/api/chat` aceita `mentorId` e usa prompt do mentor correspondente
- [x] Chat store suporta troca de mentor com preservacao de historico
- [x] Fallback funciona quando assessment e inconclusivo
- [x] Transicao concierge -> mentor preserva contexto da avaliacao
- [x] Build passa sem erros (`npm run build`)
- [x] TypeScript check passa (`npm run typecheck`)
- [x] Lint passa (`npm run lint`)

## Size Estimate

**M** (Medium) - 1 sessao de desenvolvimento (~2-3 horas). Logica de routing, scoring engine, atualizacao de API e store.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-12 | 1.0 | Story criada a partir do PRD, Architecture Doc e Knowledge Bases | Morgan (PM Agent) |

## QA Results

_A ser preenchido pelo QA agent_
