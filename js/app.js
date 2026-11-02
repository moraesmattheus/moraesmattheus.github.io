/* ==========================================================================
   Arquivo: js/app.js
   Data/Hora: 02/11/2026 10:52
   O que é: Controlador principal V4 da experiência interativa, comercial e
   multilíngue do portfólio de Mattheus Moraes.
   O que foi feito e finalidade de cada bloco:
     1. Preloader Minimalista e Sistema de Notificações (Toasts).
     2. Vitrine Editorial Estilo Dopamine Studio: Alterna entre os 6 projetos
        principais nos 3 idiomas, com botão circular magnético (↗) que abre a
        experiência interativa funcionando ao vivo.
     3. Catálogo Expansível dos 18 Projetos + Modal com Mini-App Interativo:
        Mantém a página compacta e garante que qualquer um dos 18 projetos tenha
        um widget clicável funcionando dentro do modal.
     4. Barra de Busca Animada Expansível (CodeByGaurav): Lupa com giro 360°,
        expansão elástica, botão limpar (X), tags de sugestão e resultados vivos.
     5. Abas Executivas Compactas (#sobre), Scroll-Spy em Neon para o Menu e
        Concierge Comercial Trilingue (PT / EN / ES).
   ========================================================================== */

(function () {
  "use strict";

  const NS = (window.MattheusPortfolio = window.MattheusPortfolio || {});

  /* ------------------------------------------------------------------------
     BLOCO 1: Preloader Minimalista de Estúdio & Utilitário de Toast
     Data/Hora: 02/11/2026 10:52
     ------------------------------------------------------------------------ */
  function initPreloader() {
    const preloader = document.getElementById("studioPreloader");
    const bar = document.getElementById("preloaderBarFill");
    if (!preloader) return;

    requestAnimationFrame(function () {
      if (bar) bar.style.width = "100%";
    });

    function dismiss() {
      preloader.classList.add("is-done");
    }

    setTimeout(dismiss, 480);
    window.addEventListener("load", function () {
      setTimeout(dismiss, 320);
    });
  }

  NS.showToast = function (text) {
    const wrap = document.getElementById("toastContainer");
    if (!wrap) return;
    const item = document.createElement("div");
    item.className = "toast-msg";
    item.textContent = text;
    wrap.appendChild(item);
    setTimeout(function () {
      item.style.opacity = "0";
      item.style.transition = "opacity 0.25s ease";
      setTimeout(function () { item.remove(); }, 260);
    }, 3200);
  };

  /* ------------------------------------------------------------------------
     BLOCO 2: Vitrine Editorial de Projetos Estilo Dopamine Studio
     Data/Hora: 02/11/2026 10:52
     Finalidade: Exibir os cases principais com 3 tags luminosas, título
     monumental, punchline em caixa alta e botão circular magnético (↗).
     ------------------------------------------------------------------------ */
  function initDopamineShowcase() {
    const pillsWrap = document.getElementById("dopamineCasePills");
    const tagsEl = document.getElementById("dopamineTagsRow");
    const titleEl = document.getElementById("dopamineCaseTitle");
    const punchEl = document.getElementById("dopamineCasePunch");
    const descEl = document.getElementById("dopamineCaseDesc");
    const imgEl = document.getElementById("dopamineCaseImg");
    const mediaStage = document.getElementById("dopamineMediaStage");
    const circleCta = document.getElementById("dopamineCircleCta");
    const tryBtn = document.getElementById("dopamineTryLiveBtn");
    const dossierBtn = document.getElementById("dopamineOpenDossierBtn");
    const prevBtn = document.getElementById("dopaminePrevBtn");
    const nextBtn = document.getElementById("dopamineNextBtn");

    if (!pillsWrap || !NS.DOPAMINE_CASES || !NS.DOPAMINE_CASES.length) return;

    let currentIdx = 0;

    function renderDopamineCase() {
      const cases = NS.DOPAMINE_CASES;
      const item = cases[currentIdx] || cases[0];
      const lang = NS.currentLang || "pt";
      const copy = item[lang] || item.pt;

      pillsWrap.innerHTML = cases.map(function (c, i) {
        return (
          "<button type='button' class='dopamine-case-pill " + (i === currentIdx ? "active" : "") + "' data-dopa-idx='" + i + "'>" +
            c.shortLabel +
          "</button>"
        );
      }).join("");

      if (tagsEl) {
        tagsEl.innerHTML = copy.tags.map(function (tg) {
          return "<span class='dopamine-pill-tag'>" + tg + "</span>";
        }).join("");
      }
      if (titleEl) titleEl.textContent = copy.title;
      if (punchEl) punchEl.textContent = copy.punch;
      if (descEl) descEl.textContent = copy.desc;
      if (imgEl) {
        imgEl.src = item.image;
        imgEl.alt = copy.title;
      }
      if (mediaStage) {
        mediaStage.style.setProperty("--case-aura", item.aura);
      }

      pillsWrap.querySelectorAll("[data-dopa-idx]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentIdx = parseInt(btn.getAttribute("data-dopa-idx"), 10) || 0;
          if (NS.sfx) NS.sfx.click();
          renderDopamineCase();
        });
      });
    }

    function launchCurrentCaseLive() {
      const item = NS.DOPAMINE_CASES[currentIdx];
      if (!item) return;
      if (NS.sfx) NS.sfx.click();
      if (typeof NS.jumpToLiveDemo === "function") {
        NS.jumpToLiveDemo(item.studioTarget, item.id);
      }
    }

    if (mediaStage) {
      mediaStage.addEventListener("click", launchCurrentCaseLive);

      /* Efeito magnético no botão circular ↗ estilo Dopamine Studio */
      mediaStage.addEventListener("pointermove", function (e) {
        if (!circleCta) return;
        const r = mediaStage.getBoundingClientRect();
        const dx = ((e.clientX - r.left) / r.width - 0.5) * 34;
        const dy = ((e.clientY - r.top) / r.height - 0.5) * 28;
        circleCta.style.transform = "translate3d(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px,0) scale(1.08)";
      });

      mediaStage.addEventListener("pointerleave", function () {
        if (circleCta) circleCta.style.transform = "";
      });
    }

    if (tryBtn) tryBtn.addEventListener("click", launchCurrentCaseLive);

    if (dossierBtn) {
      dossierBtn.addEventListener("click", function () {
        const item = NS.DOPAMINE_CASES[currentIdx];
        if (item && typeof NS.openProjectModal === "function") {
          NS.openProjectModal(item.id);
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        currentIdx = (currentIdx - 1 + NS.DOPAMINE_CASES.length) % NS.DOPAMINE_CASES.length;
        if (NS.sfx) NS.sfx.click();
        renderDopamineCase();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        currentIdx = (currentIdx + 1) % NS.DOPAMINE_CASES.length;
        if (NS.sfx) NS.sfx.click();
        renderDopamineCase();
      });
    }

    window.addEventListener("mattheus:langchange", renderDopamineCase);
    renderDopamineCase();
  }

  /* ------------------------------------------------------------------------
     BLOCO 3: Catálogo Completo dos 18 Projetos (Expansível Sob Demanda)
     Data/Hora: 02/11/2026 10:52
     ------------------------------------------------------------------------ */
  function initProjectsCatalog() {
    const grid = document.getElementById("projectsCatalogGrid");
    const searchInput = document.getElementById("catalogSearchInput");
    const filterBtns = document.querySelectorAll("[data-proj-filter]");
    const viewBtns = document.querySelectorAll("[data-view-mode]");
    const toggleBtn = document.getElementById("toggleAllProjectsBtn");
    const drawer = document.getElementById("catalogCollapsibleDrawer");

    if (!grid || !NS.PROJECTS) return;

    let activeCat = "all";
    let query = "";
    let isDrawerOpen = false;

    function syncToggleLabel() {
      if (!toggleBtn) return;
      toggleBtn.classList.toggle("is-open", isDrawerOpen);
      toggleBtn.textContent = isDrawerOpen
        ? NS.t("toggleAll18Open")
        : NS.t("toggleAll18Closed");
    }

    NS.openFullCatalogDrawer = function (initialSearch) {
      isDrawerOpen = true;
      if (drawer) drawer.classList.add("is-open");
      syncToggleLabel();
      if (typeof initialSearch === "string" && searchInput) {
        searchInput.value = initialSearch;
        query = initialSearch;
        renderProjects();
      }
    };

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener("click", function () {
        isDrawerOpen = !isDrawerOpen;
        if (NS.sfx) NS.sfx.click();
        drawer.classList.toggle("is-open", isDrawerOpen);
        syncToggleLabel();
      });
    }

    window.addEventListener("mattheus:langchange", syncToggleLabel);

    function renderProjects() {
      const q = query.trim().toLowerCase();
      const filtered = NS.PROJECTS.filter(function (p) {
        const matchCat = activeCat === "all" || p.category === activeCat;
        const matchText = !q ||
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.stack.join(" ").toLowerCase().includes(q);
        return matchCat && matchText;
      });

      if (filtered.length === 0) {
        grid.innerHTML =
          "<div style='grid-column:1/-1;padding:36px;text-align:center;border:1px solid var(--border-hairline);border-radius:18px;color:var(--text-muted);'>" +
            "Nenhum sistema encontrado para esse termo. Clique em 'Todos (18)' para restaurar o acervo." +
          "</div>";
        return;
      }

      grid.innerHTML = filtered.map(function (p) {
        return (
          "<article class='project-card' data-cursor='TESTAR / DOSSIÊ' data-project-id='" + p.id + "' tabindex='0' role='button' aria-label='Abrir " + p.title + "'>" +
            "<div class='project-card-body'>" +
              "<div class='project-card-head'>" +
                "<span class='project-num-code'>" + p.num + " / " + p.categoryLabel.toUpperCase() + "</span>" +
                "<span class='project-status-pill " + p.statusClass + "'>" + p.status + "</span>" +
              "</div>" +
              "<div><h3>" + p.title + "</h3></div>" +
              "<p>" + p.summary + "</p>" +
            "</div>" +
            "<div class='project-card-foot'>" +
              "<span class='project-stack-mini'>" + p.stack.slice(0, 3).join(" · ") + "</span>" +
              "<span class='project-open-cta'>Testar &rarr;</span>" +
            "</div>" +
          "</article>"
        );
      }).join("");

      const previewEl = document.getElementById("floatingProjPreview");
      const previewImg = document.getElementById("floatingProjPreviewImg");

      grid.querySelectorAll("[data-project-id]").forEach(function (card) {
        const pid = card.getAttribute("data-project-id");
        const projObj = NS.PROJECTS.find(function (item) { return item.id === pid; });

        card.addEventListener("click", function () {
          if (previewEl) previewEl.classList.remove("is-visible");
          NS.openProjectModal(pid);
        });
        card.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            NS.openProjectModal(pid);
          }
        });

        if (previewEl && previewImg && projObj && projObj.image && !projObj.image.endsWith(".svg")) {
          card.addEventListener("pointerenter", function () {
            previewImg.src = projObj.image;
            previewEl.classList.add("is-visible");
          });
          card.addEventListener("pointermove", function (ev) {
            previewEl.style.left = Math.min(window.innerWidth - 310, ev.clientX) + "px";
            previewEl.style.top = ev.clientY + "px";
          });
          card.addEventListener("pointerleave", function () {
            previewEl.classList.remove("is-visible");
          });
        }
      });
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCat = btn.getAttribute("data-proj-filter");
        if (NS.sfx) NS.sfx.click();
        filterBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        renderProjects();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        query = searchInput.value;
        renderProjects();
      });
    }

    viewBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const mode = btn.getAttribute("data-view-mode");
        if (NS.sfx) NS.sfx.click();
        viewBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        grid.classList.toggle("is-list-view", mode === "list");
      });
    });

    syncToggleLabel();
    renderProjects();
  }

  /* ------------------------------------------------------------------------
     BLOCO 4: Modal Deep-Dive com Mini-App Interativo Embutido em TODOS os 18
     Data/Hora: 02/11/2026 10:52
     Finalidade: Garantir que quando o visitante clicar em QUALQUER projeto,
     ele possa clicar e sentir o sistema funcionando imediatamente ali mesmo.
     ------------------------------------------------------------------------ */
  function mountModalInteractiveSandbox(container, proj) {
    if (!container) return;

    container.innerHTML =
      "<div style='display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px;'>" +
        "<span style='font-family:var(--font-mono);font-size:0.7rem;color:var(--neon-primary);text-transform:uppercase;letter-spacing:0.12em;'>&#9889; Experimente Agora · Mini-Simulador de " + proj.title + "</span>" +
        "<span style='font-family:var(--font-mono);font-size:0.68rem;color:#34D399;'>● Interativo Ao Vivo</span>" +
      "</div>" +
      "<div style='display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;'>" +
        "<button type='button' class='tag is-selected' data-modal-sim='act1'>Executar Fluxo Principal</button>" +
        "<button type='button' class='tag' data-modal-sim='act2'>Inspecionar Arquitetura & UI</button>" +
        "<button type='button' class='tag' data-modal-sim='act3'>Simular Resultado Real</button>" +
      "</div>" +
      "<div id='modalSimOutput' style='padding:12px 14px;border-radius:12px;background:#04060D;border:1px solid rgba(255,255,255,0.1);font-family:var(--font-mono);font-size:0.78rem;color:#E2E8F0;line-height:1.55;'>" +
        "Clique nos controles acima para testar uma ação real de <strong>" + proj.title + "</strong>." +
      "</div>";

    const out = container.querySelector("#modalSimOutput");
    const btns = container.querySelectorAll("[data-modal-sim]");

    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const action = btn.getAttribute("data-modal-sim");
        if (NS.sfx) NS.sfx.success();
        btns.forEach(function (b) { b.classList.toggle("is-selected", b === btn); });
        if (!out) return;

        if (action === "act1") {
          out.innerHTML = "&#10003; <strong>Fluxo executado em 16ms:</strong> " + (proj.uxHighlights && proj.uxHighlights[0] ? proj.uxHighlights[0] : proj.solution);
        } else if (action === "act2") {
          out.innerHTML = "&#10003; <strong>Stack ativa verificada:</strong> " + proj.stack.join(" · ");
        } else {
          out.innerHTML = "&#10003; <strong>Entrega validada (" + proj.status + "):</strong> " + proj.summary;
        }
      });
    });
  }

  NS.openProjectModal = function (projectId) {
    const modal = document.getElementById("projectDetailModal");
    const content = document.getElementById("projectModalContent");
    if (!modal || !content || !NS.PROJECTS) return;

    const proj = NS.PROJECTS.find(function (p) { return p.id === projectId; });
    if (!proj) return;
    if (NS.sfx) NS.sfx.click();

    let galleryHtml = "";
    if (proj.image && !proj.image.endsWith(".svg")) {
      const secondImg = proj.secondaryImage
        ? "<img src='" + proj.secondaryImage + "' alt='" + proj.title + " complementar' style='border-radius:14px;border:1px solid var(--border-subtle);max-height:280px;object-fit:contain;background:#05060A;padding:8px;width:100%;'>"
        : "";
      const cols = proj.secondaryImage ? "grid-template-columns:repeat(auto-fit,minmax(240px,1fr));" : "grid-template-columns:1fr;";
      galleryHtml =
        "<div style='display:grid;" + cols + "gap:14px;margin:18px 0;'>" +
          "<img src='" + proj.image + "' alt='" + proj.title + "' style='border-radius:14px;border:1px solid var(--border-subtle);max-height:280px;object-fit:contain;background:#05060A;padding:8px;width:100%;'>" +
          secondImg +
        "</div>";
    }

    const uxItems = (proj.uxHighlights || []).map(function (h) {
      return "<div class='modal-highlight-item'><i>&#10003;</i><span>" + h + "</span></div>";
    }).join("");

    const stackPills = (proj.stack || []).map(function (s) {
      return "<span class='modal-tech-tag'>" + s + "</span>";
    }).join("");

    const mappedStudio = proj.studioKey || (proj.category === "mobile" ? "apps" : proj.category === "growth" ? "crm" : "sites");

    let actionButtons =
      "<button type='button' class='pg-btn-gold' data-modal-jump-studio='" + mappedStudio + "'>" +
        "Abrir no Simulador Completo Ao Vivo &darr;" +
      "</button>";

    if (proj.liveUrl) {
      actionButtons +=
        "<a href='" + proj.liveUrl + "' target='_blank' rel='noopener noreferrer' class='pg-btn-outline'>" +
          "Abrir Produto em Produção &#8599;" +
        "</a>";
    }
    if (proj.repoUrl) {
      actionButtons +=
        "<a href='" + proj.repoUrl + "' target='_blank' rel='noopener noreferrer' class='pg-btn-outline'>" +
          "Ver Código no GitHub &#8599;" +
        "</a>";
    }
    actionButtons +=
      "<button type='button' class='pg-btn-outline' data-modal-request-quote='" + proj.title + "'>" +
        "Orçar Projeto Semelhante" +
      "</button>";

    content.innerHTML =
      "<div style='display:flex;align-items:center;gap:12px;flex-wrap:wrap;'>" +
        "<span class='project-num-code'>" + proj.num + " • " + proj.categoryLabel.toUpperCase() + "</span>" +
        "<span class='project-status-pill " + proj.statusClass + "'>" + proj.status + "</span>" +
      "</div>" +
      "<h2 style='font-family:var(--font-sans);font-weight:700;letter-spacing:-0.035em;font-size:clamp(1.6rem,3vw,2.25rem);margin-top:10px;color:#fff;'>" + proj.title + "</h2>" +
      "<p style='color:var(--accent-gold-light);font-size:0.94rem;margin-top:4px;'>" + proj.subtitle + "</p>" +
      "<div id='modalInteractiveMount' class='modal-interactive-box'></div>" +
      galleryHtml +
      "<div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;margin-top:16px;'>" +
        "<div style='padding:16px;border-radius:14px;background:rgba(255,255,255,0.025);border:1px solid var(--border-hairline);'>" +
          "<div style='font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:6px;'>01 • Problema & Gargalo Real</div>" +
          "<p style='font-size:0.86rem;color:var(--text-secondary);line-height:1.6;'>" + proj.problem + "</p>" +
        "</div>" +
        "<div style='padding:16px;border-radius:14px;background:var(--neon-soft);border:1px solid var(--border-gold);'>" +
          "<div style='font-family:var(--font-mono);font-size:0.68rem;color:var(--neon-text);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:6px;'>02 • Engenharia & Arquitetura</div>" +
          "<p style='font-size:0.86rem;color:var(--text-secondary);line-height:1.6;'>" + proj.solution + "</p>" +
        "</div>" +
      "</div>" +
      "<div style='margin-top:16px;'>" +
        "<div style='font-family:var(--font-mono);font-size:0.68rem;color:var(--neon-primary);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;'>03 • UI/UX & Valor Percebido</div>" +
        "<div class='modal-highlights'>" + uxItems + "</div>" +
      "</div>" +
      "<div style='margin-top:18px;'>" +
        "<div style='font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;'>Stack & Tecnologias</div>" +
        "<div class='modal-tech-tags'>" + stackPills + "</div>" +
      "</div>" +
      "<div class='modal-actions' style='display:flex;gap:10px;flex-wrap:wrap;margin-top:22px;'>" + actionButtons + "</div>";

    mountModalInteractiveSandbox(content.querySelector("#modalInteractiveMount"), proj);

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";

    const studioBtn = content.querySelector("[data-modal-jump-studio]");
    if (studioBtn) {
      studioBtn.addEventListener("click", function () {
        const key = studioBtn.getAttribute("data-modal-jump-studio");
        closeProjectModal();
        if (typeof NS.jumpToLiveDemo === "function") {
          NS.jumpToLiveDemo(key, proj.id);
        }
      });
    }

    const quoteBtn = content.querySelector("[data-modal-request-quote]");
    if (quoteBtn) {
      quoteBtn.addEventListener("click", function () {
        closeProjectModal();
        const msg = document.getElementById("conciergeMessage");
        if (msg) msg.value = "Gostei muito do projeto " + proj.title + " e quero conversar sobre uma solução semelhante.";
        const contactSec = document.getElementById("contato");
        if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  function closeProjectModal() {
    const modal = document.getElementById("projectDetailModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  /* ------------------------------------------------------------------------
     BLOCO 5: Barra de Busca Animada Expansível (CodeByGaurav + Resultados Vivos)
     Data/Hora: 02/11/2026 10:52
     Finalidade: Implementar exatamente a barra expansível enviada pelo usuário
     conectada aos projetos, serviços interativos e seções do site.
     ------------------------------------------------------------------------ */
  function initAnimatedSearchBar() {
    const backdrop = document.getElementById("cmdkModal");
    const openBtn = document.getElementById("openCmdkBtn");
    const closeModalBtn = document.getElementById("closeSearchModalBtn");
    const searchBox = document.getElementById("searchBox");
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearBtn");
    const tags = document.querySelectorAll("#searchModalSuggestions .tag");
    const resultsBox = document.getElementById("searchLiveResults");

    if (!backdrop || !searchBox || !searchBtn || !searchInput || !resultsBox) return;

    const QUICK_NAV = [
      { label: "Estúdio UI/UX & Sites (Grid 12 Colunas + WCAG)", badge: "Teste Ao Vivo", studio: "sites" },
      { label: "Simulador de CRM Comercial & Pipeline", badge: "Teste Ao Vivo", studio: "crm" },
      { label: "Aplicativos Funcionando (Órion IA, Windows 11, Hub)", badge: "Teste Ao Vivo", studio: "apps" },
      { label: "Exemplos Reais de Edição de Vídeos (.mp4 60fps)", badge: "Vídeos", studio: "video" },
      { label: "Calculadora de Tráfego Pago & ROAS", badge: "Ads & Growth", studio: "traffic" },
      { label: "Grafo Interativo de Carreira (54 Nós)", badge: "Seção", href: "#sobre" },
      { label: "Solicitar Orçamento no WhatsApp", badge: "Contato", href: "#contato" }
    ];

    function renderLiveMatches(rawTerm) {
      const term = (rawTerm || "").trim().toLowerCase();
      /* Mapeia termos das tags amigáveis para encontrar tudo perfeitamente */
      let normalized = term;
      if (term.includes("landing") || term.includes("ui/ux")) normalized = "web";
      else if (term.includes("crm")) normalized = "crm";
      else if (term.includes("aplicativos") || term.includes("apps")) normalized = "app";
      else if (term.includes("vídeo") || term.includes("video")) normalized = "video";
      else if (term.includes("tráfego") || term.includes("paid") || term.includes("tráfico")) normalized = "ads";

      const matchedNav = QUICK_NAV.filter(function (n) {
        return !term ||
          n.label.toLowerCase().includes(term) ||
          n.label.toLowerCase().includes(normalized) ||
          n.badge.toLowerCase().includes(normalized);
      });

      const matchedProjs = (NS.PROJECTS || []).filter(function (p) {
        return !term ||
          p.title.toLowerCase().includes(term) ||
          p.subtitle.toLowerCase().includes(term) ||
          p.categoryLabel.toLowerCase().includes(normalized) ||
          p.stack.join(" ").toLowerCase().includes(term);
      }).map(function (p) {
        return { label: p.num + " · " + p.title + " (" + p.categoryLabel + ")", badge: "Projeto", projectId: p.id };
      });

      const combined = matchedNav.concat(matchedProjs).slice(0, 10);
      if (!combined.length) {
        resultsBox.innerHTML = "<div style='font-size:0.82rem;color:#94a3b8;text-align:center;padding:12px;'>Nenhum resultado exato. Tente 'CRM', 'UI/UX', 'Vídeo' ou 'Python'.</div>";
        return;
      }

      resultsBox.innerHTML = combined.map(function (it, idx) {
        return (
          "<button type='button' class='search-result-row' data-sres-idx='" + idx + "'>" +
            "<span style='font-size:0.84rem;color:#F8FAFC;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>" + it.label + "</span>" +
            "<span style='font-family:var(--font-mono);font-size:0.66rem;color:var(--neon-primary);flex-shrink:0;'>" + it.badge + " &rarr;</span>" +
          "</button>"
        );
      }).join("");

      resultsBox.querySelectorAll("[data-sres-idx]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const item = combined[parseInt(btn.getAttribute("data-sres-idx"), 10)];
          closeSearchModal();
          if (!item) return;
          if (item.studio && typeof NS.jumpToLiveDemo === "function") {
            NS.jumpToLiveDemo(item.studio);
          } else if (item.projectId && typeof NS.openProjectModal === "function") {
            NS.openProjectModal(item.projectId);
          } else if (item.href) {
            const el = document.querySelector(item.href);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    }

    function openSearchModal() {
      if (NS.sfx) NS.sfx.click();
      backdrop.classList.add("is-open");
      document.body.style.overflow = "hidden";
      searchInput.value = "";
      if (clearBtn) clearBtn.style.display = "none";
      searchBox.classList.remove("active");
      renderLiveMatches("");
      /* Dispara a animação elástica de 60px -> 100% e giro 360° da lupa */
      setTimeout(function () {
        searchBox.classList.add("active");
        searchInput.focus();
      }, 60);
    }

    function closeSearchModal() {
      backdrop.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    if (openBtn) openBtn.addEventListener("click", openSearchModal);
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeSearchModal);

    searchBtn.addEventListener("click", function () {
      if (!searchBox.classList.contains("active")) {
        searchBox.classList.add("active");
        searchInput.focus();
      } else {
        renderLiveMatches(searchInput.value);
      }
    });

    searchInput.addEventListener("input", function () {
      if (clearBtn) {
        clearBtn.style.display = searchInput.value.length > 0 ? "flex" : "none";
      }
      renderLiveMatches(searchInput.value);
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        searchInput.value = "";
        clearBtn.style.display = "none";
        tags.forEach(function (t) { t.classList.remove("is-selected"); });
        renderLiveMatches("");
        searchInput.focus();
      });
    }

    tags.forEach(function (tag) {
      tag.addEventListener("click", function () {
        if (NS.sfx) NS.sfx.click();
        tags.forEach(function (t) { t.classList.toggle("is-selected", t === tag); });
        searchBox.classList.add("active");
        searchInput.value = tag.textContent;
        if (clearBtn) clearBtn.style.display = "flex";
        renderLiveMatches(tag.textContent);
        searchInput.focus();
      });
    });

    window.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === "Escape") {
        closeSearchModal();
        closeProjectModal();
      }
    });

    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) closeSearchModal();
    });
  }

  /* ------------------------------------------------------------------------
     BLOCO 6: Experiências, Abas Compactas (#sobre), Scroll-Spy Neon & Concierge
     Data/Hora: 02/11/2026 10:52
     ------------------------------------------------------------------------ */
  function initExperiencesAndTabs() {
    const stackEl = document.getElementById("experienceStack");
    if (stackEl && NS.EXPERIENCES) {
      stackEl.innerHTML = NS.EXPERIENCES.map(function (exp) {
        const lis = exp.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("");
        return (
          "<article class='exp-card'>" +
            "<div class='exp-top'>" +
              "<div>" +
                "<div class='exp-role'>" + exp.role + "</div>" +
                "<div class='exp-company'>" + exp.company + " <span style='color:var(--text-dim);font-weight:400;'>· " + exp.type + "</span></div>" +
              "</div>" +
              "<span class='exp-period'>" + exp.period + "</span>" +
            "</div>" +
            "<ul class='exp-bullets'>" + lis + "</ul>" +
          "</article>"
        );
      }).join("");
    }

    /* Abas compactas da seção #sobre (Grafo | Experiência | Métricas) */
    const execBtns = document.querySelectorAll("[data-exec-tab]");
    const execPanes = document.querySelectorAll("[data-exec-pane]");

    execBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const target = btn.getAttribute("data-exec-tab");
        if (NS.sfx) NS.sfx.click();
        execBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        execPanes.forEach(function (p) {
          p.classList.toggle("active", p.getAttribute("data-exec-pane") === target);
        });
        /* Recalcula dimensões do Canvas do Grafo caso volte para a aba Grafo */
        setTimeout(function () {
          window.dispatchEvent(new Event("resize"));
        }, 40);
      });
    });
  }

  function initNeonScrollSpyAndConcierge() {
    /* Relógio digital de Florianópolis na navbar */
    const clockEl = document.getElementById("liveFloripaClock");
    function updateClock() {
      if (!clockEl) return;
      try {
        const nowStr = new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(new Date());
        clockEl.textContent = "FLN · " + nowStr + " BRT";
      } catch (_) {
        clockEl.textContent = "FLN · BRT";
      }
    }
    updateClock();
    setInterval(updateClock, 1000);

    /* Som tátil opcional */
    const soundBtn = document.getElementById("soundToggleBtn");
    if (soundBtn && NS.sfx) {
      soundBtn.addEventListener("click", function () {
        const on = NS.sfx.toggle();
        soundBtn.classList.toggle("is-active", on);
        const label = soundBtn.querySelector("span");
        if (label) label.textContent = on ? "Som ON" : "Som";
      });
    }

    /* Menu Mobile */
    const mobToggle = document.getElementById("mobileMenuBtn");
    const mainNav = document.getElementById("mainNavLinks");
    if (mobToggle && mainNav) {
      mobToggle.addEventListener("click", function () {
        mainNav.classList.toggle("mobile-open");
      });
      mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mainNav.classList.remove("mobile-open");
        });
      });
    }

    /* Scroll-Spy: ilumina em Neon o item ativo no Menu Superior, Mobile e Pontos Laterais */
    const navLinks = document.querySelectorAll(".main-nav .nav-link");
    const dotLinks = document.querySelectorAll(".section-dots-nav .sec-dot-link");
    const trackedSections = ["topo", "obras", "projetos", "teste-ao-vivo", "sobre", "contato"];

    function highlightActiveSection(secId) {
      const targetHash = "#" + secId;
      navLinks.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === targetHash);
      });
      dotLinks.forEach(function (d) {
        d.classList.toggle("is-active", d.getAttribute("href") === targetHash);
      });
    }

    navLinks.forEach(function (a) {
      a.addEventListener("click", function () {
        const h = (a.getAttribute("href") || "").replace("#", "");
        if (h) highlightActiveSection(h);
      });
    });

    window.addEventListener("scroll", function () {
      const scrollMid = window.scrollY + window.innerHeight * 0.36;
      let current = "topo";
      trackedSections.forEach(function (id) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMid) {
          current = id;
        }
      });
      highlightActiveSection(current);
    }, { passive: true });

    highlightActiveSection("topo");

    /* Fechamento do Modal de Projetos */
    const projModal = document.getElementById("projectDetailModal");
    const closeBtn = document.getElementById("closeProjectModalBtn");
    if (closeBtn) closeBtn.addEventListener("click", closeProjectModal);
    if (projModal) {
      projModal.addEventListener("click", function (e) {
        if (e.target === projModal) closeProjectModal();
      });
    }

    /* Concierge Comercial Trilingue (PT / EN / ES) */
    let selectedTopic = "UI/UX & Site de Alto Padrão";
    const topicChips = document.querySelectorAll("[data-concierge-topic]");

    NS.selectConciergeTopic = function (topicName) {
      selectedTopic = topicName;
      topicChips.forEach(function (c) {
        c.classList.toggle("active", c.getAttribute("data-concierge-topic") === topicName);
      });
    };

    topicChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        selectedTopic = chip.textContent.trim() || chip.getAttribute("data-concierge-topic");
        if (NS.sfx) NS.sfx.click();
        topicChips.forEach(function (c) { c.classList.toggle("active", c === chip); });
      });
    });

    const waBtn = document.getElementById("conciergeSendWhatsapp");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        const name = (document.getElementById("conciergeName").value || "").trim();
        const note = (document.getElementById("conciergeMessage").value || "").trim();
        const lang = NS.currentLang || "pt";
        let body = "";
        if (lang === "en") {
          const intro = name ? "Hi Mattheus, I'm " + name + "." : "Hi Mattheus!";
          body = intro + " I explored your interactive portfolio and want to talk about: *" + selectedTopic + "*." + (note ? "\n\nContext: " + note : "");
        } else if (lang === "es") {
          const intro = name ? "Hola Mattheus, soy " + name + "." : "¡Hola Mattheus!";
          body = intro + " Vi tu portafolio interactivo y quiero conversar sobre: *" + selectedTopic + "*." + (note ? "\n\nContexto: " + note : "");
        } else {
          const intro = name ? "Olá Mattheus, me chamo " + name + "." : "Olá Mattheus!";
          body = intro + " Vi seu portfólio interativo e quero conversar sobre: *" + selectedTopic + "*." + (note ? "\n\nContexto: " + note : "");
        }
        const url = "https://wa.me/" + NS.PROFILE.whatsappNumber + "?text=" + encodeURIComponent(body);
        if (NS.sfx) NS.sfx.success();
        window.open(url, "_blank", "noopener");
      });
    }

    document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        navigator.clipboard.writeText(NS.PROFILE.email).then(function () {
          if (NS.sfx) NS.sfx.success();
          NS.showToast("E-mail copiado: " + NS.PROFILE.email);
        });
      });
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initPreloader();
    initDopamineShowcase();
    initProjectsCatalog();
    initAnimatedSearchBar();
    initExperiencesAndTabs();
    initNeonScrollSpyAndConcierge();
  });
})();
