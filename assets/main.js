/* =====================================================================
   Project FIZIKA — behaviour layer
   Mobile nav · sticky header · scroll reveal · stat count-up ·
   resources filtering. Vanilla JS, no dependencies, progressively
   enhanced (the site is fully usable with JS disabled).
   ===================================================================== */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Footer year ---------- */
  function setYear() {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    const btn = document.getElementById("menuToggle");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;

    const toggle = (open) => {
      const isOpen =
        open ?? menu.classList.contains("hidden-menu");
      menu.classList.toggle("hidden-menu", !isOpen);
      btn.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    btn.addEventListener("click", () => toggle());
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => toggle(false))
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.classList.contains("hidden-menu"))
        toggle(false);
    });
  }

  /* ---------- Sticky header shadow ---------- */
  function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () =>
      header.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll reveal + stat count-up ---------- */
  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      document.querySelectorAll("[data-count]").forEach((el) => {
        el.textContent = formatCount(el);
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          // stagger children within a group
          const delay = el.dataset.revealDelay || 0;
          el.style.setProperty("--reveal-delay", delay + "ms");
          el.classList.add("is-visible");
          if (el.hasAttribute("data-count")) countUp(el);
          obs.unobserve(el);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  function formatCount(el) {
    const target = parseFloat(el.dataset.count);
    return (
      (el.dataset.prefix || "") +
      target.toLocaleString() +
      (el.dataset.suffix || "")
    );
  }

  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const dur = 1500;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = prefix + val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Resources filtering ---------- */
  function initResourceFilter() {
    const grid = document.getElementById("resourceList");
    if (!grid) return;

    const rows = Array.from(grid.querySelectorAll("[data-resource]"));
    const search = document.getElementById("resourceSearch");
    const subjectBtns = Array.from(
      document.querySelectorAll("[data-subject-filter]")
    );
    const typeBtns = Array.from(document.querySelectorAll("[data-type-filter]"));
    const emptyState = document.getElementById("resourceEmpty");
    const countEl = document.getElementById("resourceCount");

    let activeSubject = "all";
    let activeType = "all";

    const apply = () => {
      const q = (search?.value || "").trim().toLowerCase();
      let shown = 0;
      rows.forEach((row) => {
        const subj = row.dataset.subject;
        const type = row.dataset.type;
        const text = row.dataset.search || row.textContent.toLowerCase();
        const matchSubject = activeSubject === "all" || subj === activeSubject;
        const matchType = activeType === "all" || type === activeType;
        const matchText = !q || text.indexOf(q) !== -1;
        const visible = matchSubject && matchType && matchText;
        row.toggleAttribute("hidden", !visible);
        if (visible) shown++;
      });

      // hide empty subject group headers
      grid.querySelectorAll("[data-group]").forEach((group) => {
        const any = group.querySelectorAll(
          "[data-resource]:not([hidden])"
        ).length;
        group.toggleAttribute("hidden", any === 0);
      });

      if (emptyState) emptyState.toggleAttribute("hidden", shown !== 0);
      if (countEl) countEl.textContent = String(shown);
    };

    const wire = (buttons, setter, toggle) => {
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const wasActive = btn.getAttribute("aria-pressed") === "true";
          buttons.forEach((b) => {
            b.setAttribute("aria-pressed", "false");
            b.classList.remove("is-active");
          });
          // With no "All" button, clicking the active chip again clears the filter.
          if (toggle && wasActive) {
            setter(null);
          } else {
            btn.setAttribute("aria-pressed", "true");
            btn.classList.add("is-active");
            setter(btn);
          }
          apply();
        });
      });
    };

    wire(subjectBtns, (btn) => (activeSubject = btn ? btn.dataset.subjectFilter : "all"), true);
    wire(typeBtns, (btn) => (activeType = btn ? btn.dataset.typeFilter : "all"), true);
    if (search) search.addEventListener("input", apply);

    const urlSubject = new URLSearchParams(location.search).get('subject');
    const urlMatch = urlSubject && subjectBtns.find(b => b.dataset.subjectFilter === urlSubject);
    if (urlMatch) urlMatch.click(); else apply();
  }

  /* ---------- Boot ---------- */
  function boot() {
    setYear();
    initMenu();
    initHeader();
    initReveal();
    initResourceFilter();
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
