# 📐 Guia Visual - Estrutura e Configuração Netlify

Guia com exemplos visuais de como estruturar seu projeto.

---

## 📂 Estrutura de Pastas Esperada

### Opção 1: Site Estático Simples (Recomendado)

```
silviaassay.com/
│
├── 📄 index.html              ← Página principal
├── 📄 about.html              ← Página sobre
├── 📄 contact.html            ← Página contato
│
├── 📁 css/
│   └── 📄 style.css           ← Folha de estilos principal
│   └── 📄 responsive.css      ← (opcional) estilos mobile
│
├── 📁 js/
│   └── 📄 script.js           ← Scripts JavaScript
│   └── 📄 animations.js       ← (opcional) animações
│
├── 📁 images/
│   ├── 📷 logo.png
│   ├── 📷 profile.jpg
│   ├── 📷 hero-image.jpg
│   └── 📷 favicon.ico
│
├── 📁 assets/                 ← (opcional) outros recursos
│   ├── fonts/
│   └── icons/
│
└── 📄 netlify.toml            ← Configurações Netlify
```

### Opção 2: Site com Múltiplas Seções

```
silviaassay.com/
│
├── 📄 index.html
│
├── 📁 pages/
│   ├── 📄 sobre.html
│   ├── 📄 produtos.html
│   ├── 📄 mentoria.html
│   ├── 📄 blog.html
│   └── 📄 contato.html
│
├── 📁 css/
│   ├── 📄 style.css
│   ├── 📄 header.css
│   ├── 📄 footer.css
│   └── 📄 pages.css
│
├── 📁 js/
│   ├── 📄 main.js
│   ├── 📄 menu.js
│   └── 📄 forms.js
│
├── 📁 images/
│   ├── 🎨 hero/
│   ├── 👤 team/
│   ├── 📸 portfolio/
│   └── 🎯 icons/
│
└── 📄 netlify.toml
```

---

## 🔗 Exemplo de Links em HTML

### ❌ ERRADO - Caminhos Absolutos

```html
<!DOCTYPE html>
<html>
<head>
    <!-- ❌ NÃO FUNCIONA - Caminho local absoluto -->
    <link rel="stylesheet" href="/Users/silviaassay/css/style.css">
    <link rel="stylesheet" href="C:\Users\silviaassay\css\style.css">
</head>
<body>
    <!-- ❌ NÃO FUNCIONA - Começa com / -->
    <link rel="stylesheet" href="/css/style.css">
    <img src="/images/logo.png" alt="Logo">
    <script src="/js/script.js"></script>
</body>
</html>
```

### ✅ CORRETO - Caminhos Relativos

```html
<!DOCTYPE html>
<html>
<head>
    <!-- ✅ FUNCIONA - Caminho relativo -->
    <link rel="stylesheet" href="css/style.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sílvia Assay - Portfolio</title>
</head>
<body>
    <header>
        <!-- ✅ Imagem com caminho relativo -->
        <img src="images/logo.png" alt="Logo Sílvia Assay">
    </header>

    <nav>
        <!-- ✅ Links internos relativos -->
        <a href="index.html">Home</a>
        <a href="pages/sobre.html">Sobre</a>
        <a href="pages/produtos.html">Produtos</a>
    </nav>

    <!-- ✅ Script no final do body -->
    <script src="js/script.js"></script>
</body>
</html>
```

---

## 📄 Exemplo Completo de index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- Meta Tags Básicas -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Sílvia Assay - Portfolio Profissional">
    <meta name="keywords" content="portfolio, projetos, desenvolvimento">
    <meta name="author" content="Sílvia Assay">

    <!-- Open Graph (Redes Sociais) -->
    <meta property="og:title" content="Sílvia Assay - Portfolio">
    <meta property="og:description" content="Conheça meus projetos e serviços">
    <meta property="og:image" content="images/preview.jpg">
    <meta property="og:url" content="https://silviaassay.com">

    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css">

    <!-- Favicon -->
    <link rel="icon" href="images/favicon.ico">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

    <title>Sílvia Assay - Portfolio Profissional</title>
