/* ==========================================================================
   Arquivo: js/sandboxes.js
   Data/Hora: 02/11/2026 12:35
   O que é: Motor V6 das seções interativas limpas do portfólio de Mattheus
   Moraes (#sites, #sistemas e #videos), sem poluição visual e com sistemas
   funcionando na hora.
   O que foi feito e finalidade de cada bloco:
     1. Roteador Direto de Experiência (NS.jumpToLiveDemo): Conecta qualquer
        card do Vórtice 3D, Vitrine Dopamine, Modal ou Busca direto à seção e
        aba exata (#sites, #sistemas ou #videos).
     2. Galeria de Padrões de Sites & Personalizados (#sites): Exibe fotos reais
        dos sites desenvolvidos por Mattheus com alternância de tela, Grid 12
        colunas opcional e especificações técnicas autênticas.
     3. Laboratório Limpo de UI/UX, Jornada, Acessibilidade WCAG 2.2 AAA e Boas
        Práticas: 4 abas enxutas incluindo simulador ao vivo de Daltonismo,
        Alto Contraste AAA e Ordem de Foco por Teclado (Tab).
     4. Palco Direto de Sistemas & Apps (#sistemas): CRM Comercial completo,
        Super App Órion IA multi-abas, Desktop Windows 11 16:10 (Pastas na
        Barra) e EasyCode IDE + Radar ATS 0-100.
     5. Estúdio de Vídeos Reais (.mp4 60fps) + Calculadora de Escala Ads (#videos).
   ========================================================================== */

