# Story 3.1: Email Gate & Lead Capture

## Status

Ready

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build", "api-test"]

## Story

**As a** negocio,
**I want** capturar o email do visitante apos ele experimentar valor com o mentor IA,
**so that** eu possa nutrir o lead e converter em venda.

## Acceptance Criteria

- [ ] 1. Apos 20 mensagens gratuitas, a API retorna evento SSE `email_gate` e o modal de email gate aparece sobre o chat
- [ ] 2. Modal exibe mensagem personalizada: "Para continuar aprendendo com [Nome do Mentor], deixe seu email"
- [ ] 3. Campo de email com validacao client-side (formato) e server-side + campo de nome (opcional)
- [ ] 4. Checkbox de consentimento LGPD com texto: "Concordo em receber comunicacoes da AI Mentor Academy. Posso cancelar a qualquer momento."
- [ ] 5. Checkbox LGPD deve estar marcado para habilitar o botao de submit
- [ ] 6. Apos submit do email, visitante ganha +10 mensagens (total 30), modal fecha e chat continua
- [ ] 7. Lead salvo no Supabase tabela `leads` com: email, name, detected_level, detected_interest, mentor_preferred, session_id, lgpd_consent, source='chat'
- [ ] 8. API route `POST /api/leads` criada para captura de lead com validacao
- [ ] 9. Ao capturar lead, conversation atualizada com `lead_captured = true` e `phase = 'post_gate'`
- [ ] 10. Chat store atualizado: maxMessages incrementa de 20 para 30, showEmailGate desativa
- [ ] 11. Se o email ja existe na tabela leads, atualizar dados ao inves de duplicar (upsert)
- [ ] 12. Evento analytics `email_captured` registrado com metadata do mentor e nivel
- [ ] 13. Email de boas-vindas enviado via Resend ao lead capturado (Story 3.4 implementa templates completos, aqui envia versao simples)
- [ ] 14. Tratamento de erro: se a API falhar, exibir mensagem amigavel e permitir tentar novamente
- [ ] 15. Modal responsivo: funciona bem em mobile (fullscreen overlay) e desktop (modal centralizado)

## Tasks / Subtasks

- [ ] Task 1: Criar API route POST /api/leads (AC: 7, 8, 9, 11, 12)
  - [ ] 1.1 Criar `src/app/api/leads/route.ts`
  - [ ] 1.2 Validar request body: email (required, formato valido), name (optional), sessionId (required), conversationId (required), lgpdConsent (required, must be true)
  - [ ] 1.3 Implementar upsert na tabela `leads`: se email existe, atualizar; senao, inserir
  - [ ] 1.4 Buscar dados da conversation (detected_level, detected_interest, mentor_id) para enriquecer o lead
  - [ ] 1.5 Atualizar conversation: `lead_captured = true`, `phase = 'post_gate'`
  - [ ] 1.6 Inserir evento em `analytics_events` com type `email_captured`
  - [ ] 1.7 Retornar `{ success: true, additionalMessages: 10, leadId: string }`
  - [ ] 1.8 Usar Supabase admin client (service role) para bypass de RLS

- [ ] Task 2: Atualizar Chat API para detectar email gate (AC: 1)
  - [ ] 2.1 Modificar `src/app/api/chat/route.ts` para verificar messageCount >= 20 quando accessType === 'free'
  - [ ] 2.2 Quando gate atingido, retornar SSE event: `data: { type: "email_gate" }`
  - [ ] 2.3 Nao processar a mensagem do usuario quando gate esta ativo (retornar gate event imediatamente)

- [ ] Task 3: Atualizar Chat Store para suportar email gate (AC: 6, 10)
  - [ ] 3.1 Adicionar ao chat store: `showEmailGate: boolean`, `leadCaptured: boolean`, `leadEmail: string | null`
  - [ ] 3.2 Adicionar actions: `triggerEmailGate()`, `resolveEmailGate(email: string)`, `setMaxMessages(n: number)`
  - [ ] 3.3 Ao resolver email gate: `showEmailGate = false`, `maxMessages = 30`, `leadCaptured = true`
  - [ ] 3.4 Persistir leadEmail no store para uso em CTAs posteriores

- [ ] Task 4: Criar componente EmailGateModal (AC: 2, 3, 4, 5, 14, 15)
  - [ ] 4.1 Criar `src/components/chat/email-gate-modal.tsx`
  - [ ] 4.2 Layout: modal overlay com card centralizado, titulo, campos, botao
  - [ ] 4.3 Titulo dinamico com nome do mentor ativo: "Para continuar aprendendo com {mentorName}, deixe seu email"
  - [ ] 4.4 Input de email com validacao via regex + feedback visual de erro
  - [ ] 4.5 Input de nome (opcional) com placeholder "Como posso te chamar?"
  - [ ] 4.6 Checkbox LGPD com label linkando para politica de privacidade
  - [ ] 4.7 Botao submit desabilitado ate email valido + LGPD marcado
  - [ ] 4.8 Estado de loading no botao durante request
  - [ ] 4.9 Mensagem de erro com botao "Tentar novamente" em caso de falha
  - [ ] 4.10 Design premium: dark mode, bordas douradas, consistente com design system
  - [ ] 4.11 Responsivo: fullscreen em mobile, modal 480px em desktop
  - [ ] 4.12 Nao permitir fechar modal sem preencher (sem botao X), mas adicionar link "Nao, obrigado. Encerrar conversa"

