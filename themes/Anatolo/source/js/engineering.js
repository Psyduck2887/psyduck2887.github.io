document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".engineering-section").forEach((section) => {
    const track = section.querySelector(".engineering-card-track");
    const previous = section.querySelector(".engineering-scroll-prev");
    const next = section.querySelector(".engineering-scroll-next");
    const controls = section.querySelector(".engineering-controls");

    if (!track || !previous || !next || !controls) return;

    const cardWidth = () => {
      const card = track.querySelector(".engineering-card");
      if (!card) return track.clientWidth;
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      return card.getBoundingClientRect().width + gap;
    };

    const updateButtons = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      controls.hidden = maxScroll <= 2;
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= maxScroll - 2;
    };

    previous.addEventListener("click", () => {
      track.scrollBy({ left: -cardWidth(), behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      track.scrollBy({ left: cardWidth(), behavior: "smooth" });
    });

    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons, { passive: true });
    updateButtons();
  });
});
