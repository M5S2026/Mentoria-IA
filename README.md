# Silvia Assay - Site Profissional de IA

Site completo, responsivo e pronto para publicação. Desenvolvido com HTML5, CSS3 e JavaScript vanilla.

## 📂 Estrutura de Arquivos

```
silviaassay.com/
├── index.html                    # Página inicial (HOME)
├── css/
│   └── style.css                # Stylesheet completo (comentado)
├── js/
│   └── script.js                # JavaScript interativo
├── pages/
│   ├── mentoria.html            # Página de Mentoria Intensiva 2 Dias
│   ├── produtos.html            # Página de Cursos Online
│   └── sobre.html               # Página Sobre Silvia
├── images/                      # Pasta para imagens
│   ├── hero-silvia.jpg
│   ├── mentoria-preview.jpg
│   ├── mentoria-hero.jpg
│   ├── chatgpt-course.jpg
│   ├── negocio-course.jpg
│   ├── criadores-course.jpg
│   ├── silvia-profile.jpg
│   └── og-image.jpg             # Para redes sociais
└── favicon.ico                  # Ícone do navegador
```

## 🚀 Como Usar

### 1. Preparação das Imagens

Você precisa adicionar suas imagens na pasta `/images/`. Recomendações:

- **hero-silvia.jpg**: 600x600px mínimo (foto profissional de Silvia)
- **mentoria-preview.jpg**: 600x400px
- **mentoria-hero.jpg**: 600x400px
- **chatgpt-course.jpg**: 600x400px
- **negocio-course.jpg**: 600x400px
- **criadores-course.jpg**: 600x400px
- **silvia-profile.jpg**: 400x500px (foto de perfil)
- **og-image.jpg**: 1200x630px (para redes sociais)

### 2. Customizações Necessárias

Procure por `[INSERIR ...]` no código e substitua pelos dados reais:

#### No **index.html** e outras páginas:
- `[INSERIR GOOGLE ANALYTICS ID]` → Substitua `G-XXXXXXXXXX` pelo seu ID real
- Informações de contato em phones, emails
- Data da próxima edição da mentoria

#### No **js/script.js**:
- `G-XXXXXXXXXX` → Seu Google Analytics ID real

#### Links do Hotmart:
- Substitua todos os links `https://hotmart.com/product/...` pelos links reais dos seus produtos

### 3. Deploy

#### Opção A: Hospedagem Simples (Netlify, Vercel, GitHub Pages)

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Conecte seu domínio

```bash
# Exemplo com Netlify
netlify deploy --prod --dir=.
```

#### Opção B: Hosting Tradicional (GoDaddy, Hostgator, etc)

1. Via FTP, envie todos os arquivos para a pasta `public_html/`
2. Configure DNS apontando para o servidor
3. Pronto!

#### Opção C: Seu Servidor (VPS, Dedicated)

1. Clone/envie os arquivos
2. Configure um web server (Nginx, Apache)
3. Aponte o domínio
4. Configure SSL (Let's Encrypt)

## 📋 Checklist Antes de Publicar

- [ ] Adicionar todas as imagens em `/images/`
- [ ] Verificar todos os `[INSERIR ...]` foram substituídos
- [ ] Testar links de Hotmart funcionam
- [ ] Configurar Google Analytics
- [ ] Atualizar telefone/email de contato
- [ ] Adicionar link correto do Instagram, LinkedIn, YouTube
- [ ] Testar no mobile (480px, 768px, 1024px)
- [ ] Verificar acessibilidade (tab navigation, alt texts)
- [ ] Testar todos os formulários
- [ ] Verificar velocidade da página (Google PageSpeed)
- [ ] Configurar sitemap.xml e robots.txt
- [ ] Enviar para Google Search Console
- [ ] Testar performance com Lighthouse

## 🎨 Customização de Cores

Todas as cores estão em variáveis CSS. Para mudar:

Abra `css/style.css` e edite a seção `:root` (linhas 1-30):

```css
:root {
    --color-primary: #001f3f;        /* Azul Marinho */
    --color-secondary: #d4af37;      /* Dourado */
    /* ... outras cores ... */
}
```

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:
- **Mobile**: 480px e abaixo
- **Tablet**: 481px - 768px
- **Desktop Pequeno**: 769px - 1024px
- **Desktop**: 1025px - 1440px
- **Extra Large**: 1441px+

## ♿ Acessibilidade

- ✓ WCAG 2.1 AA compliant
- ✓ Navegação por teclado (Tab)
- ✓ Alt text em todas as imagens
- ✓ Cores com contraste adequado
- ✓ ARIA labels onde necessário
- ✓ Suporte a `prefers-reduced-motion`

## 📊 Performance

- ✓ Sem frameworks pesados (0 dependências)
- ✓ CSS otimizado (~45KB)
- ✓ JavaScript vanilla (~15KB)
- ✓ Lazy loading de imagens
- ✓ Animações com transforms (GPU)
- ✓ Suporte a dark mode

## 🔒 Segurança

- ✓ No inline scripts desnecessários
- ✓ HTTPS recomendado
- ✓ CSP headers configuráveis
- ✓ Sem dependencies maliciosas

## 📧 Integrações

### Google Analytics

1. Crie conta em https://analytics.google.com
2. Pegue seu GA ID (formato: G-XXXXXXXXXX)
3. Substitua em todos os arquivos: `G-XXXXXXXXXX`

### Hotmart

1. Crie seus produtos na plataforma Hotmart
2. Copie os links de checkout
3. Cole nos placeholders dos botões

### Formulários

Atualmente os formulários exibem confirmação local. Para enviar dados:

Opção 1: Integre com Formspree (email)
```javascript
// Em script.js, linha ~200
form.action = 'https://formspree.io/f/YOUR_ID';
```

Opção 2: Use sua API backend
```javascript
// Faça request para seu servidor
fetch('/api/contact', { method: 'POST', body: data })
```

## 🐛 Troubleshooting

### Links não funcionam
- Verifique se os caminhos estão corretos
- Links relativos: `../css/style.css` (dentro de /pages/)
- Links absolutos: `/index.html` (de qualquer lugar)

### Imagens não aparecem
- Verifique nomes de arquivo (case-sensitive em Linux)
- Verifique se estão em `/images/`
- Use caminhos completos: `../images/nome.jpg`

### Estilos não carregam
- Limpe cache do navegador (Ctrl+F5)
- Verifique se `css/style.css` existe
- Verifique permissões de arquivo (755)

## 📈 SEO Otimizado

- ✓ Meta tags completas
- ✓ Open Graph para redes sociais
- ✓ Schema.org structured data (ready to add)
- ✓ H1, H2, H3 tags semânticas
- ✓ Canonical URLs
- ✓ Mobile-first indexing
- ✓ Fast Core Web Vitals

---

**Desenvolvido com ❤️ para transformar vidas**

Última atualização: Fevereiro 2024
