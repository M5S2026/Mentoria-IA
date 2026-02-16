# Story 3.3: Checkout & Payment Integration (Hotmart)

## Status

Ready

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build", "api-test"]

## Story

**As a** visitante decidido,
**I want** poder comprar o programa de forma simples e segura,
**so that** eu tenha acesso imediato ao conteudo.

## Acceptance Criteria

- [ ] 1. Botao "Garantir Minha Vaga Agora" na pagina /programa redireciona para checkout Hotmart com produto configurado
- [ ] 2. Opcoes de pagamento disponiveis no Hotmart: cartao (12x), PIX, boleto
- [ ] 3. Webhook `POST /api/webhooks/hotmart` recebe e processa eventos de compra
- [ ] 4. Validacao de seguranca: webhook valida token `hottok` contra variavel de ambiente `HOTMART_HOTTOK`
- [ ] 5. Evento `PURCHASE_APPROVED`/`PURCHASE_COMPLETE`: cria usuario Supabase Auth (se nao existe), atualiza profile para `role=student`, `access_type=premium`
- [ ] 6. Registro de pagamento na tabela `payments` com todos os dados da transacao
- [ ] 7. Lead atualizado para `status=converted` na tabela `leads` (se existir lead com mesmo email)
- [ ] 8. Email de boas-vindas enviado via Resend com instrucoes de acesso (login link + senha temporaria)
- [ ] 9. Evento `PURCHASE_REFUNDED`/`PURCHASE_CHARGEBACK`: revoga acesso (access_type=free, role=visitor), atualiza payment status
- [ ] 10. Pagina de obrigado `/obrigado` criada com instrucoes pos-compra e botao para area de membros
- [ ] 11. Evento analytics `purchase` registrado com metadata (valor, metodo de pagamento)
- [ ] 12. Webhook retorna 200 para todos os eventos (evitar retries do Hotmart mesmo em erros de processamento)
- [ ] 13. Logs de erro detalhados para debugging de webhooks em producao
- [ ] 14. Redirect para /obrigado configuravel via Hotmart (URL de obrigado do produto)

## Tasks / Subtasks

- [ ] Task 1: Criar API route POST /api/webhooks/hotmart (AC: 3, 4, 5, 6, 7, 9, 11, 12, 13)
  - [ ] 1.1 Criar `src/app/api/webhooks/hotmart/route.ts`
  - [ ] 1.2 Validar `hottok` do payload contra `process.env.HOTMART_HOTTOK`
  - [ ] 1.3 Implementar handler para `PURCHASE_APPROVED` / `PURCHASE_COMPLETE`:
    - Buscar usuario existente por email na tabela `profiles`
    - Se nao existe: criar usuario via `supabase.auth.admin.createUser()` com email + senha temporaria
    - Atualizar profile: `role = 'student'`, `access_type = 'premium'`, `hotmart_transaction_id`, `program_started_at`
    - Inserir registro na tabela `payments` com dados completos da transacao
    - Atualizar lead (se existir): `status = 'converted'`, `converted_at`
    - Inserir evento analytics: `event_type = 'purchase'`
  - [ ] 1.4 Implementar handler para `PURCHASE_REFUNDED` / `PURCHASE_CHARGEBACK`:
    - Buscar profile por email
    - Atualizar: `access_type = 'free'`, `role = 'visitor'`
    - Atualizar payment: `status = 'refunded'` ou `'chargeback'`
  - [ ] 1.5 Eventos nao mapeados: logar e retornar 200
  - [ ] 1.6 Try/catch global: logar erro, retornar 200 (Hotmart faz retry em 4xx/5xx)
  - [ ] 1.7 Usar Supabase admin client (service role) para todas operacoes

- [ ] Task 2: Criar webhook handler helper (AC: 5, 6)
  - [ ] 2.1 Criar `src/lib/integrations/hotmart/webhook-handler.ts`
  - [ ] 2.2 Tipagem TypeScript para payload Hotmart: `HotmartWebhookPayload`, `HotmartPurchaseData`, `HotmartBuyer`
  - [ ] 2.3 Funcao `validateHottok(payload: unknown): boolean`
  - [ ] 2.4 Funcao `handlePurchaseApproved(data: HotmartPurchaseData): Promise<void>`
  - [ ] 2.5 Funcao `handlePurchaseRefunded(data: HotmartPurchaseData): Promise<void>`
  - [ ] 2.6 Funcao `findOrCreateUser(email: string, name: string): Promise<string>` (retorna userId)

