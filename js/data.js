/* ==========================================================================
   Arquivo: js/data.js
   Data/Hora: 02/11/2026 00:34
   O que é: Base de dados estruturada e 100% verificada do portfólio comercial
   e técnico de Mattheus Moraes.
   O que foi feito e finalidade de cada bloco:
     1. Identidade Pessoal Mattheus Moraes: Centraliza canais oficiais, GitHub,
        LinkedIn, WhatsApp, e-mail e currículos em PDF sem apelidos na marca.
     2. Metadados do Interactive Studio Frame (STUDIO_CASES): Alimenta o inspetor
        direito em tempo real nos 5 sistemas interativos ao vivo.
     3. Catálogo Integral dos 18 Projetos Reais: Numerados de 01 a 18, sem emojis
        genéricos, detalhando dor de negócio, arquitetura, UI/UX e stack real.
     4. Trajetória Profissional, Formação e Grafo de Conhecimento (54 nós):
        Conecta empresas, ferramentas, projetos e métricas auditáveis.
   ========================================================================== */

window.MattheusPortfolio = window.MattheusPortfolio || {};

/* --------------------------------------------------------------------------
   BLOCO 1: Dados Oficiais de Identidade, Contato e Redes Sociais
   Data/Hora: 02/11/2026 00:34
   Finalidade: Garantir consistência da assinatura Mattheus Moraes em todo o site.
   -------------------------------------------------------------------------- */
window.MattheusPortfolio.PROFILE = {
  name: "Mattheus Moraes",
  monogram: "MM",
  location: "Florianópolis, SC • Brasil",
  coordinates: "27°35'48\"S 48°32'57\"W",
  email: "moraes_trabalho@outlook.com.br",
  phoneDisplay: "(61) 98210-6653",
  whatsappNumber: "5561982106653",
  github: "https://github.com/moraesmattheus",
  linkedin: "https://www.linkedin.com/in/mattheusmoraes/",
  easycodeUrl: "https://easy-code.tech/"
};

/* --------------------------------------------------------------------------
   BLOCO 2: Metadados do Palco Interativo de 5 Frentes Comerciais (V3)
   Data/Hora: 02/11/2026 01:32
   Finalidade: Alimentar a barra de endereço, o resumo executivo inferior e o
   botão de orçamento personalizado para cada uma das 5 frentes de Mattheus.
   -------------------------------------------------------------------------- */
window.MattheusPortfolio.STUDIO_CASES = {
  sites: {
    projectId: "site-vania",
    urlDisplay: "vaniafariaimoveis.com · Site Institucional & EasyCode Ao Vivo",
    liveUrl: "https://easy-code.tech/",
    valueTitle: "Criação de Sites que Vendem pelo Valor Percebido",
    valueCopy: "Sites institucionais de alto padrão, landing pages rápidas e plataformas interativas pensadas para transmitir autoridade imediata e converter visitantes em clientes.",
    conciergeTopic: "Criação de Site de Alto Padrão",
    ctaLabel: "Quero um Site Nesse Padrão →"
  },
  crm: {
    projectId: "crm-manu",
    urlDisplay: "app.crmempresa.com.br · Pipeline Comercial, Caixa & Retenção",
    liveUrl: "",
    valueTitle: "Sistemas Sob Medida, CRMs & Portais Internos",
    valueCopy: "Chega de planilhas soltas: organizo seus leads, propostas, caixa, alertas de clientes inativos e operação interna em um sistema feito para o seu negócio.",
    conciergeTopic: "Sistema Sob Medida / CRM",
    ctaLabel: "Quero um Sistema / CRM Assim →"
  },
  apps: {
    projectId: "orion",
    urlDisplay: "orion.app · iOS, Android, Desktop Windows & IA Integrada",
    liveUrl: "",
    valueTitle: "Aplicativos Mobile (iOS/Android) e Desktop Nativos",
    valueCopy: "Aplicativos rápidos, intuitivos e seguros com notificações, funcionamento offline e inteligência artificial integrada sem dados inventados.",
    conciergeTopic: "Aplicativo Mobile ou Desktop",
    ctaLabel: "Orçar Meu Aplicativo →"
  },
  video: {
    projectId: "reels-studio",
    urlDisplay: "reels-studio://render-60fps · Color DaVinci + Legendas Dinâmicas",
    liveUrl: "",
    valueTitle: "Edição de Vídeos, Reels de Retenção & Criativos de Anúncio",
    valueCopy: "Transformo gravações brutas em vídeos magnéticos com corte preciso de silêncios, legendas dinâmicas, tratamento de cor no DaVinci e áudio em -14 LUFS.",
    conciergeTopic: "Edição de Vídeos & Criativos",
    ctaLabel: "Quero Editar Meus Vídeos →"
  },
  traffic: {
    projectId: "hub-hom",
    urlDisplay: "ads-performance.bi · Meta Ads, Google Ads, TikTok & Funil CRM",
    liveUrl: "",
    valueTitle: "Marketing Digital & Gestão de Tráfego Orientada a Lucro",
    valueCopy: "Campanhas estruturadas para atrair compradores reais, reduzir custo por lead/clique e acompanhar cada centavo investido em tempo real.",
    conciergeTopic: "Marketing & Gestão de Tráfego Pago",
    ctaLabel: "Quero Escalar Meu Tráfego →"
  }
};

/* --------------------------------------------------------------------------
   BLOCO 3: Catálogo Completo dos 18 Projetos Reais (Numerados 01 a 18)
   Data/Hora: 02/11/2026 00:34
   Finalidade: Exibir toda a produção técnica de Mattheus Moraes com rigor visual.
   -------------------------------------------------------------------------- */
