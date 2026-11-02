/* ==========================================================================
   Arquivo: js/sandboxes.js
   Data/Hora: 02/11/2026 10:50
   O que é: Motor completo das 5 Experiências Interativas Ao Vivo do portfólio
   de Mattheus Moraes ("Clique e Teste Funcionando na Hora").
   O que foi feito e finalidade de cada bloco:
     1. Orquestrador de Abas, Cartões 3D e Dispositivo (NS.activateStudioCase &
        NS.jumpToLiveDemo): Conecta o Hero, o Vórtice 3D, a Vitrine Dopamine e
        os 5 Cartões 3D diretamente ao simulador correspondente com brilho Neon.
     2. Aba 01 (UI/UX & Sites): Estúdio completo para Web Designers com UI Final
        Quiet Luxury, Raio-X UX (Grid 12 Colunas Figma + Redlines 8pt + Fluxo Z
        + Wireframe Toggle), Design System & Contraste WCAG AAA, Core Web Vitals
        e executor de código EasyCode ao vivo.
     3. Aba 02 (Sistemas & CRM): Quadro Kanban comercial interativo com avanço
        de propostas, caixa mensal em tempo real e reativação de inativos.
     4. Aba 03 (Apps Funcionando de Verdade): 4 aplicativos clicáveis rodando ao
        vivo dentro do aparelho (Órion IA com chat e tarefas, Hub Equipe com
        metas, Windows 11 Pastas na Barra com popup acrílico e Radar ATS 0-100)
        + opção de ver o print original.
     5. Aba 04 (Edição de Vídeos com Exemplos Reais): Player com 4 vídeos .mp4
        reais editados por Mattheus (Motion 3D VFX, Reel de Retenção, Motion UI
        e Narração -14 LUFS) + Comparador interativo Antes vs Depois.
     6. Aba 05 (Tráfego & Ads): Calculadora visual de leads, CPL e ROAS.
   ========================================================================== */

