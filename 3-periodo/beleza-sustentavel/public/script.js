/* Configuração e Comportamento - Beleza Sustentável */

// 1. Configuração global do Tailwind CSS para todas as páginas
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "on-secondary-fixed": "#002021",
                "on-secondary-container": "#3c6c6e",
                "outline": "#717970",
                "surface-bright": "#f4fafd",
                "error-container": "#ffdad6",
                "error": "#ba1a1a",
                "on-tertiary-container": "#561e2d",
                "background": "#f4fafd",
                "tertiary-fixed-dim": "#ffb1c0",
                "on-primary": "#ffffff",
                "primary-fixed-dim": "#99d4a5",
                "secondary-fixed-dim": "#9ecfd1",
                "on-primary-fixed": "#00210c",
                "inverse-on-surface": "#ebf2f4",
                "surface-container-high": "#e2e9ec",
                "on-error": "#ffffff",
                "surface-tint": "#326943",
                "surface-variant": "#dde4e6",
                "tertiary-fixed": "#ffd9df",
                "on-background": "#161d1f",
                "primary": "#326943",
                "on-tertiary-fixed-variant": "#713342",
                "secondary-container": "#b9ecee",
                "surface-container-highest": "#dde4e6",
                "surface-dim": "#d4dbdd",
                "surface-container-lowest": "#ffffff",
                "inverse-primary": "#99d4a5",
                "secondary-fixed": "#b9ecee",
                "on-surface": "#161d1f",
                "tertiary-container": "#d18393",
                "secondary": "#356668",
                "surface-container": "#e8eff1",
                "inverse-surface": "#2b3234",
                "on-secondary-fixed-variant": "#1a4e50",
                "surface": "#f4fafd",
                "on-primary-container": "#003a1a",
                "on-tertiary": "#ffffff",
                "primary-fixed": "#b4f1bf",
                "on-tertiary-fixed": "#3a0818",
                "on-secondary": "#ffffff",
                "surface-container-low": "#eef5f7",
                "on-surface-variant": "#414941",
                "primary-container": "#6da67a",
                "outline-variant": "#c0c9be",
                "on-error-container": "#93000a",
                "on-primary-fixed-variant": "#18512d",
                "tertiary": "#8d4a59"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "spacing": {
                "gutter": "16px",
                "stack-lg": "24px",
                "stack-sm": "4px",
                "stack-md": "12px",
                "section-gap": "48px",
                "base": "8px",
                "container-margin": "20px"
            },
            "fontFamily": {
                "headline-lg": ["Manrope"],
                "label-md": ["Hanken Grotesk"],
                "label-sm": ["Hanken Grotesk"],
                "headline-md": ["Manrope"],
                "body-md": ["Hanken Grotesk"],
                "headline-xl": ["Manrope"],
                "body-lg": ["Hanken Grotesk"]
            },
            "fontSize": {
                "headline-lg": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600" }],
                "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "500" }],
                "headline-md": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                "headline-xl": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }]
            }
        },
    },
};

// 2. Funções de controle de interface

/**
 * Alterna a visibilidade do menu lateral (drawer) em dispositivos móveis
 */
function toggleDrawer() {
    const drawer = document.getElementById('nav-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (!drawer || !overlay) return;
    const isOpen = drawer.classList.toggle('translate-x-0');
    drawer.classList.toggle('-translate-x-full', !isOpen);
    overlay.classList.toggle('opacity-0', !isOpen);
    overlay.classList.toggle('pointer-events-none', !isOpen);
    overlay.classList.toggle('opacity-100', isOpen);
}

/**
 * Abre um modal genérico pelo ID com efeitos de transição
 * @param {string} modalId - ID do elemento do modal
 */
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('hidden');
    // Pequeno atraso para permitir que a transição CSS funcione
    setTimeout(() => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        const contentCard = modal.querySelector('.modal-content');
        if (contentCard) {
            contentCard.classList.remove('scale-95', 'opacity-0');
        }
    }, 10);
}

