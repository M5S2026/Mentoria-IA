# Story 3.4: Email Nurture Sequence (Resend)

## Status

Ready

## Executor Assignment

executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: ["typecheck", "lint", "build", "api-test"]

## Story

**As a** lead capturado,
**I want** receber emails de valor que me ajudem a decidir sobre o programa,
**so that** eu nao me sinta pressionado mas sim educado.

## Acceptance Criteria

- [ ] 1. Sequencia de 5 emails automaticos configurada com intervalos de 2 dias entre cada:
  - Email 1 (imediato): Boas-vindas + link para voltar ao mentor IA
  - Email 2 (dia 2): Case study de aluno + dica do mentor preferido
  - Email 3 (dia 4): "O que voce esta perdendo" + preview de modulo
  - Email 4 (dia 6): Social proof + depoimentos + oferta
  - Email 5 (dia 8): Ultimo lembrete + bonus exclusivo
- [ ] 2. Emails personalizados com nome do lead e nome do mentor preferido
- [ ] 3. Integracao com Resend para envio de todos os emails
- [ ] 4. Unsubscribe funcional via link no footer de cada email (LGPD compliant)
- [ ] 5. Tracking de abertura e cliques via Resend (nativo do servico)
- [ ] 6. Tabela `leads` atualizada apos cada envio: `email_sequence_step` incrementado, `last_email_sent_at` atualizado, `status` = 'nurturing'
- [ ] 7. API route `/api/cron/nurture` que processa a fila de emails pendentes
- [ ] 8. Leads que ja converteram (status=converted) sao excluidos da sequencia
- [ ] 9. Leads que cancelaram inscricao sao excluidos da sequencia
- [ ] 10. Templates de email em React Email (ou HTML) com design consistente com a marca
- [ ] 11. Cada email tem CTA claro apontando para /programa ou para o chat
- [ ] 12. Email 1 (boas-vindas) ja funciona como upgrade do email simples da Story 3.1

## Tasks / Subtasks

- [ ] Task 1: Criar templates de email (AC: 1, 2, 10, 11)
  - [ ] 1.1 Criar `src/lib/email/templates/nurture-1-welcome.ts` - Boas-vindas
    - Assunto: "{nome}, seu mentor {mentorName} esta te esperando"
    - Corpo: Agradecimento, link para voltar ao mentor, breve descricao do que esperar
    - CTA: "Voltar para minha mentoria com {mentorName}"
  - [ ] 1.2 Criar `src/lib/email/templates/nurture-2-casestudy.ts` - Case study
    - Assunto: "Como {profissao} usou IA para {resultado} (com ajuda do {mentorName})"
    - Corpo: Mini case study relevante ao nivel do lead + dica pratica do mentor preferido
    - CTA: "Continuar aprendendo com {mentorName}"
  - [ ] 1.3 Criar `src/lib/email/templates/nurture-3-missing.ts` - O que esta perdendo
    - Assunto: "{nome}, isso e o que voce perde sem os 7 mentores IA"
    - Corpo: 3 coisas que o programa oferece que o gratuito nao tem + preview de 1 modulo
    - CTA: "Ver programa completo"
  - [ ] 1.4 Criar `src/lib/email/templates/nurture-4-proof.ts` - Social proof
    - Assunto: "O que dizem os alunos do AI Mentor Academy"
    - Corpo: 2-3 depoimentos + destaque do preco (12x R$497) + garantia 7 dias
    - CTA: "Garantir minha vaga"
  - [ ] 1.5 Criar `src/lib/email/templates/nurture-5-final.ts` - Ultimo lembrete
    - Assunto: "{nome}, ultima chance: bonus exclusivo para voce"
    - Corpo: Resumo do que o programa oferece + bonus exclusivo (ex: call 1:1 com Silvia) + urgencia
    - CTA: "Garantir minha vaga com bonus"
  - [ ] 1.6 Todos os templates incluem: header com logo, footer com unsubscribe link, design dark/premium

