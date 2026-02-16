# Story 2.3: Mentor Chat Experience

## Status

Done

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build"]

## Story

**As a** visitante,
**I want** conversar com o mentor IA selecionado em uma interface personalizada com a identidade visual do mentor,
**so that** eu perceba o valor do metodo e tenha uma experiencia unica e imersiva com cada mentor.

## Acceptance Criteria

- [x] 1. Interface de chat dedicada por mentor: cor de destaque, avatar, nome do mentor no header
- [x] 2. Ao selecionar mentor (via recomendacao da concierge ou menu), chat carrega com identidade visual do mentor
- [x] 3. Header do chat mostra: avatar do mentor (iniciais + cor), nome, especialidade, badge de nivel ideal
- [x] 4. Cor de destaque do chat (borda, botao enviar, nome do mentor) muda conforme mentor ativo
- [x] 5. Troca de mentor possivel via selector/dropdown no header do chat
- [x] 6. Ao trocar mentor, historico da conversa anterior e preservado (pode voltar)
- [x] 7. Cada mentor ensina usando seus frameworks reais (system prompt da Story 2.1 + routing da Story 2.2)
- [x] 8. Respostas formatadas com markdown (listas, negrito, exemplos) - ja existe da Story 1.4
- [x] 9. Mentor adapta profundidade ao nivel detectado do visitante (via assessment da Story 2.2)
- [x] 10. Historico de conversa separado por mentor na mesma sessao
- [x] 11. Mensagem de boas-vindas personalizada do mentor ao iniciar conversa com ele
- [x] 12. Animacao de transicao suave ao trocar de mentor (fade out/in da cor)
- [x] 13. Botao "Voltar para concierge" sempre acessivel

## Tasks / Subtasks

- [x] Task 1: Criar componente MentorSelector (AC: 5, 13)
  - [x] 1.1 Criar `src/components/chat/mentor-selector.tsx`
  - [x] 1.2 Dropdown/sheet com lista dos 7 mentores + concierge
  - [x] 1.3 Cada mentor mostra: avatar (iniciais + cor), nome, especialidade curta
  - [x] 1.4 Mentor ativo tem indicador visual (checkmark ou borda)
  - [x] 1.5 Opcao "Voltar para Ana (Concierge)" sempre no topo
  - [x] 1.6 Em mobile: abre como bottom sheet. Em desktop: dropdown
  - [x] 1.7 Ao selecionar, chama `setMentor(mentorId)` do chat store

- [x] Task 2: Atualizar ChatInterface para suportar mentores (AC: 1, 3, 4, 12)
  - [x] 2.1 Modificar `src/components/chat/chat-interface.tsx`
  - [x] 2.2 Header mostra info do mentor ativo: avatar com cor, nome, especialidade
  - [x] 2.3 Cor de destaque dinamica baseada no `mentor.color` (borda do header, botao enviar, links)
  - [x] 2.4 Usar CSS custom properties para cor dinamica: `--mentor-color`
  - [x] 2.5 Animacao de transicao ao trocar mentor (fade ou slide de cor)
  - [x] 2.6 Integrar MentorSelector no header do chat

- [x] Task 3: Atualizar MentorAvatar para mentores individuais (AC: 1, 3)
  - [x] 3.1 Modificar `src/components/chat/mentor-avatar.tsx`
  - [x] 3.2 Avatar usa iniciais do mentor (N, G, E, R, H, El, A) com cor de fundo do mentor
  - [x] 3.3 Bordas e glow na cor do mentor
  - [x] 3.4 Tamanhos: sm (mensagens), md (header), lg (selector)

- [x] Task 4: Gerar mensagens de boas-vindas por mentor (AC: 11)
  - [x] 4.1 Criar `src/lib/ai/prompts/mentor-welcome-messages.ts`
  - [x] 4.2 Mensagem personalizada por mentor (hardcoded, nao gerada pelo Claude)
  - [x] 4.3 Incluir assessmentResult na mensagem se disponivel (ex: "Vi que voce se interessa por {interesse}...")
  - [x] 4.4 Tom e estilo consistente com persona do mentor

