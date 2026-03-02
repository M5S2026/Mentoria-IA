# Story 4.3: Admin Dashboard para Silvia

## Status

Done

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build"]

## Story

**As a** Silvia (admin),
**I want** um dashboard para visualizar métricas de leads, conversões e uso dos mentores,
**so that** eu possa tomar decisões informadas sobre o negócio.

## Acceptance Criteria

- [x] 1. Rota `/admin` protegida por role=admin no Supabase
- [x] 2. Dashboard com KPIs: total leads, taxa conversão, receita, leads ativos no nurture
- [x] 3. Gráfico de leads capturados por dia (últimos 30 dias)
- [x] 4. Tabela de leads recentes com email, nome, mentor preferido, nível, status, data
- [x] 5. Filtros por status (new, nurturing, converted, unsubscribed)
- [x] 6. Métricas por mentor: qual mentor gera mais leads e conversões
- [x] 7. Lista de membros ativos com data de compra e progresso
- [x] 8. Export de leads em CSV
- [x] 9. Visualização de eventos analytics (conversas iniciadas, gates atingidos, compras)
- [x] 10. Responsivo e consistente com design system

## Tasks / Subtasks

- [x] Task 1: Proteger rota admin
  - [x] 1.1 Middleware para verificar role=admin
  - [x] 1.2 Criar usuário admin para Silvia no Supabase

- [x] Task 2: Criar dashboard de KPIs
  - [x] 2.1 API route `/api/admin/stats` para agregar dados
  - [x] 2.2 Cards de KPI com números e variação percentual
  - [x] 2.3 Gráfico de leads por dia (chart library: recharts ou chart.js)

- [x] Task 3: Criar tabela de leads
  - [x] 3.1 Tabela paginada com busca e filtros
  - [x] 3.2 Export CSV

- [x] Task 4: Criar métricas por mentor
  - [x] 4.1 Ranking de mentores por leads gerados
  - [x] 4.2 Ranking de mentores por conversões

- [x] Task 5: Lista de membros
  - [x] 5.1 Tabela de membros com status e progresso

## Dependencies

- **Story 4.1** (Área de Membros) - autenticação base
- **Supabase** - dados de leads, members, analytics_events

## Definition of Done

- [x] Dashboard acessível apenas para admin
- [x] KPIs calculados corretamente
- [x] Tabela de leads com filtros e export
- [x] Métricas por mentor visíveis
- [x] Build passa sem erros

## Size Estimate

**L** (Large)

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-19 | 1.0 | Story criada para cobrir gap do PRD | Orion (AIOS Master) |
