# AI Mentor Academy - Product Requirements Document (PRD)

**Version:** 1.0
**Date:** 2026-02-12
**Author:** Orion (AIOS Master) + Silvia Assay
**Status:** Draft - Pending Review

---

## 1. Goals

- Criar uma plataforma onde agentes IA baseados em grandes mentes ensinam visitantes de acordo com seu nivel, demonstrando valor real antes de qualquer venda
- Converter visitantes qualificados em clientes de programa high ticket (R$5.000+) atraves de experiencia educacional personalizada com IA
- Estabelecer Silvia Assay como referencia em mentoria de IA com diferencial unico no mercado (mentores IA + mentoria humana)
- Gerar receita recorrente atraves de programa completo com modulos + agentes IA dedicados + comunidade + calls ao vivo
- Construir base de dados de leads qualificados atraves das interacoes com os agentes (nivel, interesses, desafios)

## 2. Background Context

O mercado de educacao em IA esta saturado de cursos genericos. A maioria das landing pages segue o padrao: headline > beneficios > depoimentos > CTA de compra. Isso nao funciona bem para high ticket porque o visitante nao confia o suficiente para investir R$5.000+ em alguem que nunca viu ensinar.

A proposta resolve isso invertendo a logica: ao inves de FALAR que ensina bem, a plataforma DEMONSTRA ensinando atraves de agentes IA treinados nos frameworks de 7 grandes mentes. O visitante experimenta valor real, percebe a profundidade do metodo, e naturalmente quer ir mais fundo — onde encontra o programa pago com Silvia + agentes IA 24/7.

Silvia ja possui infraestrutura (site Netlify, area de membros, estrategia de vendas documentada) e audiencia no Instagram (@silviaassay). O que falta e o mecanismo de conversao inteligente que este produto entrega.

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-12 | 1.0 | PRD inicial criado | Orion/Silvia |

---

## 3. Requirements

### 3.1 Functional Requirements

- **FR1:** Sistema de avaliacao de nivel do visitante via conversa natural com agente IA (Iniciante / Intermediario / Avancado)
- **FR2:** 7 agentes mentores IA com personalidades, frameworks e estilos de ensino distintos baseados em grandes mentes
- **FR3:** Roteamento inteligente: apos avaliacao de nivel, o sistema direciona para o(s) agente(s) mais adequado(s)
- **FR4:** Cada agente deve ser capaz de ensinar conceitos reais (nao apenas vender), com limite de profundidade que incentiva upgrade para programa pago
- **FR5:** Sistema de captura de lead integrado (email obrigatorio para continuar conversa apos X mensagens gratuitas)
- **FR6:** Pagina de vendas do programa high ticket acessivel a partir de qualquer agente via CTA contextual
- **FR7:** Dashboard admin para Silvia visualizar: conversas, leads, niveis detectados, taxa de conversao por agente
- **FR8:** Area de membros com acesso aos agentes IA dedicados (versao completa, sem limites) para alunos pagos
- **FR9:** Sistema de modulos do programa com progresso rastreado (video-aulas + exercicios + agente mentor)
- **FR10:** Integracao com gateway de pagamento (Hotmart ou Stripe) para checkout do programa
- **FR11:** Agente "concierge" na homepage que faz triagem inicial e direciona para o mentor IA ideal
- **FR12:** Historico de conversas persistente por visitante (via cookie/email) para continuidade
- **FR13:** Os agentes devem citar fontes e frameworks reais dos mentores em que sao baseados
- **FR14:** Sistema de agendamento de call com Silvia integrado ao fluxo de conversao (para leads quentes)
- **FR15:** Landing page otimizada com design premium compativel com posicionamento high ticket

### 3.2 Non-Functional Requirements

- **NFR1:** Tempo de resposta dos agentes IA < 3 segundos para manter engajamento conversacional
- **NFR2:** Site deve carregar em < 2 segundos (Core Web Vitals green)
- **NFR3:** 100% responsivo (mobile-first - 70%+ do trafego vem do Instagram)
- **NFR4:** Custos de API de IA devem ser otimizados (cache de respostas comuns, limites por sessao)
- **NFR5:** LGPD compliant - consentimento explicito para coleta de dados e conversas
- **NFR6:** Disponibilidade 99.5% (agentes IA devem funcionar 24/7)
- **NFR7:** Seguranca: rate limiting, protecao contra prompt injection nos agentes
- **NFR8:** SEO otimizado para termos relacionados a mentoria IA, cursos IA, agentes IA
- **NFR9:** Analytics integrado para rastrear funil completo (visita > conversa > lead > venda)
- **NFR10:** Escalavel para suportar 1000+ conversas simultaneas sem degradacao