- [x] Task 5: Integrar routing no fluxo de chat (AC: 2, 7, 9, 10)
  - [x] 5.1 Modificar `src/hooks/use-chat-stream.ts`
  - [x] 5.2 Ao enviar mensagem, incluir `mentorId` e `assessmentResult` no body do POST /api/chat
  - [x] 5.3 Quando concierge recomenda mentores, detectar no response e oferecer botoes de selecao
  - [x] 5.4 Ao selecionar mentor, chamar setMentor() e adicionar welcome message do mentor
  - [x] 5.5 Historico enviado ao API e filtrado pelo mentor ativo (nao misturar conversas)

- [x] Task 6: Criar componente MentorRecommendation (AC: 2)
  - [x] 6.1 Criar `src/components/chat/mentor-recommendation.tsx`
  - [x] 6.2 Cards dos mentores recomendados dentro do chat (inline, nao modal)
  - [x] 6.3 Cada card: avatar, nome, especialidade, cor, botao "Conversar"
  - [x] 6.4 Aparece apos concierge fazer a recomendacao
  - [x] 6.5 Ao clicar "Conversar", ativa o mentor selecionado

- [x] Task 7: Atualizar ChatMessage para estilo por mentor (AC: 4, 8)
  - [x] 7.1 Modificar `src/components/chat/chat-message.tsx`
  - [x] 7.2 Mensagens do assistant usam cor de destaque do mentor ativo
  - [x] 7.3 Avatar do assistant muda para o mentor ativo
  - [x] 7.4 Links e bold no markdown usam cor do mentor

## Dev Notes

### Dados de Mentor ja Disponiveis

O arquivo `src/config/mentors.ts` ja tem todos os dados necessarios:

```typescript
// Dados existentes por mentor:
{
  id: "nicolas",
  name: "Nicolas",
  basedOn: "Alan Nicolas",
  tagline: "IA Pratica, Prompts & Automacao",
  specialty: "IA Pratica, Engenharia de Prompts, Automacao com IA",
  level: "Iniciante",
  color: "#2563EB",        // Cor primaria
  colorLight: "#3B82F6",   // Cor clara
  colorMuted: "rgba(37,99,235,0.15)", // Cor de fundo
  gradient: "linear-gradient(135deg, #2563EB, #1D4ED8)",
  icon: "Zap",
  slug: "nicolas",
}
```

### Cor Dinamica via CSS Custom Properties

```typescript
// No ChatInterface, setar variaveis CSS baseado no mentor ativo:
const mentorConfig = MENTORS.find(m => m.id === mentorId)

<div
  style={{
    '--mentor-color': mentorConfig?.color ?? '#D4A843',
    '--mentor-color-light': mentorConfig?.colorLight ?? '#E8C96A',
    '--mentor-color-muted': mentorConfig?.colorMuted ?? 'rgba(212,168,67,0.15)',
  } as React.CSSProperties}
>
  {/* Header, messages, input usam var(--mentor-color) */}
</div>
```

### Mensagens de Boas-Vindas por Mentor

