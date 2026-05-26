/* =========================================================
   AGZUS — Shared site behaviors (vanilla JS, no React needed)
   ========================================================= */
(function () {
  // ---------- Scroll reveal ----------
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  // ---------- Animated counters ----------
  function initCounters() {
    const els = document.querySelectorAll("[data-counter]");
    if (!els.length) return;
    const animate = (el) => {
      const target = parseFloat(el.dataset.counter) || 0;
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const dur = parseInt(el.dataset.duration || "1800", 10);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - p, 3);
        const v = target * eased;
        el.textContent = prefix + v.toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target.toFixed(decimals) + suffix;
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => io.observe(el));
  }

  // ---------- 3D tilt cards ----------
  function initTilt() {
    const cards = document.querySelectorAll(".tilt");
    cards.forEach((card) => {
      const max = parseFloat(card.dataset.tilt || "10");
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * max;
        const ry = (px - 0.5) * max;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      });
    });
  }

  // ---------- Card glow (mouse position) ----------
  function initCardGlow() {
    const cards = document.querySelectorAll(".card-glow:not(.tilt)");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });
  }

  // ---------- Cursor follower ----------
  function initCursor() {
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
    const spot = document.createElement("div");
    spot.className = "cursor-spot";
    document.body.appendChild(spot);
    let raf;
    document.addEventListener("mousemove", (e) => {
      document.body.classList.add("has-cursor");
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        spot.style.left = e.clientX + "px";
        spot.style.top = e.clientY + "px";
      });
    });
    document.addEventListener("mouseleave", () => document.body.classList.remove("has-cursor"));
  }

  // ---------- Marker active nav link based on page ----------
  function initActiveNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link, .nav-cta").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (href === path || (path === "index.html" && href === "./") || (path === "" && href === "index.html")) {
        a.classList.add("is-active");
      }
    });
  }

  // ---------- Scroll-driven character animation ----------
  function initScrollText() {
    const stages = document.querySelectorAll(".scroll-stage");
    if (!stages.length) return;

    stages.forEach((stage) => {
      const textEl = stage.querySelector(".scroll-text");
      if (!textEl) return;

      // Split text into char spans, preserving any <span class="accent"> wrappers
      const splitNode = (node, container) => {
        node.childNodes.forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            [...child.nodeValue].forEach((c) => {
              const span = document.createElement("span");
              span.className = "ch" + (c === " " ? " space" : "");
              span.textContent = c === " " ? "\u00A0" : c;
              container.appendChild(span);
            });
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const wrap = document.createElement("span");
            wrap.className = child.className;
            container.appendChild(wrap);
            splitNode(child, wrap);
          }
        });
      };

      const flat = document.createElement("span");
      flat.style.display = "inline";
      splitNode(textEl, flat);
      textEl.innerHTML = "";
      textEl.appendChild(flat);

      const chars = Array.from(textEl.querySelectorAll(".ch"));
      if (!chars.length) return;
      const center = (chars.length - 1) / 2;

      const update = () => {
        const r = stage.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const total = r.height - vh;
        if (total <= 0) return;
        const p = Math.max(0, Math.min(1, -r.top / total));
        // Animate over first 50% of scroll range (matches Skiper31's [0, 0.5])
        const t = Math.max(0, Math.min(1, p / 0.5));
        const factor = 1 - t; // 1 at start (scattered), 0 at converged

        chars.forEach((ch, i) => {
          const d = i - center;
          const x = d * 50 * factor;
          const rotX = d * 50 * factor;
          ch.style.transform = `translate3d(${x}px,0,0) rotateX(${rotX}deg)`;
        });
      };

      update();
      let raf = null;
      const onScroll = () => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", update);
    });
  }

  // ---------- Global floating gradient orbs (light bg animation) ----------
  function initBgOrbs() {
    if (document.querySelector(".bg-orbs")) return;
    const wrap = document.createElement("div");
    wrap.className = "bg-orbs";
    const span = document.createElement("span");
    wrap.appendChild(span);
    document.body.insertBefore(wrap, document.body.firstChild);
  }

  // ---------- Per-hero tubes background (every page's hero) ----------
  async function initHeroTubes() {
    const canvases = document.querySelectorAll(".hero-tubes-canvas");
    if (!canvases.length) return;

    // Delay so layout settles
    await new Promise((r) => setTimeout(r, 100));

    let TubesCursor = null;
    try {
      const mod = await import(
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      );
      TubesCursor = mod.default;
    } catch (e) {
      console.warn("Tubes module failed to load:", e);
      return;
    }
    if (!TubesCursor) return;

    const rand = (n) =>
      Array.from(
        { length: n },
        () =>
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
      );

    canvases.forEach((canvas, idx) => {
      try {
        const app = TubesCursor(canvas, {
          tubes: {
            colors: ["#ef4444", "#8965e0", "#5e72e4"],
            lights: {
              intensity: 200,
              colors: ["#21d4fd", "#b721ff", "#f4d03f", "#ef4444"],
            },
          },
        });
        window["__heroTubes_" + idx] = app;

        const wrap = canvas.parentElement;
        const lockSize = () => {
          if (!wrap) return;
          const w = wrap.clientWidth;
          const h = wrap.clientHeight;
          if (w === 0 || h === 0) return;
          canvas.style.width = w + "px";
          canvas.style.height = h + "px";
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.floor(w * dpr);
          canvas.height = Math.floor(h * dpr);
          if (app.renderer && typeof app.renderer.setSize === "function") {
            app.renderer.setSize(w, h, false);
            app.renderer.setPixelRatio(dpr);
          }
          if (app.camera) {
            app.camera.aspect = w / h;
            app.camera.updateProjectionMatrix &&
              app.camera.updateProjectionMatrix();
          }
        };
        requestAnimationFrame(lockSize);
        window.addEventListener("resize", lockSize, { passive: true });

        canvas.addEventListener("click", () => {
          if (!app || !app.tubes) return;
          app.tubes.setColors(rand(3));
          app.tubes.setLightsColors(rand(4));
        });
      } catch (e) {
        console.warn("Hero tubes init failed:", e);
      }
    });
  }

  // ---------- Text roll effect (à la Skiper58) ----------
  function buildRollRow(text, className, stagger, center) {
    const row = document.createElement("span");
    row.className = className;
    const len = text.length;
    [...text].forEach((c, i) => {
      const span = document.createElement("span");
      span.className = "ch";
      span.textContent = c === " " ? "\u00A0" : c;
      const delay = center
        ? stagger * Math.abs(i - (len - 1) / 2)
        : stagger * i;
      span.style.transitionDelay = delay + "s";
      row.appendChild(span);
    });
    return row;
  }

  function initTextRoll() {
    const STAGGER = 0.035;
    document.querySelectorAll(".text-roll:not([data-rolled])").forEach((el) => {
      const text = el.textContent.trim();
      if (!text) return;
      const center = el.hasAttribute("data-roll-end") ? false : true;
      el.textContent = "";
      el.appendChild(buildRollRow(text, "text-roll-front", STAGGER, center));
      el.appendChild(buildRollRow(text, "text-roll-back",  STAGGER, center));
      el.setAttribute("data-rolled", "true");
    });
  }

  function applyTextRollToNav() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.classList.contains("text-roll")) return;
      // Only wrap pure-text links
      if (link.children.length > 0) return;
      link.classList.add("text-roll");
    });
  }

  // ---------- Half-screen card modal ----------
  function initCardModal() {
    if (document.getElementById("card-modal")) return;

    const modal = document.createElement("div");
    modal.id = "card-modal";
    modal.className = "card-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="card-modal-backdrop" data-close="1"></div>
      <div class="card-modal-sheet" role="dialog" aria-modal="true">
        <button class="card-modal-close" data-close="1" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="card-modal-media"><img id="card-modal-img" alt="" /></div>
        <div class="card-modal-body">
          <div class="card-modal-eyebrow" id="card-modal-eyebrow">/ Preview</div>
          <div class="card-modal-tags" id="card-modal-tags"></div>
          <h2 class="card-modal-title" id="card-modal-title"></h2>
          <p class="card-modal-desc" id="card-modal-desc"></p>
          <div class="card-modal-cta-row">
            <a class="card-modal-cta" id="card-modal-cta" href="#" target="_blank" rel="noopener">
              Visit site
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <button class="card-modal-cta-ghost" data-close="1">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const imgEl     = modal.querySelector("#card-modal-img");
    const mediaEl   = modal.querySelector(".card-modal-media");
    const eyebrowEl = modal.querySelector("#card-modal-eyebrow");
    const titleEl   = modal.querySelector("#card-modal-title");
    const descEl    = modal.querySelector("#card-modal-desc");
    const tagsEl    = modal.querySelector("#card-modal-tags");
    const ctaEl     = modal.querySelector("#card-modal-cta");

    function openWith(data) {
      // Image (or hide media if none)
      if (data.image) {
        imgEl.src = data.image;
        imgEl.alt = data.title || "";
        mediaEl.style.display = "";
      } else {
        mediaEl.style.display = "none";
      }
      eyebrowEl.textContent = data.eyebrow || "/ Preview";
      titleEl.textContent = data.title || "";
      descEl.textContent = data.description || "";
      // Tags
      tagsEl.innerHTML = "";
      (data.tags || []).forEach((t) => {
        const s = document.createElement("span");
        s.className = "card-modal-tag";
        s.textContent = t;
        tagsEl.appendChild(s);
      });
      // CTA
      if (data.href && data.href !== "#") {
        ctaEl.href = data.href;
        ctaEl.style.display = "";
        const external = /^https?:\/\//.test(data.href) && !data.href.includes(location.host);
        ctaEl.target = external ? "_blank" : "_self";
        ctaEl.firstChild.nodeValue = external ? "\n              Visit site\n              " : "\n              Open page\n              ";
      } else {
        ctaEl.style.display = "none";
      }
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("card-modal-open");
    }

    function close() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("card-modal-open");
    }

    function extract(card) {
      const img = card.querySelector("img");
      const titleEl =
        card.querySelector(".glass-card-title, h3.font-display, h3, h4");
      const descEl =
        card.querySelector(".glass-card-excerpt, p");
      const tags = [...card.querySelectorAll(".glass-tag")].map((t) => t.textContent.trim());
      const eyebrowEl = card.querySelector(".font-mono");
      return {
        image: img ? img.src : null,
        title: titleEl ? titleEl.textContent.trim() : (card.textContent.trim().slice(0, 60)),
        description: descEl ? descEl.textContent.trim() : "",
        tags,
        eyebrow: eyebrowEl ? "/ " + eyebrowEl.textContent.trim().replace(/^\//, "").trim() : "/ Preview",
        href: card.href || card.getAttribute("href") || "#",
      };
    }

    // Delegated click: any anchor card opens the modal
    document.addEventListener("click", (e) => {
      // Don't trigger if modal is open and user clicked inside it
      if (modal.classList.contains("is-open") && modal.contains(e.target)) {
        if (e.target.closest("[data-close]")) {
          e.preventDefault();
          close();
        }
        return;
      }
      const card = e.target.closest("a.glass-card, a.card-glow");
      if (!card) return;
      // Don't intercept clicks on inner anchors (none for now, but safe)
      if (e.target.closest("button")) return;
      e.preventDefault();
      const data = extract(card);
      openWith(data);
    });

    // ESC to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        close();
      }
    });
  }

  // ---------- Init ----------
  function init() {
    initBgOrbs();
    initHeroTubes();
    initReveal();
    initCounters();
    initTilt();
    initCardGlow();
    initCursor();
    initActiveNav();
    initScrollText();
    applyTextRollToNav();
    initTextRoll();
    initCardModal();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