---

## 4. User Interface Design Goals

### 4.1 Overall UX Vision

Experiencia premium e imersiva que faz o visitante sentir que esta sendo atendido por uma equipe de especialistas de elite. O site deve transmitir: sofisticacao, confianca, exclusividade. Nao deve parecer "mais um site de curso" — deve parecer um hub de inteligencia artificial com mentores reais.

A interacao principal e conversacional: o visitante chega, e recebido por um agente concierge, e direcionado para o mentor ideal. A venda acontece como consequencia natural da experiencia de valor.

### 4.2 Key Interaction Paradigms

1. **Conversational-first:** O chatbot e o elemento central, nao um widget lateral. E a experiencia principal da pagina
2. **Progressive disclosure:** Informacoes do programa reveladas conforme o visitante avanca na conversa
3. **Mentor switching:** Possibilidade de trocar entre mentores IA durante a experiencia
4. **Gated content:** Apos X mensagens gratuitas, gate com email para continuar (lead capture natural)
5. **Contextual CTA:** Botoes de conversao aparecem nos momentos certos da conversa, nao de forma intrusiva

### 4.3 Core Screens and Views

1. **Homepage / Landing Page** - Hero impactante + apresentacao dos 7 mentores + agente concierge
2. **Chat Experience** - Interface de conversa fullscreen com mentor selecionado
3. **Mentor Profiles** - Cards com bio, especialidade e estilo de cada mentor IA
4. **Programa Page** - Detalhes do programa high ticket, modulos, depoimentos, pricing
5. **Checkout Page** - Pagamento integrado com opcoes de parcelamento
6. **Area de Membros** - Dashboard do aluno com modulos, progresso, agentes IA dedicados
7. **Admin Dashboard** - Metricas, conversas, leads, conversoes (somente Silvia)

### 4.4 Accessibility

WCAG AA - garantir que todos os elementos interativos sejam acessiveis, incluindo o chatbot

### 4.5 Branding

- **Paleta:** Escura e premium (dark mode primary) com acentos dourados/gradientes
- **Tipografia:** Moderna, clean (Inter ou Plus Jakarta Sans)
- **Tom visual:** Tech + Luxury (inspircao: sites de AI companies + marcas premium)
- **Cada mentor IA deve ter identidade visual propria** (cor, avatar, estilo)

### 4.6 Target Devices and Platforms

Web Responsive (mobile-first). Prioridade absoluta para mobile (trafego Instagram).

---

## 5. Technical Assumptions

### 5.1 Repository Structure

Monorepo com separacao clara entre frontend e backend/API.

### 5.2 Service Architecture

```
Frontend (Next.js/Vercel)
    |
    ├── Landing Page (SSG/SSR)
    ├── Chat Interface (Client-side + WebSocket/SSE)
    └── Area de Membros (Protected routes)

Backend API (Node.js / Edge Functions)
    |
    ├── Agent Orchestrator (roteamento de mentores)
    ├── Conversation Manager (historico, context)
    ├── Lead Manager (captura, scoring)
    └── Payment Integration (Hotmart/Stripe webhooks)

AI Layer
    |
    ├── Claude API (Anthropic) - motor principal dos agentes
    ├── System Prompts por mentor (personalidade + framework)
    ├── RAG / Knowledge Base por mentor (conteudo real)
    └── Response Cache (respostas frequentes)

Database
    |
    ├── Supabase (PostgreSQL + Auth + Realtime)
    ├── Conversas & Leads
    ├── Progresso de modulos
    └── Analytics events
```

### 5.3 Testing Requirements

- Unit tests para logica de roteamento de agentes e scoring de leads
- Integration tests para fluxo de conversa > lead capture > checkout
- E2E tests para jornada completa do visitante

### 5.4 Additional Technical Assumptions