- [ ] Task 2: Criar funcao de unsubscribe (AC: 4, 9)
  - [ ] 2.1 Criar `src/app/api/email/unsubscribe/route.ts`
  - [ ] 2.2 Receber token de unsubscribe (lead_id codificado ou email hash)
  - [ ] 2.3 Atualizar lead: `status = 'lost'`, `email_sequence_step = 99` (flag para nao enviar mais)
  - [ ] 2.4 Criar pagina `/unsubscribe` com confirmacao: "Voce foi removido da lista. Nao recebera mais emails."
  - [ ] 2.5 Gerar token de unsubscribe seguro (base64 do lead_id + secret)

- [ ] Task 3: Criar API route /api/cron/nurture (AC: 6, 7, 8)
  - [ ] 3.1 Criar `src/app/api/cron/nurture/route.ts`
  - [ ] 3.2 Proteger rota com header secret: `Authorization: Bearer {CRON_SECRET}`
  - [ ] 3.3 Query leads elegíveis:
    - `status` IN ('new', 'nurturing') -- excluir converted e lost
    - `email_sequence_step` < 5 -- ainda nao completou sequencia
    - `last_email_sent_at` IS NULL OU `last_email_sent_at` < (agora - 2 dias) -- intervalo respeitado
  - [ ] 3.4 Para cada lead elegivel:
    - Determinar proximo step (email_sequence_step + 1)
    - Buscar template correto para o step
    - Enviar email via Resend com dados personalizados (nome, mentorName)
    - Atualizar lead: `email_sequence_step`, `last_email_sent_at`, `status = 'nurturing'`
  - [ ] 3.5 Limitar processamento a 50 leads por execucao (batch)
  - [ ] 3.6 Logar resultado: total processados, sucessos, falhas

- [ ] Task 4: Atualizar resend-client com funcoes de nurture (AC: 3)
  - [ ] 4.1 Atualizar `src/lib/email/resend-client.ts`:
    - Adicionar funcao `sendNurtureEmail(step: number, lead: LeadData): Promise<void>`
    - Funcao `getNurtureTemplate(step: number, lead: LeadData)` que retorna subject + html
    - Funcao `generateUnsubscribeUrl(leadId: string): string`
  - [ ] 4.2 Cada email inclui unsubscribe URL no footer
  - [ ] 4.3 Cada email inclui header `List-Unsubscribe` para compliance

- [ ] Task 5: Upgrade do email de boas-vindas da Story 3.1 (AC: 12)
  - [ ] 5.1 Substituir o email simples (HTML inline) da Story 3.1 pelo template `nurture-1-welcome`
  - [ ] 5.2 Ao capturar lead em `/api/leads`, setar `email_sequence_step = 1` e `last_email_sent_at = now()`
  - [ ] 5.3 Isso garante que o cron nao envia Email 1 duplicado (ja comeca do step 2)

- [ ] Task 6: Configurar Vercel Cron (AC: 7)
  - [ ] 6.1 Criar `vercel.json` (ou atualizar) com cron job:
    ```json
    {
      "crons": [
        {
          "path": "/api/cron/nurture",
          "schedule": "0 10 * * *"
        }
      ]
    }
    ```
  - [ ] 6.2 Cron executa diariamente as 10h (horario de Brasilia = 13h UTC)
  - [ ] 6.3 Variavel de ambiente `CRON_SECRET` para proteger endpoint

## Dev Notes

### Logica de Sequencia de Emails

