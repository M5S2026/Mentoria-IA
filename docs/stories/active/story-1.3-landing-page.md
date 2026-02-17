# Story 1.3: Landing Page - Hero & Mentor Showcase

## Status

Done

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build", "lighthouse"]

## Story

**As a** visitante vindo do Instagram,
**I want** entender imediatamente o que o site oferece e conhecer os mentores IA,
**so that** eu me interesse em interagir com eles e explorar a plataforma.

## Acceptance Criteria

- [x] 1. Hero section com headline impactante sobre mentores IA que ensinam de verdade
- [x] 2. Subtitulo explicando o conceito (agentes IA treinados nos frameworks de grandes mentes)
- [x] 3. CTA principal "Fale com um Mentor IA Agora" visivel above the fold, com estilo dourado
- [x] 4. Secao "Como Funciona" com 3-4 passos visuais do fluxo (chegar > conversar > aprender > evoluir)
- [x] 5. Secao de showcase dos 7 mentores com cards (avatar placeholder, nome, especialidade, cor do mentor)
- [x] 6. Cada card de mentor tem animacao hover (scale + glow na cor do mentor) e breve descricao
- [x] 7. Secao social proof com numeros (alunos, satisfacao %, horas de mentoria IA, mentores disponiveis)
- [x] 8. Secao de depoimentos/testimonials (placeholder com 3 depoimentos)
- [x] 9. CTA secundario antes do footer ("Pronto para comecar? Fale com um Mentor")
- [x] 10. SEO: meta tags, Open Graph, title, description otimizados
- [x] 11. Performance: LCP < 2.5s, CLS < 0.1 (medir com Lighthouse)
- [x] 12. Pagina servida via SSG (Static Site Generation) para performance maxima
- [x] 13. Todos os textos em portugues BR
- [x] 14. Design premium consistente com design system (dark mode, dourado, animacoes)

## Tasks / Subtasks

- [ ] Task 1: Criar Hero Section (AC: 1, 2, 3)
  - [ ] 1.1 Criar `src/components/landing/hero-section.tsx`
  - [ ] 1.2 Implementar headline com gradiente dourado no texto principal
  - [ ] 1.3 Implementar subtitulo com descricao do conceito
  - [ ] 1.4 Implementar CTA button "Fale com um Mentor IA Agora" (link para secao de chat ou scroll)
  - [ ] 1.5 Background com efeito visual (gradient mesh, particulas sutis, ou grid pattern)
  - [ ] 1.6 Animacao de entrada (fade-in + slide-up)

- [ ] Task 2: Criar secao "Como Funciona" (AC: 4)
  - [ ] 2.1 Criar `src/components/landing/how-it-works.tsx`
  - [ ] 2.2 Implementar 3-4 steps com icones e descricoes curtas
  - [ ] 2.3 Layout responsivo: horizontal em desktop, vertical em mobile
  - [ ] 2.4 Animacao staggered nos steps ao scroll

- [ ] Task 3: Criar Mentor Showcase (AC: 5, 6)
  - [ ] 3.1 Criar `src/components/landing/mentor-showcase.tsx` (container da secao)
  - [ ] 3.2 Criar `src/components/landing/mentor-card.tsx` (card individual)
  - [ ] 3.3 Implementar grid de 7 cards responsivo (1 col mobile, 2 tablet, 3-4 desktop)
  - [ ] 3.4 Cada card mostra: avatar placeholder (iniciais + cor), nome, "baseado em X", especialidade
  - [ ] 3.5 Hover effect: scale(1.05) + box-shadow com cor do mentor + borda colorida
  - [ ] 3.6 Dados dos mentores definidos como constante tipada (nao fetch de API ainda)

- [ ] Task 4: Criar secao Social Proof (AC: 7)
  - [ ] 4.1 Criar `src/components/landing/social-proof.tsx`
  - [ ] 4.2 Implementar 4 metricas com numeros animados (count-up ao scroll)
  - [ ] 4.3 Numeros placeholder: "7 Mentores IA", "24/7 Disponivel", "100% Personalizado", "Frameworks Reais"

