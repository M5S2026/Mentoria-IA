# 📋 Verificação: Netlify + Páginas de Vendas + Hotmart

**Data:** 2026-02-27
**Status:** Auditoria Completa
**Projeto:** silviaassay.com

---

## 🌐 1. ESTRUTURA NETLIFY

### ✅ O Que Está Configurado

**netlify.toml:**
```
Build command: mkdir -p dist && rsync (copia arquivos)
Publish directory: dist/
Functions: netlify/functions/
Redirects: /member/* protegido com Role = "paid-user"
```

**Funções Netlify:**
- ✅ `create-checkout-session.js` (Stripe)
- ✅ `handle-stripe-webhook.js` (Stripe)
- ⚠️ `identity-signup.js` (Auth básico)

### ⚠️ Problemas Identificados

| Problema | Severidade | Status |
|----------|-----------|--------|
| Stripe config mas sem chaves preenchidas | 🔴 CRÍTICO | Pages usam Hotmart, não Stripe |
| Sem webhook Hotmart em Netlify | 🔴 CRÍTICO | Precisa implementar |
| Member area só protegida por role | 🟡 MÉDIO | Sem verificação de pagamento real |
| Build copying arquivos manualmente | 🟡 MÉDIO | Deveria usar Next.js ou build tool |

---

## 📄 2. PÁGINAS DE VENDAS (STATUS)

### ✅ PÁGINA: Produtos (`/pages/produtos.html`)

**Produtos listados:**
1. **ChatGPT Mastery**
   - Link: `https://hotmart.com/product/chatgpt-mastery-silvia-assay`
   - Status: ✅ Ativo
   - Botão: "Comprar Agora"

2. **IA para Negócios**
   - Link: `https://hotmart.com/product/ia-para-negocios-silvia-assay`
   - Status: ✅ Ativo
   - Botão: "Começar Agora"

3. **IA para Criadores**
   - Link: `https://hotmart.com/product/ia-para-criadores-silvia-assay`
   - Status: ✅ Ativo
   - Botão: "Explorar Curso"

4. **Bundle IA**
   - Link: `https://hotmart.com/product/bundle-ia-silvia-assay`
   - Status: ✅ Ativo
   - Botão: "Comprar Bundle"

**Verificação necessária:**
- [ ] Links abrem corretamente?
- [ ] Hotmart mostra os produtos com descrição?
- [ ] Preços estão corretos?
- [ ] Checkout funciona?

### ✅ PÁGINA: Mentoria (`/pages/mentoria.html`)

**Produto:**
- **Mentoria IA**
  - Link: `https://hotmart.com/product/mentoria-ia-silvia-assay`
  - Preço: R$ 1.997
  - Status: ✅ Ativo
  - Botão: "Garantir Vaga"

**Verificação necessária:**
- [ ] Link abre corretamente?
- [ ] Preço atualizado em Hotmart?
- [ ] Descrição e termos visíveis?

### ⚠️ PÁGINA: Curso Claude Code (`/pages/curso-claude-code.html`)

**Problema:**
```html
<div data-stripe-key="YOUR_STRIPE_PUBLISHABLE_KEY">
  <button id="stripe-btn" class="btn btn-primary btn-lg">
    Pagar com Cartão (Stripe)
  </button>
</div>
```

**Issues:**
- ❌ Stripe key placeholder não preenchida
- ❌ Usando Stripe enquanto outros usam Hotmart (INCONSISTENTE)
- ❌ Sem webhook Netlify para Stripe
- ❌ Member area não sabe como liberar acesso

**Solução recomendada:**
```html
<!-- SUBSTITUIR POR: -->
<a href="https://hotmart.com/product/claude-code-na-pratica-silvia-assay"
   target="_blank" rel="noopener noreferrer"
   class="btn btn-primary btn-lg">
  Comprar Claude Code na Prática
</a>
```

---

## 🔐 3. HOTMART DASHBOARD - O QUE PRECISA VERIFICAR

### ✅ Produtos que Devem Estar Criados

- [ ] `chatgpt-mastery-silvia-assay`
- [ ] `ia-para-negocios-silvia-assay`
- [ ] `ia-para-criadores-silvia-assay`
- [ ] `bundle-ia-silvia-assay`
- [ ] `mentoria-ia-silvia-assay`
- [ ] `claude-code-na-pratica-silvia-assay` (CRIAR - novo!)

### ⚠️ Webhooks (CRÍTICO)

**Localização:** Hotmart → Integrações → Webhooks

**Verificar:**
- [ ] Webhook criado para silviaassay.com?
- [ ] URL: `https://silviaassay.com/api/webhooks/hotmart` (SE tiver API)
- [ ] OU: Webhook apontando para algum lugar?
- [ ] Token (HOTTOK) gerado e salvo?

**Eventos que devem estar ativados:**
- [ ] PURCHASE_COMPLETE
- [ ] PURCHASE_APPROVED
- [ ] PURCHASE_CANCELED
- [ ] PURCHASE_REFUNDED

---

## 🔗 4. INTEGRAÇÃO HOTMART → MEMBER AREA

