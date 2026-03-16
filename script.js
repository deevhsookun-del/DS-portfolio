const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  const openMenu = () => {
    navLinks.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  };

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-controls", "site-nav-links");
  navLinks.id = "site-nav-links";

  menuToggle.addEventListener("click", () => {
    if (navLinks.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNav = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);
    if (!clickedInsideNav && !clickedToggle) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });
}

const backToTopBtn = document.querySelector(".back-to-top");

if (backToTopBtn) {
  const toggleBackToTop = () => {
    if (window.innerWidth <= 960 && window.scrollY > 260) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  };

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  window.addEventListener("resize", toggleBackToTop);
  toggleBackToTop();
}

const makeImagesInteractive = () => {
  const selectors = [
    ".hero-photo",
    ".about-image",
    ".about-gallery-item img",
    ".work-image",
    ".edu-image",
    ".capstone-image",
  ];

  document.querySelectorAll(selectors.join(",")).forEach((img) => {
    if (img.closest("a")) return;

    const src = img.getAttribute("src");
    if (!src) return;

    const link = document.createElement("a");
    link.className = "image-link";
    link.href = src;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = "Click to view full image";

    // Download works for local/same-origin images.
    const isLocal =
      !src.startsWith("http://") &&
      !src.startsWith("https://") &&
      !src.startsWith("//");
    if (isLocal) {
      const fileName = src.split("/").pop();
      if (fileName) link.setAttribute("download", fileName);
    }

    img.parentNode.insertBefore(link, img);
    link.appendChild(img);
  });
};

makeImagesInteractive();

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
