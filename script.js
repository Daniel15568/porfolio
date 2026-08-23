(() => {
  // Year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".navToggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      const inside = nav.contains(e.target) || toggle.contains(e.target);
      if (!inside) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Projects filters
  const filterButtons = document.querySelectorAll(".filterBtn");
  const cards = document.querySelectorAll(".projectCard");

  if (filterButtons.length && cards.length) {
    const setActive = (btn) => {
      filterButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    };

    const applyFilter = (tag) => {
      cards.forEach(card => {
        const tags = (card.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
        const show = (tag === "all") || tags.includes(tag);
        card.style.display = show ? "" : "none";
      });
    };

    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tag = btn.getAttribute("data-filter");
        setActive(btn);
        applyFilter(tag);
      });
    });

    // Default
    applyFilter("all");
  }

  // Homepage category links open the matching work lane before scrolling.
  const openWorkLane = (hash) => {
    if (!hash || !hash.startsWith("#")) return;
    const target = document.querySelector(hash);
    if (target?.matches("details.work-lane")) target.open = true;
  };

  document.querySelectorAll(".work-index a").forEach(link => {
    link.addEventListener("click", () => openWorkLane(link.hash));
  });
  openWorkLane(window.location.hash);

  // Preserve the reader's exact place before opening a case study.
  document.querySelectorAll("[data-story-link]").forEach(link => {
    link.addEventListener("click", () => {
      try {
        window.sessionStorage.setItem("portfolio-return-y", String(window.scrollY));
      } catch (_) {
        // Browser history restoration remains the fallback.
      }
    });
  });

  const restorePortfolioPosition = () => {
    if (!document.querySelector("[data-story-link]")) return;

    try {
      const storedPosition = window.sessionStorage.getItem("portfolio-return-y");
      if (storedPosition === null) return;

      window.sessionStorage.removeItem("portfolio-return-y");
      window.requestAnimationFrame(() => window.scrollTo(0, Number(storedPosition)));
    } catch (_) {
      // The browser's native history restoration still applies.
    }
  };

  window.addEventListener("pageshow", restorePortfolioPosition);

  // Story pages return to the exact portfolio position when reached from this site.
  document.querySelectorAll("[data-story-back]").forEach(link => {
    link.addEventListener("click", (event) => {
      let cameFromThisSite = false;

      try {
        cameFromThisSite = Boolean(document.referrer) &&
          new URL(document.referrer).origin === window.location.origin;
      } catch (_) {
        cameFromThisSite = false;
      }

      if (cameFromThisSite && window.history.length > 1) {
        event.preventDefault();
        window.history.back();
      }
    });
  });
})();
