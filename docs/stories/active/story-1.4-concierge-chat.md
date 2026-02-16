# Story 1.4: Concierge Agent - Basic Chat Interface

## Status

Done

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build", "api-test"]

## Story

**As a** visitante,
**I want** poder conversar com um agente IA concierge diretamente na landing page,
**so that** eu tenha uma experiencia interativa e personalizada que me direcione ao mentor ideal.

## Acceptance Criteria

- [x] 1. Interface de chat implementada na landing page (abre como modal/drawer ao clicar no CTA)
- [x] 2. Campo de input com botao de envio e suporte a tecla Enter para enviar
- [x] 3. Mensagens do usuario e do agente exibidas com visual distinto (alinhamento, cores, avatars)
- [x] 4. Indicador de "digitando..." animado enquanto agente processa resposta
- [x] 5. Streaming de resposta via SSE (texto aparece progressivamente, palavra por palavra)
- [x] 6. API route `POST /api/chat` criada com integracao Claude API (Anthropic SDK)
- [x] 7. API route `POST /api/conversations` para criar nova conversa com o concierge
- [x] 8. System prompt do concierge implementado (saudacao + perguntas de avaliacao de nivel)
- [x] 9. Maximo 20 mensagens por sessao controlado via state (contador visivel ao usuario)
- [x] 10. Chat responsivo: funciona bem em mobile (fullscreen) e desktop (modal/drawer lateral)
- [x] 11. Historico da conversa mantido durante a sessao via Zustand store
- [x] 12. Mensagem de boas-vindas automatica do concierge ao abrir o chat
- [x] 13. Formatacao markdown nas respostas do agente (negrito, listas, exemplos)
- [x] 14. Scroll automatico para a mensagem mais recente
- [x] 15. Estado de erro tratado (falha na API mostra mensagem amigavel com opcao de tentar novamente)
- [x] 16. Session ID gerado e armazenado em cookie para identificar o visitante

## Tasks / Subtasks

- [x] Task 1: Criar Chat Store com Zustand (AC: 11, 16)
  - [x] 1.1 Criar `src/stores/chat-store.ts` com Zustand
  - [x] 1.2 State: messages[], conversationId, sessionId, mentorId, messageCount, isLoading, error
  - [x] 1.3 Actions: addMessage, setLoading, setError, resetChat, incrementMessageCount
  - [x] 1.4 Gerar sessionId unico e persistir em cookie (uuid ou nanoid)

- [x] Task 2: Criar API route POST /api/conversations (AC: 7)
  - [x] 2.1 Criar `src/app/api/conversations/route.ts`
  - [x] 2.2 Receber: mentorSlug ('concierge'), sessionId
  - [x] 2.3 Retornar: conversationId, mentorInfo, welcomeMessage
  - [x] 2.4 Nesta fase, conversationId e gerado em memoria (sem Supabase ainda)

- [x] Task 3: Criar API route POST /api/chat com SSE streaming (AC: 5, 6, 8)
  - [x] 3.1 Criar `src/app/api/chat/route.ts`
  - [x] 3.2 Instalar `@anthropic-ai/sdk`
  - [x] 3.3 Implementar streaming via SSE com `ReadableStream`
  - [x] 3.4 Receber: conversationId, message, sessionId
  - [x] 3.5 Enviar eventos SSE: `text` (conteudo incremental), `done` (fim), `error`
  - [x] 3.6 Implementar system prompt do concierge (saudacao + avaliacao de nivel)
  - [x] 3.7 Manter historico das ultimas 20 mensagens no contexto enviado ao Claude
  - [x] 3.8 Usar modelo `claude-sonnet-4-20250514` com max_tokens 1024

- [x] Task 4: Implementar System Prompt do Concierge (AC: 8)
  - [x] 4.1 Criar `src/lib/ai/prompts/concierge.ts`
  - [x] 4.2 Prompt inclui: saudacao como assistente da Silvia Assay
  - [x] 4.3 Prompt instrui: fazer perguntas naturais para avaliar nivel
  - [x] 4.4 Prompt instrui: recomendar mentores baseado nas respostas
  - [x] 4.5 Prompt instrui: responder sempre em portugues BR, maximo 200 palavras

