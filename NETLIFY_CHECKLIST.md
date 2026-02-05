# ✅ Netlify Deployment Checklist Prático

Use este checklist durante todo o processo de deployment.

---

## 📋 PRÉ-DEPLOYMENT

### Preparação de Arquivos
- [ ] Estrutura de pastas está correta
- [ ] index.html na raiz
- [ ] css/ com todos os estilos
- [ ] js/ com todos os scripts
- [ ] images/ com todas as imagens
- [ ] links em HTML estão relativos (não absolutos)
- [ ] Sem erros no console do navegador (F12)
- [ ] Site funciona localmente

### Configurações
- [ ] netlify.toml criado e configurado
- [ ] Meta tags adequadas no head
- [ ] Favicon.ico presente
- [ ] robots.txt presente (opcional)
- [ ] .gitignore configurado

### Backup
- [ ] Cópia de segurança local dos arquivos
- [ ] Código salvo no GitHub (recomendado)
- [ ] Banco de dados exportado (se houver)

---

## 🎯 PASSO 1: Criar Conta Netlify

- [ ] Acessei [netlify.com](https://netlify.com)
- [ ] Cliquei em "Sign Up"
- [ ] Escolhi método de cadastro:
  - [ ] GitHub
  - [ ] GitLab
  - [ ] Email
- [ ] Confirmei email (se necessário)
- [ ] Estou logado no dashboard
- [ ] Dashboard URL: https://app.netlify.com/

---

## 📦 PASSO 2: Upload dos Arquivos

### Opção A: Drag & Drop
- [ ] Cliquei em "Add new site"
- [ ] Selecionei "Deploy manually"
- [ ] Arrastei pasta do projeto
- [ ] Arquivo zipado foi reconhecido
- [ ] Upload completou com sucesso
- [ ] Site temporário criado: `__________netlify.app`

### Opção B: GitHub
- [ ] Repositório criado no GitHub
- [ ] Código feito push para main
- [ ] Cliquei em "Add new site"
- [ ] Selecionei "Connect to Git"
- [ ] GitHub autorizado
- [ ] Repositório selecionado
- [ ] Deploy iniciado automaticamente
- [ ] Build completou com sucesso

### Status do Deploy
- [ ] Status: ✅ Published
- [ ] URL temporária: `__________netlify.app`
- [ ] Site acessível no navegador
- [ ] Sem erros 404 no console

---

## 🌐 PASSO 3: Registrar / Conectar Domínio

### Se não tem domínio:
- [ ] Escolhi registrador:
  - [ ] Namecheap
  - [ ] Hostinger
  - [ ] Registro.br
  - [ ] Outro: ___________
- [ ] Acessei site do registrador
- [ ] Procurei "silviaassay.com"
- [ ] Domínio disponível
- [ ] Adicionei ao carrinho
- [ ] Completei pagamento
- [ ] Email de confirmação recebido
- [ ] Conta do registrador criada/acessada
- [ ] Domínio está na conta

### Conectar no Netlify:
- [ ] Estou no dashboard do meu site
- [ ] Cliquei em "Site settings"
- [ ] Acessei "Domain management"
- [ ] Cliquei em "Add custom domain"
- [ ] Digitei "silviaassay.com"
- [ ] Cliquei em "Verify"
- [ ] Não há conflito de domínio

---

## 🔧 PASSO 4: Configurar DNS

### No Netlify (copiar dados):
- [ ] Visualizei nameservers do Netlify:
  ```
  ns1.netlify.com
  ns2.netlify.com
  ns3.netlify.com
  ```
- [ ] Anotei os servidores de nomes
- [ ] Status ainda em "Not connected"

### No Registrador (modificar):
- [ ] Acessei conta do registrador
- [ ] Encontrei domínio "silviaassay.com"
- [ ] Acessei seção "Nameservers" ou "DNS"
- [ ] Removi nameservers antigos
- [ ] Adicionei 3 novos nameservers:
  - [ ] `ns1.netlify.com`
  - [ ] `ns2.netlify.com`
  - [ ] `ns3.netlify.com`
- [ ] Salvei alterações
- [ ] Recebi confirmação de alteração

### Aguardar Propagação:
- [ ] Anotei hora da mudança: ___________
- [ ] Aguardando propagação DNS (24-48h)
- [ ] Verificando a cada 1-2 horas:
  ```
  Site: https://www.whatsmydns.net/
  Domínio: silviaassay.com
  ```

---

## 🔒 PASSO 5: Verificar HTTPS

### No Netlify:
- [ ] Site settings → Domain management
- [ ] Status HTTPS: ✅ HTTPS enabled
- [ ] Certificado SSL: Ativo
- [ ] Renovação automática: Habilitada

### No Navegador:
- [ ] Acessei https://silviaassay.com
- [ ] URL mostra 🔒 cadeado verde
- [ ] Cliquei no cadeado
- [ ] Certificado válido aparece
- [ ] Sem avisos de segurança
- [ ] Site inteiro carregou via HTTPS

### Verificação Online:
- [ ] Visitei [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=silviaassay.com)
- [ ] Resultado: A+ ou A
- [ ] Sem vulnerabilidades

---

## ✅ PASSO 6: Testes Completos

### Acessibilidade
- [ ] Site acessível em https://silviaassay.com
- [ ] Site acessível em https://www.silviaassay.com
- [ ] HTTP redireciona para HTTPS automaticamente
- [ ] Tempo de carregamento < 3 segundos

### Funcionamento
- [ ] Homepage (index.html) carrega
- [ ] Todas as páginas acessíveis:
  - [ ] about.html ou /about
  - [ ] products.html ou /produtos
  - [ ] mentoria.html ou /mentoria
  - [ ] Outras: ___________
- [ ] Todos os links internos funcionam
- [ ] Todos os links externos funcionam

### Recursos
- [ ] CSS carregado (Inspect → Sources)
- [ ] JavaScript funcionando (no console)
- [ ] Imagens carregadas (nenhuma 404)
- [ ] Fontes carregadas corretamente
- [ ] Ícones/SVGs aparecem

### Responsividade (F12 → Device Toolbar)
- [ ] Desktop (1920px) - OK
- [ ] Tablet (768px) - OK
- [ ] Mobile (375px) - OK
- [ ] Sem overflow horizontal
- [ ] Menu adaptável funciona
- [ ] Botões clicáveis no mobile

### Performance
- [ ] Google PageSpeed:
  - [ ] Performance: ≥ 70
  - [ ] Accessibility: ≥ 85
  - [ ] Best Practices: ≥ 85
  - [ ] SEO: ≥ 85
- [ ] Lighthouse audit executado
- [ ] Sem erros no console (F12)
- [ ] Sem avisos críticos

### Formulários (se houver)
- [ ] Formulários aparecem
- [ ] Campos funcionam
- [ ] Validação funciona
- [ ] Envio processa corretamente
- [ ] Confirmação é exibida

### Compatibilidade
- [ ] Chrome - OK
- [ ] Firefox - OK
- [ ] Safari - OK
- [ ] Edge - OK
- [ ] Mobile Safari (iOS) - OK
- [ ] Chrome Mobile (Android) - OK

---

## 📊 Informações Registradas

### Netlify
- **Nome do Site:** ___________________________
- **URL Netlify:** ___________________________
- **ID do Site:** ___________________________
- **Email da Conta:** ___________________________
- **API Token:** ___________________________

### Domínio
- **Domínio:** silviaassay.com
- **Registrador:** ___________________________
- **Email Registrador:** ___________________________
- **Data de Expiração:** ___________________________
- **Renovação Automática:** Sim / Não

### Certificado SSL
- **Provedor:** Let's Encrypt (Netlify)
- **Data de Emissão:** ___________________________
- **Data de Expiração:** ___________________________
- **Auto-renovação:** ✅ Habilitada

---

## 🚀 Pós-Deployment (Próximos Passos)

### SEO
- [ ] Meta description adicionada
- [ ] Open Graph tags adicionadas
- [ ] Twitter cards configuradas
- [ ] Sitemap.xml criado
- [ ] robots.txt criado
- [ ] Google Search Console configurado
- [ ] Bing Webmaster Tools configurado

### Analytics
- [ ] Google Analytics instalado
- [ ] Google Tag Manager configurado (opcional)
- [ ] Netlify Analytics ativado (opcional)
- [ ] 24h aguardadas para dados aparecerem

### Monitoramento
- [ ] Netlify notifications ativadas
- [ ] Email para deploy alerts configurado
- [ ] Slack integration (opcional)
- [ ] GitHub integration verificada

### Segurança
- [ ] Senha do registrador alterada
- [ ] 2FA ativado no Netlify
- [ ] 2FA ativado no registrador
- [ ] Backup dos arquivos realizado
- [ ] Git repo privado (se aplicável)

### Marketing
- [ ] Link compartilhado nas redes sociais
- [ ] Email enviado para contatos
- [ ] Assinatura de email atualizada
- [ ] LinkedIn atualizado
- [ ] GitHub perfil atualizado

---

## 🆘 Problemas Encontrados

| Problema | Status | Solução |
|----------|--------|---------|
| | ⏳ | |
| | ⏳ | |
| | ⏳ | |

---

## 📝 Notas

```
_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
```

---

## ✨ Status Final

- [ ] ✅ Site ao vivo e funcional
- [ ] ✅ Domínio configurado
- [ ] ✅ HTTPS ativado
- [ ] ✅ Todos os testes passando
- [ ] ✅ Pronto para produção

**Data de Conclusão:** _______________

**Tempo Total Gasto:** _______________

---

*Checklist - Netlify Deployment*
*Última atualização: 03/02/2026*
