/* ==========================================================================
   Arquivo: js/knowledge-graph.js
   Data/Hora: 02/11/2026 00:42
   O que é: Motor completo do "Career Knowledge Graph" (Grafo Interativo de
   Carreira, Projetos, Tecnologias e Impacto) + Visualização em Linha do Tempo
   do portfólio de Mattheus Moraes.
   O que foi feito e finalidade de cada bloco:
     1. Layout Orbital + Física de Mola: Posiciona Mattheus Moraes ("MM") no
        centro, os 7 Hubs ao redor e os nós específicos em órbita limpa em HiDPI.
     2. Zoom, Pan, Hover e Seleção: Suporte a roda do mouse, arrasto de câmera,
        botões de zoom e iluminação das conexões diretas e tracejadas.
     3. Filtros por Categoria, Busca Instantânea e Rastreador BFS ("Trace a Path"):
        Calcula o menor caminho real entre dois nós quaisquer e destaca toda a rota.
     4. Tour Guiado Automático & Modo Timeline: Conduz clientes e recrutadores
        pelos 6 marcos principais sem emojis poluindo a interface.
   ========================================================================== */

(function () {
  "use strict";

  const NS = (window.MattheusPortfolio = window.MattheusPortfolio || {});

  function initKnowledgeGraph() {
    const canvas = document.getElementById("careerGraphCanvas");
    const inspector = document.getElementById("kgInspectorPanel");
    if (!canvas || !inspector || !NS.GRAPH_DATA) return;

    const ctx = canvas.getContext("2d");
    const categories = NS.GRAPH_CATEGORIES;
    const rawNodes = NS.GRAPH_DATA.nodes;
    const rawLinks = NS.GRAPH_DATA.links;
    const tourSteps = NS.GRAPH_DATA.tourSteps || [];

    /* ----------------------------------------------------------------------
       BLOCO 1: Inicialização Geométrica e Estado do Grafo
       Data/Hora: 02/11/2026 00:42
       Finalidade: Distribuir os clusters sem sobreposição inicial de textos.
       ---------------------------------------------------------------------- */
    const nodes = rawNodes.map(function (n) {
      return Object.assign({}, n, { x: 0, y: 0, vx: 0, vy: 0, homeX: 0, homeY: 0 });
    });

    const nodeMap = {};
    nodes.forEach(function (n) { nodeMap[n.id] = n; });

    const links = rawLinks.map(function (l) {
      return {
        source: nodeMap[l.source],
        target: nodeMap[l.target],
        cross: Boolean(l.cross)
      };
    }).filter(function (l) { return l.source && l.target; });

    const hubs = nodes.filter(function (n) { return n.isHub; });
    const hubRadius = 175;

    hubs.forEach(function (hub, idx) {
      const angle = (idx / hubs.length) * Math.PI * 2 - Math.PI / 2;
      hub.homeX = Math.cos(angle) * hubRadius;
      hub.homeY = Math.sin(angle) * hubRadius;
      hub.x = hub.homeX;
      hub.y = hub.homeY;

      const children = nodes.filter(function (c) {
        return !c.isHub && c.id !== "mattheus" && c.group === hub.group;
      });

      const fanSpread = Math.min(1.42, 0.25 * children.length);
      children.forEach(function (child, cIdx) {
        const offset = children.length === 1
          ? 0
          : ((cIdx / (children.length - 1)) - 0.5) * fanSpread;
        const ringDist = 285 + (cIdx % 3) * 44;
        const childAngle = angle + offset;
        child.homeX = Math.cos(childAngle) * ringDist;
        child.homeY = Math.sin(childAngle) * ringDist;
        child.x = child.homeX;
        child.y = child.homeY;
      });
    });

    let width = 800;
    let height = 560;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let camX = 0;
    let camY = -24;
    let camZoom = 0.52;
    let targetCamX = 0;
    let targetCamY = -24;
    let targetCamZoom = 0.52;

    let selectedNode = null;
    let hoveredNode = null;
    let draggedNode = null;
    let isPanning = false;
    let panStartX = 0;
    let panStartY = 0;
    let pointerDownPos = { x: 0, y: 0 };

    let activeCategory = "all";
    let searchQuery = "";
    let tracedPathIds = new Set();
    let tracedEdgeKeys = new Set();
    let tourTimer = null;
    let tourIndex = -1;

    function resizeCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = Math.max(320, rect.width);
      height = Math.max(580, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function screenToWorld(sx, sy) {
      return {
        x: (sx - width / 2 - camX) / camZoom,
        y: (sy - height / 2 - camY) / camZoom
      };
    }

    function edgeKey(aId, bId) {
      return aId < bId ? aId + "::" + bId : bId + "::" + aId;
    }

    function getNeighbors(node) {
      const result = [];
      links.forEach(function (l) {
        if (l.source.id === node.id) result.push(l.target);
        else if (l.target.id === node.id) result.push(l.source);
      });
      return result;
    }

    function isNodeMatchingFilter(node) {
      if (node.id === "mattheus") return true;
      const catMatch = activeCategory === "all" || node.group === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const textMatch = !q ||
        node.label.toLowerCase().includes(q) ||
        (node.desc && node.desc.toLowerCase().includes(q));
      return catMatch && textMatch;
    }

    /* ----------------------------------------------------------------------
       BLOCO 2: Algoritmo BFS para Rastrear Caminho entre Dois Nós
       Data/Hora: 02/11/2026 00:42
       Finalidade: Iluminar como habilidades e empresas conectam-se aos projetos.
       ---------------------------------------------------------------------- */
    function traceShortestPath(startId, endId) {
      tracedPathIds.clear();
      tracedEdgeKeys.clear();
      if (!startId || !endId || startId === endId) return null;

      const queue = [[startId]];
      const visited = new Set([startId]);

      while (queue.length > 0) {
        const path = queue.shift();
        const curr = path[path.length - 1];
        if (curr === endId) {
          path.forEach(function (id) { tracedPathIds.add(id); });
          for (let i = 0; i < path.length - 1; i++) {
            tracedEdgeKeys.add(edgeKey(path[i], path[i + 1]));
          }
          return path.map(function (id) { return nodeMap[id]; });
        }

        const currNode = nodeMap[curr];
        const neighbors = getNeighbors(currNode);
        for (let i = 0; i < neighbors.length; i++) {
          const nb = neighbors[i];
          if (!visited.has(nb.id)) {
            visited.add(nb.id);
            queue.push(path.concat(nb.id));
          }
        }
      }
      return null;
    }

    /* ----------------------------------------------------------------------
       BLOCO 3: Renderização do Painel Lateral Inspetor
       Data/Hora: 02/11/2026 00:42
       Finalidade: Exibir estatísticas gerais ou detalhes profundos do nó clicado.
       ---------------------------------------------------------------------- */
    function countByGroup(grp) {
      return nodes.filter(function (n) { return !n.isHub && n.group === grp; }).length;
    }

    function renderDefaultInspector() {
      inspector.innerHTML =
        "<div>" +
          "<div style='font-family:var(--font-sans);font-size:1.22rem;font-weight:700;letter-spacing:-0.02em;color:#fff;'>" +
            nodes.length + " nós · " + links.length + " conexões." +
          "</div>" +
          "<p style='margin-top:10px;font-size:0.85rem;color:var(--text-secondary);line-height:1.6;'>" +
            "Clique em qualquer nó para inspecionar contexto, período e conexões diretas. Experimente selecionar " +
            "<button type='button' class='kg-inline-jump' data-jump-node='pr_orion' style='color:#E5CFA9;font-weight:700;text-decoration:underline;'>Órion IA</button>, " +
            "<button type='button' class='kg-inline-jump' data-jump-node='pr_vania' style='color:#FFFFFF;font-weight:700;text-decoration:underline;'>Vania Faria Luxury</button> ou " +
            "<button type='button' class='kg-inline-jump' data-jump-node='co_solan' style='color:#38BDF8;font-weight:700;text-decoration:underline;'>PV Operation / Solan Group</button>." +
          "</p>" +
        "</div>" +
        "<div class='kg-inspector-stats'>" +
          "<div class='kg-stat-chip'><strong>" + countByGroup("company") + "</strong> Empresas</div>" +
          "<div class='kg-stat-chip'><strong>" + countByGroup("domain") + "</strong> Domínios</div>" +
          "<div class='kg-stat-chip'><strong>" + countByGroup("skill") + "</strong> Habilidades</div>" +
          "<div class='kg-stat-chip'><strong>" + countByGroup("tool") + "</strong> Ferramentas</div>" +
          "<div class='kg-stat-chip'><strong>" + countByGroup("project") + "</strong> Projetos Core</div>" +
          "<div class='kg-stat-chip'><strong>" + countByGroup("education") + "</strong> Formações</div>" +
          "<div class='kg-stat-chip' style='grid-column:span 2;'><strong>" + countByGroup("impact") + "</strong> Marcos Auditáveis de Impacto</div>" +
        "</div>";

      bindJumpButtons();
    }

    function renderNodeInspector(node) {
      if (!node) {
        renderDefaultInspector();
        return;
      }
      const cat = categories[node.group] || { label: "Nó", color: "#C9A97C" };
      const neighbors = getNeighbors(node);

      let projectCtaHtml = "";
      if (node.projectId) {
        projectCtaHtml =
          "<button type='button' class='btn-studio-gold' data-open-project-modal='" + node.projectId + "' style='width:100%;margin-top:6px;'>" +
            "Abrir Dossiê do Projeto &rarr;" +
          "</button>";
      }

      const neighborChips = neighbors.map(function (nb) {
        const nbCat = categories[nb.group] || { color: "#94A3B8" };
        return (
          "<button type='button' class='kg-conn-chip' data-jump-node='" + nb.id + "'>" +
            "<span style='display:inline-block;width:6px;height:6px;border-radius:50%;background:" + nbCat.color + ";margin-right:6px;'></span>" +
            nb.label +
          "</button>"
        );
      }).join("");

      inspector.innerHTML =
        "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;'>" +
          "<span style='font-family:var(--font-mono);font-size:0.7rem;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,0.05);color:" + cat.color + ";border:1px solid " + cat.color + "55;'>" +
            cat.label +
          "</span>" +
          "<span style='font-family:var(--font-mono);font-size:0.71rem;color:var(--text-muted);'>" + (node.period || "") + "</span>" +
        "</div>" +
        "<h4 style='font-family:var(--font-sans);font-weight:700;font-size:1.2rem;color:#fff;margin-top:4px;'>" + node.label + "</h4>" +
        "<p style='font-size:0.85rem;color:var(--text-secondary);line-height:1.6;'>" + node.desc + "</p>" +
        projectCtaHtml +
        "<div style='margin-top:6px;padding-top:12px;border-top:1px solid var(--border-hairline);'>" +
          "<div style='font-family:var(--font-mono);font-size:0.69rem;text-transform:uppercase;color:var(--text-muted);letter-spacing:0.08em;'>" +
            "Conectado diretamente a (" + neighbors.length + "):" +
          "</div>" +
          "<div class='kg-conn-list'>" + neighborChips + "</div>" +
        "</div>";

      bindJumpButtons();
    }

    function renderPathInspector(pathNodes) {
      if (!pathNodes || !pathNodes.length) return;
      const stepsHtml = pathNodes.map(function (n, idx) {
        const cat = categories[n.group] || { color: "#C9A97C" };
        const arrow = idx < pathNodes.length - 1
          ? "<div style='color:var(--accent-gold-light);font-family:var(--font-mono);font-size:0.72rem;padding-left:8px;'>↓ conecta-se a</div>"
          : "";
        return (
          "<div style='padding:9px 12px;border-radius:10px;background:rgba(255,255,255,0.035);border:1px solid " + cat.color + "55;'>" +
            "<strong style='font-size:0.84rem;color:#fff;'>" + n.label + "</strong>" +
            "<span style='display:block;font-size:0.73rem;color:var(--text-muted);margin-top:2px;'>" + n.desc.slice(0, 88) + "...</span>" +
          "</div>" + arrow
        );
      }).join("");

      inspector.innerHTML =
        "<div style='font-family:var(--font-mono);font-size:0.71rem;color:var(--accent-gold-light);text-transform:uppercase;letter-spacing:0.12em;'>Rota Mapeada (" + (pathNodes.length - 1) + " saltos)</div>" +
        "<h4 style='font-family:var(--font-sans);font-weight:700;font-size:1.08rem;color:#fff;'>" +
          pathNodes[0].label + " &rarr; " + pathNodes[pathNodes.length - 1].label +
        "</h4>" +
        "<div style='display:flex;flex-direction:column;gap:6px;margin-top:6px;'>" + stepsHtml + "</div>";
    }

    function bindJumpButtons() {
      inspector.querySelectorAll("[data-jump-node]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const target = nodeMap[btn.getAttribute("data-jump-node")];
          if (target) focusOnNode(target);
        });
      });

      inspector.querySelectorAll("[data-open-project-modal]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const pid = btn.getAttribute("data-open-project-modal");
          if (NS.openProjectModal) NS.openProjectModal(pid);
        });
      });
    }

    function focusOnNode(node) {
      if (NS.sfx) NS.sfx.click();
      selectedNode = node;
      tracedPathIds.clear();
      tracedEdgeKeys.clear();
      targetCamZoom = 1.02;
      targetCamX = -node.x * targetCamZoom;
      targetCamY = -node.y * targetCamZoom;
      renderNodeInspector(node);
    }

    /* ----------------------------------------------------------------------
       BLOCO 4: Loop Físico de Mola e Desenho 60fps no Canvas HiDPI
       Data/Hora: 02/11/2026 00:42
       Finalidade: Animar suavemente câmera, forças elásticas e brilho dos nós.
       ---------------------------------------------------------------------- */
    function stepPhysicsAndDraw() {
      camX += (targetCamX - camX) * 0.12;
      camY += (targetCamY - camY) * 0.12;
      camZoom += (targetCamZoom - camZoom) * 0.12;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n === draggedNode || n.id === "mattheus") continue;

        const dxHome = n.homeX - n.x;
        const dyHome = n.homeY - n.y;
        n.vx += dxHome * 0.025;
        n.vy += dyHome * 0.025;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const distSq = dx * dx + dy * dy;
          const minDist = (n.radius + m.radius + 28);
          if (distSq > 0.1 && distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            const push = (minDist - dist) * 0.035;
            const ux = dx / dist;
            const uy = dy / dist;
            if (n !== draggedNode && n.id !== "mattheus") { n.vx += ux * push; n.vy += uy * push; }
            if (m !== draggedNode && m.id !== "mattheus") { m.vx -= ux * push; m.vy -= uy * push; }
          }
        }

        n.vx *= 0.82;
        n.vy *= 0.82;
        n.x += n.vx;
        n.y += n.vy;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      ctx.translate(width / 2 + camX, height / 2 + camY);
      ctx.scale(camZoom, camZoom);

      const activeFocus = hoveredNode || selectedNode;
      const connectedSet = new Set();
      if (activeFocus) {
        connectedSet.add(activeFocus.id);
        getNeighbors(activeFocus).forEach(function (nb) { connectedSet.add(nb.id); });
      }

      /* 1. Desenha Arestas */
      links.forEach(function (l) {
        const isTraced = tracedEdgeKeys.has(edgeKey(l.source.id, l.target.id));
        const touchesFocus = activeFocus &&
          (l.source.id === activeFocus.id || l.target.id === activeFocus.id);
        const bothVisible = isNodeMatchingFilter(l.source) && isNodeMatchingFilter(l.target);

        ctx.save();
        ctx.beginPath();
        if (l.cross && !isTraced) {
          ctx.setLineDash([4, 5]);
        }

        if (isTraced) {
          ctx.strokeStyle = "#E5CFA9";
          ctx.lineWidth = 2.8;
          ctx.shadowColor = "#C9A97C";
          ctx.shadowBlur = 12;
        } else if (touchesFocus) {
          const col = (categories[activeFocus.group] || {}).color || "#C9A97C";
          ctx.strokeStyle = col;
          ctx.globalAlpha = 0.84;
          ctx.lineWidth = 1.8;
        } else {
          ctx.strokeStyle = l.cross ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.22)";
          ctx.globalAlpha = bothVisible ? (activeFocus || tracedPathIds.size ? 0.2 : 1) : 0.05;
          ctx.lineWidth = 1.05;
        }

        ctx.moveTo(l.source.x, l.source.y);
        ctx.lineTo(l.target.x, l.target.y);
        ctx.stroke();
        ctx.restore();
      });

      /* 2. Desenha Nós e Rótulos */
      nodes.forEach(function (n) {
        const cat = categories[n.group] || { color: "#C9A97C" };
        const matchesFilter = isNodeMatchingFilter(n);
        const inTrace = tracedPathIds.has(n.id);
        const isHighlighted = inTrace || (activeFocus && connectedSet.has(n.id));

        let alpha = 1;
        if (!matchesFilter) alpha = 0.12;
        else if ((activeFocus || tracedPathIds.size > 0) && !isHighlighted) alpha = 0.26;

        ctx.save();
        ctx.globalAlpha = alpha;

        if (n.id === "mattheus" || n === selectedNode || n === hoveredNode || inTrace) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 9, 0, Math.PI * 2);
          ctx.fillStyle = cat.color + "30";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.id === "mattheus" ? "#C9A97C" : cat.color + "28";
        ctx.fill();
        ctx.lineWidth = (n === selectedNode || inTrace) ? 2.5 : 1.5;
        ctx.strokeStyle = cat.color;
        ctx.stroke();

        if (n.id === "mattheus") {
          ctx.fillStyle = "#050507";
          ctx.font = "700 13px 'Space Grotesk', sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("MM", n.x, n.y);
        } else if (n.isHub) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4.2, 0, Math.PI * 2);
          ctx.fillStyle = cat.color;
          ctx.fill();
        }

        const fontSize = n.id === "mattheus" ? 13 : (n.isHub ? 11.4 : 10.2);
        ctx.font = (n.isHub || n.id === "mattheus" ? "700 " : "500 ") + fontSize + "px 'Plus Jakarta Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = isHighlighted || (!activeFocus && !tracedPathIds.size) ? "#FAF7F2" : "#858999";
        ctx.fillText(n.label, n.x, n.y - n.radius - 5);

        ctx.restore();
      });

      ctx.restore();
      requestAnimationFrame(stepPhysicsAndDraw);
    }

    /* ----------------------------------------------------------------------
       BLOCO 5: Eventos de Mouse / Touch, Filtros, Busca, Rota e Tour Guiado
       Data/Hora: 02/11/2026 00:42
       Finalidade: Tornar toda a exploração fluida em desktop e mobile.
       ---------------------------------------------------------------------- */
    function findNodeAt(sx, sy) {
      const w = screenToWorld(sx, sy);
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dx = w.x - n.x;
        const dy = w.y - n.y;
        const hitR = n.radius + 7;
        if (dx * dx + dy * dy <= hitR * hitR) return n;
      }
      return null;
    }

    canvas.addEventListener("pointerdown", function (e) {
      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      pointerDownPos = { x: sx, y: sy };

      const hit = findNodeAt(sx, sy);
      if (hit) {
        draggedNode = hit;
      } else {
        isPanning = true;
        panStartX = e.clientX - targetCamX;
        panStartY = e.clientY - targetCamY;
      }
    });

    window.addEventListener("pointermove", function (e) {
      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;

      if (draggedNode) {
        const w = screenToWorld(sx, sy);
        draggedNode.x = w.x;
        draggedNode.y = w.y;
        draggedNode.vx = 0;
        draggedNode.vy = 0;
        return;
      }

      if (isPanning) {
        targetCamX = e.clientX - panStartX;
        targetCamY = e.clientY - panStartY;
        return;
      }

      if (sx >= 0 && sy >= 0 && sx <= rect.width && sy <= rect.height) {
        const hit = findNodeAt(sx, sy);
        hoveredNode = hit;
        canvas.style.cursor = hit ? "pointer" : "grab";
      } else {
        hoveredNode = null;
      }
    });

    window.addEventListener("pointerup", function (e) {
      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const moved = Math.hypot(sx - pointerDownPos.x, sy - pointerDownPos.y);

      if (moved < 6 && (draggedNode || isPanning)) {
        const clicked = findNodeAt(sx, sy);
        if (clicked) {
          focusOnNode(clicked);
        } else if (sx >= 0 && sy >= 0 && sx <= rect.width && sy <= rect.height) {
          selectedNode = null;
          tracedPathIds.clear();
          tracedEdgeKeys.clear();
          renderDefaultInspector();
        }
      }
      draggedNode = null;
      isPanning = false;
    });

    canvas.addEventListener("wheel", function (e) {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      targetCamZoom = Math.min(1.85, Math.max(0.45, targetCamZoom * factor));
    }, { passive: false });

    const zIn = document.getElementById("kgZoomIn");
    const zOut = document.getElementById("kgZoomOut");
    const resetBtn = document.getElementById("kgResetBtn");

    function resetGraphAll() {
      stopTour();
      selectedNode = null;
      activeCategory = "all";
      searchQuery = "";
      tracedPathIds.clear();
      tracedEdgeKeys.clear();
      targetCamX = 0;
      targetCamY = -24;
      targetCamZoom = 0.52;
      const searchEl = document.getElementById("kgSearchInput");
      if (searchEl) searchEl.value = "";
      document.querySelectorAll("[data-kg-cat]").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-kg-cat") === "all");
      });
      renderDefaultInspector();
    }

    if (zIn) zIn.addEventListener("click", function () { targetCamZoom = Math.min(1.85, targetCamZoom * 1.18); });
    if (zOut) zOut.addEventListener("click", function () { targetCamZoom = Math.max(0.45, targetCamZoom * 0.84); });
    if (resetBtn) resetBtn.addEventListener("click", function () {
      if (NS.sfx) NS.sfx.click();
      resetGraphAll();
    });

    document.querySelectorAll("[data-kg-cat]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const cat = btn.getAttribute("data-kg-cat");
        if (NS.sfx) NS.sfx.click();
        activeCategory = (activeCategory === cat && cat !== "all") ? "all" : cat;
        document.querySelectorAll("[data-kg-cat]").forEach(function (b) {
          b.classList.toggle("active", b.getAttribute("data-kg-cat") === activeCategory);
        });
      });
    });

    const searchInput = document.getElementById("kgSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        searchQuery = searchInput.value;
      });
    }

    const selFrom = document.getElementById("kgTraceFrom");
    const selTo = document.getElementById("kgTraceTo");
    const traceBtn = document.getElementById("kgTraceBtn");

    if (selFrom && selTo && traceBtn) {
      const selectable = nodes.filter(function (n) { return !n.isHub && n.id !== "mattheus"; });
      selectable.forEach(function (n) {
        const o1 = document.createElement("option");
        o1.value = n.id;
        o1.textContent = n.label;
        const o2 = o1.cloneNode(true);
        selFrom.appendChild(o1);
        selTo.appendChild(o2);
      });
      selFrom.value = "co_solan";
      selTo.value = "pr_orion";

      traceBtn.addEventListener("click", function () {
        stopTour();
        if (NS.sfx) NS.sfx.success();
        const path = traceShortestPath(selFrom.value, selTo.value);
        if (path) {
          selectedNode = null;
          targetCamX = 0;
          targetCamY = 0;
          targetCamZoom = 0.72;
          renderPathInspector(path);
        }
      });
    }

    const modeBtns = document.querySelectorAll("[data-kg-view]");
    const timelineEl = document.getElementById("kgTimelineView");

    if (timelineEl) {
      const timelineNodes = nodes.filter(function (n) { return !n.isHub && n.id !== "mattheus"; });
      timelineEl.innerHTML = timelineNodes.map(function (n) {
        const cat = categories[n.group] || { label: "Item", color: "#C9A97C" };
        return (
          "<div class='kg-tl-item' data-tl-node='" + n.id + "'>" +
            "<div class='kg-tl-date'>" + (n.period || "2026") + "<br><span style='color:" + cat.color + ";font-size:0.68rem;'>" + cat.label + "</span></div>" +
            "<div><strong style='color:#fff;font-size:0.95rem;'>" + n.label + "</strong>" +
            "<p style='font-size:0.83rem;color:var(--text-muted);margin-top:4px;'>" + n.desc + "</p></div>" +
          "</div>"
        );
      }).join("");

      timelineEl.querySelectorAll("[data-tl-node]").forEach(function (row) {
        row.addEventListener("click", function () {
          const n = nodeMap[row.getAttribute("data-tl-node")];
          if (!n) return;
          canvas.style.display = "block";
          timelineEl.classList.remove("is-active");
          modeBtns.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-kg-view") === "graph"); });
          focusOnNode(n);
        });
      });
    }

    modeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const mode = btn.getAttribute("data-kg-view");
        if (NS.sfx) NS.sfx.click();
        modeBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        if (mode === "timeline") {
          stopTour();
          canvas.style.display = "none";
          if (timelineEl) timelineEl.classList.add("is-active");
        } else {
          canvas.style.display = "block";
          if (timelineEl) timelineEl.classList.remove("is-active");
        }
      });
    });

    const tourBtn = document.getElementById("kgTourBtn");
    const tourBanner = document.getElementById("kgTourBanner");
    const tourTitle = document.getElementById("kgTourTitle");
    const tourText = document.getElementById("kgTourText");
    const tourNextBtn = document.getElementById("kgTourNextBtn");

    function stopTour() {
      if (tourTimer) {
        clearInterval(tourTimer);
        tourTimer = null;
      }
      tourIndex = -1;
      if (tourBtn) {
        tourBtn.classList.remove("is-running");
        tourBtn.innerHTML = "&#9654; Tour Guiado";
      }
      if (tourBanner) tourBanner.classList.remove("is-visible");
    }

    function showTourStep(idx) {
      const step = tourSteps[idx];
      if (!step) {
        stopTour();
        return;
      }
      const n = nodeMap[step.nodeId];
      if (n) focusOnNode(n);
      if (tourBanner && tourTitle && tourText) {
        tourTitle.textContent = step.title;
        tourText.textContent = step.text;
        tourBanner.classList.add("is-visible");
      }
    }

    if (tourBtn) {
      tourBtn.addEventListener("click", function () {
        if (tourTimer || tourIndex >= 0) {
          stopTour();
          return;
        }
        canvas.style.display = "block";
        if (timelineEl) timelineEl.classList.remove("is-active");
        tourIndex = 0;
        tourBtn.classList.add("is-running");
        tourBtn.textContent = "Parar Tour";
        showTourStep(tourIndex);

        tourTimer = setInterval(function () {
          tourIndex += 1;
          if (tourIndex >= tourSteps.length) {
            stopTour();
          } else {
            showTourStep(tourIndex);
          }
        }, 4800);
      });
    }

    if (tourNextBtn) {
      tourNextBtn.addEventListener("click", function () {
        tourIndex += 1;
        if (tourIndex >= tourSteps.length) stopTour();
        else showTourStep(tourIndex);
      });
    }

    renderDefaultInspector();
    requestAnimationFrame(stepPhysicsAndDraw);
  }

  document.addEventListener("DOMContentLoaded", initKnowledgeGraph);
})();
