(function () {
  const header = document.querySelector(".header");
  const burger = header && header.querySelector(".burger");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuCloseButton =
    mobileMenu && mobileMenu.querySelector(".mobile-nav__close-button");
  const focusableSelectors =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  if (!burger || !mobileMenu) return;

  function openMenu() {
    burger.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
    header.classList.add("is-open");
    document.body.classList.add("no-scroll");
    const first = mobileMenu.querySelector(focusableSelectors);
    if (first) first.focus();
  }
  function closeMenu() {
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    header.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    burger.focus();
  }

  burger.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    if (expanded) closeMenu();
    else openMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      mobileMenu.getAttribute("aria-hidden") === "false"
    ) {
      closeMenu();
    }
  });

  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  mobileMenu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.classList.contains("nav-link")) closeMenu();
  });

  if (mobileMenuCloseButton) {
    mobileMenuCloseButton.addEventListener("click", () => {
      closeMenu();
    });
  }
})();