- [ ] Task 3: Enviar email de boas-vindas pos-compra (AC: 8)
  - [ ] 3.1 Criar `src/lib/email/templates/welcome-purchase.ts` - template de email pos-compra
  - [ ] 3.2 Conteudo: "Bem-vindo ao AI Mentor Academy!", instrucoes de acesso, link para login, senha temporaria (se nova conta)
  - [ ] 3.3 Adicionar funcao `sendPurchaseWelcomeEmail` em `src/lib/email/resend-client.ts`
  - [ ] 3.4 Incluir link de reset de senha para novos usuarios
  - [ ] 3.5 Envio assincrono (nao bloquear response do webhook)

- [ ] Task 4: Criar pagina /obrigado (AC: 10, 14)
  - [ ] 4.1 Criar `src/app/obrigado/page.tsx`
  - [ ] 4.2 Layout premium com mensagem de parabens
  - [ ] 4.3 Instrucoes claras: "Voce recebera um email com suas credenciais de acesso"
  - [ ] 4.4 Botao "Acessar Area de Membros" -> /members (ou /login se nao autenticado)
  - [ ] 4.5 Secao "Proximos passos": 1. Checar email, 2. Fazer login, 3. Comecar com primeiro modulo
  - [ ] 4.6 Design celebratorio mas elegante (confetti sutil ou icone de check)

- [ ] Task 5: Atualizar pagina /programa com link Hotmart real (AC: 1, 2)
  - [ ] 5.1 Configurar variavel de ambiente `NEXT_PUBLIC_HOTMART_CHECKOUT_URL`
  - [ ] 5.2 Atualizar todos os CTAs de compra na pagina /programa para usar URL real
  - [ ] 5.3 Adicionar `target="_blank"` e `rel="noopener"` nos links para Hotmart
  - [ ] 5.4 Texto de suporte: "Pagamento seguro via Hotmart. Parcele em ate 12x no cartao."

- [ ] Task 6: Configuracao de seguranca do webhook (AC: 4, 12)
  - [ ] 6.1 Adicionar rate limiting no endpoint de webhook (50 requests/sec para bursts do Hotmart)
  - [ ] 6.2 Validar Content-Type do request
  - [ ] 6.3 Logar payload completo para debug (em ambiente de desenvolvimento)
  - [ ] 6.4 Idempotencia: verificar se `hotmart_transaction_id` ja existe antes de criar payment duplicado

## Dev Notes

### Payload do Webhook Hotmart (da Arquitetura)

```typescript
// src/lib/integrations/hotmart/types.ts

interface HotmartWebhookPayload {
  event: string  // 'PURCHASE_APPROVED', 'PURCHASE_COMPLETE', 'PURCHASE_REFUNDED', etc.
  data: {
    purchase: {
      transaction: string         // Transaction ID
      status: string
      price: {
        value: number             // Ex: 4997.00
        currency_code: string     // 'BRL'
      }
      payment: {
        type: string              // 'CREDIT_CARD', 'PIX', 'BILLET'
        installments_number: number
      }
    }
    buyer: {
      email: string
      name: string
    }
    product: {
      id: number
      name: string
    }
  }
  hottok: string  // Token de validacao
}
```

### Webhook Handler Completo (da Arquitetura)

