# Story 1.1: Project Setup & Infrastructure

## Status

Done

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build"]

## Story

**As a** desenvolvedor,
**I want** ter o projeto AI Mentor Academy configurado com Next.js 14+, Supabase e deploy no Vercel,
**so that** tenhamos a base tecnica pronta para desenvolver todas as features da plataforma.

## Acceptance Criteria

- [x] 1. Projeto Next.js 14+ inicializado com TypeScript strict e App Router
- [x] 2. Tailwind CSS configurado com tema dark mode como padrao
- [x] 3. shadcn/ui instalado e configurado com tema customizado (paleta dark + dourado)
- [x] 4. Zustand instalado para state management
- [x] 5. Supabase client configurado (`@supabase/supabase-js` + `@supabase/auth-helpers-nextjs`)
- [x] 6. Variaveis de ambiente definidas em `.env.local.example` (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY)
- [x] 7. ESLint + Prettier configurados com regras do projeto (sem `any`, imports absolutos)
- [x] 8. Path aliases configurados no `tsconfig.json` (`@/` apontando para `src/`)
- [x] 9. Estrutura de pastas criada conforme arquitetura (route groups: marketing, chat, auth, members, admin)
- [x] 10. API route `/api/health` retornando status 200 com JSON `{ status: "ok", timestamp: ... }`
- [x] 11. Root layout com providers base (font, metadata, viewport)
- [x] 12. Fonte Plus Jakarta Sans carregada via `next/font/google`
- [x] 13. `globals.css` com variaveis CSS para o design system (cores, espacamentos)
- [x] 14. Build passa sem erros (`npm run build`)
- [x] 15. Arquivo `README.md` com instrucoes de setup local

## Tasks / Subtasks

- [x] Task 1: Inicializar projeto Next.js (AC: 1)
  - [x] 1.1 Criar projeto com `npx create-next-app@latest` (TypeScript, App Router, Tailwind, ESLint)
  - [x] 1.2 Configurar `tsconfig.json` com strict mode e path aliases `@/*`
  - [x] 1.3 Configurar `.env.local.example` com todas as variaveis necessarias

- [x] Task 2: Configurar design system base (AC: 2, 3, 12, 13)
  - [x] 2.1 Instalar e configurar shadcn/ui com tema dark
  - [x] 2.2 Configurar `tailwind.config.ts` com paleta de cores (dark, dourado, cores dos mentores)
  - [x] 2.3 Carregar fonte Plus Jakarta Sans via `next/font/google`
  - [x] 2.4 Criar `globals.css` com CSS variables do design system

- [x] Task 3: Instalar dependencias core (AC: 4, 5)
  - [x] 3.1 Instalar `zustand` para state management
  - [x] 3.2 Instalar `@supabase/supabase-js` e `@supabase/auth-helpers-nextjs`
  - [x] 3.3 Criar `src/lib/supabase/client.ts` (browser client)
  - [x] 3.4 Criar `src/lib/supabase/server.ts` (server client)

- [x] Task 4: Configurar linting e formatacao (AC: 7)
  - [x] 4.1 Configurar ESLint com regras: no-any, import order, absolute imports
  - [x] 4.2 Configurar Prettier com settings padrao
  - [x] 4.3 Adicionar scripts `lint` e `format` ao `package.json`

- [x] Task 5: Criar estrutura de pastas (AC: 9)
  - [x] 5.1 Criar route groups: `(marketing)`, `(chat)`, `(auth)`, `(members)`, `(admin)`
  - [x] 5.2 Criar layouts base para cada route group (placeholder)
  - [x] 5.3 Criar pasta `src/components/ui/` para shadcn/ui
  - [x] 5.4 Criar pasta `src/lib/` (supabase, ai, utils)
  - [x] 5.5 Criar pasta `src/stores/` para Zustand stores

- [x] Task 6: Configurar root layout e health check (AC: 10, 11, 14)
  - [x] 6.1 Configurar `src/app/layout.tsx` com font, metadata, viewport
  - [x] 6.2 Criar API route `src/app/api/health/route.ts`
  - [x] 6.3 Verificar que `npm run build` passa sem erros

- [x] Task 7: Documentacao (AC: 15)
  - [x] 7.1 Criar `README.md` com instrucoes de setup, variaveis de ambiente, e scripts

## Dev Notes

### Stack Tecnica

| Tecnologia | Versao | Proposito |
|-----------|--------|-----------|
| Next.js | 14+ | Framework fullstack (App Router, SSR/SSG, API Routes) |
| TypeScript | 5+ | Type safety com strict mode |
| Tailwind CSS | 3.4+ | Styling utility-first com dark mode |
| shadcn/ui | latest | Componentes UI customizaveis |
| Zustand | 4+ | State management leve |
| Supabase | 2+ | Auth + Database + Realtime |

### Estrutura de Pastas (da Arquitetura)

```
src/
  app/
    (marketing)/          # Landing page, programa, mentores (SSG)
      layout.tsx          # Header + Footer
    (chat)/               # Interface de chat (CSR-heavy)
      layout.tsx          # Layout minimalista
    (auth)/               # Login, signup, reset
      layout.tsx          # Layout centralizado
    (members)/            # Area de membros (protegida)
      layout.tsx          # Sidebar + header
    (admin)/              # Dashboard admin (protegida)
      layout.tsx          # Sidebar + header admin
    api/
      health/route.ts     # Health check
    layout.tsx            # Root layout
    globals.css           # Estilos globais + Tailwind
  components/
    ui/                   # shadcn/ui components
  lib/
    supabase/
      client.ts           # createBrowserClient
      server.ts           # createServerClient
  stores/                 # Zustand stores
```

