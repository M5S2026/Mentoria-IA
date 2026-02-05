# 🔧 Guia de Troubleshooting - Netlify Deployment

Soluções detalhadas para problemas comuns durante o deployment no Netlify.

---

## 🚨 PROBLEMAS FREQUENTES E SOLUÇÕES

### 1. Site não carrega em https://silviaassay.com

#### Sintoma
```
❌ Erro: "This site can't be reached"
❌ ERR_NAME_NOT_RESOLVED
```

#### Causas Possíveis
1. DNS ainda em propagação
2. Nameservers não atualizados corretamente
3. Domínio não conectado no Netlify
4. Erro de digitação no domínio

#### Solução Passo a Passo

**Passo 1: Verificar Status no Netlify**
```
1. Acesse: https://app.netlify.com
2. Clique no seu site
3. Vá em: Site settings → Domain management
4. Procure por "silviaassay.com"
5. Status deve ser: ✅ Active (verde)
```

**Se status for ⏳ Pending:**
```
Espere propagação DNS:
- Mínimo: 2-4 horas
- Normal: 12-24 horas
- Máximo: 48 horas

Enquanto isso:
- Use URL temporária: https://seu-site-aleatorio.netlify.app
- Verifique nameservers: https://mxtoolbox.com
- Digite seu domínio
- Deve mostrar nameservers do Netlify
```

**Passo 2: Verificar Nameservers no Registrador**

No Namecheap:
```
1. Acesse: namecheap.com
2. Vá para: Dashboard → Domain List
3. Clique em: silviaassay.com
4. Vá para: Nameservers
5. Certifique-se de que está usando:
   - ns1.netlify.com
   - ns2.netlify.com
   - ns3.netlify.com
6. Se estiver diferente, atualize
7. Salve as alterações
```

No Hostinger:
```
1. Acesse: hostinger.com.br
2. Painel de Controle
3. Meus Domínios
4. Clique em silviaassay.com
5. Editar Nameservers
6. Altere para Netlify
7. Salve
```

No GoDaddy:
```
1. Acesse: godaddy.com
2. Meus Produtos
3. Domínios
4. Clique em silviaassay.com
5. Gerenciar DNS
6. Altere nameservers
7. Salve
```

**Passo 3: Limpar Cache de DNS**

Se já alterou tudo mas ainda não funciona:

**Windows:**
```bash
ipconfig /flushdns
```

**Mac:**
```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

**Linux:**
```bash
sudo resolvectl flush-caches
# ou
sudo systemctl restart systemd-resolved
```

**Passo 4: Verificar em modo Incógnito**

```
1. Abra nova janela privada (Ctrl+Shift+N no Chrome)
2. Digite: https://silviaassay.com
3. Se funcionar em incógnito, é cache do navegador
4. Limpe cache do navegador:
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Safari: Develop → Empty Web Storage
```

**Passo 5: Testar DNS Online**

Visite: https://mxtoolbox.com/
```
1. Digite: silviaassay.com
2. Clique em "MX Lookup"
3. Deve mostrar nameservers do Netlify
4. Status verde = OK
```

---

### 2. Erro 404 - Página não encontrada

#### Sintoma
```
❌ 404 Not Found
❌ This page could not be found
```

#### Causas Possíveis
1. Arquivo não foi enviado
2. Caminho relativo está errado
3. Maiúsculas/minúsculas diferentes
4. Extensão de arquivo incorreta

#### Solução

**Passo 1: Abrir DevTools (F12)**
```
1. Pressione F12
2. Vá para aba "Network"
3. Recarregue a página
4. Procure por requisições em vermelho
5. Veja qual arquivo não carregou
6. Copie a URL exata
```

**Passo 2: Verificar estrutura de pastas**

Compare com Netlify:
```
Esperado no servidor:
/Users/silviaassay/css/style.css
Arquivo não encontrado em:
https://silviaassay.com/css/style.css

Solução: Verificar se arquivo existe localmente
```

**Passo 3: Corrigir Caminhos em HTML**

```html
<!-- ❌ ERRADO - Começar com / -->
<link rel="stylesheet" href="/css/style.css">
<script src="/js/script.js"></script>

