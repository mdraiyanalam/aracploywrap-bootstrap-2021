/**
 * ARAC Polywrap — site behaviour. Plain JavaScript, no build step.
 * Bootstrap's bundle (loaded before this file) provides Collapse, Carousel and ScrollSpy.
 */
(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Header: elevate once the page has scrolled. */
  function initHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Close the mobile menu after choosing a link, and with Escape.
    const menu = document.getElementById("mobile-menu");
    if (!menu || !window.bootstrap) return;
    const collapse = bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => collapse.hide()));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("show")) {
        collapse.hide();
        header.querySelector(".navbar-toggler")?.focus();
      }
    });
  }

  /**
   * Hero carousel (WAI-ARIA APG pattern): pause/play button, no autoplay for reduced motion,
   * rotation stops when keyboard focus enters, hidden slides are inert.
   */
  function initHeroCarousel() {
    const element = document.getElementById("hero-carousel");
    if (!element || !window.bootstrap) return;
    const carousel = bootstrap.Carousel.getOrCreateInstance(element, {
      interval: 6000,
      ride: reducedMotion ? false : "carousel",
      pause: "hover",
      touch: true,
    });
    const toggle = document.getElementById("hero-toggle");
    const icon = toggle?.querySelector(".bi");
    let playing = !reducedMotion;

    const setPlaying = (value) => {
      playing = value;
      if (playing) carousel.cycle();
      else carousel.pause();
      if (!toggle || !icon) return;
      toggle.setAttribute("aria-label", playing ? "Pause automatic slide show" : "Start automatic slide show");
      icon.className = `bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`;
    };

    if (reducedMotion) {
      carousel.pause();
      toggle?.remove();
    } else {
      toggle?.addEventListener("click", () => setPlaying(!playing));
    }

    // Keyboard focus entering the carousel stops rotation (WCAG 2.2.2).
    element.addEventListener("focusin", (event) => {
      const fromOutside = !element.contains(event.relatedTarget);
      if (playing && fromOutside && event.target.matches(":focus-visible")) setPlaying(false);
    });

    // Keep hidden slides out of the tab order and the accessibility tree.
    const syncSlides = () => {
      element.querySelectorAll(".carousel-item").forEach((slide) => {
        const active = slide.classList.contains("active");
        slide.inert = !active;
        slide.setAttribute("aria-hidden", String(!active));
      });
    };
    syncSlides();
    element.addEventListener("slid.bs.carousel", syncSlides);
  }

  /** Runs `callback(element)` once, the first time each element scrolls into view. */
  function onFirstView(elements, callback, threshold = 0.4) {
    if (!("IntersectionObserver" in window)) {
      elements.forEach(callback);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          callback(entry.target);
        });
      },
      { threshold },
    );
    elements.forEach((element) => observer.observe(element));
  }

  /** Statistics count up from 0 when they scroll into view. The HTML holds the final value. */
  function initCountUp() {
    const counters = [...document.querySelectorAll("[data-count-to]")];
    if (reducedMotion || counters.length === 0) return;
    counters.forEach((el) => (el.textContent = "0"));
    onFirstView(counters, (el) => {
      const target = Number(el.dataset.countTo);
      const duration = 1600;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /** Service-level rings fill when they scroll into view. */
  function initMeters() {
    const meters = [...document.querySelectorAll(".meter")];
    if (reducedMotion || meters.length === 0) return;
    meters.forEach((meter) => meter.classList.add("is-pending"));
    onFirstView(meters, (meter) => meter.classList.remove("is-pending"), 0.5);
  }

  /** Floating "Back to top" button, shown after one screen of scrolling. */
  function initBackToTop() {
    const button = document.getElementById("back-to-top");
    if (!button) return;
    const onScroll = () => {
      const visible = window.scrollY > window.innerHeight;
      button.classList.toggle("is-visible", visible);
      button.inert = !visible;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    button.addEventListener("click", (event) => {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      // `detail === 0` means the click came from the keyboard: move focus to the top too.
      if (event.detail === 0) document.querySelector(".skip-link")?.focus({ preventScroll: true });
    });
  }

  /** "© 2024–2026" with the current year. */
  function initCopyright() {
    document.querySelectorAll("[data-copyright-since]").forEach((el) => {
      const since = Number(el.dataset.copyrightSince);
      const now = new Date().getFullYear();
      el.textContent = now > since ? `${since}–${now}` : String(since);
    });
  }

  /** Print / save-as-PDF button on the catalogue page. */
  function initPrint() {
    document.querySelectorAll("[data-action='print']").forEach((button) => {
      button.addEventListener("click", () => window.print());
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initHeroCarousel();
    initCountUp();
    initMeters();
    initBackToTop();
    initCopyright();
    initPrint();
  });
})();