- [ ] Task 5: Integrar EmailGateModal no ChatInterface (AC: 1, 6)
  - [ ] 5.1 Modificar `src/components/chat/chat-interface.tsx` para renderizar EmailGateModal quando `showEmailGate === true`
  - [ ] 5.2 Ao submit do modal, chamar POST /api/leads
  - [ ] 5.3 Em caso de sucesso, chamar `resolveEmailGate(email)` no store
  - [ ] 5.4 Adicionar mensagem do sistema no chat: "Email registrado! Voce tem mais 10 mensagens com {mentorName}."

- [ ] Task 6: Implementar envio de email de boas-vindas basico (AC: 13)
  - [ ] 6.1 Instalar pacote `resend` se ainda nao instalado
  - [ ] 6.2 Criar `src/lib/email/resend-client.ts` com client singleton e funcao `sendLeadCaptureEmail`
  - [ ] 6.3 Email simples (texto puro ou HTML basico): assunto "{nome}, seu mentor {mentorName} esta te esperando", corpo com link para voltar ao site
  - [ ] 6.4 Envio assincrono (nao bloquear response da API /api/leads)
  - [ ] 6.5 Se envio falhar, logar erro mas nao falhar a captura de lead
  - [ ] 6.6 Variavel de ambiente: `RESEND_API_KEY`

## Dev Notes

### Schema da tabela leads (ja definido na arquitetura)

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  name TEXT,
  detected_level TEXT CHECK (detected_level IN ('iniciante', 'intermediario', 'avancado')),
  detected_interest TEXT,
  mentor_preferred TEXT,
  lead_score INTEGER DEFAULT 0,
  source TEXT DEFAULT 'chat',
  conversation_summary TEXT,
  session_id TEXT,
  user_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'nurturing', 'hot', 'converted', 'lost')),
  lgpd_consent BOOLEAN DEFAULT false,
  lgpd_consent_at TIMESTAMPTZ,
  email_sequence_step INTEGER DEFAULT 0,
  last_email_sent_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_leads_email ON leads(email);
```

### API Route POST /api/leads

```typescript
// src/app/api/leads/route.ts

import { createAdminClient } from '@/lib/supabase/admin'

interface CaptureLeadRequest {
  email: string
  name?: string
  sessionId: string
  conversationId: string
  lgpdConsent: boolean
}