```
Lead capturado (Story 3.1)
  |
  +--> Email 1 enviado IMEDIATAMENTE pela API /api/leads
  |    (email_sequence_step = 1, last_email_sent_at = now)
  |
  +--> [2 dias depois] Cron detecta: step=1, last_sent > 2 dias
  |    Envia Email 2, atualiza step=2
  |
  +--> [2 dias depois] Cron detecta: step=2, last_sent > 2 dias
  |    Envia Email 3, atualiza step=3
  |
  +--> [2 dias depois] Cron detecta: step=3, last_sent > 2 dias
  |    Envia Email 4, atualiza step=4
  |
  +--> [2 dias depois] Cron detecta: step=4, last_sent > 2 dias
       Envia Email 5, atualiza step=5
       (Sequencia completa, nao envia mais)
```

### Processamento do Cron (da Arquitetura)

```typescript
// src/app/api/cron/nurture/route.ts

import { createAdminClient } from '@/lib/supabase/admin'
import { sendNurtureEmail } from '@/lib/email/resend-client'

export async function GET(request: Request) {
  // Validar cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()

  // Buscar leads elegíveis
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .in('status', ['new', 'nurturing'])
    .lt('email_sequence_step', 5)
    .or(`last_email_sent_at.is.null,last_email_sent_at.lt.${twoDaysAgo}`)
    .limit(50)

  let processed = 0
  let errors = 0

  for (const lead of leads || []) {
    try {
      const nextStep = lead.email_sequence_step + 1
      await sendNurtureEmail(nextStep, lead)

      await supabase
        .from('leads')
        .update({
          email_sequence_step: nextStep,
          last_email_sent_at: new Date().toISOString(),
          status: 'nurturing',
        })
        .eq('id', lead.id)

      processed++
    } catch (err) {
      console.error(`Failed to send nurture email to ${lead.email}:`, err)
      errors++
    }
  }

  return Response.json({
    processed,
    errors,
    total: leads?.length || 0,
    timestamp: new Date().toISOString(),
  })
}
```

### Template de Email - Estrutura Base

```typescript
// src/lib/email/templates/base-layout.ts

export function emailBaseLayout(content: string, unsubscribeUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; background-color:#0a0a0a; font-family:Arial,sans-serif;">
      <div style="max-width:600px; margin:0 auto; padding:40px 20px;">
        <!-- Header -->
        <div style="text-align:center; margin-bottom:30px;">
          <h1 style="color:#D4AF37; font-size:20px; margin:0;">AI Mentor Academy</h1>
          <p style="color:#888; font-size:12px; margin:5px 0 0;">by Silvia Assay</p>
        </div>

        <!-- Content -->
        <div style="background:#1a1a1a; border-radius:12px; padding:30px; color:#e5e5e5;">
          ${content}
        </div>

        <!-- Footer -->
        <div style="text-align:center; margin-top:30px; color:#666; font-size:12px;">
          <p>AI Mentor Academy | Silvia Assay</p>
          <p>
            <a href="${unsubscribeUrl}" style="color:#888; text-decoration:underline;">
              Cancelar inscricao
            </a>
          </p>
          <p>Voce recebeu este email porque se cadastrou na AI Mentor Academy.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
```

### Conteudo dos 5 Emails

**Email 1 - Boas-vindas (imediato)**
```
Assunto: "{nome}, seu mentor {mentorName} esta te esperando"

Ola {nome}!

Que bom ter voce na AI Mentor Academy.

Seu mentor {mentorName} esta pronto para continuar te ensinando. Voce ainda tem
mensagens disponiveis para aproveitar.

Lembre-se: {mentorName} e especialista em {specialty} e pode te ajudar a
{objetivo baseado no nivel}.

[CTA: Voltar para minha mentoria com {mentorName}]

Nos proximos dias, vou enviar conteudo exclusivo sobre como usar IA no seu negocio.

Silvia Assay
AI Mentor Academy
```

**Email 2 - Case Study (dia 2)**
```
Assunto: "Como uma {profissao} usou IA para {resultado}"

Ola {nome},

Quero compartilhar a historia de uma aluna que estava exatamente onde voce esta.

[Mini case study contextualizado ao nivel do lead - ex: para iniciante, case
da Juliana (psicologa); para intermediario, case do Thiago (infoprodutor)]

O que ela fez de diferente? Teve um mentor guiando cada passo.

Uma dica rapida do {mentorName} para voce aplicar hoje:
[Dica pratica baseada no mentor preferido]

[CTA: Continuar aprendendo com {mentorName}]
```