<!-- ✅ CORRETO - Relativo -->
<link rel="stylesheet" href="css/style.css">
<script src="js/script.js"></script>

<!-- ✅ TAMBÉM OK - Com ./ explícito -->
<link rel="stylesheet" href="./css/style.css">
<script src="./js/script.js"></script>
```

**Passo 4: Verificar maiúsculas/minúsculas**

```
❌ ERRADO:
<link rel="stylesheet" href="CSS/style.css">
(arquivo está em "css", não "CSS")

✅ CORRETO:
<link rel="stylesheet" href="css/style.css">
```

**Passo 5: Re-fazer upload**

```
Opção A: Drag & Drop
1. Vá para Netlify
2. Acesse seu site
3. Procure por "Deploys"
4. Clique em "Deploy manually"
5. Arraste pasta atualizada

Opção B: GitHub Push
1. Corrija os arquivos localmente
2. Execute:
   git add .
   git commit -m "fix: correct file paths"
   git push
3. Netlify refaz deploy automaticamente
```

---

### 3. CSS não carrega (sem estilos)

#### Sintoma
```
❌ Página toda sem estilos
❌ Apenas texto preto no branco
❌ No console: "Failed to load resource: the server responded with a status of 404"
```

#### Solução

**Verificar no DevTools:**
```
1. Pressione F12
2. Console tab
3. Procure por erro de CSS
4. Exemplo:
   ❌ GET https://silviaassay.com/css/style.css 404
```

**Corrigir HTML:**
```html
<!-- Se viu erro acima, seu HTML provavelmente tem: -->
<link rel="stylesheet" href="/css/style.css">

<!-- Altere para: -->
<link rel="stylesheet" href="css/style.css">
```

**Arquivo netlify.toml (opcional):**
```toml
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

---

### 4. JavaScript não funciona

#### Sintoma
```
❌ Interatividade não funciona
❌ Cliques em botões não respondem
❌ Console mostra erros JavaScript
```

#### Solução

**Passo 1: Abrir Console (F12)**
```
1. Pressione F12
2. Vá para "Console"
3. Procure por mensagens vermelhas
4. Copie a mensagem de erro
5. Procure solução específica
```

**Passo 2: Verificar carregamento do script**
```html
<!-- ❌ ERRADO -->
<script src="/js/script.js"></script>

<!-- ✅ CORRETO -->
<script src="js/script.js"></script>

<!-- Alternativa: no final do body -->
</body>
<script src="js/script.js"></script>
```

**Passo 3: Verificar sintaxe JavaScript**

Use: https://jshint.com/
```
1. Copie conteúdo de script.js
2. Cole no site
3. Procure por erros de sintaxe
4. Corrija localmente
5. Re-faça upload
```

---

### 5. HTTPS mostra "Not Secure"

#### Sintoma
```
⚠️ Seu navegador mostra:
"Connection is not secure"
ou
"Not secure" antes da URL
```

#### Causas
1. Certificado ainda não ativado (< 24h)
2. Conteúdo misto (HTTP + HTTPS)
3. Certificado inválido

#### Solução

**Passo 1: Aguardar (24 horas)**
```
Netlify ativa certificado em até 24 horas
Se acabou de configurar, espere.

Verificar status:
1. Vá para Site settings
2. Domain management
3. Procure por "HTTPS"
4. Status: 🟡 Provisioning (em andamento)
           ✅ Active (pronto)
```

**Passo 2: Verificar Conteúdo Misto**
```
Se vir aviso sobre "mixed content":

1. Abra DevTools (F12)
2. Console
3. Procure por avisos
4. Exemplo:
   ⚠️ Mixed Content: insecure resource loaded
   https://silviaassay.com/ loaded an insecure resource

5. Procure no HTML:
   <img src="http://..." />
   (note o "http" sem "s")

6. Altere para:
   <img src="https://..." />
   OU use caminho relativo:
   <img src="images/foto.jpg" />
```

**Passo 3: Forçar HTTPS com netlify.toml**
```toml
[[redirects]]
  from = "http://*"
  to = "https://:splat"
  status = 301
  force = true
```

**Passo 4: Verificar Certificado**
```
1. Clique no cadeado na URL
2. Clique em "Certificate"
3. Deve mostrar:
   ✅ Issued by: Let's Encrypt
   ✅ Valid from: data
   ✅ Valid until: data
```