export async function POST(request: Request) {
  const body: CaptureLeadRequest = await request.json()

  // Validacao
  if (!body.email || !isValidEmail(body.email)) {
    return Response.json({ error: 'Email invalido' }, { status: 400 })
  }
  if (!body.lgpdConsent) {
    return Response.json({ error: 'Consentimento LGPD obrigatorio' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Buscar dados da conversa para enriquecer lead
  const { data: conversation } = await supabase
    .from('conversations')
    .select('detected_level, detected_interest, mentor_id, mentors(slug, name)')
    .eq('id', body.conversationId)
    .single()

  // Upsert lead
  const { data: lead, error } = await supabase
    .from('leads')
    .upsert(
      {
        email: body.email,
        name: body.name || null,
        detected_level: conversation?.detected_level,
        detected_interest: conversation?.detected_interest,
        mentor_preferred: conversation?.mentors?.slug,
        session_id: body.sessionId,
        source: 'chat',
        lgpd_consent: true,
        lgpd_consent_at: new Date().toISOString(),
        status: 'new',
      },
      { onConflict: 'email' }
    )
    .select('id')
    .single()

  if (error) throw error

  // Atualizar conversa
  await supabase
    .from('conversations')
    .update({ lead_captured: true, phase: 'post_gate' })
    .eq('id', body.conversationId)

  // Analytics event
  await supabase.from('analytics_events').insert({
    event_type: 'email_captured',
    session_id: body.sessionId,
    mentor_id: conversation?.mentor_id,
    metadata: {
      level: conversation?.detected_level,
      interest: conversation?.detected_interest,
      mentor: conversation?.mentors?.slug,
    },
  })

  // Enviar email de boas-vindas (async, nao bloqueia response)
  sendLeadCaptureEmail(
    body.email,
    body.name || 'Visitante',
    conversation?.mentors?.name || 'Mentor'
  ).catch((err) => console.error('Failed to send lead email:', err))

  return Response.json({
    success: true,
    additionalMessages: 10,
    leadId: lead.id,
  })
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
```

### Email Gate SSE Event (no chat API)

```typescript
// Adicionar no src/app/api/chat/route.ts, antes de processar mensagem:

if (context.accessType === 'free' && context.messageCount >= 20 && !context.leadCaptured) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: 'email_gate' })}\n\n`)
      )
      controller.close()
    },
  })
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  })
}
```

### Chat Store Updates

```typescript
// Adicionar ao src/stores/chat-store.ts

interface ChatState {
  // ... campos existentes ...
  showEmailGate: boolean
  leadCaptured: boolean
  leadEmail: string | null
}

// Actions
triggerEmailGate: () => set({ showEmailGate: true }),
resolveEmailGate: (email: string) => set({
  showEmailGate: false,
  leadCaptured: true,
  leadEmail: email,
  maxMessages: 30,
}),
```

### Componente EmailGateModal

```typescript
// src/components/chat/email-gate-modal.tsx

'use client'

import { useState } from 'react'
import { useChatStore } from '@/stores/chat-store'

interface EmailGateModalProps {
  mentorName: string
  onSubmit: (email: string, name: string, lgpdConsent: boolean) => Promise<void>
  onDecline: () => void
}
```

### Resend Client Basico

```typescript
// src/lib/email/resend-client.ts

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'Silvia Assay <silvia@aimentoracademy.com>'

export async function sendLeadCaptureEmail(
  email: string,
  name: string,
  mentorName: string
) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `${name}, seu mentor ${mentorName} esta te esperando`,
    html: `
      <h2>Ola ${name}!</h2>
      <p>Que bom ter voce na AI Mentor Academy.</p>
      <p>Seu mentor <strong>${mentorName}</strong> esta pronto para continuar te ensinando.</p>
      <p><a href="https://aimentoracademy.com">Voltar para a mentoria</a></p>
      <br/>
      <p>Silvia Assay<br/>AI Mentor Academy</p>
      <hr/>
      <p style="font-size: 12px; color: #666;">
        Voce recebeu este email porque se cadastrou na AI Mentor Academy.
        <a href="{{{unsubscribe}}}">Cancelar inscricao</a>
      </p>
    `,
  })
}
```

### Variaveis de Ambiente Necessarias

```
RESEND_API_KEY=re_xxxxxxxxx
```

### Copy do Modal (do docs/copy-ai-mentor-academy.md, secao 13.5)

```
Voce esta indo muito bem na conversa com [Nome do Mentor]!

Para continuar a sessao e desbloquear mais conteudo, preciso do seu email.
Isso tambem permite que voce retome a conversa de onde parou em qualquer momento.
```

### Decisoes de Simplificacao para MVP (Story 3.1)

- **Email de boas-vindas simples**: HTML inline basico, sem React Email template (templates completos vem na Story 3.4)
- **Sem lead scoring nesta story**: lead_score fica 0, calculo vem com admin dashboard
- **Sem conversation_summary**: resumo IA da conversa sera implementado separadamente
- **Sem Supabase tables criadas nesta story**: Assumimos que as tables leads, analytics_events ja existem (setup de schema e pre-requisito)
- **LGPD basico**: Checkbox + timestamp. Pagina de politica de privacidade nao faz parte desta story

## File List

**Novos arquivos:**
- `src/app/api/leads/route.ts` - API route para captura de lead
- `src/components/chat/email-gate-modal.tsx` - Modal de email gate
- `src/lib/email/resend-client.ts` - Client Resend para envio de emails

**Arquivos modificados:**
- `src/app/api/chat/route.ts` - Adicionar deteccao de email gate (SSE event)
- `src/stores/chat-store.ts` - Adicionar showEmailGate, leadCaptured, leadEmail, actions
- `src/components/chat/chat-interface.tsx` - Renderizar EmailGateModal
- `src/hooks/use-chat-stream.ts` - Tratar evento `email_gate` do SSE
- `package.json` - Adicionar `resend` como dependencia

## Dependencies

- **Story 1.4** (Concierge Chat) - COMPLETA - chat interface, store, API route /api/chat
- **Supabase schema**: Tabelas `leads`, `conversations`, `analytics_events` devem existir
- **Variavel de ambiente**: `RESEND_API_KEY` configurada em `.env.local`
- **Epic 2 (parcial)**: O mentor ativo precisa estar identificado no store para personalizar modal

## Definition of Done

- [ ] Modal de email gate aparece automaticamente apos 20a mensagem
- [ ] Modal exibe nome do mentor ativo na mensagem
- [ ] Email validado no frontend e backend
- [ ] LGPD checkbox obrigatorio para submit
- [ ] Lead salvo com sucesso no Supabase (verificar via Supabase dashboard)
- [ ] Email duplicado faz upsert ao inves de erro
- [ ] Conversa continua apos submit com +10 mensagens
- [ ] Email de boas-vindas enviado (verificar inbox ou logs Resend)
- [ ] Evento analytics registrado
- [ ] Modal responsivo em mobile e desktop
- [ ] Erros tratados com mensagem amigavel
- [ ] Build passa sem erros
- [ ] TypeScript sem erros
- [ ] ESLint sem violacoes

## Size Estimate

**M** (Medium) - 1 sessao focada de desenvolvimento (~3-4 horas)

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-12 | 1.0 | Story criada a partir do PRD, Arquitetura e Copy docs | Morgan (PM Agent) |

## QA Results

_A ser preenchido pelo QA agent_
