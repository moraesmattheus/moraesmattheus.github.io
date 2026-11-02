/* ==========================================================================
   Arquivo: js/motion-3d.js
   Data/Hora: 02/11/2026 12:33
   O que é: Motor gráfico 3D e generativo em 60fps V6 do portfólio de Mattheus
   Moraes, unido ao fundo em CSS puro de ondas e órbitas em azul/roxo.
   O que foi feito e finalidade de cada bloco:
     1. Fundo Orbital 3D em Azul & Roxo/Violeta + Spotlight 3D nos Cartões.
     2. Vórtice 3D "Minhas Obras" (V6): Telas reais dos sites e apps em corredor
        elíptico aberto com desaceleração suave no hover para que o texto central
        "Minhas Obras" permaneça 100% nítido e nunca desapareça.
     3. Player Comparador de Edição de Vídeos (Antes vs Depois em -14 LUFS).
     4. Relógio Analógico 24h de Florianópolis, Globo 3D e Gaveta NEON [T].
   ========================================================================== */

(function () {
  "use strict";

  const NS = (window.MattheusPortfolio = window.MattheusPortfolio || {});

  /* ------------------------------------------------------------------------
     Utilitário: Leitura dinâmica das cores Neon e Destaque nos Design Tokens
     Data/Hora: 02/11/2026 10:47
     Finalidade: Sincronizar o fundo orbital 3D, o vórtice Visuvate e as 5 cenas
     isométricas quando o visitante seleciona um tema Neon em "NEON · T".
     ------------------------------------------------------------------------ */
  let cachedAccentHex = "#8B5CF6";
  let cachedAccentRgb = { r: 139, g: 92, b: 246 };
  let cachedNeonHex = "#38BDF8";
  let cachedNeonRgb = { r: 56, g: 189, b: 248 };

  function parseHexRgb(hex, fallback) {
    const clean = (hex || "").replace("#", "").trim();
    if (clean.length === 6) {
      return {
        r: parseInt(clean.slice(0, 2), 16) || fallback.r,
        g: parseInt(clean.slice(2, 4), 16) || fallback.g,
        b: parseInt(clean.slice(4, 6), 16) || fallback.b
      };
    }
    return fallback;
  }

  function refreshAccentCache() {
    const styles = getComputedStyle(document.documentElement);
    const rawNeon = styles.getPropertyValue("--neon-primary").trim() || "#38BDF8";
    const rawAccent = styles.getPropertyValue("--neon-secondary").trim() || styles.getPropertyValue("--accent-gold").trim() || "#8B5CF6";
    cachedNeonHex = rawNeon;
    cachedAccentHex = rawAccent;
    cachedNeonRgb = parseHexRgb(rawNeon, { r: 56, g: 189, b: 248 });
    cachedAccentRgb = parseHexRgb(rawAccent, { r: 139, g: 92, b: 246 });
  }

  function rgbaAccent(alpha) {
    return "rgba(" + cachedAccentRgb.r + "," + cachedAccentRgb.g + "," + cachedAccentRgb.b + "," + alpha + ")";
  }

  function rgbaNeon(alpha) {
    return "rgba(" + cachedNeonRgb.r + "," + cachedNeonRgb.g + "," + cachedNeonRgb.b + "," + alpha + ")";
  }

  /* ------------------------------------------------------------------------
     BLOCO 1: Motor 3D Isométrico Vivo para os 5 Cartões de Serviço
     Data/Hora: 02/11/2026 01:28
     Finalidade: Garantir movimento contínuo suave e resposta tridimensional ao
     mouse em todos os 5 pilares ("Sites", "CRM", "Apps", "Vídeo", "Tráfego").
     ------------------------------------------------------------------------ */
  function project3D(x, y, z, rotX, rotY, cx, cy, scale) {
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    return {
      x: cx + x1 * scale,
      y: cy + y2 * scale,
      z: z2
    };
  }

  function drawIsoBox(ctx, cx, cy, scale, rotX, rotY, bx, by, bz, w, h, d, fillAlpha, strokeAlpha, highlightTop) {
    const hw = w / 2;
    const hh = h / 2;
    const hd = d / 2;

    const verts = [
      [bx - hw, by - hh, bz - hd],
      [bx + hw, by - hh, bz - hd],
      [bx + hw, by - hh, bz + hd],
      [bx - hw, by - hh, bz + hd],
      [bx - hw, by + hh, bz - hd],
      [bx + hw, by + hh, bz - hd],
      [bx + hw, by + hh, bz + hd],
      [bx - hw, by + hh, bz + hd]
    ].map(function (v) {
      return project3D(v[0], v[1], v[2], rotX, rotY, cx, cy, scale);
    });

    const faces = [
      { idx: [4, 5, 6, 7], shade: 0.35 },
      { idx: [0, 3, 7, 4], shade: 0.65 },
      { idx: [1, 2, 6, 5], shade: 0.5 },
      { idx: [2, 3, 7, 6], shade: 0.72 },
      { idx: [0, 1, 5, 4], shade: 0.45 },
      { idx: [0, 1, 2, 3], shade: 1.0, isTop: true }
    ];

    faces.sort(function (a, b) {
      const za = a.idx.reduce(function (s, i) { return s + verts[i].z; }, 0) / 4;
      const zb = b.idx.reduce(function (s, i) { return s + verts[i].z; }, 0) / 4;
      return za - zb;
    });

    faces.forEach(function (f) {
      ctx.beginPath();
      f.idx.forEach(function (vi, k) {
        if (k === 0) ctx.moveTo(verts[vi].x, verts[vi].y);
        else ctx.lineTo(verts[vi].x, verts[vi].y);
      });
      ctx.closePath();

      if (f.isTop && highlightTop) {
        ctx.fillStyle = rgbaAccent(fillAlpha * 1.45);
      } else {
        ctx.fillStyle = rgbaAccent(fillAlpha * f.shade);
      }
      ctx.fill();

      ctx.strokeStyle = f.isTop && highlightTop
        ? "#FFFFFF"
        : rgbaAccent(strokeAlpha);
      ctx.lineWidth = f.isTop && highlightTop ? 1.35 : 1;
      ctx.stroke();
    });
  }

  function initIsometric3DCards() {
    const canvases = document.querySelectorAll(".iso-3d-canvas");
    if (!canvases.length) return;

    const instances = [];

    canvases.forEach(function (canvas) {
      const ctx = canvas.getContext("2d");
      const scene = canvas.getAttribute("data-iso-scene") || "sites";
      const wrap = canvas.parentElement;

      const state = {
        canvas: canvas,
        ctx: ctx,
        scene: scene,
        w: 300,
        h: 220,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        mouseX: 0,
        mouseY: 0,
        targetX: 0,
        targetY: 0,
        hovered: false,
        visible: true
      };

      function resize() {
        const rect = wrap.getBoundingClientRect();
        state.w = Math.max(170, rect.width);
        state.h = Math.max(100, rect.height);
        state.dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = state.w * state.dpr;
        canvas.height = state.h * state.dpr;
      }

      resize();
      window.addEventListener("resize", resize);

      wrap.addEventListener("pointermove", function (e) {
        const r = wrap.getBoundingClientRect();
        state.targetX = ((e.clientX - r.left) / r.width - 0.5) * 2;
        state.targetY = ((e.clientY - r.top) / r.height - 0.5) * 2;
        state.hovered = true;
      });

      wrap.addEventListener("pointerleave", function () {
        state.targetX = 0;
        state.targetY = 0;
        state.hovered = false;
      });

      instances.push(state);
    });

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          const match = instances.find(function (it) { return it.canvas === entry.target; });
          if (match) match.visible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      instances.forEach(function (it) { io.observe(it.canvas); });
    }

    function renderFrame(now) {
      const t = now * 0.001;

      instances.forEach(function (st) {
        if (!st.visible) return;
        const ctx = st.ctx;
        const w = st.w;
        const h = st.h;

        st.mouseX += (st.targetX - st.mouseX) * 0.08;
        st.mouseY += (st.targetY - st.mouseY) * 0.08;

        ctx.save();
        ctx.scale(st.dpr, st.dpr);
        ctx.clearRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2 + 6;
        if (h < 160) {
          ctx.translate(cx, h / 2);
          ctx.scale(0.64, 0.64);
          ctx.translate(-cx, -(h / 2));
        }
        const baseRotX = 0.56 + st.mouseY * 0.28 + Math.sin(t * 1.1) * 0.05;
        const baseRotY = 0.78 + st.mouseX * 0.45 + Math.cos(t * 0.85) * 0.14;

        if (st.scene === "sites") {
          // 01: Pilha 3D de camadas de interface flutuando (estilo Marco Madonna Stack)
          const spread = st.hovered ? 0.52 : 0.38;
          for (let i = 3; i >= 0; i--) {
            const wave = Math.sin(t * 2.1 + i * 0.7) * 0.09;
            const yPos = (i - 1.5) * spread + wave;
            drawIsoBox(
              ctx, cx, cy, 48, baseRotX, baseRotY,
              0, yPos, 0,
              2.3, 0.09, 1.65,
              i === 0 ? 0.28 : 0.09,
              i === 0 ? 0.85 : 0.38,
              i === 0
            );
          }
          // Bloco Hero destacado no topo
          const topFloat = -1.5 * spread + Math.sin(t * 2.1) * 0.09 - 0.14;
          drawIsoBox(ctx, cx, cy, 48, baseRotX, baseRotY, -0.45, topFloat, -0.22, 1.05, 0.12, 0.75, 0.35, 0.95, true);
          drawIsoBox(ctx, cx, cy, 48, baseRotX, baseRotY, 0.58, topFloat, 0.22, 0.75, 0.1, 0.75, 0.18, 0.65, false);
        } else if (st.scene === "crm") {
          // 02: Base + Cubo central de dados + 4 módulos satélites conectados com pulsos
          const rotY = baseRotY + t * 0.38;
          drawIsoBox(ctx, cx, cy + 16, 44, baseRotX, rotY, 0, 0.55, 0, 2.8, 0.08, 2.8, 0.06, 0.3, false);

          const sats = [
            [-0.95, 0.2, -0.95],
            [0.95, 0.2, -0.95],
            [0.95, 0.2, 0.95],
            [-0.95, 0.2, 0.95]
          ];

          sats.forEach(function (pos, idx) {
            const bob = Math.sin(t * 2.4 + idx * 1.4) * 0.12;
            const pCenter = project3D(0, -0.1, 0, baseRotX, rotY, cx, cy + 8, 44);
            const pSat = project3D(pos[0], pos[1] + bob, pos[2], baseRotX, rotY, cx, cy + 8, 44);

            ctx.beginPath();
            ctx.setLineDash([3, 3]);
            ctx.moveTo(pCenter.x, pCenter.y);
            ctx.lineTo(pSat.x, pSat.y);
            ctx.strokeStyle = rgbaAccent(0.5);
            ctx.stroke();
            ctx.setLineDash([]);

            const pulseProg = (t * 0.8 + idx * 0.25) % 1;
            const px = pCenter.x + (pSat.x - pCenter.x) * pulseProg;
            const py = pCenter.y + (pSat.y - pCenter.y) * pulseProg;
            ctx.beginPath();
            ctx.arc(px, py, 2.8, 0, Math.PI * 2);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();

            drawIsoBox(ctx, cx, cy + 8, 44, baseRotX, rotY, pos[0], pos[1] + bob, pos[2], 0.52, 0.42, 0.52, 0.16, 0.65, false);
          });

          const mainBob = Math.sin(t * 1.9) * 0.1;
          drawIsoBox(ctx, cx, cy + 8, 44, baseRotX, rotY, 0, -0.15 + mainBob, 0, 1.05, 0.95, 1.05, 0.26, 0.92, true);
        } else if (st.scene === "apps") {
          // 03: Monólito Mobile 3D girando + anéis orbitais com nós vivos
          const rotY = baseRotY + t * 0.55;
          drawIsoBox(ctx, cx, cy, 46, baseRotX * 0.7, rotY, 0, Math.sin(t * 2) * 0.12, 0, 1.05, 1.85, 0.22, 0.25, 0.9, true);

          for (let ring = 0; ring < 2; ring++) {
            ctx.beginPath();
            for (let a = 0; a <= 48; a++) {
              const ang = (a / 48) * Math.PI * 2;
              const rx = Math.cos(ang) * (1.75 + ring * 0.35);
              const rz = Math.sin(ang) * (1.75 + ring * 0.35);
              const ry = Math.sin(ang * 2 + ring) * 0.32;
              const pt = project3D(rx, ry, rz, baseRotX, t * (ring === 0 ? 0.5 : -0.4), cx, cy, 44);
              if (a === 0) ctx.moveTo(pt.x, pt.y);
              else ctx.lineTo(pt.x, pt.y);
            }
            ctx.strokeStyle = ring === 0 ? rgbaAccent(0.65) : "rgba(255,255,255,0.22)";
            ctx.lineWidth = 1.1;
            ctx.stroke();

            const orbAng = t * (ring === 0 ? 1.5 : -1.2) + ring * 2;
            const orbPt = project3D(
              Math.cos(orbAng) * (1.75 + ring * 0.35),
              Math.sin(orbAng * 2 + ring) * 0.32,
              Math.sin(orbAng) * (1.75 + ring * 0.35),
              baseRotX,
              t * (ring === 0 ? 0.5 : -0.4),
              cx, cy, 44
            );
            ctx.beginPath();
            ctx.arc(orbPt.x, orbPt.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = ring === 0 ? cachedAccentHex : "#FFFFFF";
            ctx.fill();
          }
        } else if (st.scene === "video") {
          // 04: Lente cinética 3D + ondas de frequência em 60fps (estilo Dopamine Studio)
          const rings = 14;
          for (let r = 0; r < rings; r++) {
            const rad = 22 + r * 5.2;
            const offX = Math.cos(t * 1.8 + r * 0.35) * (8 + st.mouseX * 10);
            const offY = Math.sin(t * 1.8 + r * 0.35) * (6 + st.mouseY * 10);
            ctx.beginPath();
            ctx.ellipse(
              cx + offX,
              cy - 6 + offY,
              rad,
              rad * 0.72,
              t * 0.25 + r * 0.08,
              0,
              Math.PI * 2
            );
            ctx.strokeStyle = r % 3 === 0 ? rgbaAccent(0.62 - r * 0.03) : "rgba(255,255,255," + (0.24 - r * 0.012) + ")";
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
          // Triângulo Play central pulsante
          const pulse = 1 + Math.sin(t * 3.2) * 0.08;
          ctx.save();
          ctx.translate(cx, cy - 6);
          ctx.scale(pulse, pulse);
          ctx.beginPath();
          ctx.moveTo(-7, -10);
          ctx.lineTo(12, 0);
          ctx.lineTo(-7, 10);
          ctx.closePath();
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.restore();
        } else if (st.scene === "traffic") {
          // 05: Colunas 3D ascendentes de receita e ROAS + curva luminosa
          const heights = [0.45, 0.72, 1.05, 1.42, 1.88];
          const rotY = 0.65 + st.mouseX * 0.38 + Math.sin(t * 0.7) * 0.08;
          drawIsoBox(ctx, cx, cy + 28, 42, baseRotX, rotY, 0, 0.45, 0, 3.2, 0.07, 1.8, 0.06, 0.28, false);

          const topPoints = [];
          heights.forEach(function (bh, idx) {
            const dynH = bh + Math.sin(t * 2.2 + idx * 0.6) * 0.12 + (st.hovered ? idx * 0.05 : 0);
            const xPos = (idx - 2) * 0.62;
            const yCenter = 0.4 - dynH / 2;
            drawIsoBox(
              ctx, cx, cy + 28, 42, baseRotX, rotY,
              xPos, yCenter, 0,
              0.42, dynH, 0.48,
              idx === 4 ? 0.34 : 0.14 + idx * 0.03,
              idx === 4 ? 0.95 : 0.55,
              idx >= 3
            );
            topPoints.push(project3D(xPos, 0.4 - dynH - 0.18, 0, baseRotX, rotY, cx, cy + 28, 42));
          });

          ctx.beginPath();
          topPoints.forEach(function (pt, idx) {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 1.8;
          ctx.stroke();

          const last = topPoints[topPoints.length - 1];
          ctx.beginPath();
          ctx.arc(last.x, last.y, 4.2, 0, Math.PI * 2);
          ctx.fillStyle = cachedAccentHex;
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(renderFrame);
    }

    refreshAccentCache();
    requestAnimationFrame(renderFrame);
  }

  /* ------------------------------------------------------------------------
     BLOCO 2: Player Interativo de Edição de Vídeos & Reels (Antes vs Depois)
     Data/Hora: 02/11/2026 01:28
     Finalidade: Demonstrar visualmente em 60fps o salto de retenção entre um
     vídeo cru e uma edição profissional com legenda dinâmica, corte e cor.
     ------------------------------------------------------------------------ */
  function initReelsStudioPlayer() {
    const canvas = document.getElementById("reelsPreviewCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const playBtn = document.getElementById("videoPlayToggleBtn");
    const modeBtns = document.querySelectorAll("[data-video-mode]");
    const lufsLabel = document.getElementById("videoLufsReadout");

    let isPlaying = true;
    let mode = "after"; // "before" | "after"
    let simTime = 0;
    let lastTs = performance.now();

    const words = [
      "VÍDEOS,", "SITES", "E", "SISTEMAS",
      "FEITOS", "PARA", "VENDER", "TODOS", "OS", "DIAS."
    ];

    modeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        mode = btn.getAttribute("data-video-mode") || "after";
        if (NS.sfx) NS.sfx.click();
        modeBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        if (lufsLabel) {
          lufsLabel.textContent = mode === "after"
            ? "-14.0 LUFS · Color DaVinci + Legenda IA"
            : "-24.8 LUFS · Áudio Baixo · Sem Tratamento";
        }
      });
    });

    if (playBtn) {
      playBtn.addEventListener("click", function () {
        isPlaying = !isPlaying;
        if (NS.sfx) NS.sfx.click();
        playBtn.textContent = isPlaying ? "Pausar Preview" : "Reproduzir Preview";
      });
    }

    function drawVideo(now) {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      if (isPlaying) simTime += dt;

      const rect = canvas.parentElement.getBoundingClientRect();
      const w = Math.max(260, rect.width);
      const h = Math.max(220, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      if (mode === "before") {
        // Cena crua: lavada, sem contraste, sem legendas e com pausas longas
        ctx.fillStyle = "#1E2024";
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.beginPath();
        ctx.arc(w / 2, h / 2 - 14, 48, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#9CA3AF";
        ctx.font = "600 13px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("ARQUIVO BRUTO DE CÂMERA (LOG / SEM CORTE)", w / 2, h / 2 - 6);
        ctx.font = "400 12px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText("Pausas de respiração longas • Sem legenda • Cor lavada", w / 2, h / 2 + 18);

        // Onda de áudio baixa e falha
        for (let i = 0; i < 28; i++) {
          const bx = w / 2 - 140 + i * 10;
          const bh = i % 5 === 0 ? 3 : 5 + Math.abs(Math.sin(simTime * 2 + i)) * 6;
          ctx.fillStyle = "rgba(156,163,175,0.35)";
          ctx.fillRect(bx, h - 32 - bh, 6, bh);
        }
      } else {
        // Cena Editada: Color Grading rico, zoom dinâmico, legenda animada e espectro vivo
        const grad = ctx.createRadialGradient(
          w * (0.5 + Math.sin(simTime * 0.9) * 0.14),
          h * 0.42,
          10,
          w * 0.5,
          h * 0.5,
          w * 0.72
        );
        grad.addColorStop(0, rgbaAccent(0.34));
        grad.addColorStop(0.55, "#0B0E18");
        grad.addColorStop(1, "#030407");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Anéis de motion graphics 60fps
        ctx.strokeStyle = rgbaAccent(0.25);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2 - 18, 62 + Math.sin(simTime * 2.5) * 6, 0, Math.PI * 2);
        ctx.stroke();

        // Selo superior de retenção
        ctx.fillStyle = "rgba(0,0,0,0.62)";
        ctx.fillRect(14, 14, 196, 26);
        ctx.fillStyle = cachedAccentHex;
        ctx.font = "700 11px 'JetBrains Mono', monospace";
        ctx.textAlign = "left";
        ctx.fillText("● REC 60FPS · COLOR DAVINCI", 24, 31);

        // Legenda dinâmica palavra por palavra (estilo Reels de alta retenção)
        const activeIdx = Math.floor(simTime * 2.8) % words.length;
        const pairStart = Math.floor(activeIdx / 2) * 2;
        const w1 = words[pairStart] || "";
        const w2 = words[pairStart + 1] || "";

        ctx.textAlign = "center";
        ctx.font = "800 26px 'Plus Jakarta Sans', sans-serif";
        const combined = (w1 + " " + w2).trim();

        ctx.shadowColor = "rgba(0,0,0,0.85)";
        ctx.shadowBlur = 16;
        ctx.fillStyle = activeIdx % 2 === 0 ? cachedAccentHex : "#FFFFFF";
        ctx.fillText(combined, w / 2, h / 2 + 4);
        ctx.shadowBlur = 0;

        ctx.font = "600 12px 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.72)";
        ctx.fillText("Silêncios cortados via IA • Gancho de 3s • CTR 6,20%", w / 2, h / 2 + 30);

        // Espectro de áudio masterizado -14 LUFS + barra de progresso
        for (let i = 0; i < 32; i++) {
          const bx = w / 2 - 160 + i * 10;
          const bh = 8 + Math.abs(Math.sin(simTime * 7.5 + i * 0.55)) * 24;
          ctx.fillStyle = i % 3 === 0 ? cachedAccentHex : "rgba(255,255,255,0.75)";
          ctx.fillRect(bx, h - 26 - bh, 6, bh);
        }

        const prog = (simTime % 6) / 6;
        ctx.fillStyle = cachedAccentHex;
        ctx.fillRect(0, h - 4, w * prog, 4);
      }

      ctx.restore();
      requestAnimationFrame(drawVideo);
    }

    requestAnimationFrame(drawVideo);
  }

  /* ------------------------------------------------------------------------
     BLOCO 3: Relógio Analógico 24h de Estúdio + Globo 3D Pontilhado (Visuvate)
     Data/Hora: 02/11/2026 01:28
     Finalidade: Trazer o acabamento técnico de Visuvate para a seção Sobre.
     ------------------------------------------------------------------------ */
  function initVisuvateWidgets() {
    const clockCanvas = document.getElementById("studioAnalogClock");
    const globeCanvas = document.getElementById("studioGlobeCanvas");

    if (clockCanvas) {
      const cCtx = clockCanvas.getContext("2d");
      clockCanvas.width = 272;
      clockCanvas.height = 272;

      function renderClock() {
        cCtx.clearRect(0, 0, 272, 272);
        const cx = 136;
        const cy = 136;
        const r = 118;

        cCtx.beginPath();
        cCtx.arc(cx, cy, r, 0, Math.PI * 2);
        cCtx.fillStyle = "#06070C";
        cCtx.fill();
        cCtx.strokeStyle = "rgba(255,255,255,0.16)";
        cCtx.lineWidth = 2;
        cCtx.stroke();

        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          cCtx.beginPath();
          cCtx.moveTo(cx + Math.cos(a) * (r - 14), cy + Math.sin(a) * (r - 14));
          cCtx.lineTo(cx + Math.cos(a) * (r - 4), cy + Math.sin(a) * (r - 4));
          cCtx.strokeStyle = i % 3 === 0 ? cachedAccentHex : "rgba(255,255,255,0.35)";
          cCtx.lineWidth = i % 3 === 0 ? 3 : 1.5;
          cCtx.stroke();
        }

        const now = new Date();
        const sec = now.getSeconds() + now.getMilliseconds() / 1000;
        const min = now.getMinutes() + sec / 60;
        const hr = (now.getHours() % 12) + min / 60;

        function hand(angle, len, width, color) {
          cCtx.beginPath();
          cCtx.moveTo(cx, cy);
          cCtx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
          cCtx.strokeStyle = color;
          cCtx.lineWidth = width;
          cCtx.lineCap = "round";
          cCtx.stroke();
        }

        hand((hr / 12) * Math.PI * 2 - Math.PI / 2, 62, 5, "#FFFFFF");
        hand((min / 60) * Math.PI * 2 - Math.PI / 2, 88, 3.5, "rgba(255,255,255,0.85)");
        hand((sec / 60) * Math.PI * 2 - Math.PI / 2, 96, 1.8, cachedAccentHex);

        cCtx.beginPath();
        cCtx.arc(cx, cy, 5, 0, Math.PI * 2);
        cCtx.fillStyle = cachedAccentHex;
        cCtx.fill();

        requestAnimationFrame(renderClock);
      }
      requestAnimationFrame(renderClock);
    }

    if (globeCanvas) {
      const gCtx = globeCanvas.getContext("2d");
      globeCanvas.width = 272;
      globeCanvas.height = 272;

      const dots = [];
      for (let lat = -70; lat <= 70; lat += 14) {
        const ringCount = Math.max(6, Math.floor(Math.cos((lat * Math.PI) / 180) * 26));
        for (let j = 0; j < ringCount; j++) {
          dots.push({
            lat: (lat * Math.PI) / 180,
            lon: (j / ringCount) * Math.PI * 2
          });
        }
      }

      function renderGlobe(now) {
        const rot = now * 0.00055;
        gCtx.clearRect(0, 0, 272, 272);
        const cx = 136;
        const cy = 136;
        const R = 112;

        gCtx.beginPath();
        gCtx.arc(cx, cy, R, 0, Math.PI * 2);
        gCtx.strokeStyle = "rgba(255,255,255,0.12)";
        gCtx.lineWidth = 1.5;
        gCtx.stroke();

        dots.forEach(function (d) {
          const lon = d.lon + rot;
          const x = Math.cos(d.lat) * Math.sin(lon);
          const y = -Math.sin(d.lat);
          const z = Math.cos(d.lat) * Math.cos(lon);
          if (z > -0.1) {
            const alpha = Math.max(0.12, z * 0.85);
            gCtx.beginPath();
            gCtx.arc(cx + x * R, cy + y * R, 2.1, 0, Math.PI * 2);
            gCtx.fillStyle = "rgba(255,255,255," + alpha.toFixed(2) + ")";
            gCtx.fill();
          }
        });

        // Marcador luminoso de Florianópolis (-27.59, -48.54)
        const flnLat = (-27.6 * Math.PI) / 180;
        const flnLon = (-48.5 * Math.PI) / 180 + rot;
        const fx = Math.cos(flnLat) * Math.sin(flnLon);
        const fy = -Math.sin(flnLat);
        const fz = Math.cos(flnLat) * Math.cos(flnLon);
        if (fz > 0) {
          gCtx.beginPath();
          gCtx.arc(cx + fx * R, cy + fy * R, 5.5, 0, Math.PI * 2);
          gCtx.fillStyle = cachedAccentHex;
          gCtx.fill();
        }

        requestAnimationFrame(renderGlobe);
      }
      requestAnimationFrame(renderGlobe);
    }
  }

  /* ------------------------------------------------------------------------
     BLOCO 4: Gaveta de Design Tokens ao Vivo ("TEMA [T]" estilo Marco Madonna)
     e Preview Flutuante na Lista de Projetos (estilo Fabian / Aparelho)
     Data/Hora: 02/11/2026 01:28
     Finalidade: Permitir experimentação estética instantânea e navegação visual.
     ------------------------------------------------------------------------ */
  function initTokensDrawerAndPreview() {
    const trigger = document.getElementById("tokensDrawerTrigger");
    const panel = document.getElementById("tokensDrawerPanel");
    const closeBtn = document.getElementById("tokensDrawerClose");
    const themeBtns = document.querySelectorAll("[data-set-accent]");
    const cornerBtns = document.querySelectorAll("[data-set-corners]");

    function toggleDrawer(force) {
      if (!panel) return;
      const next = typeof force === "boolean" ? force : !panel.classList.contains("is-open");
      panel.classList.toggle("is-open", next);
      if (NS.sfx) NS.sfx.click();
    }

    if (trigger) trigger.addEventListener("click", function () { toggleDrawer(); });
    if (closeBtn) closeBtn.addEventListener("click", function () { toggleDrawer(false); });

    window.addEventListener("keydown", function (e) {
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      if ((e.key === "t" || e.key === "T") && !e.ctrlKey && !e.metaKey && !e.altKey) {
        toggleDrawer();
      }
    });

    try {
      const savedTheme = localStorage.getItem("mattheus_neon_theme");
      if (savedTheme) {
        if (savedTheme === "violet") {
          document.documentElement.removeAttribute("data-accent-theme");
        } else {
          document.documentElement.setAttribute("data-accent-theme", savedTheme);
        }
        themeBtns.forEach(function (b) {
          b.classList.toggle("active", (b.getAttribute("data-set-accent") || "violet") === savedTheme);
        });
        refreshAccentCache();
      }
    } catch (err) {}

    themeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const theme = btn.getAttribute("data-set-accent") || "violet";
        if (theme === "violet") {
          document.documentElement.removeAttribute("data-accent-theme");
        } else {
          document.documentElement.setAttribute("data-accent-theme", theme);
        }
        try {
          localStorage.setItem("mattheus_neon_theme", theme);
        } catch (err) {}
        themeBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        refreshAccentCache();
        if (NS.sfx) NS.sfx.click();
      });
    });

    cornerBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const style = btn.getAttribute("data-set-corners") || "soft";
        if (style === "soft") {
          document.documentElement.removeAttribute("data-corner-style");
        } else {
          document.documentElement.setAttribute("data-corner-style", style);
        }
        cornerBtns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        if (NS.sfx) NS.sfx.click();
      });
    });
  }

  /* ------------------------------------------------------------------------
     BLOCO 5 (V4): Fundo Orbital 3D em Azul & Roxo/Violeta em Movimento Contínuo
     Data/Hora: 02/11/2026 10:48
     O que é: Rede tridimensional de órbitas elípticas curvas entrelaçadas,
     núcleo luminoso central, anéis de mira concêntricos e partículas de luz
     viajantes, inspirada exatamente na referência enviada por Mattheus e
     colorida em Azul Elétrico + Roxo/Violeta.
     ------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------
     BLOCO 5 (V7 - Awwwards Standard): Onda Futurista 3D de Linhas Suaves &
     Partículas Luminosas Lentas (Substitui o antigo emaranhado de órbitas)
     Data/Hora: 02/11/2026 15:28
     Finalidade: Criar um horizonte fluido 3D cinematográfico em câmera lenta,
     sem poluição visual, com perspectiva real, nós luminosos e reação suave ao mouse.
     ------------------------------------------------------------------------ */
  function initOrbitalConstellationBg() {
    const canvas = document.getElementById("orbitalConstellationCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = window.innerWidth;
    let h = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    function resizeBg() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }

    resizeBg();
    window.addEventListener("resize", resizeBg);
    window.addEventListener("pointermove", function (e) {
      targetTiltX = (e.clientX / Math.max(1, w) - 0.5) * 90;
      targetTiltY = (e.clientY / Math.max(1, h) - 0.5) * 45;
    });

    /* Configuração da Grade 3D da Onda */
    const COLS = 54;
    const ROWS = 32;
    const FOV = 740;

    function renderSmoothWave(now) {
      /* Velocidade ultra-lenta e majestosa (câmera lenta cinematográfica) */
      const t = now * 0.00038;
      currentTiltX += (targetTiltX - currentTiltX) * 0.035;
      currentTiltY += (targetTiltY - currentTiltY) * 0.035;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5 + currentTiltX * 0.35;
      const cy = h * 0.62 + currentTiltY * 0.25;
      const spreadX = Math.max(1300, w * 1.5);
      const startX = -spreadX * 0.5;
      const stepX = spreadX / (COLS - 1);
      const startZ = 160;
      const depthSpan = 1100;
      const stepZ = depthSpan / (ROWS - 1);

      /* Matriz 2D de pontos projetados para desenhar curvas e partículas */
      const grid = [];

      for (let r = 0; r < ROWS; r++) {
        const rowPoints = [];
        const z = startZ + r * stepZ;
        const zNorm = r / (ROWS - 1); // 0 (frente) a 1 (fundo)

        for (let c = 0; c < COLS; c++) {
          const x = startX + c * stepX;
          const cNorm = c / (COLS - 1);

          /* Ondulação suave com múltiplos harmônicos lentos */
          const waveA = Math.sin(cNorm * 6.5 + t * 2.0) * 64;
          const waveB = Math.cos(zNorm * 5.5 - t * 1.6) * 48;
          const waveC = Math.sin((cNorm * 4.2 + zNorm * 4.6) + t * 1.2) * 36;
          const y = waveA + waveB + waveC;

          /* Projeção de perspectiva 3D */
          const scale = FOV / (FOV + z);
          const px = cx + x * scale;
          const py = cy + (y + 120) * scale;

          /* Alpha baseado na profundidade (efeito neblina suave no horizonte) */
          const depthFade = Math.sin(zNorm * Math.PI) * 0.85 + 0.15;
          const edgeFade = Math.sin(cNorm * Math.PI);
          const alpha = Math.max(0.02, Math.min(0.85, depthFade * edgeFade));

          rowPoints.push({
            x: px,
            y: py,
            scale: scale,
            alpha: alpha,
            elevation: (y + 148) / 296 // 0 (vale) a 1 (crista)
          });
        }
        grid.push(rowPoints);
      }

      /* 1. Traçar as Linhas Suaves da Onda (Conexões horizontais por linha) */
      for (let r = 0; r < ROWS; r++) {
        const pts = grid[r];
        if (!pts || pts.length < 2) continue;

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);

        for (let c = 1; c < COLS; c++) {
          const prev = pts[c - 1];
          const curr = pts[c];
          const mx = (prev.x + curr.x) * 0.5;
          const my = (prev.y + curr.y) * 0.5;
          ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
        }
        ctx.lineTo(pts[COLS - 1].x, pts[COLS - 1].y);

        const rNorm = r / (ROWS - 1);
        const lineAlpha = (1.0 - rNorm * 0.7) * 0.18;
        ctx.strokeStyle = rgbaNeon(lineAlpha);
        ctx.lineWidth = Math.max(0.65, 1.35 * (1.0 - rNorm * 0.5));
        ctx.stroke();
      }

      /* 2. Traçar Conexões Longitudinais Intercaladas (Gera a Malha Futurista) */
      for (let c = 0; c < COLS; c += 2) {
        ctx.beginPath();
        ctx.moveTo(grid[0][c].x, grid[0][c].y);
        for (let r = 1; r < ROWS; r++) {
          const pt = grid[r][c];
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = rgbaAccent(0.05);
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      /* 3. Desenhar Nós e Partículas Luminosas no Padrão Awwwards */
      for (let r = 0; r < ROWS; r++) {
        const pts = grid[r];
        for (let c = 0; c < COLS; c++) {
          const pt = pts[c];
          if (pt.alpha < 0.05) continue;

          const dotRadius = Math.max(0.75, 2.4 * pt.scale);

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, dotRadius, 0, Math.PI * 2);

          if (pt.elevation > 0.65) {
            /* Cristas da onda acendem em branco pérola luminoso */
            ctx.fillStyle = "rgba(255, 255, 255, " + (pt.alpha * 0.95) + ")";
          } else {
            /* Vales e encostas no tom Neon ativo */
            ctx.fillStyle = rgbaNeon(pt.alpha * 0.75);
          }
          ctx.fill();

          /* Brilho halo extra nos nós de crista mais próximos */
          if (pt.elevation > 0.78 && pt.scale > 0.62 && (c % 2 === 0)) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, dotRadius * 2.6, 0, Math.PI * 2);
            ctx.fillStyle = rgbaNeon(pt.alpha * 0.25);
            ctx.fill();
          }
        }
      }

      ctx.restore();
      requestAnimationFrame(renderSmoothWave);
    }

    refreshAccentCache();
    requestAnimationFrame(renderSmoothWave);
  }

  /* ------------------------------------------------------------------------
     BLOCO 6 (V4): Vórtice 3D de Projetos "Minhas Obras" (Estilo Visuvate)
     Data/Hora: 02/11/2026 10:48
     O que é: Palco 3D interativo onde 10 telas de projetos orbitam em um anel
     diagonal inclinado, passando por trás (z < 0) e pela frente (z >= 0) do
     título monumental "Minhas Obras", sobre ondas energéticas azuis/roxas.
     ------------------------------------------------------------------------ */
  function initVisuvate3DVortex() {
    const stage = document.getElementById("vortexStage3D");
    const backLayer = document.getElementById("vortexLayerBack");
    const frontLayer = document.getElementById("vortexLayerFront");
    const waveCanvas = document.getElementById("vortexWaveCanvas");

    if (!stage || !backLayer || !frontLayer) return;

    const VORTEX_ITEMS = [
      {
        projectId: "site-vania",
        studioKey: "sites",
        pill: "Quiet Luxury · Imóveis",
        title: "Acervo Quiet Luxury",
        sub: "Liquid Glass, NDA & Admin WebP",
        img: "assets/img/site-vania-tela.png",
        light: false
      },
      {
        projectId: "easycode",
        studioKey: "ide",
        pill: "SaaS no Ar · WebAssembly",
        title: "EasyCode",
        sub: "Python, JS & SQL em 0ms",
        img: "assets/img/easycode.png",
        light: false
      },
      {
        projectId: "orion",
        studioKey: "orion",
        pill: "Super App IA · Mobile",
        title: "Super App Órion IA",
        sub: "React Native + FastAPI + DPAPI",
        img: "assets/img/orion-home.png",
        light: false
      },
      {
        projectId: "hub-hom",
        studioKey: "sites",
        pill: "23 Telas · Cloudflare KV",
        title: "Hub Corporativo & BI",
        sub: "Access OTP & Edição Ao Vivo",
        img: "assets/img/hub-marketing.png",
        light: false
      },
      {
        projectId: "vigia-ads",
        studioKey: "sites",
        pill: "Martech & IA · Z-Score",
        title: "Portal Martech & Tráfego",
        sub: "GTM, Google Ads & WhatsApp 120s",
        img: "assets/img/conecta-dados-tela.png",
        light: false
      },
      {
        projectId: "pastas-barra",
        studioKey: "win11",
        pill: "Windows 11 Nativo",
        title: "Pastas na Barra",
        sub: "C# / WPF · UI Acrílica Fluent",
        img: "assets/img/pastas-barra-1.png",
        light: false
      },
      {
        projectId: "site-vania-acervo",
        studioKey: "sites",
        pill: "Curadoria Off-Market",
        title: "Acervo Residencial",
        sub: "Design 100% Personalizado",
        img: "assets/img/site-vania-acervo.png",
        light: false
      },
      {
        projectId: "crm-manu",
        studioKey: "crm",
        pill: "Sistema CRM & Caixa",
        title: "Pipeline Comercial",
        sub: "Kanban Comercial Ao Vivo",
        customBg: "linear-gradient(155deg, rgba(255,255,255,0.08) 0%, rgba(10,14,26,0.95) 100%)",
        customTextDark: false,
        light: false
      },
      {
        projectId: "reels-studio",
        studioKey: "video",
        pill: "Motion 3D & Reels 60fps",
        title: "Edição Cinematográfica",
        sub: "DaVinci · Whisper GPU · -14 LUFS",
        customBg: "linear-gradient(135deg, rgba(8,11,22,0.92) 0%, rgba(15,23,42,0.95) 100%)",
        light: false
      },
      {
        projectId: "infnet-app",
        studioKey: "orion",
        pill: "Mobile Acadêmico",
        title: "Super App Acadêmico",
        sub: "Aulas ao vivo & RAG Manual",
        img: "assets/img/hub-rotina.png",
        light: false
      }
    ];

    /* Cria os 10 cartões DOM do vórtice */
    const cardEls = VORTEX_ITEMS.map(function (item) {
      const el = document.createElement("article");
      el.className = "vortex-card-3d" + (item.light ? " is-light-ui" : "");
      el.setAttribute("data-cursor", "TESTAR OBRA");

      let mediaHtml = "";
      if (item.img) {
        mediaHtml = "<img class='vortex-bg-img' src='" + item.img + "' alt='" + item.title + "' loading='lazy'>";
      }

      const bgStyle = item.customBg ? "style='background:" + item.customBg + ";'" : "";
      const titleClr = item.customTextDark ? "style='color:#0F172A;'" : "";
      const subClr = item.customTextDark ? "style='color:#334155;font-weight:600;'" : "";
      const shadeStyle = item.customTextDark ? "style='background:linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.65) 100%);'" : "";

      el.innerHTML =
        "<div class='vortex-card-inner' " + bgStyle + ">" +
          mediaHtml +
          "<div class='vortex-card-shade' " + shadeStyle + "></div>" +
          "<div class='vortex-card-top'>" +
            "<span class='vortex-card-pill'>" + item.pill + "</span>" +
          "</div>" +
          "<div class='vortex-card-bottom'>" +
            "<strong " + titleClr + ">" + item.title + "</strong>" +
            "<span " + subClr + ">" + item.sub + "</span>" +
          "</div>" +
        "</div>";

      el.addEventListener("click", function () {
        if (movedDuringDrag) return;
        if (NS.sfx) NS.sfx.click();
        if (item.studioKey && typeof NS.jumpToLiveDemo === "function") {
          NS.jumpToLiveDemo(item.studioKey, item.projectId);
        } else if (typeof NS.openProjectModal === "function") {
          NS.openProjectModal(item.projectId);
        }
      });

      backLayer.appendChild(el);
      return { el: el, item: item, currentLayer: "back" };
    });

    /* Arrasto interativo com inércia + desaceleração suave no hover */
    let orbitPhase = 0.35;
    let velocity = 0.0034;
    let isDragging = false;
    let isHoveringStage = false;
    let hoverFactor = 1.0;
    let dragStartX = 0;
    let movedDuringDrag = false;
    let isVisible = true;

    stage.addEventListener("pointerenter", function () { isHoveringStage = true; });
    stage.addEventListener("pointerleave", function () { isHoveringStage = false; });

    stage.addEventListener("pointerdown", function (e) {
      isDragging = true;
      dragStartX = e.clientX;
      movedDuringDrag = false;
    });

    window.addEventListener("pointermove", function (e) {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 6) movedDuringDrag = true;
      orbitPhase += dx * 0.0055;
      velocity = dx * 0.00045;
      dragStartX = e.clientX;
    });

    window.addEventListener("pointerup", function () {
      if (!isDragging) return;
      isDragging = false;
      setTimeout(function () { movedDuringDrag = false; }, 60);
    });

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { isVisible = en.isIntersecting; });
      }, { threshold: 0.04 });
      obs.observe(stage);
    }

    /* Ondas energéticas azuis/roxas estilo Visuvate no fundo do palco */
    let wCtx = waveCanvas ? waveCanvas.getContext("2d") : null;
    function renderWaves(t) {
      if (!wCtx || !waveCanvas) return;
      const rect = waveCanvas.parentElement.getBoundingClientRect();
      const cw = Math.max(300, Math.floor(rect.width));
      const ch = Math.max(360, Math.floor(rect.height));
      if (waveCanvas.width !== cw || waveCanvas.height !== ch) {
        waveCanvas.width = cw;
        waveCanvas.height = ch;
      }

      wCtx.clearRect(0, 0, cw, ch);
      for (let k = 0; k < 7; k++) {
        wCtx.beginPath();
        for (let x = 0; x <= cw; x += 22) {
          const y = ch * (0.18 + k * 0.11) +
            Math.sin(x * 0.0045 + t * (0.7 + k * 0.12) + k) * 62 +
            Math.cos(x * 0.0022 - t * 0.5 + k * 1.7) * 36;
          if (x === 0) wCtx.moveTo(x, y);
          else wCtx.lineTo(x, y);
        }
        wCtx.strokeStyle = k % 2 === 0 ? rgbaNeon(0.34) : rgbaAccent(0.28);
        wCtx.lineWidth = k === 3 ? 2.6 : 1.5;
        wCtx.shadowColor = cachedNeonHex;
        wCtx.shadowBlur = 20;
        wCtx.stroke();
        wCtx.shadowBlur = 0;
      }
    }

    function animateVortex(now) {
      const t = now * 0.001;
      if (isVisible) {
        renderWaves(t);

        if (!isDragging) {
          const targetFactor = isHoveringStage ? 0.22 : 1.0;
          hoverFactor += (targetFactor - hoverFactor) * 0.08;
          velocity += (0.0033 * hoverFactor - velocity) * 0.05;
          orbitPhase += velocity;
        }

        const stRect = stage.getBoundingClientRect();
        const rx = Math.min(545, stRect.width * 0.43);
        const corridorHalfY = Math.min(235, Math.max(152, stRect.height * 0.37));
        const total = cardEls.length;

        cardEls.forEach(function (obj, idx) {
          const ang = orbitPhase + (idx / total) * Math.PI * 2;
          /* Corredor elíptico aberto: arcos passam acima e abaixo de "Minhas Obras" sem apagar o título */
          const rawX = Math.cos(ang) * rx;
          const depthZ = Math.sin(ang); // -1 (arco superior traseiro) -> +1 (arco inferior frontal)
          const rawY = -rawX * 0.16 + depthZ * corridorHalfY;

          const scale = 0.56 + (depthZ + 1) * 0.22; // 0.56 atrás -> 1.00 na frente
          const rotY = -Math.cos(ang) * 24;
          const rotZ = -5 + Math.sin(ang) * 5;
          const opacity = 0.44 + (depthZ + 1) * 0.28;

          const wantLayer = depthZ >= 0.05 ? "front" : "back";
          if (obj.currentLayer !== wantLayer) {
            obj.currentLayer = wantLayer;
            (wantLayer === "front" ? frontLayer : backLayer).appendChild(obj.el);
          }

          obj.el.style.zIndex = String(Math.round((depthZ + 1) * 100));
          obj.el.style.opacity = Math.min(1, opacity).toFixed(2);
          obj.el.style.transform =
            "translate3d(" + rawX.toFixed(1) + "px," + rawY.toFixed(1) + "px,0) " +
            "scale(" + scale.toFixed(3) + ") " +
            "rotateY(" + rotY.toFixed(1) + "deg) " +
            "rotateZ(" + rotZ.toFixed(1) + "deg)";
        });
      }

      requestAnimationFrame(animateVortex);
    }

    requestAnimationFrame(animateVortex);
  }

  /* ------------------------------------------------------------------------
     BLOCO 7 (V6): Spotlight Radial 3D Guiado pelo Cursor (Estilo 26-card-3d)
     Data/Hora: 02/11/2026 12:33
     Finalidade: Alimentar --mouse-x e --mouse-y nos cartões .spotlight-card.
     ------------------------------------------------------------------------ */
  function initSpotlightCards() {
    document.addEventListener("pointermove", function (e) {
      const card = e.target && e.target.closest ? e.target.closest(".spotlight-card") : null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", (e.clientX - r.left).toFixed(0) + "px");
      card.style.setProperty("--mouse-y", (e.clientY - r.top).toFixed(0) + "px");
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initOrbitalConstellationBg();
    initVisuvate3DVortex();
    initIsometric3DCards();
    initReelsStudioPlayer();
    initVisuvateWidgets();
    initTokensDrawerAndPreview();
    initSpotlightCards();
  });
})();