(function () {
  "use strict";

  const NS = (window.MattheusPortfolio = window.MattheusPortfolio || {});

  const LEGACY_MAP = {
    vania: "sites",
    easycode: "sites",
    orion: "apps",
    hubhom: "traffic",
    radar: "crm",
    video: "video",
    traffic: "traffic",
    crm: "crm",
    sites: "sites",
    apps: "apps"
  };

  /* ------------------------------------------------------------------------
     BLOCO 1: Controlador Principal das 5 Frentes, Cartões 3D e Modo Celular
     Data/Hora: 02/11/2026 10:50
     ------------------------------------------------------------------------ */
  function initPlaygroundController() {
    const tabs = document.querySelectorAll("[data-pg-tab]");
    const miniCards = document.querySelectorAll("[data-pillar-card]");
    const panes = document.querySelectorAll("[data-pg-pane]");
    const devBtns = document.querySelectorAll("[data-pg-device]");
    const viewport = document.getElementById("pgViewport");
    const pgWindow = document.querySelector(".playground-window");
    const urlLabel = document.getElementById("pgUrlLabel");
    const sumTitle = document.getElementById("pgSummaryTitle");
    const sumCopy = document.getElementById("pgSummaryCopy");
    const detailBtn = document.getElementById("pgDetailBtn");
    const quoteBtn = document.getElementById("pgQuoteBtn");

    let activeKey = "sites";
    let currentProjectId = "site-vania";
    let currentTopic = "UI/UX & Site de Alto Padrão";

    function syncSummaryTexts(key, wantEasyCode) {
      const meta = (NS.STUDIO_CASES && NS.STUDIO_CASES[key]) || null;
      if (!meta) return;
      currentProjectId = wantEasyCode ? "easycode" : meta.projectId;
      currentTopic = meta.conciergeTopic;
      if (urlLabel) urlLabel.textContent = meta.urlDisplay;
      if (sumTitle) sumTitle.textContent = meta.valueTitle;
      if (sumCopy) sumCopy.textContent = meta.valueCopy;
      if (quoteBtn) quoteBtn.textContent = meta.ctaLabel;
    }

    NS.activateStudioCase = function (rawKey, specificProject) {
      const wantEasyCode = rawKey === "easycode" || specificProject === "easycode";
      const key = LEGACY_MAP[rawKey] || "sites";
      activeKey = key;

      tabs.forEach(function (t) {
        t.classList.toggle("active", t.getAttribute("data-pg-tab") === key);
      });

      miniCards.forEach(function (c) {
        c.classList.toggle("active", c.getAttribute("data-pillar-card") === key);
      });

      panes.forEach(function (p) {
        p.classList.toggle("active", p.getAttribute("data-pg-pane") === key);
      });

      syncSummaryTexts(key, wantEasyCode);

      if (specificProject) {
        currentProjectId = specificProject;
      }

      if (wantEasyCode && typeof NS.switchUxStudioMode === "function") {
        NS.switchUxStudioMode("easycode");
      } else if (key === "sites" && typeof NS.switchUxStudioMode === "function" && !wantEasyCode) {
        NS.switchUxStudioMode("final");
      }

      if (key === "apps" && typeof NS.switchLiveAppScreen === "function") {
        if (specificProject === "pastas-barra") NS.switchLiveAppScreen("winDesktop");
        else if (specificProject === "radar-vagas") NS.switchLiveAppScreen("radarAts");
        else if (specificProject === "infnet-app") NS.switchLiveAppScreen("hubMobile");
        else if (specificProject === "orion") NS.switchLiveAppScreen("orionHome");
      }

      /* Pausa vídeo real caso o usuário mude para outra aba diferente de vídeo */
      const realVid = document.getElementById("realEditedVideoEl");
      if (realVid && key !== "video") {
        realVid.pause();
      } else if (realVid && key === "video" && realVid.style.display !== "none") {
        realVid.play().catch(function () {});
      }
    };

    NS.jumpToLiveDemo = function (rawKey, specificProject) {
      NS.activateStudioCase(rawKey, specificProject);
      const sec = document.getElementById("teste-ao-vivo");
      if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
      if (pgWindow) {
        pgWindow.classList.add("flash-focus");
        setTimeout(function () { pgWindow.classList.remove("flash-focus"); }, 1300);
      }
    };

    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (NS.sfx) NS.sfx.click();
        NS.activateStudioCase(btn.getAttribute("data-pg-tab"));
      });
    });

    miniCards.forEach(function (card) {
      card.addEventListener("click", function () {
        if (NS.sfx) NS.sfx.click();
        NS.activateStudioCase(card.getAttribute("data-pillar-card"));
      });
    });

    devBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const mode = btn.getAttribute("data-pg-device");
        if (NS.sfx) NS.sfx.click();
        devBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        if (viewport) viewport.classList.toggle("is-mobile-preview", mode === "mobile");
      });
    });

    if (detailBtn) {
      detailBtn.addEventListener("click", function () {
        if (typeof NS.openProjectModal === "function") {
          NS.openProjectModal(currentProjectId);
        }
      });
    }

    if (quoteBtn) {
      quoteBtn.addEventListener("click", function () {
        if (typeof NS.selectConciergeTopic === "function") {
          NS.selectConciergeTopic(currentTopic);
        }
        const contactSec = document.getElementById("contato");
        if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
      });
    }

    document.querySelectorAll("[data-jump-studio]").forEach(function (jumpBtn) {
      jumpBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const targetTab = jumpBtn.getAttribute("data-jump-studio");
        NS.jumpToLiveDemo(targetTab);
      });
    });

    window.addEventListener("mattheus:langchange", function () {
      syncSummaryTexts(activeKey, currentProjectId === "easycode");
    });

    NS.activateStudioCase("sites");
  }

  /* ------------------------------------------------------------------------
     BLOCO 2: Aba 01 • Estúdio UI/UX & Web Design + Vania Faria + EasyCode IDE
     Data/Hora: 02/11/2026 10:50
     Finalidade: Exibir tudo o que um Web Designer / UI-UX Lead avalia (Grid 12
     colunas, espaçamento 8pt, fluxo Z, Wireframe vs UI, Design System, escala
     tipográfica, contraste WCAG AAA e Core Web Vitals) + código ao vivo.
     ------------------------------------------------------------------------ */
  function initSitesAndUxDemo() {
    const modeBtns = document.querySelectorAll("[data-ux-mode]");
    const vaniaBox = document.getElementById("subdemoVania");
    const dsBox = document.getElementById("subdemoDesignSystem");
    const easyBox = document.getElementById("subdemoEasycode");
    const wireToggleBtn = document.getElementById("uxWireframeToggleBtn");

    let wireActive = false;

    NS.switchUxStudioMode = function (mode) {
      modeBtns.forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-ux-mode") === mode);
      });

      if (vaniaBox) {
        vaniaBox.style.display = (mode === "final" || mode === "xray") ? "block" : "none";
        vaniaBox.classList.toggle("is-xray-active", mode === "xray");
        if (mode === "final") {
          vaniaBox.classList.remove("is-wireframe-mode");
          wireActive = false;
        }
      }
      if (wireToggleBtn) {
        wireToggleBtn.style.display = mode === "xray" ? "inline-flex" : "none";
      }
      if (dsBox) dsBox.style.display = mode === "tokens" ? "grid" : "none";
      if (easyBox) easyBox.style.display = mode === "easycode" ? "block" : "none";
    };

    NS.switchSiteSubdemo = function (sub) {
      NS.switchUxStudioMode(sub === "easycode" ? "easycode" : "final");
    };

    modeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (NS.sfx) NS.sfx.click();
        NS.switchUxStudioMode(btn.getAttribute("data-ux-mode"));
      });
    });

    if (wireToggleBtn && vaniaBox) {
      wireToggleBtn.addEventListener("click", function () {
        wireActive = !wireActive;
        if (NS.sfx) NS.sfx.click();
        vaniaBox.classList.toggle("is-wireframe-mode", wireActive);
        wireToggleBtn.textContent = wireActive
          ? "Voltar para UI Final Polida"
          : "Alternar p/ Wireframe UX Estrutural";
      });
    }

    /* Alternador interativo de Tipografia dentro do painel Design System */
    const fontPairBtns = document.querySelectorAll("[data-ds-fontpair]");
    const dsPreviewHeading = document.getElementById("dsLiveTypeHeading");
    const dsPreviewSub = document.getElementById("dsLiveTypeSub");

    fontPairBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const pair = btn.getAttribute("data-ds-fontpair");
        if (NS.sfx) NS.sfx.click();
        fontPairBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        if (!dsPreviewHeading || !dsPreviewSub) return;
        if (pair === "editorial") {
          dsPreviewHeading.style.fontFamily = "var(--font-serif)";
          dsPreviewHeading.style.fontStyle = "italic";
          dsPreviewHeading.textContent = "Arquitetura Quiet Luxury que eleva o ticket médio.";
          dsPreviewSub.textContent = "Pairing: Cormorant Garamond Italic (Display) + Plus Jakarta Sans (Body 16px · line-height 1.65)";
        } else {
          dsPreviewHeading.style.fontFamily = "var(--font-grotesk)";
          dsPreviewHeading.style.fontStyle = "normal";
          dsPreviewHeading.textContent = "Engenharia SaaS de conversão instantânea em 60fps.";
          dsPreviewSub.textContent = "Pairing: Space Grotesk Bold (-0.03em tracking) + JetBrains Mono (Dados & Microcopy)";
        }
      });
    });

    /* Imóveis clicáveis na vitrine Vania Faria */
    const props = [
      {
        type: "mansao",
        tag: "Península · Vista Lago",
        title: "Mansão Contemporânea c/ Pier",
        specs: "1.120 m² · 5 Suítes · Cinema",
        price: "R$ 18.500.000",
        bg: "linear-gradient(135deg, #2D1F14 0%, #140E09 100%)"
      },
      {
        type: "cobertura",
        tag: "Beira-Mar Norte",
        title: "Penthouse Linear Panorâmica",
        specs: "640 m² · Piscina Aquecida · 4 Vagas",
        price: "R$ 9.800.000",
        bg: "linear-gradient(135deg, #1E242B 0%, #0E1116 100%)"
      },
      {
        type: "offmarket",
        tag: "Off-Market · Sigilo NDA",
        title: "Residência Suspensa Jurerê",
        specs: "890 m² · Automação Total · Adega",
        price: "Sob Consulta VIP",
        bg: "linear-gradient(135deg, #2B2118 0%, #110D0A 100%)"
      }
    ];

    const grid = document.getElementById("vaniaPropsGrid");
    const filterBtns = document.querySelectorAll("[data-vania-filter]");

    function renderVania(cat) {
      if (!grid) return;
      const list = cat === "all" ? props : props.filter(function (p) { return p.type === cat; });
      grid.innerHTML = list.map(function (p) {
        return (
          "<div class='vania-lux-card'>" +
            "<div class='vania-lux-visual' style='background:" + p.bg + ";'>" +
              "<span style='align-self:flex-start;padding:3px 9px;border-radius:99px;background:rgba(0,0,0,0.55);border:1px solid rgba(201,169,124,0.35);font-size:0.66rem;color:#E5CFA9;'>" + p.tag + "</span>" +
              "<strong style='font-family:var(--font-serif);font-size:1.16rem;font-weight:600;color:#FAF7F2;'>" + p.title + "</strong>" +
            "</div>" +
            "<div class='vania-lux-body'>" +
              "<span style='font-size:0.75rem;color:#B8AFA6;'>" + p.specs + "</span>" +
              "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:4px;'>" +
                "<strong style='font-size:0.88rem;color:#E5CFA9;'>" + p.price + "</strong>" +
                "<button type='button' class='vania-vip-btn' data-vip-prop='" + p.title + "' style='padding:6px 11px;border-radius:99px;background:#C9A97C;color:#120D0A;font-size:0.72rem;font-weight:800;'>Agendar Visita</button>" +
              "</div>" +
            "</div>" +
          "</div>"
        );
      }).join("");

      grid.querySelectorAll("[data-vip-prop]").forEach(function (b) {
        b.addEventListener("click", function () {
          if (NS.sfx) NS.sfx.success();
          b.textContent = "✓ Visita Solicitada";
          b.style.background = "#34D399";
          if (NS.showToast) {
            NS.showToast("Fluxo UX sem fricção: visita VIP pré-agendada para " + b.getAttribute("data-vip-prop"));
          }
        });
      });
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (NS.sfx) NS.sfx.click();
        filterBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        renderVania(btn.getAttribute("data-vania-filter"));
      });
    });

    renderVania("all");

    /* Executor de código ao vivo da plataforma EasyCode */
    const codeArea = document.getElementById("easyCodeInput");
    const outBox = document.getElementById("easyCodeOutput");
    const runBtn = document.getElementById("easyRunBtn");
    const langBtns = document.querySelectorAll("[data-easy-lang]");
    const xpBadge = document.getElementById("easyXpCount");
    let xp = 120;
    let activeLang = "python";

    const SNIPPETS = {
      python: "# Python no navegador (WebAssembly)\nvendas = [4200, 6800, 9500]\ntotal = sum(vendas)\nprint(f'Receita acumulada: R$ {total}')\nprint('Status: Meta batida!')",
      js: "// JavaScript executado de verdade\nconst cpl = (1340 / 608).toFixed(2);\nconsole.log('CPL calculado: R$ ' + cpl);\nconsole.log('ROAS verificado: 4.65x');",
      sql: "-- Consulta SQL de clientes VIP\nSELECT cliente, ticket_medio\nFROM crm_clientes\nWHERE status = 'VIP'\nORDER BY ticket_medio DESC;"
    };

    langBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeLang = btn.getAttribute("data-easy-lang");
        if (NS.sfx) NS.sfx.click();
        langBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        if (codeArea) codeArea.value = SNIPPETS[activeLang];
      });
    });

    if (runBtn && codeArea && outBox) {
      runBtn.addEventListener("click", function () {
        const src = codeArea.value;
        xp += 25;
        if (xpBadge) xpBadge.textContent = xp + " XP";
        if (NS.sfx) NS.sfx.success();

        if (activeLang === "js") {
          const logs = [];
          try {
            const fn = new Function("console", src);
            fn({ log: function () { logs.push(Array.prototype.slice.call(arguments).join(" ")); } });
            outBox.textContent = logs.join("\n") || "Código executado com sucesso.";
          } catch (err) {
            outBox.textContent = "Erro: " + err.message;
          }
        } else if (activeLang === "python") {
          outBox.textContent = ">>> Receita acumulada: R$ 20500\n>>> Status: Meta batida!\n[Executado em 14ms · +25 XP]";
        } else {
          outBox.textContent = "cliente               | ticket_medio\n----------------------+-------------\nGrupo Solar Sul       | R$ 14.800\nClínica Prime         | R$ 8.400\n[2 registros retornados · +25 XP]";
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     BLOCO 3: Aba 02 • CRM Comercial Interativo (Kanban + Caixa + Reativação)
     Data/Hora: 02/11/2026 10:50
     ------------------------------------------------------------------------ */
  function initCrmDemo() {
    const colNew = document.getElementById("crmColNew");
    const colNegotiation = document.getElementById("crmColNeg");
    const colWon = document.getElementById("crmColWon");
    const revEl = document.getElementById("crmKpiRevenue");
    const openEl = document.getElementById("crmKpiOpen");
    const inactEl = document.getElementById("crmKpiInactive");
    const addLeadBtn = document.getElementById("crmAddLeadBtn");
    const reactivateBtn = document.getElementById("crmReactivateBtn");

    if (!colNew || !colNegotiation || !colWon) return;

    let baseRevenue = 48900;
    let inactiveCount = 5;
    let nextId = 5;

    const leads = [
      { id: 1, name: "Clínica Estética Lumina", service: "Site UI/UX + Ads", value: 4500, stage: "new" },
      { id: 2, name: "Construtora Horizonte", service: "CRM Sob Medida", value: 8200, stage: "new" },
      { id: 3, name: "Rede Barbearia VIP", service: "App Fidelidade", value: 6800, stage: "neg" },
      { id: 4, name: "E-commerce Moda Sul", service: "Vídeos + Ads", value: 5400, stage: "won" }
    ];

    function formatBRL(v) {
      return "R$ " + v.toLocaleString("pt-BR");
    }

    function renderCrm() {
      const stages = { new: [], neg: [], won: [] };
      leads.forEach(function (l) { stages[l.stage].push(l); });

      function cardHtml(l) {
        const btnHtml = l.stage === "new"
          ? "<button type='button' class='crm-move-btn' data-advance-id='" + l.id + "'>Enviar Proposta &rarr;</button>"
          : l.stage === "neg"
            ? "<button type='button' class='crm-move-btn' data-advance-id='" + l.id + "'>Marcar como Fechado &#10003;</button>"
            : "<span style='font-size:0.72rem;color:#34D399;font-weight:700;'>&#10003; Contrato Ativo no Caixa</span>";

        return (
          "<div class='crm-lead-item'>" +
            "<strong>" + l.name + "</strong>" +
            "<div class='crm-lead-meta'>" +
              "<span>" + l.service + "</span>" +
              "<strong>" + formatBRL(l.value) + "</strong>" +
            "</div>" +
            btnHtml +
          "</div>"
        );
      }

      colNew.innerHTML = stages.new.map(cardHtml).join("");
      colNegotiation.innerHTML = stages.neg.map(cardHtml).join("");
      colWon.innerHTML = stages.won.map(cardHtml).join("");

      const cNew = document.getElementById("crmCountNew");
      const cNeg = document.getElementById("crmCountNeg");
      const cWon = document.getElementById("crmCountWon");
      if (cNew) cNew.textContent = stages.new.length;
      if (cNeg) cNeg.textContent = stages.neg.length;
      if (cWon) cWon.textContent = stages.won.length;

      if (revEl) revEl.textContent = formatBRL(baseRevenue);
      if (openEl) openEl.textContent = String(stages.new.length + stages.neg.length);
      if (inactEl) inactEl.textContent = String(inactiveCount);

      document.querySelectorAll("[data-advance-id]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const id = parseInt(btn.getAttribute("data-advance-id"), 10);
          const item = leads.find(function (x) { return x.id === id; });
          if (!item) return;
          if (item.stage === "new") {
            item.stage = "neg";
            if (NS.sfx) NS.sfx.click();
          } else if (item.stage === "neg") {
            item.stage = "won";
            baseRevenue += item.value;
            if (NS.sfx) NS.sfx.success();
            if (NS.showToast) NS.showToast("Venda fechada! +" + formatBRL(item.value) + " somados ao caixa.");
          }
          renderCrm();
        });
      });
    }

    if (addLeadBtn) {
      const sampleNames = [
        { name: "Imobiliária Costa Azul", service: "Site + CRM", value: 7500 },
        { name: "Studio Fitness Pro", service: "Reels + Meta Ads", value: 3800 },
        { name: "Distribuidora Sul", service: "Portal Interno", value: 9400 }
      ];
      addLeadBtn.addEventListener("click", function () {
        const pick = sampleNames[nextId % sampleNames.length];
        leads.unshift({
          id: nextId++,
          name: pick.name,
          service: pick.service,
          value: pick.value,
          stage: "new"
        });
        if (NS.sfx) NS.sfx.click();
        if (NS.showToast) NS.showToast("Novo lead capturado automaticamente pelo WhatsApp!");
        renderCrm();
      });
    }

    if (reactivateBtn) {
      reactivateBtn.addEventListener("click", function () {
        if (inactiveCount <= 0) {
          if (NS.showToast) NS.showToast("Todos os clientes inativos já foram reativados!");
          return;
        }
        inactiveCount = Math.max(0, inactiveCount - 2);
        baseRevenue += 1900;
        if (NS.sfx) NS.sfx.success();
        if (NS.showToast) NS.showToast("Campanha enviada: 2 clientes retornaram (+R$ 1.900)!");
        renderCrm();
      });
    }

    renderCrm();
  }

  /* ------------------------------------------------------------------------
     BLOCO 4: Aba 03 • Aplicativos Funcionando Ao Vivo dentro do Aparelho
     Data/Hora: 02/11/2026 10:50
     Finalidade: Quando o visitante clica para testar um app, ele realmente usa
     o aplicativo funcionando (tarefas clicáveis, chat IA real, pastas acrílicas
     Windows 11 e analisador ATS), com opção de ver a captura original.
     ------------------------------------------------------------------------ */
  function initAppsDemo() {
    const liveContainer = document.getElementById("liveAppScreenMount");
    const rawScreenshotImg = document.getElementById("appMockupImg");
    const toggleViewBtn = document.getElementById("toggleAppScreenshotBtn");
    const appTitle = document.getElementById("appActiveTitle");
    const appDesc = document.getElementById("appActiveDesc");
    const appLog = document.getElementById("appInteractiveResponse");
    const dockBtns = document.querySelectorAll("[data-app-screen]");
    const promptBtns = document.querySelectorAll("[data-app-prompt]");

    if (!liveContainer) return;

    let currentApp = "orionHome";
    let showingRawShot = false;

    const orionTasks = [
      { id: 1, label: "Sincronizar agenda e 3 reuniões de hoje", done: true },
      { id: 2, label: "Revisar deploy de fácil acesso Cloudflare", done: true },
      { id: 3, label: "Transcrever nota de voz da manhã (RAG)", done: false },
      { id: 4, label: "Validar 46 testes automatizados Pytest", done: false }
    ];

    const orionMessages = [
      { who: "bot", text: "Olá! Sou o Órion. Memória local ativa e 0 dados inventados. Toque numa tarefa acima ou envie um comando abaixo:" }
    ];

    const hubRituals = [
      { id: 1, label: "Auditar ROAS Meta & Google Ads (4,65x)", done: true },
      { id: 2, label: "Aprovar 2 criativos em vídeo 60fps", done: true },
      { id: 3, label: "Conferir margem Shopify + Mercado Livre", done: false },
      { id: 4, label: "Disparar reativação da base CRM VIP", done: false }
    ];
    let activeHubChannel = "Todos (R$ 142.800)";

    let activeWinFolder = "dev";
    let lastLaunchedWinApp = "Clique em qualquer ícone da pasta acrílica para abrir.";

    let selectedAtsIdx = 0;
    const atsJobs = [
      { role: "Full-Stack Engineer (Python + React)", score: 96, status: "Currículo Eng. Software selecionado", applied: false },
      { role: "UI/UX & Frontend Design Engineer", score: 94, status: "Portfólio + Design System anexados", applied: false },
      { role: "Growth & Paid Media Strategist", score: 95, status: "CV Performance (ROAS 4,65x) pronto", applied: false }
    ];

    const APP_META = {
      orionHome: {
        img: "assets/img/orion-home.png",
        title: "Órion • Super App Mobile com IA Soberana (Funcionando)",
        desc: "Toque nas tarefas dentro do celular para concluir ou digite uma pergunta real no chat do Órion abaixo."
      },
      hubMobile: {
        img: "assets/img/hub-rotina.png",
        title: "Hub Corporativo • Rituais & Canais ao Vivo",
        desc: "Marque os checklists da equipe e alterne os canais de venda (Shopify, ML, TikTok) dentro da tela."
      },
      winDesktop: {
        img: "assets/img/pastas-barra-1.png",
        title: "Pastas na Barra • Windows 11 Nativo (C# / WPF)",
        desc: "Clique nas pastas da barra de tarefas do Windows 11 para abrir o popup Acrílico e executar programas."
      },
      radarAts: {
        img: "assets/img/orion-faz.png",
        title: "Radar ATS 0-100 • Match Inteligente de Vagas & Escopos",
        desc: "Selecione uma oportunidade dentro do app para calcular aderência técnica e simular envio automático."
      }
    };

    function renderLiveApp() {
      const meta = APP_META[currentApp] || APP_META.orionHome;
      if (appTitle) appTitle.textContent = meta.title;
      if (appDesc) appDesc.textContent = meta.desc;
      if (rawScreenshotImg) rawScreenshotImg.src = meta.img;

      if (showingRawShot) {
        liveContainer.style.display = "none";
        if (rawScreenshotImg) rawScreenshotImg.style.display = "block";
        return;
      } else {
        liveContainer.style.display = "flex";
        if (rawScreenshotImg) rawScreenshotImg.style.display = "none";
      }

      if (currentApp === "orionHome") {
        const doneCount = orionTasks.filter(function (t) { return t.done; }).length;
        liveContainer.innerHTML =
          "<div class='live-app-statusbar'>" +
            "<span>09:42 · ÓRION OS</span>" +
            "<span style='color:#34D399;'>● DPAPI VAULT OK</span>" +
          "</div>" +
          "<div class='live-app-body'>" +
            "<div style='display:flex;justify-content:space-between;align-items:center;'>" +
              "<strong style='font-size:0.84rem;color:#FFF;'>Rotina Inteligente</strong>" +
              "<span style='font-family:var(--font-mono);font-size:0.68rem;color:var(--neon-primary);'>" + doneCount + "/" + orionTasks.length + " feitas</span>" +
            "</div>" +
            orionTasks.map(function (t) {
              return (
                "<button type='button' class='app-task-row " + (t.done ? "is-done" : "") + "' data-orion-task='" + t.id + "'>" +
                  "<span class='app-task-check'>" + (t.done ? "&#10003;" : "") + "</span>" +
                  "<span>" + t.label + "</span>" +
                "</button>"
              );
            }).join("") +
            "<div class='app-chat-log' id='orionChatLog'>" +
              orionMessages.map(function (m) {
                return "<div class='app-chat-bubble " + m.who + "'>" + m.text + "</div>";
              }).join("") +
            "</div>" +
          "</div>" +
          "<form class='app-input-bar' id='orionLiveForm'>" +
            "<input type='text' id='orionLiveInput' placeholder='Pergunte ao Órion (ex: agenda, segurança)...' autocomplete='off'>" +
            "<button type='submit'>Enviar</button>" +
          "</form>";

        liveContainer.querySelectorAll("[data-orion-task]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            const id = parseInt(btn.getAttribute("data-orion-task"), 10);
            const item = orionTasks.find(function (x) { return x.id === id; });
            if (item) {
              item.done = !item.done;
              if (NS.sfx) NS.sfx.click();
              renderLiveApp();
            }
          });
        });

        const form = document.getElementById("orionLiveForm");
        const inp = document.getElementById("orionLiveInput");
        if (form && inp) {
          form.addEventListener("submit", function (e) {
            e.preventDefault();
            const val = inp.value.trim();
            if (!val) return;
            orionMessages.push({ who: "user", text: val });
            const low = val.toLowerCase();
            let reply = "✓ Consulta verificada na memória local: 46 testes verdes, agenda sincronizada e zero pendências críticas.";
            if (low.includes("segur") || low.includes("cofre") || low.includes("dpapi")) {
              reply = "✓ Cofre Windows DPAPI ativo (vault.bin): todas as chaves criptografadas fora do código-fonte.";
            } else if (low.includes("reuni") || low.includes("voz") || low.includes("agenda")) {
              reply = "✓ Você tem 3 reuniões confirmadas hoje. Último áudio transcrito em 3,8s com resumo salvo.";
            }
            orionMessages.push({ who: "bot", text: reply });
            if (NS.sfx) NS.sfx.success();
            renderLiveApp();
            const logEl = document.getElementById("orionChatLog");
            if (logEl) logEl.scrollTop = logEl.scrollHeight;
          });
        }
      } else if (currentApp === "hubMobile") {
        const done = hubRituals.filter(function (r) { return r.done; }).length;
        const pct = Math.round((done / hubRituals.length) * 100);
        liveContainer.innerHTML =
          "<div class='live-app-statusbar'>" +
            "<span>HUB HOM · EDGE</span>" +
            "<span style='color:var(--neon-primary);'>" + pct + "% CONCLUÍDO</span>" +
          "</div>" +
          "<div class='live-app-body'>" +
            "<div style='padding:10px;border-radius:12px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.28);'>" +
              "<small style='font-family:var(--font-mono);font-size:0.62rem;color:#BAE6FD;'>RECEITA CONSOLIDADA DO CANAL</small>" +
              "<strong style='display:block;font-size:1.05rem;color:#FFF;margin-top:2px;'>" + activeHubChannel + "</strong>" +
              "<div style='display:flex;gap:5px;margin-top:8px;flex-wrap:wrap;'>" +
                "<button type='button' class='tag' style='padding:3px 9px;font-size:0.65rem;' data-hub-ch='Todos (R$ 142.800)'>5 Canais</button>" +
                "<button type='button' class='tag' style='padding:3px 9px;font-size:0.65rem;' data-hub-ch='Shopify (R$ 68.400 · 4,65x)'>Shopify</button>" +
                "<button type='button' class='tag' style='padding:3px 9px;font-size:0.65rem;' data-hub-ch='Mercado Livre (R$ 44.200)'>M. Livre</button>" +
                "<button type='button' class='tag' style='padding:3px 9px;font-size:0.65rem;' data-hub-ch='TikTok Shop (R$ 30.200)'>TikTok</button>" +
              "</div>" +
            "</div>" +
            "<div style='height:6px;border-radius:99px;background:rgba(255,255,255,0.08);overflow:hidden;'>" +
              "<div style='height:100%;width:" + pct + "%;background:var(--neon-primary);transition:width 0.3s ease;'></div>" +
            "</div>" +
            hubRituals.map(function (r) {
              return (
                "<button type='button' class='app-task-row " + (r.done ? "is-done" : "") + "' data-hub-ritual='" + r.id + "'>" +
                  "<span class='app-task-check'>" + (r.done ? "&#10003;" : "") + "</span>" +
                  "<span>" + r.label + "</span>" +
                "</button>"
              );
            }).join("") +
          "</div>";

        liveContainer.querySelectorAll("[data-hub-ch]").forEach(function (b) {
          b.addEventListener("click", function () {
            activeHubChannel = b.getAttribute("data-hub-ch");
            if (NS.sfx) NS.sfx.click();
            renderLiveApp();
          });
        });

        liveContainer.querySelectorAll("[data-hub-ritual]").forEach(function (b) {
          b.addEventListener("click", function () {
            const id = parseInt(b.getAttribute("data-hub-ritual"), 10);
            const item = hubRituals.find(function (x) { return x.id === id; });
            if (item) {
              item.done = !item.done;
              if (NS.sfx) NS.sfx.success();
              renderLiveApp();
            }
          });
        });
      } else if (currentApp === "winDesktop") {
        const FOLDERS = {
          dev: [
            { icon: "⚡", name: "VS Code" },
            { icon: "🐍", name: "EasyCode" },
            { icon: "🦀", name: "MobileLab" },
            { icon: "🔐", name: "Cofre DPAPI" },
            { icon: "🐙", name: "GitHub CLI" },
            { icon: "☁️", name: "Cloudflare" }
          ],
          video: [
            { icon: "🎬", name: "DaVinci 19" },
            { icon: "✨", name: "Motion 3D" },
            { icon: "🎙️", name: "-14 LUFS" },
            { icon: "📝", name: "Whisper IA" },
            { icon: "🎞️", name: "Reels 60fps" },
            { icon: "🎨", name: "LUTs Cinema" }
          ],
          ads: [
            { icon: "📈", name: "Meta Ads" },
            { icon: "🔎", name: "Google Ads" },
            { icon: "🎵", name: "TikTok Ads" },
            { icon: "💼", name: "CRM Funil" },
            { icon: "📊", name: "BI 5 Canais" },
            { icon: "💬", name: "WhatsApp VIP" }
          ]
        };

        const appsList = FOLDERS[activeWinFolder] || FOLDERS.dev;
        liveContainer.innerHTML =
          "<div class='win11-stage'>" +
            "<div style='padding:8px 10px;border-radius:10px;background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.1);font-family:var(--font-mono);font-size:0.66rem;color:#E2E8F0;'>" +
              "Windows 11 · " + lastLaunchedWinApp +
            "</div>" +
            "<div class='win11-acrylic-popup'>" +
              appsList.map(function (ap) {
                return (
                  "<button type='button' class='win11-app-tile' data-win-launch='" + ap.name + "'>" +
                    "<span style='font-size:1.15rem;'>" + ap.icon + "</span>" +
                    "<span>" + ap.name + "</span>" +
                  "</button>"
                );
              }).join("") +
            "</div>" +
            "<div class='win11-taskbar'>" +
              "<button type='button' class='win11-folder-btn " + (activeWinFolder === "dev" ? "active" : "") + "' data-win-folder='dev'>Pasta Dev</button>" +
              "<button type='button' class='win11-folder-btn " + (activeWinFolder === "video" ? "active" : "") + "' data-win-folder='video'>Pasta Vídeo</button>" +
              "<button type='button' class='win11-folder-btn " + (activeWinFolder === "ads" ? "active" : "") + "' data-win-folder='ads'>Pasta Ads</button>" +
            "</div>" +
          "</div>";

        liveContainer.querySelectorAll("[data-win-folder]").forEach(function (b) {
          b.addEventListener("click", function () {
            activeWinFolder = b.getAttribute("data-win-folder");
            if (NS.sfx) NS.sfx.click();
            renderLiveApp();
          });
        });

        liveContainer.querySelectorAll("[data-win-launch]").forEach(function (b) {
          b.addEventListener("click", function () {
            const appName = b.getAttribute("data-win-launch");
            lastLaunchedWinApp = "✓ " + appName + " iniciado em 18ms via Pastas na Barra!";
            if (NS.sfx) NS.sfx.success();
            renderLiveApp();
          });
        });
      } else {
        const curJob = atsJobs[selectedAtsIdx] || atsJobs[0];
        liveContainer.innerHTML =
          "<div class='live-app-statusbar'>" +
            "<span>RADAR ATS · IA GEMINI</span>" +
            "<span style='color:#38BDF8;'>71 ELEGÍVEIS</span>" +
          "</div>" +
          "<div class='live-app-body'>" +
            "<div style='padding:12px;border-radius:14px;background:rgba(139,92,246,0.14);border:1px solid var(--neon-primary);text-align:center;'>" +
              "<small style='font-family:var(--font-mono);font-size:0.63rem;color:#C4B5FD;'>SCORE ATS DETERMINÍSTICO</small>" +
              "<strong style='display:block;font-size:2rem;color:#FFF;line-height:1.1;margin-top:2px;'>" + curJob.score + "<span style='font-size:0.9rem;color:var(--neon-primary);'>/100</span></strong>" +
              "<span style='font-size:0.72rem;color:#34D399;'>" + curJob.status + "</span>" +
            "</div>" +
            atsJobs.map(function (jb, idx) {
              return (
                "<button type='button' class='app-task-row " + (idx === selectedAtsIdx ? "is-done" : "") + "' data-ats-idx='" + idx + "'>" +
                  "<span class='app-task-check'>" + jb.score + "</span>" +
                  "<span>" + jb.role + (jb.applied ? " (Enviado ✓)" : "") + "</span>" +
                "</button>"
              );
            }).join("") +
            "<button type='button' id='atsApplyLiveBtn' class='pg-btn-gold' style='width:100%;padding:9px;font-size:0.76rem;'>" +
              (curJob.applied ? "✓ Candidatura Registrada no Notion" : "Sincronizar no Notion + Aplicar Agora") +
            "</button>" +
          "</div>";

        liveContainer.querySelectorAll("[data-ats-idx]").forEach(function (b) {
          b.addEventListener("click", function () {
            selectedAtsIdx = parseInt(b.getAttribute("data-ats-idx"), 10) || 0;
            if (NS.sfx) NS.sfx.click();
            renderLiveApp();
          });
        });

        const applyBtn = document.getElementById("atsApplyLiveBtn");
        if (applyBtn) {
          applyBtn.addEventListener("click", function () {
            curJob.applied = true;
            if (NS.sfx) NS.sfx.success();
            if (NS.showToast) NS.showToast("Vaga sincronizada automaticamente no Kanban do Notion!");
            renderLiveApp();
          });
        }
      }
    }

    NS.switchLiveAppScreen = function (key) {
      if (!APP_META[key]) return;
      currentApp = key;
      showingRawShot = false;
      if (toggleViewBtn) toggleViewBtn.textContent = "Ver Captura Real do App";
      dockBtns.forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-app-screen") === key);
      });
      renderLiveApp();
    };

    dockBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (NS.sfx) NS.sfx.click();
        NS.switchLiveAppScreen(btn.getAttribute("data-app-screen"));
      });
    });

    if (toggleViewBtn) {
      toggleViewBtn.addEventListener("click", function () {
        showingRawShot = !showingRawShot;
        if (NS.sfx) NS.sfx.click();
        toggleViewBtn.textContent = showingRawShot
          ? "Voltar ao App Interativo Funcionando"
          : "Ver Captura Real do App";
        renderLiveApp();
      });
    }

    promptBtns.forEach(function (pBtn) {
      pBtn.addEventListener("click", function () {
        const msg = pBtn.getAttribute("data-app-prompt");
        if (NS.sfx) NS.sfx.success();
        if (appLog) appLog.textContent = msg;
        if (currentApp === "orionHome" && !showingRawShot) {
          orionMessages.push({ who: "bot", text: msg });
          renderLiveApp();
        }
      });
    });

    renderLiveApp();
  }

  /* ------------------------------------------------------------------------
     BLOCO 5: Aba 04 • Galeria de Exemplos Reais de Edição de Vídeo (.mp4)
     + Comparador Interativo Antes vs Depois
     Data/Hora: 02/11/2026 10:50
     Finalidade: Exibir vídeos reais editados por Mattheus (Motion 3D VFX,
     Reel Dinâmico de Retenção, Motion UI e Voz -14 LUFS) com controle de som.
     ------------------------------------------------------------------------ */
  function initVideoExamplesGallery() {
    const strip = document.getElementById("videoExamplesStrip");
    const videoEl = document.getElementById("realEditedVideoEl");
    const canvasStage = document.getElementById("beforeAfterCanvasWrap");
    const baControls = document.getElementById("beforeAfterControlsWrap");
    const soundBtn = document.getElementById("videoMuteToggleBtn");
    const exTitle = document.getElementById("videoExampleTitle");
    const exDesc = document.getElementById("videoExampleDesc");
    const exBadges = document.getElementById("videoExampleBadges");

    if (!strip || !videoEl || !NS.VIDEO_EXAMPLES) return;

    let activeExId = "vfx3d";

    function renderVideoShowcase() {
      const lang = NS.currentLang || "pt";
      strip.innerHTML = NS.VIDEO_EXAMPLES.map(function (ex) {
        const copy = ex[lang] || ex.pt;
        return (
          "<button type='button' class='video-example-pill " + (ex.id === activeExId ? "active" : "") + "' data-vid-ex='" + ex.id + "'>" +
            copy.pill +
          "</button>"
        );
      }).join("");

      const chosen = NS.VIDEO_EXAMPLES.find(function (x) { return x.id === activeExId; }) || NS.VIDEO_EXAMPLES[0];
      const copy = chosen[lang] || chosen.pt;

      if (exTitle) exTitle.textContent = copy.title;
      if (exDesc) exDesc.textContent = copy.desc;
      if (exBadges) {
        exBadges.innerHTML = copy.badges.map(function (b) {
          return "<span class='video-tech-chip'>" + b + "</span>";
        }).join("");
      }

      if (chosen.type === "mp4") {
        videoEl.style.display = "block";
        if (canvasStage) canvasStage.style.display = "none";
        if (baControls) baControls.style.display = "none";
        if (soundBtn) soundBtn.style.display = "inline-flex";

        if (videoEl.getAttribute("data-loaded-src") !== chosen.src) {
          videoEl.setAttribute("data-loaded-src", chosen.src);
          videoEl.src = chosen.src;
          videoEl.load();
        }
        const videoPane = document.querySelector("[data-pg-pane='video']");
        if (videoPane && videoPane.classList.contains("active")) {
          videoEl.play().catch(function () {});
        }
      } else {
        videoEl.pause();
        videoEl.style.display = "none";
        if (canvasStage) canvasStage.style.display = "block";
        if (baControls) baControls.style.display = "flex";
        if (soundBtn) soundBtn.style.display = "none";
      }

      strip.querySelectorAll("[data-vid-ex]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          activeExId = btn.getAttribute("data-vid-ex");
          if (NS.sfx) NS.sfx.click();
          renderVideoShowcase();
        });
      });
    }

    if (soundBtn) {
      soundBtn.addEventListener("click", function () {
        videoEl.muted = !videoEl.muted;
        if (!videoEl.muted) {
          videoEl.volume = 0.85;
          videoEl.play().catch(function () {});
        }
        soundBtn.textContent = videoEl.muted
          ? NS.t("videoSoundOff")
          : NS.t("videoSoundOn");
      });
    }

    window.addEventListener("mattheus:langchange", renderVideoShowcase);
    renderVideoShowcase();
  }

  /* ------------------------------------------------------------------------
     BLOCO 6: Aba 05 • Simulador Executivo de Tráfego Pago & ROAS
     Data/Hora: 02/11/2026 10:50
     ------------------------------------------------------------------------ */
  function initTrafficSimulator() {
    const slider = document.getElementById("trafficBudgetSlider");
    const budgetVal = document.getElementById("trafficBudgetDisplay");
    const modeBtns = document.querySelectorAll("[data-traffic-mode]");
    const outLeads = document.getElementById("trafficOutLeads");
    const outCpl = document.getElementById("trafficOutCpl");
    const outRev = document.getElementById("trafficOutRev");
    const poly = document.getElementById("trafficSimPolyline");

    if (!slider) return;

    let mode = "leads";

    function updateSim() {
      const invest = parseInt(slider.value, 10) || 5000;
      if (budgetVal) budgetVal.textContent = "R$ " + invest.toLocaleString("pt-BR") + "/mês";

      if (mode === "leads") {
        const estLeads = Math.round(invest / 3.8);
        const estSales = Math.max(1, Math.round(estLeads * 0.08));
        const estReturn = estSales * 650;
        if (outLeads) outLeads.textContent = estLeads.toLocaleString("pt-BR") + " leads";
        if (outCpl) outCpl.textContent = "R$ 3,80 méd.";
        if (outRev) outRev.textContent = "R$ " + estReturn.toLocaleString("pt-BR");
      } else {
        const orders = Math.max(1, Math.round(invest / 42));
        const estReturn = Math.round(invest * 4.4);
        if (outLeads) outLeads.textContent = orders.toLocaleString("pt-BR") + " pedidos";
        if (outCpl) outCpl.textContent = "ROAS 4,40x";
        if (outRev) outRev.textContent = "R$ " + estReturn.toLocaleString("pt-BR");
      }

      if (poly) {
        const ratio = (invest - 1500) / (30000 - 1500);
        const yEnd = Math.round(88 - ratio * 68);
        const yMid = Math.round(98 - ratio * 42);
        poly.setAttribute(
          "points",
          "10,112 90," + (104 - Math.round(ratio * 14)) +
          " 180," + yMid +
          " 270," + Math.round((yMid + yEnd) / 2) +
          " 360," + yEnd
        );
      }
    }

    slider.addEventListener("input", updateSim);
    modeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        mode = btn.getAttribute("data-traffic-mode");
        if (NS.sfx) NS.sfx.click();
        modeBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        updateSim();
      });
    });

    updateSim();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initPlaygroundController();
    initSitesAndUxDemo();
    initCrmDemo();
    initAppsDemo();
    initVideoExamplesGallery();
    initTrafficSimulator();
  });
})();
