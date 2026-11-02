/* ==========================================================================
   Arquivo: js/audio-cursor.js
   Data/Hora: 02/11/2026 00:36
   O que é: Motor sensorial de micro-interações do portfólio de Mattheus Moraes:
   síntese de áudio procedural tátil via Web Audio API + cursor contextual
   magnético + spotlight em cartões + paralaxe 3D suave no retrato de estúdio.
   O que foi feito e finalidade de cada bloco:
     1. Web Audio Synthesizer: Gera cliques harmônicos sutis em tempo real sem
        arquivos MP3 pesados, ativável pelo botão "Som Tátil" no cabeçalho.
     2. Contextual Cursor Pill: Exibe rótulos editoriais ("INTERAGIR", "VER CASE",
        "COPIAR") ao passar o mouse sobre áreas clicáveis no desktop.
     3. Spotlight & Studio Portrait Parallax: Atualiza coordenadas CSS nos cards
        e inclina sutilmente o retrato chiaroscuro e seus badges em 3D.
   ========================================================================== */

(function () {
  "use strict";

  const NS = (window.MattheusPortfolio = window.MattheusPortfolio || {});

  /* ------------------------------------------------------------------------
     BLOCO 1: Sintetizador Tátil Procedural (Web Audio API)
     Data/Hora: 02/11/2026 00:36
     Finalidade: Fornecer resposta sonora elegante e opcional em interações.
     ------------------------------------------------------------------------ */
  let audioCtx = null;
  let soundEnabled = false;

  function ensureAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freqStart, freqEnd, durationSec, gainPeak, type) {
    if (!soundEnabled) return;
    try {
      ensureAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freqStart, now);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, now + durationSec);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + durationSec + 0.01);
    } catch (_) {
      /* Silencia falhas caso o navegador restrinja autoplay de áudio */
    }
  }

  NS.sfx = {
    isEnabled: function () {
      return soundEnabled;
    },
    toggle: function () {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        ensureAudioContext();
        playTone(520, 880, 0.11, 0.045, "sine");
      }
      return soundEnabled;
    },
    hover: function () {
      playTone(640, 720, 0.04, 0.014, "sine");
    },
    click: function () {
      playTone(440, 680, 0.075, 0.035, "triangle");
    },
    success: function () {
      playTone(523.25, 1046.5, 0.16, 0.045, "sine");
    }
  };

  /* ------------------------------------------------------------------------
     BLOCO 2: Cursor Magnético, Spotlight nos Cards e Paralaxe 3D do Retrato
     Data/Hora: 02/11/2026 00:36
     Finalidade: Criar percepção tátil de estúdio internacional no desktop.
     ------------------------------------------------------------------------ */
  function initCursorAndParallax() {
    const cursorEl = document.getElementById("customCursorPill");
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (cursorEl && hasFinePointer) {
      let targetX = -120;
      let targetY = -120;
      let currX = -120;
      let currY = -120;

      window.addEventListener("mousemove", function (e) {
        targetX = e.clientX;
        targetY = e.clientY + 26;

        const hovered = e.target.closest("[data-cursor]");
        if (hovered) {
          cursorEl.textContent = hovered.getAttribute("data-cursor");
          cursorEl.classList.add("is-visible");
        } else {
          cursorEl.classList.remove("is-visible");
        }
      }, { passive: true });

      function animateCursor() {
        currX += (targetX - currX) * 0.22;
        currY += (targetY - currY) * 0.22;
        cursorEl.style.left = currX.toFixed(1) + "px";
        cursorEl.style.top = currY.toFixed(1) + "px";
        requestAnimationFrame(animateCursor);
      }
      requestAnimationFrame(animateCursor);
    }

    /* Atualiza coordenadas CSS (--mouse-x, --mouse-y) nos cartões do acervo */
    document.addEventListener("mousemove", function (e) {
      const card = e.target.closest(".project-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", (e.clientX - rect.left) + "px");
      card.style.setProperty("--mouse-y", (e.clientY - rect.top) + "px");
    }, { passive: true });

    /* Paralaxe 3D sutil no palco do retrato chiaroscuro no Hero */
    const portraitStage = document.getElementById("heroPortraitStage");
    const portraitFigure = document.getElementById("heroPortraitFigure");
    const badgeLeft = document.getElementById("portraitBadgeLeft");
    const badgeRight = document.getElementById("portraitBadgeRight");

    if (portraitStage && portraitFigure && hasFinePointer) {
      portraitStage.addEventListener("mousemove", function (e) {
        const rect = portraitStage.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        portraitFigure.style.transform =
          "rotateY(" + (nx * 4.5).toFixed(2) + "deg) rotateX(" + (-ny * 3.5).toFixed(2) + "deg)";

        if (badgeLeft) {
          badgeLeft.style.transform = "translate3d(" + (nx * -10).toFixed(1) + "px, " + (ny * -8).toFixed(1) + "px, 24px)";
        }
        if (badgeRight) {
          badgeRight.style.transform = "translate3d(" + (nx * 12).toFixed(1) + "px, " + (ny * 9).toFixed(1) + "px, 30px)";
        }
      }, { passive: true });

      portraitStage.addEventListener("mouseleave", function () {
        portraitFigure.style.transform = "rotateY(0deg) rotateX(0deg)";
        if (badgeLeft) badgeLeft.style.transform = "translate3d(0, 0, 0)";
        if (badgeRight) badgeRight.style.transform = "translate3d(0, 0, 0)";
      });
    }
  }

  document.addEventListener("DOMContentLoaded", initCursorAndParallax);
})();
