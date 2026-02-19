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
})();
