/* ==========================================================================
   Arquivo: js/app.js
   Data/Hora: 02/11/2026 12:37
   O que é: Controlador principal V6 da experiência limpa, acessível e
   multilíngue do portfólio de Mattheus Moraes.
   O que foi feito e finalidade de cada bloco:
     1. Preloader Minimalista, Utilitário de Toast e Helper de Fechamento Rápido
        de Modais (210ms .is-closing) para que janelas e busca fechem com fluidez.
     2. Vitrine Editorial Dopamine Studio: Exibe as fotos reais dos sites e apps
        com contador 01/06, abas limpas em Neon e botão circular magnético (↗).
     3. Gavetas Expansíveis Sob Demanda (18 Projetos + Grafo de Carreira 54 Nós):
        Elimina poluição visual mantendo 100% do acervo técnico a 1 clique.
     4. Barra de Busca Animada Autoral: Expansão elástica na abertura e
        retração rápida (180ms) com fade/scale no fechamento.
     5. Seletor Trilingue (PT/EN/ES), Scroll-Spy Neon Apenas nas Letras (1 ativo
        por vez com aria-current) e Concierge Comercial no WhatsApp.
   ========================================================================== */

(function () {
  "use strict";

  const NS = (window.MattheusPortfolio = window.MattheusPortfolio || {});

  /* ------------------------------------------------------------------------
     BLOCO 1: Preloader, Toast e Animação Rápida de Fechamento de Modais (210ms)
     Data/Hora: 02/11/2026 12:37
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

    setTimeout(dismiss, 420);
    window.addEventListener("load", function () {
      setTimeout(dismiss, 260);
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
      item.style.transition = "opacity 0.22s ease";
      setTimeout(function () { item.remove(); }, 240);
    }, 3000);
  };

  /* Fecha qualquer modal com animação rápida de 210ms em vez de corte seco */
  function closeModalFast(modalEl, onBeforeClose) {
    if (!modalEl || !modalEl.classList.contains("is-open") || modalEl.classList.contains("is-closing")) {
      return;
    }
    if (typeof onBeforeClose === "function") onBeforeClose();
    modalEl.classList.add("is-closing");
    setTimeout(function () {
      modalEl.classList.remove("is-open", "is-closing");
      if (!document.querySelector(".modal-backdrop.is-open")) {
        document.body.style.overflow = "";
      }
    }, 210);
  }

  /* ------------------------------------------------------------------------
     BLOCO 2: Vitrine Editorial Dopamine Studio (Com Fotos Reais dos Sites)
     Data/Hora: 02/11/2026 12:37
     ------------------------------------------------------------------------ */
  function initDopamineShowcase() {
    const pillsWrap = document.getElementById("dopamineCasePills");
    const counterEl = document.getElementById("dopamineCounterCurrent");
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

    if (!NS.DOPAMINE_CASES || !NS.DOPAMINE_CASES.length) return;

    let currentIdx = 0;

    function renderDopamineCase() {
      const cases = NS.DOPAMINE_CASES;
      const item = cases[currentIdx] || cases[0];
      const lang = NS.currentLang || "pt";
      const copy = item[lang] || item.pt;

      if (counterEl) {
        const curStr = String(currentIdx + 1).padStart(2, "0");
        const totStr = String(cases.length).padStart(2, "0");
        counterEl.textContent = curStr + " / " + totStr;
      }

      if (pillsWrap) {
        pillsWrap.innerHTML = cases.map(function (c, i) {
          const cp = c[lang] || c.pt;
          return (
            "<button type='button' role='tab' aria-selected='" + (i === currentIdx ? "true" : "false") + "' " +
              "class='clean-neon-tab " + (i === currentIdx ? "active" : "") + "' data-dopa-idx='" + i + "'>" +
              cp.title +
            "</button>"
          );
        }).join("");

        pillsWrap.querySelectorAll("[data-dopa-idx]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            currentIdx = parseInt(btn.getAttribute("data-dopa-idx"), 10) || 0;
            if (NS.sfx) NS.sfx.click();
            renderDopamineCase();
          });
        });
      }

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
        imgEl.alt = copy.title + " interface real";
      }
      if (mediaStage) {
        mediaStage.style.setProperty("--case-aura", item.aura);
      }
    }

    function openSelectedCaseTarget() {
      const item = NS.DOPAMINE_CASES[currentIdx];
      if (!item) return;
      if (NS.sfx) NS.sfx.click();
      if (item.targetSection === "#sites" && typeof NS.selectSitePattern === "function") {
        NS.selectSitePattern(item.sitePatternIdx || 0);
        const sec = document.getElementById("sites");
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
      } else if (item.targetSection === "#sistemas" && typeof NS.selectSystemTab === "function") {
        NS.selectSystemTab(item.sysTab || "crm");
        const sec = document.getElementById("sistemas");
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
      } else if (typeof NS.jumpToLiveDemo === "function") {
        NS.jumpToLiveDemo("sites", item.id);
      }
    }

    if (mediaStage) {
      mediaStage.addEventListener("click", openSelectedCaseTarget);

      mediaStage.addEventListener("pointermove", function (e) {
        if (!circleCta) return;
        const r = mediaStage.getBoundingClientRect();
        const dx = ((e.clientX - r.left) / r.width - 0.5) * 20;
        const dy = ((e.clientY - r.top) / r.height - 0.5) * 16;
        circleCta.style.transform = "translate3d(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px,0) scale(1.06)";
      });

      mediaStage.addEventListener("pointerleave", function () {
        if (circleCta) circleCta.style.transform = "";
      });
    }

    if (tryBtn) tryBtn.addEventListener("click", openSelectedCaseTarget);

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
     BLOCO 3: Gaveta Expansível dos 18 Projetos + Modal com Mini-App Embutido
     Data/Hora: 02/11/2026 12:37
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
      toggleBtn.setAttribute("aria-expanded", isDrawerOpen ? "true" : "false");
      toggleBtn.textContent = isDrawerOpen
        ? NS.t("toggleAll18Open")
        : NS.t("toggleAll18Closed");
    }

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
          "<div style='grid-column:1/-1;padding:32px;text-align:center;border:1px solid var(--border-hairline);border-radius:18px;color:var(--text-muted);'>" +
            "Nenhum projeto encontrado para esse termo. Clique em 'Todos (18)' para restaurar." +
          "</div>";
        return;
      }

      grid.innerHTML = filtered.map(function (p) {
        return (
          "<article class='project-card spotlight-card' data-project-id='" + p.id + "' tabindex='0' role='button' aria-label='Abrir ficha técnica de " + p.title + "'>" +
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
              "<span class='project-open-cta'>Ficha &rarr;</span>" +
            "</div>" +
          "</article>"
        );
      }).join("");

      grid.querySelectorAll("[data-project-id]").forEach(function (card) {
        const pid = card.getAttribute("data-project-id");
        card.addEventListener("click", function () {
          NS.openProjectModal(pid);
        });
        card.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            NS.openProjectModal(pid);
          }
        });
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

  /* Modal Deep-Dive com fechamento rápido em 210ms */
  function closeProjectModal() {
    const modal = document.getElementById("projectDetailModal");
    closeModalFast(modal);
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
        ? "<img src='" + proj.secondaryImage + "' alt='" + proj.title + " tela complementar' style='border-radius:14px;border:1px solid var(--border-subtle);max-height:270px;object-fit:cover;object-position:top center;background:#05060A;width:100%;'>"
        : "";
      const cols = proj.secondaryImage ? "grid-template-columns:repeat(auto-fit,minmax(240px,1fr));" : "grid-template-columns:1fr;";
      galleryHtml =
        "<div style='display:grid;" + cols + "gap:14px;margin:18px 0;'>" +
          "<img src='" + proj.image + "' alt='" + proj.title + "' style='border-radius:14px;border:1px solid var(--border-subtle);max-height:270px;object-fit:cover;object-position:top center;background:#05060A;width:100%;'>" +
          secondImg +
        "</div>";
    }

    const uxItems = (proj.uxHighlights || []).map(function (h) {
      return "<div class='modal-highlight-item'><i>&#10003;</i><span>" + h + "</span></div>";
    }).join("");

    const stackPills = (proj.stack || []).map(function (s) {
      return "<span class='modal-tech-tag'>" + s + "</span>";
    }).join("");

    let actionButtons =
      "<button type='button' class='pg-btn-gold' data-modal-jump-id='" + proj.id + "'>" +
        "Ver / Testar na Seção Interativa &darr;" +
      "</button>";

    if (proj.liveUrl) {
      actionButtons +=
        "<a href='" + proj.liveUrl + "' target='_blank' rel='noopener noreferrer' class='pg-btn-outline'>" +
          "Abrir em Produção &#8599;" +
        "</a>";
    }
    if (proj.repoUrl) {
      actionButtons +=
        "<a href='" + proj.repoUrl + "' target='_blank' rel='noopener noreferrer' class='pg-btn-outline'>" +
          "Código no GitHub &#8599;" +
        "</a>";
    }
    actionButtons +=
      "<button type='button' class='pg-btn-outline' data-modal-request-quote='" + proj.title + "'>" +
        "Solicitar Escopo Semelhante" +
      "</button>";

    content.innerHTML =
      "<div style='display:flex;align-items:center;gap:12px;flex-wrap:wrap;'>" +
        "<span class='project-num-code'>" + proj.num + " · " + proj.categoryLabel.toUpperCase() + "</span>" +
        "<span class='project-status-pill " + proj.statusClass + "'>" + proj.status + "</span>" +
      "</div>" +
      "<h2 style='font-family:var(--font-sans);font-weight:700;letter-spacing:-0.03em;font-size:clamp(1.5rem,2.8vw,2.15rem);margin-top:10px;color:#fff;'>" + proj.title + "</h2>" +
      "<p style='color:var(--neon-text);font-size:0.92rem;margin-top:4px;'>" + proj.subtitle + "</p>" +
      galleryHtml +
      "<div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:14px;'>" +
        "<div style='padding:16px;border-radius:14px;background:rgba(255,255,255,0.025);border:1px solid var(--border-hairline);'>" +
          "<div style='font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;'>01 · Contexto &amp; Desafio</div>" +
          "<p style='font-size:0.84rem;color:var(--text-secondary);line-height:1.58;'>" + proj.problem + "</p>" +
        "</div>" +
        "<div style='padding:16px;border-radius:14px;background:rgba(56,189,248,0.06);border:1px solid rgba(56,189,248,0.22);'>" +
          "<div style='font-family:var(--font-mono);font-size:0.68rem;color:var(--neon-primary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;'>02 · Arquitetura &amp; Engenharia</div>" +
          "<p style='font-size:0.84rem;color:var(--text-secondary);line-height:1.58;'>" + proj.solution + "</p>" +
        "</div>" +
      "</div>" +
      "<div style='margin-top:16px;'>" +
        "<div style='font-family:var(--font-mono);font-size:0.68rem;color:var(--neon-primary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;'>03 · Detalhes Técnicos &amp; UI/UX</div>" +
        "<div class='modal-highlights'>" + uxItems + "</div>" +
      "</div>" +
      "<div style='margin-top:16px;'>" +
        "<div style='font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;'>Stack Utilizada</div>" +
        "<div class='modal-tech-tags'>" + stackPills + "</div>" +
      "</div>" +
      "<div class='modal-actions' style='display:flex;gap:10px;flex-wrap:wrap;margin-top:22px;'>" + actionButtons + "</div>";

    modal.classList.remove("is-closing");
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";

    const jumpBtn = content.querySelector("[data-modal-jump-id]");
    if (jumpBtn) {
      jumpBtn.addEventListener("click", function () {
        closeProjectModal();
        setTimeout(function () {
          if (typeof NS.jumpToLiveDemo === "function") {
            NS.jumpToLiveDemo(proj.studioKey || "", proj.id);
          }
        }, 120);
      });
    }

    const quoteBtn = content.querySelector("[data-modal-request-quote]");
    if (quoteBtn) {
      quoteBtn.addEventListener("click", function () {
        closeProjectModal();
        const msg = document.getElementById("conciergeMessage");
        if (msg) msg.value = "Vi a ficha técnica de " + proj.title + " e gostaria de orçar um projeto semelhante.";
        setTimeout(function () {
          const contactSec = document.getElementById("contato");
          if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
        }, 120);
      });
    }
  };

  /* ------------------------------------------------------------------------
     BLOCO 4: Barra de Busca Animada com Retração Rápida no Fechamento (210ms)
     Data/Hora: 02/11/2026 12:37
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
      { label: "Padrões de Sites & Sites Personalizados (Referências)", badge: "Sites & UI/UX", target: "sites", projectId: "site-vania" },
      { label: "Jornada do Usuário, Acessibilidade WCAG AAA & Web Vitals", badge: "Engenharia UX", href: "#uxEngineeringBlock" },
      { label: "Testar Sistema CRM Comercial & Fluxo de Caixa", badge: "Sistema Ao Vivo", target: "crm", projectId: "crm-manu" },
      { label: "Testar Super App Órion IA (Tarefas, Chat RAG & DPAPI)", badge: "App Ao Vivo", target: "orion", projectId: "orion" },
      { label: "Testar Pastas na Barra Windows 11 (C# / WPF)", badge: "Desktop Ao Vivo", target: "win11", projectId: "pastas-barra" },
      { label: "Testar EasyCode IDE (Python/JS/SQL) & Radar ATS", badge: "IDE Ao Vivo", target: "ide", projectId: "easycode" },
      { label: "Exemplos Reais de Edição de Vídeos (.mp4 60fps)", badge: "Vídeos", target: "video", projectId: "reels-studio" },
      { label: "Solicitar Orçamento Direto no WhatsApp", badge: "Contato", href: "#contato" }
    ];

    function renderLiveMatches(rawTerm) {
      const term = (rawTerm || "").trim().toLowerCase();
      let normalized = term;
      if (term.includes("padrões") || term.includes("standards") || term.includes("estándares") || term.includes("acessibilidade") || term.includes("ui/ux")) normalized = "site";
      else if (term.includes("crm")) normalized = "crm";
      else if (term.includes("órion") || term.includes("orion") || term.includes("app")) normalized = "orion";
      else if (term.includes("vídeo") || term.includes("video")) normalized = "vídeo";

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
        return { label: p.num + " · " + p.title + " (" + p.categoryLabel + ")", badge: "Ficha", modalProjectId: p.id };
      });

      const combined = matchedNav.concat(matchedProjs).slice(0, 9);
      if (!combined.length) {
        resultsBox.innerHTML = "<div style='font-size:0.82rem;color:#94a3b8;text-align:center;padding:12px;'>Nenhum resultado exato. Tente 'Sites', 'CRM', 'Órion', 'WCAG' ou 'Vídeo'.</div>";
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
          setTimeout(function () {
            if (item.target && typeof NS.jumpToLiveDemo === "function") {
              NS.jumpToLiveDemo(item.target, item.projectId);
            } else if (item.modalProjectId && typeof NS.openProjectModal === "function") {
              NS.openProjectModal(item.modalProjectId);
            } else if (item.href) {
              const el = document.querySelector(item.href);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }, 140);
        });
      });
    }

    function openSearchModal() {
      if (NS.sfx) NS.sfx.click();
      backdrop.classList.remove("is-closing");
      backdrop.classList.add("is-open");
      document.body.style.overflow = "hidden";
      searchInput.value = "";
      if (clearBtn) clearBtn.style.display = "none";
      tags.forEach(function (t) { t.classList.remove("is-selected"); });
      searchBox.classList.remove("active");
      renderLiveMatches("");
      setTimeout(function () {
        searchBox.classList.add("active");
        searchInput.focus();
      }, 45);
    }

    function closeSearchModal() {
      if (NS.sfx) NS.sfx.click();
      closeModalFast(backdrop, function () {
        searchBox.classList.remove("active");
      });
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
        if (backdrop.classList.contains("is-open")) closeSearchModal();
        closeProjectModal();
      }
    });

    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) closeSearchModal();
    });
  }

  /* ------------------------------------------------------------------------
     BLOCO 5: Gaveta Expansível da Trajetória & Grafo de Carreira (54 Nós)
     Data/Hora: 02/11/2026 12:37
     ------------------------------------------------------------------------ */
  function initExperiencesAndCareerDrawer() {
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

    const careerToggleBtn = document.getElementById("toggleCareerGraphBtn");
    const careerDrawer = document.getElementById("careerCollapsibleDrawer");
    let careerOpen = false;

    function syncCareerBtn() {
      if (!careerToggleBtn) return;
      careerToggleBtn.setAttribute("aria-expanded", careerOpen ? "true" : "false");
      careerToggleBtn.textContent = careerOpen
        ? NS.t("toggleCareerGraphOpen")
        : NS.t("toggleCareerGraphClosed");
    }

    if (careerToggleBtn && careerDrawer) {
      careerToggleBtn.addEventListener("click", function () {
        careerOpen = !careerOpen;
        if (NS.sfx) NS.sfx.click();
        careerDrawer.classList.toggle("is-open", careerOpen);
        syncCareerBtn();
        if (careerOpen) {
          setTimeout(function () {
            window.dispatchEvent(new Event("resize"));
          }, 50);
        }
      });
    }

    window.addEventListener("mattheus:langchange", syncCareerBtn);
    syncCareerBtn();

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
        setTimeout(function () {
          window.dispatchEvent(new Event("resize"));
        }, 40);
      });
    });
  }

  /* ------------------------------------------------------------------------
     BLOCO 6: Idioma, Menu Mobile com Fechamento Rápido, Scroll-Spy & Concierge
     Data/Hora: 02/11/2026 12:37
     ------------------------------------------------------------------------ */
  function initNeonScrollSpyAndConcierge() {
    /* Seletor Trilingue PT / EN / ES */
    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const lang = btn.getAttribute("data-lang-switch") || "pt";
        if (NS.sfx) NS.sfx.click();
        if (typeof NS.setLanguage === "function") NS.setLanguage(lang);
      });
    });

    /* Relógio digital de Florianópolis */
    const clockEl = document.getElementById("liveFloripaClock");
    function updateClock() {
      if (!clockEl) return;
      try {
        const nowStr = new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit"
        }).format(new Date());
        clockEl.textContent = "FLN · " + nowStr + " BRT";
      } catch (_) {
        clockEl.textContent = "FLN · BRT";
      }
    }
    updateClock();
    setInterval(updateClock, 15000);

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

    /* Menu Mobile com Animação Rápida no Fechamento (180ms) */
    const mobToggle = document.getElementById("mobileMenuBtn");
    const mainNav = document.getElementById("mainNavLinks");

    function closeMobileNavFast() {
      if (!mainNav || !mainNav.classList.contains("mobile-open")) return;
      mainNav.classList.add("is-closing");
      setTimeout(function () {
        mainNav.classList.remove("mobile-open", "is-closing");
      }, 180);
    }

    if (mobToggle && mainNav) {
      mobToggle.addEventListener("click", function () {
        if (mainNav.classList.contains("mobile-open")) {
          closeMobileNavFast();
        } else {
          mainNav.classList.remove("is-closing");
          mainNav.classList.add("mobile-open");
        }
      });
      mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMobileNavFast);
      });
    }

    /* Scroll-Spy: Ilumina APENAS as letras do item ativo (1 por vez) */
    const navLinks = document.querySelectorAll(".main-nav .nav-link");
    const trackedSections = ["topo", "obras", "sites", "sistemas", "videos", "contato"];

    function highlightActiveSection(secId) {
      const targetHash = "#" + secId;
      navLinks.forEach(function (a) {
        const active = a.getAttribute("href") === targetHash;
        a.classList.toggle("is-active", active);
        if (active) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    }

    navLinks.forEach(function (a) {
      a.addEventListener("click", function () {
        const h = (a.getAttribute("href") || "").replace("#", "");
        if (h) highlightActiveSection(h);
      });
    });

    window.addEventListener("scroll", function () {
      const scrollMid = window.scrollY + window.innerHeight * 0.35;
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

    /* Modal de Projetos */
    const projModal = document.getElementById("projectDetailModal");
    const closeBtn = document.getElementById("closeProjectModalBtn");
    if (closeBtn) closeBtn.addEventListener("click", closeProjectModal);
    if (projModal) {
      projModal.addEventListener("click", function (e) {
        if (e.target === projModal) closeProjectModal();
      });
    }

    /* Concierge Comercial Trilingue */
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
        const nameEl = document.getElementById("conciergeName");
        const noteEl = document.getElementById("conciergeMessage");
        const name = nameEl ? (nameEl.value || "").trim() : "";
        const note = noteEl ? (noteEl.value || "").trim() : "";
        const lang = NS.currentLang || "pt";
        let body = "";
        if (lang === "en") {
          const intro = name ? "Hi Mattheus, I'm " + name + "." : "Hi Mattheus!";
          body = intro + " I explored your portfolio and want to talk about: *" + selectedTopic + "*." + (note ? "\n\nBrief: " + note : "");
        } else if (lang === "es") {
          const intro = name ? "Hola Mattheus, soy " + name + "." : "¡Hola Mattheus!";
          body = intro + " Vi tu portafolio y quiero conversar sobre: *" + selectedTopic + "*." + (note ? "\n\nAlcance: " + note : "");
        } else {
          const intro = name ? "Olá Mattheus, me chamo " + name + "." : "Olá Mattheus!";
          body = intro + " Vi seu portfólio e quero conversar sobre: *" + selectedTopic + "*." + (note ? "\n\nEscopo: " + note : "");
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
    initExperiencesAndCareerDrawer();
    initNeonScrollSpyAndConcierge();
  });
})();