window.MattheusPortfolio.PROJECTS = [
  {
    id: "easycode",
    num: "01",
    title: "EasyCode (Pyra)",
    subtitle: "Plataforma EdTech Gamificada • Python, JS e SQL no Navegador",
    category: "web",
    categoryLabel: "Produtos & Web",
    status: "No Ar • Produção",
    statusClass: "status-live-pill",
    year: "2026",
    image: "assets/img/easycode.png",
    liveUrl: "https://easy-code.tech/",
    repoUrl: "https://github.com/moraesmattheus/pyra",
    studioKey: "easycode",
    summary: "Plataforma completa para aprender programação do zero com execução real de Python, JavaScript e SQL direto no navegador via WebAssembly, suporte 100% offline (PWA), 32 aulas, mundos e sistema de XP.",
    problem: "Plataformas iniciantes costumam exigir configuração pesada na máquina ou servidores lentos, gerando desistência logo nas primeiras aulas e impedindo estudo sem internet.",
    solution: "Arquitetura SPA modular em Vanilla JS com Web Workers isolados (Pyodide WASM para Python, SQL.js para SQLite e sandbox JS), Service Worker versionado para estudo offline, áudio tátil procedural e persistência via Supabase.",
    uxHighlights: [
      "Feedback visual imediato a cada linha executada com ganho de XP e conquistas",
      "Zero latência de servidor: compilação local segura dentro da aba do aluno",
      "Auditoria automatizada de marca e licenças via scripts Node.js e GitHub Actions"
    ],
    stack: ["JavaScript ES6+", "WebAssembly (Pyodide / SQL.js)", "Web Workers", "PWA Offline", "Supabase", "CSS 3D Motion"]
  },
  {
    id: "site-vania",
    num: "02",
    title: "Vania Faria Imóveis",
    subtitle: "Ecossistema Imobiliário Quiet Luxury, Off-Market NDA & Admin Drag-and-Drop",
    category: "web",
    categoryLabel: "Produtos & Web",
    status: "Ativo • Alto Padrão",
    statusClass: "status-prod-pill",
    year: "2026",
    image: "assets/img/logo-va.svg",
    studioKey: "vania",
    summary: "Plataforma digital de alto padrão para a consultora Vania Faria (CRECI 12.083) com estética Quiet Luxury, curadoria Off-Market sob NDA, Concierge WhatsApp e painel administrativo intuitivo por arrastar e soltar.",
    problem: "Sites imobiliários convencionais parecem classificados genéricos, expõem propriedades sigilosas e possuem painéis administrativos complexos demais para uso ágil no dia a dia.",
    solution: "Direção de arte fiel ao cartão físico da marca (#20130A e ouro #C8A97E), backend em Node.js + Express + SQLite, scripts Python de enriquecimento de dados e painel admin onde basta arrastar fotos do celular.",
    uxHighlights: [
      "Fricção intencional de luxo: propriedades Off-Market liberadas mediante solicitação qualificada",
      "Cursor contextual e síntese sonora ambiente opcional via Web Audio API",
      "Otimização WebP automática e lazy loading para máxima fluidez em redes móveis"
    ],
    stack: ["Node.js", "Express", "SQLite", "CSS Quiet Luxury", "Python Scraping", "Web Audio API"]
  },
  {
    id: "orion",
    num: "03",
    title: "Órion",
    subtitle: "Companheiro Cognitivo Pessoal com IA & Arquitetura Soberana",
    category: "ia",
    categoryLabel: "IA & Automação",
    status: "Uso Diário • 46 Testes",
    statusClass: "status-live-pill",
    year: "2026",
    image: "assets/img/orion-home.png",
    secondaryImage: "assets/img/orion-faz.png",
    repoUrl: "https://github.com/moraesmattheus",
    studioKey: "orion",
    summary: "Assistente pessoal inteligente em React Native/Expo + FastAPI/Python com memória contextual de longo prazo (RAG), cofre criptografado local (Windows DPAPI) e política estrita de zero dados inventados.",
    problem: "Assistentes genéricos esquecem o contexto operacional do usuário, alucinam métricas inexistentes e expõem chaves sensíveis em arquivos de configuração comuns.",
    solution: "Construção ponta a ponta unindo app mobile nativo por voz/texto, backend Python assíncrono, criptografia local DPAPI (vault.bin) e suíte com 46 testes automatizados validando integridade de respostas.",
    uxHighlights: [
      "Interface móvel escura de baixa carga cognitiva para check-ins rápidos por voz ou texto",
      "Transparência honesta: quando um dado não existe, o sistema sinaliza estado vazio em vez de inventar",
      "Segredos blindados localmente fora de código-fonte e nuvens públicas"
    ],
    stack: ["React Native", "Expo", "Python", "FastAPI", "RAG Contextual", "Windows DPAPI", "Pytest (46 testes)"]
  },
  {
    id: "hub-hom",
    num: "04",
    title: "Hub HOM & BI Executivo",
    subtitle: "Sistema Operacional Interno & Consolidação Multicanal (House of Motors)",
    category: "growth",
    categoryLabel: "BI & Growth",
    status: "Produção • 23 Telas",
    statusClass: "status-prod-pill",
    year: "2026",
    image: "assets/img/hub-marketing.png",
    secondaryImage: "assets/img/hub-inicio.png",
    studioKey: "hubhom",
    summary: "Ecossistema corporativo (23 telas desktop e 11 mobile) e painel de BI executivo que unifica Shopify, Mercado Livre, Shopee, TikTok Shop e Amazon com ROAS, CAC e cadência semanal em Cloudflare Pages + KV.",
    problem: "Gestores perdiam horas cruzando planilhas desconectadas de múltiplos marketplaces e mídia paga, enquanto novos membros da equipe dependiam de reuniões constantes para entender rotinas.",
    solution: "Design System fiel 1:1 ao Figma com tokens CSS nativos, edição direta no painel sem expor segredos no navegador, autenticação OTP via Cloudflare Access e caixas didáticas integradas em cada tela.",
    uxHighlights: [
      "Unificação de receita bruta/líquida, gasto de mídia e margem de contribuição em tela única",
      "Guias operacionais embutidos em cada módulo eliminando gargalos de treinamento",
      "Abertura instantânea na borda (Edge) e persistência híbrida via Cloudflare KV"
    ],
    stack: ["HTML5 / CSS Tokens", "Vanilla JS Modular", "Cloudflare Pages", "Cloudflare KV", "Access OTP", "Figma 1:1"]
  },
  {
    id: "radar-vagas",
    num: "05",
    title: "Radar de Vagas & Buscador Autônomo",
    subtitle: "Scraper em 10 Portais + App Mobile com Score ATS 0-100 e IA Gemini",
    category: "ia",
    categoryLabel: "IA & Automação",
    status: "Em Uso Real",
    statusClass: "status-live-pill",
    year: "2026",
    repoUrl: "https://github.com/moraesmattheus/Aplicativos",
    studioKey: "radar",
    summary: "Pipeline completo de empregabilidade: robô Python + Playwright que varre portais, remove duplicatas (158 vagas -> 71 elegíveis), escolhe o currículo ideal para o Notion e alimenta app React Native com Kanban e análise ATS via Gemini.",
    problem: "Buscar oportunidades manualmente em dezenas de sites consome horas diárias, gera candidaturas repetidas e dificulta adaptar o currículo certo para cada escopo.",
    solution: "Integração de 7+ APIs e scrapers com algoritmo determinístico de compatibilidade (0 a 100 por stack, senioridade e local), Kanban sincronizado com Google Calendar e backend serverless em Cloudflare Workers protegendo a chave Gemini.",
    uxHighlights: [
      "Priorização automática por faixas de aderência, destacando onde vale investir energia",
      "Atualizações OTA via EAS e funcionamento resiliente mesmo offline do backend de IA",
      "Integração direta com Notion e CRM multiplataforma"
    ],
    stack: ["React Native / Expo", "TypeScript", "Python", "Playwright", "Cloudflare Workers", "Gemini API", "Notion API"]
  },
  {
    id: "pastas-barra",
    num: "06",
    title: "Pastas na Barra (Windows 11)",
    subtitle: "Utilitário Nativo em C#/WPF para Grupos de Apps na Taskbar",
    category: "mobile",
    categoryLabel: "Apps Mobile & Desktop",
    status: "Open Source • Apache-2.0",
    statusClass: "status-oss-pill",
    year: "2026",
    image: "assets/img/pastas-barra-1.png",
    secondaryImage: "assets/img/pastas-barra-2.png",
    repoUrl: "https://github.com/moraesmattheus/pastas-na-barra",
    summary: "Software nativo para Windows 11 escrito em C#/WPF que restaura e moderniza pastas organizadoras de aplicativos diretamente na barra de tarefas, com personalização visual, instalador próprio e licença Apache-2.0.",
    problem: "O Windows 11 removeu barras de ferramentas rápidas na taskbar, forçando desenvolvedores a poluir a barra ou abrir menus lentos.",
    solution: "Aplicação leve de bandeja em C#/WPF com popup fluido alinhado ao estilo acrílico do Windows 11, editor visual de pastas e reflexão de ícones.",
    uxHighlights: [
      "Aparência nativa integrada ao tema escuro e acrílico do Windows 11",
      "Configuração visual de aparência, opacidade e agrupamento em poucos cliques",
      "Distribuído com instalador pronto e código aberto auditável no GitHub"
    ],
    stack: ["C#", ".NET / WPF", "Win32 Interop", "Windows 11 UI", "Installer", "Apache-2.0"]
  },
  {
    id: "infnet-app",
    num: "07",
    title: "Infnet Super App",
    subtitle: "App Mobile Acadêmico com Integração Zoom, Alertas TP/AT e RAG do Manual",
    category: "mobile",
    categoryLabel: "Apps Mobile & Desktop",
    status: "Open Source",
    statusClass: "status-oss-pill",
    year: "2026",
    repoUrl: "https://github.com/moraesmattheus/Infnet",
    summary: "Aplicativo mobile nativo (React Native + Expo) criado para estudantes do Instituto Infnet: centraliza aulas ao vivo no Zoom, caderno de anotações, alertas push de entregas (TPs/ATs) e consulta inteligente ao Manual do Aluno via IA/RAG.",
    problem: "Portais acadêmicos tradicionais exigem múltiplos cliques para achar links de aulas, prazos de entregas e regras institucionais no celular.",
    solution: "Experiência mobile focada em velocidade de acesso (< 1s para entrar na aula), lembretes proativos de avaliações e busca semântica sobre normas acadêmicas.",
    uxHighlights: [
      "Dashboard focado na próxima ação crítica do aluno (aula ao vivo ou entrega próxima)",
      "Consulta em linguagem natural sobre o Manual do Aluno com citação exata",
      "Código aberto publicado no GitHub para a comunidade acadêmica"
    ],
    stack: ["React Native", "Expo", "TypeScript", "Push Notifications", "Zoom Deep-Link", "IA / RAG"]
  },
  {
    id: "ominivix",
    num: "08",
    title: "Ominivix (Extensão AI + Reuniões)",
    subtitle: "Extensão Chrome/Vivaldi de Foco para TDAH + Transcrição com Diarização",
    category: "ia",
    categoryLabel: "IA & Automação",
    status: "Em Integração",
    statusClass: "status-prod-pill",
    year: "2026",
    summary: "Extensão de navegador desenhada para foco profundo e TDAH (modo tarefa única, árvore visual de páginas e organização de abas com IA) integrada a gravador de reuniões com identificação de quem falou e envio ao Notion.",
    problem: "Profissionais que lidam com dezenas de abas e reuniões seguidas sofrem com dispersão cognitiva e perda de combinados importantes.",
    solution: "União de bloqueio gentil de distrações no navegador com aplicativo de bandeja para gravação local, transcrição estruturada e documentação automática no Notion.",
    uxHighlights: [
      "Árvore hierárquica de navegação para nunca perder o fio condutor de uma pesquisa",
      "Modo Tarefa Única sempre visível reduzindo troca involuntária de contexto",
      "Resumo executivo de reuniões separado por interlocutor"
    ],
    stack: ["Chrome Extensions API", "JavaScript", "Python", "Transcrição & Diarização", "Notion API", "System Tray App"]
  },
  {
    id: "mobilelab",
    num: "09",
    title: "MobileLab (Emulador Liso)",
    subtitle: "Plataforma Desktop de Emulação e Testes Android em Tauri 2 + Rust",
    category: "mobile",
    categoryLabel: "Apps Mobile & Desktop",
    status: "Protótipo Avançado",
    statusClass: "status-prod-pill",
    year: "2026",
    summary: "Estação desktop leve para orquestração, espelhamento de baixa latência e testes de dispositivos Android construída com Tauri 2, frontend React e core de alta performance em Rust.",
    problem: "Emuladores tradicionais consomem gigabytes de RAM e travam máquinas de desenvolvimento durante builds simultâneos.",
    solution: "Substituição de camadas pesadas baseadas em Electron por binário nativo Tauri 2 + Rust comunicando diretamente com ADB e gerenciamento enxuto de perfis.",
    uxHighlights: [
      "Consumo mínimo de memória comparado a suítes pesadas de emulação",
      "Painel rápido de inspeção, captura de tela e controle de dispositivos conectados"
    ],
    stack: ["Rust", "Tauri 2", "React", "TypeScript", "ADB Protocol"]
  },
  {
    id: "borda",
    num: "10",
    title: "Borda (Edge Glow Android)",
    subtitle: "App Android Nativo em Kotlin Puro (~59 KB, Zero Bibliotecas)",
    category: "mobile",
    categoryLabel: "Apps Mobile & Desktop",
    status: "Em Uso Diário",
    statusClass: "status-live-pill",
    year: "2026",
    summary: "Aplicativo Android ultraleve (~59 KB compilado, escrito em Kotlin puro sem dependências externas) que projeta um brilho suave e pulsante nas bordas da tela com cores personalizadas por contato do WhatsApp ou LinkedIn.",
    problem: "Apps comerciais de iluminação de borda pesam dezenas de megabytes, drenam bateria e pedem permissões invasivas com anúncios.",
    solution: "Engenharia minimalista usando apenas APIs nativas do Android NotificationListenerService e renderização customizada em Canvas com impacto zero na bateria.",
    uxHighlights: [
      "Identificação silenciosa à distância: saiba quem mandou mensagem apenas pela cor da borda",
      "APK enxuto de ~59 KB provando domínio de código nativo limpo sem inchaço"
    ],
    stack: ["Kotlin Puro", "Android SDK Nativo", "NotificationListener", "Custom View Canvas"]
  },
  {
    id: "crm-manu",
    num: "11",
    title: "CRM da Manu (Barbearia)",
    subtitle: "CRM Nativo Apple (SwiftUI + SwiftData) & Multiplataforma",
    category: "mobile",
    categoryLabel: "Apps Mobile & Desktop",
    status: "Ativo",
    statusClass: "status-prod-pill",
    year: "2026",
    summary: "Sistema sob medida de gestão comercial e retenção para barbearia (iPhone, iPad, Mac em SwiftUI/SwiftData e versão multiplataforma): controle de clientes, LTV, alerta de inativos, cortesias, sorteios e caixa.",
    problem: "Negócios locais de serviços perdem receita recorrente por não saberem quais clientes sumiram há mais de 30 dias nem o LTV individual.",
    solution: "Interface rápida pensada para uso no balcão entre atendimentos, calculando automaticamente recorrência, ticket médio e lista de reativação.",
    uxHighlights: [
      "Cadastro de atendimento em segundos sem formulários burocráticos",
      "Painel de clientes inativos pronto para disparo de reativação personalizada"
    ],
    stack: ["SwiftUI", "SwiftData", "React Native", "Gestão de LTV & Retenção"]
  },
  {
    id: "rota-de-vida",
    num: "12",
    title: "Rota de Vida",
    subtitle: "PWA Instalável de Planejamento Financeiro com Isolamento Firebase",
    category: "web",
    categoryLabel: "Produtos & Web",
    status: "Produção • Uso Real",
    statusClass: "status-live-pill",
    year: "2026",
    repoUrl: "https://github.com/moraesmattheus/Aplicativos",
    summary: "PWA financeiro instalável com funcionamento offline, autenticação e banco em nuvem (Firebase Auth + Firestore com regras estritas de isolamento por usuário), importação automática de CSV de faturas e APIs de cotações.",
    problem: "Planilhas financeiras quebram no celular e aplicativos bancários não categorizam faturas consolidadas com visão de metas familiares.",
    solution: "Aplicação progressiva leve com parser inteligente de CSV bancário, categorização automática de gastos e sincronização segura multiusuário.",
    uxHighlights: [
      "Importação de fatura CSV em segundos com classificação imediata de despesas",
      "Funciona offline em trânsito e sincroniza ao reconectar"
    ],
    stack: ["JavaScript", "PWA / Service Worker", "Firebase Auth", "Cloud Firestore Rules", "REST APIs"]
  },
  {
    id: "vigia-ads",
    num: "13",
    title: "Vigia Ads (Conecta Dados)",
    subtitle: "Monitor Diário de Google Ads: Anomalias de CPL/CPC e Negativação",
    category: "growth",
    categoryLabel: "BI & Growth",
    status: "Protótipo Funcional",
    statusClass: "status-prod-pill",
    year: "2026",
    summary: "Sistema de auditoria diária para gestores de Google Ads que detecta desvios abruptos de CPL/CPC e sugere palavras-chave negativas antes que termos irrelevantes drenem a verba da campanha.",
    problem: "Termos de busca desalinhados queimam orçamento silenciosamente entre uma revisão manual e outra.",
    solution: "Painel automatizado de vigilância diária com alertas visuais de desvios estatísticos e fila prática de negativação.",
    uxHighlights: [
      "Leitura em menos de 2 minutos logo no início do expediente de tráfego",
      "Foco direto em economia de verba e proteção do ROAS"
    ],
    stack: ["JavaScript", "HTML5 / CSS3", "Google Ads Metrics", "Automação de Auditoria"]
  },
  {
    id: "painel-cpa",
    num: "14",
    title: "Painel CPA Aprovado & Auditoria UTM",
    subtitle: "Previsão por Maturação de Ciclo Fechado, Ritmo de Meta e Governança UTM",
    category: "growth",
    categoryLabel: "BI & Growth",
    status: "Demonstração Executiva",
    statusClass: "status-prod-pill",
    year: "2026",
    summary: "Conjunto analítico para operações de venda complexa: calcula o Custo por Aprovado real considerando janela de maturação financeira, pacing diário contra meta e auditoria de integridade de UTMs.",
    problem: "Olhar apenas para o CPL do dia engana gestores quando a aprovação final do cliente leva dias ou semanas para maturar.",
    solution: "Modelagem de coorte por maturação aliada a padronizador e validador de nomenclaturas UTM para eliminar tráfego não atribuído.",
    uxHighlights: [
      "Projeção clara de fechamento de mês com indicadores visuais de ritmo (pacing)",
      "Auditoria instantânea de links parametrizados antes de subir campanhas"
    ],
    stack: ["Data Modeling", "HTML5 / CSS3 / JS", "Governança de UTM", "BI de Performance"]
  },
  {
    id: "reels-studio",
    num: "15",
    title: "Reels Studio & Vídeos Cinematográficos",
    subtitle: "Pipeline GPU Whisper + DaVinci (-14 LUFS) & UI 3D 60fps em Remotion",
    category: "ia",
    categoryLabel: "IA & Automação",
    status: "Produção Criativa",
    statusClass: "status-live-pill",
    year: "2026",
    summary: "Engenharia aplicada ao audiovisual e criativos de performance: corte automático de silêncios, transcrição Whisper via GPU, legendas animadas, ducking a -14 LUFS para DaVinci Resolve e vídeos programáticos 3D a 60 FPS em Remotion.",
    problem: "Produzir vídeos curtos e anúncios dinâmicos em escala exige horas repetitivas de decupagem, legendagem e nivelamento de áudio.",
    solution: "Automação por código unindo processamento em GPU local e renderização baseada em React/Remotion com física de mola.",
    uxHighlights: [
      "Áudio broadcast padronizado em -14 LUFS pronto para Instagram Reels, TikTok e Ads",
      "Animações de interface 3D renderizadas em 60 quadros por segundo por código"
    ],
    stack: ["Python", "Whisper GPU", "Remotion", "React / Tailwind", "FFmpeg", "DaVinci Resolve Pipeline"]
  },
  {
    id: "rag-cofre",
    num: "16",
    title: "RAG Cofre (Segundo Cérebro Local)",
    subtitle: "Motor de Busca SQLite FTS5 Instantâneo sobre Cofre Obsidian",
    category: "ia",
    categoryLabel: "IA & Automação",
    status: "Em Uso Diário",
    statusClass: "status-live-pill",
    year: "2026",
    summary: "Indexador e motor de recuperação local em Python + SQLite FTS5 que consulta centenas de notas estratégicas do cofre Obsidian em milissegundos, sem enviar documentos privados para APIs externas.",
    problem: "Bases de conhecimento pessoais crescem rápido, mas buscar contexto exato para agentes de IA sem vazar dados privados ou gastar tokens demais é difícil.",
    solution: "Indexação Full-Text Search (FTS5) local com ranking de relevância e retorno cirúrgico apenas dos trechos necessários.",
    uxHighlights: [
      "Resposta em milissegundos via CLI ou integração direta com fluxos de IA",
      "100% offline e soberano, preservando privacidade total das notas"
    ],
    stack: ["Python", "SQLite FTS5", "Obsidian Markdown", "Local RAG"]
  },
  {
    id: "skill-advisor",
    num: "17",
    title: "Skill Advisor & Token Economia",
    subtitle: "Recomendador Automático de Skills (MIT) & Telemetria de Consumo de IA",
    category: "mobile",
    categoryLabel: "Apps Mobile & Desktop",
    status: "Open Source • MIT",
    statusClass: "status-oss-pill",
    year: "2026",
    summary: "Dupla de ferramentas para engenharia assistida por IA: o Skill Advisor lê a estrutura de qualquer repositório e recomenda skills ideais em português; o Token Economia audita o consumo real por projeto, sessão e dia.",
    problem: "Desenvolvedores subutilizam capacidades especializadas de agentes ou perdem controle do custo de tokens em sessões longas.",
    solution: "Scripts leves em Python sem dependências pesadas que inspecionam stacks automaticamente e geram relatórios claros de eficiência.",
    uxHighlights: [
      "Instalação de skills apenas mediante confirmação explícita do desenvolvedor",
      "Visibilidade financeira e técnica de consumo dos últimos 14+ dias"
    ],
    stack: ["Python", "CLI Tooling", "AST / Repo Detection", "Telemetria de IA", "Licença MIT"]
  },
  {
    id: "ui-lab-sos",
    num: "18",
    title: "UI Lab (28 Componentes) & SOS Floripa",
    subtitle: "Master Hub de Micro-interações Frontend + Agente IA WhatsApp Urbano",
    category: "web",
    categoryLabel: "Produtos & Web",
    status: "Catálogo Ativo",
    statusClass: "status-live-pill",
    year: "2026",
    summary: "Reúne o Master Hub interativo com 28 componentes de UI/UX em HTML/CSS/JS puro (preview em tempo real, tilt 3D, glassmorphism e cópia em 1 clique) e o agente SOS Floripa no WhatsApp integrado via n8n/Make.",
    problem: "Acelerar o desenvolvimento de novas interfaces ricas sem depender de bibliotecas inchadas e conectar cidadãos rapidamente a serviços locais via WhatsApp.",
    solution: "Biblioteca autoral catalogada em JSON com zero frameworks pesados + fluxos conversacionais automatizados via webhooks.",
    uxHighlights: [
      "Preview interativo instantâneo com busca por palavra-chave e cópia limpa de código",
      "Atendimento automatizado acessível direto no WhatsApp"
    ],
    stack: ["HTML5 Semântico", "CSS3 Avançado", "Vanilla JS", "n8n / Make", "WhatsApp Webhooks"]
  }
];