- Claude API (Anthropic) como motor principal dos agentes IA por qualidade de conversacao
- Supabase para backend (auth, database, realtime) - reduz complexidade
- Vercel para deploy (otimizado para Next.js, edge functions, boa performance)
- Hotmart para pagamento (mercado BR, parcelamento, infra pronta) + Stripe como alternativa
- Sistema de prompts estruturados por mentor com knowledge base dedicada (RAG)
- Rate limiting: 20 mensagens gratuitas por sessao, depois gate com email
- Cache inteligente: respostas para perguntas frequentes pre-computadas
- WebSocket ou SSE para streaming de respostas dos agentes (experiencia de digitacao)

---

## 6. Os 7 Mentores IA

### Arquitetura dos Agentes

Cada mentor IA e composto por:

| Componente | Descricao |
|------------|-----------|
| **System Prompt** | Personalidade, tom, vocabulario, estilo de ensino |
| **Knowledge Base** | Frameworks, metodologias, conteudo real do mentor |
| **Teaching Strategy** | Como o agente ensina baseado no nivel do aluno |
| **Conversion Triggers** | Momentos naturais para sugerir programa pago |
| **Limites** | O que ensina gratis vs. o que reserva para programa pago |

### Os 7 Mentores

| # | Mentor Base | Nome do Agente | Especialidade | Nivel Ideal | Cor/Identidade |
|---|-------------|----------------|---------------|-------------|----------------|
| 1 | **Alan Nicolas** | "Nicolas" | IA Pratica, Prompts, Automacao | Iniciante | Azul eletrico |
| 2 | **Erico Rocha** | "Erico" | Lancamentos, Formula, Funis digitais | Intermediario | Vermelho |
| 3 | **Elon Musk** | "Elon" | Visao de futuro, Inovacao disruptiva, First principles | Avancado | Prata/Grafite |
| 4 | **Alex Hormozi** | "Hormozi" | Ofertas irresistiveis, Escala, $100M frameworks | Intermediario-Avancado | Preto/Dourado |
| 5 | **Russell Brunson** | "Russell" | Funis de vendas, Storytelling, Copywriting | Intermediario | Laranja |
| 6 | **Sam Altman** | "Altman" | Futuro da IA, Startups, Tecnologia de ponta | Avancado | Branco/Minimalista |
| 7 | **Gary Vee** | "Gary" | Conteudo organico, Redes sociais, Branding pessoal | Iniciante-Intermediario | Amarelo/Energia |

### Fluxo de Interacao

```
VISITANTE CHEGA
       |
       v
[AGENTE CONCIERGE]
"Ola! Sou a assistente da Silvia Assay.
 Para te direcionar pro mentor ideal,
 me conta: qual sua experiencia com IA?"
       |
       v
[AVALIACAO DE NIVEL]
Perguntas naturais:
- Ja usou ChatGPT? Como?
- Tem negocio proprio ou trabalha para empresa?
- Qual seu objetivo com IA? (produtividade/vendas/criar produtos/inovar)
- Nivel de conforto com tecnologia (1-10)?
       |
       v
[CLASSIFICACAO]
Score → Nivel + Interesse → Mentor(es) recomendado(s)
       |
       v
[APRESENTACAO DOS MENTORES]
"Baseado no que me contou, recomendo comecar com:

 1. Nicolas (IA Pratica) - para dominar as ferramentas
 2. Gary (Conteudo) - para aplicar no seu Instagram

 Qual quer experimentar primeiro?"
       |
       v
[SESSAO COM MENTOR]
- Ensina conceitos reais (20 mensagens gratis)
- Usa frameworks do mentor real
- Adapta linguagem ao nivel
- Gate: "Para continuar, me passa seu email"
       |
       v
[POS-GATE - CONTINUACAO]
- Mais 10 mensagens pos-email
- Aprofunda conteudo
- Introduz naturalmente o programa:
  "Isso que te ensinei e a ponta do iceberg.
   No programa da Silvia voce tem acesso
   a mim 24/7 + 6 outros mentores + calls ao vivo..."
       |
       v
[CTA → PROGRAMA HIGH TICKET]
```

---

## 7. O Programa High Ticket (R$5.000+)

### Estrutura do Programa

**Nome sugerido:** "AI Mastery Program" ou "Mentores de Excelencia"

**Preco:** R$ 4.997 (12x R$ 497) ou R$ 4.497 a vista

**Duracao:** 12 semanas

