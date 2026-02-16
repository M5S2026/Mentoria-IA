# Story 3.2: Contextual CTAs & Program Page

## Status

In Progress

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build", "lighthouse"]

## Story

**As a** visitante qualificado,
**I want** conhecer os detalhes do programa completo quando estiver pronto,
**so that** eu possa tomar uma decisao informada de compra.

## Acceptance Criteria

- [x] 1. CTAs contextuais aparecem como banners inline no chat em momentos estrategicos (nao intrusivos)
- [x] 2. CTA contextual aparece apos mensagem 15 (suave) e apos mensagem 25 pos-gate (direto), com copy diferente para cada momento
- [x] 3. Pagina `/programa` criada com layout premium dark mode, otimizada para conversao
- [x] 4. Secao "O Que Voce Recebe" com os 7 itens do programa (copy real do docs/copy)
- [x] 5. Secao "Grade de Modulos" com tabela de 6 modulos (semanas, mentor, conteudo)
- [x] 6. Secao "Gratis vs. Programa Completo" com tabela comparativa (copy real do docs/copy)
- [x] 7. Secao "Investimento" com pricing card (12x R$497 ou R$4.997 a vista), ancoragem de valor R$53.000
- [x] 8. Secao FAQ com 10 perguntas (copy real do docs/copy, formato accordion)
- [x] 9. Secao depoimentos com 6 testimonials (copy do docs/copy, com disclaimer de beta testers)
- [x] 10. CTA principal "Garantir Minha Vaga Agora" apontando para checkout Hotmart (link externo por enquanto)
- [x] 11. CTA secundario "Ainda nao decidiu? Converse com um Mentor IA gratuitamente" abrindo o chat
- [x] 12. Secao de garantia: "7 dias de garantia incondicional"
- [x] 13. Timer de urgencia (vagas limitadas) configuravel via variavel - desabilitado por padrao
- [x] 14. Pagina SEO otimizada: meta tags, Open Graph, structured data
- [x] 15. Performance: LCP < 2.5s, CLS < 0.1 (pagina SSG)
- [x] 16. Mobile-first: todos textos legiveis, CTAs acessiveis, tabelas responsivas

## Tasks / Subtasks

- [x] Task 1: Criar pagina /programa com layout base (AC: 3, 14, 15, 16)
  - [x] 1.1 Criar `src/app/programa/page.tsx` como pagina SSG
  - [x] 1.2 Criar `src/app/programa/layout.tsx` com metadata SEO (title, description, Open Graph)
  - [x] 1.3 Layout: header fixo com CTA, sections com scroll suave, footer
  - [x] 1.4 Navegacao interna: links anchor para cada secao
  - [x] 1.5 Structured data JSON-LD (tipo Product/Course)
  - [x] 1.6 Design premium: dark mode, gradientes, sombras, consistente com landing page

- [x] Task 2: Secao Hero do Programa (AC: 3)
  - [x] 2.1 Criar `src/components/programa/programa-hero.tsx`
  - [x] 2.2 Titulo: "AI Mentor Academy -- Programa Completo"
  - [x] 2.3 Subtitulo: "12 semanas para dominar IA aplicada a negocios. Com 7 mentores IA 24/7 e mentoria ao vivo com Silvia Assay."
  - [x] 2.4 CTA principal no hero

- [x] Task 3: Secao "O Que Voce Recebe" (AC: 4)
  - [x] 3.1 Criar `src/components/programa/programa-benefits.tsx`
  - [x] 3.2 Grid de 7 cards com icone, titulo e descricao (copy REAL do docs/copy secao 7):
    - Acesso Ilimitado aos 7 Mentores IA (24/7)
    - 12 Modulos em Video com Silvia Assay
    - Calls Semanais Ao Vivo
    - Comunidade Exclusiva
    - Templates e Frameworks Prontos
    - Certificado de Conclusao
    - 30 Dias de Suporte Pos-Programa
  - [x] 3.3 Design: cards com icones, hover effect, layout grid responsivo

