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

// 2. Funções de Controle de Interface

/**
 * Alterna a visibilidade do Menu Lateral (Drawer) em dispositivos móveis
 */
function toggleDrawer() {
    const drawer = document.getElementById('nav-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (!drawer || !overlay) return;
    const isOpen = drawer.classList.contains('translate-x-0');

    if (isOpen) {
        drawer.classList.remove('translate-x-0');
        drawer.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        overlay.classList.remove('opacity-100');
    } else {
        drawer.classList.add('translate-x-0');
        drawer.classList.remove('-translate-x-full');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100');
    }
}

/**
 * Abre o modal "Sobre o Autor" e carrega o conteúdo Markdown do arquivo autor.md
 * @param {Event} event - O evento de clique
 */
function abrirModalAutor(event) {
    if (event) {
        event.preventDefault();
    }
    const modal = document.getElementById('modal-autor');
    const modalBody = document.getElementById('modal-autor-body');
    if (!modal || !modalBody) return;

    // Mostra o contêiner do modal
    modal.classList.remove('hidden');
    // Pequeno atraso para permitir que a transição CSS funcione
    setTimeout(() => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        const contentCard = modal.querySelector('.modal-content');
        if (contentCard) {
            contentCard.classList.remove('scale-95', 'opacity-0');
        }
    }, 10);

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

    // Carrega o arquivo autor.md da pasta raiz pública
    fetch('autor.md')
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível carregar o arquivo autor.md');
            }
            return response.text();
        })
        .then(markdownText => {
            // Verifica se a biblioteca Marked.js está disponível via CDN
            if (typeof marked !== 'undefined') {
                modalBody.innerHTML = marked.parse(markdownText);
            } else {
                // Fallback básico caso o marked.js falhe ao carregar
                modalBody.innerHTML = parseMarkdownSimple(markdownText);
            }
            modalBody.dataset.loaded = 'true';
        })
        .catch(error => {
            console.error('Erro ao carregar dados do autor:', error);
            modalBody.innerHTML = `
                <div class="p-4 bg-error-container text-on-error-container rounded-lg">
                    <p class="font-bold">Erro ao carregar informações</p>
                    <p class="text-sm">Não foi possível carregar o perfil do autor. Por favor, tente novamente.</p>
                </div>
            `;
        });
}

/**
 * Fecha o modal "Sobre o Autor"
 */
function fecharModalAutor() {
    const modal = document.getElementById('modal-autor');
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
 * Parser simples de Markdown para garantir funcionamento caso a biblioteca CDN falhe
 * @param {string} md - Texto puro em Markdown
 * @returns {string} - Código HTML gerado
 */
function parseMarkdownSimple(md) {
    return md
        .replace(/^#\s+(.*)$/gm, '<h1 class="text-headline-lg font-headline-lg text-primary border-b border-outline-variant/30 pb-2 mb-4">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-on-surface">$1</strong>')
        .replace(/\n\n/g, '</p><p class="mb-3 font-body-md text-body-md text-on-surface-variant">')
        .replace(/\n/g, '<br>')
        .replace(/^(.*)$/s, '<p class="mb-3 font-body-md text-body-md text-on-surface-variant">$1</p>');
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

    if (!tema) {
        container.innerHTML = `
            <div class="p-6 bg-error-container text-on-error-container rounded-xl shadow-md max-w-md mx-auto mt-8 text-center">
                <h2 class="font-headline-md text-headline-md font-bold mb-2">Tema não especificado</h2>
                <p class="font-body-md mb-4">Por favor, selecione um tema de tutorial válido na página inicial ou nas páginas internas.</p>
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


    // Configura o gradiente de fundo suave correspondente ao tema
    const body = document.body;
    let bgGradient = '';
    
    switch (tema) {
        case 'ambiental':
            bgGradient = 'linear-gradient(to top, rgba(153, 212, 165, 0.15) 0%, rgba(244, 250, 253, 1) 100%)';
            break;
        case 'economica':
            bgGradient = 'linear-gradient(to top, rgba(254, 243, 199, 0.25) 0%, rgba(255, 255, 255, 1) 100%)';
            break;
        case 'social':
            bgGradient = 'linear-gradient(to top, rgba(186, 230, 253, 0.2) 0%, rgba(244, 250, 253, 1) 100%)';
            break;
        default:
            bgGradient = 'linear-gradient(to top, rgba(200, 200, 200, 0.1) 0%, rgba(255, 255, 255, 1) 100%)';
    }

    if (body) {
        body.style.background = bgGradient;
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
    fetch(mdPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível carregar o arquivo do tutorial');
            }
            return response.text();
        })
        .then(markdownText => {
            // Se Marked.js estiver disponível
            if (typeof marked !== 'undefined') {
                container.innerHTML = marked.parse(markdownText);
            } else {
                // Fallback básico
                container.innerHTML = parseMarkdownSimple(markdownText);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar tutorial:', error);
            container.innerHTML = `
                <div class="p-6 bg-error-container text-on-error-container rounded-xl shadow-md max-w-md mx-auto mt-8 text-center">
                    <h2 class="font-headline-md text-headline-md font-bold mb-2">Erro de Carregamento</h2>
                    <p class="font-body-md mb-4">Não foi possível carregar o tutorial. Detalhes: ${error.message}</p>
                    <a href="index.html" class="inline-flex bg-primary text-white px-6 py-2 rounded-full text-label-md font-label-md hover:bg-primary/95 transition-all">Voltar para a Home</a>
                </div>
            `;
        });
}

// 3. Vinculação Dinâmica de Eventos (Event Listeners) após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa renderização do tutorial (se for a página tutorial.html)
    inicializarTutorial();

    // Vincular clique do menu hambúrguer no cabeçalho
    const menuBtn = document.getElementById('menu-button');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleDrawer);
    }

    // Vincular clique do overlay escurecido do menu lateral
    const drawerOverlay = document.getElementById('drawer-overlay');
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', toggleDrawer);
    }

    // Vincular clique do botão de fechar de dentro do menu lateral
    const drawerCloseBtn = document.getElementById('drawer-close');
    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', toggleDrawer);
    }

    // Vincular clique do link "Sobre o Autor" no rodapé
    const linkAutor = document.getElementById('link-autor');
    if (linkAutor) {
        linkAutor.addEventListener('click', abrirModalAutor);
    }

    // Vincular clique do overlay de desfoque do modal do autor
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', fecharModalAutor);
    }

    // Vincular clique do botão fechar (X) do modal do autor
    const modalCloseBtn = document.getElementById('modal-close');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', fecharModalAutor);
    }

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