- [ ] Task 5: Criar secao Testimonials (AC: 8)
  - [ ] 5.1 Criar `src/components/landing/testimonials.tsx`
  - [ ] 5.2 Implementar 3 cards de depoimento (placeholder com texto realista)
  - [ ] 5.3 Layout: carousel em mobile, grid em desktop

- [ ] Task 6: Criar CTA final e montar pagina (AC: 9, 12, 13, 14)
  - [ ] 6.1 Criar `src/components/landing/cta-section.tsx` (CTA de fechamento)
  - [ ] 6.2 Montar `src/app/(marketing)/page.tsx` com todas as secoes em ordem
  - [ ] 6.3 Garantir que a pagina e SSG (`export const dynamic = 'force-static'` ou similar)
  - [ ] 6.4 Revisar todos os textos em portugues BR

- [ ] Task 7: SEO e Performance (AC: 10, 11)
  - [ ] 7.1 Configurar metadata no `page.tsx` (title, description, Open Graph)
  - [ ] 7.2 Adicionar JSON-LD structured data (Organization, WebSite)
  - [ ] 7.3 Otimizar imagens (se houver) com `next/image`
  - [ ] 7.4 Verificar LCP e CLS com Lighthouse (alvo: LCP < 2.5s, CLS < 0.1)

## Dev Notes

### Dados dos Mentores (Constante Tipada)

```typescript
// src/lib/constants/mentors.ts

export interface MentorInfo {
  slug: string
  name: string
  displayName: string
  basedOn: string
  specialty: string
  description: string
  idealLevel: string
  colorPrimary: string
  colorSecondary?: string
  orderIndex: number
}

export const MENTORS: MentorInfo[] = [
  {
    slug: 'nicolas',
    name: 'Nicolas',
    displayName: 'Nicolas (Alan Nicolas)',
    basedOn: 'Alan Nicolas',
    specialty: 'IA Pratica, Prompts, Automacao',
    description: 'Especialista em aplicacao pratica de IA no dia-a-dia',
    idealLevel: 'Iniciante',
    colorPrimary: '#3B82F6',
    orderIndex: 1,
  },
  {
    slug: 'erico',
    name: 'Erico',
    displayName: 'Erico (Erico Rocha)',
    basedOn: 'Erico Rocha',
    specialty: 'Lancamentos, Formula, Funis digitais',
    description: 'Mestre em lancamentos digitais e formula de lancamento',
    idealLevel: 'Intermediario',
    colorPrimary: '#EF4444',
    orderIndex: 2,
  },
  {
    slug: 'elon',
    name: 'Elon',
    displayName: 'Elon (Elon Musk)',
    basedOn: 'Elon Musk',
    specialty: 'Visao de futuro, Inovacao disruptiva, First principles',
    description: 'Pensamento de first principles e inovacao radical',
    idealLevel: 'Avancado',
    colorPrimary: '#6B7280',
    orderIndex: 3,
  },
  {
    slug: 'hormozi',
    name: 'Hormozi',
    displayName: 'Hormozi (Alex Hormozi)',
    basedOn: 'Alex Hormozi',
    specialty: 'Ofertas irresistiveis, Escala, $100M frameworks',
    description: 'Frameworks de escala e construcao de ofertas',
    idealLevel: 'Intermediario-Avancado',
    colorPrimary: '#F59E0B',
    orderIndex: 4,
  },
  {
    slug: 'russell',
    name: 'Russell',
    displayName: 'Russell (Russell Brunson)',
    basedOn: 'Russell Brunson',
    specialty: 'Funis de vendas, Storytelling, Copywriting',
    description: 'Arquitetura de funis e narrativa de vendas',
    idealLevel: 'Intermediario',
    colorPrimary: '#F97316',
    orderIndex: 5,
  },
  {
    slug: 'altman',
    name: 'Altman',
    displayName: 'Altman (Sam Altman)',
    basedOn: 'Sam Altman',
    specialty: 'Futuro da IA, Startups, Tecnologia de ponta',
    description: 'Visao estrategica sobre IA e startups de tecnologia',
    idealLevel: 'Avancado',
    colorPrimary: '#E5E7EB',
    orderIndex: 6,
  },
  {
    slug: 'gary',
    name: 'Gary',
    displayName: 'Gary (Gary Vee)',
    basedOn: 'Gary Vee',
    specialty: 'Conteudo organico, Redes sociais, Branding pessoal',
    description: 'Estrategia de conteudo organico e marca pessoal',
    idealLevel: 'Iniciante-Intermediario',
    colorPrimary: '#EAB308',
    orderIndex: 7,
  },
]
```