- [x] Task 4: Secao "Grade de Modulos" (AC: 5)
  - [x] 4.1 Criar `src/components/programa/programa-modules.tsx`
  - [x] 4.2 Tabela/cards com 6 modulos (copy REAL do docs/copy secao 7):
    - Semanas 1-2: Fundamentos de IA (Nicolas)
    - Semanas 3-4: IA para Conteudo (Gary)
    - Semanas 5-6: Funis e Lancamentos (Erico + Russell)
    - Semanas 7-8: Ofertas e Escala (Hormozi)
    - Semanas 9-10: Inovacao e Futuro (Elon + Altman)
    - Semanas 11-12: Implementacao Final (Todos)
  - [x] 4.3 Cada modulo mostra: semanas, titulo, mentor(es), o que aprende
  - [x] 4.4 Em mobile: cards empilhados. Em desktop: tabela ou timeline

- [x] Task 5: Secao Comparacao "Gratis vs. Programa" (AC: 6)
  - [x] 5.1 Criar `src/components/programa/programa-comparison.tsx`
  - [x] 5.2 Tabela comparativa com 10 recursos (copy REAL do docs/copy secao 8):
    - Conversa com mentores IA: 20 msgs vs. Ilimitado 24/7
    - Avaliacao de nivel: Sim vs. Sim (com relatorio detalhado)
    - Frameworks basicos: Parcial vs. Todos os 47 frameworks
    - Templates e scripts: Nao vs. Biblioteca completa
    - Modulos em video: Nao vs. 12 modulos com Silvia
    - Calls ao vivo semanais: Nao vs. Toda semana por 12 semanas
    - Comunidade exclusiva: Nao vs. Acesso total
    - Mentores em modo avancado: Nao vs. Sim (sem limites de profundidade)
    - Suporte pos-programa: Nao vs. 30 dias
    - Certificado: Nao vs. Sim
  - [x] 5.3 Visual: checkmarks verdes para programa, X cinza para gratis
  - [x] 5.4 Texto abaixo da tabela (copy real do docs/copy secao 8)
  - [x] 5.5 Responsivo: tabela horizontal em desktop, cards empilhados em mobile

- [x] Task 6: Secao Pricing (AC: 7, 12)
  - [x] 6.1 Criar `src/components/programa/programa-pricing.tsx`
  - [x] 6.2 Bloco de ancoragem de valor: tabela com 7 mentorias individuais totalizando R$53.000 (copy REAL do docs/copy secao 9)
  - [x] 6.3 Texto de desconstrucao: "Voce nao vai pagar R$ 53.000. Nem R$ 20.000. Nem R$ 10.000."
  - [x] 6.4 Card de preco principal:
    - Titulo: "AI Mentor Academy - Programa Completo"
    - Preco: "12x de R$ 497" + "ou R$ 4.997 a vista"
    - Lista de beneficios (7 itens)
    - Garantia: "7 dias de garantia incondicional" com texto de suporte
    - CTA: "Garantir Minha Vaga Agora"
    - Texto de suporte: "Pagamento seguro via Hotmart. Parcele em ate 12x no cartao."
  - [x] 6.5 Card com visual destacado: borda dourada, sombra, destaque visual
  - [x] 6.6 Garantia badge visual com icone de escudo

- [x] Task 7: Secao Depoimentos (AC: 9)
  - [x] 7.1 Criar `src/components/programa/programa-testimonials.tsx`
  - [x] 7.2 6 depoimentos com foto placeholder, nome, cargo e quote (copy REAL do docs/copy secao 10)
  - [x] 7.3 Layout: carousel em mobile, grid 2x3 ou 3x2 em desktop
  - [x] 7.4 Disclaimer: "Resultados baseados em experiencia com beta testers"

- [x] Task 8: Secao FAQ (AC: 8)
  - [x] 8.1 Criar `src/components/programa/programa-faq.tsx`
  - [x] 8.2 10 perguntas em formato accordion (copy REAL do docs/copy secao 11):
    1. Preciso ter experiencia com IA para participar?
    2. Como funcionam os mentores IA? Sao chatbots comuns?
    3. Qual a diferenca entre o acesso gratuito e o programa pago?
    4. R$ 4.997 nao e caro? Existem opcoes mais baratas?
    5. Funciona para qualquer tipo de negocio?
    6. Quanto tempo por semana preciso dedicar?
    7. Tem garantia?
    8. Os mentores IA vao existir para sempre ou e so durante o programa?
    9. Posso trocar de mentor durante o programa?
    10. Como sei se estou pronto para o programa?
  - [x] 8.3 Accordion com animacao suave de abertura/fechamento
  - [x] 8.4 Primeiro item aberto por padrao