**Email 3 - O que esta perdendo (dia 4)**
```
Assunto: "{nome}, isso e o que voce perde sem os 7 mentores IA"

Ola {nome},

Desde que voce experimentou o {mentorName}, outras pessoas estao:

1. Usando o Hormozi para criar ofertas irresistiveis
2. Pedindo ao Russell para revisar o copy dos seus funis
3. Aprendendo first principles com o Elon para inovar no mercado

No programa completo, voce tem acesso a TODOS os 7 mentores, 24/7, sem limite.

Alem disso, no Modulo {modulo relevante ao nivel}, voce aprende:
[Preview de conteudo do modulo mais relevante para o lead]

[CTA: Ver programa completo]
```

**Email 4 - Social Proof (dia 6)**
```
Assunto: "O que dizem os alunos do AI Mentor Academy"

Ola {nome},

Nao sou eu quem vai te convencer. Sao eles:

[2-3 depoimentos do docs/copy secao 10, selecionados por relevancia ao nivel]

O programa custa 12x de R$ 497 e tem garantia de 7 dias.

Se em 7 dias voce sentir que nao e para voce, devolvemos 100%.

[CTA: Garantir minha vaga]
```

**Email 5 - Ultimo lembrete (dia 8)**
```
Assunto: "{nome}, ultima chance: bonus exclusivo para voce"

Ola {nome},

Este e meu ultimo email sobre o programa (prometo!).

Nos ultimos dias compartilhei:
- Como {mentorName} pode transformar seu negocio
- Cases reais de alunos
- O que o programa completo oferece
- Depoimentos de quem ja passou

Hoje quero te fazer uma oferta especial:

Se voce se inscrever nas proximas 48 horas, ganha:
[Bonus: ex. template exclusivo do mentor preferido / 1 call extra com Silvia]

O investimento: 12x de R$ 497
Garantia: 7 dias incondicional

[CTA: Garantir minha vaga com bonus]

Se nao for o momento, tudo bem. O {mentorName} continua disponivel
na versao gratuita quando voce quiser voltar.

Silvia Assay
AI Mentor Academy
```

### Token de Unsubscribe

```typescript
// src/lib/email/unsubscribe.ts

import { createHmac } from 'crypto'

const SECRET = process.env.UNSUBSCRIBE_SECRET || 'default-secret'

export function generateUnsubscribeToken(leadId: string): string {
  const hmac = createHmac('sha256', SECRET)
  hmac.update(leadId)
  return Buffer.from(`${leadId}:${hmac.digest('hex')}`).toString('base64url')
}

export function verifyUnsubscribeToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString()
    const [leadId, hash] = decoded.split(':')
    const hmac = createHmac('sha256', SECRET)
    hmac.update(leadId)
    if (hmac.digest('hex') === hash) return leadId
    return null
  } catch {
    return null
  }
}

export function getUnsubscribeUrl(leadId: string): string {
  const token = generateUnsubscribeToken(leadId)
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/email/unsubscribe?token=${token}`
}
```

### Variaveis de Ambiente Necessarias

```
RESEND_API_KEY=re_xxxxxxxxx           # Ja configurada na Story 3.1
CRON_SECRET=secret_para_proteger_cron  # Novo
UNSUBSCRIBE_SECRET=secret_para_tokens  # Novo
NEXT_PUBLIC_APP_URL=https://aimentoracademy.com  # Ja configurada
```

### Vercel Cron Configuration

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/nurture",
      "schedule": "0 13 * * *"
    }
  ]
}
```

Nota: `0 13 * * *` = 13h UTC = 10h BRT (horario de Brasilia). Enviar emails de manha tem melhor taxa de abertura.

