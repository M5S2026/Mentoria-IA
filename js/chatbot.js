/* =============================================
   CHATBOT WIDGET - silviaassay.com
   100% Frontend - Zero API Cost
   ============================================= */

(function () {
    'use strict';

    // ---- Knowledge Base ----
    const knowledge = {
        greetings: {
            keywords: ['oi', 'ola', 'olá', 'hey', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hi', 'eai', 'e ai'],
            response: 'Oi! Bem-vindo(a) ao site da Silvia Assay! Como posso te ajudar hoje?',
            suggestions: ['Mentoria', 'Produtos', 'Curso Claude Code', 'Precos']
        },
        mentoria: {
            keywords: ['mentoria', 'workshop', 'intensiva', 'intensivo', 'mentor', 'mentorar'],
            response: 'A <strong>Mentoria Intensiva em IA</strong> e um workshop online de 2 dias (16h totais). Voce aprende a criar agentes de IA, usar Claude Code e construir automacoes. Inclui gravacoes com acesso lifetime!<br><br>Investimento: <strong>R$ 1.997</strong> (parcelavel em 12x).<br><br><a href="pages/mentoria.html">Saiba mais sobre a Mentoria</a>',
            suggestions: ['Preco', 'Garantia', 'Parcelamento', 'Contato']
        },
        preco: {
            keywords: ['preco', 'preço', 'valor', 'quanto', 'custa', 'investimento', 'precos', 'valores'],
            response: 'Nossos valores:<br><br>- <strong>Mentoria Intensiva:</strong> R$ 1.997<br>- <strong>ChatGPT Mastery:</strong> R$ 297<br>- <strong>IA para Negocios:</strong> R$ 597<br>- <strong>IA para Criadores:</strong> R$ 797<br><br>Todos parcelaveis em ate 12x sem juros!<br><br><a href="pages/produtos.html">Ver todos os produtos</a>',
            suggestions: ['Mentoria', 'Parcelamento', 'Garantia']
        },
        curso: {
            keywords: ['curso', 'claude code', 'claude', 'modulo', 'modulos', 'aula', 'aulas'],
            response: 'O <strong>Curso Claude Code</strong> ensina voce a dominar a ferramenta de IA mais poderosa para desenvolvimento. Conteudo 100% pratico com projetos reais.<br><br><a href="pages/curso-claude-code.html">Acessar pagina do curso</a>',
            suggestions: ['Precos', 'Mentoria', 'Produtos']
        },
        chatgpt: {
            keywords: ['chatgpt', 'gpt', 'mastery'],
            response: 'O <strong>ChatGPT Mastery</strong> e nosso curso basico com 5 modulos completos, 30+ templates prontos e acesso lifetime. Ideal para quem quer dominar o ChatGPT do zero ao avancado.<br><br>Investimento: <strong>R$ 297</strong><br><br><a href="pages/produtos.html#chatgpt">Ver detalhes</a>',
            suggestions: ['Outros produtos', 'Garantia', 'Parcelamento']
        },
        negocio: {
            keywords: ['negocio', 'negocios', 'negócio', 'negócios', 'empresarial', 'empresa'],
            response: 'O <strong>IA para Negocios</strong> traz 8 modulos estrategicos com case studies reais, templates de negocio e comunidade exclusiva. Para quem quer implementar IA e aumentar receita.<br><br>Investimento: <strong>R$ 597</strong><br><br><a href="pages/produtos.html#negocio">Ver detalhes</a>',
            suggestions: ['Outros produtos', 'Mentoria', 'Garantia']
        },
        criadores: {
            keywords: ['criador', 'criadores', 'conteudo', 'conteúdo', 'video', 'imagem', 'criativo'],
            response: 'O <strong>IA para Criadores</strong> tem 10 modulos praticos para transformar imagens, videos, audio e textos com IA. Crie conteudo viral em minutos!<br><br>Investimento: <strong>R$ 797</strong><br><br><a href="pages/produtos.html#criadores">Ver detalhes</a>',
            suggestions: ['Outros produtos', 'Mentoria', 'Precos']
        },
        produtos: {
            keywords: ['produto', 'produtos', 'cursos', 'catalogo', 'outros produtos'],
            response: 'Temos 3 produtos digitais + mentoria:<br><br>1. <strong>ChatGPT Mastery</strong> - R$ 297 (basico)<br>2. <strong>IA para Negocios</strong> - R$ 597 (intermediario)<br>3. <strong>IA para Criadores</strong> - R$ 797 (avancado)<br>4. <strong>Mentoria Intensiva</strong> - R$ 1.997<br><br><a href="pages/produtos.html">Ver todos os produtos</a>',
            suggestions: ['Mentoria', 'Precos', 'Garantia']
        },
        garantia: {
            keywords: ['garantia', 'reembolso', 'devolver', 'devolucao', 'arrependimento', 'satisfacao'],
            response: 'Sim! Oferecemos <strong>garantia de 7 dias</strong>. Se voce nao estiver 100% satisfeito, devolvemos o valor integral, sem perguntas. Sua satisfacao e nossa prioridade!',
            suggestions: ['Mentoria', 'Produtos', 'Contato']
        },
        parcelamento: {
            keywords: ['parcela', 'parcelar', 'parcelamento', 'cartao', 'cartão', 'pagamento', 'pagar', '12x'],
            response: 'Voce pode parcelar em ate <strong>12x sem juros</strong> no cartao de credito via Hotmart. As opcoes de parcelamento aparecem no checkout!',
            suggestions: ['Precos', 'Garantia', 'Contato']
        },
        suporte: {
            keywords: ['suporte', 'ajuda', 'duvida', 'dúvida', 'atendimento', 'apoio'],
            response: 'Apos a compra, voce tem <strong>30 dias de suporte por email</strong> para duvidas sobre implementacao, alem de acesso a comunidade exclusiva de alunos.<br><br>Para duvidas gerais: <a href="mailto:silviaassay@gmail.com">silviaassay@gmail.com</a>',
            suggestions: ['Mentoria', 'Produtos', 'Contato']
        },
        sobre: {
            keywords: ['silvia', 'quem', 'sobre', 'biografia', 'experiencia', 'especialista'],
            response: 'Silvia Assay e especialista em Inteligencia Artificial para lideres e profissionais. Ja transformou a carreira de mais de 500 profissionais e atendeu mais de 50 empresas.<br><br><a href="pages/sobre.html">Conheca mais sobre a Silvia</a>',
            suggestions: ['Mentoria', 'Produtos', 'Contato']
        },
        calculadora: {
            keywords: ['calculadora', 'orcamento', 'orçamento', 'calcular', 'estimar'],
            response: 'Temos uma <strong>Calculadora de Orcamento de IA</strong> gratuita para ajudar voce a estimar custos de implementacao.<br><br><a href="pages/calculadora.html">Acessar calculadora</a>',
            suggestions: ['Mentoria', 'Produtos', 'Contato']
        },
        contato: {
            keywords: ['contato', 'email', 'whatsapp', 'falar', 'conversar', 'ligar', 'telefone'],
            response: 'Voce pode entrar em contato por:<br><br>- <strong>Email:</strong> <a href="mailto:silviaassay@gmail.com">silviaassay@gmail.com</a><br>- <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/silviaassay" target="_blank">linkedin.com/in/silviaassay</a><br>- <strong>Instagram:</strong> <a href="https://instagram.com/silviaassay" target="_blank">@silviaassay</a><br><br>Ou use o formulario de contato no final da pagina!',
            suggestions: ['Mentoria', 'Produtos', 'Sobre']
        },
        agradecimento: {
            keywords: ['obrigado', 'obrigada', 'valeu', 'thanks', 'brigado', 'brigada'],
            response: 'De nada! Fico feliz em ajudar. Se tiver mais alguma duvida, e so perguntar!',
            suggestions: ['Mentoria', 'Produtos', 'Contato']
        }
    };

    const fallbackResponse = {
        response: 'Hmm, nao tenho certeza sobre isso. Posso te ajudar com informacoes sobre nossos <strong>produtos</strong>, <strong>mentoria</strong>, <strong>precos</strong> ou <strong>contato</strong>.<br><br>Ou fale diretamente conosco: <a href="mailto:silviaassay@gmail.com">silviaassay@gmail.com</a>',
        suggestions: ['Mentoria', 'Produtos', 'Precos', 'Contato']
    };

    // ---- Normalize text ----
    function normalize(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s]/g, '')
            .trim();
    }

    // ---- Find best match ----
    function findResponse(input) {
        const normalized = normalize(input);
        const words = normalized.split(/\s+/);

        let bestMatch = null;
        let bestScore = 0;

        for (const [, entry] of Object.entries(knowledge)) {
            let score = 0;
            for (const keyword of entry.keywords) {
                const normKey = normalize(keyword);
                if (normalized === normKey) {
                    score += 10;
                } else if (normalized.includes(normKey)) {
                    score += 5;
                } else if (words.some(w => normKey.includes(w) && w.length > 2)) {
                    score += 2;
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }

        return bestScore > 0 ? bestMatch : fallbackResponse;
    }

    // ---- Build Widget HTML ----
    function createWidget() {
        // Toggle button
        const toggle = document.createElement('button');
        toggle.className = 'chatbot-toggle';
        toggle.setAttribute('aria-label', 'Abrir chat');
        toggle.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>`;

        // Window
        const win = document.createElement('div');
        win.className = 'chatbot-window';
        win.innerHTML = `
            <div class="chatbot-header">
                <div class="chatbot-avatar">SA</div>
                <div class="chatbot-header-info">
                    <h4>Assistente Silvia Assay</h4>
                    <span>Online agora</span>
                </div>
                <button class="chatbot-close" aria-label="Fechar chat">&times;</button>
            </div>
            <div class="chatbot-messages" id="chatbot-messages"></div>
            <div class="chatbot-input">
                <input type="text" id="chatbot-input" placeholder="Digite sua mensagem..." autocomplete="off">
                <button id="chatbot-send" aria-label="Enviar">
                    <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </div>
        `;

        document.body.appendChild(toggle);
        document.body.appendChild(win);

        return { toggle, win };
    }

    // ---- Chat Logic ----
    function initChat() {
        const { toggle, win } = createWidget();
        const messages = win.querySelector('#chatbot-messages');
        const input = win.querySelector('#chatbot-input');
        const sendBtn = win.querySelector('#chatbot-send');
        const closeBtn = win.querySelector('.chatbot-close');

        let isOpen = false;

        function toggleChat() {
            isOpen = !isOpen;
            win.classList.toggle('open', isOpen);
            toggle.classList.toggle('active', isOpen);
            toggle.setAttribute('aria-label', isOpen ? 'Fechar chat' : 'Abrir chat');
            if (isOpen) {
                input.focus();
                if (messages.children.length === 0) {
                    showWelcome();
                }
            }
        }

        function showWelcome() {
            addBotMessage('Oi! Sou a assistente virtual da Silvia Assay. Como posso te ajudar?');
            addSuggestions(['Mentoria', 'Produtos', 'Curso Claude Code', 'Precos']);
        }

        function addUserMessage(text) {
            const div = document.createElement('div');
            div.className = 'chatbot-msg user';
            div.textContent = text;
            messages.appendChild(div);
            scrollToBottom();
        }

        function addBotMessage(html) {
            const div = document.createElement('div');
            div.className = 'chatbot-msg bot';
            div.innerHTML = html;
            messages.appendChild(div);
            scrollToBottom();
        }

        function addSuggestions(items) {
            const container = document.createElement('div');
            container.className = 'chatbot-suggestions';
            items.forEach(function (text) {
                const btn = document.createElement('button');
                btn.textContent = text;
                btn.addEventListener('click', function () {
                    handleInput(text);
                    container.remove();
                });
                container.appendChild(btn);
            });
            messages.appendChild(container);
            scrollToBottom();
        }

        function showTyping() {
            const typing = document.createElement('div');
            typing.className = 'chatbot-typing';
            typing.id = 'chatbot-typing';
            typing.innerHTML = '<span></span><span></span><span></span>';
            messages.appendChild(typing);
            scrollToBottom();
            return typing;
        }

        function scrollToBottom() {
            messages.scrollTop = messages.scrollHeight;
        }

        function handleInput(text) {
            if (!text.trim()) return;

            addUserMessage(text);

            // Remove any existing suggestions
            var oldSuggestions = messages.querySelectorAll('.chatbot-suggestions');
            oldSuggestions.forEach(function (s) { s.remove(); });

            var typing = showTyping();

            setTimeout(function () {
                typing.remove();
                var result = findResponse(text);
                addBotMessage(result.response);
                if (result.suggestions) {
                    addSuggestions(result.suggestions);
                }
            }, 600 + Math.random() * 400);
        }

        // Events
        toggle.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        sendBtn.addEventListener('click', function () {
            handleInput(input.value);
            input.value = '';
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                handleInput(input.value);
                input.value = '';
            }
        });
    }

    // ---- Init on DOM ready ----
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChat);
    } else {
        initChat();
    }
})();
