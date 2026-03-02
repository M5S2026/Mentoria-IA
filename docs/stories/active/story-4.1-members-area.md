# Story 4.1: Área de Membros - Autenticação e Dashboard

## Status

Done

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build"]

## Story

**As a** aluno que comprou o programa,
**I want** acessar uma área exclusiva com meu conteúdo premium,
**so that** eu possa acompanhar meu progresso e acessar todos os recursos do programa.

## Acceptance Criteria

- [x] 1. Login via Supabase Auth (email/senha) na rota `/login`
- [x] 2. Página de reset de senha funcional
- [x] 3. Middleware de autenticação protege rotas `/members/*`
- [x] 4. Dashboard do membro em `/members` com visão geral: progresso, módulo atual, mentores disponíveis
- [x] 5. Sidebar de navegação com: Dashboard, Módulos, Mentores, Comunidade (placeholder), Minha Conta
- [x] 6. Card de progresso geral (% de módulos completos)
- [x] 7. Acesso ilimitado aos mentores IA (sem gate de email, sem limite de mensagens)
- [x] 8. Chat com mentores integrado na área de membros (reutilizar componentes do chat público)
- [x] 9. Perfil do usuário editável (nome, foto placeholder)
- [x] 10. Página responsiva e consistente com design system (dark mode premium)
- [x] 11. Redirect automático: usuário não autenticado em `/members` vai para `/login`
- [x] 12. Redirect automático: usuário autenticado em `/login` vai para `/members`

## Tasks / Subtasks

- [x] Task 1: Implementar autenticação Supabase Auth
  - [x] 1.1 Criar página `/login` com form de email/senha
  - [x] 1.2 Criar página `/reset-password` para recuperação de senha
  - [x] 1.3 Configurar middleware Next.js para proteger rotas `/members/*`
  - [x] 1.4 Hook `useAuth()` para gerenciar estado de autenticação

- [x] Task 2: Criar layout da área de membros
  - [x] 2.1 Layout com sidebar + área de conteúdo principal
  - [x] 2.2 Sidebar com navegação: Dashboard, Módulos, Mentores, Comunidade, Conta
  - [x] 2.3 Header com nome do usuário e botão de logout
  - [x] 2.4 Responsivo: sidebar vira menu hambúrguer em mobile

- [x] Task 3: Criar dashboard do membro
  - [x] 3.1 Card de progresso geral com barra de progresso
  - [x] 3.2 Card do módulo atual com link para continuar
  - [x] 3.3 Grid de mentores disponíveis com acesso direto ao chat
  - [x] 3.4 Próxima call ao vivo (placeholder com data/hora)

- [x] Task 4: Integrar chat premium na área de membros
  - [x] 4.1 Página `/members/mentors` com lista de mentores
  - [x] 4.2 Página `/members/mentors/[slug]` com chat ilimitado
  - [x] 4.3 Reutilizar componentes de chat existentes com `accessType: 'premium'`
  - [x] 4.4 Sem email gate, sem limite de mensagens para membros

- [x] Task 5: Página de perfil
  - [x] 5.1 Criar `/members/account` com form de edição de perfil
  - [x] 5.2 Alterar nome, foto (upload futuro), notificações

## Dependencies

- **Story 3.3** (Checkout Hotmart) - COMPLETA - cria membros no Supabase
- **Story 1.4** (Concierge Chat) - COMPLETA - componentes de chat reutilizáveis
- **Supabase Auth** configurado no projeto

## Definition of Done

- [x] Login e logout funcionais via Supabase Auth
- [x] Rotas /members/* protegidas por middleware
- [x] Dashboard com progresso e acesso a mentores
- [x] Chat premium sem limites para membros
- [x] Responsivo em mobile e desktop
- [x] Build passa sem erros

## Size Estimate

**L** (Large)

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-19 | 1.0 | Story criada para cobrir gap do PRD | Orion (AIOS Master) |
