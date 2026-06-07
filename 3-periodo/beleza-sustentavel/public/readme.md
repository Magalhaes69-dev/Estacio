# Beleza Sustentável — Apresentação do projeto

Bem-vindo ao projeto **Beleza Sustentável**, uma iniciativa dedicada a transformar salões de beleza e barbearias através de práticas de gestão ecoeficientes e sustentáveis.

---

## Pilares do projeto

O projeto baseia-se em três pilares essenciais de sustentabilidade, integrados para reduzir o impacto ecológico e impulsionar a eficiência financeira e o bem-estar comunitário:

1. **Sustentabilidade ambiental**
   * **Gestão sem papel:** Transição para agendamentos e comandas digitais para eliminar resíduos.
   * **Ecoeficiência:** Redução no consumo de eletricidade (iluminação LED, painéis fotovoltaicos) e água (uso de aeradores e torneiras de baixo fluxo).
   * **Economia circular:** Destinação inovadora de resíduos, como cabelos cortados para a fabricação de mantas absorventes de óleo ou fertilizantes agrícolas.
   * **Descarte seguro:** Coleta seletiva e contenção de sobras químicas para evitar contaminação do solo e dos recursos hídricos.

2. **Sustentabilidade econômica**
   * **Fluxo de caixa e controle de custos:** Registro diário de receitas e despesas em planilhas ou softwares para manter a saúde financeira e separar contas.
   * **Precificação estratégica:** Cálculo dos custos fixos e variáveis para garantir margens de lucro justas e receitas previsíveis.
   * **Redução de desperdícios:** Dosagem exata de cosméticos nos procedimentos e compras coletivas locais para diminuir custos unitários de estoque.
   * **Integração tecnológica:** Agendamento eletrônico automatizado para mitigar faltas e otimizar a produtividade diária.

3. **Sustentabilidade social**
   * **Diversidade e inclusão:** Acessibilidade arquitetônica simples e atendimento democrático para todos os tipos de pessoas e cabelos.
   * **Saúde ocupacional:** Equipamentos ergonômicos e pausas preventivas ativas para evitar lesões de esforço na equipe de colaboradores.
   * **Parcerias comunitárias:** Doação de cabelos para perucas oncológicas e cortes solidários integrados com a vizinhança.
   * **Relações justas:** Contratos éticos e transparentes de salão parceiro aliada a programas de capacitação técnica contínua.

---

## Detalhes de desenvolvimento técnico

### Arquitetura JavaScript modular e segurança (`public/script.js`)
A lógica de programação do portal foi estruturada para seguir padrões de reuso, alto desempenho e segurança (OWASP):
* **`carregarERenderizarMarkdown(path, container, onSuccess, onError)`**: Função unificada para carregar via AJAX (`fetch`) arquivos Markdown e realizar o parse (usando **Marked.js** como motor primário ou uma rotina simplificada como fallback local). Usada para carregar a seção do autor, tutoriais e este README.
* **`abrirModal(modalId)` / `fecharModal(modalId)`**: Rotinas genéricas para gerenciar a abertura e fechamento de janelas modais com efeitos de transição CSS (desfoque, opacidade e escala).
* **Prevenção de XSS e Path Traversal:** Implementação de sanitização estrita no parâmetro de URL `tema` usando a expressão regular `/^[a-zA-Z0-9_-]+$/`. Qualquer caractere não permitido rejeita a requisição, mitigando tentativas de directory traversal e injeção de scripts (XSS). Além disso, a exibição de logs de erro dinâmicos utiliza a propriedade `.textContent` ao invés de `.innerHTML`, impedindo a interpretação de códigos injetados pelo navegador.

### Layout responsivo e ordenamento mobile (`public/index.html`)
A Home Page utiliza um sistema de grid responsivo com Tailwind CSS (`grid-cols-1 md:grid-cols-12`) e efeitos de profundidade e zoom no hover. Para otimizar a experiência em dispositivos móveis, foi configurado o ordenamento de exibição alternado:
* **Grid alternado no desktop:** As seções de conteúdo organizam-se visualmente entre texto à esquerda/imagem à direita (Seção 1 e Seção 3) e imagem à esquerda/texto à direita (Seção 2).
* **Ordenamento no mobile:** Utilização de classes responsivas de ordem (`order-2 md:order-1` e `order-1 md:order-2`) para garantir que em telas de celular a imagem sempre anteceda o texto de sua respectiva seção (salao -> chamada ambiental, barbeiro -> chamada social, cabeleireira -> chamada economica).

### Tutoriais dinâmicos (`public/tutorial.html`)
O carregamento de tutoriais ocorre de forma assíncrona. O arquivo [tutorial.html] atua como um template que lê o parâmetro da URL (`?tema=...`), mapeia para o respectivo arquivo `.md` (em `public/tutoriais/` ou na raiz) e injeta o HTML correspondente na página.

---

## Guia de execução local e servidor

Para rodar a aplicação localmente com suporte à busca de arquivos AJAX (`fetch`), é necessário executá-la através de um servidor HTTP (caso contrário, o navegador bloqueará requisições locais por políticas de CORS).

### 1. Inicializar servidor local
Você pode utilizar qualquer servidor local estático de sua preferência. Alguns exemplos rápidos:

**Usando Node.js (npx):**
```bash
npx live-server public
# ou
npx http-server public
```

**Usando Python (padrão):**
```bash
python -m http.server 8000 --directory public
```