</head>

<body>
    <!-- Navigation -->
    <nav>
        <img src="images/logo.png" alt="Logo" class="logo">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="pages/sobre.html">Sobre</a></li>
            <li><a href="pages/produtos.html">Produtos</a></li>
            <li><a href="pages/mentoria.html">Mentoria</a></li>
            <li><a href="pages/contato.html">Contato</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <header class="hero">
        <h1>Bem-vindo ao meu Portfolio</h1>
        <p>Descubra meus projetos e serviços</p>
        <img src="images/hero.jpg" alt="Banner principal">
    </header>

    <!-- Main Content -->
    <main>
        <section class="products">
            <h2>Meus Produtos e Serviços</h2>
            <p>Confira tudo que ofereço</p>
            <a href="pages/produtos.html" class="btn">Ver Produtos</a>
        </section>
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; 2026 Sílvia Assay. Todos os direitos reservados.</p>
        <p>
            <a href="https://instagram.com/silviaassay">Instagram</a> |
            <a href="https://linkedin.com/in/silviaassay">LinkedIn</a>
        </p>
    </footer>

    <!-- Scripts -->
    <script src="js/script.js"></script>

    <!-- Google Analytics (opcional) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
    </script>
</body>
</html>
```

---

## 🎨 Exemplo de style.css

```css
/* ================================
   Estilos Básicos
   ================================ */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
}

/* ================================
   Header / Navigation
   ================================ */

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #f8f9fa;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

nav .logo {
    width: 50px;
    height: auto;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

nav a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s;
}

nav a:hover {
    color: #007bff;
}

/* ================================
   Hero Section
   ================================ */

.hero {
    text-align: center;
    padding: 3rem 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
}

.hero img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin-top: 2rem;
}

/* ================================
   Buttons
   ================================ */

.btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
    border: none;
    cursor: pointer;
}

.btn:hover {
    background-color: #0056b3;
}

/* ================================
   Main Content
   ================================ */

main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

section {
    margin-bottom: 3rem;
}

section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
}

/* ================================
   Footer
   ================================ */

footer {
    background-color: #f8f9fa;
    padding: 2rem 1rem;
    text-align: center;
    border-top: 1px solid #ddd;
    margin-top: 3rem;
}

footer a {
    color: #007bff;
    text-decoration: none;
}

footer a:hover {
    text-decoration: underline;
}

/* ================================
   Responsividade
   ================================ */

@media (max-width: 768px) {
    nav {
        flex-direction: column;
        gap: 1rem;
    }

    nav ul {
        flex-direction: column;
        gap: 1rem;
    }

    .hero h1 {
        font-size: 2rem;
    }

    .hero p {
        font-size: 1.2rem;
    }

    section h2 {
        font-size: 1.5rem;
    }
}
```

---

## 📝 Exemplo de netlify.toml

```toml
# ================================
# Build Configuration
# ================================

[build]
  # Comando de build (não necessário para sites estáticos)
  command = "echo 'Site estático pronto para publicar'"
  # Pasta que será publicada
  publish = "."

# ================================
# Environment Variables
# ================================

[env]
  NODE_VERSION = "18"

# ================================
# Redirects
# ================================

# Remover www do domínio
[[redirects]]
  from = "https://www.silviaassay.com/*"
  to = "https://silviaassay.com/:splat"
  status = 301
  force = true

# Forçar HTTPS
[[redirects]]
  from = "http://*"
  to = "https://:splat"
  status = 301
  force = true

# Página 404 customizada
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404

# ================================
# Headers HTTP
# ================================

