# Story 4.2: Módulos de Curso com Progresso

## Status

Done

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build"]

## Story

**As a** aluno do programa,
**I want** acessar os módulos de vídeo organizados por semana e acompanhar meu progresso,
**so that** eu siga o curriculum estruturado e saiba onde parei.

## Acceptance Criteria

- [x] 1. Página `/members/modules` lista os 6 módulos do programa com status (bloqueado/em progresso/completo)
- [x] 2. Cada módulo tem página `/members/modules/[id]` com lista de aulas
- [x] 3. Cada aula tem: título, duração estimada, status (assistida/não assistida), vídeo embed (placeholder)
- [x] 4. Progresso salvo no Supabase: tabela `module_progress` com user_id, module_id, lesson_id, completed_at
- [x] 5. Barra de progresso por módulo e geral
- [x] 6. Módulos desbloqueiam sequencialmente (módulo 2 só abre após completar módulo 1)
- [x] 7. Cada módulo indica o mentor principal associado (Nicolas, Gary, etc.)
- [x] 8. Botão "Marcar como assistida" em cada aula
- [x] 9. Certificado de conclusão (placeholder) ao completar todos os módulos

## Tasks / Subtasks

- [x] Task 1: Criar estrutura de dados dos módulos
  - [x] 1.1 Definir constante tipada com os 6 módulos e suas aulas
  - [x] 1.2 Criar migration para tabela `module_progress`
  - [x] 1.3 Hook `useModuleProgress()` para ler/atualizar progresso

- [x] Task 2: Criar página de listagem de módulos
  - [x] 2.1 Grid de cards com nome do módulo, mentor, progresso, status
  - [x] 2.2 Indicador visual de módulo bloqueado/desbloqueado

- [x] Task 3: Criar página de módulo individual
  - [x] 3.1 Lista de aulas com checkbox de conclusão
  - [x] 3.2 Área de vídeo (placeholder/embed)
  - [x] 3.3 Descrição da aula e recursos adicionais

- [x] Task 4: Tracking de progresso
  - [x] 4.1 API route para marcar aula como completa
  - [x] 4.2 Cálculo de progresso por módulo e geral
  - [x] 4.3 Desbloqueio sequencial de módulos

## Dependencies

- **Story 4.1** (Área de Membros) - autenticação e layout base
- **Supabase** - tabela module_progress

## Definition of Done

- [x] 6 módulos listados com progresso visual
- [x] Aulas marcáveis como completas
- [x] Progresso persistido no Supabase
- [x] Desbloqueio sequencial funcional
- [x] Build passa sem erros

## Size Estimate

**L** (Large)

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-19 | 1.0 | Story criada para cobrir gap do PRD | Orion (AIOS Master) |