```typescript
// src/app/api/webhooks/hotmart/route.ts

import { createAdminClient } from '@/lib/supabase/admin'
import { sendPurchaseWelcomeEmail } from '@/lib/email/resend-client'

export async function POST(request: Request) {
  const body = await request.json()

  // 1. Validar hottok
  if (body.hottok !== process.env.HOTMART_HOTTOK) {
    return Response.json({ error: 'Invalid token' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { event, data } = body
  const buyerEmail = data.buyer.email
  const buyerName = data.buyer.name
  const transactionId = data.purchase.transaction

  try {
    switch (event) {
      case 'PURCHASE_APPROVED':
      case 'PURCHASE_COMPLETE': {
        // Idempotencia: verificar se transacao ja existe
        const { data: existingPayment } = await supabase
          .from('payments')
          .select('id')
          .eq('hotmart_transaction_id', transactionId)
          .single()

        if (existingPayment) {
          return Response.json({ received: true, note: 'already_processed' })
        }

        // Find or create user
        let userId: string
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', buyerEmail)
          .single()

        if (existingUser) {
          userId = existingUser.id
        } else {
          const tempPassword = crypto.randomUUID().slice(0, 12)
          const { data: newUser, error } = await supabase.auth.admin.createUser({
            email: buyerEmail,
            password: tempPassword,
            email_confirm: true,
            user_metadata: { full_name: buyerName },
          })
          if (error) throw error
          userId = newUser.user.id
        }

        // Update profile
        await supabase.from('profiles').update({
          role: 'student',
          access_type: 'premium',
          hotmart_transaction_id: transactionId,
          program_started_at: new Date().toISOString(),
        }).eq('id', userId)

        // Create payment record
        await supabase.from('payments').insert({
          user_id: userId,
          email: buyerEmail,
          hotmart_transaction_id: transactionId,
          hotmart_product_id: String(data.product.id),
          amount_cents: Math.round(data.purchase.price.value * 100),
          status: 'approved',
          payment_method: data.purchase.payment.type,
          installments: data.purchase.payment.installments_number,
          hotmart_payload: body,
        })

        // Update lead status
        await supabase.from('leads')
          .update({ status: 'converted', converted_at: new Date().toISOString() })
          .eq('email', buyerEmail)

        // Send welcome email (async)
        sendPurchaseWelcomeEmail(buyerEmail, buyerName)
          .catch((err) => console.error('Failed to send purchase welcome email:', err))

        // Analytics event
        await supabase.from('analytics_events').insert({
          event_type: 'purchase',
          user_id: userId,
          metadata: {
            amount: data.purchase.price.value,
            method: data.purchase.payment.type,
            installments: data.purchase.payment.installments_number,
            transaction_id: transactionId,
          },
        })

        break
      }

      case 'PURCHASE_REFUNDED':
      case 'PURCHASE_CHARGEBACK': {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', buyerEmail)
          .single()

        if (profile) {
          await supabase.from('profiles')
            .update({ access_type: 'free', role: 'visitor' })
            .eq('id', profile.id)
        }

        await supabase.from('payments')
          .update({
            status: event === 'PURCHASE_REFUNDED' ? 'refunded' : 'chargeback',
          })
          .eq('hotmart_transaction_id', transactionId)

        break
      }

      default:
        console.log(`Unhandled Hotmart event: ${event}`)
    }

    return Response.json({ received: true })
  } catch (error) {
    console.error('Hotmart webhook error:', error)
    // Retornar 200 para evitar retries do Hotmart
    return Response.json({ received: true, error: 'processing_error' })
  }
}
```

### Email de Boas-Vindas Pos-Compra

