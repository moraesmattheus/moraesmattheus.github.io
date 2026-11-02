/* ==========================================================================
   Arquivo: js/i18n.js
   Data/Hora: 02/11/2026 10:45
   O que é: Sistema completo de internacionalização trilingue (Português PT-BR,
   Inglês EN e Espanhol ES) + dados editoriais da Vitrine Dopamine Studio e dos
   Exemplos Reais de Edição de Vídeo do portfólio de Mattheus Moraes.
   O que foi feito e finalidade de cada bloco:
     1. Dicionário de Interface (UI_STRINGS): Traduz instantaneamente cabeçalho,
        Hero, Vórtice 3D "Minhas Obras", Vitrine Dopamine, Estúdio UI/UX, Mini
        Apps, Edição de Vídeo, Grafo, Sobre e Concierge sem recarregar a página.
     2. Casos Editoriais Estilo Dopamine Studio (DOPAMINE_CASES): 6 projetos
        principais com 3 tags luminosas, título monumental, punchline em caixa
        alta e conexão direta com o teste interativo ao vivo nos 3 idiomas.
     3. Exemplos Reais de Edição de Vídeo (VIDEO_EXAMPLES): Metadados técnicos
        dos 4 vídeos reais (.mp4) editados por Mattheus + comparador Antes/Depois.
     4. Motor NS.setLanguage(lang): Atualiza o DOM, salva preferência local e
        dispara o evento "mattheus:langchange" para todos os módulos JS.
   ========================================================================== */