### Paleta de Cores (da Arquitetura - Branding)

- **Fundo primario:** Dark mode (tons de cinza escuro / preto)
- **Acento primario:** Dourado / gradiente dourado
- **Cores dos mentores:**
  - Nicolas: `#3B82F6` (azul eletrico)
  - Erico: `#EF4444` (vermelho)
  - Elon: `#6B7280` (prata/grafite)
  - Hormozi: `#F59E0B` (preto/dourado)
  - Russell: `#F97316` (laranja)
  - Altman: `#E5E7EB` (branco/minimalista)
  - Gary: `#EAB308` (amarelo)

### Supabase Client Setup

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// src/lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { /* cookie handlers */ } }
  )
}
```

### Variaveis de Ambiente

```env
# .env.local.example
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=your_anthropic_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Testing

- Nesta story nao ha testes unitarios obrigatorios
- O build bem-sucedido (`npm run build`) e o criterio principal de validacao
- O health check deve retornar 200 quando acessado via `curl localhost:3000/api/health`

## Dependencies

- Nenhuma dependencia de outras stories (esta e a primeira)
- Requer acesso a conta Supabase (credenciais)
- Requer Node.js 18+ instalado

## Definition of Done

- [x] Projeto inicializado e buildando sem erros
- [x] Todas as dependencias core instaladas
- [x] Estrutura de pastas conforme arquitetura
- [x] ESLint + Prettier configurados e passando
- [x] Health check retornando 200
- [x] Path aliases funcionando (`@/` imports)
- [x] Dark mode como tema padrao
- [x] Fonte Plus Jakarta Sans carregada
- [x] `.env.local.example` documentado
- [x] README com instrucoes de setup

## Size Estimate

**M** (Medium) - 1 sessao focada de desenvolvimento (~2-3 horas)

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-12 | 1.0 | Story criada a partir do PRD e Arquitetura | Morgan (PM Agent) |
| 2026-02-12 | 1.1 | Implementacao completa | Dex (Dev Agent) |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

N/A - clean implementation, no debug issues encountered.

### Completion Notes List

- Next.js 16.1.6 installed (latest, exceeds 14+ requirement)
- Tailwind CSS v4 (new `@import "tailwindcss"` syntax, no tailwind.config.ts needed)
- shadcn/ui initialized with new-york style, neutral base, CSS variables
- Used `@supabase/ssr` instead of deprecated `@supabase/auth-helpers-nextjs`
- Dark theme set as default via `className="dark"` on html element
- Gold accent colors defined in CSS custom properties for the design system
- All 7 mentor colors registered as Tailwind theme colors
- Primary color in dark mode set to gold-toned oklch value
- Netlify deploy successful at https://ai-mentor-academy-sa.netlify.app
- `npm run lint`, `npm run typecheck`, and `npm run build` all pass clean

### File List

- `/Users/silviaassay/ai-mentor-academy/package.json` - Project config with all dependencies
- `/Users/silviaassay/ai-mentor-academy/tsconfig.json` - TypeScript strict + path aliases
- `/Users/silviaassay/ai-mentor-academy/next.config.ts` - Next.js configuration
- `/Users/silviaassay/ai-mentor-academy/postcss.config.mjs` - PostCSS with Tailwind
- `/Users/silviaassay/ai-mentor-academy/eslint.config.mjs` - ESLint with no-any rule
- `/Users/silviaassay/ai-mentor-academy/.prettierrc` - Prettier config
- `/Users/silviaassay/ai-mentor-academy/.prettierignore` - Prettier ignore patterns
- `/Users/silviaassay/ai-mentor-academy/components.json` - shadcn/ui config
- `/Users/silviaassay/ai-mentor-academy/netlify.toml` - Netlify deploy config
- `/Users/silviaassay/ai-mentor-academy/.env.local.example` - Environment variables template
- `/Users/silviaassay/ai-mentor-academy/.gitignore` - Git ignore patterns
- `/Users/silviaassay/ai-mentor-academy/README.md` - Setup instructions
- `/Users/silviaassay/ai-mentor-academy/src/app/layout.tsx` - Root layout (Plus Jakarta Sans, metadata, viewport)
- `/Users/silviaassay/ai-mentor-academy/src/app/page.tsx` - Home placeholder page
- `/Users/silviaassay/ai-mentor-academy/src/app/globals.css` - Global styles + design system variables
- `/Users/silviaassay/ai-mentor-academy/src/app/api/health/route.ts` - Health check endpoint
- `/Users/silviaassay/ai-mentor-academy/src/app/(marketing)/layout.tsx` - Marketing route group layout
- `/Users/silviaassay/ai-mentor-academy/src/app/(chat)/layout.tsx` - Chat route group layout
- `/Users/silviaassay/ai-mentor-academy/src/app/(auth)/layout.tsx` - Auth route group layout
- `/Users/silviaassay/ai-mentor-academy/src/app/(members)/layout.tsx` - Members route group layout
- `/Users/silviaassay/ai-mentor-academy/src/app/(admin)/layout.tsx` - Admin route group layout
- `/Users/silviaassay/ai-mentor-academy/src/lib/utils.ts` - Utility functions (cn helper)
- `/Users/silviaassay/ai-mentor-academy/src/lib/supabase/client.ts` - Supabase browser client
- `/Users/silviaassay/ai-mentor-academy/src/lib/supabase/server.ts` - Supabase server client
- `/Users/silviaassay/ai-mentor-academy/src/config/mentors.ts` - Mentor definitions and types

## QA Results

_A ser preenchido pelo QA agent_