- [x] Task 5: Criar componentes de chat UI (AC: 1, 2, 3, 4, 10, 13, 14)
  - [x] 5.1 Criar `src/components/chat/chat-interface.tsx` (container principal)
  - [x] 5.2 Criar `src/components/chat/chat-message.tsx` (bolha de mensagem)
  - [x] 5.3 Criar `src/components/chat/chat-input.tsx` (input + botao enviar)
  - [x] 5.4 Criar `src/components/chat/chat-typing-indicator.tsx` (animacao de 3 pontos)
  - [x] 5.5 Criar `src/components/chat/mentor-avatar.tsx` (avatar com anel colorido)
  - [x] 5.6 Implementar renderizacao markdown nas mensagens do agente (react-markdown ou similar)
  - [x] 5.7 Implementar auto-scroll para ultima mensagem
  - [x] 5.8 Layout responsivo: drawer lateral em desktop, fullscreen em mobile

- [x] Task 6: Implementar hook de streaming SSE (AC: 5)
  - [x] 6.1 Criar `src/hooks/use-chat-stream.ts`
  - [x] 6.2 Implementar leitura de SSE stream com fetch + ReadableStream reader
  - [x] 6.3 Processar eventos incrementais e atualizar a store progressivamente
  - [x] 6.4 Tratar erros de conexao e timeout

- [x] Task 7: Integrar chat na landing page (AC: 1, 9, 12, 15)
  - [x] 7.1 Adicionar botao de abertura do chat na landing page (conectar ao CTA do Hero)
  - [x] 7.2 Ao abrir, criar conversa (POST /api/conversations) e exibir mensagem de boas-vindas
  - [x] 7.3 Implementar contador de mensagens (X/20 restantes) visivel no chat
  - [x] 7.4 Ao atingir 20 mensagens, exibir aviso "Limite atingido" (gate real vem na Epic 3)
  - [x] 7.5 Implementar tratamento de erro com mensagem amigavel e botao "Tentar novamente"

## Dev Notes

### System Prompt do Concierge

```typescript
// src/lib/ai/prompts/concierge.ts

export const CONCIERGE_SYSTEM_PROMPT = `
Voce e a assistente virtual da AI Mentor Academy, criada por Silvia Assay.
Seu nome e "Ana" e voce e a concierge que recebe visitantes.

SEU OBJETIVO:
Receber o visitante com simpatia, entender seu nivel de experiencia com IA,
e recomendar o(s) melhor(es) mentor(es) IA para ele.

COMO VOCE OPERA:
1. Cumprimente o visitante de forma calorosa
2. Faca perguntas naturais para entender:
   - Experiencia com IA (ja usou ChatGPT? Como?)
   - Area de atuacao (negocio proprio, empresa, estudante)
   - Objetivo com IA (produtividade, vendas, criar produtos, inovar, conteudo)
   - Nivel de conforto com tecnologia
3. Baseado nas respostas, classifique internamente:
   - Iniciante (nunca usou ou usa basico)
   - Intermediario (usa regularmente, quer aprofundar)
   - Avancado (usa profissionalmente, quer dominar)
4. Recomende 2-3 mentores mais adequados

MENTORES DISPONIVEIS:
- Nicolas: IA Pratica, Prompts, Automacao (ideal: iniciante)
- Erico: Lancamentos, Funis digitais (ideal: intermediario)
- Elon: Inovacao disruptiva, First principles (ideal: avancado)
- Hormozi: Ofertas irresistiveis, Escala (ideal: intermediario-avancado)
- Russell: Funis de vendas, Storytelling (ideal: intermediario)
- Altman: Futuro da IA, Startups (ideal: avancado)
- Gary: Conteudo organico, Redes sociais (ideal: iniciante-intermediario)

