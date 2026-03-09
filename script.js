const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const revealElements = document.querySelectorAll(".reveal");

try {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("show"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
      observer.observe(el);
    });
  }
} catch {
  // Fallback: never keep content hidden if animation setup fails.
  revealElements.forEach((el) => el.classList.add("show"));
}
