document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav");

  mobileMenuBtn.addEventListener("click", function () {
    mobileNav.classList.toggle("active");
    this.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll(".mobile-nav-links .nav-link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    });
  });

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.setAttribute("data-theme", "dark");
  }

  themeToggle.addEventListener("click", function () {
    const currentTheme = document.body.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });

  // Read More Button
  const readMoreBtn = document.getElementById("read-more-btn");
  const extraContent = document.querySelector(".extra-content");

  readMoreBtn.addEventListener("click", function () {
    extraContent.classList.toggle("hidden");
    this.innerHTML = extraContent.classList.contains("hidden")
      ? 'Read More <i class="fas fa-chevron-down"></i>'
      : 'Read Less <i class="fas fa-chevron-up"></i>';
  });

  // Animate progress bars when scrolled into view
  const progressBars = document.querySelectorAll(".progress");

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const percent = bar.getAttribute("data-percent");
      if (isElementInViewport(bar.parentElement)) {
        bar.style.width = percent + "%";
      }
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  window.addEventListener("scroll", animateProgressBars);
  animateProgressBars(); // Run once on page load

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth",
        });
      }
    });
  });

  // Form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Here you would typically send the form data to a server
      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
    });
  }

  // Animate elements on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".hero-text, .hero-image, .about-image, .about-text, .skill-item, .card, .project-card"
    );

    elements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.style.animation = "fadeIn 0.8s ease-out forwards";
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on page load
});