/**
 * Fecha um modal genérico pelo ID com efeitos de transição
 * @param {string} modalId - ID do elemento do modal
 */
function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('opacity-0', 'pointer-events-none');
    const contentCard = modal.querySelector('.modal-content');
    if (contentCard) {
        contentCard.classList.add('scale-95', 'opacity-0');
    }

    // Oculta o elemento após o término da transição de opacidade (300ms)
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

/**
 * Carrega um arquivo Markdown por AJAX e renderiza no contêiner especificado.
 * Suporta biblioteca marked.js ou fallback simples se marked não estiver definido.
 * @param {string} path - Caminho para o arquivo markdown (.md)
 * @param {HTMLElement|string} container - Elemento contêiner do DOM ou seu ID
 * @param {function} [onSuccess] - Callback opcional executado após o carregamento e renderização bem-sucedidos
 * @param {function} [onError] - Callback opcional executado se ocorrer um erro durante o fetch ou parse
 */
function carregarERenderizarMarkdown(path, container, onSuccess, onError) {
    const el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) {
        console.error('Contêiner não encontrado para renderização:', container);
        return;
    }

    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Não foi possível carregar o arquivo: ${path}`);
            }
            return response.text();
        })
        .then(markdownText => {
            if (typeof marked !== 'undefined') {
                el.innerHTML = marked.parse(markdownText);
            } else {
                el.innerHTML = parseMarkdownSimple(markdownText);
            }
            if (typeof onSuccess === 'function') {
                onSuccess();
            }
        })
        .catch(error => {
            console.error(`Erro ao carregar Markdown (${path}):`, error);
            if (typeof onError === 'function') {
                onError(error);
            }
        });
}

/**
 * Abre o modal "sobre o autor" e carrega o conteúdo Markdown do arquivo autor.md
 * @param {Event} event - O evento de clique
 */
function abrirModalAutor(event) {
    if (event) {
        event.preventDefault();
    }
    abrirModal('modal-autor');

    const modalBody = document.getElementById('modal-autor-body');
    if (!modalBody) return;

    // Se o conteúdo já foi carregado anteriormente, não faz a requisição novamente
    if (modalBody.dataset.loaded === 'true') {
        return;
    }

    // Exibe indicador de carregamento
    modalBody.innerHTML = `
        <div class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span class="ml-3 text-on-surface-variant font-label-md">Carregando dados...</span>
        </div>
    `;

    carregarERenderizarMarkdown('autor.md', modalBody, 
        () => {
            modalBody.dataset.loaded = 'true';
        },
        (error) => {
            modalBody.innerHTML = `
                <div class="p-4 bg-error-container text-on-error-container rounded-lg">
                    <p class="font-bold">Erro ao carregar informações</p>
                    <p class="text-sm">Não foi possível carregar o perfil do autor. Por favor, tente novamente.</p>
                </div>
            `;
        }
    );
}

/**
 * Fecha o modal "sobre o autor"
 */
function fecharModalAutor() {
    fecharModal('modal-autor');
}

function parseMarkdownSimple(md) {
    // Helper function for inline formatting
    const parseInline = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-on-surface">$1</strong>')
            .replace(/`([^`]+)`/g, '<code class="bg-surface-variant/50 px-1 rounded font-mono text-sm">$1</code>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank">$1</a>');
    };

    const blocks = md.split(/\n\n+/);
    const htmlBlocks = blocks.map(block => {
        block = block.trim();
        if (!block) return '';
        
        // 1. Bloco de código
        if (block.startsWith('```')) {
            const lines = block.split('\n');
            const codeLines = lines.slice(1, lines.length - (lines[lines.length - 1] === '```' ? 1 : 0));
            const codeText = codeLines.join('\n')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            return `<pre class="bg-surface-container-high/40 p-4 rounded-xl font-mono text-sm overflow-x-auto my-4 border border-outline-variant/20"><code class="text-on-surface-variant">${codeText}</code></pre>`;
        }

        // 2. Linha horizontal
        if (block === '---' || block === '***') {
            return `<hr class="my-6 border-t border-outline-variant/30">`;
        }

        // 3. Títulos (H1, H2, H3)
        if (block.startsWith('# ')) {
            return `<h1 class="text-headline-lg font-headline-lg text-primary border-b border-outline-variant/30 pb-2 mb-4">${parseInline(block.substring(2))}</h1>`;
        }
        if (block.startsWith('## ')) {
            return `<h2 class="text-headline-md font-headline-md text-secondary mb-3">${parseInline(block.substring(3))}</h2>`;
        }
        if (block.startsWith('### ')) {
            return `<h3 class="text-body-lg font-bold text-secondary mb-2">${parseInline(block.substring(4))}</h3>`;
        }
        
        // 4. Listas não ordenadas
        if (block.startsWith('- ') || block.startsWith('* ') || block.startsWith('+ ') || /^\s+[-*+]\s+/.test(block)) {
            const lines = block.split(/\n/);
            const items = [];
            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || trimmedLine.startsWith('+ ')) {
                    const cleanItem = trimmedLine.replace(/^[-*+]\s+/, '');
                    items.push(`<li class="mb-1 font-body-md text-body-md text-on-surface-variant">${parseInline(cleanItem)}</li>`);
                } else if (trimmedLine && items.length > 0) {
                    items[items.length - 1] = items[items.length - 1].replace('</li>', `<br>${parseInline(trimmedLine)}</li>`);
                }
            });
            return `<ul class="list-disc ml-6 mb-4">${items.join('')}</ul>`;
        }

        // 5. Listas ordenadas
        if (/^\d+\.\s+/.test(block)) {
            const lines = block.split(/\n/);
            const items = [];
            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (/^\d+\.\s+/.test(trimmedLine)) {
                    const cleanItem = trimmedLine.replace(/^\d+\.\s+/, '');
                    items.push(`<li class="mb-1 font-body-md text-body-md text-on-surface-variant">${parseInline(cleanItem)}</li>`);
                } else if (trimmedLine && items.length > 0) {
                    items[items.length - 1] = items[items.length - 1].replace('</li>', `<br>${parseInline(trimmedLine)}</li>`);
                }
            });
            return `<ol class="list-decimal ml-6 mb-4">${items.join('')}</ol>`;
        }

        // 6. Parágrafo padrão
        const formattedBlock = parseInline(block).replace(/\n/g, '<br>');
        return `<p class="mb-3 font-body-md text-body-md text-on-surface-variant">${formattedBlock}</p>`;
    });
    return htmlBlocks.filter(b => b).join('');
}

