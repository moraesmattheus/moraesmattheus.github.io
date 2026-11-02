/* ==========================================================================
   Arquivo: js/app.js
   Data/Hora: 02/11/2026 00:43
   O que é: Controlador principal da experiência web de alto padrão do portfólio
   de Mattheus Moraes.
   O que foi feito e finalidade de cada bloco:
     1. Preloader Cinematográfico com Failsafe: Anima a barra de 0% a 100% e
        libera o palco em ~550ms sem nunca travar a visualização.
     2. Acervo Completo dos 18 Projetos (Grid & Índice Editorial): Renderiza os
        18 sistemas numerados (01..18) sem emojis, com filtro e busca ao vivo.
     3. Modal Executivo Deep-Dive: Apresenta dor de negócio, arquitetura, UI/UX,
        imagens reais e atalho direto para o Estúdio Interativo.
     4. Trajetória Auditável, Command Palette (Ctrl+K) e Concierge Comercial VIP.
   ========================================================================== */

(function () {
  "use strict";

  const NS = (window.MattheusPortfolio = window.MattheusPortfolio || {});

  /* ------------------------------------------------------------------------
     BLOCO 1: Preloader Minimalista de Estúdio & Utilitário de Toast
     Data/Hora: 02/11/2026 00:43
     Finalidade: Abertura elegante inspirada em Marco Madonna e Site Vania.
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

    setTimeout(dismiss, 520);
    window.addEventListener("load", function () {
      setTimeout(dismiss, 360);
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
     BLOCO 2: Renderização e Filtragem dos 18 Projetos Reais (01 a 18)
     Data/Hora: 02/11/2026 00:43
     Finalidade: Exibir todo o acervo com numeração técnica limpa (zero emojis).
     ------------------------------------------------------------------------ */
  function initProjectsCatalog() {
    const grid = document.getElementById("projectsCatalogGrid");
    const searchInput = document.getElementById("catalogSearchInput");
    const filterBtns = document.querySelectorAll("[data-proj-filter]");
    const viewBtns = document.querySelectorAll("[data-view-mode]");

    if (!grid || !NS.PROJECTS) return;

    let activeCat = "all";
    let query = "";

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
            "Nenhum sistema encontrado para esse termo. Clique em 'Todos (18)' para restaurar o acervo completo." +
          "</div>";
        return;
      }

      grid.innerHTML = filtered.map(function (p) {
        return (
          "<article class='project-card' data-cursor='VER DOSSIÊ' data-project-id='" + p.id + "' tabindex='0' role='button' aria-label='Abrir dossiê de " + p.title + "'>" +
            "<div class='project-card-body'>" +
              "<div class='project-card-head'>" +
                "<span class='project-num-code'>" + p.num + " / " + p.categoryLabel.toUpperCase() + "</span>" +
                "<span class='project-status-pill " + p.statusClass + "'>" + p.status + "</span>" +
              "</div>" +
              "<div>" +
                "<h3>" + p.title + "</h3>" +
              "</div>" +
              "<p>" + p.summary + "</p>" +
            "</div>" +
            "<div class='project-card-foot'>" +
              "<span class='project-stack-mini'>" + p.stack.slice(0, 3).join(" · ") + "</span>" +
              "<span class='project-open-cta'>Dossiê &rarr;</span>" +
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

        // Preview visual flutuante estilo Fabian Tjoe-A-On / Aparelho Studio (02/11/2026)
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

      // Liga também os cartões 3D do carrossel visual horizontal ao Modal Deep-Dive
      document.querySelectorAll("[data-open-project]").forEach(function (rc) {
        if (rc.dataset.boundModal) return;
        rc.dataset.boundModal = "1";
        rc.addEventListener("click", function () {
          NS.openProjectModal(rc.getAttribute("data-open-project"));
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

    renderProjects();
  }

  /* ------------------------------------------------------------------------
     BLOCO 3: Modal Executivo de Estudo de Caso (Deep-Dive)
     Data/Hora: 02/11/2026 00:43
     Finalidade: Exibir arquitetura, decisões de UI/UX, telas reais e links.
     ------------------------------------------------------------------------ */
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
        ? "<img src='" + proj.secondaryImage + "' alt='" + proj.title + " visão complementar' style='border-radius:14px;border:1px solid var(--border-subtle);max-height:310px;object-fit:contain;background:#05060A;padding:8px;width:100%;'>"
        : "";
      const cols = proj.secondaryImage ? "grid-template-columns:repeat(auto-fit,minmax(260px,1fr));" : "grid-template-columns:1fr;";
      galleryHtml =
        "<div style='display:grid;" + cols + "gap:14px;margin:20px 0;'>" +
          "<img src='" + proj.image + "' alt='" + proj.title + "' style='border-radius:14px;border:1px solid var(--border-subtle);max-height:310px;object-fit:contain;background:#05060A;padding:8px;width:100%;'>" +
          secondImg +
        "</div>";
    }

    const uxItems = (proj.uxHighlights || []).map(function (h) {
      return "<div class='modal-highlight-item'><i>&#10003;</i><span>" + h + "</span></div>";
    }).join("");

    const stackPills = (proj.stack || []).map(function (s) {
      return "<span class='modal-tech-tag'>" + s + "</span>";
    }).join("");

    let actionButtons = "";
    if (proj.studioKey) {
      actionButtons +=
        "<button type='button' class='btn-studio-gold' data-modal-jump-studio='" + proj.studioKey + "'>" +
          "Testar Sistema no Estúdio Interativo &darr;" +
        "</button>";
    }
    if (proj.liveUrl) {
      actionButtons +=
        "<a href='" + proj.liveUrl + "' target='_blank' rel='noopener noreferrer' class='btn-studio-ghost'>" +
          "Abrir Produto em Produção &#8599;" +
        "</a>";
    }
    if (proj.repoUrl) {
      actionButtons +=
        "<a href='" + proj.repoUrl + "' target='_blank' rel='noopener noreferrer' class='btn-studio-ghost'>" +
          "Ver Código no GitHub &#8599;" +
        "</a>";
    }
    actionButtons +=
      "<button type='button' class='btn-studio-ghost' data-modal-request-quote='" + proj.title + "'>" +
        "Solicitar Projeto Semelhante" +
      "</button>";

    content.innerHTML =
      "<div style='display:flex;align-items:center;gap:12px;flex-wrap:wrap;'>" +
        "<span class='project-num-code'>" + proj.num + " • " + proj.categoryLabel.toUpperCase() + "</span>" +
        "<span class='project-status-pill " + proj.statusClass + "'>" + proj.status + "</span>" +
      "</div>" +
      "<h2 style='font-family:var(--font-sans);font-weight:700;letter-spacing:-0.035em;font-size:clamp(1.65rem,3vw,2.35rem);margin-top:12px;color:#fff;'>" + proj.title + "</h2>" +
      "<p style='color:var(--accent-gold-light);font-size:0.95rem;margin-top:4px;'>" + proj.subtitle + "</p>" +
      galleryHtml +
      "<div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:18px;'>" +
        "<div style='padding:18px;border-radius:14px;background:rgba(255,255,255,0.025);border:1px solid var(--border-hairline);'>" +
          "<div style='font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:6px;'>01 • Problema & Gargalo Real</div>" +
          "<p style='font-size:0.88rem;color:var(--text-secondary);line-height:1.6;'>" + proj.problem + "</p>" +
        "</div>" +
        "<div style='padding:18px;border-radius:14px;background:rgba(201,169,124,0.06);border:1px solid rgba(201,169,124,0.24);'>" +
          "<div style='font-family:var(--font-mono);font-size:0.7rem;color:var(--accent-gold-light);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:6px;'>02 • Engenharia & Arquitetura</div>" +
          "<p style='font-size:0.88rem;color:var(--text-secondary);line-height:1.6;'>" + proj.solution + "</p>" +
        "</div>" +
      "</div>" +
      "<div style='margin-top:18px;'>" +
        "<div style='font-family:var(--font-mono);font-size:0.7rem;color:var(--accent-gold);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;'>03 • Percepção de Valor & Decisões de UI/UX</div>" +
        "<div class='modal-highlights'>" + uxItems + "</div>" +
      "</div>" +
      "<div style='margin-top:20px;'>" +
        "<div style='font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;'>Stack & Tecnologias</div>" +
        "<div class='modal-tech-tags'>" + stackPills + "</div>" +
      "</div>" +
      "<div class='modal-actions'>" + actionButtons + "</div>";

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";

    const studioBtn = content.querySelector("[data-modal-jump-studio]");
    if (studioBtn) {
      studioBtn.addEventListener("click", function () {
        const key = studioBtn.getAttribute("data-modal-jump-studio");
        closeProjectModal();
        if (NS.activateStudioCase) NS.activateStudioCase(key);
        const sec = document.getElementById("estudio-interativo");
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
      });
    }

    const quoteBtn = content.querySelector("[data-modal-request-quote]");
    if (quoteBtn) {
      quoteBtn.addEventListener("click", function () {
        closeProjectModal();
        const msg = document.getElementById("conciergeMessage");
        if (msg) msg.value = "Gostei muito da arquitetura do projeto " + proj.title + " e gostaria de conversar sobre uma solução semelhante.";
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
     BLOCO 4: Experiências Auditáveis, Command Palette (Ctrl+K) e Concierge VIP
     Data/Hora: 02/11/2026 00:43
     Finalidade: Gerar confiança comercial e facilitar fechamento imediato.
     ------------------------------------------------------------------------ */
  function initExperiences() {
    const stackEl = document.getElementById("experienceStack");
    if (!stackEl || !NS.EXPERIENCES) return;

    stackEl.innerHTML = NS.EXPERIENCES.map(function (exp) {
      const lis = exp.bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("");
      return (
        "<article class='exp-card reveal'>" +
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

  function initCommandPalette() {
    const backdrop = document.getElementById("cmdkModal");
    const input = document.getElementById("cmdkInput");
    const results = document.getElementById("cmdkResults");
    const openBtn = document.getElementById("openCmdkBtn");

    if (!backdrop || !input || !results) return;

    const staticActions = [
      { label: "Abrir Estúdio Interativo Ao Vivo", tag: "Seção", href: "#estudio-interativo" },
      { label: "Explorar Grafo de Carreira (54 Nós)", tag: "Seção", href: "#grafo-carreira" },
      { label: "Abrir GitHub Oficial (@moraesmattheus)", tag: "GitHub", external: NS.PROFILE.github },
      { label: "Conectar no LinkedIn (Mattheus Moraes)", tag: "LinkedIn", external: NS.PROFILE.linkedin },
      { label: "Iniciar Conversa no WhatsApp Direto", tag: "Contato", external: "https://wa.me/" + NS.PROFILE.whatsappNumber },
      { label: "Baixar Currículo · Engenharia de Software (PDF)", tag: "PDF", external: "assets/docs/Mattheus-Moraes-Engenharia-Software.pdf" },
      { label: "Baixar Currículo · Performance & Growth (PDF)", tag: "PDF", external: "assets/docs/Mattheus-Moraes-Performance-Growth.pdf" }
    ];

    function renderCmdkList(q) {
      const term = (q || "").trim().toLowerCase();
      const projItems = (NS.PROJECTS || []).filter(function (p) {
        return !term || p.title.toLowerCase().includes(term) || p.stack.join(" ").toLowerCase().includes(term);
      }).map(function (p) {
        return { label: p.num + " · " + p.title + " (" + p.categoryLabel + ")", tag: "Projeto", projectId: p.id };
      });

      const navItems = staticActions.filter(function (a) {
        return !term || a.label.toLowerCase().includes(term);
      });

      const merged = projItems.concat(navItems).slice(0, 14);
      results.innerHTML = merged.map(function (it, idx) {
        return (
          "<button type='button' class='cmdk-item' data-cmdk-idx='" + idx + "'>" +
            "<span style='font-size:0.86rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'>" + it.label + "</span>" +
            "<span style='font-family:var(--font-mono);font-size:0.68rem;color:var(--accent-gold-light);flex-shrink:0;'>" + it.tag + "</span>" +
          "</button>"
        );
      }).join("");

      results.querySelectorAll("[data-cmdk-idx]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const chosen = merged[Number(btn.getAttribute("data-cmdk-idx"))];
          backdrop.classList.remove("is-open");
          document.body.style.overflow = "";
          if (!chosen) return;
          if (chosen.projectId) NS.openProjectModal(chosen.projectId);
          else if (chosen.href) window.location.hash = chosen.href;
          else if (chosen.external) window.open(chosen.external, "_blank", "noopener");
        });
      });
    }

    function openCmdk() {
      if (NS.sfx) NS.sfx.click();
      backdrop.classList.add("is-open");
      document.body.style.overflow = "hidden";
      input.value = "";
      renderCmdkList("");
      setTimeout(function () { input.focus(); }, 40);
    }

    if (openBtn) openBtn.addEventListener("click", openCmdk);
    input.addEventListener("input", function () { renderCmdkList(input.value); });

    window.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openCmdk();
      } else if (e.key === "Escape") {
        backdrop.classList.remove("is-open");
        closeProjectModal();
      }
    });

    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) {
        backdrop.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }

  function initConciergeAndUtilities() {
    /* Relógio ao vivo de Florianópolis */
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

    /* Botão Som Tátil */
    const soundBtn = document.getElementById("soundToggleBtn");
    if (soundBtn && NS.sfx) {
      soundBtn.addEventListener("click", function () {
        const on = NS.sfx.toggle();
        soundBtn.classList.toggle("is-active", on);
        const label = soundBtn.querySelector("span");
        if (label) label.textContent = on ? "Som Ativo" : "Som";
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

    /* Fechamento do Modal de Projetos e cliques em Cards Editoriais */
    const projModal = document.getElementById("projectDetailModal");
    const closeBtn = document.getElementById("closeProjectModalBtn");
    if (closeBtn) closeBtn.addEventListener("click", closeProjectModal);
    if (projModal) {
      projModal.addEventListener("click", function (e) {
        if (e.target === projModal) closeProjectModal();
      });
    }

    document.querySelectorAll("[data-open-dossier]").forEach(function (el) {
      el.addEventListener("click", function () {
        const id = el.getAttribute("data-open-dossier");
        if (id) NS.openProjectModal(id);
      });
    });

    /* Concierge Comercial VIP */
    let selectedTopic = "Site de Alto Padrão / Quiet Luxury";
    const topicChips = document.querySelectorAll("[data-concierge-topic]");

    NS.selectConciergeTopic = function (topicName) {
      selectedTopic = topicName;
      topicChips.forEach(function (c) {
        c.classList.toggle("active", c.getAttribute("data-concierge-topic") === topicName);
      });
    };

    topicChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        selectedTopic = chip.getAttribute("data-concierge-topic");
        if (NS.sfx) NS.sfx.click();
        topicChips.forEach(function (c) { c.classList.toggle("active", c === chip); });
      });
    });

    const waBtn = document.getElementById("conciergeSendWhatsapp");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        const name = (document.getElementById("conciergeName").value || "").trim();
        const note = (document.getElementById("conciergeMessage").value || "").trim();
        const intro = name ? "Olá Mattheus, me chamo " + name + "." : "Olá Mattheus!";
        const body = intro + " Vi seu portfólio interativo e quero conversar sobre: *" + selectedTopic + "*." +
          (note ? "\n\nContexto: " + note : "");
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

    /* IntersectionObserver para entrada editorial suave */
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initPreloader();
    initProjectsCatalog();
    initExperiences();
    initCommandPalette();
    initConciergeAndUtilities();
  });
})();