- [x] Task 9: CTA Final + Urgencia (AC: 10, 11, 13)
  - [x] 9.1 Criar `src/components/programa/programa-final-cta.tsx`
  - [x] 9.2 Titulo: "Voce Pode Continuar Sozinho. Ou Pode Ter 7 Mentores Ao Seu Lado." (copy REAL)
  - [x] 9.3 Corpo do texto (copy REAL do docs/copy secao 12)
  - [x] 9.4 CTA principal: "Garantir Minha Vaga no Programa (12x R$ 497)" -> link Hotmart
  - [x] 9.5 CTA secundario: "Ainda nao decidiu? Converse com um Mentor IA gratuitamente." -> abre chat
  - [x] 9.6 Timer de urgencia: componente `UrgencyBanner` com props `enabled`, `text`, `deadline`
  - [x] 9.7 Timer desabilitado por padrao (variavel `NEXT_PUBLIC_URGENCY_ENABLED=false`)

- [x] Task 10: Implementar CTAs contextuais no chat (AC: 1, 2)
  - [x] 10.1 Criar `src/components/chat/program-cta-banner.tsx` - banner inline no chat
  - [x] 10.2 Versao suave (mensagem 15): copy do docs/copy secao 13.6 "Versao Suave"
  - [x] 10.3 Versao direta (mensagem 25 pos-gate): copy do docs/copy secao 13.6 "Versao Direta"
  - [x] 10.4 Banner com botao "Ver Programa Completo" -> link para /programa
  - [x] 10.5 Atualizar chat store: `showProgramCTA: boolean`, `programCTAVariant: 'soft' | 'direct'`
  - [x] 10.6 Logica no chat API ou frontend para injetar CTA nos momentos certos

## Dev Notes

### Copy Real - Usar Exatamente Este Conteudo

Todas as secoes devem usar o copy REAL do arquivo `/Users/silviaassay/docs/copy-ai-mentor-academy.md`. Nao inventar texto. As secoes relevantes sao:

- **Secao 7**: "O Que Voce Recebe" + "Grade de Modulos"
- **Secao 8**: "Gratis vs. Programa Completo" (tabela comparativa)
- **Secao 9**: "Investimento" (ancoragem + pricing card + garantia)
- **Secao 10**: "Depoimentos" (6 depoimentos)
- **Secao 11**: "FAQ" (10 perguntas)
- **Secao 12**: "CTA Final"
- **Secao 13.6**: CTAs contextuais dos mentores

### Estrutura da Pagina /programa

```
/programa
  |
  +-- Hero (titulo + subtitulo + CTA)
  +-- O Que Voce Recebe (7 beneficios em grid)
  +-- Grade de Modulos (6 modulos em tabela/cards)
  +-- Comparacao Gratis vs. Programa (tabela)
  +-- Depoimentos (6 cards)
  +-- Pricing (ancoragem + card de preco + garantia)
  +-- FAQ (10 perguntas accordion)
  +-- CTA Final (titulo + corpo + 2 CTAs)
```

### Link Hotmart (temporario)

```typescript
// Para MVP: link placeholder ate Product ID real ser configurado
const HOTMART_CHECKOUT_URL = process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL
  || 'https://pay.hotmart.com/PLACEHOLDER'
```

### CTA Contextual no Chat - Logica de Timing

```typescript
// No chat-interface.tsx ou no hook useChat:
// Injetar CTA baseado no messageCount

const shouldShowSoftCTA = messageCount >= 15 && messageCount < 20 && !showedSoftCTA
const shouldShowDirectCTA = messageCount >= 25 && leadCaptured && !showedDirectCTA

// CTA aparece como mensagem especial do tipo 'cta' no array de messages
// Nao conta como mensagem do usuario
```

### Copy dos CTAs Contextuais (REAL, do docs/copy secao 13.6)

**Versao Suave (mensagem ~15):**
```
O que acabei de te ensinar e uma parte do que cobrimos no programa completo da
AI Mentor Academy. La voce tem acesso ilimitado a mim e aos outros 6 mentores,
mais modulos em video com a Silvia e calls ao vivo toda semana.

Se quiser saber mais, e so perguntar. Mas por enquanto, vamos continuar --
ainda tenho mais para te ensinar aqui.
```