/**
 * Inicializa a renderização dinâmica do tutorial na página tutorial.html
 */
function inicializarTutorial() {
    const container = document.getElementById('tutorial-content');
    if (!container) return;

    // Obtém o tema da query string (ex: tutorial.html?tema=ambiental)
    const urlParams = new URLSearchParams(window.location.search);
    const tema = urlParams.get('tema');

    // Validação estrita para evitar path traversal e DOM-based XSS
    if (!tema || !/^[a-zA-Z0-9_-]+$/.test(tema)) {
        container.innerHTML = `
            <div class="p-6 bg-error-container text-on-error-container rounded-xl shadow-md max-w-md mx-auto mt-8 text-center">
                <h2 class="font-headline-md text-headline-md font-bold mb-2">Tema Inválido</h2>
                <p class="font-body-md mb-4">O tema solicitado não foi especificado ou contém caracteres inválidos.</p>
                <a href="index.html" class="inline-flex bg-primary text-white px-6 py-2 rounded-full text-label-md font-label-md hover:bg-primary/95 transition-all">Voltar para a Home</a>
            </div>
        `;
        return;
    }

    // Configura os links de voltar dinamicamente para a página de origem do tema
    const botoesVoltar = document.querySelectorAll('.btn-voltar');
    botoesVoltar.forEach(btn => {
        if (tema === 'ambiental' || tema === 'economica' || tema === 'social') {
            btn.href = `${tema}.html`;
        } else {
            btn.href = 'index.html';
        }

        // Se a página foi aberta em uma nova aba (com window.opener ou history.length === 1), fecha a aba ao clicar
        btn.addEventListener('click', (event) => {
            if (window.opener || window.history.length === 1) {
                event.preventDefault();
                window.close();
                
                // Fallback: se o fechamento for bloqueado pelo navegador, redireciona pelo link
                setTimeout(() => {
                    window.location.href = btn.href;
                }, 150);
            }
        });
    });

    // Configura a classe de tema correspondente no body
    const body = document.body;
    if (body) {
        // Remove classes de tema anteriores
        body.classList.remove('theme-ambiental', 'theme-economica', 'theme-social');
        
        if (tema === 'ambiental' || tema === 'economica' || tema === 'social') {
            body.classList.add(`theme-${tema}`);
            body.style.background = ''; // Garante que estilos inline não sobrescrevam a classe CSS
        } else {
            // Caso seja o readme ou outro, aplica o gradiente padrão
            body.style.background = 'linear-gradient(to top, rgba(200, 200, 200, 0.1) 0%, rgba(255, 255, 255, 1) 100%)';
        }
    }

    // Exibe indicador de carregamento
    container.innerHTML = `
        <div class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span class="ml-4 text-on-surface-variant font-label-md">Carregando tutorial...</span>
        </div>
    `;

    // Define o caminho do arquivo Markdown (tutoriais normais ficam na subpasta, o readme fica na raiz)
    const mdPath = tema === 'readme' ? 'readme.md' : `tutoriais/${tema}.md`;

    // Carrega o arquivo Markdown
    carregarERenderizarMarkdown(mdPath, container, null, (error) => {
        container.innerHTML = `
            <div class="p-6 bg-error-container text-on-error-container rounded-xl shadow-md max-w-md mx-auto mt-8 text-center">
                <h2 class="font-headline-md text-headline-md font-bold mb-2">Erro de Carregamento</h2>
                <p class="font-body-md mb-4">Não foi possível carregar o tutorial. Detalhes: <span id="error-details"></span></p>
                <a href="index.html" class="inline-flex bg-primary text-white px-6 py-2 rounded-full text-label-md font-label-md hover:bg-primary/95 transition-all">Voltar para a Home</a>
            </div>
        `;
        const detailsSpan = document.getElementById('error-details');
        if (detailsSpan) {
            detailsSpan.textContent = error.message;
        }
    });
}

// 3. Vinculação dinâmica de eventos (event listeners) após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa renderização do tutorial (se for a página tutorial.html)
    inicializarTutorial();

    // Vincular controle de abertura/fechamento do menu lateral
    ['menu-button', 'drawer-overlay', 'drawer-close'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', toggleDrawer);
    });

    // Vincular clique do link "sobre o autor" no rodapé
    const linkAutor = document.getElementById('link-autor');
    if (linkAutor) {
        linkAutor.addEventListener('click', abrirModalAutor);
    }

    // Vincular controle de fechamento do modal do autor
    ['modal-overlay', 'modal-close'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', fecharModalAutor);
    });

    // Vincular cliques nos links do tutorial para abrir em nova aba programaticamente
    // Isso garante a permissão para fechar a aba com window.close()
    const linksTutorial = document.querySelectorAll('a[href*="tutorial.html?tema="]');
    linksTutorial.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.open(link.href, '_blank');
        });
    });
});

// Adiciona efeito de elevação/sombra ao cabeçalho ao rolar a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    }
});