/* --------------------------------------------------------------------------
   BLOCO 4: Experiências Profissionais & Formação Acadêmica Reais
   Data/Hora: 02/11/2026 00:34
   Finalidade: Apresentar trajetória comprovada sem inventar cargos ou números.
   -------------------------------------------------------------------------- */
window.MattheusPortfolio.EXPERIENCES = [
  {
    role: "Engenharia de Software (Graduação)",
    company: "Instituto Infnet",
    period: "Out 2026 • Em curso",
    type: "Formação Acadêmica",
    bullets: [
      "Formação orientada a projetos reais em engenharia de software, arquitetura full-stack, Python, computação em nuvem e cibersegurança.",
      "Autor do Infnet Super App (React Native + Expo + RAG) criado para otimizar a rotina acadêmica dos próprios alunos."
    ]
  },
  {
    role: "Gestor de Tráfego Pago & Performance",
    company: "MF Mídias & Projetos de Performance",
    period: "Atuação Atual",
    type: "Performance & Growth",
    bullets: [
      "Gestão estratégica de aquisição paga orientada a margem real, CAC, CPL e ROAS, unindo criativos de alta retenção à automação de dados e dashboards próprios."
    ]
  },
  {
    role: "Analista de Marketing & Growth",
    company: "PV Operation / Solan Group",
    period: "Jun 2025 a Abr 2026",
    type: "Experiência Corporativa",
    bullets: [
      "Estruturou do zero a segmentação de quase 79 mil contatos por ICP no RD Station Advanced (13+ listas), elevando a taxa de abertura de e-mail de 7% para até 19%.",
      "A pedido direto do CEO, formalizou o framework oficial de KPIs (CPL, CAC, ROI, ROAS, CTR) e apresentou resultados semanalmente para liderança e squads.",
      "Gerou de 380 a 608 leads/mês (Elekt) com CPL entre R$ 3,43 e R$ 4,23 (chegando a R$ 2,20 nos melhores criativos), além de criar agente WhatsApp (n8n) e dashboards em HTML/CSS."
    ]
  },
  {
    role: "Tecnólogo em Marketing Digital",
    company: "UNICV",
    period: "Concluído em Jan 2026",
    type: "Formação Acadêmica",
    bullets: [
      "Graduação tecnológica concluída consolidando base estratégica em funis de aquisição, métricas de produto, posicionamento, SEO e comportamento do consumidor digital."
    ]
  },
  {
    role: "Analista de E-commerce & Marketplaces",
    company: "Loft Design (iLoft)",
    period: "Jun 2024 a Out 2024",
    type: "Experiência Corporativa",
    bullets: [
      "Liderou a operação digital do e-commerce, reescrevendo copies de produtos e conduzindo SEO técnico e on-page completo para ranqueamento orgânico no Google.",
      "Gerenciou catálogos e SEO de listagens no Mercado Livre e Amazon, briefings de mídia paga, inteligência competitiva e relatórios executivos mensais."
    ]
  },
  {
    role: "Cofundador & Responsável por Growth",
    company: "Operação Própria E-commerce D2C (Shopify)",
    period: "2023 a 2024",
    type: "Empreendedorismo Real",
    bullets: [
      "Fundou e operou loja virtual D2C em Shopify do zero até o 1º lugar orgânico no Google no nicho, otimizando Core Web Vitals e padronização WebP.",
      "Criou metodologia própria de copy em vídeo alcançando CTR de até 6,20%, reduziu o CPC de R$ 0,74 para R$ 0,11 (quase 7x menor) com testes de horário e atingiu ROAS de 4,65x e 72 mil views orgânicos."
    ]
  }
];

