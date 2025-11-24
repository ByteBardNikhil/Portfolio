/* ===========================
   THEME TOGGLE FUNCTIONALITY
   =========================== */

// Get theme toggle button
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);

// Update icon based on current theme
if (currentTheme === "dark") {
  icon.classList.remove("fa-moon");
  icon.classList.add("fa-sun");
}

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  const theme = body.getAttribute("data-theme");

  if (theme === "light") {
    body.setAttribute("data-theme", "dark");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

/* ===========================
   MOBILE MENU TOGGLE
   =========================== */

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

mobileMenuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = mobileMenuToggle.querySelector("i");

  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = mobileMenuToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

/* ===========================
   SMOOTH SCROLL WITH OFFSET
   =========================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offset = 80; // Navbar height
      const targetPosition = target.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

/* ===========================
   NAVBAR SCROLL EFFECT
   =========================== */

const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add shadow on scroll
  if (currentScroll > 50) {
    navbar.style.boxShadow = "0 5px 20px var(--shadow)";
  } else {
    navbar.style.boxShadow = "0 2px 10px var(--shadow)";
  }

  lastScroll = currentScroll;
});

/* ===========================
   SCROLL ANIMATIONS
   =========================== */

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections and cards
document
  .querySelectorAll("section, .glass-card, .project-card, .pricing-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

/* ===========================
   CONTACT FORM HANDLING
   =========================== */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Create success message
  const successMessage = document.createElement("div");
  successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--gradient-1);
        color: white;
        padding: 30px 50px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        animation: fadeIn 0.3s ease;
    `;
  successMessage.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 15px;"></i>
        <h3 style="margin-bottom: 10px;">Message Sent Successfully!</h3>
        <p>Thank you, ${name}. I'll get back to you soon.</p>
    `;

  document.body.appendChild(successMessage);

  // Remove message after 3 seconds
  setTimeout(() => {
    successMessage.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(successMessage);
    }, 300);
  }, 3000);

  // Reset form
  contactForm.reset();

  // In a real application, you would send this data to a server
  console.log("Form Data:", { name, email, subject, message });
});

/* ===========================
   TYPING EFFECT FOR HERO SECTION
   =========================== */

const heroDescription = document.querySelector(".hero-description");
const text = heroDescription.textContent;
heroDescription.textContent = "";

let charIndex = 0;

function typeWriter() {
  if (charIndex < text.length) {
    heroDescription.textContent += text.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 30);
  }
}

// Start typing effect after page loads
window.addEventListener("load", () => {
  setTimeout(typeWriter, 500);
});

/* ===========================
   SKILL ITEMS HOVER EFFECT
   =========================== */

const skillItems = document.querySelectorAll(".skill-item");

skillItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) rotate(5deg)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotate(0)";
  });
});

/* ===========================
   PROJECT CARDS TILT EFFECT
   =========================== */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

/* ===========================
   SCROLL TO TOP BUTTON
   =========================== */

const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-2);
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 20px var(--shadow);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    scrollToTopBtn.style.opacity = "1";
    scrollToTopBtn.style.visibility = "visible";
  } else {
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.visibility = "hidden";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

scrollToTopBtn.addEventListener("mouseenter", function () {
  this.style.transform = "scale(1.1) translateY(-5px)";
});

scrollToTopBtn.addEventListener("mouseleave", function () {
  this.style.transform = "scale(1) translateY(0)";
});

/* ===========================
   ANIMATED COUNTER FOR STATS
   =========================== */

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

/* ===========================
   PARALLAX EFFECT ON SCROLL
   =========================== */

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".hero::before, .hero::after"
  );

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

/* ===========================
   FORM INPUT ANIMATIONS
   =========================== */

const formInputs = document.querySelectorAll(
  ".form-group input, .form-group textarea"
);

formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateX(5px)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateX(0)";
  });
});

/* ===========================
   PRICING CARD HOVER EFFECT
   =========================== */

const pricingCards = document.querySelectorAll(".pricing-card");

pricingCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05) translateY(-10px)";
  });

  card.addEventListener("mouseleave", function () {
    if (!this.classList.contains("featured")) {
      this.style.transform = "scale(1) translateY(0)";
    } else {
      this.style.transform = "scale(1.05) translateY(0)";
    }
  });
});

/* ===========================
   ACTIVE NAVIGATION HIGHLIGHT
   =========================== */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
      item.style.color = "var(--primary-color)";
    } else {
      item.style.color = "var(--text-primary)";
    }
  });
});

/* ===========================
   TESTIMONIAL ROTATION (Optional)
   =========================== */

const testimonialCards = document.querySelectorAll(".testimonial-card");
let currentTestimonial = 0;

function rotateTestimonials() {
  testimonialCards.forEach((card, index) => {
    if (index === currentTestimonial) {
      card.style.opacity = "1";
      card.style.transform = "scale(1)";
    } else {
      card.style.opacity = "0.5";
      card.style.transform = "scale(0.95)";
    }
  });

  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
}

// Optional: Auto-rotate testimonials every 5 seconds
// Uncomment the line below to enable
// setInterval(rotateTestimonials, 5000);

/* ===========================
   ADD FADE-IN ANIMATIONS
   =========================== */

// Add fade-in CSS animation
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
`;
document.head.appendChild(style);

/* ===========================
   CURSOR TRAIL EFFECT (Optional Creative Touch)
   =========================== */

const createCursorTrail = () => {
  const trail = document.createElement("div");
  trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--primary-color);
        pointer-events: none;
        z-index: 9999;
        opacity: 0.5;
        transition: opacity 0.5s ease;
    `;
  document.body.appendChild(trail);

  return trail;
};

let trails = [];

document.addEventListener("mousemove", (e) => {
  // Only create trail on desktop devices
  if (window.innerWidth > 768) {
    const trail = createCursorTrail();
    trail.style.left = e.clientX - 5 + "px";
    trail.style.top = e.clientY - 5 + "px";

    trails.push(trail);

    setTimeout(() => {
      trail.style.opacity = "0";
      setTimeout(() => {
        trail.remove();
        trails = trails.filter((t) => t !== trail);
      }, 500);
    }, 100);

    // Limit number of trails
    if (trails.length > 10) {
      const oldTrail = trails.shift();
      oldTrail.remove();
    }
  }
});

/* ===========================
   LOADING ANIMATION
   =========================== */

window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

console.log("🚀 Portfolio website loaded successfully!");
console.log("💼 Developed by Nikhil Mahajan");
console.log("🌟 Theme preference saved to localStorage");