---

### 6. Domínio mostra conta de outra pessoa

#### Sintoma
```
❌ Erro: "Domain already in use"
❌ Site de outra pessoa aparece no meu domínio
```

#### Solução

**Opção A: Removeu domínio da conta errada**
```
1. Faça login com a conta CORRETA
2. Vá para: Site settings → Domain management
3. Clique em "Remove custom domain"
4. Confirme
5. Aguarde 5 minutos
6. Adicione novamente
```

**Opção B: Domínio está em outro site Netlify**
```
1. Faça login em sua conta
2. Vá para Site settings
3. Domain management
4. Clique em "Add custom domain"
5. Se disser "already in use":
   - É de outra conta Netlify
   - Contate: support@netlify.com
   - Envie: seu email + domínio
```

**Opção C: Registrador aponta para domínio errado**
```
1. Verifique no registrador qual site Netlify está apontando
2. Vá para https://dns.google
3. Digite: silviaassay.com
4. Veja os nameservers atuais
5. Se não são Netlify, atualize no registrador
```

---

### 7. Build falhou no GitHub

#### Sintoma
```
❌ Erro ao fazer push para GitHub
❌ "Build failed" no Netlify
❌ Site não atualiza após push
```

#### Solução

**Passo 1: Verificar logs de build**
```
No Netlify:
1. Vá para seu site
2. Clique em "Deploys"
3. Procure o deploy falhado
4. Clique para ver logs
5. Procure mensagem de erro
```

**Passo 2: Erros comuns**

Se vir: `"Command failed: npm install"`
```
Solução:
1. Verifique package.json
2. Execute localmente: npm install
3. Se der erro local, corrija
4. Faça push novamente
```

Se vir: `"No build script provided"`
```
Para site estático, adicione ao netlify.toml:
[build]
  command = "echo 'Site pronto'"
  publish = "."
```

Se vir: `"Dependency not found"`
```
1. Execute localmente: npm install
2. Verifique package-lock.json
3. Faça: git add .
4. git commit -m "update dependencies"
5. git push
```

**Passo 3: Forçar re-build**
```
No Netlify:
1. Vá para Deploys
2. Clique no último deploy bem-sucedido
3. Clique em "Redeploy"
4. Aguarde conclusão
```

---

### 8. Site lento para carregar

#### Sintoma
```
⏱️ Tempo de carregamento > 5 segundos
⏱️ Imagens demoram para aparecer
⏱️ Página congela ao rolar
```

#### Solução

**Passo 1: Testar velocidade**
```
Visite: https://pagespeed.web.dev
Digite: https://silviaassay.com
Aguarde resultado

Metas:
- Performance: > 70 (boa)
- Accessibility: > 85
- Best Practices: > 85
- SEO: > 85
```

**Passo 2: Otimizar imagens**

Se muitas imagens grandes:
```
Ferramenta: https://tinypng.com

1. Faça upload das imagens
2. Baixe versão comprimida
3. Substitua no projeto
4. Re-faça upload

Ou usando command line:
npm install -g imagemin imagemin-jpeg imagemin-png

imagemin images/ --out-dir=images-optimized
```

**Passo 3: Minificar CSS e JavaScript**
```
Instalar ferramenta:
npm install -g minify

Minificar CSS:
minify css/style.css > css/style.min.css

Minificar JS:
minify js/script.js > js/script.min.js

Usar no HTML:
<link rel="stylesheet" href="css/style.min.css">
<script src="js/script.min.js"></script>
```

**Passo 4: Habilitar Caching**

No netlify.toml:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Passo 5: Usar CDN para recursos externos**