# Headers para todas as páginas
[[headers]]
  for = "/*"
  [headers.values]
    # Controlar cache de conteúdo dinâmico
    Cache-Control = "public, max-age=3600"
    # Segurança
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Cache longo para CSS
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Cache longo para JavaScript
[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Cache longo para imagens
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# ================================
# Error Pages
# ================================

# Página customizada para erros 404
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404

# ================================
# Context Específico
# ================================

# Configurações para produção
[context.production]
  command = "echo 'Production build'"
  environment = { ENVIRONMENT = "production" }

# Configurações para deploy preview
[context.deploy-preview]
  command = "echo 'Preview build'"

# Configurações para branch específica
[context."develop"]
  command = "echo 'Development build'"
```

---

## 📊 Diagrama de Fluxo - Deploy Netlify

```
┌─────────────────────────────────────────────────────────┐
│                   SEU COMPUTADOR                         │
│                                                           │
│  ┌──────────────┐                                        │
│  │ Seus Arquivos│  ← index.html, css/, js/, images/     │
│  │              │                                        │
│  │ silviaassay/ │                                        │
│  └──────┬───────┘                                        │
│         │                                                │
│         │ 1. Preparar arquivos                           │
│         │ 2. Verificar caminhos (relativos!)            │
│         │ 3. Testar localmente                          │
│         │                                                │
│         ▼                                                │
│  ┌──────────────┐                                        │
│  │   GitHub     │  ← Opcional mas recomendado           │
│  │ (Repositório)│                                        │
│  └──────┬───────┘                                        │
│         │                                                │
└─────────┼────────────────────────────────────────────────┘
          │
          │ git push
          │
          ▼
┌─────────────────────────────────────────────────────────┐
│                      NETLIFY                             │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │                   Dashboard                      │   │
│  │                                                  │   │
│  │  Site: seu-site-aleatorio.netlify.app  ✅       │   │
│  │                                                  │   │
│  │  Domain: silviaassay.com          ⏳ Conectado  │   │
│  │  HTTPS: Enabled                   ✅            │   │
│  │                                                  │   │
│  └─────────────┬──────────────────────────────────┘   │
│                │                                        │
│                │ Propagação DNS                        │
│                │ 24-48 horas                           │
│                │                                        │
└────────────────┼────────────────────────────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │  INTERNET      │
        │                │
        │ silviaassay.com
        │  ONLINE! 🚀    │
        │  HTTPS ✅      │
        │  Cacheado ✅   │
        │                │
        └────────────────┘
```

---

## 🔐 Security Headers Explicados

```toml
# Evita que site seja aberto em iframes (proteção contra clickjacking)
X-Frame-Options = "SAMEORIGIN"

# Força o navegador a respeitar o content-type (evita mime sniffing)
X-Content-Type-Options = "nosniff"

# Proteção contra XSS (Cross-Site Scripting)
X-XSS-Protection = "1; mode=block"

# Controla quem vê a origem da requisição
Referrer-Policy = "strict-origin-when-cross-origin"

# Content Security Policy (proteção adicional contra XSS)
Content-Security-Policy = "default-src 'self'"
```

---

## 📈 Otimizações Recomendadas

### Imagens
```
Tamanho máximo recomendado por imagem: 500 KB
Usar formatos: JPG, PNG, WebP
Dimensões: Não maior que 1920x1080px (para hero)
Ferramenta: tinypng.com
```

### CSS/JS
```
Minificar antes de publicar
Combinar múltiplos arquivos em um
Remover código não utilizado
```

### HTML
```
Meta tags para SEO
Open Graph tags para redes sociais
Schema.org markup para estruturados dados
```

---

## 🎯 Checklist Final

- [ ] Pasta tem estrutura correta
- [ ] Caminhos em HTML são relativos
- [ ] Todas as imagens existem
- [ ] netlify.toml está criado
- [ ] Sem erros no console local (F12)
- [ ] Site funciona no navegador local
- [ ] Git repo criado (recomendado)
- [ ] Conta Netlify criada
- [ ] Site uploadado
- [ ] URL temporária funciona
- [ ] Domínio adicionado no Netlify
- [ ] Nameservers alterados no registrador
- [ ] Aguardando propagação DNS
- [ ] Domínio funciona
- [ ] HTTPS ativo
- [ ] Tudo carregando corretamente

---

*Guia Visual - Estrutura e Setup Netlify*
*Versão 1.0 - 03/02/2026*