| Semana | Modulo | Mentor IA Principal | Conteudo |
|--------|--------|---------------------|----------|
| 1-2 | Fundamentos de IA | Nicolas (Alan Nicolas) | Prompts, ferramentas, automacao basica |
| 3-4 | IA para Conteudo | Gary (Gary Vee) | Criacao de conteudo com IA, branding |
| 5-6 | Funis & Lancamentos | Erico (Erico Rocha) + Russell (Brunson) | Estrutura de funis, storytelling |
| 7-8 | Ofertas & Escala | Hormozi (Alex Hormozi) | Oferta irresistivel, pricing, escala |
| 9-10 | Inovacao & Futuro | Elon (Musk) + Altman (Sam Altman) | Tendencias, first principles, startups |
| 11-12 | Implementacao | Todos os mentores | Projeto final com suporte de todos agentes |

### O que o aluno recebe:

1. **Acesso 24/7 aos 7 mentores IA** (versao completa, sem limites de mensagens)
2. **12 modulos em video** com Silvia ensinando ao vivo
3. **Calls semanais ao vivo** com Silvia (Q&A + hot seat)
4. **Comunidade exclusiva** (WhatsApp/Discord)
5. **Templates e frameworks** de cada mentor
6. **Certificado de conclusao**
7. **30 dias de suporte pos-programa**

### Diferencial competitivo:

> "Nenhum outro programa no Brasil oferece 7 mentores IA treinados nos frameworks das maiores mentes do marketing e tecnologia, disponiveis 24/7 para te ensinar no seu ritmo."

---

## 8. Epic List

### Epic 1: Foundation & Landing Page
**Goal:** Estabelecer infraestrutura do projeto e entregar landing page premium com agente concierge funcional.

### Epic 2: AI Mentor Engine
**Goal:** Implementar o sistema de agentes IA com os 7 mentores, avaliacao de nivel, e roteamento inteligente.

### Epic 3: Lead Capture & Conversion Funnel
**Goal:** Criar sistema completo de captura de leads, email gate, CTA contextual, e integracao com pagamento.

### Epic 4: Members Area & Program Delivery
**Goal:** Construir area de membros com modulos, progresso, agentes IA dedicados, e experiencia do aluno.

### Epic 5: Admin Dashboard & Analytics
**Goal:** Dashboard para Silvia monitorar conversas, leads, conversoes, e performance dos agentes.

---

## 9. Epic Details

### Epic 1: Foundation & Landing Page

**Goal:** Criar a base tecnica do projeto e a primeira experiencia do visitante — uma landing page premium que apresenta o conceito dos mentores IA e permite interacao inicial com o agente concierge. Ao final desta epic, o site estara no ar com dominio proprio, design premium, e um chatbot funcional na homepage.

#### Story 1.1: Project Setup & Infrastructure
> Como desenvolvedor,
> quero ter o projeto configurado com Next.js, Supabase, e deploy no Vercel,
> para que tenhamos a base tecnica pronta para desenvolvimento.

**Acceptance Criteria:**
1. Projeto Next.js 14+ inicializado com TypeScript e App Router
2. Supabase projeto criado com schema inicial (users, conversations, messages)
3. Deploy automatico no Vercel conectado ao repositorio Git
4. Dominio customizado configurado e apontando para Vercel
5. Variaveis de ambiente configuradas (Supabase, Claude API key)
6. ESLint + Prettier configurados
7. Health check route /api/health retornando status 200

#### Story 1.2: Design System & Layout Base
> Como visitante,
> quero ver um site com design premium e profissional,
> para que eu confie na qualidade do programa antes de interagir.

**Acceptance Criteria:**
1. Design tokens definidos (cores, tipografia, espacamento, sombras)
2. Tema dark mode como padrao com paleta premium (dark + dourado)
3. Layout responsivo base com header, footer, e container system
4. Componentes base criados: Button, Card, Badge, Input, Typography
5. Animacoes suaves de entrada (fade-in, slide-up) implementadas
6. Mobile-first com breakpoints para tablet e desktop
7. Fonte Plus Jakarta Sans ou Inter carregada via next/font

#### Story 1.3: Landing Page - Hero & Mentor Showcase
> Como visitante vindo do Instagram,
> quero entender imediatamente o que o site oferece e conhecer os mentores IA,
> para que eu me interesse em interagir com eles.