### ⚠️ PROBLEMA IDENTIFICADO

**Fluxo Esperado:**
```
1. Cliente compra no Hotmart
2. Hotmart envia webhook ao seu site
3. Site registra como "paid-user" no Netlify Identity
4. Cliente consegue acessar /member/*
```

**Status Atual:**
```
❌ Não há endpoint de webhook Hotmart
❌ Não há lógica de "paid-user" role assignment
❌ Member area usa role "paid-user" mas ninguém nunca é assignado!
```

### Soluções Possíveis

**Opção A: Usar Netlify Functions + Supabase** ✅ Recomendado
- Criar função `/netlify/functions/webhooks/hotmart.js`
- Integrar com Supabase (usuarios pagos)
- Webhook atualiza tabela members
- Netlify Identity sincroniza acesso

**Opção B: Usar Hotmart Member Area**
- Configurar member area diretamente no Hotmart
- Redirecionar do Hotmart após compra
- Evita complexity, mas menos controle

**Opção C: Simple Email + Manual Access**
- Enviar email após compra
- Login manual com senha
- Simples mas não automático

---

## 📊 5. STATUS ATUAL (SUMMARY)

| Componente | Status | Ação Necessária |
|-----------|--------|-----------------|
| **Pages HTML** | ✅ 50% OK | Verificar links Hotmart |
| **Netlify Build** | ✅ OK | Nada |
| **Hotmart Links** | ⚠️ Parcial | Corrigir Claude Code |
| **Webhooks** | ❌ MISSING | CRÍTICO - Implementar |
| **Member Area** | ❌ BROKEN | Sem acesso automático |
| **Stripe Setup** | ❌ ABANDONADO | Remover ou usar |

**Bloqueadores Críticos:**
1. ❌ Sem webhook Hotmart → sem acesso automático
2. ❌ Página Claude Code usa Stripe → inconsistente
3. ❌ Member area não funciona para novos clientes

---

## 🎯 CHECKLIST DE AÇÕES

### Imediato (Hoje)

- [ ] **Verificar Hotmart Dashboard**
  - [ ] Acessar: https://go.hotmart.com
  - [ ] Confirmar 5 produtos existem
  - [ ] Verificar preços estão corretos
  - [ ] Checar se webhooks existem

- [ ] **Testar Links**
  ```bash
  # Test all links
  curl -I https://hotmart.com/product/chatgpt-mastery-silvia-assay
  curl -I https://hotmart.com/product/ia-para-negocios-silvia-assay
  curl -I https://hotmart.com/product/ia-para-criadores-silvia-assay
  curl -I https://hotmart.com/product/bundle-ia-silvia-assay
  curl -I https://hotmart.com/product/mentoria-ia-silvia-assay
  ```

### Curto Prazo (Esta semana)

- [ ] **Corrigir página Claude Code**
  - Remover referência Stripe
  - Adicionar link Hotmart
  - Testar que abre corretamente

- [ ] **Implementar Webhook Hotmart**
  - Criar function: `netlify/functions/webhooks/hotmart.js`
  - Testar com payload fake
  - Ativar em Hotmart dashboard

- [ ] **Integrar Member Area**
  - Opção: Usar Supabase para members
  - OU: Usar Hotmart Member Area nativa
  - Testar com compra real

### Médio Prazo (Próximas 2 semanas)

- [ ] **Monitorar Conversões**
  - Setup Analytics (Google/Hotmart)
  - Rastrear compras por página
  - Otimizar copy/CTAs baseado em dados

- [ ] **Automação Email**
  - Welcome email após compra
  - Link direto para member area
  - Resend API ou Mailgun

---

## 📞 PRÓXIMOS PASSOS

### 1. Confirmar com Você

Responda:
1. **Hotmart está funcional?** (Consegue fazer compra de teste?)
2. **Qual fluxo prefere para member area?**
   - A: Hotmart native member area
   - B: Custom Netlify + Supabase
   - C: Manual email + login
3. **O Stripe vai ser usado?** (Ou pode remover?)

### 2. Eu Faço

Após confirmação, vou:
1. ✅ Corrigir página Claude Code
2. ✅ Implementar webhook Hotmart
3. ✅ Testar fluxo completo (compra → acesso)
4. ✅ Documentar para futuro

### 3. Você Valida

- Fazer compra de teste
- Verificar se acesso foi liberado
- Testar login na member area
- Confirmar email recebido

---

## 📈 Métricas & Monitoring

**O que monitorar após setup:**
```bash
# Netlify logs
netlify logs --function webhooks/hotmart --tail

# Conversões
Google Analytics → Ecommerce → Purchase tracking

# Hotmart
Dashboard → Vendas → Últimas compras
```

---

## 🚀 Timeline Sugerida

```
Hoje (27/02):    Auditoria ✅ (você está aqui)
Amanhã (28/02):  Corrigir página + webhook
Próximos 3 dias: Testar com compra real + iterar
```

---

**Próximo passo:** Responda as 3 perguntas do item "1. Confirmar com Você"

Pronto para implementar! 🚀