(function () {
  "use strict";

  const NS = (window.MattheusPortfolio = window.MattheusPortfolio || {});

  /* ------------------------------------------------------------------------
     BLOCO 1: Casos Principais no Formato Editorial Dopamine Studio (PT/EN/ES)
     Data/Hora: 02/11/2026 10:45
     Finalidade: Alimentar a seção #projetos com o visual exato da referência
     enviada (3 pílulas em destaque + título + subtítulo espaçado + botão ↗).
     ------------------------------------------------------------------------ */
  NS.DOPAMINE_CASES = [
    {
      id: "site-vania",
      num: "01",
      shortLabel: "01 · Vania Faria UI/UX",
      studioTarget: "sites",
      image: "assets/img/vania-faria-perfil.webp",
      aura: "rgba(201, 169, 124, 0.36)",
      pt: {
        tags: ["UI/UX DESIGN", "DESENVOLVIMENTO", "CRO"],
        title: "Vania Faria Imóveis",
        punch: "PROJETADO PARA VENDER ALTO PADRÃO. E ACONTECEU.",
        desc: "Imóveis singulares exigiam uma direção de arte Quiet Luxury à altura do ticket. Construí a arquitetura de informação, o filtro Off-Market sob NDA e o painel admin Drag & Drop completo."
      },
      en: {
        tags: ["UI/UX DESIGN", "DEVELOPMENT", "CRO"],
        title: "Vania Faria Real Estate",
        punch: "DESIGNED TO SELL HIGH-END LUXURY. AND IT DID.",
        desc: "Singular luxury properties demanded Quiet Luxury art direction matching their price tag. I built the UX architecture, NDA Off-Market curation, and a custom Drag & Drop admin panel."
      },
      es: {
        tags: ["DISEÑO UI/UX", "DESARROLLO", "CRO"],
        title: "Vania Faria Inmuebles",
        punch: "DISEÑADO PARA VENDER ALTO VALOR. Y SUCEDIÓ.",
        desc: "Propiedades exclusivas exigían dirección de arte Quiet Luxury al nivel del ticket. Construí la arquitectura UX, curaduría Off-Market bajo NDA y panel admin Drag & Drop."
      }
    },
    {
      id: "orion",
      num: "02",
      shortLabel: "02 · App Órion IA",
      studioTarget: "apps",
      appTarget: "orionHome",
      image: "assets/img/orion-home.png",
      aura: "rgba(139, 92, 246, 0.42)",
      pt: {
        tags: ["MOBILE APP", "IA SOBERANA", "FASTAPI"],
        title: "Órion Super App",
        punch: "MEMÓRIA INTELIGENTE, ZERO DADOS INVENTADOS.",
        desc: "Assistente mobile nativo em React Native + Expo e backend Python com RAG contextual, comandos de voz, cofre criptografado local (DPAPI) e 46 testes automatizados."
      },
      en: {
        tags: ["MOBILE APP", "SOVEREIGN AI", "FASTAPI"],
        title: "Órion Super App",
        punch: "PERSISTENT MEMORY, ZERO HALLUCINATED DATA.",
        desc: "Native mobile companion built with React Native + Expo and Python FastAPI featuring contextual RAG, voice routines, local DPAPI encrypted vault, and 46 automated tests."
      },
      es: {
        tags: ["APP MÓVIL", "IA SOBERANA", "FASTAPI"],
        title: "Órion Super App",
        punch: "MEMORIA INTELIGENTE, CERO DATOS INVENTADOS.",
        desc: "Aplicación móvil nativa en React Native + Expo y backend Python FastAPI con memoria RAG, voz, bóveda cifrada local (DPAPI) y 46 pruebas automatizadas."
      }
    },
    {
      id: "easycode",
      num: "03",
      shortLabel: "03 · EasyCode Web",
      studioTarget: "easycode",
      image: "assets/img/easycode.png",
      aura: "rgba(56, 189, 248, 0.40)",
      pt: {
        tags: ["WEB PLATFORM", "WEBASSEMBLY", "UI GAMIFICADA"],
        title: "EasyCode (Pyra)",
        punch: "PYTHON, JS E SQL RODANDO DIRETO NO NAVEGADOR.",
        desc: "Plataforma EdTech no ar (easy-code.tech) com 32 aulas práticas, compilação instantânea via Web Workers sem servidor lento, modo 100% offline (PWA) e sistema de XP."
      },
      en: {
        tags: ["WEB PLATFORM", "WEBASSEMBLY", "GAMIFIED UX"],
        title: "EasyCode (Pyra)",
        punch: "PYTHON, JS & SQL RUNNING LIVE IN THE BROWSER.",
        desc: "Live EdTech platform (easy-code.tech) with 32 interactive lessons, zero-latency WebAssembly execution inside Web Workers, offline PWA support, and XP progression."
      },
      es: {
        tags: ["PLATAFORMA WEB", "WEBASSEMBLY", "UX GAMIFICADA"],
        title: "EasyCode (Pyra)",
        punch: "PYTHON, JS Y SQL EJECUTÁNDOSE EN EL NAVEGADOR.",
        desc: "Plataforma EdTech en vivo (easy-code.tech) con 32 clases interactivas, ejecución instantánea vía WebAssembly en Web Workers, soporte PWA offline y sistema de XP."
      }
    },
    {
      id: "hub-hom",
      num: "04",
      shortLabel: "04 · Hub HOM & BI",
      studioTarget: "traffic",
      image: "assets/img/hub-marketing.png",
      aura: "rgba(99, 102, 241, 0.40)",
      pt: {
        tags: ["SISTEMA INTERNO", "BI MULTICANAL", "TRÁFEGO"],
        title: "Hub Corporativo HOM",
        punch: "23 TELAS UNIFICANDO 5 CANAIS DE VENDA EM TEMPO REAL.",
        desc: "Portal corporativo e painel executivo em Cloudflare Pages + KV consolidando Shopify, Mercado Livre, Shopee, TikTok Shop e Amazon com ROAS, CAC e rituais de equipe."
      },
      en: {
        tags: ["INTERNAL SYSTEM", "MULTICHANNEL BI", "GROWTH"],
        title: "HOM Corporate Hub",
        punch: "23 SCREENS UNIFYING 5 SALES CHANNELS IN REAL TIME.",
        desc: "Corporate portal and executive BI on Cloudflare Pages + KV consolidating Shopify, Mercado Livre, Shopee, TikTok Shop, and Amazon with live ROAS, CAC, and team rituals."
      },
      es: {
        tags: ["SISTEMA INTERNO", "BI MULTICANAL", "TRÁFICO"],
        title: "Hub Corporativo HOM",
        punch: "23 PANTALLAS UNIFICANDO 5 CANALES EN TIEMPO REAL.",
        desc: "Portal corporativo y panel ejecutivo en Cloudflare Pages + KV consolidando Shopify, Mercado Libre, Shopee, TikTok Shop y Amazon con ROAS, CAC y rutinas de equipo."
      }
    },
    {
      id: "crm-manu",
      num: "05",
      shortLabel: "05 · CRM Comercial",
      studioTarget: "crm",
      image: "assets/img/hub-inicio.png",
      aura: "rgba(52, 211, 153, 0.34)",
      pt: {
        tags: ["CRM SOB MEDIDA", "AUTOMAÇÃO", "RETENÇÃO"],
        title: "CRM & Pipeline Comercial",
        punch: "FIM DAS PLANILHAS SOLTAS E DOS LEADS ESQUECIDOS.",
        desc: "Sistema comercial desenhado para controlar funil de vendas, fluxo de caixa diário e alertas automáticos de clientes sumidos para reativação imediata via WhatsApp."
      },
      en: {
        tags: ["CUSTOM CRM", "AUTOMATION", "RETENTION"],
        title: "Custom Sales CRM",
        punch: "NO MORE MESSY SPREADSHEETS OR FORGOTTEN LEADS.",
        desc: "Tailor-made commercial system built to manage sales pipelines, daily cashflow, and automated alerts to reactivate dormant clients via WhatsApp in one click."
      },
      es: {
        tags: ["CRM A MEDIDA", "AUTOMATIZACIÓN", "RETENCIÓN"],
        title: "CRM y Embudo Comercial",
        punch: "FIN DE LAS HOJAS SUELTAS Y CLIENTES OLVIDADOS.",
        desc: "Sistema comercial hecho a medida para controlar embudo de ventas, caja diaria y alertas automáticas para reactivar clientes inactivos por WhatsApp."
      }
    },
    {
      id: "pastas-barra",
      num: "06",
      shortLabel: "06 · Pastas Windows 11",
      studioTarget: "apps",
      appTarget: "winDesktop",
      image: "assets/img/pastas-barra-1.png",
      aura: "rgba(14, 165, 233, 0.38)",
      pt: {
        tags: ["DESKTOP NATIVO", "C# / WPF", "UI ACRÍLICA"],
        title: "Pastas na Barra (Win 11)",
        punch: "PRODUTIVIDADE NATIVA COM ACABAMENTO ACRÍLICO.",
        desc: "Software ultraleve em C#/.NET para Windows 11 que restaura pastas flutuantes organizadoras direto na barra de tarefas, com instalador próprio e código aberto."
      },
      en: {
        tags: ["NATIVE DESKTOP", "C# / WPF", "ACRYLIC UI"],
        title: "Taskbar Folders (Win 11)",
        punch: "NATIVE WINDOWS 11 PRODUCTIVITY WITH ACRYLIC POLISH.",
        desc: "Ultra-lightweight C#/.NET desktop app for Windows 11 bringing floating app folders directly to the taskbar, complete with custom installer and open-source code."
      },
      es: {
        tags: ["ESCRITORIO NATIVO", "C# / WPF", "UI ACRÍLICA"],
        title: "Carpetas en Barra (Win 11)",
        punch: "PRODUCTIVIDAD NATIVA CON ACABADO ACRÍLICO.",
        desc: "Software ultraligero en C#/.NET para Windows 11 que crea carpetas flotantes de aplicaciones en la barra de tareas, con instalador propio y código abierto."
      }
    }
  ];

  /* ------------------------------------------------------------------------
     BLOCO 2: Exemplos Reais de Edição de Vídeo (.mp4) + Comparador Antes/Depois
     Data/Hora: 02/11/2026 10:45
     Finalidade: Mostrar na prática o que Mattheus executa nos vídeos (Motion 3D,
     VFX, cortes de retenção, legendas animadas, Motion UI e áudio -14 LUFS).
     ------------------------------------------------------------------------ */
  NS.VIDEO_EXAMPLES = [
    {
      id: "vfx3d",
      type: "mp4",
      src: "assets/video/exemplo-3d-vfx.mp4",
      pt: {
        pill: "01 · Motion 3D & VFX (60fps)",
        title: "Câmera 3D, Iluminação VFX e Transições de Impacto",
        desc: "Composição completa unindo cenas 3D, brilho volumétrico, movimento de câmera sincronizado na batida e apresentação de produto em 60 quadros por segundo.",
        badges: ["Câmera 3D", "VFX & Glow", "60 FPS Real", "Sound Design", "Hook Visual 3s"]
      },
      en: {
        pill: "01 · 3D Motion & VFX (60fps)",
        title: "3D Camera Moves, VFX Lighting & High-Impact Transitions",
        desc: "Full motion composition combining 3D scenes, volumetric glow, beat-synced camera motion, and 60fps product storytelling.",
        badges: ["3D Camera", "VFX & Glow", "True 60 FPS", "Sound Design", "3s Visual Hook"]
      },
      es: {
        pill: "01 · Motion 3D y VFX (60fps)",
        title: "Cámara 3D, Iluminación VFX y Transiciones de Impacto",
        desc: "Composición completa con escenas 3D, brillo volumétrico, movimiento de cámara al ritmo y presentación de producto a 60 cuadros por segundo.",
        badges: ["Cámara 3D", "VFX y Glow", "60 FPS Reales", "Sound Design", "Gancho 3s"]
      }
    },
    {
      id: "retencao",
      type: "mp4",
      src: "assets/video/exemplo-reel-retencao.mp4",
      pt: {
        pill: "02 · Reel Dinâmico & Legendas",
        title: "Corte Cirúrgico de Pausas, Zooms e Legenda Cinética",
        desc: "Formato campeão para Reels, TikTok e Criativos de Ads (CTR 6,20% e picos de 72 mil views): zero respiro morto, destaque de palavras-chave e retenção até o CTA.",
        badges: ["Corte de Silêncios", "Legenda Animada", "Zooms Dinâmicos", "CTR 6,20%", "Formato 9:16"]
      },
      en: {
        pill: "02 · High-Retention Reel & Captions",
        title: "Zero-Dead-Air Jump Cuts, Punch Zooms & Kinetic Captions",
        desc: "Winning format for Reels, TikTok, and Paid Social Ads (6.20% CTR and 72k organic views): surgical breath cuts, highlighted keywords, and retention through CTA.",
        badges: ["Silence Removal", "Kinetic Captions", "Dynamic Zooms", "6.20% CTR", "9:16 Vertical"]
      },
      es: {
        pill: "02 · Reel Dinámico y Subtítulos",
        title: "Corte Quirúrgico de Pausas, Zooms y Subtítulos Cinéticos",
        desc: "Formato ganador para Reels, TikTok y Anuncios (CTR 6,20% y 72 mil vistas): cero pausas muertas, palabras clave resaltadas y retención hasta el cierre.",
        badges: ["Corte de Pausas", "Subtítulo Animado", "Zooms Dinámicos", "CTR 6,20%", "Formato 9:16"]
      }
    },
    {
      id: "motionui",
      type: "mp4",
      src: "assets/video/exemplo-motion-ui.mp4",
      pt: {
        pill: "03 · Motion UI de Produto",
        title: "Animação de Interfaces, SaaS, Sites e Aplicativos",
        desc: "Transformo telas estáticas do seu site, sistema ou app em demonstrações em vídeo ultra dinâmicas que explicam o valor do produto em segundos.",
        badges: ["UI em Movimento", "Cursor & Destaques", "Ritmo Comercial", "Ideal p/ Landing Pages"]
      },
      en: {
        pill: "03 · Product & SaaS Motion UI",
        title: "Animated Interfaces for Websites, SaaS & Mobile Apps",
        desc: "Turns static screens from your website, CRM, or app into sleek animated product showcases that communicate value in seconds.",
        badges: ["UI Motion", "Cursor & Callouts", "Commercial Pacing", "Landing Page Ready"]
      },
      es: {
        pill: "03 · Motion UI de Producto",
        title: "Animación de Interfaces para Sitios, SaaS y Apps",
        desc: "Transformo pantallas estáticas de tu web, sistema o app en demostraciones animadas que explican el valor del producto en segundos.",
        badges: ["UI en Movimiento", "Callouts Visuales", "Ritmo Comercial", "Ideal p/ Ventas"]
      }
    },
    {
      id: "narracao",
      type: "mp4",
      src: "assets/video/exemplo-voz-narracao.mp4",
      pt: {
        pill: "04 · Voz -14 LUFS & Storytelling",
        title: "Áudio Cristalino Masterizado + B-Roll + Ritmo de Venda",
        desc: "Tratamento completo de voz, limpeza de ruído, nivelamento profissional em -14 LUFS (padrão streaming/redes) e inserções visuais sincronizadas com a fala.",
        badges: ["Masterização -14 LUFS", "Voz Limpa", "B-Roll Sincronizado", "Color DaVinci"]
      },
      en: {
        pill: "04 · -14 LUFS Voice & Storytelling",
        title: "Broadcast-Level Voice Mastering + Synced Visual B-Roll",
        desc: "Full voice treatment, noise cleanup, professional -14 LUFS loudness normalization, and visual inserts synced word-for-word.",
        badges: ["-14 LUFS Master", "Clean Dialogue", "Synced B-Roll", "DaVinci Color"]
      },
      es: {
        pill: "04 · Voz -14 LUFS y Storytelling",
        title: "Audio Cristalino Masterizado + B-Roll Sincronizado",
        desc: "Tratamiento completo de voz, limpieza de ruido, nivelación en -14 LUFS y recursos visuales sincronizados con cada frase.",
        badges: ["Master -14 LUFS", "Voz Limpia", "B-Roll Sincronizado", "Color DaVinci"]
      }
    },
    {
      id: "beforeafter",
      type: "canvas",
      src: "",
      pt: {
        pill: "05 · Comparador Antes vs Depois",
        title: "Simulador Ao Vivo: Arquivo Bruto de Câmera vs Edição Final",
        desc: "Alterne abaixo entre 'Antes (Bruto)' e 'Depois (Editado)' para comparar o impacto visual de Color Grading, corte de respiros e legendas dinâmicas.",
        badges: ["Comparativo Interativo", "LOG vs Color Grading", "-24 LUFS vs -14 LUFS"]
      },
      en: {
        pill: "05 · Before vs After Comparator",
        title: "Live Simulator: Raw Camera File vs Final Retention Edit",
        desc: "Switch between 'Before (Raw)' and 'After (Edited)' below to see the jump in color grading, silence cutting, and dynamic captions.",
        badges: ["Interactive Compare", "Flat LOG vs Graded", "-24 LUFS vs -14 LUFS"]
      },
      es: {
        pill: "05 · Comparador Antes vs Después",
        title: "Simulador en Vivo: Archivo Crudo vs Edición Final",
        desc: "Alterna entre 'Antes (Crudo)' y 'Después (Editado)' para ver el salto en corrección de color, corte de silencios y subtítulos dinámicos.",
        badges: ["Comparación en Vivo", "LOG vs Color Grading", "-24 LUFS vs -14 LUFS"]
      }
    }
  ];

  /* ------------------------------------------------------------------------
     BLOCO 3: Dicionário Completo da Interface nos 3 Idiomas (PT · EN · ES)
     Data/Hora: 02/11/2026 10:45
     ------------------------------------------------------------------------ */
  const UI = {
    pt: {
      pageTitle: "Mattheus Moraes · UI/UX, Sites, Sistemas & CRMs, Apps, Vídeos & Tráfego Pago",
      navHome: "Início",
      navWorks: "Obras 3D",
      navProjects: "Projetos",
      navLive: "Teste Ao Vivo",
      navAbout: "Grafo & Sobre",
      navContact: "Contato",
      headerCta: "Orçar Projeto →",
      floatCta: "Fechar Projeto Comigo",
      tokensBtn: "NEON · T",
      tokensTitle: "Cor Neon & Design Tokens",
      tokensHint: "Escolha a cor Neon que ilumina os menus selecionados, botões e cenas 3D (tecla T):",
      searchPlaceholder: "O que você está procurando hoje?",
      searchSugLabel: "Sugestões em alta:",
      searchTag1: "UI/UX & Landing Page",
      searchTag2: "CRM Sob Medida",
      searchTag3: "Aplicativos & IA",
      searchTag4: "Edição de Vídeo",
      searchTag5: "Tráfego Pago",
      heroEyebrow: "Disponível para Novos Projetos · Florianópolis, SC & Global",
      heroHeadline: "UI/UX, sites, sistemas, apps, <span class='serif-luxury'>vídeos</span> e tráfego que vendem mais.",
      heroSubcopy: "Uno <strong>Web Design (UI/UX)</strong>, <strong>Engenharia de Software (INFNET)</strong>, edição cinematográfica e tráfego pago em um só lugar. Do protótipo e <strong>CRM sob medida</strong> aos vídeos e anúncios que geram lucro real.",
      chipSites: "UI/UX & Sites",
      chipCrm: "Sistemas & CRMs",
      chipApps: "Apps Mobile & PC",
      chipVideo: "Edição de Vídeos",
      chipTraffic: "Tráfego Pago",
      heroCtaPrimary: "Testar Meu Trabalho Ao Vivo",
      heroCtaSecondary: "Chamar no WhatsApp",
      socialLabel: "Redes Oficiais, GitHub & Contato Direto · Passe o mouse",
      kpi1Num: "18 <em>projetos</em>",
      kpi1Cap: "Sites UI/UX, CRMs, aplicativos mobile/desktop, automações de vídeo e painéis reais.",
      kpi2Num: "4,65x <em>ROAS</em>",
      kpi2Cap: "1º lugar orgânico no Google em loja própria e queda de CPC de R$ 0,74 para R$ 0,11.",
      kpi3Num: "72 mil <em>views</em>",
      kpi3Cap: "Retenção orgânica em vídeo e CTR de 6,20% em criativos editados com método próprio.",
      kpi4Num: "608 <em>leads/mês</em>",
      kpi4Cap: "Geração constante de demanda comercial com CPL auditado entre R$ 2,20 e R$ 4,23.",
      vortexKicker: "Galeria Imersiva 3D · Arraste para Girar ou Clique em uma Obra",
      vortexTitle: "Minhas <span class='serif-vortex'>Obras</span>",
      vortexHint: "Clique em qualquer tela orbitando para testar o projeto funcionando",
      dopamineKicker: "Estudos de Caso em Destaque",
      dopamineHeading: "Engenharia, UI/UX e performance <span class='serif-luxury'>aplicadas a negócios.</span>",
      dopamineTryBtn: "Testar Funcionando Agora ↓",
      dopamineDossierBtn: "Ver Ficha Técnica Completa",
      toggleAll18Closed: "Explorar Todos os 18 Projetos + Filtros ↓",
      toggleAll18Open: "Recolher Catálogo Completo ↑",
      liveKicker: "Experiência Interativa Real · Clique e Use",
      liveHeading: "Cinco frentes integradas. <span class='serif-luxury'>Clique e teste ao vivo.</span>",
      liveDesc: "Escolha uma área abaixo: inspecione o Raio-X UI/UX de um site, mova vendas num CRM, use um app funcionando, assista exemplos reais de edição ou simule tráfego.",
      p1Title: "UI/UX & Sites",
      p1Sub: "Grid, Design System, WCAG & Conversão",
      p2Title: "Sistemas & CRM",
      p2Sub: "Kanban, Caixa & Reativação",
      p3Title: "Apps Funcionando",
      p3Sub: "iOS, Android, Windows 11 & IA",
      p4Title: "Edição de Vídeos",
      p4Sub: "Motion 3D, VFX, Legendas & -14 LUFS",
      p5Title: "Tráfego & Ads",
      p5Sub: "Meta, Google, TikTok & ROAS",
      devDesktop: "Computador",
      devMobile: "Celular",
      uxModeFinal: "1. UI Final & Conversão",
      uxModeXray: "2. Raio-X UX & Grid 12 Col",
      uxModeTokens: "3. Design System & WCAG",
      uxModeIde: "4. Plataforma EasyCode",
      videoExamplesLabel: "Escolha um exemplo real de edição para assistir:",
      videoSoundOff: "Ativar Áudio do Vídeo",
      videoSoundOn: "Silenciar Áudio",
      aboutKicker: "Trajetória, Conexões & Resultados",
      aboutHeading: "Visão de dono. <span class='serif-luxury'>Execução ponta a ponta.</span>",
      tabGraph: "01 · Grafo Interativo (54 Nós)",
      tabBio: "02 · Sobre Mim, Relógio & Experiência",
      tabMetrics: "03 · Métricas & Resultados Auditados",
      aboutWhyTitle: "Por que clientes e empresas fecham comigo?",
      aboutWhyP1: "Porque uno <strong>UI/UX Design</strong>, <strong>código de verdade</strong>, <strong>edição de vídeos</strong> e <strong>gestão de tráfego</strong> sem telefone sem fio: crio o site ou app, monto o CRM comercial, edito os anúncios e escalo as vendas.",
      aboutWhyP2: "Graduado em <strong>Marketing Digital (UNICV)</strong>, graduando em <strong>Engenharia de Software (INFNET)</strong>, gestor de performance e fundador de e-commerce próprio nº 1 orgânico no Google.",
      contactKicker: "Vamos Conversar",
      contactHeading: "Tem um projeto em mente? <span class='serif-luxury'>Vamos tirar do papel.</span>",
      contactDesc: "Selecione o que você precisa hoje para enviar uma mensagem pronta no meu WhatsApp ou acesse GitHub, LinkedIn e currículos ao lado.",
      contactStep1: "01 · O que você precisa hoje?",
      topicSite: "UI/UX & Site de Alto Padrão",
      topicCrm: "Sistema Sob Medida / CRM",
      topicApp: "Aplicativo Mobile ou Desktop",
      topicVideo: "Edição de Vídeos & Motion",
      topicTraffic: "Marketing & Tráfego Pago",
      topicFull: "Pacote Completo (360°)",
      labelName: "Seu Nome ou Empresa",
      phName: "Ex.: Rodrigo · Clínica / Construtora / SaaS",
      labelMsg: "Me conte rapidamente sua ideia ou meta (opcional)",
      phMsg: "Ex.: Preciso de um site com UI/UX premium, organizar leads num CRM e editar vídeos para anúncios...",
      btnWhatsappNow: "Chamar no WhatsApp Agora",
      btnCopyEmail: "Copiar E-mail",
      cvHeader: "Currículos & Apresentação (PDF)",
      footerCopy: "© 2026 Mattheus Moraes · UI/UX, Sites, Sistemas, Apps, Edição de Vídeos & Tráfego Pago."
    },
    en: {
      pageTitle: "Mattheus Moraes · UI/UX Web Design, Custom Systems & CRMs, Apps, Video Editing & Paid Ads",
      navHome: "Home",
      navWorks: "3D Works",
      navProjects: "Projects",
      navLive: "Live Demo",
      navAbout: "Graph & About",
      navContact: "Contact",
      headerCta: "Start a Project →",
      floatCta: "Work With Me",
      tokensBtn: "NEON · T",
      tokensTitle: "Neon Glow & Design Tokens",
      tokensHint: "Pick the Neon accent that lights up active menus, buttons, and 3D scenes (shortcut T):",
      searchPlaceholder: "What are you looking for today?",
      searchSugLabel: "Trending searches:",
      searchTag1: "UI/UX & Landing Page",
      searchTag2: "Custom CRM",
      searchTag3: "Mobile Apps & AI",
      searchTag4: "Video Editing",
      searchTag5: "Paid Media & ROAS",
      heroEyebrow: "Available for New Projects · Brazil & Worldwide Remote",
      heroHeadline: "UI/UX websites, CRMs, apps, <span class='serif-luxury'>videos</span> & ads built to grow revenue.",
      heroSubcopy: "Combining <strong>UI/UX Web Design</strong>, <strong>Software Engineering (INFNET)</strong>, cinematic video editing, and paid media under one roof. From Figma design systems and <strong>custom CRMs</strong> to high-converting video ads.",
      chipSites: "UI/UX & Websites",
      chipCrm: "Systems & CRMs",
      chipApps: "Mobile & Desktop Apps",
      chipVideo: "Video Editing & VFX",
      chipTraffic: "Paid Media & Growth",
      heroCtaPrimary: "Test My Work Live",
      heroCtaSecondary: "Chat on WhatsApp",
      socialLabel: "Official Profiles, GitHub & Direct Contact · Hover to expand",
      kpi1Num: "18 <em>projects</em>",
      kpi1Cap: "Real UI/UX websites, CRMs, mobile/desktop apps, video pipelines, and BI dashboards built.",
      kpi2Num: "4.65x <em>ROAS</em>",
      kpi2Cap: "#1 organic Google ranking on own store and CPC reduced by 85% (from R$ 0.74 to R$ 0.11).",
      kpi3Num: "72k <em>views</em>",
      kpi3Cap: "Organic video retention peak and 6.20% CTR on custom-edited ad creatives.",
      kpi4Num: "608 <em>leads/mo</em>",
      kpi4Cap: "Consistent qualified lead generation with audited CPL between R$ 2.20 and R$ 4.23.",
      vortexKicker: "Immersive 3D Gallery · Drag to Orbit or Click Any Screen",
      vortexTitle: "My <span class='serif-vortex'>Works</span>",
      vortexHint: "Click any orbiting screen to launch its interactive experience",
      dopamineKicker: "Featured Case Studies",
      dopamineHeading: "Engineering, UI/UX & growth <span class='serif-luxury'>built for real impact.</span>",
      dopamineTryBtn: "Try Live Interactive Demo ↓",
      dopamineDossierBtn: "Read Technical Case Study",
      toggleAll18Closed: "Explore All 18 Built Projects + Filters ↓",
      toggleAll18Open: "Collapse Full 18-Project Archive ↑",
      liveKicker: "Hands-On Interactive Playground · Click & Use",
      liveHeading: "Five integrated disciplines. <span class='serif-luxury'>Click and test live.</span>",
      liveDesc: "Select any pillar below: inspect UI/UX grids & WCAG tokens, move deals in a live CRM, operate working apps, watch real video edits, or simulate ad ROAS.",
      p1Title: "UI/UX & Websites",
      p1Sub: "12-Col Grid, Tokens, WCAG & CRO",
      p2Title: "Systems & CRM",
      p2Sub: "Kanban, Cashflow & Retention",
      p3Title: "Working Apps",
      p3Sub: "iOS, Android, Windows 11 & AI",
      p4Title: "Video Editing",
      p4Sub: "3D Motion, VFX, Captions & -14 LUFS",
      p5Title: "Paid Traffic & Ads",
      p5Sub: "Meta, Google, TikTok & ROAS",
      devDesktop: "Desktop",
      devMobile: "Mobile",
      uxModeFinal: "1. Final UI & CRO",
      uxModeXray: "2. UX X-Ray & 12-Col Grid",
      uxModeTokens: "3. Design System & WCAG",
      uxModeIde: "4. Live EasyCode IDE",
      videoExamplesLabel: "Pick a real video editing example to watch:",
      videoSoundOff: "Unmute Video Audio",
      videoSoundOn: "Mute Audio",
      aboutKicker: "Career Map, Background & Audited Proof",
      aboutHeading: "Owner mindset. <span class='serif-luxury'>End-to-end execution.</span>",
      tabGraph: "01 · Interactive Career Graph (54 Nodes)",
      tabBio: "02 · About Me, Live Clock & Experience",
      tabMetrics: "03 · Audited Growth & CRM Metrics",
      aboutWhyTitle: "Why do clients and teams work with me?",
      aboutWhyP1: "Because I bridge <strong>UI/UX Design</strong>, <strong>production software engineering</strong>, <strong>video editing</strong>, and <strong>paid traffic</strong> without agency handoff friction: I design and code the product, build the CRM, edit the creatives, and scale acquisition.",
      aboutWhyP2: "Degree in <strong>Digital Marketing (UNICV)</strong>, <strong>Software Engineering undergraduate (INFNET)</strong>, performance manager, and founder of an e-commerce brand ranked #1 organically on Google.",
      contactKicker: "Let's Build Together",
      contactHeading: "Have a project in mind? <span class='serif-luxury'>Let's make it real.</span>",
      contactDesc: "Choose what you need below to open a pre-filled WhatsApp chat, or connect via GitHub, LinkedIn, email, and PDF resumes.",
      contactStep1: "01 · What do you need today?",
      topicSite: "UI/UX & High-End Website",
      topicCrm: "Custom System / CRM",
      topicApp: "Mobile or Desktop App",
      topicVideo: "Video Editing & Motion VFX",
      topicTraffic: "Paid Media & Growth",
      topicFull: "Full 360° Growth + Tech Package",
      labelName: "Your Name or Company",
      phName: "E.g. Alex · SaaS / Real Estate / Clinic",
      labelMsg: "Briefly share your goal or idea (optional)",
      phMsg: "E.g. We need a high-converting website, a custom lead CRM, and edited video ads...",
      btnWhatsappNow: "Message Me on WhatsApp",
      btnCopyEmail: "Copy Email",
      cvHeader: "Resumes & Executive Deck (PDF)",
      footerCopy: "© 2026 Mattheus Moraes · UI/UX Web Design, Systems, Apps, Video Editing & Paid Traffic."
    },
    es: {
      pageTitle: "Mattheus Moraes · UI/UX Web, Sistemas y CRMs, Apps, Edición de Video y Tráfico Pago",
      navHome: "Inicio",
      navWorks: "Obras 3D",
      navProjects: "Proyectos",
      navLive: "Prueba en Vivo",
      navAbout: "Grafo y Sobre Mí",
      navContact: "Contacto",
      headerCta: "Cotizar Proyecto →",
      floatCta: "Iniciar Proyecto",
      tokensBtn: "NEÓN · T",
      tokensTitle: "Color Neón y Design Tokens",
      tokensHint: "Elige el color Neón que ilumina menús activos, botones y escenas 3D (tecla T):",
      searchPlaceholder: "¿Qué estás buscando hoy?",
      searchSugLabel: "Búsquedas destacadas:",
      searchTag1: "UI/UX y Landing Page",
      searchTag2: "CRM a Medida",
      searchTag3: "Aplicaciones e IA",
      searchTag4: "Edición de Video",
      searchTag5: "Tráfico Pago",
      heroEyebrow: "Disponible para Nuevos Proyectos · Brasil y Remoto Global",
      heroHeadline: "UI/UX, sitios, sistemas, apps, <span class='serif-luxury'>videos</span> y anuncios que venden más.",
      heroSubcopy: "Uno <strong>Diseño Web UI/UX</strong>, <strong>Ingeniería de Software (INFNET)</strong>, edición cinematográfica y tráfico pago en un solo lugar. Del sistema de diseño y <strong>CRM a medida</strong> a los anuncios que generan ventas reales.",
      chipSites: "UI/UX y Sitios Web",
      chipCrm: "Sistemas y CRMs",
      chipApps: "Apps Móviles y PC",
      chipVideo: "Edición de Videos",
      chipTraffic: "Tráfico Pago y Ads",
      heroCtaPrimary: "Probar Mi Trabajo en Vivo",
      heroCtaSecondary: "Hablar por WhatsApp",
      socialLabel: "Redes Oficiales, GitHub y Contacto Directo · Pasa el cursor",
      kpi1Num: "18 <em>proyectos</em>",
      kpi1Cap: "Sitios UI/UX, CRMs, apps móviles/escritorio, automatización de video y paneles reales.",
      kpi2Num: "4,65x <em>ROAS</em>",
      kpi2Cap: "1er lugar orgánico en Google en tienda propia y caída de CPC de R$ 0,74 a R$ 0,11.",
      kpi3Num: "72 mil <em>vistas</em>",
      kpi3Cap: "Retención orgánica en video y CTR de 6,20% en anuncios editados con método propio.",
      kpi4Num: "608 <em>leads/mes</em>",
      kpi4Cap: "Generación constante de clientes potenciales con CPL entre R$ 2,20 y R$ 4,23.",
      vortexKicker: "Galería Inmersiva 3D · Arrastra para Girar o Haz Clic",
      vortexTitle: "Mis <span class='serif-vortex'>Obras</span>",
      vortexHint: "Haz clic en cualquier pantalla para probar el proyecto funcionando",
      dopamineKicker: "Casos de Estudio Destacados",
      dopamineHeading: "Ingeniería, UI/UX y crecimiento <span class='serif-luxury'>enfocados en ventas.</span>",
      dopamineTryBtn: "Probar Funcionando Ahora ↓",
      dopamineDossierBtn: "Ver Ficha Técnica Completa",
      toggleAll18Closed: "Explorar los 18 Proyectos Construidos + Filtros ↓",
      toggleAll18Open: "Ocultar Catálogo Completo ↑",
      liveKicker: "Experiencia Interactiva Real · Haz Clic y Usa",
      liveHeading: "Cinco áreas integradas. <span class='serif-luxury'>Haz clic y prueba en vivo.</span>",
      liveDesc: "Elige un área abajo: inspecciona el Rayos-X UI/UX de un sitio, mueve ventas en un CRM, usa una app real, mira ejemplos de edición de video o simula ROAS.",
      p1Title: "UI/UX y Sitios",
      p1Sub: "Grid 12 Col, Tokens, WCAG y CRO",
      p2Title: "Sistemas y CRM",
      p2Sub: "Kanban, Caja y Reactivación",
      p3Title: "Apps Funcionando",
      p3Sub: "iOS, Android, Windows 11 e IA",
      p4Title: "Edición de Videos",
      p4Sub: "Motion 3D, VFX, Subtítulos y -14 LUFS",
      p5Title: "Tráfico y Ads",
      p5Sub: "Meta, Google, TikTok y ROAS",
      devDesktop: "Computadora",
      devMobile: "Celular",
      uxModeFinal: "1. UI Final y Conversión",
      uxModeXray: "2. Rayos-X UX y Grid 12 Col",
      uxModeTokens: "3. Design System y WCAG",
      uxModeIde: "4. Plataforma EasyCode",
      videoExamplesLabel: "Elige un ejemplo real de edición para ver:",
      videoSoundOff: "Activar Audio del Video",
      videoSoundOn: "Silenciar Audio",
      aboutKicker: "Mapa de Carrera, Perfil y Resultados",
      aboutHeading: "Visión de negocio. <span class='serif-luxury'>Ejecución de punta a punta.</span>",
      tabGraph: "01 · Grafo Interactivo (54 Nodos)",
      tabBio: "02 · Sobre Mí, Reloj y Experiencia",
      tabMetrics: "03 · Métricas y Resultados Auditados",
      aboutWhyTitle: "¿Por qué clientes y empresas trabajan conmigo?",
      aboutWhyP1: "Porque integro <strong>Diseño UI/UX</strong>, <strong>código de producción</strong>, <strong>edición de video</strong> y <strong>tráfico pago</strong> sin intermediarios lentos: diseño y programo tu web o app, creo el CRM, edito los anuncios y escalo tus ventas.",
      aboutWhyP2: "Graduado en <strong>Marketing Digital (UNICV)</strong>, estudiante de <strong>Ingeniería de Software (INFNET)</strong>, gestor de performance y fundador de tienda propia nº 1 orgánica en Google.",
      contactKicker: "Hablemos de tu Proyecto",
      contactHeading: "¿Tienes una idea en mente? <span class='serif-luxury'>Hagámosla realidad.</span>",
      contactDesc: "Selecciona lo que necesitas hoy para abrir WhatsApp con el mensaje listo o accede a GitHub, LinkedIn y currículums en PDF.",
      contactStep1: "01 · ¿Qué necesitas hoy?",
      topicSite: "UI/UX y Sitio Web de Alto Nivel",
      topicCrm: "Sistema a Medida / CRM",
      topicApp: "Aplicación Móvil o Escritorio",
      topicVideo: "Edición de Videos y Motion",
      topicTraffic: "Marketing y Tráfico Pago",
      topicFull: "Paquete Completo 360°",
      labelName: "Tu Nombre o Empresa",
      phName: "Ej.: Carlos · Inmobiliaria / Clínica / SaaS",
      labelMsg: "Cuéntame brevemente tu idea o meta (opcional)",
      phMsg: "Ej.: Necesito un sitio con UI/UX premium, organizar leads en un CRM y editar anuncios...",
      btnWhatsappNow: "Hablar por WhatsApp Ahora",
      btnCopyEmail: "Copiar Correo",
      cvHeader: "Currículums y Presentación (PDF)",
      footerCopy: "© 2026 Mattheus Moraes · UI/UX, Sitios, Sistemas, Apps, Edición de Video y Tráfico Pago."
    }
  };

  NS.UI_STRINGS = UI;
  NS.currentLang = localStorage.getItem("mattheus_lang") || "pt";
  if (!UI[NS.currentLang]) NS.currentLang = "pt";

  NS.t = function (key) {
    const dict = UI[NS.currentLang] || UI.pt;
    return dict[key] !== undefined ? dict[key] : (UI.pt[key] || key);
  };

  NS.setLanguage = function (lang) {
    if (!UI[lang]) return;
    NS.currentLang = lang;
    try {
      localStorage.setItem("mattheus_lang", lang);
    } catch (_) {
      /* Ignora bloqueio de storage privado */
    }

    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.title = NS.t("pageTitle");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const k = el.getAttribute("data-i18n");
      if (UI[lang][k] !== undefined) el.textContent = UI[lang][k];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      const k = el.getAttribute("data-i18n-html");
      if (UI[lang][k] !== undefined) el.innerHTML = UI[lang][k];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const k = el.getAttribute("data-i18n-placeholder");
      if (UI[lang][k] !== undefined) el.setAttribute("placeholder", UI[lang][k]);
    });

    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang-switch") === lang);
    });

    /* Atualiza textos dinâmicos do STUDIO_CASES conforme o idioma ativo */
    if (NS.STUDIO_CASES) {
      if (lang === "en") {
        NS.STUDIO_CASES.sites.valueTitle = "UI/UX Web Design Built for Conversion & Brand Authority";
        NS.STUDIO_CASES.sites.valueCopy = "12-column grid architecture, custom Design Systems, WCAG AAA contrast, Core Web Vitals (99/100), and conversion-focused UX.";
        NS.STUDIO_CASES.sites.ctaLabel = "Request a Website Like This →";
        NS.STUDIO_CASES.crm.valueTitle = "Custom CRMs, Sales Pipelines & Internal Portals";
        NS.STUDIO_CASES.crm.valueCopy = "Replace messy spreadsheets with live Kanban pipelines, cashflow tracking, and automated dormant-client reactivation.";
        NS.STUDIO_CASES.crm.ctaLabel = "Request a Custom CRM →";
        NS.STUDIO_CASES.apps.valueTitle = "Interactive Native Mobile (iOS/Android) & Windows 11 Apps";
        NS.STUDIO_CASES.apps.valueCopy = "Fast, reliable apps with offline support, encrypted local vaults, and zero-hallucination AI workflows.";
        NS.STUDIO_CASES.apps.ctaLabel = "Build My App →";
        NS.STUDIO_CASES.video.valueTitle = "Cinematic Video Editing, 3D Motion VFX & High-Retention Reels";
        NS.STUDIO_CASES.video.valueCopy = "3D camera motion, surgical jump cuts, animated captions, DaVinci color grading, and -14 LUFS broadcast audio.";
        NS.STUDIO_CASES.video.ctaLabel = "Edit My Videos →";
        NS.STUDIO_CASES.traffic.valueTitle = "Profit-Driven Paid Media (Meta, Google & TikTok Ads)";
        NS.STUDIO_CASES.traffic.valueCopy = "Full-funnel ad management focused on lowering CPL/CPC and scaling real audited ROAS.";
        NS.STUDIO_CASES.traffic.ctaLabel = "Scale My Paid Traffic →";
      } else if (lang === "es") {
        NS.STUDIO_CASES.sites.valueTitle = "Diseño Web UI/UX Creado para Autoridad y Conversión";
        NS.STUDIO_CASES.sites.valueCopy = "Grid de 12 columnas, Design Systems propios, contraste WCAG AAA, Core Web Vitals (99/100) y experiencia enfocada en ventas.";
        NS.STUDIO_CASES.sites.ctaLabel = "Quiero un Sitio de Este Nivel →";
        NS.STUDIO_CASES.crm.valueTitle = "CRMs a Medida, Embudos Comerciales y Portales Internos";
        NS.STUDIO_CASES.crm.valueCopy = "Reemplaza hojas sueltas por un embudo visual, control de caja y reactivación automática de clientes inactivos.";
        NS.STUDIO_CASES.crm.ctaLabel = "Quiero un Sistema / CRM Así →";
        NS.STUDIO_CASES.apps.valueTitle = "Aplicaciones Móviles (iOS/Android) y Escritorio Windows 11";
        NS.STUDIO_CASES.apps.valueCopy = "Apps rápidas y seguras con modo offline, bóveda cifrada e inteligencia artificial conectada a tus datos.";
        NS.STUDIO_CASES.apps.ctaLabel = "Cotizar Mi Aplicación →";
        NS.STUDIO_CASES.video.valueTitle = "Edición de Videos, Motion 3D VFX y Reels de Alta Retención";
        NS.STUDIO_CASES.video.valueCopy = "Cámara 3D, corte de pausas, subtítulos dinámicos, color DaVinci y audio masterizado en -14 LUFS.";
        NS.STUDIO_CASES.video.ctaLabel = "Quiero Editar Mis Videos →";
        NS.STUDIO_CASES.traffic.valueTitle = "Gestión de Tráfico Pago Orientada a Ventas Reales";
        NS.STUDIO_CASES.traffic.valueCopy = "Campañas en Meta, Google y TikTok Ads para reducir el costo por lead y escalar el retorno sobre inversión.";
        NS.STUDIO_CASES.traffic.ctaLabel = "Escalar Mi Tráfico Pago →";
      } else {
        NS.STUDIO_CASES.sites.valueTitle = "UI/UX & Criação de Sites que Vendem pelo Valor Percebido";
        NS.STUDIO_CASES.sites.valueCopy = "Grid de 12 colunas, Design System próprio, acessibilidade WCAG AAA, Core Web Vitals (99/100) e UX desenhada para converter.";
        NS.STUDIO_CASES.sites.ctaLabel = "Quero um Site Nesse Padrão →";
        NS.STUDIO_CASES.crm.valueTitle = "Sistemas Sob Medida, CRMs & Portais Internos";
        NS.STUDIO_CASES.crm.valueCopy = "Chega de planilhas soltas: organizo seus leads, propostas, caixa e alertas de reativação em um sistema feito para você.";
        NS.STUDIO_CASES.crm.ctaLabel = "Quero um Sistema / CRM Assim →";
        NS.STUDIO_CASES.apps.valueTitle = "Aplicativos Mobile (iOS/Android) e Desktop Nativos";
        NS.STUDIO_CASES.apps.valueCopy = "Aplicativos rápidos, intuitivos e seguros com funcionamento offline e inteligência artificial sem dados inventados.";
        NS.STUDIO_CASES.apps.ctaLabel = "Orçar Meu Aplicativo →";
        NS.STUDIO_CASES.video.valueTitle = "Edição de Vídeos, Motion 3D VFX & Reels de Alta Retenção";
        NS.STUDIO_CASES.video.valueCopy = "Câmera 3D, corte cirúrgico de pausas, legendas dinâmicas, Color DaVinci e áudio masterizado em -14 LUFS.";
        NS.STUDIO_CASES.video.ctaLabel = "Quero Editar Meus Vídeos →";
        NS.STUDIO_CASES.traffic.valueTitle = "Marketing Digital & Gestão de Tráfego Orientada a Lucro";
        NS.STUDIO_CASES.traffic.valueCopy = "Campanhas estruturadas para atrair compradores reais, reduzir custo por lead e escalar seu retorno (ROAS).";
        NS.STUDIO_CASES.traffic.ctaLabel = "Quero Escalar Meu Tráfego →";
      }
    }

    window.dispatchEvent(new CustomEvent("mattheus:langchange", { detail: { lang: lang } }));
  };

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const chosen = btn.getAttribute("data-lang-switch");
        if (NS.sfx) NS.sfx.click();
        NS.setLanguage(chosen);
      });
    });

    NS.setLanguage(NS.currentLang);
  });
})();
