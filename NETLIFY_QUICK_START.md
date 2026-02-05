# 🚀 Netlify Deploy - Quick Start (5 minutos)

Versão ultra-rápida para quem tem pressa.

---

## 🎯 5 Passos em 5 Minutos

### 1️⃣ Conta Netlify (2 min)
```
Visite: netlify.com
Clique: Sign Up
Escolha: GitHub / Email
Pronto!
```

### 2️⃣ Upload Site (1 min)
```
Vá para: app.netlify.com
Clique: Add new site
Arraste: sua pasta do site
Espere: conclusão
```

**Seu site está ONLINE em: `seu-site-aleatorio.netlify.app`**

### 3️⃣ Domínio (1 min)
```
Netlify → Site settings → Domain management
Clique: Add custom domain
Digite: silviaassay.com
Copie: nameservers (ns1.netlify.com, etc)
```

### 4️⃣ DNS (0.5 min)
```
Registrador (Namecheap/Hostinger/etc)
Vá para: Nameservers
Altere para: os 3 nameservers do Netlify
Salve!
```

### 5️⃣ Esperar (0.5 min)
```
⏳ Propagação DNS: 2-48 horas
⏰ Depois: seu domínio funciona!
✅ HTTPS automático
```

---

## ✅ Checklist Rápido

```
ANTES:
☐ Arquivos em pasta (index.html na raiz)
☐ Estrutura: css/, js/, images/
☐ Caminhos em HTML são relativos

DURANTE:
☐ Netlify conta criada
☐ Site enviado
☐ URL temporária funciona
☐ Domínio adicionado
☐ Nameservers alterados

DEPOIS:
☐ Domínio acessível
☐ HTTPS funciona (cadeado 🔒)
☐ Sem erros 404
☐ Tudo carregando
```

---

## 🔗 Links Essenciais

| O quê | Link |
|------|------|
| Netlify | [netlify.com](https://netlify.com) |
| Dashboard | [app.netlify.com](https://app.netlify.com) |
| Domínio | [namecheap.com](https://namecheap.com) |
| Verificar DNS | [mxtoolbox.com](https://mxtoolbox.com) |
| Teste de Perf | [pagespeed.web.dev](https://pagespeed.web.dev) |
| Suporte | [support.netlify.com](https://support.netlify.com) |

---

## 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Site não aparece em silviaassay.com | Aguarde 48h propagação DNS |
| 404 em CSS/JS | Use caminhos relativos: `css/style.css` não `/css/style.css` |
| HTTPS mostra erro | Espere 24h para certificado |
| Site lento | Comprima imagens com tinypng.com |

---

## 📊 Estrutura de Pasta

```
silviaassay/
├── index.html           ✅ Obrigatório
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── logo.png
│   └── profile.jpg
└── netlify.toml         (opcional)
```

---

## 🎨 netlify.toml (Copiar e Colar)

```toml
[build]
  command = "echo 'Ready'"
  publish = "."

[[redirects]]
  from = "https://www.silviaassay.com/*"
  to = "https://silviaassay.com/:splat"
  status = 301
  force = true

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

---

## 🔑 Informações para Salvar

```
Netlify Site Name:    _______________________
Netlify URL:          _______________________
Domínio:              silviaassay.com
Registrador:          _______________________
Email Registrador:    _______________________
Status:               ✅ Ativo
Data Configurado:     _______________________
```

---

## 🚀 Pronto!

**Seu site está no ar!**

Próximos passos opcionais:
- [ ] Adicionar Google Analytics
- [ ] SEO (meta tags)
- [ ] Email profissional
- [ ] Blog/CMS

---

*Versão rápida do guia completo*
*Para detalhes: veja GUIA_NETLIFY_DEPLOYMENT.md*
