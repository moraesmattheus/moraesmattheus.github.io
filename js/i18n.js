/* ==========================================================================
   Arquivo: js/i18n.js
   Data/Hora: 02/11/2026 12:10
   O que é: Motor internacionalizado (PT-BR, Inglês e Espanhol) e catálogo
   técnico-visual de Padrões de Sites, Pilares de UI/UX, Cases Editoriais e
   Exemplos Reais de Edição de Vídeo do portfólio de Mattheus Moraes.
   O que foi feito e finalidade de cada bloco:
     1. Dicionário Trilingue Limpo (PT / EN / ES): Textos diretos e enxutos
        para as 6 seções sem poluição visual.
     2. Vitrine Editorial Dopamine Studio (DOPAMINE_CASES): 6 cases com telas
        reais dos sites e sistemas desenvolvidos (incluindo site-vania real).
     3. Referências de Padrões de Sites & Sites Personalizados (SITE_PATTERNS):
        Documenta os 5 arquétipos reais desenvolvidos por Mattheus com todos os
        detalhes técnicos (Liquid Glass, Cloudflare KV/OTP, WebAssembly, GTM/Z-Score
        e 35 Componentes CSS3/3D).
     4. Exemplos Reais de Edição de Vídeo (VIDEO_EXAMPLES): Metadados dos 4
        arquivos .mp4 em 1080p/60fps + comparador Antes vs Depois.
   ========================================================================== */