### Estrutura de Componentes Landing

```
src/components/landing/
  hero-section.tsx           # Hero com headline, subtitulo, CTA
  how-it-works.tsx           # Secao de passos
  mentor-showcase.tsx        # Container da grade de mentores
  mentor-card.tsx            # Card individual do mentor
  social-proof.tsx           # Numeros/metricas
  testimonials.tsx           # Depoimentos
  cta-section.tsx            # CTA de fechamento
```

### Ordem das Secoes na Landing

1. **Hero** - Headline + CTA (above the fold)
2. **Social Proof** - Numeros rapidos
3. **Mentor Showcase** - Os 7 mentores em cards
4. **Como Funciona** - 3-4 passos do fluxo
5. **Testimonials** - Depoimentos
6. **CTA Final** - Chamada para acao de fechamento

### Copy Sugerida (Hero)

```
H1: "Aprenda com 7 Mentores IA Treinados nas Maiores Mentes do Mundo"
Subtitle: "Agentes de inteligencia artificial que ensinam de verdade,
           baseados nos frameworks de Alan Nicolas, Alex Hormozi,
           Gary Vee e mais. Gratis. Agora."
CTA: "Fale com um Mentor IA Agora"
```

### SEO Metadata

```typescript
export const metadata: Metadata = {
  title: 'AI Mentor Academy | Mentores IA que Ensinam de Verdade',
  description: '7 mentores IA treinados nos frameworks das maiores mentes do marketing e tecnologia. Aprenda IA pratica, funis, ofertas e mais. Gratis.',
  openGraph: {
    title: 'AI Mentor Academy | Mentores IA que Ensinam de Verdade',
    description: '7 mentores IA treinados nos frameworks das maiores mentes...',
    type: 'website',
    locale: 'pt_BR',
  },
}
```

### NFR Relevantes

- **Mobile-first**: 70%+ do trafego do Instagram, prioridade absoluta para mobile
- **Performance**: LCP < 2.5s, CLS < 0.1 (Core Web Vitals green)
- **SEO**: Otimizado para termos: mentoria IA, cursos IA, agentes IA
- **SSG**: Pagina estatica para performance maxima

### Testing

- Lighthouse score: Performance > 90, Accessibility > 90, SEO > 90
- Verificacao visual em 3 breakpoints
- Build passa sem erros
- Todos os links/CTAs funcionais (mesmo que apontem para anchors por enquanto)

## Dependencies

- **Story 1.1** (Project Setup) - base tecnica
- **Story 1.2** (Design System) - componentes UI, header, footer, tokens, animacoes

## Definition of Done

- [ ] Hero section implementada com headline, subtitulo e CTA
- [ ] Secao "Como Funciona" com passos visuais
- [ ] 7 mentor cards exibidos com cores, nomes e especialidades
- [ ] Hover animations nos mentor cards
- [ ] Social proof com metricas
- [ ] Testimonials com depoimentos placeholder
- [ ] CTA final antes do footer
- [ ] SEO metadata configurada (title, description, OG)
- [ ] Performance: Lighthouse Performance > 90
- [ ] Mobile-first: funciona bem em 375px
- [ ] Pagina SSG (estatica)
- [ ] Build passa sem erros

## Size Estimate

**M** (Medium) - 1 sessao focada de desenvolvimento (~3-4 horas)

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-12 | 1.0 | Story criada a partir do PRD e Arquitetura | Morgan (PM Agent) |

## Dev Agent Record

### Agent Model Used

_A ser preenchido pelo dev agent_

### Debug Log References

_A ser preenchido pelo dev agent_

### Completion Notes List

_A ser preenchido pelo dev agent_

### File List

_A ser preenchido pelo dev agent_

## QA Results

_A ser preenchido pelo QA agent_
