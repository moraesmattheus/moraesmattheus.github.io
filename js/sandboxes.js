/* ==========================================================================
   Arquivo: js/sandboxes.js
   Data/Hora: 02/11/2026 01:35
   O que é: Motor das 5 Experiências Visuais Interativas do portfólio de
   Mattheus Moraes ("Teste Meu Trabalho na Prática").
   O que foi feito e finalidade de cada bloco:
     1. Orquestrador de Abas e Dispositivo (Desktop / Celular): Alterna de forma
        simples e intuitiva entre Sites, Sistemas/CRM, Aplicativos, Edição de
        Vídeos e Gestão de Tráfego, mapeando também atalhos vindos dos modais.
     2. Aba 01 (Sites): Mini-site visual Quiet Luxury da Vania Faria Imóveis com
        filtro de imóveis e agendamento VIP + alternador para o EasyCode ao vivo.
     3. Aba 02 (Sistemas & CRM): Quadro Kanban comercial interativo onde o
        visitante avança leads entre colunas, cria novos contatos e vê o caixa
        mensal subir em tempo real.
     4. Aba 03 (Aplicativos): Mockup interativo alternando telas reais de iOS,
        Android e Windows 11 (Órion, Hub Mobile e Pastas na Barra).
     5. Aba 05 (Tráfego & ROI): Calculadora visual de escala em Meta, Google e
        TikTok Ads com curva dinâmica de retorno.
   ========================================================================== */