### 2. Implantar no Firebase (Deploy)
O projeto está configurado para deploy estático no **Firebase Hosting** com foco em otimização de URLs e segurança ativa.
1. **Configuração de URLs limpas:** Mapeamento de `"cleanUrls": true` no `firebase.json` para suportar URLs amigáveis sem a extensão `.html`.
2. **Cabeçalhos de Segurança (Hardenização):** Configuração de cabeçalhos HTTP no servidor para blindagem da aplicação em produção contra os principais vetores de ataque OWASP:
   * `X-Frame-Options: SAMEORIGIN` (mitiga clickjacking).
   * `X-Content-Type-Options: nosniff` (impede sniff de MIME-type).
   * `X-XSS-Protection: 1; mode=block` (filtro XSS ativo).
   * `Referrer-Policy: strict-origin-when-cross-origin` (segurança de referrers).
   * `Permissions-Policy` (bloqueio preventivo de recursos de câmera/microfone/geolocalização).
3. **Instalação e Deploy:**
   * Faça login e instale o CLI: `npm install -g firebase-tools` e `firebase login`.
   * Inicialize o projeto: `firebase init hosting` (apontando a pasta `public` como diretório público).
   * Execute o deploy: `firebase deploy`.

---

## Suíte de testes de validação

Para garantir a qualidade, acessibilidade e integridade de links/imagens, criamos testes automáticos em Python localizados na pasta `public/testes/`. Os scripts não possuem dependências externas complexas (usam a biblioteca nativa `html.parser` do Python), garantindo execução instantânea e simplificada.

Para evitar o envio de scripts de teste desnecessários e proteger o código de validação, o arquivo de configuração `firebase.json` está configurado para ignorar a pasta `testes/` durante o deploy no Google Firebase Hosting.

### Como executar os testes
Navegue até a raiz do projeto e execute no terminal:

```bash
# Executa todos os testes unitários
python -m unittest discover -s public/testes
```

Ou execute cada arquivo de teste individualmente:

```bash
# Teste de Estrutura Semântica e Ordem de Scripts
python public/testes/test_estrutura.py

# Teste de Regras de Acessibilidade (alt em img, aria-label em buttons)
python public/testes/test_acessibilidade.py

# Teste de Integridade de Caminhos e Links Locais
python public/testes/test_imagens_links.py
```

---

## Fontes de consulta para produção de conteúdo

### Assuntos da disciplina Sistemas de Informação e Sociedade (Universidade Estácio de Sá)
* Sistemas de Informação
* O Povo brasileiro e a questão do negro e do indígena
* Meio ambiente e sociedade
* Fundamentação histórica dos direitos humanos

### Materiais de apoio técnico e artigos de referência:
* **BOBBIO, Norberto.** A Era dos Direitos. Tradução de Carlos Nelson Coutinho. Rio de Janeiro: Campus, 1992.
* **CENTRO SEBRAE DE SUSTENTABILIDADE (CSS).** Boas Práticas de Sustentabilidade para Salões de Beleza. Sebrae MT, Cuiabá, 2021. Disponível em: https://sustentabilidade.sebrae.com.br/.
* **CENTRO SEBRAE DE SUSTENTABILIDADE (CSS).** Relatório de Sustentabilidade no Setor de Beleza e Estética. Cuiabá: Sebrae MT, 2022. Disponível em: https://sustentabilidade.sebrae.com.br/.
* **GOMES, L. F.; OLIVEIRA, R. M.** O uso de tutoriais online e materiais de fácil leitura na capacitação digital de microempreendedores. Revista de Tecnologia da Informação e Sociedade, v. 8, n. 1, p. 102-115, 2024. Disponível em: https://portalperiodicos.unesp.br/.
* **INSTITUTO BRASILEIRO DE GEOGRAFIA E ESTATÍSTICA (IBGE).** Pesquisa Anual de Serviços (PAS). Rio de Janeiro: IBGE, 2023. Disponível em: https://www.ibge.gov.br/.
* **MINISTÉRIO DA CIÊNCIA, TECNOLOGIA E INOVAÇÃO (MCTI).** Inclusão digital e capacitação tecnológica para micro e pequenas empresas. Cadernos de Políticas Públicas. Brasília: MCTI, 2022. Disponível em: https://www.gov.br/mcti/.
* **ORGANIZAÇÃO DAS NAÇÕES UNIDAS (ONU).** Transformando Nosso Mundo: A Agenda 2030 para o Desenvolvimento Sustentável. Nova York: ONU, 2015. Disponível em: https://brasil.un.org/.
* **PEREIRA, G. S.; SOUZA, M. A.** Desafios na adoção de sistemas de informação em microempresas de serviços de beleza. Revista de Gestão e Tecnologia (ReGeT), v. 12, n. 2, p. 45-58, 2023. Disponível em: https://portalperiodicos.unesp.br/.
* **REZENDE, Denis Alcides.** Sistemas de informações organizacionais: guia prático para projetos em cursos de tecnologia da informação. 6. ed. São Paulo: Atlas, 2016.
* **SEBRAE.** A digitalização das micro e pequenas empresas brasileiras. Relatório de Pesquisa Institucional. Sebrae Nacional, Brasília, 2024. Disponível em: https://www.sebrae.com.br/.
* **SEBRAE.** Perfil do Microempreendedor Individual no Setor de Beleza e Estética. Sebrae Nacional, Brasília, 2023. Disponível em: https://www.sebrae.com.br/.
* **SILVA, A. S. et al.** Adoção de tecnologia e ferramentas digitais para o agendamento em pequenos negócios de estética. Revista de Sistemas de Informação da UNESP, v. 15, n. 2, p. 89-102, 2024. Disponível em: https://portalperiodicos.unesp.br/.
* **SOUZA, R. F. et al.** Gestão de resíduos químicos e logística reversa em salões de beleza e barbearias: uma análise socioambiental. Revista Brasileira de Ciências Ambientais, n. 58, p. 112-125, 2022. Disponível em: http://www.scielo.br/.