**Versao Direta (mensagem ~25, pos-gate):**
```
Essa e uma area que eu aprofundo muito no programa completo. Aqui no acesso
gratuito consigo te dar a base, mas o passo a passo detalhado com templates
e exemplos praticos esta disponivel para membros do programa.

O programa inclui 12 semanas de conteudo, acesso ilimitado a todos os 7
mentores, calls ao vivo e muito mais por 12x de R$ 497.

Quer que eu te envie o link com todos os detalhes?
```

### SEO Metadata

```typescript
// src/app/programa/layout.tsx

export const metadata = {
  title: 'AI Mentor Academy - Programa Completo | 7 Mentores IA 24/7',
  description: '12 semanas para dominar IA aplicada a negocios. 7 mentores IA ilimitados, modulos em video, calls ao vivo com Silvia Assay. 12x R$497.',
  openGraph: {
    title: 'AI Mentor Academy - Programa Completo',
    description: '7 Mentores IA treinados nas maiores mentes do mundo. 12 semanas de transformacao.',
    type: 'website',
    url: 'https://aimentoracademy.com/programa',
  },
}
```

### Decisoes de Simplificacao para MVP (Story 3.2)

- **Link Hotmart placeholder**: O botao de compra aponta para URL placeholder ate Story 3.3 implementar integracao real
- **Sem video embed**: Secao "O Que Voce Recebe" nao tem video de apresentacao (pode ser adicionado depois)
- **Depoimentos ficticios**: Usar copy do docs/copy com disclaimer, substituir por reais depois
- **Timer de urgencia**: Componente criado mas desabilitado por padrao
- **CTA contextual**: Implementado via frontend logic (nao pelo AI model), para manter controle

## File List

**Novos arquivos:**
- `src/app/programa/page.tsx` - Pagina do programa (SSG)
- `src/app/programa/layout.tsx` - Layout com metadata SEO
- `src/components/programa/programa-hero.tsx` - Hero section
- `src/components/programa/programa-benefits.tsx` - "O Que Voce Recebe"
- `src/components/programa/programa-modules.tsx` - Grade de modulos
- `src/components/programa/programa-comparison.tsx` - Tabela comparativa
- `src/components/programa/programa-pricing.tsx` - Pricing + garantia
- `src/components/programa/programa-testimonials.tsx` - Depoimentos
- `src/components/programa/programa-faq.tsx` - FAQ accordion
- `src/components/programa/programa-final-cta.tsx` - CTA final + urgencia
- `src/components/chat/program-cta-banner.tsx` - CTA contextual inline no chat

**Arquivos modificados:**
- `src/components/chat/chat-interface.tsx` - Injetar CTAs contextuais
- `src/stores/chat-store.ts` - Adicionar showProgramCTA, programCTAVariant
- `src/components/layout/header.tsx` - Adicionar link para /programa na navegacao

## Dependencies

- **Story 1.2** (Design System) - COMPLETA - tema, componentes base
- **Story 1.3** (Landing Page) - COMPLETA - header, footer, layout
- **Story 1.4** (Concierge Chat) - COMPLETA - chat interface, store
- **Story 3.1** (Email Gate) - leadCaptured flag no store (para CTA pos-gate)
- **docs/copy-ai-mentor-academy.md** - Todo o copy real do programa

## Definition of Done

- [x] Pagina /programa renderiza com todas as secoes
- [x] Todo copy e REAL (do docs/copy-ai-mentor-academy.md), nao placeholder
- [x] Tabela comparativa legivel em mobile e desktop
- [x] Pricing card com ancoragem de valor e garantia
- [x] FAQ accordion funcional com animacoes
- [x] CTA principal aponta para URL Hotmart (placeholder ok)
- [x] CTA secundario abre o chat na landing page
- [x] CTAs contextuais aparecem no chat nos momentos corretos
- [x] Pagina SSG (build estatico, sem server-side data fetching)
- [x] SEO: meta tags, Open Graph, structured data presentes
- [x] Mobile-first: tudo legivel e acessivel em mobile
- [x] Performance: LCP < 2.5s
- [x] Build passa sem erros
- [x] TypeScript sem erros
- [x] ESLint sem violacoes

## Size Estimate

**L** (Large) - 1 sessao focada de desenvolvimento (~4-5 horas) - muitas secoes com copy real

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-12 | 1.0 | Story criada a partir do PRD, Arquitetura e Copy docs | Morgan (PM Agent) |

## QA Results

_A ser preenchido pelo QA agent_