**Acceptance Criteria:**
1. Hero section com headline impactante sobre mentores IA
2. Subtitulo explicando o conceito (agentes que ensinam de verdade)
3. CTA principal "Fale com um Mentor IA Agora" visivel above the fold
4. Secao de showcase dos 7 mentores com cards (avatar, nome, especialidade, cor)
5. Cada card de mentor tem animacao hover e breve descricao
6. Social proof section (numeros: alunos, satisfacao, empresas)
7. Design premium consistente com branding definido
8. Performance: LCP < 2.5s, CLS < 0.1

#### Story 1.4: Concierge Agent - Basic Chat Interface
> Como visitante,
> quero poder conversar com um agente IA diretamente na pagina,
> para que eu tenha uma experiencia interativa e personalizada.

**Acceptance Criteria:**
1. Interface de chat implementada na landing page (modal ou secao expandida)
2. Campo de input com botao de envio e suporte a Enter
3. Mensagens do usuario e do agente exibidas com visual distinto
4. Indicador de "digitando..." enquanto agente processa resposta
5. Streaming de resposta via SSE (texto aparece progressivamente)
6. API route /api/chat criada com integracao Claude API
7. System prompt do concierge implementado (saudacao + avaliacao de nivel)
8. Maximo 20 mensagens por sessao (sem autenticacao)
9. Responsivo: chat funciona bem em mobile e desktop
10. Historico da conversa mantido durante a sessao (state management)

---

### Epic 2: AI Mentor Engine

**Goal:** Construir o cerebro da plataforma — o sistema que gerencia os 7 mentores IA, avalia o nivel dos visitantes, e direciona para o mentor mais adequado. Cada mentor tera personalidade unica, knowledge base propria, e estrategia de ensino adaptada ao nivel do aluno.

#### Story 2.1: Mentor System Prompts & Personas
> Como equipe de produto,
> quero que cada um dos 7 mentores IA tenha personalidade, tom e estilo de ensino distintos,
> para que a experiencia seja autentica e diferenciada.

**Acceptance Criteria:**
1. System prompt detalhado criado para cada um dos 7 mentores
2. Cada prompt inclui: personalidade, vocabulario, estilo de ensino, frameworks-chave
3. Cada mentor tem estrategia de ensino adaptada por nivel (iniciante/intermediario/avancado)
4. Prompts incluem instrucoes para citar frameworks reais (ex: "Como Hormozi ensina em $100M Offers...")
5. Prompts incluem limites do que ensinar gratis vs. reservar para programa pago
6. Testes manuais de cada mentor demonstram personalidades distintas
7. Documento de referencia criado mapeando mentor > frameworks > conteudo

#### Story 2.2: Level Assessment & Routing Engine
> Como visitante,
> quero ser avaliado naturalmente durante a conversa e direcionado ao mentor ideal,
> para que eu aprenda com quem mais pode me ajudar no meu nivel.

**Acceptance Criteria:**
1. Algoritmo de scoring que avalia nivel (1-10) baseado em respostas do visitante
2. Classificacao em 3 niveis: Iniciante (1-3), Intermediario (4-7), Avancado (8-10)
3. Deteccao de area de interesse (IA pratica, marketing, vendas, inovacao, conteudo)
4. Recomendacao de 2-3 mentores baseada em nivel + interesse
5. Transicao suave do concierge para mentor selecionado (contexto preservado)
6. Dados de avaliacao salvos no Supabase para analytics
7. Fallback: se avaliacao inconclusiva, oferecer lista de todos mentores para escolha manual

#### Story 2.3: Mentor Chat Experience
> Como visitante,
> quero conversar com o mentor IA selecionado e aprender conceitos reais,
> para que eu perceba o valor do metodo antes de considerar o programa pago.

**Acceptance Criteria:**
1. Interface de chat dedicada por mentor (cor, avatar, estilo visual do mentor ativo)
2. Troca de mentor possivel via menu lateral/dropdown
3. Cada mentor ensina usando seus frameworks reais na conversa
4. Respostas formatadas com markdown (listas, negrito, exemplos)
5. Mentor adapta profundidade ao nivel detectado do visitante
6. Historico de conversa separado por mentor na mesma sessao
7. Indicadores visuais do mentor ativo (avatar, cor de destaque, nome)

#### Story 2.4: Knowledge Base & RAG Integration
> Como mentor IA,
> quero ter acesso a knowledge base com conteudo real dos frameworks,
> para que minhas respostas sejam precisas e baseadas em metodologias reais.