```typescript
// src/lib/email/templates/welcome-purchase.ts

export function welcomePurchaseEmailHtml(name: string, loginUrl: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #D4AF37;">Bem-vindo ao AI Mentor Academy!</h1>
      <p>Ola ${name},</p>
      <p>Sua inscricao no programa foi confirmada! Voce agora tem acesso completo a:</p>
      <ul>
        <li>7 Mentores IA ilimitados, 24/7</li>
        <li>12 modulos em video com Silvia Assay</li>
        <li>Calls semanais ao vivo</li>
        <li>Comunidade exclusiva</li>
        <li>Templates e frameworks completos</li>
      </ul>
      <h2>Proximos Passos:</h2>
      <ol>
        <li>Acesse a area de membros clicando no botao abaixo</li>
        <li>Faca login com seu email (${name})</li>
        <li>Se e sua primeira vez, use "Esqueci minha senha" para criar sua senha</li>
        <li>Comece pelo Modulo 1 com o mentor Nicolas</li>
      </ol>
      <p style="text-align: center; margin: 30px 0;">
        <a href="${loginUrl}" style="background: #D4AF37; color: #000; padding: 15px 30px;
           text-decoration: none; border-radius: 8px; font-weight: bold;">
          Acessar Area de Membros
        </a>
      </p>
      <p>Qualquer duvida, responda este email.</p>
      <p>Silvia Assay<br/>AI Mentor Academy</p>
    </div>
  `
}
```

### Pagina /obrigado

```typescript
// src/app/obrigado/page.tsx
// Pagina estatica (SSG), sem dados dinamicos
// Apenas mensagem de confirmacao + instrucoes
// Hotmart redireciona para essa URL apos pagamento aprovado
```

### Variaveis de Ambiente Necessarias

```
HOTMART_HOTTOK=token_de_validacao_do_webhook
NEXT_PUBLIC_HOTMART_CHECKOUT_URL=https://pay.hotmart.com/XXXXXXXX
RESEND_API_KEY=re_xxxxxxxxx  (ja configurada na Story 3.1)
SUPABASE_SERVICE_ROLE_KEY=xxx (ja configurada)
```

### Schema das Tabelas (ja definido na arquitetura)

A tabela `payments` e `profiles` ja foram definidas no schema completo. Verificar que existem antes de executar.

### Decisoes de Simplificacao para MVP (Story 3.3)

- **Sem checkout embarcado**: Usuario e redirecionado para pagina de checkout do Hotmart (padrao do mercado BR)
- **Sem retry automatico do webhook**: Se falhar, Hotmart faz retry automaticamente (ate 3x)
- **Senha temporaria via reset**: Novos usuarios recebem email com instrucao para "Esqueci minha senha" ao inves de senha temporaria no email (mais seguro)
- **Sem subscription management**: Nao trata cancelamento de assinatura (programa e pagamento unico)
- **Sem tracking de UTM/referral**: Nao passa parametros de tracking para Hotmart (pode ser adicionado depois)

### Configuracao no Hotmart (manual, fora do escopo do dev)

1. Criar produto no Hotmart com preco R$4.997 (12x R$497)
2. Configurar URL de webhook: `https://aimentoracademy.com/api/webhooks/hotmart`
3. Configurar URL de obrigado: `https://aimentoracademy.com/obrigado`
4. Gerar e anotar o `hottok` (token de validacao)
5. Habilitar eventos: PURCHASE_APPROVED, PURCHASE_COMPLETE, PURCHASE_REFUNDED, PURCHASE_CHARGEBACK

## File List

**Novos arquivos:**
- `src/app/api/webhooks/hotmart/route.ts` - Webhook handler do Hotmart
- `src/lib/integrations/hotmart/webhook-handler.ts` - Helper functions para processar webhook
- `src/lib/integrations/hotmart/types.ts` - Tipagens TypeScript do payload Hotmart
- `src/lib/email/templates/welcome-purchase.ts` - Template de email pos-compra
- `src/app/obrigado/page.tsx` - Pagina de obrigado pos-compra

**Arquivos modificados:**
- `src/lib/email/resend-client.ts` - Adicionar `sendPurchaseWelcomeEmail`
- `src/components/programa/programa-pricing.tsx` - Atualizar link de checkout para URL real
- `src/components/programa/programa-final-cta.tsx` - Atualizar link de checkout para URL real

## Dependencies

- **Story 3.1** (Email Gate) - `resend-client.ts` ja criado
- **Story 3.2** (Program Page) - Pagina /programa com botoes de checkout
- **Supabase schema**: Tabelas `profiles`, `payments`, `leads`, `analytics_events` devem existir
- **Variaveis de ambiente**: `HOTMART_HOTTOK`, `NEXT_PUBLIC_HOTMART_CHECKOUT_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- **Hotmart**: Produto criado e configurado no painel Hotmart (setup manual)

## Definition of Done

- [ ] Webhook /api/webhooks/hotmart recebe e processa eventos
- [ ] Token hottok validado corretamente (rejeitar invalidos com 401)
- [ ] PURCHASE_APPROVED cria usuario + profile + payment no Supabase
- [ ] Usuario existente nao e duplicado (idempotencia por email e transaction_id)
- [ ] Profile atualizado para role=student, access_type=premium
- [ ] Payment record criado com dados completos da transacao
- [ ] Lead atualizado para status=converted
- [ ] Email de boas-vindas enviado
- [ ] PURCHASE_REFUNDED revoga acesso corretamente
- [ ] Pagina /obrigado renderiza com instrucoes claras
- [ ] Analytics event registrado para compras
- [ ] Webhook sempre retorna 200 (mesmo em erros de processamento)
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