### Decisoes de Simplificacao para MVP (Story 3.4)

- **HTML inline ao inves de React Email**: Mais simples para MVP. React Email pode ser adotado depois para templates mais sofisticados
- **Sem A/B testing de subject lines**: Uma versao de cada email por enquanto
- **Sem segmentacao avancada**: Todos leads recebem a mesma sequencia (personalizacao apenas por nome e mentor)
- **Sem webhook de tracking do Resend**: Usar dashboard do Resend para ver opens/clicks
- **Bonus do Email 5 e placeholder**: O bonus especifico sera definido pela Silvia
- **Case studies ficticios**: Baseados nos depoimentos do docs/copy, substituir por reais depois
- **Sem re-engagement para leads inativos**: Apenas 5 emails, sem follow-up apos sequencia completa

### Limites do Free Tier Resend

Resend free tier: 3.000 emails/mes. Para 100 leads/mes x 5 emails = 500 emails/mes. Cabe no free tier inicialmente.

## File List

**Novos arquivos:**
- `src/lib/email/templates/base-layout.ts` - Layout base HTML para todos os emails
- `src/lib/email/templates/nurture-1-welcome.ts` - Email 1: Boas-vindas
- `src/lib/email/templates/nurture-2-casestudy.ts` - Email 2: Case study
- `src/lib/email/templates/nurture-3-missing.ts` - Email 3: O que esta perdendo
- `src/lib/email/templates/nurture-4-proof.ts` - Email 4: Social proof
- `src/lib/email/templates/nurture-5-final.ts` - Email 5: Ultimo lembrete
- `src/lib/email/unsubscribe.ts` - Funcoes de geracao/validacao de token unsubscribe
- `src/app/api/cron/nurture/route.ts` - Cron job para processar fila de emails
- `src/app/api/email/unsubscribe/route.ts` - API de unsubscribe
- `src/app/unsubscribe/page.tsx` - Pagina de confirmacao de unsubscribe
- `vercel.json` - Configuracao de cron jobs (novo ou atualizado)

**Arquivos modificados:**
- `src/lib/email/resend-client.ts` - Adicionar `sendNurtureEmail`, `getNurtureTemplate`
- `src/app/api/leads/route.ts` - Atualizar para enviar Email 1 do nurture (ao inves de email simples) e setar email_sequence_step=1

## Dependencies

- **Story 3.1** (Email Gate) - COMPLETA - API /api/leads, resend-client.ts, tabela leads
- **Story 3.2** (Program Page) - COMPLETA - pagina /programa para links nos CTAs dos emails
- **Supabase schema**: Tabela `leads` com campos `email_sequence_step`, `last_email_sent_at`
- **Variaveis de ambiente**: `RESEND_API_KEY`, `CRON_SECRET`, `UNSUBSCRIBE_SECRET`, `NEXT_PUBLIC_APP_URL`
- **Vercel Pro ou Hobby**: Cron jobs disponiveis nos planos Hobby (1/day) e Pro (mais frequentes)

## Definition of Done

- [ ] 5 templates de email criados com conteudo real (nao lorem ipsum)
- [ ] Email 1 enviado imediatamente ao capturar lead
- [ ] Cron job processa leads pendentes e envia email correto (step 2-5)
- [ ] Intervalo de 2 dias entre emails respeitado
- [ ] Emails personalizados com nome e mentor do lead
- [ ] Unsubscribe funcional: link no email -> API -> lead excluido da sequencia
- [ ] Leads convertidos nao recebem mais emails de nurture
- [ ] Leads com unsubscribe nao recebem mais emails
- [ ] Cada email tem CTA claro (link para /programa ou para o chat)
- [ ] Design consistente com a marca (dark/premium)
- [ ] Headers List-Unsubscribe presentes nos emails
- [ ] Cron protegido com secret
- [ ] vercel.json configurado com schedule
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