**Acceptance Criteria:**
1. Knowledge base estruturada por mentor (documentos/chunks)
2. Sistema RAG basico implementado para enriquecer respostas com conteudo real
3. Cada mentor tem minimo 20 topicos/frameworks documentados
4. Respostas citam fonte quando aplicavel ("Como Alan Nicolas ensina no metodo X...")
5. Fallback gracioso quando pergunta fora do escopo do mentor
6. Knowledge base editavel via arquivos markdown (facil atualizacao)

---

### Epic 3: Lead Capture & Conversion Funnel

**Goal:** Transformar visitantes engajados em leads qualificados e direcionar para a compra do programa. O funil usa o engagement com os mentores IA como gatilho natural, com email gate apos X mensagens e CTAs contextuais que aparecem nos momentos certos da conversa.

#### Story 3.1: Email Gate & Lead Capture
> Como negocio,
> quero capturar o email do visitante apos ele experimentar valor com o mentor IA,
> para que eu possa nutrir o lead e converter em venda.

**Acceptance Criteria:**
1. Apos 20 mensagens gratuitas, modal de email gate aparece
2. Modal explica: "Para continuar aprendendo com [Mentor], deixe seu email"
3. Campo de email com validacao + nome (opcional)
4. Checkbox de consentimento LGPD
5. Apos email, visitante ganha +10 mensagens
6. Lead salvo no Supabase com: email, nivel, mentor preferido, historico resumido
7. Webhook ou trigger para enviar email de boas-vindas

#### Story 3.2: Contextual CTAs & Program Page
> Como visitante qualificado,
> quero conhecer os detalhes do programa completo quando estiver pronto,
> para que eu possa tomar uma decisao informada de compra.

**Acceptance Criteria:**
1. CTAs contextuais aparecem naturalmente durante conversa do mentor
2. Mentores IA sugerem programa pago em momentos estrategicos (nao intrusivo)
3. Pagina completa do programa com: modulos, mentores, depoimentos, pricing
4. Secao de comparacao: "Gratis vs. Programa Completo"
5. FAQ especifico do programa respondido
6. Botao de compra conectado ao checkout
7. Timer de urgencia (vagas limitadas) quando aplicavel

#### Story 3.3: Checkout & Payment Integration
> Como visitante decidido,
> quero poder comprar o programa de forma simples e segura,
> para que eu tenha acesso imediato ao conteudo.

**Acceptance Criteria:**
1. Integracao com Hotmart para checkout (produto criado, link gerado)
2. Opcoes de pagamento: cartao (12x), PIX, boleto
3. Pagina de obrigado/confirmacao pos-compra
4. Webhook Hotmart configurado para liberar acesso automaticamente
5. Email de confirmacao enviado com instrucoes de acesso
6. Registro do aluno no Supabase com status "ativo"
7. Redirect automatico para area de membros apos compra

#### Story 3.4: Email Nurture Sequence
> Como lead capturado,
> quero receber emails de valor que me ajudem a decidir sobre o programa,
> para que eu nao me sinta pressionado mas sim educado.

**Acceptance Criteria:**
1. Sequencia de 5 emails automaticos configurada:
   - Email 1 (imediato): Boas-vindas + link para voltar ao mentor IA
   - Email 2 (dia 2): Case study de aluno + dica do mentor preferido
   - Email 3 (dia 4): "O que voce esta perdendo" + preview de modulo
   - Email 4 (dia 6): Social proof + depoimentos + oferta
   - Email 5 (dia 8): Ultimo lembrete + bonus exclusivo
2. Emails personalizados com nome do mentor preferido do lead
3. Integracao com provider de email (Resend, SendGrid, ou similar)
4. Unsubscribe funcional e LGPD compliant
5. Tracking de abertura e cliques

---

### Epic 4: Members Area & Program Delivery

**Goal:** Entregar a experiencia premium do programa pago — area de membros com modulos em video, progresso rastreado, acesso ilimitado aos 7 mentores IA, e integracao com calls ao vivo e comunidade.

#### Story 4.1: Authentication & Protected Routes
> Como aluno pago,
> quero fazer login seguro e acessar minha area exclusiva,
> para que somente eu tenha acesso ao conteudo do programa.