REGRAS:
- Responda SEMPRE em portugues brasileiro
- Seja concisa: maximo 200 palavras por resposta
- Use tom acolhedor e profissional
- NAO mencione que e uma IA generica - voce e Ana, a concierge
- NAO force venda do programa - foque em direcionar para mentores
- Use markdown quando util (negrito para nomes, listas para opcoes)
`
```

### Arquitetura da API de Chat (da Architecture Doc)

```
POST /api/chat
  Request: { conversationId, message, sessionId }
  Response: SSE stream
    data: { type: "text", content: "..." }     -- texto incremental
    data: { type: "done", messageId: "..." }    -- fim da resposta
    data: { type: "error", message: "..." }     -- erro

POST /api/conversations
  Request: { mentorSlug: "concierge", sessionId }
  Response: { conversationId, mentorName, welcomeMessage }
```

### SSE Streaming Pattern (da Architecture Doc)

```typescript
// Padrao para criar stream SSE na API route:
const stream = await anthropic.messages.stream({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  system: systemPrompt,
  messages: conversationHistory,
})

const readableStream = new ReadableStream({
  async start(controller) {
    const encoder = new TextEncoder()
    stream.on('text', (text) => {
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: 'text', content: text })}\n\n`)
      )
    })
    stream.on('end', () => {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`))
      controller.close()
    })
  },
})

return new Response(readableStream, {
  headers: {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  },
})
```

### Client-Side SSE Reading Pattern

```typescript
// Hook para ler stream SSE:
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ conversationId, message, sessionId }),
})

const reader = response.body?.getReader()
const decoder = new TextDecoder()

while (true) {
  const { done, value } = await reader.read()
  if (done) break

  const text = decoder.decode(value)
  const lines = text.split('\n\n').filter(Boolean)

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6))
      if (data.type === 'text') {
        // Append to current message progressively
      } else if (data.type === 'done') {
        // Mark message as complete
      } else if (data.type === 'error') {
        // Show error to user
      }
    }
  }
}
```

### Zustand Chat Store

```typescript
// src/stores/chat-store.ts
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

interface ChatState {
  messages: Message[]
  conversationId: string | null
  sessionId: string
  mentorId: string
  messageCount: number
  isLoading: boolean
  error: string | null
  maxMessages: number
}
```

### Componentes de Chat (da Architecture Doc)

```
src/components/chat/
  chat-interface.tsx          # Container: header com info mentor + area mensagens + input
  chat-message.tsx            # Bolha: avatar + conteudo + timestamp
  chat-input.tsx              # Input + botao enviar + tecla Enter
  chat-typing-indicator.tsx   # 3 pontos animados
  mentor-avatar.tsx           # Circulo com iniciais/avatar + borda na cor do mentor

src/hooks/
  use-chat-stream.ts          # Hook para SSE streaming
```

### Decisoes de Simplificacao para MVP (Story 1.4)

- **Sem Supabase nesta story**: Historico e conversationId gerenciados em memoria/store
- **Sem rate limiter real**: Contagem de mensagens via state local (20 max)
- **Sem RAG**: Concierge usa apenas system prompt base (sem knowledge base)
- **Sem prompt guard**: Protecao contra injection vem na Epic 2
- **Concierge apenas**: Nao ha troca para mentor individual ainda (vem na Story 2.3)
- **Mensagem de boas-vindas**: Hardcoded, nao gerada pelo Claude

### Dependencias npm Adicionais

```
@anthropic-ai/sdk    # SDK do Claude para streaming
react-markdown       # Renderizar markdown nas mensagens
nanoid               # Gerar session IDs unicos
```

### Testing

- Testar envio de mensagem e recebimento de resposta streamed
- Testar indicador de "digitando" durante streaming
- Testar limite de 20 mensagens (mostra aviso ao atingir)
- Testar responsividade: mobile (fullscreen) e desktop (drawer)
- Testar tratamento de erro (desconectar internet, simular falha API)
- Testar tecla Enter para enviar
- Verificar que build passa sem erros

## Dependencies

- **Story 1.1** (Project Setup) - base tecnica, Supabase client (nao usado ainda mas configurado)
- **Story 1.2** (Design System) - componentes UI, tema, animacoes
- **Story 1.3** (Landing Page) - pagina onde o chat sera integrado, CTA conecta ao chat
- **Anthropic API Key** configurada em `.env.local`

## Definition of Done

- [x] Chat abre ao clicar no CTA da landing page
- [x] Mensagem de boas-vindas do concierge aparece automaticamente
- [x] Visitante pode enviar mensagens e receber respostas em streaming
- [x] Indicador "digitando..." funciona durante streaming
- [x] Respostas formatadas com markdown (negrito, listas)
- [x] Scroll automatico para ultima mensagem
- [x] Contador de mensagens visivel (X/20)
- [x] Limite de 20 mensagens funcional
- [x] Concierge faz perguntas de avaliacao de nivel
- [x] Chat responsivo em mobile e desktop
- [x] Erros tratados com mensagem amigavel
- [x] Session ID persistido em cookie
- [x] Build passa sem erros
- [x] API route `/api/chat` funcional com Claude API

## Size Estimate

**L** (Large) - 1 sessao focada de desenvolvimento (~4-5 horas)

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-12 | 1.0 | Story criada a partir do PRD e Arquitetura | Morgan (PM Agent) |
| 2026-02-12 | 1.1 | Implementacao completa de todas as tasks | Dex (Dev Agent) |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

- Build: OK (zero errors, zero warnings)
- TypeScript: OK (tsc --noEmit passes clean)
- ESLint: OK (zero violations)

### Completion Notes List

- Chat store implementado com Zustand, session ID persistido em cookie com 30 dias de validade
- API /api/conversations retorna conversationId gerado com nanoid + welcome message hardcoded
- API /api/chat implementa SSE streaming com Anthropic SDK, modelo claude-sonnet-4-20250514
- System prompt enriquecido com informacoes detalhadas dos mentores do knowledge-bases doc
- Welcome message inclui pergunta inicial para engajar o visitante
- Quando API key nao configurada, retorna erro amigavel via SSE (nao quebra o build/deploy)
- Chat UI: drawer lateral 420px em desktop, fullscreen em mobile
- Markdown rendering com react-markdown, bold em gold para destaque
- Auto-scroll via scrollIntoView com behavior smooth
- Contador X/20 no header do chat, limite bloqueia input ao atingir
- Retry button no erro reinicia toda a conversa
- CTAs conectados: Hero "Falar com um Mentor IA Agora", Header "Fale com um Mentor", FinalCta "Falar com Mentor Gratis"

### File List

**Novos arquivos criados:**
- `src/stores/chat-store.ts` - Zustand store para estado do chat
- `src/lib/ai/prompts/concierge.ts` - System prompt do concierge Ana + welcome message
- `src/app/api/conversations/route.ts` - API route para criar conversas
- `src/app/api/chat/route.ts` - API route com SSE streaming via Anthropic SDK
- `src/hooks/use-chat-stream.ts` - Hook para leitura de SSE stream
- `src/components/chat/chat-interface.tsx` - Container principal do chat
- `src/components/chat/chat-message.tsx` - Bolha de mensagem com markdown
- `src/components/chat/chat-input.tsx` - Input com textarea auto-resize
- `src/components/chat/chat-typing-indicator.tsx` - Indicador de digitacao animado
- `src/components/chat/mentor-avatar.tsx` - Avatar circular com cor do mentor

**Arquivos modificados:**
- `src/app/page.tsx` - Adicionado ChatInterface
- `src/components/landing/hero-section.tsx` - CTA conectado ao chat (adicionado "use client")
- `src/components/landing/final-cta.tsx` - CTA conectado ao chat (adicionado "use client")
- `src/components/layout/header.tsx` - CTAs desktop e mobile conectados ao chat
- `package.json` - Adicionadas dependencias: @anthropic-ai/sdk, react-markdown, nanoid

## QA Results

_A ser preenchido pelo QA agent_