```typescript
// src/lib/ai/prompts/mentor-welcome-messages.ts

export const MENTOR_WELCOME_MESSAGES: Record<string, (assessment?: AssessmentResult) => string> = {
  nicolas: (a) => `E ai! Sou o **Nicolas**, especialista em IA pratica. ${a?.interest === 'ia_pratica' ? 'Vi que voce quer dominar ferramentas de IA — perfeito, e exatamente meu forte!' : 'Vou te mostrar como usar IA no dia a dia de verdade.'} Me conta: qual sua maior dificuldade com IA hoje?`,

  gary: (a) => `Fala! Sou o **Gary**, e vou ser direto: ${a?.interest === 'conteudo' ? 'voce quer criar conteudo? Entao para de planejar e comeca a postar!' : 'se voce nao esta produzindo conteudo, esta deixando dinheiro na mesa.'} Me conta o que voce esta fazendo AGORA em termos de conteudo.`,

  erico: (a) => `Ola! Sou o **Erico**, especialista em lancamentos digitais. ${a?.interest === 'vendas' ? 'Vi que voce quer vender mais — lancamentos sao o caminho mais rapido para isso.' : 'Vou te mostrar como a Formula de Lancamento pode transformar seu negocio.'} Ja fez algum tipo de lancamento digital?`,

  russell: (a) => `Prazer! Sou o **Russell**. Deixa eu te contar uma coisa: ${a?.interest === 'vendas' ? 'quando eu comecei, achava que vender era so colocar um botao de compra. Ate descobrir o poder dos funis.' : 'todo negocio de sucesso tem um funil por tras, mesmo que nao saiba.'} Voce ja tem algum funil montado no seu negocio?`,

  hormozi: (a) => `Sou o **Hormozi**. Sem enrolacao: ${a?.interest === 'escala' ? 'voce quer escalar? Entao a primeira pergunta e: sua oferta e boa o suficiente para escalar?' : 'a maioria dos negocios nao tem problema de trafego. Tem problema de oferta.'} Quanto voce cobra pelo seu produto/servico principal?`,

  elon: (a) => `Sou o **Elon**. Antes de qualquer coisa, quero entender: ${a?.interest === 'inovacao' ? 'voce quer inovar — otimo. Mas me diz: qual premissa do seu negocio voce NUNCA questionou?' : 'por que voce faz as coisas do jeito que faz? Ja pensou nisso de verdade?'} Vamos decompor isso juntos.`,

  altman: (a) => `Ola, sou o **Altman**. ${a?.interest === 'estrategia' ? 'Voce busca visao estrategica sobre IA — isso mostra maturidade.' : 'Antes de responder qualquer coisa, deixa eu te fazer uma pergunta:'} O que voce acha que mudaria no seu negocio se IA pudesse fazer 80% do trabalho operacional?`,
}
```

### MentorSelector Component

```typescript
// src/components/chat/mentor-selector.tsx

// Lista de mentores com concierge no topo:
const mentorOptions = [
  { id: 'concierge', name: 'Ana', tagline: 'Concierge', color: '#D4A843' },
  ...MENTORS.map(m => ({ id: m.id, name: m.name, tagline: m.tagline, color: m.color })),
]

// Mobile: bottom sheet (usando dialog/drawer existente)
// Desktop: dropdown com popover
```

### MentorRecommendation Component (inline no chat)

```typescript
// src/components/chat/mentor-recommendation.tsx

// Renderizado como uma mensagem especial dentro do chat
// Props: recommendedMentors: string[] (slugs)
// Mostra cards clicaveis para cada mentor recomendado

interface MentorRecommendationProps {
  mentors: string[]  // ['nicolas', 'gary']
  onSelectMentor: (mentorId: string) => void
}

// Card layout:
// [Avatar] [Nome]
// [Especialidade]
// [Botao: Conversar com {Nome}]
```

### Deteccao de Recomendacao no Response

A concierge vai recomendar mentores no texto da resposta. Para detectar e mostrar cards interativos, podemos:

1. Apos o assessment (3+ mensagens do usuario), verificar se `assessmentResult` ja existe no state
2. Se existir, mostrar MentorRecommendation automaticamente apos a mensagem da concierge
3. Nao depender de parsing do texto (mais confiavel)

```typescript
// No use-chat-stream.ts, apos receber 'done' do SSE:
if (mentorId === 'concierge' && assessmentResult && conversationPhase === 'recommendation') {
  // Adicionar mensagem especial de tipo 'recommendation' ao chat
  addMessage({
    role: 'assistant',
    content: '__MENTOR_RECOMMENDATION__',  // Marcador especial
    isRecommendation: true,
    recommendedMentors: assessmentResult.recommendedMentors,
  })
}
```