(function () {
  "use strict";

  const NS = (window.MattheusPortfolio = window.MattheusPortfolio || {});
  NS.currentLang = "pt";

  /* ------------------------------------------------------------------------
     BLOCO 1: Textos da Interface em Português, Inglês e Espanhol (Sem Ruído)
     Data/Hora: 02/11/2026 12:10
     Finalidade: Manter cada seção leve, direta e escaneável em 3 idiomas.
     ------------------------------------------------------------------------ */
  NS.UI_STRINGS = {
    pt: {
      navHome: "Início",
      navWorks: "Obras",
      navSites: "Sites & UI/UX",
      navSystems: "Apps & Sistemas",
      navVideos: "Vídeos & Ads",
      navContact: "Contato",
      headerCta: "Iniciar Projeto →",

      heroBadge: "Disponível para novos projetos · Florianópolis, SC & Global",
      heroTitle: "UI/UX, sites, sistemas, apps e <span class='serif-italic'>vídeos</span> que vendem.",
      heroSubtitle: "Uno <strong>Design de Produto (UI/UX)</strong>, <strong>Engenharia de Software (INFNET)</strong>, edição em 60fps e tráfego pago em uma entrega limpa e orientada a lucro.",
      heroCtaPrimary: "Testar Apps & Sistemas",
      heroCtaSecondary: "Ver Padrões de Sites",
      kpi1Label: "sistemas e sites autorais",
      kpi2Label: "retorno real em e-commerce",
      kpi3Label: "Performance & WCAG AAA",

      vortexKicker: "01 · Galeria Orbital 3D · Passe o mouse para desacelerar ou clique para abrir",
      vortexTitle: "Minhas <span class='serif-vortex'>Obras</span>",
      dopamineCounterLabel: "Estudo de Caso",
      toggleAll18Closed: "Ver arquivo completo dos 18 projetos ↓",
      toggleAll18Open: "Recolher arquivo dos 18 projetos ↑",

      sitesKicker: "02 · Referências Visuais, Arquitetura Web & UI/UX",
      sitesHeading: "Padrões de sites que desenvolvo <span class='serif-luxury'>&amp; projetos sob medida.</span>",
      sitesDesc: "Explore como referência visual e técnica os estilos reais que construo, do institucional Quiet Luxury ao SaaS interativo e design 100% exclusivo.",
      uxLabKicker: "Engenharia de Design, Jornada, Acessibilidade & Performance",
      uxTabJourney: "01 · Jornada do Usuário",
      uxTabSystem: "02 · UI, Grid & Motion",
      uxTabA11y: "03 · Acessibilidade WCAG AAA",
      uxTabBest: "04 · Boas Práticas & Velocidade",

      sysKicker: "03 · Experiência Real · Interaja na Tela",
      sysHeading: "Teste os sistemas e aplicativos <span class='serif-luxury'>funcionando agora.</span>",
      sysDesc: "Sem vídeo gravado nem caixas vazias: clique, mova vendas no CRM, converse com o app Órion, abra pastas no Windows 11 ou rode código ao vivo.",
      sysTabCrm: "01 · Sistema CRM & Caixa",
      sysTabOrion: "02 · Super App Órion IA",
      sysTabWin11: "03 · Pastas Windows 11",
      sysTabIde: "04 · EasyCode IDE & ATS",

      vidKicker: "04 · Audiovisual 60fps & Aquisição Paga",
      vidHeading: "Edição cinematográfica <span class='serif-luxury'>&amp; tráfego de resultado.</span>",
      vidDesc: "Assista abaixo aos exemplos reais editados por mim (Motion 3D, VFX, legendas dinâmicas e áudio em -14 LUFS) e simule escala de vendas.",
      videoSoundOff: "Ativar Áudio",
      videoSoundOn: "Silenciar Áudio",
      toggleCareerGraphClosed: "Explorar Trajetória, Formação INFNET & Grafo de Carreira (54 Nós) ↓",
      toggleCareerGraphOpen: "Recolher Grafo de Carreira & Trajetória ↑",

      contactKicker: "05 · Atendimento Direto Comigo",
      contactHeading: "Vamos tirar seu projeto <span class='serif-luxury'>do papel?</span>",
      contactDesc: "Escolha o que você precisa e me chame direto no WhatsApp com o escopo já estruturado.",
      conciergeSubmit: "Enviar Escopo no WhatsApp →",
      cvHeader: "Currículos & Deck (PDF)",
      footerCopy: "© 2026 Mattheus Moraes · Web Design UI/UX, Sistemas, Aplicativos, Edição de Vídeos & Tráfego Pago.",

      searchPlaceholder: "Buscar site, sistema, app, UI/UX ou tecnologia...",
      searchSugLabel: "Acesso rápido:",
      searchTag1: "Padrões de Sites",
      searchTag2: "Sistema CRM",
      searchTag3: "App Órion IA",
      searchTag4: "Edição de Vídeo",
      searchTag5: "Acessibilidade UI/UX"
    },

    en: {
      navHome: "Home",
      navWorks: "Works",
      navSites: "Web & UI/UX",
      navSystems: "Apps & Systems",
      navVideos: "Video & Ads",
      navContact: "Contact",
      headerCta: "Start Project →",

      heroBadge: "Available for new projects · Brazil & Worldwide",
      heroTitle: "UI/UX, websites, systems, apps & <span class='serif-italic'>videos</span> built to convert.",
      heroSubtitle: "Combining <strong>Product Design (UI/UX)</strong>, <strong>Software Engineering (INFNET)</strong>, 60fps video editing and paid growth in one clean delivery.",
      heroCtaPrimary: "Test Live Apps & Systems",
      heroCtaSecondary: "Browse Website Standards",
      kpi1Label: "custom systems & websites",
      kpi2Label: "verified e-commerce ROAS",
      kpi3Label: "Web Performance & WCAG AAA",

      vortexKicker: "01 · 3D Orbital Gallery · Hover to slow down or click any screen",
      vortexTitle: "My <span class='serif-vortex'>Works</span>",
      dopamineCounterLabel: "Featured Case",
      toggleAll18Closed: "Explore full archive of 18 projects ↓",
      toggleAll18Open: "Collapse 18-project archive ↑",

      sitesKicker: "02 · Visual References, Web Architecture & UI/UX",
      sitesHeading: "Website standards I build <span class='serif-luxury'>&amp; bespoke web design.</span>",
      sitesDesc: "Browse real visual and technical references of websites I engineer, from Quiet Luxury institutional ecosystems to interactive SaaS and custom UI.",
      uxLabKicker: "Design Engineering, User Journey, Accessibility & Web Vitals",
      uxTabJourney: "01 · User Journey & CRO",
      uxTabSystem: "02 · UI, Grid & Motion",
      uxTabA11y: "03 · WCAG AAA Accessibility",
      uxTabBest: "04 · Best Practices & Speed",

      sysKicker: "03 · Hands-On Interactive Stage",
      sysHeading: "Test my systems and apps <span class='serif-luxury'>working live right now.</span>",
      sysDesc: "Real interactive software right in your browser: move deals in the CRM, chat with Órion AI, open Windows 11 taskbar folders or run code live.",
      sysTabCrm: "01 · CRM & Cashflow System",
      sysTabOrion: "02 · Órion AI Mobile App",
      sysTabWin11: "03 · Windows 11 Taskbar App",
      sysTabIde: "04 · EasyCode IDE & ATS",

      vidKicker: "04 · 60fps Motion Editing & Paid Growth",
      vidHeading: "Cinematic video editing <span class='serif-luxury'>&amp; profit-driven ads.</span>",
      vidDesc: "Watch real 1080p/60fps videos edited by me (3D camera, VFX, kinetic captions and -14 LUFS mastering) and simulate campaign scale.",
      videoSoundOff: "Unmute Audio",
      videoSoundOn: "Mute Audio",
      toggleCareerGraphClosed: "Explore Experience, INFNET Degree & Career Knowledge Graph (54 Nodes) ↓",
      toggleCareerGraphOpen: "Collapse Career Graph & Experience ↑",

      contactKicker: "05 · Direct Contact",
      contactHeading: "Ready to bring your project <span class='serif-luxury'>to life?</span>",
      contactDesc: "Pick what you need and message me directly on WhatsApp with a structured brief.",
      conciergeSubmit: "Send Brief on WhatsApp →",
      cvHeader: "Resumes & Executive Deck (PDF)",
      footerCopy: "© 2026 Mattheus Moraes · UI/UX Web Design, Custom Systems, Apps, Video Editing & Paid Media.",

      searchPlaceholder: "Search website pattern, CRM, app, UI/UX or stack...",
      searchSugLabel: "Quick jump:",
      searchTag1: "Website Standards",
      searchTag2: "Custom CRM",
      searchTag3: "Órion AI App",
      searchTag4: "Video Editing",
      searchTag5: "UI/UX & Accessibility"
    },

    es: {
      navHome: "Inicio",
      navWorks: "Obras",
      navSites: "Sitios & UI/UX",
      navSystems: "Apps & Sistemas",
      navVideos: "Videos & Ads",
      navContact: "Contacto",
      headerCta: "Cotizar Proyecto →",

      heroBadge: "Disponible para nuevos proyectos · Brasil & Global",
      heroTitle: "UI/UX, sitios, sistemas, apps y <span class='serif-italic'>videos</span> que venden.",
      heroSubtitle: "Uno <strong>Diseño de Producto (UI/UX)</strong>, <strong>Ingeniería de Software (INFNET)</strong>, edición a 60fps y tráfico de pago en una sola entrega limpia.",
      heroCtaPrimary: "Probar Apps y Sistemas",
      heroCtaSecondary: "Ver Estándares de Sitios",
      kpi1Label: "sistemas y sitios propios",
      kpi2Label: "ROAS real en e-commerce",
      kpi3Label: "Rendimiento & WCAG AAA",

      vortexKicker: "01 · Galería Orbital 3D · Pasa el cursor para pausar o haz clic",
      vortexTitle: "Mis <span class='serif-vortex'>Obras</span>",
      dopamineCounterLabel: "Caso Destacado",
      toggleAll18Closed: "Ver archivo completo de 18 proyectos ↓",
      toggleAll18Open: "Ocultar archivo de 18 proyectos ↑",

      sitesKicker: "02 · Referencias Visuales, Arquitectura Web & UI/UX",
      sitesHeading: "Estándares de sitios que creo <span class='serif-luxury'>&amp; diseño a medida.</span>",
      sitesDesc: "Explora como referencia visual y técnica los estilos reales que desarrollo, desde sitios Quiet Luxury hasta plataformas SaaS y diseño exclusivo.",
      uxLabKicker: "Ingeniería de Diseño, Viaje del Usuario, Accesibilidad & Velocidad",
      uxTabJourney: "01 · Viaje del Usuario",
      uxTabSystem: "02 · UI, Grid & Motion",
      uxTabA11y: "03 · Accesibilidad WCAG AAA",
      uxTabBest: "04 · Buenas Prácticas & Web Vitals",

      sysKicker: "03 · Experiencia Interactiva en Vivo",
      sysHeading: "Prueba mis sistemas y aplicaciones <span class='serif-luxury'>funcionando ahora.</span>",
      sysDesc: "Software real en tu navegador: mueve ventas en el CRM, conversa con la app Órion IA, abre carpetas en Windows 11 o ejecuta código en vivo.",
      sysTabCrm: "01 · Sistema CRM & Caja",
      sysTabOrion: "02 · Super App Órion IA",
      sysTabWin11: "03 · Carpetas Windows 11",
      sysTabIde: "04 · EasyCode IDE & ATS",

      vidKicker: "04 · Edición 60fps & Tráfico de Pago",
      vidHeading: "Edición cinematográfica <span class='serif-luxury'>&amp; anuncios rentables.</span>",
      vidDesc: "Mira ejemplos reales editados por mí (cámara 3D, VFX, subtítulos dinámicos y audio a -14 LUFS) y simula escala en campañas.",
      videoSoundOff: "Activar Audio",
      videoSoundOn: "Silenciar Audio",
      toggleCareerGraphClosed: "Explorar Trayectoria, Ingeniería INFNET y Grafo de Carrera (54 Nodos) ↓",
      toggleCareerGraphOpen: "Ocultar Grafo de Carrera y Trayectoria ↑",

      contactKicker: "05 · Contacto Directo",
      contactHeading: "¿Llevamos tu proyecto <span class='serif-luxury'>a producción?</span>",
      contactDesc: "Elige lo que necesitas y escríbeme directo por WhatsApp con el alcance listo.",
      conciergeSubmit: "Enviar por WhatsApp →",
      cvHeader: "Currículums & Presentación (PDF)",
      footerCopy: "© 2026 Mattheus Moraes · Diseño UI/UX, Sitios, Sistemas, Apps, Edición de Video y Tráfico Pago.",

      searchPlaceholder: "Buscar sitio, sistema, app, UI/UX o tecnología...",
      searchSugLabel: "Acceso rápido:",
      searchTag1: "Estándares de Sitios",
      searchTag2: "Sistema CRM",
      searchTag3: "App Órion IA",
      searchTag4: "Edición de Video",
      searchTag5: "Accesibilidad UI/UX"
    }
  };

  /* ------------------------------------------------------------------------
     BLOCO 2: Vitrine Editorial Dopamine Studio (100% Fotos Reais dos Sites/Apps)
     Data/Hora: 02/11/2026 12:10
     Finalidade: Exibir a tela real de cada site/sistema com tags neon e botão ↗.
     ------------------------------------------------------------------------ */
  NS.DOPAMINE_CASES = [
    {
      id: "site-vania",
      targetSection: "#sites",
      sitePatternIdx: 0,
      image: "assets/img/site-vania-tela.png",
      aura: "rgba(200, 169, 126, 0.34)",
      pt: {
        tags: ["QUIET LUXURY", "UI/UX DESIGN", "NODE.JS + ADMIN"],
        title: "Acervo Imobiliário Quiet Luxury",
        punch: "PROJETADO PARA VENDER ALTO PADRÃO. E ACONTECEU.",
        desc: "Ecossistema imobiliário em Liquid Glass (#20130A e ouro champagne) com curadoria privativa sob NDA e painel administrativo Drag & Drop."
      },
      en: {
        tags: ["QUIET LUXURY", "UI/UX DESIGN", "NODE.JS + ADMIN"],
        title: "Bespoke Quiet Luxury Real Estate",
        punch: "DESIGNED TO SELL LUXURY ASSETS. AND IT DID.",
        desc: "Bespoke Liquid Glass real estate platform (#20130A & champagne gold) with NDA private curation and an effortless Drag & Drop admin."
      },
      es: {
        tags: ["QUIET LUXURY", "UI/UX DESIGN", "NODE.JS + ADMIN"],
        title: "Inmobiliaria Quiet Luxury",
        punch: "DISEÑADO PARA VENDER ALTO NIVEL. Y SUCEDIÓ.",
        desc: "Ecosistema inmobiliario en Liquid Glass (#20130A y oro champagne) con curaduría privada bajo NDA y panel administrativo Drag & Drop."
      }
    },
    {
      id: "easycode",
      targetSection: "#sites",
      sitePatternIdx: 1,
      image: "assets/img/easycode.png",
      aura: "rgba(99, 102, 241, 0.40)",
      pt: {
        tags: ["SAAS NO AR", "WEBASSEMBLY", "GAMIFICAÇÃO"],
        title: "EasyCode",
        punch: "CÓDIGO REAL NO NAVEGADOR EM ZERO MILISSEGUNDOS.",
        desc: "Plataforma interativa em produção com 32 aulas guiadas, mundos de XP e execução local de Python, JavaScript e SQL via WebAssembly e Web Workers."
      },
      en: {
        tags: ["LIVE SAAS", "WEBASSEMBLY", "GAMIFIED UX"],
        title: "EasyCode",
        punch: "REAL CODE IN THE BROWSER WITH ZERO LATENCY.",
        desc: "Live coding platform featuring 32 guided lessons, XP worlds and instant in-browser Python, JS and SQL via WebAssembly & Web Workers."
      },
      es: {
        tags: ["SAAS EN VIVO", "WEBASSEMBLY", "GAMIFICACIÓN"],
        title: "EasyCode",
        punch: "CÓDIGO REAL EN EL NAVEGADOR CON CERO LATENCIA.",
        desc: "Plataforma activa con 32 clases, mundos de XP y ejecución instantánea de Python, JS y SQL vía WebAssembly."
      }
    },
    {
      id: "orion",
      targetSection: "#sistemas",
      sysTab: "orion",
      image: "assets/img/orion-home.png",
      aura: "rgba(56, 189, 248, 0.38)",
      pt: {
        tags: ["REACT NATIVE", "FASTAPI + RAG", "46 TESTES"],
        title: "Órion Super App",
        punch: "IA PESSOAL SOBERANA COM ZERO DADOS INVENTADOS.",
        desc: "Aplicativo mobile e backend Python com memória RAG contextual, cofre local criptografado em Windows DPAPI e 46 testes automatizados."
      },
      en: {
        tags: ["REACT NATIVE", "FASTAPI + RAG", "46 TESTS"],
        title: "Órion Super App",
        punch: "SOVEREIGN PERSONAL AI WITH ZERO HALLUCINATED DATA.",
        desc: "Mobile app and Python backend featuring contextual RAG memory, local Windows DPAPI encrypted vault and 46 automated tests."
      },
      es: {
        tags: ["REACT NATIVE", "FASTAPI + RAG", "46 PRUEBAS"],
        title: "Órion Super App",
        punch: "IA PERSONAL SOBERANA CON CERO DATOS FALSOS.",
        desc: "App móvil y backend Python con memoria contextual RAG, bóveda cifrada local DPAPI y 46 pruebas automatizadas."
      }
    },
    {
      id: "hub-hom",
      targetSection: "#sites",
      sitePatternIdx: 2,
      image: "assets/img/hub-marketing.png",
      aura: "rgba(139, 92, 246, 0.36)",
      pt: {
        tags: ["23 TELAS", "CLOUDFLARE KV", "ACCESS OTP"],
        title: "Hub Corporativo & BI",
        punch: "CINCO CANAIS E ROTINA DA EQUIPE EM UM SÓ PORTAL.",
        desc: "Portal corporativo na Cloudflare Pages com edição ao vivo pela equipe (KV Store), autenticação OTP, View Transitions e atalhos Mac ⌘K."
      },
      en: {
        tags: ["23 SCREENS", "CLOUDFLARE KV", "ACCESS OTP"],
        title: "Enterprise Hub & BI",
        punch: "FIVE SALES CHANNELS AND TEAM OPS IN ONE PORTAL.",
        desc: "Corporate portal on Cloudflare Pages featuring live in-browser editing (KV Store), OTP auth, View Transitions and macOS ⌘K shortcuts."
      },
      es: {
        tags: ["23 PANTALLAS", "CLOUDFLARE KV", "ACCESS OTP"],
        title: "Hub Corporativo y BI",
        punch: "CINCO CANALES Y OPERACIÓN EN UN SOLO PORTAL.",
        desc: "Portal corporativo en Cloudflare Pages con edición en vivo (KV Store), acceso OTP, View Transitions y atajos ⌘K."
      }
    },
    {
      id: "vigia-ads",
      targetSection: "#sites",
      sitePatternIdx: 3,
      image: "assets/img/conecta-dados-tela.png",
      aura: "rgba(14, 165, 233, 0.36)",
      pt: {
        tags: ["MARTECH & IA", "PYTHON Z-SCORE", "GTM + WHATSAPP"],
        title: "Portal Martech & Tráfego",
        punch: "AUDITORIA ESTATÍSTICA DE MÍDIA E RECUPERAÇÃO EM 120S.",
        desc: "Motor Martech que cruza GTM, Google Ads (detecção de anomalias Z-Score e negativas) e disparo automático de recuperação no WhatsApp."
      },
      en: {
        tags: ["MARTECH & AI", "PYTHON Z-SCORE", "GTM + WHATSAPP"],
        title: "Martech & Ads Portal",
        punch: "STATISTICAL AD AUDITING & 120S LEAD RECOVERY.",
        desc: "Martech engine connecting GTM, Google Ads Z-Score anomaly detection, negative keyword exports and 120-second WhatsApp recovery."
      },
      es: {
        tags: ["MARTECH & IA", "PYTHON Z-SCORE", "GTM + WHATSAPP"],
        title: "Portal Martech y Tráfico",
        punch: "AUDITORÍA ESTADÍSTICA DE ADS Y RECUPERACIÓN EN 120S.",
        desc: "Motor Martech que une GTM, detección Z-Score en Google Ads y recuperación automática por WhatsApp en 120 segundos."
      }
    },
    {
      id: "pastas-barra",
      targetSection: "#sistemas",
      sysTab: "win11",
      image: "assets/img/pastas-barra-1.png",
      aura: "rgba(59, 130, 246, 0.36)",
      pt: {
        tags: ["C# / .NET WPF", "WINDOWS 11", "OPEN SOURCE"],
        title: "Pastas na Barra",
        punch: "PRODUTIVIDADE NATIVA COM ESTÉTICA ACRÍLICA FLUENT.",
        desc: "Utilitário desktop nativo para Windows 11 que organiza dezenas de apps em pastas instantâneas direto na barra de tarefas."
      },
      en: {
        tags: ["C# / .NET WPF", "WINDOWS 11", "OPEN SOURCE"],
        title: "Taskbar Folders",
        punch: "NATIVE PRODUCTIVITY WITH FLUENT ACRYLIC DESIGN.",
        desc: "Native Windows 11 desktop utility organizing dozens of work apps into instant Acrylic folders right on the taskbar."
      },
      es: {
        tags: ["C# / .NET WPF", "WINDOWS 11", "OPEN SOURCE"],
        title: "Carpetas en Barra",
        punch: "PRODUCTIVIDAD NATIVA CON DISEÑO ACRÍLICO FLUENT.",
        desc: "Utilidad nativa para Windows 11 que agrupa aplicaciones en carpetas acrílicas instantáneas en la barra de tareas."
      }
    }
  ];

  /* ------------------------------------------------------------------------
     BLOCO 3: Padrões Reais de Sites & Arquitetura Web Sob Medida
     Data/Hora: 02/11/2026 13:57
     Finalidade: Mostrar com clareza os 4 padrões autorais de sites que construo,
     com capturas reais em 16:10, especificações técnicas e zero poluição.
     ------------------------------------------------------------------------ */
  NS.SITE_PATTERNS = [
    {
      id: "luxury",
      tabLabel: "01 · Institucional Quiet Luxury",
      badge: "Padrão Quiet Luxury & Autoridade",
      refName: "Referência: Acervo Imobiliário de Alto Padrão",
      primaryImg: "assets/img/site-vania-tela.png",
      secondaryImg: "assets/img/site-vania-acervo.png",
      secondaryLabel: "Alternar Tela: Hero ↔ Acervo de Imóveis",
      liveUrl: "",
      idealFor: "Imobiliárias boutique, escritórios de arquitetura, advocacia, médicos, clínicas premium e marcas de alto ticket.",
      uxSummary: "Fricção intencional para qualificar leads nobres, estética silenciosa (#20130A + Champagne), leitura fluida e Concierge integrado ao WhatsApp.",
      techSpecs: [
        "Liquid Glass CSS (backdrop-filter: blur(28px) saturate(180%)) + curvas de mola cubic-bezier(0.22, 1, 0.36, 1)",
        "Painel /admin privativo Drag & Drop para leigos com conversão automática de fotos para WebP",
        "Módulo Off-Market confidencial (NDA), monograma vetorial preciso e ambiência via Web Audio API",
        "Backend Node.js + Express + SQLite com carregamento preguiçoso (Lazy Loading) em redes móveis"
      ],
      conciergeTopic: "Site Institucional de Alto Padrão (Estilo Quiet Luxury)"
    },
    {
      id: "saas",
      tabLabel: "02 · Plataforma SaaS & EdTech",
      badge: "Padrão Produto Digital Interativo",
      refName: "Referência no Ar: EasyCode (easy-code.tech)",
      primaryImg: "assets/img/easycode.png",
      secondaryImg: "",
      secondaryLabel: "",
      liveUrl: "https://easy-code.tech/",
      idealFor: "Startups SaaS, escolas online, infoprodutos premium, áreas de membros gamificadas e ferramentas web interativas.",
      uxSummary: "Onboarding em segundos sem cadastro forçado, feedback visual imediato por ação (XP, conquistas e progresso) e zero tempo de espera.",
      techSpecs: [
        "Execução local de Python, JavaScript e SQL em 0ms no navegador via WebAssembly (Pyodide + SQL.js)",
        "Isolamento em Web Workers para nunca travar a interface principal em 60fps",
        "Arquitetura PWA Offline-First instalável no celular e computador + integração Supabase",
        "32 aulas interativas guiadas com validação automática de código e auditoria via GitHub Actions"
      ],
      conciergeTopic: "Plataforma Web / SaaS Interativo"
    },
    {
      id: "corporate",
      tabLabel: "03 · Hub Corporativo & BI",
      badge: "Padrão Operação & Equipes (23 Telas)",
      refName: "Referência: Portal Corporativo & BI Executivo",
      primaryImg: "assets/img/hub-inicio.png",
      secondaryImg: "assets/img/hub-marketing.png",
      secondaryLabel: "Alternar Tela: Portal Inicial ↔ BI Multicanal",
      liveUrl: "",
      idealFor: "Empresas em crescimento, redes de lojas, franquias e operações que precisam centralizar indicadores, treinamentos e rotinas.",
      uxSummary: "Pensado para equipe não técnica editar textos direto pelo painel, com atalhos Mac (⌘K), números tabulares que não dançam e zero poluição.",
      techSpecs: [
        "Publicado em Cloudflare Pages + Workers (_worker.js), banco KV Store e proteção Cloudflare Access OTP",
        "Coreografia de motion com tokens dedicados (160ms hover, 260ms mola, View Transitions API)",
        "Tipografia editorial combinada a tabular-nums para KPIs financeiros e suporte nativo a Safari/Retina",
        "Respeito integral a prefers-reduced-motion e prefers-contrast do sistema operacional"
      ],
      conciergeTopic: "Portal Corporativo / Hub Operacional"
    },
    {
      id: "martech",
      tabLabel: "04 · Site Personalizado & Conversão",
      badge: "Padrão Conversão, Dados & Tráfego",
      refName: "Referência: Hub Martech & Inteligência de Tráfego",
      primaryImg: "assets/img/conecta-dados-tela.png",
      secondaryImg: "",
      secondaryLabel: "",
      liveUrl: "",
      idealFor: "Operações de captação de leads em escala, lançamentos, clínicas, e-commerces e marcas que exigem design 100% autoral.",
      uxSummary: "Hierarquia visual orientada a decisão rápida em menos de 2 minutos, rastreamento ponta a ponta e recuperação ativa de abandonos.",
      techSpecs: [
        "Integração nativa com Google Tag Manager (Data Layer), UTMs padronizadas e payload de GCLID Offline",
        "Motor estatístico Z-Score em Python para alertar anomalias de CPL/CPC e exportar negativas de Google Ads",
        "Fluxo Conector WhatsApp em 120s para recuperar leads que abandonaram etapas do funil",
        "HTML5 estático ultrarrápido (LCP < 0,8s) maximizando Índice de Qualidade no Google e Meta Ads"
      ],
      conciergeTopic: "Site 100% Personalizado Sob Medida"
    }
  ];

  /* ------------------------------------------------------------------------
     BLOCO 4: Exemplos Reais de Edição de Vídeo (.MP4 Reais em 1080p/60fps)
     Data/Hora: 02/11/2026 12:10
     Finalidade: Exibir os renders reais editados por Mattheus.
     ------------------------------------------------------------------------ */
  NS.VIDEO_EXAMPLES = [
    {
      id: "vfx3d",
      src: "assets/video/exemplo-3d-vfx.mp4",
      isCanvasCompare: false,
      pt: {
        tab: "01 · Motion 3D & VFX",
        title: "Câmera 3D, Iluminação Volumétrica e Ritmo 60fps",
        desc: "Cena 3D com física de mola (spring), brilho neon sincronizado na batida e apresentação cinematográfica de produto digital.",
        badges: ["Câmera 3D", "60 FPS Real", "Física Spring", "Sound Design"]
      },
      en: {
        tab: "01 · 3D Motion & VFX",
        title: "3D Camera, Volumetric Glow & 60fps Pacing",
        desc: "3D composition with spring physics, beat-synced neon lighting and cinematic digital product reveal.",
        badges: ["3D Camera", "True 60 FPS", "Spring Physics", "Sound Design"]
      },
      es: {
        tab: "01 · Motion 3D y VFX",
        title: "Cámara 3D, Luz Volumétrica y Ritmo 60fps",
        desc: "Composición 3D con física de resorte, brillo neón al ritmo y presentación cinematográfica de producto.",
        badges: ["Cámara 3D", "60 FPS Real", "Física Spring", "Sound Design"]
      }
    },
    {
      id: "reelhook",
      src: "assets/video/exemplo-reel-retencao.mp4",
      isCanvasCompare: false,
      pt: {
        tab: "02 · Reel & Legendas",
        title: "Gancho nos 3 Primeiros Segundos e Legendas Cinéticas",
        desc: "Corte cirúrgico de respirações, zoom suave de retenção e legendas animadas via Whisper GPU para Reels, TikTok e Ads.",
        badges: ["Gancho 3s", "Whisper GPU", "72k Views", "CTR 6,20%"]
      },
      en: {
        tab: "02 · Retention Reel",
        title: "3-Second Hook & Kinetic Captions",
        desc: "Zero-pause pacing, retention punch-ins and GPU Whisper dynamic captions engineered for Reels, TikTok and Paid Ads.",
        badges: ["3s Hook", "GPU Whisper", "72k Views", "6.20% CTR"]
      },
      es: {
        tab: "02 · Reel y Subtítulos",
        title: "Gancho en 3 Segundos y Subtítulos Cinéticos",
        desc: "Corte sin silencios, zoom de retención y subtítulos dinámicos Whisper GPU para Reels, TikTok y anuncios.",
        badges: ["Gancho 3s", "Whisper GPU", "72k Vistas", "CTR 6,20%"]
      }
    },
    {
      id: "motionui",
      src: "assets/video/exemplo-motion-ui.mp4",
      isCanvasCompare: false,
      pt: {
        tab: "03 · Motion de Produto",
        title: "Demonstração Comercial de Software, Sites e Apps",
        desc: "Transformo telas de sistemas e sites em vídeos dinâmicos com foco guiado que multiplicam a conversão de anúncios.",
        badges: ["Showcase SaaS", "Zoom Guiado", "Conversão Ads", "1080p"]
      },
      en: {
        tab: "03 · Product Motion",
        title: "Commercial Walkthroughs for SaaS, Sites & Apps",
        desc: "Turning software interfaces into high-converting motion showcases with guided cursor focus.",
        badges: ["SaaS Showcase", "Guided Zoom", "Ad Conversion", "1080p"]
      },
      es: {
        tab: "03 · Motion de Producto",
        title: "Demostración Comercial de Sitios y Apps",
        desc: "Transformo interfaces reales en videos dinámicos con foco guiado que elevan la conversión.",
        badges: ["Showcase SaaS", "Zoom Guiado", "Conversión Ads", "1080p"]
      }
    },
    {
      id: "voicelufs",
      src: "assets/video/exemplo-voz-narracao.mp4",
      isCanvasCompare: false,
      pt: {
        tab: "04 · Voz -14 LUFS & Cor",
        title: "Voz Cristalina, Ducking Automático e Color DaVinci",
        desc: "Tratamento vocal limpo, trilha que abaixa automaticamente quando você fala e padronização broadcast em -14 LUFS.",
        badges: ["-14 LUFS", "Auto-Ducking", "Color DaVinci", "Storytelling"]
      },
      en: {
        tab: "04 · -14 LUFS & Color",
        title: "Crystal Voice, Auto-Ducking & DaVinci Color",
        desc: "Clean vocal chain, automatic soundtrack ducking and -14 LUFS broadcast loudness mastering.",
        badges: ["-14 LUFS", "Auto-Ducking", "DaVinci Color", "Storytelling"]
      },
      es: {
        tab: "04 · Voz -14 LUFS y Color",
        title: "Voz Limpia, Auto-Ducking y Color DaVinci",
        desc: "Cadena vocal nítida, música con ducking automático y masterización en -14 LUFS.",
        badges: ["-14 LUFS", "Auto-Ducking", "Color DaVinci", "Storytelling"]
      }
    },
    {
      id: "compare",
      src: "",
      isCanvasCompare: true,
      pt: {
        tab: "05 · Antes vs Depois",
        title: "Comparador ao Vivo: Bruto vs Editado p/ Reter",
        desc: "Alterne entre uma gravação comum sem corte e o resultado final com cor, enquadramento e legenda dinâmica.",
        badges: ["Comparativo Real", "Antes / Depois", "Retenção"]
      },
      en: {
        tab: "05 · Before vs After",
        title: "Live Comparator: Raw Footage vs Retention Edit",
        desc: "Toggle between flat raw footage and the color-graded, captioned final cut.",
        badges: ["Live Compare", "Before / After", "Retention"]
      },
      es: {
        tab: "05 · Antes vs Después",
        title: "Comparador en Vivo: Bruto vs Editado",
        desc: "Alterna entre una grabación cruda y el corte final con color y subtítulos.",
        badges: ["Comparador", "Antes / Después", "Retención"]
      }
    }
  ];

  /* ------------------------------------------------------------------------
     BLOCO 5: Aplicador Global de Idioma (PT · EN · ES) e Helper NS.t()
     Data/Hora: 02/11/2026 12:30
     ------------------------------------------------------------------------ */
  NS.t = function (key) {
    const lang = NS.currentLang || "pt";
    const dict = NS.UI_STRINGS[lang] || NS.UI_STRINGS.pt;
    return dict[key] !== undefined ? dict[key] : (NS.UI_STRINGS.pt[key] || key);
  };

  NS.setLanguage = function (lang) {
    if (!NS.UI_STRINGS[lang]) return;
    NS.currentLang = lang;

    const htmlRoot = document.documentElement;
    htmlRoot.setAttribute("lang", lang === "pt" ? "pt-BR" : lang);

    const dict = NS.UI_STRINGS[lang];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const k = el.getAttribute("data-i18n");
      if (dict[k] !== undefined) {
        el.textContent = dict[k];
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      const k = el.getAttribute("data-i18n-html");
      if (dict[k] !== undefined) {
        el.innerHTML = dict[k];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const k = el.getAttribute("data-i18n-placeholder");
      if (dict[k] !== undefined) {
        el.setAttribute("placeholder", dict[k]);
      }
    });

    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      const active = btn.getAttribute("data-lang-switch") === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    window.dispatchEvent(new CustomEvent("mattheus:langchange", { detail: { lang: lang } }));
  };
})();