(function () {
  "use strict";

  const NS = (window.MattheusPortfolio = window.MattheusPortfolio || {});

  /* ------------------------------------------------------------------------
     BLOCO 1: Controlador Principal das 5 Abas Intuitivas e Modo Celular
     Data/Hora: 02/11/2026 01:35
     Finalidade: Tornar a navegação óbvia em 1 clique sem jargões técnicos.
     ------------------------------------------------------------------------ */
  const LEGACY_MAP = {
    vania: "sites",
    easycode: "sites",
    orion: "apps",
    hubhom: "traffic",
    radar: "crm"
  };

  function initPlaygroundController() {
    const tabs = document.querySelectorAll("[data-pg-tab]");
    const panes = document.querySelectorAll("[data-pg-pane]");
    const devBtns = document.querySelectorAll("[data-pg-device]");
    const viewport = document.getElementById("pgViewport");
    const urlLabel = document.getElementById("pgUrlLabel");
    const sumTitle = document.getElementById("pgSummaryTitle");
    const sumCopy = document.getElementById("pgSummaryCopy");
    const detailBtn = document.getElementById("pgDetailBtn");
    const quoteBtn = document.getElementById("pgQuoteBtn");

    let currentProjectId = "site-vania";
    let currentTopic = "Criação de Site de Alto Padrão";

    NS.activateStudioCase = function (rawKey) {
      const wantEasyCode = rawKey === "easycode";
      const key = LEGACY_MAP[rawKey] || rawKey || "sites";
      const meta = (NS.STUDIO_CASES && NS.STUDIO_CASES[key]) || null;

      tabs.forEach(function (t) {
        t.classList.toggle("active", t.getAttribute("data-pg-tab") === key);
      });

      panes.forEach(function (p) {
        p.classList.toggle("active", p.getAttribute("data-pg-pane") === key);
      });

      if (meta) {
        currentProjectId = wantEasyCode ? "easycode" : meta.projectId;
        currentTopic = meta.conciergeTopic;
        if (urlLabel) urlLabel.textContent = meta.urlDisplay;
        if (sumTitle) sumTitle.textContent = meta.valueTitle;
        if (sumCopy) sumCopy.textContent = meta.valueCopy;
        if (quoteBtn) quoteBtn.textContent = meta.ctaLabel;
      }

      if (wantEasyCode && typeof NS.switchSiteSubdemo === "function") {
        NS.switchSiteSubdemo("easycode");
      }
    };

    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (NS.sfx) NS.sfx.click();
        NS.activateStudioCase(btn.getAttribute("data-pg-tab"));
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
        if (typeof NS.prefillConcierge === "function") {
          NS.prefillConcierge(currentTopic);
        }
        const contactSec = document.getElementById("contato");
        if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
      });
    }

    // Atalhos "Testar na prática" vindos dos 5 cartões 3D
    document.querySelectorAll("[data-jump-studio]").forEach(function (jumpBtn) {
      jumpBtn.addEventListener("click", function () {
        const targetTab = jumpBtn.getAttribute("data-jump-studio");
        NS.activateStudioCase(targetTab);
        const sec = document.getElementById("estudio-interativo");
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
      });
    });

    NS.activateStudioCase("sites");
  }

  /* ------------------------------------------------------------------------
     BLOCO 2: Aba 01 • Mini-Site Visual Vania Faria + Executor EasyCode
     Data/Hora: 02/11/2026 01:35
     Finalidade: Mostrar um site real de luxo funcionando visualmente e permitir
     alternar em 1 clique para o editor de código ao vivo do EasyCode.
     ------------------------------------------------------------------------ */
  function initSitesDemo() {
    const subBtns = document.querySelectorAll("[data-site-subdemo]");
    const vaniaBox = document.getElementById("subdemoVania");
    const easyBox = document.getElementById("subdemoEasycode");

    NS.switchSiteSubdemo = function (sub) {
      subBtns.forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-site-subdemo") === sub);
      });
      if (vaniaBox) vaniaBox.style.display = sub === "vania" ? "block" : "none";
      if (easyBox) easyBox.style.display = sub === "easycode" ? "block" : "none";
    };

    subBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (NS.sfx) NS.sfx.click();
        NS.switchSiteSubdemo(btn.getAttribute("data-site-subdemo"));
      });
    });

    // Filtro visual de imóveis de alto padrão da Vania Faria
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
              "<strong style='font-family:var(--font-serif);font-size:1.2rem;font-weight:600;color:#FAF7F2;'>" + p.title + "</strong>" +
            "</div>" +
            "<div class='vania-lux-body'>" +
              "<span style='font-size:0.76rem;color:#B8AFA6;'>" + p.specs + "</span>" +
              "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:4px;'>" +
                "<strong style='font-size:0.9rem;color:#E5CFA9;'>" + p.price + "</strong>" +
                "<button type='button' class='vania-vip-btn' data-vip-prop='" + p.title + "' style='padding:6px 11px;border-radius:99px;background:#C9A97C;color:#120D0A;font-size:0.72rem;font-weight:800;'>Agendar Visita</button>" +
              "</div>" +
            "</div>" +
          "</div>"
        );
      }).join("");

      grid.querySelectorAll("[data-vip-prop]").forEach(function (b) {
        b.addEventListener("click", function () {
          if (NS.sfx) NS.sfx.success();
          if (NS.showToast) {
            NS.showToast("Atendimento VIP simulado para: " + b.getAttribute("data-vip-prop"));
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

    // Executor rápido do EasyCode (JavaScript real + simulação fiel Python/SQL)
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
     Data/Hora: 02/11/2026 01:35
     Finalidade: Fazer qualquer empresário entender imediatamente o valor de
     ter um CRM sob medida criado por Mattheus Moraes.
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
      { id: 1, name: "Clínica Estética Lumina", service: "Site + Tráfego", value: 4500, stage: "new" },
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
            ? "<button type='button' class='crm-move-btn' data-advance-id='" + l.id + "'>Marcar como Fechado ✓</button>"
            : "<span style='font-size:0.72rem;color:#34D399;font-weight:700;'>✓ Contrato Ativo no Caixa</span>";

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
     BLOCO 4: Aba 03 • Aplicativos Mobile & Desktop (Telas Reais Interativas)
     Data/Hora: 02/11/2026 01:35
     Finalidade: Exibir os aplicativos reais (Órion, Hub Mobile e Pastas na
     Barra Windows 11) em um mockup clicável e intuitivo.
     ------------------------------------------------------------------------ */
  function initAppsDemo() {
    const screenImg = document.getElementById("appMockupImg");
    const appTitle = document.getElementById("appActiveTitle");
    const appDesc = document.getElementById("appActiveDesc");
    const appLog = document.getElementById("appInteractiveResponse");
    const dockBtns = document.querySelectorAll("[data-app-screen]");
    const promptBtns = document.querySelectorAll("[data-app-prompt]");

    const SCREENS = {
      orionHome: {
        img: "assets/img/orion-home.png",
        title: "Órion • Super App Mobile com IA Soberana",
        desc: "Desenvolvido em React Native + Expo com backend Python FastAPI. Zero dados falsos, memória inteligente e cofre criptografado."
      },
      orionCapabilities: {
        img: "assets/img/orion-faz.png",
        title: "Órion • Automação de Rotina, Voz & Documentos",
        desc: "Transcreve reuniões, consulta documentos reais via RAG e executa tarefas com 46 testes automatizados garantindo estabilidade."
      },
      hubMobile: {
        img: "assets/img/hub-rotina.png",
        title: "Hub Corporativo • Gestão de Equipe na Palma da Mão",
        desc: "Checklists diários, rituais de equipe e metas operacionais acessíveis pelo celular ou computador sem travamentos."
      },
      winDesktop: {
        img: "assets/img/pastas-barra-1.png",
        title: "Pastas na Barra • Aplicativo Nativo Windows 11 (C#/WPF)",
        desc: "Programa ultraleve para Windows que organiza aplicativos em pastas flutuantes estilo celular direto na barra de tarefas."
      }
    };

    dockBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const key = btn.getAttribute("data-app-screen");
        const info = SCREENS[key];
        if (!info) return;
        if (NS.sfx) NS.sfx.click();
        dockBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        if (screenImg) screenImg.src = info.img;
        if (appTitle) appTitle.textContent = info.title;
        if (appDesc) appDesc.textContent = info.desc;
      });
    });

    promptBtns.forEach(function (pBtn) {
      pBtn.addEventListener("click", function () {
        const msg = pBtn.getAttribute("data-app-prompt");
        if (NS.sfx) NS.sfx.success();
        if (appLog) appLog.textContent = msg;
      });
    });
  }

  /* ------------------------------------------------------------------------
     BLOCO 5: Aba 05 • Simulador Executivo de Tráfego Pago & ROAS
     Data/Hora: 02/11/2026 01:35
     Finalidade: Permitir simular cenários de investimento em Meta, Google e
     TikTok Ads com curva visual imediata.
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

    let mode = "leads"; // "leads" | "ecom"

    function updateSim() {
      const invest = parseInt(slider.value, 10) || 5000;
      if (budgetVal) budgetVal.textContent = "R$ " + invest.toLocaleString("pt-BR") + "/mês";

      if (mode === "leads") {
        // Baseado em CPL histórico real R$ 3,20 - R$ 4,20 em campanhas locais/serviços
        const estLeads = Math.round(invest / 3.8);
        const estSales = Math.max(1, Math.round(estLeads * 0.08));
        const estReturn = estSales * 650;
        if (outLeads) outLeads.textContent = estLeads.toLocaleString("pt-BR") + " leads";
        if (outCpl) outCpl.textContent = "R$ 3,80 méd.";
        if (outRev) outRev.textContent = "R$ " + estReturn.toLocaleString("pt-BR");
      } else {
        // Baseado em ROAS histórico real 4,2x - 4,65x em e-commerce
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
    initSitesDemo();
    initCrmDemo();
    initAppsDemo();
    initTrafficSimulator();
  });
})();