### Componentes Existentes (da Epic 1)

- `src/components/chat/chat-interface.tsx` - Container com header + messages + input
- `src/components/chat/chat-message.tsx` - Bolha com avatar + markdown
- `src/components/chat/chat-input.tsx` - Input com textarea auto-resize
- `src/components/chat/chat-typing-indicator.tsx` - 3 pontos animados
- `src/components/chat/mentor-avatar.tsx` - Avatar circular com cor
- `src/hooks/use-chat-stream.ts` - Hook para SSE streaming
- `src/stores/chat-store.ts` - Zustand store (sera extendida na Story 2.2)

### Paleta de Cores dos Mentores (referencia)

| Mentor | Cor | Hex |
|--------|-----|-----|
| Nicolas | Azul eletrico | #2563EB |
| Erico | Vermelho | #DC2626 |
| Elon | Prata/Grafite | #94A3B8 |
| Hormozi | Dourado | #D4A843 |
| Russell | Laranja | #EA580C |
| Altman | Branco | #E2E8F0 |
| Gary | Amarelo | #EAB308 |
| Concierge (Ana) | Gold | #D4A843 |

## File List

**Novos arquivos a criar:**
- `src/components/chat/mentor-selector.tsx`
- `src/components/chat/mentor-recommendation.tsx`
- `src/lib/ai/prompts/mentor-welcome-messages.ts`

**Arquivos a modificar:**
- `src/components/chat/chat-interface.tsx` - Header dinamico, cor por mentor, integrar selector
- `src/components/chat/chat-message.tsx` - Cor de destaque por mentor
- `src/components/chat/mentor-avatar.tsx` - Iniciais e cor por mentor ativo
- `src/hooks/use-chat-stream.ts` - Enviar mentorId e assessmentResult, detectar recomendacao

**Arquivos existentes referenciados (nao modificar):**
- `src/config/mentors.ts` - Dados dos mentores
- `src/stores/chat-store.ts` - Ja atualizado na Story 2.2
- `src/app/api/chat/route.ts` - Ja atualizado na Story 2.2

## Dependencies

- **Story 2.1** (Mentor Prompts) - OBRIGATORIA. System prompts devem existir para os mentores funcionarem
- **Story 2.2** (Routing Engine) - OBRIGATORIA. AgentRouter, scoring engine, chat store atualizado
- **Story 1.4** (Concierge Chat) - COMPLETA. Componentes de chat, SSE streaming, API existentes

## Definition of Done

- [x] Ao selecionar mentor, cor do chat muda para cor do mentor
- [x] Header mostra avatar, nome e especialidade do mentor ativo
- [x] Troca de mentor funciona via selector (dropdown/sheet)
- [x] Historico e preservado por mentor ao trocar
- [x] Mensagem de boas-vindas personalizada aparece ao iniciar conversa com mentor
- [x] MentorRecommendation aparece inline no chat apos avaliacao da concierge
- [x] Mentor responde com personalidade distinta (prompt da Story 2.1)
- [x] "Voltar para concierge" funciona
- [x] Responsivo: funciona em mobile e desktop
- [x] Animacao de transicao suave ao trocar mentor
- [x] Build passa sem erros (`npm run build`)
- [x] TypeScript check passa (`npm run typecheck`)
- [x] Lint passa (`npm run lint`)

## Size Estimate

**L** (Large) - 1 sessao focada de desenvolvimento (~4-5 horas). Varios componentes UI, integracao com routing, estado complexo.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-12 | 1.0 | Story criada a partir do PRD, Architecture Doc e componentes existentes | Morgan (PM Agent) |

## QA Results

_A ser preenchido pelo QA agent_
