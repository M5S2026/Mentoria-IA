# AI Mentor Academy -- UX/UI Architecture Document

**Version:** 1.0
**Date:** 2026-02-12
**Author:** Uma (UX Design Expert) / AIOS
**PRD Reference:** `docs/prd-ai-mentor-academy.md`
**Status:** Complete

---

## Table of Contents

1. [UX Architecture & Navigation Map](#1-ux-architecture--navigation-map)
2. [Design System Tokens](#2-design-system-tokens)
3. [Mentor Visual Identity System](#3-mentor-visual-identity-system)
4. [Wireframes -- All Critical Screens](#4-wireframes--all-critical-screens)
5. [Mobile-First Specifications](#5-mobile-first-specifications)
6. [Interaction Patterns](#6-interaction-patterns)
7. [Micro-interactions & Animation System](#7-micro-interactions--animation-system)

---

## 1. UX Architecture & Navigation Map

### 1.1 Site Map

```
AI Mentor Academy
|
+-- / (Homepage / Landing Page)
|   +-- Hero Section
|   +-- Mentor Showcase (7 cards)
|   +-- Social Proof
|   +-- Concierge Chat (floating, expandable)
|   +-- Footer
|
+-- /chat/:mentorSlug (Chat Experience)
|   +-- Full-screen chat with selected mentor
|   +-- Mentor switcher sidebar/drawer
|   +-- Email gate modal (triggered at msg 20)
|   +-- Contextual CTA banner
|
+-- /mentores (Mentor Directory -- optional SEO page)
|   +-- Grid of all 7 mentors with extended bios
|
+-- /programa (Program Sales Page)
|   +-- Hero with value proposition
|   +-- Module breakdown (12 weeks)
|   +-- Comparison table (Free vs Program)
|   +-- Testimonials
|   +-- Pricing section
|   +-- FAQ accordion
|   +-- Final CTA
|
+-- /checkout (Checkout)
|   +-- Order summary
|   +-- Payment form (Hotmart/Stripe embed)
|   +-- Trust badges
|
+-- /obrigado (Thank You / Post-Purchase)
|   +-- Confirmation + next steps
|   +-- Redirect to members area
|
+-- /members (Members Area -- Protected)
|   +-- /members/dashboard (Student Dashboard)
|   |   +-- Progress overview
|   |   +-- Current module
|   |   +-- Quick access to mentors
|   |
|   +-- /members/modulos (Module List)
|   |   +-- /members/modulos/:id (Module Detail)
|   |       +-- Video lessons
|   |       +-- Exercises
|   |       +-- Mentor chat (unlimited)
|   |
|   +-- /members/chat/:mentorSlug (Unlimited Mentor Chat)
|   +-- /members/perfil (Student Profile)
|
+-- /admin (Admin Dashboard -- Protected)
|   +-- /admin/dashboard (Metrics Overview)
|   +-- /admin/leads (Lead Management)
|   +-- /admin/conversas (Conversation Monitor)
|   +-- /admin/agentes (Agent Performance)
|
+-- /login (Authentication)
+-- /reset-senha (Password Reset)
```

### 1.2 User Flows

#### Flow A: Visitor to Lead (Primary Conversion)

```
Instagram Story/Post
        |
        v
[1] HOMEPAGE (Landing)
    - Sees hero + mentor cards
    - Clicks "Fale com um Mentor" OR
    - Concierge opens automatically (3s delay)
        |
        v
[2] CONCIERGE CHAT (on homepage)
    - Concierge asks 3-4 qualifying questions
    - Detects level: Iniciante / Intermediario / Avancado
    - Recommends 2-3 mentors
        |
        v
[3] MENTOR SELECTION
    - User picks a mentor
    - Navigates to /chat/:mentorSlug
        |
        v
[4] MENTOR CHAT (full-screen)
    - 20 free messages
    - Real teaching, frameworks, value
    - Message counter subtle in UI
        |
        v (at message 20)
[5] EMAIL GATE MODAL
    - "Para continuar com [Mentor], deixe seu email"
    - Email + LGPD consent
    - +10 more messages unlocked
        |
        v
[6] POST-GATE CHAT
    - Deeper content
    - Mentor naturally introduces program
    - Contextual CTA appears
        |
        v (at message 30 or user clicks CTA)
[7] PROGRAMA PAGE or SCHEDULE CALL
    - Full sales page
    - OR calendar booking with Silvia
```

#### Flow B: Lead to Student (Purchase)

```
[1] PROGRAMA PAGE (/programa)
    - Reviews modules, mentors, pricing
        |
        v
[2] CHECKOUT (/checkout)
    - Selects payment method
    - Completes purchase (Hotmart)
        |
        v
[3] THANK YOU (/obrigado)
    - Confirmation email sent
    - Account auto-created
        |
        v
[4] MEMBERS DASHBOARD (/members/dashboard)
    - Onboarding flow (first visit)
    - Module 1 unlocked
    - All 7 mentors available (unlimited)
```

#### Flow C: Student Daily Usage

```
[1] LOGIN / RETURN VISIT
        |
        v
[2] DASHBOARD
    - See progress bar
    - Resume current module
    - Quick chat with mentor
        |
        +----> [3a] MODULE LESSON
        |      - Watch video
        |      - Complete exercise
        |      - Ask mentor about lesson
        |
        +----> [3b] MENTOR CHAT (unlimited)
               - Any mentor, any time
               - Context-aware (knows module progress)
```

#### Flow D: Admin (Silvia)

```
[1] /admin/dashboard
    - KPIs: visitors, leads, conversions, revenue
    - Funnel visualization
        |
        +----> [2a] /admin/leads
        |      - Filter, search, export
        |
        +----> [2b] /admin/conversas
        |      - Read full conversations
        |      - Flag problematic chats
        |
        +----> [2c] /admin/agentes
               - Per-mentor metrics
               - Conversion rates
```

---

## 2. Design System Tokens

### 2.1 Color System

#### Base Palette (Dark Premium)

```yaml
colors:
  # Background layers (darkest to lightest)
  background:
    primary:    "#09090B"    # zinc-950 -- main bg
    secondary:  "#18181B"    # zinc-900 -- cards, panels
    tertiary:   "#27272A"    # zinc-800 -- elevated surfaces
    overlay:    "rgba(0,0,0,0.60)"  # modals, drawers backdrop

  # Surface colors
  surface:
    default:    "#18181B"    # card bg
    hover:      "#27272A"    # card hover
    active:     "#3F3F46"    # zinc-700 -- active/pressed
    border:     "#3F3F46"    # default borders
    borderSubtle: "#27272A"  # subtle borders

  # Text hierarchy
  text:
    primary:    "#FAFAFA"    # zinc-50 -- headings, main text
    secondary:  "#A1A1AA"    # zinc-400 -- body, descriptions
    tertiary:   "#71717A"    # zinc-500 -- captions, metadata
    disabled:   "#52525B"    # zinc-600
    inverse:    "#09090B"    # text on light bg (buttons)

  # Brand accent -- Gold (luxury signal)
  accent:
    gold:       "#D4A843"    # primary gold
    goldLight:  "#E8C96A"    # hover/highlight gold
    goldDark:   "#B8922F"    # pressed gold
    goldMuted:  "rgba(212,168,67,0.15)"  # gold bg tint

  # Semantic colors
  semantic:
    success:    "#22C55E"    # green-500
    warning:    "#EAB308"    # yellow-500
    error:      "#EF4444"    # red-500
    info:       "#3B82F6"    # blue-500

  # Chat-specific
  chat:
    userBubble:    "#27272A"    # user message bg
    userText:      "#FAFAFA"    # user message text
    mentorBubble:  "var(--mentor-color-muted)"  # dynamic per mentor
    mentorText:    "#FAFAFA"
    inputBg:       "#18181B"
    inputBorder:   "#3F3F46"
    inputFocus:    "var(--mentor-color)"  # dynamic per mentor
```

#### Mentor Color Palette (7 unique identities)

```yaml
mentors:
  nicolas:
    primary:    "#2563EB"    # blue-600 -- Azul Eletrico
    light:      "#3B82F6"    # blue-500
    muted:      "rgba(37,99,235,0.15)"
    gradient:   "linear-gradient(135deg, #2563EB, #1D4ED8)"
    chatAccent: "#2563EB"

  erico:
    primary:    "#DC2626"    # red-600 -- Vermelho
    light:      "#EF4444"    # red-500
    muted:      "rgba(220,38,38,0.15)"
    gradient:   "linear-gradient(135deg, #DC2626, #B91C1C)"
    chatAccent: "#DC2626"

  elon:
    primary:    "#94A3B8"    # slate-400 -- Prata/Grafite
    light:      "#CBD5E1"    # slate-300
    muted:      "rgba(148,163,184,0.15)"
    gradient:   "linear-gradient(135deg, #94A3B8, #64748B)"
    chatAccent: "#94A3B8"

  hormozi:
    primary:    "#D4A843"    # gold -- Preto/Dourado
    light:      "#E8C96A"
    muted:      "rgba(212,168,67,0.15)"
    gradient:   "linear-gradient(135deg, #D4A843, #B8922F)"
    chatAccent: "#D4A843"

  russell:
    primary:    "#EA580C"    # orange-600 -- Laranja
    light:      "#F97316"    # orange-500
    muted:      "rgba(234,88,12,0.15)"
    gradient:   "linear-gradient(135deg, #EA580C, #C2410C)"
    chatAccent: "#EA580C"

  altman:
    primary:    "#E2E8F0"    # slate-200 -- Branco/Minimalista
    light:      "#F1F5F9"    # slate-100
    muted:      "rgba(226,232,240,0.10)"
    gradient:   "linear-gradient(135deg, #E2E8F0, #CBD5E1)"
    chatAccent: "#E2E8F0"

  gary:
    primary:    "#EAB308"    # yellow-500 -- Amarelo/Energia
    light:      "#FACC15"    # yellow-400
    muted:      "rgba(234,179,8,0.15)"
    gradient:   "linear-gradient(135deg, #EAB308, #CA8A04)"
    chatAccent: "#EAB308"
```

### 2.2 Typography

```yaml
typography:
  fontFamily:
    display:  "'Plus Jakarta Sans', sans-serif"  # headings
    body:     "'Inter', sans-serif"               # body text
    mono:     "'JetBrains Mono', monospace"       # code blocks in chat

  fontSize:
    # Mobile-first values (rem)
    hero:     "2.25rem"    # 36px -- hero headline
    h1:       "1.875rem"   # 30px
    h2:       "1.5rem"     # 24px
    h3:       "1.25rem"    # 20px
    h4:       "1.125rem"   # 18px
    body:     "1rem"       # 16px
    bodySmall: "0.875rem"  # 14px
    caption:  "0.75rem"    # 12px
    tiny:     "0.625rem"   # 10px

    # Desktop overrides
    desktop:
      hero:   "3.75rem"   # 60px
      h1:     "3rem"      # 48px
      h2:     "2.25rem"   # 36px
      h3:     "1.5rem"    # 24px

  fontWeight:
    regular:    400
    medium:     500
    semibold:   600
    bold:       700
    extrabold:  800

  lineHeight:
    tight:    1.2       # headings
    normal:   1.5       # body
    relaxed:  1.625     # long paragraphs
    chat:     1.6       # chat messages

  letterSpacing:
    tight:    "-0.02em"  # large headings
    normal:   "0"
    wide:     "0.05em"   # labels, badges
    wider:    "0.1em"    # all-caps text
```

### 2.3 Spacing Scale

```yaml
spacing:
  # 4px base unit
  0:    "0"
  px:   "1px"
  0.5:  "0.125rem"   # 2px
  1:    "0.25rem"     # 4px
  1.5:  "0.375rem"    # 6px
  2:    "0.5rem"      # 8px
  2.5:  "0.625rem"    # 10px
  3:    "0.75rem"     # 12px
  4:    "1rem"        # 16px
  5:    "1.25rem"     # 20px
  6:    "1.5rem"      # 24px
  8:    "2rem"        # 32px
  10:   "2.5rem"      # 40px
  12:   "3rem"        # 48px
  16:   "4rem"        # 64px
  20:   "5rem"        # 80px
  24:   "6rem"        # 96px

  # Semantic spacing
  containerPadding:
    mobile:  "1rem"     # 16px
    tablet:  "2rem"     # 32px
    desktop: "4rem"     # 64px

  sectionGap:
    mobile:  "3rem"     # 48px
    desktop: "5rem"     # 80px

  cardPadding:
    mobile:  "1rem"     # 16px
    desktop: "1.5rem"   # 24px
```

### 2.4 Border Radius

```yaml
borderRadius:
  none:     "0"
  sm:       "0.25rem"    # 4px -- badges, tags
  default:  "0.5rem"     # 8px -- buttons, inputs
  md:       "0.75rem"    # 12px -- cards
  lg:       "1rem"       # 16px -- large cards, modals
  xl:       "1.5rem"     # 24px -- chat bubbles
  full:     "9999px"     # pills, avatars
```

### 2.5 Shadows

```yaml
shadows:
  # Elevation system for dark theme (using colored shadows)
  none:     "none"
  sm:       "0 1px 2px rgba(0,0,0,0.3)"
  default:  "0 2px 8px rgba(0,0,0,0.4)"
  md:       "0 4px 16px rgba(0,0,0,0.5)"
  lg:       "0 8px 32px rgba(0,0,0,0.6)"
  xl:       "0 16px 48px rgba(0,0,0,0.7)"

  # Glow effects (for mentor cards and CTAs)
  glowGold:    "0 0 20px rgba(212,168,67,0.3)"
  glowMentor:  "0 0 20px var(--mentor-color-muted)"  # dynamic per mentor

  # Inner shadows
  inset:       "inset 0 1px 2px rgba(0,0,0,0.3)"
```

### 2.6 Motion / Animation Tokens

```yaml
motion:
  duration:
    instant:    "50ms"
    fast:       "150ms"
    normal:     "300ms"
    slow:       "500ms"
    slower:     "700ms"
    entrance:   "400ms"

  easing:
    default:    "cubic-bezier(0.4, 0, 0.2, 1)"
    in:         "cubic-bezier(0.4, 0, 1, 1)"
    out:        "cubic-bezier(0, 0, 0.2, 1)"
    bounce:     "cubic-bezier(0.34, 1.56, 0.64, 1)"
    spring:     "cubic-bezier(0.22, 1.0, 0.36, 1.0)"
```

### 2.7 Breakpoints

```yaml
breakpoints:
  sm:   "640px"    # Large phones landscape
  md:   "768px"    # Tablets
  lg:   "1024px"   # Small laptops
  xl:   "1280px"   # Desktops
  2xl:  "1536px"   # Large screens
```

### 2.8 Z-Index Scale

```yaml
zIndex:
  hide:       -1
  base:       0
  raised:     10      # cards with elevation
  dropdown:   100     # dropdowns, popovers
  sticky:     200     # sticky header
  overlay:    300     # backdrop overlays
  modal:      400     # modals, email gate
  toast:      500     # notifications
  chat:       600     # floating chat button
  tooltip:    700     # tooltips (highest)
```

---

## 3. Mentor Visual Identity System

### 3.1 Individual Mentor Identities

#### Nicolas (Alan Nicolas) -- IA Pratica

```yaml
nicolas:
  displayName: "Nicolas"
  tagline: "IA Pratica, Prompts & Automacao"
  level: "Iniciante"
  color:
    primary: "#2563EB"     # Azul Eletrico
    gradient: "linear-gradient(135deg, #2563EB, #1D4ED8)"
  avatar:
    style: "Clean-cut tech professional, wire-frame glasses"
    bgShape: "Circle with electric blue ring"
    iconFallback: "Zap"   # lightning bolt -- speed/automation
  personality:
    visual: "Limpo, organizado, didatico"
    chatStyle: "Bullet points, step-by-step, emojis moderados"
    energy: "Calmo e acessivel"
  chatBubble:
    bg: "rgba(37,99,235,0.12)"
    borderLeft: "#2563EB"
  cardStyle:
    bgHover: "rgba(37,99,235,0.08)"
    iconGlow: "0 0 16px rgba(37,99,235,0.4)"
```

#### Erico (Erico Rocha) -- Lancamentos

```yaml
erico:
  displayName: "Erico"
  tagline: "Lancamentos, Formula & Funis Digitais"
  level: "Intermediario"
  color:
    primary: "#DC2626"     # Vermelho
    gradient: "linear-gradient(135deg, #DC2626, #B91C1C)"
  avatar:
    style: "Confident entrepreneur, dynamic pose"
    bgShape: "Circle with red glow ring"
    iconFallback: "Rocket"  # launches
  personality:
    visual: "Energico, ousado, resultados"
    chatStyle: "Direto, exemplos reais, frameworks numerados"
    energy: "Alta energia, motivacional"
  chatBubble:
    bg: "rgba(220,38,38,0.12)"
    borderLeft: "#DC2626"
  cardStyle:
    bgHover: "rgba(220,38,38,0.08)"
    iconGlow: "0 0 16px rgba(220,38,38,0.4)"
```

#### Elon (Elon Musk) -- Inovacao Disruptiva

```yaml
elon:
  displayName: "Elon"
  tagline: "Visao de Futuro, Inovacao & First Principles"
  level: "Avancado"
  color:
    primary: "#94A3B8"     # Prata/Grafite
    gradient: "linear-gradient(135deg, #94A3B8, #64748B)"
  avatar:
    style: "Futuristic silhouette, minimal features"
    bgShape: "Hexagon with silver edge"
    iconFallback: "Orbit"   # space/vision
  personality:
    visual: "Frio, futurista, minimalista"
    chatStyle: "Filosofico, contrarian, perguntas profundas"
    energy: "Introspectivo mas intenso"
  chatBubble:
    bg: "rgba(148,163,184,0.12)"
    borderLeft: "#94A3B8"
  cardStyle:
    bgHover: "rgba(148,163,184,0.08)"
    iconGlow: "0 0 16px rgba(148,163,184,0.4)"
```

#### Hormozi (Alex Hormozi) -- Ofertas & Escala

```yaml
hormozi:
  displayName: "Hormozi"
  tagline: "Ofertas Irresistiveis, Escala & $100M Frameworks"
  level: "Intermediario-Avancado"
  color:
    primary: "#D4A843"     # Preto/Dourado
    gradient: "linear-gradient(135deg, #D4A843, #B8922F)"
  avatar:
    style: "Bold, muscular silhouette, strong jawline"
    bgShape: "Circle with gold ornate ring"
    iconFallback: "Crown"   # king of offers
  personality:
    visual: "Luxuoso, pesado, dark com dourado"
    chatStyle: "Frameworks numerados, sem enrolacao, numeros reais"
    energy: "Intenso, no-BS"
  chatBubble:
    bg: "rgba(212,168,67,0.12)"
    borderLeft: "#D4A843"
  cardStyle:
    bgHover: "rgba(212,168,67,0.08)"
    iconGlow: "0 0 16px rgba(212,168,67,0.4)"
```

#### Russell (Russell Brunson) -- Funis & Storytelling

```yaml
russell:
  displayName: "Russell"
  tagline: "Funis de Vendas, Storytelling & Copywriting"
  level: "Intermediario"
  color:
    primary: "#EA580C"     # Laranja
    gradient: "linear-gradient(135deg, #EA580C, #C2410C)"
  avatar:
    style: "Friendly, approachable, storyteller vibe"
    bgShape: "Circle with orange glow ring"
    iconFallback: "BookOpen"  # storytelling
  personality:
    visual: "Quente, acolhedor, narrativo"
    chatStyle: "Historias, analogias, metaforas, passo-a-passo"
    energy: "Amigavel e envolvente"
  chatBubble:
    bg: "rgba(234,88,12,0.12)"
    borderLeft: "#EA580C"
  cardStyle:
    bgHover: "rgba(234,88,12,0.08)"
    iconGlow: "0 0 16px rgba(234,88,12,0.4)"
```

#### Altman (Sam Altman) -- Futuro da IA

```yaml
altman:
  displayName: "Altman"
  tagline: "Futuro da IA, Startups & Tecnologia de Ponta"
  level: "Avancado"
  color:
    primary: "#E2E8F0"     # Branco/Minimalista
    gradient: "linear-gradient(135deg, #E2E8F0, #CBD5E1)"
  avatar:
    style: "Clean, minimal, tech-CEO aesthetic"
    bgShape: "Circle with thin white ring, subtle glow"
    iconFallback: "Brain"   # AI/intelligence
  personality:
    visual: "Ultra-limpo, branco no dark, espacamento generoso"
    chatStyle: "Ponderado, nuancado, equilibrado, citacoes"
    energy: "Calmo, intelectual"
  chatBubble:
    bg: "rgba(226,232,240,0.08)"
    borderLeft: "#E2E8F0"
  cardStyle:
    bgHover: "rgba(226,232,240,0.06)"
    iconGlow: "0 0 16px rgba(226,232,240,0.3)"
```

#### Gary (Gary Vee) -- Conteudo & Branding

```yaml
gary:
  displayName: "Gary"
  tagline: "Conteudo Organico, Redes Sociais & Branding Pessoal"
  level: "Iniciante-Intermediario"
  color:
    primary: "#EAB308"     # Amarelo/Energia
    gradient: "linear-gradient(135deg, #EAB308, #CA8A04)"
  avatar:
    style: "Energetic, street-smart, expressive"
    bgShape: "Circle with pulsing yellow ring"
    iconFallback: "Megaphone"  # content/voice
  personality:
    visual: "Vibrante, barulhento, high-energy"
    chatStyle: "Curto, direto, gritante as vezes, CAPS, emojis"
    energy: "Explosivo, motivacional"
  chatBubble:
    bg: "rgba(234,179,8,0.12)"
    borderLeft: "#EAB308"
  cardStyle:
    bgHover: "rgba(234,179,8,0.08)"
    iconGlow: "0 0 16px rgba(234,179,8,0.4)"
```

### 3.2 Concierge Agent Identity

```yaml
concierge:
  displayName: "Concierge IA"
  tagline: "Assistente da Silvia Assay"
  color:
    primary: "#D4A843"     # Gold (matches brand)
    gradient: "linear-gradient(135deg, #D4A843, #E8C96A)"
  avatar:
    style: "Elegant, feminine silhouette, welcoming"
    bgShape: "Circle with gold shimmer ring"
    iconFallback: "Sparkles"
  chatBubble:
    bg: "rgba(212,168,67,0.10)"
    borderLeft: "#D4A843"
```

---

## 4. Wireframes -- All Critical Screens

### 4.1 Homepage / Landing Page (Mobile)

```
+------------------------------------------+
| [=] LOGO: AI Mentor Academy    [Chat]    |
+------------------------------------------+
|                                          |
|  Aprenda com as                          |
|  Maiores Mentes                          |
|  do Mundo.                               |
|  Powered by IA.                          |
|                                          |
|  7 mentores IA treinados nos             |
|  frameworks de grandes mentes            |
|  ensinam voce de verdade --              |
|  no seu nivel, no seu ritmo.             |
|                                          |
|  +------------------------------------+  |
|  |  [*] Fale com um Mentor IA Agora   |  |
|  +------------------------------------+  |
|  (gold button, full width, glow effect)  |
|                                          |
|  Ja ajudamos 2.400+ alunos              |
|                                          |
+------------------------------------------+
|                                          |
|  SEUS MENTORES DE IA                     |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  Scroll horizontal de cards:             |
|                                          |
|  +----------------+ +----------------+   |
|  | [Avatar]       | | [Avatar]       |   |
|  |  ~~~ blue ~~~  | |  ~~~ red ~~~   |   |
|  |                | |                |   |
|  |  Nicolas       | |  Erico         |   |
|  |  IA Pratica    | |  Lancamentos   |   |
|  |  Iniciante     | |  Intermediario |   |
|  |                | |                |   |
|  | [Conversar ->] | | [Conversar ->] |   |
|  +----------------+ +----------------+   |
|                                          |
|  < . . o . . . . >  (dot indicator)      |
|                                          |
+------------------------------------------+
|                                          |
|  COMO FUNCIONA                           |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  [1] Converse com o Concierge            |
|      Descubra seu nivel e interesses     |
|                                          |
|  [2] Escolha seu Mentor IA              |
|      Recomendacao personalizada          |
|                                          |
|  [3] Aprenda de Verdade                 |
|      Frameworks reais, no seu ritmo      |
|                                          |
|  [4] Evolua com o Programa              |
|      7 mentores 24/7 + Silvia ao vivo   |
|                                          |
+------------------------------------------+
|                                          |
|  O QUE DIZEM NOSSOS ALUNOS              |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  +------------------------------------+  |
|  | "Nunca pensei que uma IA pudesse   |  |
|  |  ensinar tao bem. O Nicolas me     |  |
|  |  ensinou mais em 20 min do que     |  |
|  |  cursos de 40 horas."             |  |
|  |                                    |  |
|  |  -- Maria S. | Empreendedora      |  |
|  +------------------------------------+  |
|                                          |
|  < . o . >  (testimonial carousel)       |
|                                          |
+------------------------------------------+
|                                          |
|  +------------------------------------+  |
|  |  NUMEROS QUE FALAM                 |  |
|  |                                    |  |
|  |  2.400+     97%       7            |  |
|  |  Alunos     Satisf.   Mentores IA  |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
|                                          |
|  PRONTA PARA COMECAR?                    |
|                                          |
|  +------------------------------------+  |
|  |  [*] Fale com um Mentor Agora      |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
|  Logo | Termos | Privacidade | LGPD      |
|  (c) 2026 Silvia Assay                   |
+------------------------------------------+

      +------------------+
      | [*] Chat com IA  |  <-- floating FAB
      +------------------+     bottom-right
```

### 4.2 Homepage / Landing Page (Desktop)

```
+--------------------------------------------------------------------------------+
|                                                                                |
|  LOGO: AI Mentor Academy              Mentores  Programa  Login    [Fale Agora]|
|                                                                                |
+--------------------------------------------------------------------------------+
|                                                                                |
|                          Aprenda com as Maiores                                |
|                          Mentes do Mundo.                                      |
|                          Powered by IA.                                        |
|                                                                                |
|              7 mentores IA treinados nos frameworks de grandes mentes          |
|              ensinam voce de verdade -- no seu nivel, no seu ritmo.            |
|                                                                                |
|                    +--------------------------------------+                     |
|                    |  [*] Fale com um Mentor IA Agora     |                    |
|                    +--------------------------------------+                     |
|                                                                                |
|                          2.400+ alunos  |  97% satisfacao                      |
|                                                                                |
+--------------------------------------------------------------------------------+
|                                                                                |
|                          SEUS MENTORES DE IA                                   |
|                                                                                |
|  +----------+ +----------+ +----------+ +----------+ +----------+              |
|  | [Avatar] | | [Avatar] | | [Avatar] | | [Avatar] | | [Avatar] |  + 2 more   |
|  | ~blue~   | | ~red~    | | ~silver~ | | ~gold~   | | ~orange~ |              |
|  | Nicolas  | | Erico    | | Elon     | | Hormozi  | | Russell  |              |
|  | IA Prat. | | Lancam.  | | Inovac.  | | Ofertas  | | Funis    |              |
|  | Inic.    | | Interm.  | | Avancado | | Int-Av.  | | Interm.  |              |
|  |          | |          | |          | |          | |          |              |
|  |[Conver.]|| |[Conver.]|| |[Conver.]|| |[Conver.]|| |[Conver.]||             |
|  +----------+ +----------+ +----------+ +----------+ +----------+              |
|                                                                                |
|                      +----------+ +----------+                                 |
|                      | [Avatar] | | [Avatar] |                                 |
|                      | ~white~  | | ~yellow~ |                                 |
|                      | Altman   | | Gary     |                                 |
|                      | Fut. IA  | | Conteudo |                                 |
|                      | Avancado | | Ini-Int. |                                 |
|                      |          | |          |                                 |
|                      |[Conver.]|| |[Conver.]||                                |
|                      +----------+ +----------+                                 |
|                                                                                |
+--------------------------------------------------------------------------------+
|                                                                                |
|   COMO FUNCIONA              |       O QUE DIZEM NOSSOS ALUNOS                |
|                              |                                                 |
|   [1] Converse com o         |   "Nunca pensei que uma IA pudesse              |
|       Concierge              |    ensinar tao bem..."                          |
|                              |    -- Maria S.                                  |
|   [2] Escolha seu Mentor     |                                                 |
|                              |   "O Hormozi IA me ajudou a                     |
|   [3] Aprenda de Verdade     |    reformular minha oferta..."                  |
|                              |    -- Carlos M.                                 |
|   [4] Evolua com Programa    |                                                 |
|                              |                                                 |
+--------------------------------------------------------------------------------+
|  Logo | Termos | Privacidade | LGPD          (c) 2026 Silvia Assay             |
+--------------------------------------------------------------------------------+

                                                  +---------------------+
                                                  | [*] Fale com um     |
                                                  |     Mentor IA       |
                                                  +---------------------+
                                                  (floating chat button,
                                                   bottom-right corner)
```

### 4.3 Chat Experience -- Mobile (Full-screen)

```
+------------------------------------------+
| [<-]  Nicolas  [=avatar=]  [Switch v]    |
|       IA Pratica                         |
|  ~~~~~ blue accent bar ~~~~~~~~~~~~~~~~  |
+------------------------------------------+
|                                          |
|         [Nicolas Avatar]                 |
|    Ola! Sou o Nicolas, seu mentor        |
|    de IA Pratica. Vou te ensinar         |
|    a dominar prompts e automacao.        |
|                                          |
|    Qual seu nivel com IA hoje?           |
|    1. Nunca usei                         |
|    2. Uso ChatGPT basico                 |
|    3. Ja automatizo processos            |
|                                          |
|                                          |
|                    +-------------------+ |
|                    | Uso ChatGPT para  | |
|                    | escrever textos   | |
|                    | mas quero ir alem | |
|                    +-------------------+ |
|                                          |
|         [Nicolas Avatar]                 |
|    Otimo! Voce ja esta no caminho        |
|    certo. Vou te mostrar 3              |
|    tecnicas de prompt que vao           |
|    transformar seus resultados.         |
|                                          |
|    **Tecnica 1: Chain of Thought**       |
|    Ao inves de pedir a resposta         |
|    direta, peca para a IA pensar        |
|    passo a passo...                     |
|    |  (streaming indicator)             |
|                                          |
+------------------------------------------+
|  [15/20 mensagens gratis]                |
+------------------------------------------+
|  +------------------------------------+  |
|  | Digite sua mensagem...        [->] |  |
|  +------------------------------------+  |
+------------------------------------------+
```

### 4.4 Chat Experience -- Desktop (Split Layout)

```
+--------------------------------------------------------------------------------+
| [LOGO]  AI Mentor Academy         Mentores  Programa  Login                    |
+--------------------------------------------------------------------------------+
|          |                                                                     |
| MENTORES |           NICOLAS -- IA Pratica                                     |
|          |           ~~~ blue accent line ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~        |
| [=] Conc |                                                                     |
|          |    [Avatar] Nicolas                                                 |
| [N] Nic* |    Ola! Sou o Nicolas, seu mentor de IA Pratica.                    |
| [E] Eric |    Vou te ensinar a dominar prompts e automacao.                    |
| [E] Elon |                                                                     |
| [H] Horm |    Qual seu nivel com IA hoje?                                      |
| [R] Russ |    1. Nunca usei                                                    |
| [A] Altm |    2. Uso ChatGPT basico                                            |
| [G] Gary |    3. Ja automatizo processos                                       |
|          |                                                                     |
| -------- |                                                                     |
|          |                             Uso ChatGPT para escrever   [you]       |
| Seu      |                             textos mas quero ir alem                |
| nivel:   |                                                                     |
| Interm.  |    [Avatar] Nicolas                                                 |
|          |    Otimo! Voce ja esta no caminho certo. Vou te                      |
| Msgs:    |    mostrar 3 tecnicas de prompt que vao                              |
| 15/20    |    transformar seus resultados.                                      |
|          |                                                                     |
| -------- |    **Tecnica 1: Chain of Thought**                                   |
|          |    Ao inves de pedir a resposta direta, peca                         |
| [Conheca |    para a IA pensar passo a passo...                                |
|  o Prog.]|    |  (streaming)                                                   |
|          |                                                                     |
|          |  +---------------------------------------------------------------+  |
|          |  | Digite sua mensagem...                                   [->] |  |
|          |  +---------------------------------------------------------------+  |
+--------------------------------------------------------------------------------+
```

### 4.5 Mentor Card Component

```
Mobile Card (in horizontal scroll):
+---------------------------+
|                           |
|      +----------+         |
|      | [Avatar] |         |
|      | ~color~  |         |
|      +----------+         |
|                           |
|      Nicolas              |
|      IA Pratica, Prompts  |
|      & Automacao          |
|                           |
|      [Iniciante]          |
|      (badge com cor)      |
|                           |
|  "Vou te ensinar a usar   |
|   IA de forma pratica     |
|   e eficiente."           |
|                           |
|  +---------------------+  |
|  |  Conversar ->       |  |
|  +---------------------+  |
|  (botao com cor do mentor)|
+---------------------------+

Desktop Card (in grid):
+-----------------------------------+
|  +------+                         |
|  |Avatar|  Nicolas                |
|  |~blue~|  IA Pratica, Prompts    |
|  +------+  & Automacao            |
|                                   |
|  [Iniciante]  (badge)             |
|                                   |
|  "Vou te ensinar a usar IA       |
|   de forma pratica e eficiente.   |
|   Dominar prompts, automacao e    |
|   ferramentas com resultados."    |
|                                   |
|  Frameworks: Chain of Thought,    |
|  CRISP Method, Auto-GPT Setup     |
|                                   |
|  +-----------------------------+  |
|  |  Conversar com Nicolas ->   |  |
|  +-----------------------------+  |
+-----------------------------------+
```

### 4.6 Email Gate Modal

```
Mobile:
+------------------------------------------+
|                                          |
|  (dark overlay behind)                   |
|                                          |
|  +------------------------------------+  |
|  |                                    |  |
|  |  +-----+                          |  |
|  |  |[*]  |  Voce esta indo bem!     |  |
|  |  +-----+                          |  |
|  |                                    |  |
|  |  Para continuar aprendendo com    |  |
|  |  Nicolas, deixe seu melhor        |  |
|  |  email. Voce ganha +10            |  |
|  |  mensagens.                       |  |
|  |                                    |  |
|  |  +------------------------------+ |  |
|  |  | seu@email.com                | |  |
|  |  +------------------------------+ |  |
|  |                                    |  |
|  |  [x] Concordo com a Politica de  |  |
|  |      Privacidade e aceito        |  |
|  |      receber comunicacoes.       |  |
|  |                                    |  |
|  |  +------------------------------+ |  |
|  |  |  [*] Continuar Aprendendo    | |  |
|  |  +------------------------------+ |  |
|  |  (gold button, full width)        |  |
|  |                                    |  |
|  |  Nao vamos compartilhar seu      |  |
|  |  email. Prometido.               |  |
|  |                                    |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
```

### 4.7 Programa Sales Page (Mobile)

```
+------------------------------------------+
| [<-]  AI Mentor Academy         [Login]  |
+------------------------------------------+
|                                          |
|  AI MASTERY PROGRAM                      |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  Domine IA com 7 Mentores               |
|  de Classe Mundial.                      |
|  24 horas por dia.                       |
|  7 dias por semana.                      |
|                                          |
|  +------------------------------------+  |
|  |  [*] Quero Comecar Agora          |  |
|  +------------------------------------+  |
|                                          |
|  12 semanas | 7 mentores | Silvia live   |
|                                          |
+------------------------------------------+
|                                          |
|  O QUE VOCE RECEBE                       |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  [icon] 7 Mentores IA 24/7              |
|         Sem limite de mensagens          |
|                                          |
|  [icon] 12 Modulos em Video             |
|         Com Silvia ensinando ao vivo     |
|                                          |
|  [icon] Calls Semanais ao Vivo          |
|         Q&A + Hot Seat com Silvia        |
|                                          |
|  [icon] Comunidade Exclusiva            |
|         Networking com outros alunos     |
|                                          |
|  [icon] Templates & Frameworks          |
|         De cada mentor, prontos pra uso  |
|                                          |
|  [icon] Certificado de Conclusao        |
|         + 30 dias de suporte extra       |
|                                          |
+------------------------------------------+
|                                          |
|  OS 12 MODULOS                           |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  Sem. 1-2   Fundamentos de IA           |
|  [Nicolas]  Prompts, ferramentas,        |
|             automacao basica             |
|                                          |
|  Sem. 3-4   IA para Conteudo            |
|  [Gary]     Criacao de conteudo com IA   |
|                                          |
|  Sem. 5-6   Funis & Lancamentos         |
|  [Erico+Russell] Estrutura, storytelling |
|                                          |
|  Sem. 7-8   Ofertas & Escala            |
|  [Hormozi]  Oferta irresistivel, pricing |
|                                          |
|  Sem. 9-10  Inovacao & Futuro           |
|  [Elon+Altman] Tendencias, startups     |
|                                          |
|  Sem. 11-12 Implementacao               |
|  [Todos]    Projeto final + suporte     |
|                                          |
+------------------------------------------+
|                                          |
|  GRATIS vs. PROGRAMA COMPLETO            |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  +------------------+------------------+ |
|  | GRATIS           | PROGRAMA         | |
|  +------------------+------------------+ |
|  | 1 mentor         | 7 mentores       | |
|  | 20 mensagens     | Ilimitado        | |
|  | Basico           | Profundo         | |
|  | Sem video        | 12 mod. video    | |
|  | Sem comunidade   | Comunidade       | |
|  | Sem suporte      | Calls ao vivo    | |
|  +------------------+------------------+ |
|                                          |
+------------------------------------------+
|                                          |
|  DEPOIMENTOS                             |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  +------------------------------------+  |
|  | [foto]  Maria S.                   |  |
|  | "Em 3 semanas consegui automatizar |  |
|  |  todo meu processo de conteudo..." |  |
|  +------------------------------------+  |
|                                          |
|  +------------------------------------+  |
|  | [foto]  Carlos M.                  |  |
|  | "O Hormozi IA me ajudou a          |  |
|  |  triplicar meu ticket medio..."    |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
|                                          |
|  INVESTIMENTO                            |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  +------------------------------------+  |
|  |                                    |  |
|  |  12x de                           |  |
|  |  R$ 497                           |  |
|  |  (ou R$ 4.497 a vista)            |  |
|  |                                    |  |
|  |  +------------------------------+ |  |
|  |  |  [*] QUERO COMECAR AGORA     | |  |
|  |  +------------------------------+ |  |
|  |                                    |  |
|  |  Cartao | PIX | Boleto            |  |
|  |  Garantia de 7 dias               |  |
|  |                                    |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
|                                          |
|  PERGUNTAS FREQUENTES                    |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  [v] Preciso saber programar?            |
|  [v] Os mentores IA sao realmente bons?  |
|  [v] Posso parcelar?                     |
|  [v] E se eu nao gostar?                |
|  [v] Quanto tempo tenho acesso?          |
|                                          |
+------------------------------------------+
|                                          |
|  +------------------------------------+  |
|  |  ULTIMA CHANCE                     |  |
|  |  Vagas limitadas nesta turma.      |  |
|  |                                    |  |
|  |  +------------------------------+ |  |
|  |  |  [*] GARANTIR MINHA VAGA     | |  |
|  |  +------------------------------+ |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
|  Footer                                  |
+------------------------------------------+
```

### 4.8 Checkout Page (Mobile)

```
+------------------------------------------+
| [<-]  Checkout Seguro          [lock]    |
+------------------------------------------+
|                                          |
|  SEU PEDIDO                              |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  +------------------------------------+  |
|  | AI Mastery Program                 |  |
|  | 12 semanas | 7 mentores IA         |  |
|  |                                    |  |
|  | 12x R$ 497,00                      |  |
|  | ou R$ 4.497,00 a vista            |  |
|  +------------------------------------+  |
|                                          |
|  FORMA DE PAGAMENTO                      |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  ( ) Cartao de Credito  (12x)           |
|  (o) PIX                (a vista)        |
|  ( ) Boleto             (a vista)        |
|                                          |
|  (Hotmart checkout embed abaixo)         |
|                                          |
|  +------------------------------------+  |
|  |                                    |  |
|  |  [Hotmart Payment Form]            |  |
|  |  Nome no cartao: ____________      |  |
|  |  Numero: ____________________      |  |
|  |  Validade: __/__  CVV: ____        |  |
|  |  CPF: _______________________      |  |
|  |                                    |  |
|  +------------------------------------+  |
|                                          |
|  +------------------------------------+  |
|  |  [*] FINALIZAR COMPRA             |  |
|  |  R$ 497,00/mes por 12 meses       |  |
|  +------------------------------------+  |
|                                          |
|  [lock] Pagamento seguro via Hotmart     |
|  [shield] Garantia de 7 dias            |
|  [check] Acesso imediato                |
|                                          |
+------------------------------------------+
```

### 4.9 Members Area -- Student Dashboard (Mobile)

```
+------------------------------------------+
| [=]  Dashboard           [Avatar] Silvia |
+------------------------------------------+
|                                          |
|  Ola, Maria!                             |
|  Seu progresso no programa:              |
|                                          |
|  +------------------------------------+  |
|  |  [=========>          ] 42%        |  |
|  |  Semana 5 de 12                    |  |
|  +------------------------------------+  |
|                                          |
|  CONTINUAR DE ONDE PAROU                 |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  +------------------------------------+  |
|  | [>] Modulo 3: IA para Conteudo     |  |
|  |     Licao 2: Criando posts com IA  |  |
|  |     [Gary]  ~amarelo~              |  |
|  |                                    |  |
|  |  +------------------------------+ |  |
|  |  |  Continuar Licao ->          | |  |
|  |  +------------------------------+ |  |
|  +------------------------------------+  |
|                                          |
|  SEUS MENTORES (ilimitado)               |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  Scroll horizontal:                      |
|  +------+ +------+ +------+ +------+    |
|  |[Nico]| |[Eric]| |[Elon]| |[Horm]|   |
|  | blue | | red  | |silver| | gold |    |
|  +------+ +------+ +------+ +------+    |
|  +------+ +------+ +------+             |
|  |[Russ]| |[Altm]| |[Gary]|             |
|  |orange| |white | |yellow|             |
|  +------+ +------+ +------+             |
|                                          |
|  MODULOS                                 |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  +------------------------------------+  |
|  | [x] 1. Fundamentos de IA    100%  |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | [x] 2. IA para Conteudo     100%  |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | [>] 3. Funis & Lancamentos   40%  |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | [_] 4. Ofertas & Escala       0%  |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | [_] 5. Inovacao & Futuro      0%  |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  | [_] 6. Implementacao          0%  |  |
|  +------------------------------------+  |
|                                          |
|  PROXIMA CALL AO VIVO                    |
|  ~~~~~~~~~~~~~~~~~~~~~~~~                |
|                                          |
|  +------------------------------------+  |
|  | Quinta, 15 Feb -- 20h              |  |
|  | Q&A com Silvia                     |  |
|  | [Adicionar ao Calendario]          |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
| [Home] [Modulos] [Chat] [Comunidade]     |
+------------------------------------------+
(bottom navigation bar)
```

### 4.10 Members Area -- Student Dashboard (Desktop)

```
+--------------------------------------------------------------------------------+
|  LOGO  AI Mentor Academy       Dashboard  Modulos  Mentores  Comunidade  [Ava] |
+--------------------------------------------------------------------------------+
|              |                                                                  |
|  NAVEGACAO   |  Ola, Maria! Bem-vinda de volta.                                |
|              |                                                                  |
|  [x] Dashb.  |  +--------------------------------------------+                 |
|  [ ] Modulos |  |  PROGRESSO GERAL                           |                 |
|  [ ] Mentores|  |  [===============>            ] 42%         |                 |
|  [ ] Comunid.|  |  Semana 5 de 12 | 15 licoes completas      |                 |
|  [ ] Perfil  |  +--------------------------------------------+                 |
|              |                                                                  |
|  ----------  |  +-------------------------+  +-------------------------+        |
|              |  | CONTINUAR               |  | PROXIMA CALL            |        |
|  MENTORES    |  |                         |  |                         |        |
|  RAPIDOS     |  | [>] Mod 3: Funis        |  | Quinta, 15 Feb          |        |
|              |  | Licao 2: Storytelling    |  | 20h - Q&A com Silvia    |        |
|  [N] [E] [E] |  | [Erico+Russell]         |  |                         |        |
|  [H] [R] [A] |  |                         |  | [Adicionar ao           |        |
|  [G]         |  | [Continuar ->]          |  |  Calendario]            |        |
|              |  +-------------------------+  +-------------------------+        |
|              |                                                                  |
|              |  MODULOS                                                         |
|              |  +------+ +------+ +------+ +------+ +------+ +------+          |
|              |  | Mod 1| | Mod 2| | Mod 3| | Mod 4| | Mod 5| | Mod 6|         |
|              |  | 100% | | 100% | |  40% | |   0% | |   0% | |   0% |         |
|              |  | done | | done | | curr | | lock | | lock | | lock |          |
|              |  +------+ +------+ +------+ +------+ +------+ +------+          |
|              |                                                                  |
+--------------------------------------------------------------------------------+
```

### 4.11 Admin Dashboard (Desktop -- Primary View)

```
+--------------------------------------------------------------------------------+
|  LOGO  AI Mentor Academy -- ADMIN              [Notif] [Avatar] Silvia         |
+--------------------------------------------------------------------------------+
|              |                                                                  |
|  ADMIN NAV   |  DASHBOARD -- Visao Geral                  Periodo: [Ultimos 7d]|
|              |                                                                  |
|  [x] Dashb.  |  +----------+ +----------+ +----------+ +----------+            |
|  [ ] Leads   |  | Visitant.| | Conversas| | Leads    | | Vendas   |            |
|  [ ] Convers.|  |  1.247   | |    834   | |    156   | |     12   |            |
|  [ ] Agentes |  | +23% ^   | | +18% ^   | | +31% ^   | | +50% ^   |           |
|  [ ] Config. |  +----------+ +----------+ +----------+ +----------+            |
|              |                                                                  |
|              |  FUNIL DE CONVERSAO                                              |
|              |  +-----------------------------------------------------------+   |
|              |  | Visitantes  [=====================================] 1247  |   |
|              |  | Conversas   [============================        ]  834  |   |
|              |  | Leads       [=========                           ]  156  |   |
|              |  | Vendas      [==                                  ]   12  |   |
|              |  +-----------------------------------------------------------+   |
|              |                                                                  |
|              |  PERFORMANCE POR MENTOR                                          |
|              |  +----------------------------------------------------------+    |
|              |  | Mentor    | Conversas | Leads | Conv% | Vendas | Rev%   |    |
|              |  |-----------|-----------|-------|-------|--------|--------|    |
|              |  | Nicolas   |    234    |  52   | 22%   |   4    | 33%    |    |
|              |  | Erico     |    187    |  38   | 20%   |   3    | 25%    |    |
|              |  | Hormozi   |    156    |  28   | 18%   |   2    | 17%    |    |
|              |  | Gary      |    142    |  22   | 15%   |   2    | 17%    |    |
|              |  | Russell   |     65    |  10   | 15%   |   1    |  8%    |    |
|              |  | Elon      |     32    |   4   | 12%   |   0    |  0%    |    |
|              |  | Altman    |     18    |   2   | 11%   |   0    |  0%    |    |
|              |  +----------------------------------------------------------+    |
|              |                                                                  |
|              |  LEADS RECENTES                                                  |
|              |  +----------------------------------------------------------+    |
|              |  | Nome      | Email           | Nivel  | Mentor | Status  |    |
|              |  |-----------|-----------------|--------|--------|---------|    |
|              |  | Maria S.  | maria@gmail.com | Inter. | Nico   | Quente  |    |
|              |  | Carlos M. | carl@hotm...    | Inic.  | Gary   | Morno   |    |
|              |  | Ana P.    | ana@yahoo...    | Avanc. | Horm.  | Quente  |    |
|              |  +----------------------------------------------------------+    |
|              |  [Ver todos os leads ->]  [Exportar CSV]                         |
|              |                                                                  |
+--------------------------------------------------------------------------------+
```

---

## 5. Mobile-First Specifications

### 5.1 Viewport Strategy

```
MOBILE (default):     320px -- 639px    (primary target, 70%+ traffic)
TABLET:               640px -- 1023px
DESKTOP:              1024px+
```

### 5.2 Per-Screen Adaptations

#### Homepage

| Element | Mobile (< 640px) | Tablet (640-1023px) | Desktop (1024px+) |
|---------|-------------------|---------------------|--------------------|
| Hero headline | 36px, 2 lines | 48px, 2 lines | 60px, single context |
| CTA button | Full width, fixed bottom (first visit) | Full width | Inline, auto width |
| Mentor cards | Horizontal scroll, 1 visible + peek | Grid 2 cols | Grid 5+2 cols |
| Testimonials | Carousel, 1 card | Carousel, 2 cards | Grid 3 cols |
| Stats row | Stack vertical | Horizontal row | Horizontal row |
| Navigation | Hamburger menu | Hamburger menu | Full horizontal nav |
| Concierge FAB | 56px circle, bottom-right | 56px circle | 64px circle + label |

#### Chat Experience

| Element | Mobile (< 640px) | Tablet (640-1023px) | Desktop (1024px+) |
|---------|-------------------|---------------------|--------------------|
| Layout | Full-screen, no nav | Full-screen, no nav | Split: sidebar 280px + chat |
| Mentor switcher | Dropdown in header | Dropdown in header | Persistent sidebar |
| Message bubbles | Full width - 32px padding | Max 75% width | Max 65% width |
| Input area | Fixed bottom, full width | Fixed bottom, full width | Fixed bottom, padded |
| Mentor avatar | 32px in messages | 36px in messages | 40px in messages |
| Back button | Visible, top-left | Visible, top-left | Hidden (sidebar nav) |
| Message counter | Subtle bar above input | Subtle bar above input | In sidebar |
| Typing indicator | 3 dots animation | 3 dots animation | 3 dots + "digitando..." |

#### Email Gate Modal

| Element | Mobile (< 640px) | Tablet (640-1023px) | Desktop (1024px+) |
|---------|-------------------|---------------------|--------------------|
| Modal size | Full screen (bottom sheet) | 480px centered | 480px centered |
| Animation | Slide up from bottom | Fade + scale | Fade + scale |
| Close behavior | Swipe down to dismiss | Click backdrop or X | Click backdrop or X |

#### Program Sales Page

| Element | Mobile (< 640px) | Tablet (640-1023px) | Desktop (1024px+) |
|---------|-------------------|---------------------|--------------------|
| Module list | Accordion, vertical | 2-column grid | Timeline layout |
| Comparison table | 2 cols, scrollable | 2 cols, full | 2 cols, side-by-side |
| Pricing card | Full width, sticky CTA | Centered card | Centered card |
| FAQ | Accordion full width | Accordion 2 cols | Accordion 2 cols |
| Sticky CTA | Fixed bottom bar | Hidden (in page) | Hidden (in page) |

#### Members Dashboard

| Element | Mobile (< 640px) | Tablet (640-1023px) | Desktop (1024px+) |
|---------|-------------------|---------------------|--------------------|
| Navigation | Bottom tab bar | Bottom tab bar | Left sidebar |
| Module grid | Stack, 1 col | Grid 2 cols | Grid 3 cols or timeline |
| Mentor quick access | Horizontal scroll | Horizontal scroll | Sidebar grid |
| Progress bar | Full width | Full width | In header card |

#### Admin Dashboard

| Element | Mobile (< 640px) | Tablet (640-1023px) | Desktop (1024px+) |
|---------|-------------------|---------------------|--------------------|
| KPI cards | 2x2 grid | 4 cols | 4 cols |
| Funnel chart | Vertical bars | Horizontal funnel | Horizontal funnel |
| Lead table | Card list (stacked) | Simplified table | Full table |
| Navigation | Bottom sheet menu | Left sidebar | Left sidebar |
| Conversation viewer | Full screen overlay | Split panel | Split panel |

### 5.3 Touch Target Minimums

```
All interactive elements:  minimum 44px x 44px (WCAG AA)
Buttons:                   minimum height 48px
Chat input:                minimum height 48px
Nav items:                 minimum height 48px
Spacing between targets:   minimum 8px
```

### 5.4 Performance Targets (Mobile)

```
LCP (Largest Contentful Paint):  < 2.5s
FID (First Input Delay):         < 100ms
CLS (Cumulative Layout Shift):   < 0.1
TTI (Time to Interactive):       < 3.5s
Bundle size (initial):           < 150KB gzipped
Image formats:                   WebP/AVIF with fallback
Font loading:                    swap + preload
```

---

## 6. Interaction Patterns

### 6.1 Chat Opening (Concierge)

```
TRIGGER: User clicks "Fale com um Mentor IA" OR FAB OR auto-open after 3s delay

MOBILE FLOW:
1. FAB pulses gently (gold glow, 2s interval)
2. User taps FAB
3. Chat slides up from bottom (300ms, ease-out)
4. Full-screen chat interface appears
5. Concierge greeting message appears with typing animation (1s delay)
6. Quick-reply buttons appear below greeting (fade-in, 200ms stagger)

DESKTOP FLOW:
1. FAB rests in bottom-right with label "Fale com um Mentor"
2. User clicks FAB
3. Chat panel slides in from right (400ms, spring easing)
4. Panel is 420px wide, full height
5. Same greeting + quick-reply flow

AUTO-OPEN (first visit, 3s delay):
1. After 3 seconds on homepage
2. FAB expands into preview bubble:
   "Ola! Posso te ajudar a encontrar o mentor ideal?"
3. Preview stays 5s, then collapses back to FAB
4. If user engages, opens full chat
```

### 6.2 Text Streaming

```
PATTERN: Character-by-character streaming via SSE

1. User sends message
2. User bubble appears immediately (optimistic)
3. Typing indicator shows (3 animated dots in mentor color)
4. After SSE connection opens:
   - Mentor bubble frame appears (empty)
   - Text streams in word-by-word (not character-by-character)
   - Markdown renders progressively (bold, lists, etc.)
   - Scroll auto-follows to bottom
5. When stream completes:
   - Typing indicator disappears
   - Full message is rendered
   - If contextual CTA needed, it fades in below message (300ms delay)

STREAMING VISUAL:
+------------------------------------------+
|  [Avatar]                                |
|  +------------------------------------+  |
|  | Otimo! Vou te mostrar 3 tecnicas   |  |
|  | de prompt que vao transformar      |  |
|  | seus resultados.                   |  |
|  |                                    |  |
|  | **Tecnica 1: Chain of Thought**    |  |
|  | Ao inves de pedir a resp|          |  |
|  +------------------------------------+  |
|  (blinking cursor at end of text)        |
+------------------------------------------+
```

### 6.3 Mentor Switching

```
MOBILE:
1. User taps [Switch v] in chat header
2. Dropdown slides down (200ms) showing all 7 mentors as colored pills
3. Each pill shows: [Color dot] Name - Specialty
4. Active mentor is highlighted
5. User taps new mentor
6. Transition animation:
   a. Current chat fades to 50% opacity (150ms)
   b. New mentor color washes across header (300ms)
   c. Chat clears and new mentor greeting appears
   d. Previous chat is saved and accessible via history

DESKTOP (sidebar):
1. Mentors always visible in sidebar
2. Active mentor has highlighted bg + color bar on left
3. Click new mentor
4. Chat area crossfades (300ms)
5. Header accent color transitions (300ms)
6. New mentor greeting loads

CONTEXT PRESERVATION:
- Level assessment carries over between mentors
- Message count continues (not reset per mentor)
- Each mentor's conversation history is separate
- User can switch back and resume previous conversation
```

### 6.4 Email Gate Trigger

```
TRIGGER: Message count reaches 20

FLOW:
1. After user sends message #20, mentor responds normally
2. When mentor response completes:
   a. 500ms pause
   b. Overlay fades in (300ms)
   c. Modal slides up from bottom (mobile) or scales in (desktop)
3. Modal shows:
   - Mentor avatar + "Voce esta indo bem!"
   - Explanation + email field
   - LGPD checkbox
   - Gold CTA button
4. User enters email and submits
5. Success state:
   a. Checkmark animation (500ms)
   b. "Pronto! +10 mensagens liberadas"
   c. Modal dismisses (300ms)
   d. Chat continues seamlessly
6. If user dismisses modal:
   a. Chat is paused
   b. Soft reminder appears at bottom:
      "Deixe seu email para continuar ->"
   c. Clicking reminder re-opens modal
```

### 6.5 Contextual CTA Appearance

```
TRIGGER: Mentor AI decides it is a natural moment (post-gate, deep question, etc.)

FLOW:
1. Mentor message completes streaming
2. 500ms pause
3. CTA card slides up below message (300ms, ease-out):

   +------------------------------------+
   | [gold border, subtle glow]         |
   |                                    |
   | Isso que te ensinei e a ponta      |
   | do iceberg. No programa completo   |
   | voce tem acesso a mim 24/7.        |
   |                                    |
   | [*] Conhecer o Programa ->         |
   | (gold button)                      |
   |                                    |
   | [Continuar conversa]               |
   | (text link, subtle)                |
   +------------------------------------+

4. User can:
   a. Click CTA -> navigates to /programa (new tab on desktop, push on mobile)
   b. Click "Continuar" -> CTA collapses, chat continues
   c. Ignore -> CTA stays but does not block chat

RULES:
- Maximum 2 CTAs per session
- Minimum 5 messages between CTAs
- Never show CTA before message #15
- CTA should feel like mentor's natural suggestion, not an ad
```

### 6.6 Concierge to Mentor Handoff

```
FLOW:
1. Concierge completes assessment
2. Concierge presents recommendations:
   "Baseado no que me contou, recomendo:
    [1] Nicolas - IA Pratica
    [2] Gary - Conteudo
    Qual quer experimentar?"

3. User selects (tap numbered option or type)

4. Transition animation (mobile):
   a. Chat dims to 50% (150ms)
   b. "Conectando com Nicolas..." message appears
   c. Full-screen crossfade to new mentor colors (400ms)
   d. URL changes to /chat/nicolas
   e. Nicolas greeting appears with typing animation

5. Transition animation (desktop):
   a. Sidebar mentor becomes highlighted
   b. Chat area crossfades
   c. Header accent transitions to mentor color
   d. Nicolas greeting appears
```

---

## 7. Micro-interactions & Animation System

### 7.1 Page Entry Animations

```yaml
homepage:
  hero:
    headline: "fade-up, 600ms, delay 0ms"
    subtitle: "fade-up, 600ms, delay 150ms"
    cta: "fade-up + scale(0.95->1), 500ms, delay 300ms"
    stats: "fade-up, 400ms, delay 450ms"

  mentorCards:
    trigger: "on scroll into viewport"
    animation: "fade-up + translate-y(20px->0), 400ms each"
    stagger: "100ms between cards"

  howItWorks:
    steps: "fade-left, 400ms each, 150ms stagger"
    numbers: "scale(0->1) + fade, 300ms, bounce easing"

  testimonials:
    cards: "fade-in, 500ms on slide change"

  footer:
    cta: "fade-up, 400ms"
```

### 7.2 Hover States (Desktop Only)

```yaml
mentorCard:
  default: "bg: surface.default, border: transparent, shadow: none"
  hover:
    bg: "mentor.muted (e.g., rgba(37,99,235,0.08))"
    border: "1px solid mentor.primary at 30% opacity"
    shadow: "mentor iconGlow"
    transform: "translateY(-4px)"
    transition: "300ms ease"
    avatar: "scale(1.05), 200ms"
    ctaButton: "bg brightness +10%, 150ms"

goldButton:
  default: "bg: accent.gold, text: inverse"
  hover:
    bg: "accent.goldLight"
    shadow: "glowGold"
    transform: "translateY(-2px)"
    transition: "200ms ease"

navLink:
  default: "text: text.secondary"
  hover:
    text: "text.primary"
    borderBottom: "2px solid accent.gold"
    transition: "150ms ease"
```

### 7.3 Chat Micro-interactions

```yaml
messageSend:
  userBubble:
    entry: "scale(0.95->1) + fade-in, 200ms, ease-out"
    origin: "bottom-right"

  mentorBubble:
    entry: "scale(0.95->1) + fade-in, 200ms, ease-out"
    origin: "bottom-left"

typingIndicator:
  dots:
    animation: "3 dots, bounce sequentially"
    duration: "1.4s per cycle"
    easing: "ease-in-out"
    dot1: "delay 0ms"
    dot2: "delay 200ms"
    dot3: "delay 400ms"

streamingCursor:
  animation: "opacity 0->1->0, 800ms, infinite"
  style: "2px wide bar in mentor color"

messageCounter:
  nearLimit: "at 15/20, counter color changes to warning"
  atLimit: "counter pulses in red, 2 cycles"

quickReplyButtons:
  entry: "fade-up + scale(0.9->1), 200ms each, 100ms stagger"
  tap: "scale(0.95), 100ms, then scale(1)"
  selected: "bg fills with mentor color, 200ms"
```

### 7.4 Transitions Between Screens

```yaml
pageTransitions:
  homepageToChat:
    type: "slide-left"
    duration: "300ms"
    easing: "ease-out"
    mobile: "full page slide"
    desktop: "chat panel slides in from right"

  chatToPrograma:
    type: "push"
    duration: "300ms"
    easing: "ease"
    mobile: "new page pushes from right"
    desktop: "new tab (no animation)"

  mentorSwitch:
    type: "crossfade"
    duration: "300ms"
    easing: "ease"
    colorTransition: "header accent bar morphs, 300ms"

  modalOpen:
    overlay: "fade-in, 200ms"
    modal:
      mobile: "slide-up from bottom, 300ms, spring easing"
      desktop: "scale(0.95->1) + fade, 200ms"

  modalClose:
    modal:
      mobile: "slide-down, 200ms, ease-in"
      desktop: "scale(1->0.95) + fade-out, 150ms"
    overlay: "fade-out, 150ms"
```

### 7.5 Loading States

```yaml
loadingStates:
  pageLoad:
    type: "skeleton screens"
    style: "shimmer animation on bg.tertiary shapes"
    shimmerGradient: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)"
    shimmerDuration: "1.5s, infinite"

  chatLoad:
    type: "skeleton bubbles"
    pattern: "3 fake message skeletons with varying widths"

  mentorCardLoad:
    type: "skeleton card"
    pattern: "circle (avatar) + 3 lines (text) + rectangle (button)"

  buttonLoading:
    type: "spinner inside button"
    spinner: "16px circle, border-2, mentor color, 800ms rotation"
    text: "changes to 'Carregando...'"

  imageLoad:
    type: "blur-up"
    pattern: "tiny placeholder (20px) blurred, swap to full on load"
    transition: "300ms ease"
```

### 7.6 Scroll-triggered Animations

```yaml
scrollAnimations:
  strategy: "Intersection Observer, trigger at 20% visibility"

  fadeUp:
    properties: "opacity: 0->1, translateY: 20px->0"
    duration: "400ms"
    easing: "ease-out"
    trigger: "once (do not re-animate)"

  staggerChildren:
    parent: "triggers when in viewport"
    children: "each child gets 100ms delay increment"
    maxDelay: "600ms (cap at 6 children)"

  counterUp:
    target: "stats numbers (2.400+, 97%, 7)"
    animation: "count from 0 to target"
    duration: "1500ms"
    easing: "ease-out (decelerating)"

  progressBar:
    animation: "width: 0->target%"
    duration: "800ms"
    easing: "ease-out"
    trigger: "on viewport entry"
```

### 7.7 Feedback Micro-interactions

```yaml
feedback:
  emailSubmitSuccess:
    sequence:
      1: "Button transforms to checkmark circle (300ms)"
      2: "Checkmark draws in (stroke-dashoffset animation, 400ms)"
      3: "Green flash on modal border (200ms)"
      4: "Text changes to success message (fade, 200ms)"
      5: "Modal auto-closes (500ms delay, then 300ms slide-down)"

  emailValidationError:
    input: "border-color transitions to semantic.error (150ms)"
    shake: "translateX(-4, 4, -4, 4, 0), 300ms"
    errorText: "fade-in below input, 200ms"

  messageSent:
    haptic: "light impact (mobile, if supported)"
    sound: "none (no audio, distraction-free)"
    visual: "bubble entry animation is the feedback"

  ctaClick:
    ripple: "circular ripple from click point, mentor color at 20% opacity, 400ms"
    haptic: "medium impact (mobile)"
```

### 7.8 Accessibility Animation Controls

```yaml
accessibility:
  prefersReducedMotion:
    behavior: "Respect prefers-reduced-motion: reduce"
    fallback: "Replace all animations with instant opacity transitions"
    duration: "0ms for all transforms, 150ms for opacity only"
    exceptions: "None -- all animations must respect this"

  focusRing:
    style: "2px solid accent.gold, 2px offset"
    animation: "none (instant, no transition)"
    visibility: "visible on keyboard focus only (:focus-visible)"

  ariaLive:
    chatMessages: "polite (new messages announced)"
    typingIndicator: "polite (Mentor esta digitando...)"
    messageCounter: "assertive (when near limit: Voce tem X mensagens restantes)"
    errors: "assertive"
```

---

## Appendix A: Component Inventory (Atomic Design)

### Atoms
- Button (variants: primary/gold, secondary/outline, ghost, mentor-colored)
- Input (text, email, password)
- Badge (level badge, status badge, mentor badge)
- Avatar (mentor avatar with color ring)
- Icon (from icon-map.ts or Lucide)
- Typography (heading, body, caption, label)
- Divider
- Spinner / Loading dot
- Skeleton

### Molecules
- MentorCard (avatar + name + specialty + level badge + CTA)
- ChatBubble (avatar + message + timestamp)
- TypingIndicator (3 dots animation)
- QuickReplyButton (text pill, tappable)
- MessageCounter (progress bar + "X/20 mensagens")
- InputWithButton (text input + send button)
- TestimonialCard (photo + quote + name)
- StatCard (number + label)
- ModuleCard (icon + title + progress + mentor)
- KPICard (value + label + trend arrow)
- NavItem (icon + label + active state)

### Organisms
- ChatPanel (header + message list + input area)
- MentorShowcase (section title + card grid/scroll)
- EmailGateModal (overlay + form + CTA)
- HeroSection (headline + subtitle + CTA + stats)
- ProgramModuleList (accordion/timeline of modules)
- ComparisonTable (free vs paid)
- PricingCard (price + payment options + CTA)
- FAQAccordion (list of expandable items)
- AdminMetricsGrid (4 KPI cards)
- AdminLeadTable (filterable table with actions)
- MentorSidebar (list of mentor nav items)
- BottomNavBar (mobile tab navigation)

### Templates
- LandingPageTemplate (hero + showcase + social proof + CTA)
- ChatTemplate (sidebar? + chat panel)
- SalesPageTemplate (hero + benefits + modules + pricing + FAQ)
- MembersDashboardTemplate (nav + content area)
- AdminDashboardTemplate (nav + metrics + tables)

### Pages
- Homepage (`/`)
- Chat (`/chat/:mentorSlug`)
- Programa (`/programa`)
- Checkout (`/checkout`)
- Members Dashboard (`/members/dashboard`)
- Admin Dashboard (`/admin/dashboard`)

---

## Appendix B: Design Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Dark mode as default | Yes | Premium positioning, AI brand alignment, reduces eye strain during long chat sessions |
| Plus Jakarta Sans for headings | Yes | Modern geometric sans-serif, premium feel, excellent readability |
| Inter for body | Yes | Optimized for screens, extensive character support (Portuguese), neutral |
| Gold as brand accent | Yes | Luxury signal, stands out on dark backgrounds, aligns with high-ticket positioning |
| Mentor cards horizontal scroll (mobile) | Yes | Saves vertical space, encourages exploration, natural mobile pattern |
| Full-screen chat on mobile | Yes | Chat is the central experience, immersive, no distractions |
| Split layout chat on desktop | Yes | Efficient use of space, mentor switching without losing context |
| Bottom sheet for email gate (mobile) | Yes | Native mobile pattern, less intrusive than centered modal, swipe to dismiss |
| Skeleton screens over spinners | Yes | Reduces perceived loading time, maintains layout stability (CLS) |
| No sound effects | Yes | Distraction-free, professional, accessibility-friendly |
| 20 message gate | Per PRD spec | Balance between demonstrating value and capturing leads |
| Maximum 2 CTAs per session | Avoid fatigue | Prevents sales pressure, maintains trust and premium positioning |

---

*Document generated by Uma (UX Design Expert) -- AIOS*
*AI Mentor Academy UX Architecture v1.0*
*2026-02-12*