/* --------------------------------------------------------------------------
   BLOCO 5: Grafo de Conhecimento de Carreira (Career Knowledge Graph)
   Data/Hora: 02/11/2026 00:34
   Finalidade: Modelar os nós e conexões reais de Mattheus Moraes com elos
   diretos e cruzados para exploração visual, filtro, linha do tempo e rota BFS.
   -------------------------------------------------------------------------- */
window.MattheusPortfolio.GRAPH_CATEGORIES = {
  center:    { label: "Central",          color: "#C9A97C" },
  company:   { label: "Empresas",         color: "#38BDF8" },
  domain:    { label: "Domínios",         color: "#FB923C" },
  skill:     { label: "Habilidades",      color: "#F472B6" },
  tool:      { label: "Ferramentas",      color: "#2DD4BF" },
  project:   { label: "Projetos",         color: "#FACC15" },
  education: { label: "Formação",         color: "#34D399" },
  impact:    { label: "Impacto Real",     color: "#A78BFA" }
};

window.MattheusPortfolio.GRAPH_DATA = {
  nodes: [
    /* Nó Central */
    { id: "mattheus", label: "Mattheus Moraes", group: "center", radius: 28, period: "Florianópolis, SC", desc: "Engenharia de Software (INFNET) + Performance Comercial & Produto. Constrói sistemas completos, interfaces de alto valor percebido, agentes de IA e máquinas de aquisição auditáveis." },

    /* Hubs de Cluster (7 pilares ao redor do nó central) */
    { id: "hub_company", label: "Empresas", group: "company", radius: 18, isHub: true, period: "2023 • 2026", desc: "Organizações, agência e operação própria onde Mattheus Moraes gerou resultado prático em receita, dados e tecnologia." },
    { id: "hub_domain", label: "Domínios", group: "domain", radius: 18, isHub: true, period: "Atuação Híbrida", desc: "Áreas de negócio e engenharia combinadas para criar vantagem competitiva rara." },
    { id: "hub_skill", label: "Habilidades", group: "skill", radius: 18, isHub: true, period: "Competências Core", desc: "Domínio técnico e estratégico do código full-stack ao funil de conversão." },
    { id: "hub_tool", label: "Ferramentas", group: "tool", radius: 18, isHub: true, period: "Stack Ativa", desc: "Linguagens, frameworks, bancos, nuvens e plataformas de mídia utilizadas em produção." },
    { id: "hub_project", label: "Projetos", group: "project", radius: 19, isHub: true, period: "18 Sistemas", desc: "Produtos no ar, aplicativos mobile/desktop, agentes de IA e dashboards operacionais construídos por Mattheus Moraes." },
    { id: "hub_edu", label: "Formação", group: "education", radius: 18, isHub: true, period: "Base Acadêmica", desc: "Dupla formação unindo Engenharia de Software e Marketing Digital." },
    { id: "hub_impact", label: "Impacto", group: "impact", radius: 18, isHub: true, period: "Resultados Auditáveis", desc: "Indicadores reais conquistados em produção, mídia paga, CRM, SEO e qualidade de software." },

    /* Empresas (4) */
    { id: "co_solan", label: "PV Operation / Solan Group", group: "company", radius: 12, period: "Jun 2025 - Abr 2026", desc: "Atuação como Analista de Marketing na holding do setor solar: framework de KPIs para o CEO, 79 mil contatos segmentados, Meta Ads, dashboards e automação n8n." },
    { id: "co_mf", label: "MF Mídias", group: "company", radius: 12, period: "Atual", desc: "Atuação em gestão de tráfego pago, performance comercial e estruturação orientada a conversão e ROI." },
    { id: "co_loft", label: "Loft Design (iLoft)", group: "company", radius: 11, period: "Jun - Out 2024", desc: "Operação digital completa de e-commerce, SEO técnico/on-page e gestão de Mercado Livre e Amazon." },
    { id: "co_d2c", label: "E-commerce D2C Próprio", group: "company", radius: 12, period: "2023 - 2024", desc: "Operação D2C fundada do zero em Shopify: 1º lugar orgânico no Google, ROAS 4,65x e CPC reduzido em quase 7x." },

    /* Domínios (6) */
    { id: "dom_swe", label: "Sistemas, CRMs & Apps", group: "domain", radius: 12, period: "Core", desc: "Desenvolvimento de CRMs personalizados, portais internos, apps iOS/Android e utilitários desktop." },
    { id: "dom_ai", label: "IA & Sistemas Autônomos", group: "domain", radius: 12, period: "Core", desc: "Integração de LLMs (Gemini/Claude), RAG local, servidores MCP, transcrição GPU e agentes sem alucinação." },
    { id: "dom_growth", label: "Marketing & Tráfego Pago", group: "domain", radius: 12, period: "Core", desc: "Gestão de tráfego em Meta, Google e TikTok Ads com foco em CAC, LTV, CTR, CPL e lucro real." },
    { id: "dom_video", label: "Edição de Vídeo & Motion", group: "domain", radius: 12, period: "Core", desc: "Edição de vídeos e Reels de alta retenção, Color Grading no DaVinci (-14 LUFS), legendas dinâmicas e motion 60fps." },
    { id: "dom_ecom", label: "E-commerce & Marketplaces", group: "domain", radius: 11, period: "2023 - 2026", desc: "Operação D2C em Shopify e multicanal (Mercado Livre, Amazon, Shopee, TikTok Shop)." },
    { id: "dom_uiux", label: "Sites de Alto Padrão & UI/UX", group: "domain", radius: 12, period: "Core", desc: "Criação de sites institucionais Quiet Luxury, landing pages de alta conversão e micro-interações 3D." },

    /* Habilidades (7) */
    { id: "sk_fullstack", label: "Arquitetura Full-Stack", group: "skill", radius: 11, period: "Prática Diária", desc: "Construção integrada de frontends rápidos, APIs FastAPI/Node, bancos SQL/NoSQL e edge workers." },
    { id: "sk_mobile", label: "Apps Mobile & PWA", group: "skill", radius: 11, period: "Prática Diária", desc: "Apps Android/iOS com React Native, Expo, Kotlin nativo, SwiftUI e PWAs 100% offline." },
    { id: "sk_bi", label: "BI Executivo & KPIs", group: "skill", radius: 11, period: "2024 - 2026", desc: "Modelagem de indicadores (ROAS, CAC, CPL, LTV, Pacing) e painéis em tempo real para diretoria." },
    { id: "sk_seo", label: "SEO Técnico & Core Web Vitals", group: "skill", radius: 11, period: "2023 - 2026", desc: "Otimização estrutural, LCP rápido, semântica e ranqueamento em 1º lugar no Google." },
    { id: "sk_crm", label: "CRM & Automação de Funil", group: "skill", radius: 11, period: "2024 - 2026", desc: "Segmentação avançada por ICP, fluxos n8n/Make, webhooks e qualificação automática no WhatsApp." },
    { id: "sk_copy", label: "Copywriting & Criativos", group: "skill", radius: 10, period: "2023 - 2026", desc: "Fórmula dor -> identificação -> solução com hooks de 5s e alta taxa de clique." },
    { id: "sk_sec", label: "Privacidade & Segurança", group: "skill", radius: 10, period: "Core", desc: "Cofre DPAPI local, Firestore Security Rules por usuário, chaves blindadas em Workers e auditoria de segredos." },

    /* Ferramentas & Stack (12) */
    { id: "tl_python", label: "Python & FastAPI", group: "tool", radius: 12, period: "Stack Principal", desc: "Backends de IA, automações, Playwright scraping, SQLite FTS5 e processamento de dados." },
    { id: "tl_rn", label: "React Native & Expo", group: "tool", radius: 12, period: "Stack Principal", desc: "Desenvolvimento mobile ágil com TypeScript, notificações push e updates OTA via EAS." },
    { id: "tl_tsjs", label: "TypeScript & Vanilla JS", group: "tool", radius: 12, period: "Stack Principal", desc: "SPAs modulares ultrarrápidas, Web Workers, Canvas interativo e tipagem estática." },
    { id: "tl_cf", label: "Cloudflare Pages / Workers / KV", group: "tool", radius: 11, period: "Edge Cloud", desc: "Deploy global em edge, armazenamento KV, serverless APIs e proteção Access OTP." },
    { id: "tl_fb_sb", label: "Firebase & Supabase", group: "tool", radius: 11, period: "BaaS", desc: "Autenticação, Firestore isolado por regras de segurança e persistência de progresso gamificado." },
    { id: "tl_native", label: "C# WPF • Kotlin • Rust/Tauri", group: "tool", radius: 11, period: "Sistemas Nativos", desc: "Linguagens compiladas para performance nativa no Windows 11, Android e Desktop." },
    { id: "tl_ai_sdk", label: "Gemini API • Claude • MCP", group: "tool", radius: 11, period: "IA Generativa", desc: "Orquestração de modelos, protocolos MCP customizados e engenharia assistida por IA." },
    { id: "tl_n8n", label: "n8n • Make • Playwright", group: "tool", radius: 10, period: "Automação", desc: "Orquestração de agentes WhatsApp, integrações de CRM e varredura automatizada de portais." },
    { id: "tl_ads", label: "Meta • Google • TikTok Ads", group: "tool", radius: 11, period: "Mídia Paga", desc: "Gestão de campanhas Search, Shopping, Display, Reels e Taboola orientadas a conversão." },
    { id: "tl_rd", label: "RD Station • GA4 • GTM", group: "tool", radius: 10, period: "Martech", desc: "Automação de marketing em bases de 79 mil leads e rastreamento cirúrgico de eventos." },
    { id: "tl_shopify", label: "Shopify • ML • Amazon", group: "tool", radius: 10, period: "Commerce", desc: "Estruturação de lojas próprias e operação multicanal em grandes marketplaces." },
    { id: "tl_remotion", label: "Remotion & Whisper GPU", group: "tool", radius: 10, period: "Creative Tech", desc: "Vídeos programáticos 60 FPS em React e pipeline automatizado de áudio/legendas." },

    /* Projetos no Grafo (12 principais conectados a tudo) */
    { id: "pr_easycode", label: "EasyCode (Pyra)", group: "project", projectId: "easycode", radius: 13, period: "2026 • No Ar", desc: "Plataforma gamificada para aprender Python, JS e SQL no navegador com WebAssembly e modo offline." },
    { id: "pr_orion", label: "Órion IA", group: "project", projectId: "orion", radius: 14, period: "2026 • Uso Diário", desc: "Assistente cognitivo soberano (React Native + FastAPI + DPAPI + 46 testes automatizados)." },
    { id: "pr_hubhom", label: "Hub HOM & BI", group: "project", projectId: "hub-hom", radius: 13, period: "2026 • Produção", desc: "Portal corporativo de 23 telas e dashboard executivo multicanal na Cloudflare." },
    { id: "pr_vania", label: "Vania Faria Luxury", group: "project", projectId: "site-vania", radius: 12, period: "2026 • Ativo", desc: "Ecossistema imobiliário Quiet Luxury com camada Off-Market NDA e admin Drag & Drop." },
    { id: "pr_radar", label: "Radar & Busca Vagas", group: "project", projectId: "radar-vagas", radius: 12, period: "2026 • Em Uso", desc: "Robô scraper em 10 sites + App mobile com score ATS 0-100 e Gemini serverless." },
    { id: "pr_infnet", label: "Infnet Super App", group: "project", projectId: "infnet-app", radius: 11, period: "2026 • Open Source", desc: "App mobile dos alunos Infnet com Zoom, alertas de entregas e Manual do Aluno via RAG." },
    { id: "pr_ominivix", label: "Ominivix TDAH + IA", group: "project", projectId: "ominivix", radius: 11, period: "2026", desc: "Extensão de foco profundo + transcrição e diarização automática de reuniões no Notion." },
    { id: "pr_pastas", label: "Pastas na Barra (Win11)", group: "project", projectId: "pastas-barra", radius: 11, period: "2026 • Apache-2.0", desc: "Utilitário desktop nativo em C#/WPF para pastas na barra de tarefas do Windows 11." },
    { id: "pr_borda", label: "App Borda (59 KB)", group: "project", projectId: "borda", radius: 10, period: "2026 • Kotlin", desc: "App Android nativo ultraleve para alertas luminosos personalizados por contato." },
    { id: "pr_rotavida", label: "Rota de Vida PWA", group: "project", projectId: "rota-de-vida", radius: 10, period: "2026 • Produção", desc: "PWA financeiro offline com Firebase isolado por usuário e importador CSV." },
    { id: "pr_vigia", label: "Vigia Ads & Painel CPA", group: "project", projectId: "vigia-ads", radius: 11, period: "2026", desc: "Ferramentas de monitoramento de anomalias em Ads, maturação de CPA e governança UTM." },
    { id: "pr_reels", label: "Reels Studio & MobileLab", group: "project", projectId: "reels-studio", radius: 11, period: "2026", desc: "Automação audiovisual em GPU (-14 LUFS / Remotion 60fps) e plataforma Android em Rust/Tauri." },

    /* Formação (2) */
    { id: "ed_infnet", label: "Eng. de Software • INFNET", group: "education", radius: 13, period: "Início Out 2026", desc: "Graduação em Engenharia de Software no Instituto Infnet com aulas ao vivo e prática intensiva." },
    { id: "ed_unicv", label: "Marketing Digital • UNICV", group: "education", radius: 12, period: "Concluído Jan 2026", desc: "Graduação Tecnológica em Marketing Digital concluída na UNICV." },

    /* Impacto Real (6) */
    { id: "im_google1", label: "1º Lugar Orgânico Google", group: "impact", radius: 12, period: "Shopify D2C", desc: "Topo da busca orgânica no nicho estruturando SEO técnico, copy e Core Web Vitals do zero." },
    { id: "im_roas", label: "ROAS 4,65x & CTR 6,20%", group: "impact", radius: 12, period: "Mídia Paga", desc: "Retorno sobre investimento publicitário e alta taxa de clique com método autoral de criativos." },
    { id: "im_cpc", label: "CPC 7x Menor (R$0,74 -> R$0,11)", group: "impact", radius: 12, period: "Otimização", desc: "Redução drástica de custo por clique através de testes estruturados de janela horária." },
    { id: "im_79k", label: "79 mil Contatos Segmentados", group: "impact", radius: 12, period: "Solan Group", desc: "Base massiva organizada em 13+ listas por ICP elevando abertura de e-mails de 7% para 19%." },
    { id: "im_leads", label: "608 Leads/mês (CPL R$2,20)", group: "impact", radius: 12, period: "Campanhas Elekt", desc: "Geração consistente de demanda qualificada com acompanhamento em dashboards próprios." },
    { id: "im_tests", label: "46 Testes Automatizados", group: "impact", radius: 11, period: "Engenharia Órion", desc: "Cobertura real de testes garantindo confiabilidade e zero dados falsos no assistente Órion." }
  ],

  links: [
    /* Conexões Estruturais Centro -> Hubs */
    { source: "mattheus", target: "hub_company" },
    { source: "mattheus", target: "hub_domain" },
    { source: "mattheus", target: "hub_skill" },
    { source: "mattheus", target: "hub_tool" },
    { source: "mattheus", target: "hub_project" },
    { source: "mattheus", target: "hub_edu" },
    { source: "mattheus", target: "hub_impact" },

    /* Hubs -> Nós Folha */
    { source: "hub_company", target: "co_solan" },
    { source: "hub_company", target: "co_mf" },
    { source: "hub_company", target: "co_loft" },
    { source: "hub_company", target: "co_d2c" },

    { source: "hub_domain", target: "dom_swe" },
    { source: "hub_domain", target: "dom_ai" },
    { source: "hub_domain", target: "dom_growth" },
    { source: "hub_domain", target: "dom_video" },
    { source: "hub_domain", target: "dom_ecom" },
    { source: "hub_domain", target: "dom_uiux" },

    { source: "hub_skill", target: "sk_fullstack" },
    { source: "hub_skill", target: "sk_mobile" },
    { source: "hub_skill", target: "sk_bi" },
    { source: "hub_skill", target: "sk_seo" },
    { source: "hub_skill", target: "sk_crm" },
    { source: "hub_skill", target: "sk_copy" },
    { source: "hub_skill", target: "sk_sec" },

    { source: "hub_tool", target: "tl_python" },
    { source: "hub_tool", target: "tl_rn" },
    { source: "hub_tool", target: "tl_tsjs" },
    { source: "hub_tool", target: "tl_cf" },
    { source: "hub_tool", target: "tl_fb_sb" },
    { source: "hub_tool", target: "tl_native" },
    { source: "hub_tool", target: "tl_ai_sdk" },
    { source: "hub_tool", target: "tl_n8n" },
    { source: "hub_tool", target: "tl_ads" },
    { source: "hub_tool", target: "tl_rd" },
    { source: "hub_tool", target: "tl_shopify" },
    { source: "hub_tool", target: "tl_remotion" },

    { source: "hub_project", target: "pr_easycode" },
    { source: "hub_project", target: "pr_orion" },
    { source: "hub_project", target: "pr_hubhom" },
    { source: "hub_project", target: "pr_vania" },
    { source: "hub_project", target: "pr_radar" },
    { source: "hub_project", target: "pr_infnet" },
    { source: "hub_project", target: "pr_ominivix" },
    { source: "hub_project", target: "pr_pastas" },
    { source: "hub_project", target: "pr_borda" },
    { source: "hub_project", target: "pr_rotavida" },
    { source: "hub_project", target: "pr_vigia" },
    { source: "hub_project", target: "pr_reels" },

    { source: "hub_edu", target: "ed_infnet" },
    { source: "hub_edu", target: "ed_unicv" },

    { source: "hub_impact", target: "im_google1" },
    { source: "hub_impact", target: "im_roas" },
    { source: "hub_impact", target: "im_cpc" },
    { source: "hub_impact", target: "im_79k" },
    { source: "hub_impact", target: "im_leads" },
    { source: "hub_impact", target: "im_tests" },

    /* Elos Cruzados Tracejados */
    { source: "pr_easycode", target: "tl_tsjs", cross: true },
    { source: "pr_easycode", target: "tl_fb_sb", cross: true },
    { source: "pr_easycode", target: "dom_swe", cross: true },
    { source: "pr_easycode", target: "dom_uiux", cross: true },

    { source: "pr_orion", target: "tl_python", cross: true },
    { source: "pr_orion", target: "tl_rn", cross: true },
    { source: "pr_orion", target: "tl_ai_sdk", cross: true },
    { source: "pr_orion", target: "sk_sec", cross: true },
    { source: "pr_orion", target: "im_tests", cross: true },
    { source: "pr_orion", target: "dom_ai", cross: true },

    { source: "pr_hubhom", target: "tl_cf", cross: true },
    { source: "pr_hubhom", target: "sk_bi", cross: true },
    { source: "pr_hubhom", target: "tl_shopify", cross: true },
    { source: "pr_hubhom", target: "dom_ecom", cross: true },

    { source: "pr_vania", target: "dom_uiux", cross: true },
    { source: "pr_vania", target: "tl_python", cross: true },
    { source: "pr_vania", target: "sk_fullstack", cross: true },

    { source: "pr_radar", target: "tl_rn", cross: true },
    { source: "pr_radar", target: "tl_python", cross: true },
    { source: "pr_radar", target: "tl_n8n", cross: true },
    { source: "pr_radar", target: "tl_cf", cross: true },
    { source: "pr_radar", target: "tl_ai_sdk", cross: true },

    { source: "pr_infnet", target: "ed_infnet", cross: true },
    { source: "pr_infnet", target: "tl_rn", cross: true },
    { source: "pr_infnet", target: "dom_ai", cross: true },

    { source: "pr_ominivix", target: "tl_ai_sdk", cross: true },
    { source: "pr_ominivix", target: "tl_tsjs", cross: true },

    { source: "pr_pastas", target: "tl_native", cross: true },
    { source: "pr_borda", target: "tl_native", cross: true },
    { source: "pr_borda", target: "sk_mobile", cross: true },

    { source: "pr_rotavida", target: "tl_fb_sb", cross: true },
    { source: "pr_rotavida", target: "sk_sec", cross: true },

    { source: "pr_vigia", target: "tl_ads", cross: true },
    { source: "pr_vigia", target: "dom_growth", cross: true },
    { source: "pr_vigia", target: "co_mf", cross: true },

    { source: "pr_reels", target: "tl_remotion", cross: true },
    { source: "pr_reels", target: "dom_video", cross: true },
    { source: "dom_video", target: "im_roas", cross: true },
    { source: "pr_reels", target: "tl_native", cross: true },

    { source: "co_solan", target: "im_79k", cross: true },
    { source: "co_solan", target: "im_leads", cross: true },
    { source: "co_solan", target: "tl_rd", cross: true },
    { source: "co_solan", target: "tl_n8n", cross: true },
    { source: "co_solan", target: "tl_ads", cross: true },
    { source: "co_solan", target: "sk_bi", cross: true },
    { source: "co_solan", target: "sk_crm", cross: true },

    { source: "co_d2c", target: "im_google1", cross: true },
    { source: "co_d2c", target: "im_roas", cross: true },
    { source: "co_d2c", target: "im_cpc", cross: true },
    { source: "co_d2c", target: "tl_shopify", cross: true },
    { source: "co_d2c", target: "sk_seo", cross: true },
    { source: "co_d2c", target: "sk_copy", cross: true },

    { source: "co_loft", target: "tl_shopify", cross: true },
    { source: "co_loft", target: "sk_seo", cross: true },
    { source: "co_loft", target: "dom_ecom", cross: true },

    { source: "co_mf", target: "dom_growth", cross: true },
    { source: "co_mf", target: "tl_ads", cross: true },

    { source: "ed_infnet", target: "dom_swe", cross: true },
    { source: "ed_infnet", target: "tl_python", cross: true },
    { source: "ed_unicv", target: "dom_growth", cross: true },
    { source: "ed_unicv", target: "sk_crm", cross: true }
  ],

  tourSteps: [
    { nodeId: "mattheus", title: "1/6 • A Vantagem Híbrida de Mattheus Moraes", text: "Une Engenharia de Software (INFNET) à vivência real de quem já operou tráfego pago, CRM e e-commerce com capital próprio e metas executivas." },
    { nodeId: "co_d2c", title: "2/6 • Origem Empreendedora (E-commerce D2C)", text: "Fundou uma operação própria em Shopify do zero: alcançou 1º lugar orgânico no Google, ROAS 4,65x e reduziu o CPC em quase 7x." },
    { nodeId: "co_solan", title: "3/6 • Escala Corporativa (Solan Group)", text: "Segmentou 79 mil contatos elevando abertura de e-mail de 7% para 19%, gerou até 608 leads/mês e estruturou o framework de KPIs junto ao CEO." },
    { nodeId: "ed_infnet", title: "4/6 • Engenharia de Software (INFNET)", text: "Transformou gargalos comerciais e operacionais em software autoral: APIs, mobile nativo, bancos isolados e nuvem serverless." },
    { nodeId: "pr_orion", title: "5/6 • IA Soberana (Órion)", text: "Construiu seu próprio assistente cognitivo em React Native + FastAPI com cofre criptografado DPAPI e 46 testes automatizados." },
    { nodeId: "pr_easycode", title: "6/6 • Produto em Produção (EasyCode)", text: "Lançou plataforma educacional gamificada executando Python, JS e SQL direto no navegador via WebAssembly, sem custo de servidor." }
  ]
};