**Acceptance Criteria:**
1. Autenticacao via Supabase Auth (email + senha)
2. Login/registro com verificacao de email
3. Rotas protegidas para /members/*
4. Redirect para login se nao autenticado
5. Verificacao de status de pagamento ativo
6. Reset de senha funcional
7. Sessao persistente (nao precisa logar toda vez)

#### Story 4.2: Student Dashboard & Module Progress
> Como aluno,
> quero ver meu progresso no programa e acessar os modulos facilmente,
> para que eu saiba onde parei e o que falta completar.

**Acceptance Criteria:**
1. Dashboard com barra de progresso geral (% do programa completo)
2. Lista de 6 modulos com status (bloqueado/disponivel/em andamento/completo)
3. Cada modulo mostra: titulo, descricao, mentor principal, numero de licoes
4. Licoes dentro de cada modulo com video + exercicio + agente mentor
5. Marcacao automatica de licao completa ao assistir video
6. Modulos desbloqueiam sequencialmente (ou todos abertos - decisao de negocio)
7. Design premium consistente com landing page

#### Story 4.3: Unlimited AI Mentors for Members
> Como aluno pago,
> quero ter acesso ilimitado a todos os 7 mentores IA,
> para que eu possa aprender e tirar duvidas 24/7 sem restricoes.

**Acceptance Criteria:**
1. Mesma interface de chat dos mentores, sem limite de mensagens
2. Historico completo de todas conversas salvo e acessivel
3. Mentores em modo "programa" (conhecem o conteudo dos modulos, referenciam licoes)
4. Possibilidade de pedir ao mentor para revisar exercicios/trabalhos
5. Mentores podem sugerir proxima licao baseado na conversa
6. Acesso a todos 7 mentores simultaneamente (trocar livremente)

---

### Epic 5: Admin Dashboard & Analytics

**Goal:** Dar a Silvia visibilidade total sobre a operacao — quantos visitantes, leads, conversoes, quais mentores performam melhor, e insights para otimizacao continua.

#### Story 5.1: Admin Dashboard - Metrics & Leads
> Como Silvia (admin),
> quero ver metricas-chave e lista de leads em tempo real,
> para que eu possa tomar decisoes informadas e fazer follow-up.

**Acceptance Criteria:**
1. Dashboard protegido (somente admin) em /admin
2. Metricas em cards: visitantes hoje, leads hoje, conversoes, receita
3. Grafico de funil: visitantes > conversas > leads > vendas
4. Lista de leads com: nome, email, nivel, mentor preferido, data, status
5. Filtros por periodo, nivel, e mentor
6. Export CSV da lista de leads
7. Indicadores de performance por mentor (qual converte mais)

#### Story 5.2: Conversation Monitor & Agent Analytics
> Como Silvia (admin),
> quero poder ver conversas dos agentes e entender como estao performando,
> para que eu possa melhorar os prompts e a experiencia.

**Acceptance Criteria:**
1. Lista de conversas recentes com preview
2. Viewer de conversa completa (todas mensagens)
3. Metricas por agente: total conversas, media de mensagens, taxa de lead capture
4. Identificacao de conversas que levaram a venda vs. abandono
5. Alertas para conversas problematicas (prompt injection tentado, feedback negativo)
6. Insights: perguntas mais frequentes por mentor (para melhorar knowledge base)

---

## 10. Checklist Results Report

*A ser preenchido apos revisao com PM checklist*

---

## 11. Next Steps

### UX Expert Prompt
> Ola @ux-design-expert. Crie a arquitetura de UX/UI para o AI Mentor Academy baseado neste PRD (docs/prd-ai-mentor-academy.md). Foque em: (1) experiencia conversacional mobile-first, (2) design premium dark mode, (3) fluxo do visitante desde hero ate conversa com mentor, (4) identidade visual unica para cada um dos 7 mentores IA. Deliverable: wireframes de baixa fidelidade + design system tokens.

### Architect Prompt
> Ola @architect. Crie a arquitetura tecnica para o AI Mentor Academy baseado neste PRD (docs/prd-ai-mentor-academy.md). Stack: Next.js 14+ (App Router), Supabase (auth + DB), Claude API (agentes IA), Vercel (deploy), Hotmart (pagamentos). Foque em: (1) sistema de agentes IA com system prompts + RAG, (2) arquitetura do chat com streaming SSE, (3) schema do banco de dados, (4) integracao de pagamento via webhooks. Deliverable: Architecture Document completo.

---

*PRD gerado por Orion (AIOS Master) | AI Mentor Academy v1.0*
*Silvia Assay | 2026-02-12*
