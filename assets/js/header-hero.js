(function () {
  const container = document.querySelector(".header-hero__images");
  if (!container) return;

  // Entrance: observe when section is visible
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          container.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  obs.observe(container);

  // Speech-bubble interactions: show on hover/focus and occasionally animate
  const bubbles = Array.from(container.querySelectorAll(".bubble"));
  const items = Array.from(container.querySelectorAll(".mosaic-item"));

  // Show bubble on keyboard focus (mosaic-item has tabindex=0)
  items.forEach((item) => {
    item.addEventListener("focus", () => {
      const bubble = item.querySelector(".bubble");
      if (bubble) bubble.classList.add("animate");
    });
    item.addEventListener("blur", () => {
      const bubble = item.querySelector(".bubble");
      if (bubble) bubble.classList.remove("animate");
    });
    item.addEventListener("mouseenter", () => {
      const bubble = item.querySelector(".bubble");
      if (bubble) bubble.classList.add("animate");
    });
    item.addEventListener("mouseleave", () => {
      const bubble = item.querySelector(".bubble");
      if (bubble) bubble.classList.remove("animate");
    });
  });

  // Periodically animate random bubbles (decorative) to add life
  function pulseRandomBubble() {
    if (bubbles.length === 0) return;
    const idx = Math.floor(Math.random() * bubbles.length);
    const bubble = bubbles[idx];
    bubble.classList.add("animate");
    setTimeout(() => bubble.classList.remove("animate"), 1700);
  }
  // Start periodic pulses after the container is visible
  container.addEventListener("animationstart", () => {});
  let startPulse = false;
  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startPulse) {
          startPulse = true;
          // initial random pulses
          pulseRandomBubble();
          setInterval(pulseRandomBubble, 3600 + Math.random() * 2000);
        }
      });
    },
    { threshold: 0.25 }
  );
  visibilityObserver.observe(container);

  // Accessibility: if a bubble-only element is focusable, it's decorative - ensure it doesn't steal tab
  const bubbleOnly = container.querySelectorAll(".bubble-only");
  bubbleOnly.forEach((el) => el.setAttribute("aria-hidden", "true"));
})();