(function () {
  "use strict";

  const NS = (window.MattheusPortfolio = window.MattheusPortfolio || {});

  /* ------------------------------------------------------------------------
     BLOCO 1: Galeria de Referências de Padrões de Sites & Laboratório UI/UX
     Data/Hora: 02/11/2026 12:35
     Finalidade: Apresentar apenas como referência limpa os padrões de sites e
     sites personalizados desenvolvidos por Mattheus, mais os fundamentos de
     UI/UX, Jornada do Usuário, Acessibilidade e Performance.
     ------------------------------------------------------------------------ */
  function initSitePatternsAndUxLab() {
    const tabsWrap = document.getElementById("sitePatternsTabs");
    const urlText = document.getElementById("sitePatternUrlLabel");
    const swapBtn = document.getElementById("sitePatternSwapScreenBtn");
    const gridBtn = document.getElementById("sitePatternGridToggleBtn");
    const viewport = document.getElementById("sitePatternScreenViewport");
    const imgEl = document.getElementById("sitePatternImg");
    const badgeEl = document.getElementById("sitePatternBadge");
    const refNameEl = document.getElementById("sitePatternRefName");
    const idealEl = document.getElementById("sitePatternIdealFor");
    const uxSumEl = document.getElementById("sitePatternUxSummary");
    const techListEl = document.getElementById("sitePatternTechList");
    const liveLinkEl = document.getElementById("sitePatternLiveLink");
    const quoteBtn = document.getElementById("sitePatternQuoteBtn");

    if (!tabsWrap || !NS.SITE_PATTERNS || !NS.SITE_PATTERNS.length) return;

    let activeIdx = 0;
    let showingSecondary = false;
    let gridOverlayOn = false;

    function renderPatternTabs() {
      tabsWrap.innerHTML = NS.SITE_PATTERNS.map(function (pat, idx) {
        return (
          "<button type='button' role='tab' aria-selected='" + (idx === activeIdx ? "true" : "false") + "' " +
            "class='clean-neon-tab " + (idx === activeIdx ? "active" : "") + "' data-site-pat-idx='" + idx + "'>" +
            pat.tabLabel +
          "</button>"
        );
      }).join("");

      tabsWrap.querySelectorAll("[data-site-pat-idx]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const idx = parseInt(btn.getAttribute("data-site-pat-idx"), 10) || 0;
          if (NS.sfx) NS.sfx.click();
          NS.selectSitePattern(idx);
        });
      });
    }

    NS.selectSitePattern = function (idx) {
      if (!NS.SITE_PATTERNS[idx]) idx = 0;
      activeIdx = idx;
      showingSecondary = false;
      const pat = NS.SITE_PATTERNS[activeIdx];

      renderPatternTabs();

      if (imgEl) {
        imgEl.src = pat.primaryImg;
        imgEl.alt = pat.refName;
      }
      if (urlText) urlText.textContent = pat.refName;
      if (badgeEl) badgeEl.textContent = pat.badge;
      if (refNameEl) refNameEl.textContent = pat.refName;
      if (idealEl) idealEl.textContent = pat.idealFor;
      if (uxSumEl) uxSumEl.textContent = pat.uxSummary;

      if (techListEl) {
        techListEl.innerHTML = (pat.techSpecs || []).map(function (spec) {
          return "<li><i>&#10003;</i><span>" + spec + "</span></li>";
        }).join("");
      }

      if (swapBtn) {
        if (pat.secondaryImg) {
          swapBtn.style.display = "inline-flex";
          swapBtn.classList.remove("active");
          swapBtn.textContent = pat.secondaryLabel || "Alternar Tela";
        } else {
          swapBtn.style.display = "none";
        }
      }

      if (liveLinkEl) {
        if (pat.liveUrl) {
          liveLinkEl.style.display = "inline-flex";
          liveLinkEl.href = pat.liveUrl;
        } else {
          liveLinkEl.style.display = "none";
        }
      }
    };

    if (swapBtn && imgEl) {
      swapBtn.addEventListener("click", function () {
        const pat = NS.SITE_PATTERNS[activeIdx];
        if (!pat || !pat.secondaryImg) return;
        showingSecondary = !showingSecondary;
        if (NS.sfx) NS.sfx.click();
        swapBtn.classList.toggle("active", showingSecondary);
        imgEl.src = showingSecondary ? pat.secondaryImg : pat.primaryImg;
      });
    }

    if (gridBtn && viewport) {
      gridBtn.addEventListener("click", function () {
        gridOverlayOn = !gridOverlayOn;
        if (NS.sfx) NS.sfx.click();
        gridBtn.classList.toggle("active", gridOverlayOn);
        viewport.classList.toggle("show-grid", gridOverlayOn);
      });
    }

    if (quoteBtn) {
      quoteBtn.addEventListener("click", function () {
        const pat = NS.SITE_PATTERNS[activeIdx];
        if (pat && typeof NS.selectConciergeTopic === "function") {
          NS.selectConciergeTopic("UI/UX & Site de Alto Padrão");
          const msg = document.getElementById("conciergeMessage");
          if (msg) {
            msg.value = "Quero desenvolver um site seguindo a referência: " + pat.tabLabel + " (" + pat.refName + ").";
          }
        }
        const contactSec = document.getElementById("contato");
        if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
      });
    }

    NS.selectSitePattern(0);

    /* Abas Limpas do Laboratório UI/UX, Jornada, Acessibilidade & Boas Práticas */
    const uxlabBtns = document.querySelectorAll("[data-uxlab-tab]");
    const uxlabPanes = document.querySelectorAll("[data-uxlab-pane]");

    uxlabBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const target = btn.getAttribute("data-uxlab-tab");
        if (NS.sfx) NS.sfx.click();
        uxlabBtns.forEach(function (b) {
          const active = b === btn;
          b.classList.toggle("active", active);
          b.setAttribute("aria-selected", active ? "true" : "false");
        });
        uxlabPanes.forEach(function (p) {
          p.classList.toggle("active", p.getAttribute("data-uxlab-pane") === target);
        });
      });
    });

    /* Alternador Tipográfico no painel 02 (UI, Grid & Motion) */
    const fontBtns = document.querySelectorAll("[data-ds-fontpair]");
    const typeHead = document.getElementById("dsLiveTypeHeading");
    const typeSub = document.getElementById("dsLiveTypeSub");

    fontBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const mode = btn.getAttribute("data-ds-fontpair");
        if (NS.sfx) NS.sfx.click();
        fontBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        if (!typeHead || !typeSub) return;
        if (mode === "editorial") {
          typeHead.style.fontFamily = "var(--font-serif)";
          typeHead.style.fontStyle = "italic";
          typeHead.textContent = "Estética Quiet Luxury que sustenta tickets altos.";
          typeSub.textContent = "Cormorant Garamond Italic + Plus Jakarta Sans (16px · line-height 1.65)";
        } else {
          typeHead.style.fontFamily = "var(--font-grotesk)";
          typeHead.style.fontStyle = "normal";
          typeHead.textContent = "Clareza SaaS e leitura tabular sem dança numérica.";
          typeSub.textContent = "Space Grotesk Bold (-0.03em) + JetBrains Mono (tabular-nums)";
        }
      });
    });

    /* Simulador Interativo de Acessibilidade WCAG 2.2 AAA (Painel 03) */
    const a11yBtns = document.querySelectorAll("[data-a11y-sim]");
    const a11yCard = document.getElementById("a11ySimCard");
    const a11yStatus = document.getElementById("a11ySimStatus");

    const A11Y_NOTES = {
      normal: "Modo Padrão: contraste 16.4:1 (WCAG AAA), alvos de toque >= 44x44px e hierarquia semântica clara.",
      deuteranopia: "Filtro Deuteranopia ativo: nenhum estado depende apenas de verde/vermelho (uso conjunto de ícone + rótulo + forma).",
      highcontrast: "Alto Contraste AAA (19.8:1): bordas brancas puras sobre #000000 para baixa visão e ambientes externos.",
      tabfocus: "Navegação por Teclado (Tab 1 -> 2 -> 3): anéis :focus-visible nítidos e ordem previsível sem armadilhas de foco."
    };

    a11yBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const sim = btn.getAttribute("data-a11y-sim") || "normal";
        if (NS.sfx) NS.sfx.click();
        a11yBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        if (a11yCard) {
          a11yCard.classList.remove("mode-deuteranopia", "mode-highcontrast", "mode-tabfocus");
          if (sim !== "normal") a11yCard.classList.add("mode-" + sim);
        }
        if (a11yStatus) a11yStatus.textContent = A11Y_NOTES[sim] || A11Y_NOTES.normal;
      });
    });
  }

  /* ------------------------------------------------------------------------
     BLOCO 2: Palco Direto de Sistemas & Aplicativos Funcionando (#sistemas)
     Data/Hora: 02/11/2026 12:35
     Finalidade: Permitir que o visitante use imediatamente 4 softwares reais
     (CRM Comercial, App Órion IA, Pastas Windows 11 e EasyCode IDE + ATS)
     sem cartões wireframe intermediários.
     ------------------------------------------------------------------------ */
  function initWorkingSystemsStage() {
    const sysTabs = document.querySelectorAll("[data-sys-tab]");
    const sysPanes = document.querySelectorAll("[data-sys-pane]");

    NS.selectSystemTab = function (tabKey) {
      const valid = ["crm", "orion", "win11", "ide"];
      const key = valid.indexOf(tabKey) >= 0 ? tabKey : "crm";

      sysTabs.forEach(function (b) {
        const active = b.getAttribute("data-sys-tab") === key;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", active ? "true" : "false");
      });

      sysPanes.forEach(function (p) {
        p.classList.toggle("active", p.getAttribute("data-sys-pane") === key);
      });
    };

    sysTabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (NS.sfx) NS.sfx.click();
        NS.selectSystemTab(btn.getAttribute("data-sys-tab"));
      });
    });

    /* 2.1 Sistema CRM Comercial & Fluxo de Caixa */
    const colNew = document.getElementById("crmColNew");
    const colNeg = document.getElementById("crmColNeg");
    const colWon = document.getElementById("crmColWon");
    const revEl = document.getElementById("crmKpiRevenue");
    const openEl = document.getElementById("crmKpiOpen");
    const inactEl = document.getElementById("crmKpiInactive");
    const leadNameInput = document.getElementById("crmLeadNameInput");
    const addLeadBtn = document.getElementById("crmAddLeadBtn");
    const reactivateBtn = document.getElementById("crmReactivateBtn");

    if (colNew && colNeg && colWon) {
      let baseRevenue = 48900;
      let inactiveCount = 5;
      let nextId = 5;

      const leads = [
        { id: 1, name: "Clínica Estética Lumina", service: "Site UI/UX + Ads", value: 5200, stage: "new" },
        { id: 2, name: "Construtora Horizonte", service: "CRM Sob Medida", value: 8900, stage: "new" },
        { id: 3, name: "Rede Automotiva Sul", service: "Portal + BI", value: 7400, stage: "neg" },
        { id: 4, name: "E-commerce Moda Prime", service: "Vídeos 60fps + Ads", value: 5800, stage: "won" }
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
              ? "<button type='button' class='crm-move-btn' data-advance-id='" + l.id + "'>Aprovar &amp; Lançar no Caixa &#10003;</button>"
              : "<span style='font-size:0.72rem;color:#34D399;font-weight:700;'>&#10003; Receita Confirmada</span>";

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
        colNeg.innerHTML = stages.neg.map(cardHtml).join("");
        colWon.innerHTML = stages.won.map(cardHtml).join("");

        const cNew = document.getElementById("crmCountNew");
        const cNeg = document.getElementById("crmCountNeg");
        const cWon = document.getElementById("crmCountWon");
        if (cNew) cNew.textContent = String(stages.new.length);
        if (cNeg) cNeg.textContent = String(stages.neg.length);
        if (cWon) cWon.textContent = String(stages.won.length);

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
              if (NS.showToast) NS.showToast("Venda fechada! +" + formatBRL(item.value) + " lançados no caixa.");
            }
            renderCrm();
          });
        });
      }

      if (addLeadBtn) {
        const presets = [
          { name: "Imobiliária Alto Padrão", service: "Site Quiet Luxury", value: 7800 },
          { name: "SaaS FinTech Brasil", service: "UI/UX + App", value: 11200 },
          { name: "Grupo Odonto VIP", service: "CRM + WhatsApp", value: 6400 }
        ];
        addLeadBtn.addEventListener("click", function () {
          const customName = leadNameInput ? leadNameInput.value.trim() : "";
          const pick = presets[nextId % presets.length];
          leads.unshift({
            id: nextId++,
            name: customName || pick.name,
            service: customName ? "Escopo Personalizado" : pick.service,
            value: pick.value,
            stage: "new"
          });
          if (leadNameInput) leadNameInput.value = "";
          if (NS.sfx) NS.sfx.click();
          if (NS.showToast) NS.showToast("Novo lead adicionado na coluna 1 do CRM!");
          renderCrm();
        });
      }

      if (reactivateBtn) {
        reactivateBtn.addEventListener("click", function () {
          if (inactiveCount <= 0) {
            if (NS.showToast) NS.showToast("Todos os clientes inativos já foram recuperados!");
            return;
          }
          inactiveCount = Math.max(0, inactiveCount - 2);
          baseRevenue += 2400;
          if (NS.sfx) NS.sfx.success();
          if (NS.showToast) NS.showToast("Disparo WhatsApp: 2 clientes reativados (+R$ 2.400)!");
          renderCrm();
        });
      }

      renderCrm();
    }

    /* 2.2 Super App Órion IA (Smartphone Funcionando com 3 Abas Internas) */
    const orionBody = document.getElementById("orionPhoneBody");
    const orionNavBtns = document.querySelectorAll("[data-orion-subtab]");
    const orionQuickBtns = document.querySelectorAll("[data-orion-quick]");

    if (orionBody) {
      let orionSub = "tasks";
      let vaultUnlocked = false;
      const orionTasks = [
        { id: 1, text: "Sincronizar 3 reuniões e pauta da tarde", done: true },
        { id: 2, text: "Indexar ata de voz no banco vetorial RAG", done: true },
        { id: 3, text: "Rodar suíte Pytest (46 testes backend)", done: false },
        { id: 4, text: "Auditar chaves no cofre local DPAPI", done: false }
      ];
      const orionChat = [
        { from: "bot", msg: "Órion online. Zero dados falsos: respondo apenas com base nos seus arquivos e agenda real." }
      ];

      function renderOrionPhone() {
        orionNavBtns.forEach(function (b) {
          b.classList.toggle("active", b.getAttribute("data-orion-subtab") === orionSub);
        });

        if (orionSub === "tasks") {
          const doneCount = orionTasks.filter(function (t) { return t.done; }).length;
          orionBody.innerHTML =
            "<div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;'>" +
              "<strong style='font-size:0.84rem;color:#FFFFFF;'>Rotina &amp; Foco Hoje</strong>" +
              "<span style='font-family:var(--font-mono);font-size:0.68rem;color:#34D399;'>" + doneCount + "/" + orionTasks.length + " concluídas</span>" +
            "</div>" +
            orionTasks.map(function (t) {
              return (
                "<button type='button' class='app-task-row " + (t.done ? "is-done" : "") + "' data-orion-task='" + t.id + "'>" +
                  "<span class='app-task-check'>" + (t.done ? "&#10003;" : "") + "</span>" +
                  "<span>" + t.text + "</span>" +
                "</button>"
              );
            }).join("") +
            "<form id='orionAddTaskForm' style='display:flex;gap:6px;margin-top:auto;padding-top:8px;'>" +
              "<input id='orionNewTaskInput' type='text' placeholder='Nova tarefa no Órion...' style='flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:99px;padding:7px 12px;font-size:0.74rem;color:#fff;outline:none;'>" +
              "<button type='submit' style='padding:7px 12px;border-radius:99px;background:var(--neon-primary);color:#040711;font-size:0.72rem;font-weight:800;'>+ Criar</button>" +
            "</form>";

          orionBody.querySelectorAll("[data-orion-task]").forEach(function (row) {
            row.addEventListener("click", function () {
              const id = parseInt(row.getAttribute("data-orion-task"), 10);
              const item = orionTasks.find(function (x) { return x.id === id; });
              if (item) item.done = !item.done;
              if (NS.sfx) NS.sfx.click();
              renderOrionPhone();
            });
          });

          const taskForm = orionBody.querySelector("#orionAddTaskForm");
          if (taskForm) {
            taskForm.addEventListener("submit", function (e) {
              e.preventDefault();
              const inp = orionBody.querySelector("#orionNewTaskInput");
              const val = inp ? inp.value.trim() : "";
              if (!val) return;
              orionTasks.push({ id: Date.now(), text: val, done: false });
              if (NS.sfx) NS.sfx.success();
              renderOrionPhone();
            });
          }
        } else if (orionSub === "chat") {
          orionBody.innerHTML =
            "<div id='orionChatScroll' class='app-chat-log' style='max-height:265px;flex:1;'>" +
              orionChat.map(function (c) {
                return "<div class='app-chat-bubble " + c.from + "'>" + c.msg + "</div>";
              }).join("") +
            "</div>" +
            "<form id='orionChatForm' style='display:flex;gap:6px;margin-top:8px;'>" +
              "<input id='orionChatInput' type='text' placeholder='Pergunte à IA RAG do Órion...' style='flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:99px;padding:7px 12px;font-size:0.74rem;color:#fff;outline:none;'>" +
              "<button type='submit' style='padding:7px 12px;border-radius:99px;background:var(--neon-primary);color:#040711;font-size:0.72rem;font-weight:800;'>Enviar</button>" +
            "</form>";

          const sc = orionBody.querySelector("#orionChatScroll");
          if (sc) sc.scrollTop = sc.scrollHeight;

          const chatForm = orionBody.querySelector("#orionChatForm");
          if (chatForm) {
            chatForm.addEventListener("submit", function (e) {
              e.preventDefault();
              const inp = orionBody.querySelector("#orionChatInput");
              const q = inp ? inp.value.trim() : "";
              if (!q) return;
              orionChat.push({ from: "user", msg: q });
              orionChat.push({
                from: "bot",
                msg: "Consulta RAG concluída em 38ms: encontrei 2 notas verificadas no seu DIARIO e atualizei sua agenda sem expor dados na nuvem."
              });
              if (NS.sfx) NS.sfx.success();
              renderOrionPhone();
            });
          }
        } else {
          orionBody.innerHTML =
            "<div style='display:flex;flex-direction:column;gap:10px;'>" +
              "<strong style='font-size:0.84rem;color:#FFFFFF;'>Cofre Criptografado Windows DPAPI</strong>" +
              "<p style='font-size:0.74rem;color:var(--text-secondary);line-height:1.45;'>Segredos nunca ficam em texto puro no código. Desbloqueie abaixo para inspecionar o mascaramento:</p>" +
              "<div style='padding:10px;border-radius:12px;background:#03050B;border:1px solid rgba(255,255,255,0.08);font-family:var(--font-mono);font-size:0.69rem;color:#CBD5E1;display:flex;flex-direction:column;gap:6px;'>" +
                "<div>GEMINI_KEY: <span style='color:var(--neon-primary);'>" + (vaultUnlocked ? "AIzaSy...9X2Q (DPAPI OK)" : "••••••••••••••••") + "</span></div>" +
                "<div>FASTAPI_JWT: <span style='color:#34D399;'>" + (vaultUnlocked ? "ed25519_local_verified" : "••••••••••••••••") + "</span></div>" +
                "<div>VAULT_PATH: <span>%LOCALAPPDATA%\\Orion\\vault.bin</span></div>" +
              "</div>" +
              "<button type='button' id='orionVaultToggleBtn' class='pg-btn-outline' style='padding:8px 12px;font-size:0.74rem;'>" +
                (vaultUnlocked ? "Bloquear Cofre DPAPI" : "Autenticar &amp; Verificar Chaves") +
              "</button>" +
            "</div>";

          const vBtn = orionBody.querySelector("#orionVaultToggleBtn");
          if (vBtn) {
            vBtn.addEventListener("click", function () {
              vaultUnlocked = !vaultUnlocked;
              if (NS.sfx) NS.sfx.click();
              renderOrionPhone();
            });
          }
        }
      }

      orionNavBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          orionSub = btn.getAttribute("data-orion-subtab") || "tasks";
          if (NS.sfx) NS.sfx.click();
          renderOrionPhone();
        });
      });

      orionQuickBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          const promptText = btn.getAttribute("data-orion-quick") || "";
          orionSub = "chat";
          orionChat.push({ from: "user", msg: btn.textContent.trim() });
          orionChat.push({ from: "bot", msg: promptText });
          if (NS.sfx) NS.sfx.success();
          renderOrionPhone();
        });
      });

      renderOrionPhone();
    }

    /* 2.3 Desktop Windows 11 Nativo (Pastas na Barra C# / .NET WPF) */
    const winPopup = document.getElementById("win11FolderPopup");
    const winFolderBtns = document.querySelectorAll("[data-win11-folder]");
    const winActiveLabel = document.getElementById("win11ActiveAppLabel");

    const WIN_FOLDERS = {
      dev: [
        { icon: "⚡", name: "VS Code", status: "Workspace: portfolio-v6 aberto em 60fps" },
        { icon: "🐍", name: "FastAPI Server", status: "API Python rodando em 127.0.0.1:8000" },
        { icon: "🗄️", name: "SQLite / KV", status: "Banco local sincronizado sem latência" },
        { icon: "🧪", name: "Pytest 46/46", status: "Todos os 46 testes automatizados verdes" },
        { icon: "🐙", name: "GitHub CLI", status: "Branch main atualizada e verificada" },
        { icon: "🔐", name: "DPAPI Vault", status: "Cofre criptografado ativo no Windows 11" }
      ],
      video: [
        { icon: "🎬", name: "DaVinci Resolve", status: "Timeline 1080p 60fps · Color Grading ativo" },
        { icon: "🎙️", name: "Whisper GPU", status: "Legendas cinéticas geradas via CUDA" },
        { icon: "🔊", name: "Loudness -14", status: "Masterização broadcast em -14.0 LUFS" },
        { icon: "✨", name: "Motion 3D VFX", status: "Câmera 3D e partículas renderizadas" },
        { icon: "✂️", name: "Auto-Cut IA", status: "Pausas de respiração removidas em lote" },
        { icon: "📦", name: "Render H.264", status: "Exportação limpa para Reels e Ads" }
      ],
      growth: [
        { icon: "📈", name: "Meta Ads", status: "CTR auditado em 6,20% · ROAS 4,65x" },
        { icon: "🎯", name: "Google Ads", status: "Motor Z-Score monitorando CPC R$ 0,11" },
        { icon: "🏷️", name: "GTM DataLayer", status: "Eventos de conversão e GCLID ativos" },
        { icon: "💬", name: "WhatsApp 120s", status: "Recuperação automática de leads ligada" },
        { icon: "📊", name: "Hub BI HOM", status: "5 canais consolidados em tempo real" },
        { icon: "🧭", name: "SEO Console", status: "1º lugar orgânico monitorado" }
      ]
    };

    if (winPopup) {
      let curFolder = "dev";

      function renderWin11Folder() {
        const items = WIN_FOLDERS[curFolder] || WIN_FOLDERS.dev;
        winFolderBtns.forEach(function (b) {
          b.classList.toggle("active", b.getAttribute("data-win11-folder") === curFolder);
        });

        winPopup.innerHTML = items.map(function (app, i) {
          return (
            "<button type='button' class='win11-app-tile' data-win-app-idx='" + i + "'>" +
              "<span style='font-size:1.25rem;'>" + app.icon + "</span>" +
              "<strong>" + app.name + "</strong>" +
            "</button>"
          );
        }).join("");

        winPopup.querySelectorAll("[data-win-app-idx]").forEach(function (tile) {
          tile.addEventListener("click", function () {
            const app = items[parseInt(tile.getAttribute("data-win-app-idx"), 10)];
            if (!app) return;
            if (NS.sfx) NS.sfx.success();
            if (winActiveLabel) {
              winActiveLabel.textContent = app.icon + " " + app.name + " · " + app.status;
            }
          });
        });
      }

      winFolderBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          curFolder = btn.getAttribute("data-win11-folder") || "dev";
          if (NS.sfx) NS.sfx.click();
          renderWin11Folder();
        });
      });

      renderWin11Folder();
    }

    /* 2.4 EasyCode IDE (Python / JS / SQL) + Radar ATS 0-100 */
    const codeArea = document.getElementById("easyCodeInput");
    const outBox = document.getElementById("easyCodeOutput");
    const runBtn = document.getElementById("easyRunBtn");
    const langBtns = document.querySelectorAll("[data-easy-lang]");
    const xpBadge = document.getElementById("easyXpCount");
    let xp = 120;
    let activeLang = "python";

    const SNIPPETS = {
      python: "# Python no navegador (EasyCode WebAssembly)\nvendas = [4200, 6800, 9500]\ntotal = sum(vendas)\nprint(f'Receita acumulada: R$ {total}')\nprint('ROAS auditado: 4.65x')",
      js: "// JavaScript executado em tempo real\nconst leads = 608;\nconst cpl = 3.25;\nconsole.log('Leads/mês:', leads);\nconsole.log('Investimento otimizado: R$ ' + (leads * cpl).toFixed(2));",
      sql: "-- Consulta SQL de clientes alto ticket\nSELECT cliente, canal, ticket\nFROM pipeline_crm\nWHERE status = 'FECHADO'\nORDER BY ticket DESC;"
    };

    langBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeLang = btn.getAttribute("data-easy-lang") || "python";
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
            outBox.textContent = logs.join("\n") || "Executado em 4ms.";
          } catch (err) {
            outBox.textContent = "Erro de sintaxe: " + err.message;
          }
        } else if (activeLang === "python") {
          outBox.textContent = ">>> Receita acumulada: R$ 20500\n>>> ROAS auditado: 4.65x\n[Pyodide WebAssembly · 0ms rede · +25 XP]";
        } else {
          outBox.textContent = "cliente                 | canal    | ticket\n------------------------+----------+----------\nAcervo Quiet Luxury     | Orgânico | R$ 18.500\nHub Corporativo BI      | Direto   | R$ 14.200\n[SQL.js local · +25 XP]";
        }
      });
    }

    const atsSelect = document.getElementById("atsRoleSelect");
    const atsBtn = document.getElementById("atsAnalyzeBtn");
    const atsScore = document.getElementById("atsScoreReadout");
    const atsDetails = document.getElementById("atsMatchDetails");

    const ATS_SCENARIOS = {
      fullstack: {
        score: "96 / 100",
        detail: "Match Alto: Python (FastAPI), JavaScript/React Native, SQL, 46 testes automatizados e deploy Cloudflare/GitHub Actions."
      },
      uiux: {
        score: "98 / 100",
        detail: "Match Alto: Design System próprio, Liquid Glass CSS, Grid 12 colunas, acessibilidade WCAG 2.2 AAA e foco em conversão."
      },
      growth: {
        score: "95 / 100",
        detail: "Match Alto: ROAS 4,65x auditado, redução de CPC para R$ 0,11, GTM Data Layer, motor Z-Score e criativos em 60fps."
      }
    };

    if (atsBtn && atsSelect) {
      atsBtn.addEventListener("click", function () {
        const data = ATS_SCENARIOS[atsSelect.value] || ATS_SCENARIOS.fullstack;
        if (NS.sfx) NS.sfx.success();
        if (atsScore) atsScore.textContent = data.score;
        if (atsDetails) atsDetails.textContent = data.detail;
      });
    }
  }

  /* ------------------------------------------------------------------------
     BLOCO 3: Seção #videos (Player .MP4 Real 1080p/60fps + Simulador ROAS)
     Data/Hora: 02/11/2026 12:35
     ------------------------------------------------------------------------ */
  function initVideoAndTrafficSection() {
    const strip = document.getElementById("videoExamplesStrip");
    const realVid = document.getElementById("realEditedVideoEl");
    const muteBtn = document.getElementById("videoMuteToggleBtn");
    const canvasWrap = document.getElementById("beforeAfterCanvasWrap");
    const baControls = document.getElementById("beforeAfterControlsWrap");
    const vTitle = document.getElementById("videoExampleTitle");
    const vDesc = document.getElementById("videoExampleDesc");
    const vBadges = document.getElementById("videoExampleBadges");

    if (strip && NS.VIDEO_EXAMPLES) {
      let currentExIdx = 0;

      function renderVideoExample() {
        const list = NS.VIDEO_EXAMPLES;
        const lang = NS.currentLang || "pt";
        const item = list[currentExIdx] || list[0];
        const copy = item[lang] || item.pt;

        strip.innerHTML = list.map(function (ex, idx) {
          const c = ex[lang] || ex.pt;
          return (
            "<button type='button' role='tab' aria-selected='" + (idx === currentExIdx ? "true" : "false") + "' " +
              "class='clean-neon-tab " + (idx === currentExIdx ? "active" : "") + "' data-vid-ex='" + idx + "'>" +
              c.tab +
            "</button>"
          );
        }).join("");

        if (vTitle) vTitle.textContent = copy.title;
        if (vDesc) vDesc.textContent = copy.desc;
        if (vBadges) {
          vBadges.innerHTML = (copy.badges || []).map(function (b) {
            return "<span class='video-tech-chip'>" + b + "</span>";
          }).join("");
        }

        if (item.isCanvasCompare) {
          if (realVid) {
            realVid.pause();
            realVid.style.display = "none";
          }
          if (canvasWrap) canvasWrap.style.display = "block";
          if (baControls) baControls.style.display = "flex";
        } else {
          if (canvasWrap) canvasWrap.style.display = "none";
          if (baControls) baControls.style.display = "none";
          if (realVid) {
            realVid.style.display = "block";
            if (realVid.getAttribute("src") !== item.src) {
              realVid.setAttribute("src", item.src);
              realVid.load();
            }
            realVid.play().catch(function () {});
          }
        }

        strip.querySelectorAll("[data-vid-ex]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            currentExIdx = parseInt(btn.getAttribute("data-vid-ex"), 10) || 0;
            if (NS.sfx) NS.sfx.click();
            renderVideoExample();
          });
        });
      }

      if (muteBtn && realVid) {
        muteBtn.addEventListener("click", function () {
          realVid.muted = !realVid.muted;
          if (NS.sfx) NS.sfx.click();
          muteBtn.textContent = realVid.muted ? NS.t("videoSoundOff") : NS.t("videoSoundOn");
        });
      }

      /* Reproduz automaticamente quando a seção #videos entra na tela */
      if (realVid && "IntersectionObserver" in window) {
        const vObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting && realVid.style.display !== "none") {
              realVid.play().catch(function () {});
            } else if (!en.isIntersecting) {
              realVid.pause();
            }
          });
        }, { threshold: 0.15 });
        vObs.observe(realVid);
      }

      window.addEventListener("mattheus:langchange", renderVideoExample);
      renderVideoExample();
    }

    /* Simulador Enxuto de Escala em Tráfego Pago */
    const slider = document.getElementById("trafficBudgetSlider");
    const budgetLabel = document.getElementById("trafficBudgetDisplay");
    const modeBtns = document.querySelectorAll("[data-traffic-mode]");
    const outLeads = document.getElementById("trafficOutLeads");
    const outCpl = document.getElementById("trafficOutCpl");
    const outRev = document.getElementById("trafficOutRev");
    const poly = document.getElementById("trafficSimPolyline");

    if (slider) {
      let mode = "leads";

      function recalc() {
        const budget = parseInt(slider.value, 10) || 5000;
        if (budgetLabel) budgetLabel.textContent = "R$ " + budget.toLocaleString("pt-BR") + "/mês";

        if (mode === "leads") {
          const cpl = 3.8;
          const leads = Math.round(budget / cpl);
          const sales = Math.max(1, Math.round(leads * 0.08));
          const revenue = sales * 650;
          if (outLeads) outLeads.textContent = leads.toLocaleString("pt-BR") + " leads";
          if (outCpl) outCpl.textContent = "R$ 3,80 CPL méd.";
          if (outRev) outRev.textContent = "R$ " + revenue.toLocaleString("pt-BR");
        } else {
          const roas = 4.5;
          const revenue = Math.round(budget * roas);
          const orders = Math.max(1, Math.round(revenue / 260));
          if (outLeads) outLeads.textContent = orders.toLocaleString("pt-BR") + " pedidos";
          if (outCpl) outCpl.textContent = "4,5x ROAS méd.";
          if (outRev) outRev.textContent = "R$ " + revenue.toLocaleString("pt-BR");
        }

        if (poly) {
          const factor = Math.min(1, budget / 30000);
          const y4 = Math.round(92 - factor * 68);
          const y3 = Math.round(98 - factor * 48);
          const y2 = Math.round(104 - factor * 28);
          poly.setAttribute("points", "10,112 95," + y2 + " 185," + y3 + " 275," + Math.round((y3 + y4) / 2) + " 360," + y4);
        }
      }

      slider.addEventListener("input", recalc);
      modeBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          mode = btn.getAttribute("data-traffic-mode") || "leads";
          if (NS.sfx) NS.sfx.click();
          modeBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
          recalc();
        });
      });

      recalc();
    }
  }

  /* ------------------------------------------------------------------------
     BLOCO 4: Roteador Global NS.jumpToLiveDemo (Vórtice, Cases, Modais e Busca)
     Data/Hora: 02/11/2026 12:35
     ------------------------------------------------------------------------ */
  NS.jumpToLiveDemo = function (rawKey, projectId) {
    let targetSecId = "sistemas";

    if (rawKey === "sites" || projectId === "site-vania" || projectId === "hub-hom" || projectId === "vigia-ads" || projectId === "ui-lab-sos") {
      targetSecId = "sites";
      let patIdx = 0;
      if (projectId === "easycode" && rawKey === "sites") patIdx = 1;
      else if (projectId === "hub-hom") patIdx = 2;
      else if (projectId === "vigia-ads") patIdx = 3;
      else if (projectId === "ui-lab-sos") patIdx = 4;
      if (typeof NS.selectSitePattern === "function") NS.selectSitePattern(patIdx);
    } else if (rawKey === "video" || rawKey === "traffic" || projectId === "reels-studio") {
      targetSecId = "videos";
    } else {
      targetSecId = "sistemas";
      let sysKey = "crm";
      if (rawKey === "orion" || rawKey === "apps" || projectId === "orion" || projectId === "infnet-app") sysKey = "orion";
      if (rawKey === "win11" || projectId === "pastas-barra") sysKey = "win11";
      if (rawKey === "ide" || rawKey === "easycode" || projectId === "easycode" || projectId === "radar-vagas") sysKey = "ide";
      if (projectId === "crm-manu" || rawKey === "crm") sysKey = "crm";
      if (typeof NS.selectSystemTab === "function") NS.selectSystemTab(sysKey);
    }

    const sec = document.getElementById(targetSecId);
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  document.addEventListener("DOMContentLoaded", function () {
    initSitePatternsAndUxLab();
    initWorkingSystemsStage();
    initVideoAndTrafficSection();
  });
})();