Se usa libraries pesadas:
```html
<!-- ❌ Local pode ser lento -->
<script src="js/jquery.js"></script>

<!-- ✅ CDN é mais rápido -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

---

### 9. Email de "Site Deploy Failed" repetido

#### Sintoma
```
📧 Email: "Site deploy failed"
📧 Deploy falha a cada push
```

#### Solução

**Passo 1: Verificar logs**
```
1. App Netlify
2. Seu site
3. Deploys
4. Deploy falhado
5. Ver logs completos
```

**Passo 2: Desabilitar builds automáticos (temporário)**
```
Se falha repetidamente:
1. Site settings
2. Build & deploy
3. Continuous deployment
4. Clique em "Disconnect repository"
5. Corrija problema localmente
6. Reconecte quando pronto
```

---

### 10. Formulário não funciona

#### Sintoma
```
❌ Clica em enviar, nada acontece
❌ Formulário não envia dados
```

#### Solução

**Passo 1: Usar Netlify Forms**

Seu HTML:
```html
<form name="contato" method="POST" netlify>
  <input type="email" name="email" required>
  <textarea name="mensagem" required></textarea>
  <button type="submit">Enviar</button>
</form>
```

**Passo 2: Verificar no Netlify**
```
1. Site settings
2. Procure: Forms
3. Veja submissões
```

**Passo 3: Integrar com email (Formspree)**

Alternative: https://formspree.io

```html
<form action="https://formspree.io/f/SEUTOKEN" method="POST">
  <input type="email" name="email" required>
  <textarea name="mensagem" required></textarea>
  <button type="submit">Enviar</button>
</form>
```

---

## 🔍 FERRAMENTAS DE DIAGNÓSTICO

### Verificar DNS
```
Ferramenta: https://mxtoolbox.com
Ou: https://dns-lookup.jotform.com/
Ou: https://www.whatsmydns.net/

Procure por:
A record: aponta para Netlify
CNAME: (se usando)
```

### Verificar SSL/HTTPS
```
Ferramenta: https://www.ssllabs.com/ssltest/

Digite seu domínio
Aguarde análise
Resultado deve ser: A+ ou A
```

### Verificar Performance
```
Ferramenta: https://pagespeed.web.dev

Digite sua URL
Aguarde análise
Veja recomendações
```

### Verificar Mobile
```
Ferramenta: https://search.google.com/test/mobile-friendly

Digite sua URL
Deve mostrar: "Page is mobile friendly"
```

---

## 📞 CONTATAR SUPORTE

### Netlify Support

**Email:** support@netlify.com

**Chat:** Disponível no dashboard
```
1. Acesse seu site
2. Procure ícone de chat (canto inferior direito)
3. Descreva o problema
4. Resposta em até 24h
```

**Twitter:** [@netlify](https://twitter.com/netlify)

**Community:** [Netlify Discord](https://discord.gg/netlify)

### Stack Overflow
```
Procure por: "Netlify [seu problema]"
Ou pergunte com tag: [netlify]
```

### Reddit
```
r/webdev
r/web_design
r/Frontend
```

---

## 🔧 COMANDOS ÚTEIS

### Terminal

**Verificar arquivos locais:**
```bash
ls -la
tree -L 2
```

**Validar HTML:**
```bash
npm install -g html-validate
html-validate index.html
```

**Validar CSS:**
```bash
npm install -g stylelint
stylelint css/style.css
```

**Validar JavaScript:**
```bash
npm install -g jshint
jshint js/script.js
```

**Comprimir arquivos:**
```bash
# Mac
tar -czf site-backup.tar.gz .

# Windows (7-Zip ou WinRAR)
```

---

## 📋 CHECKLIST DE DIAGNÓSTICO

Se seu site não está funcionando:

- [ ] Domínio conectado no Netlify?
- [ ] Status do domínio é "Active"?
- [ ] DNS propagou (48h)?
- [ ] HTTPS ativado?
- [ ] Certificado válido?
- [ ] Sem erro 404 em console?
- [ ] CSS carrega?
- [ ] JavaScript funciona?
- [ ] Imagens aparecem?
- [ ] Links internos funcionam?
- [ ] Sem "mixed content"?
- [ ] Sem scripts bloqueados?

---

## ✨ DICA FINAL

**Se nada funcionar:**

1. Verifique se seguiu todos os passos
2. Aguarde propagação DNS (até 48h)
3. Limpe cache do navegador (Ctrl+Shift+Delete)
4. Tente em modo incógnito
5. Contate support@netlify.com com:
   - Nome do seu site Netlify
   - Seu domínio
   - Print da error
   - O que você já tentou

---

*Guia de Troubleshooting - Netlify*
*Última atualização: 03/02/2026*
