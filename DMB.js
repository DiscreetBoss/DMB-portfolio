// Loading animation
document.addEventListener("DOMContentLoaded", () => {
  const loading = document.createElement("div");
  loading.className = "loading";
  document.body.appendChild(loading);

  setTimeout(() => {
    loading.style.opacity = "0";
    setTimeout(() => loading.remove(), 500);
  }, 1000);
});

// Typed.js initialization
const typed = new Typed(".typed-text", {
  strings: [
    "SEO Optimization",
    "Social Media Strategy",
    "Content Marketing",
    "Brand Development",
    "Digital Analytics"
  ],
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 1500,
  loop: true,
  showCursor: true,
  cursorChar: "|"
});

// Smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});

// Mobile menu functionality with animation
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
let isMenuOpen = false;

menuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  menuBtn.innerHTML = isMenuOpen
    ? '<i class="bx bx-x"></i>'
    : '<i class="bx bx-menu"></i>';
  navbar.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (isMenuOpen && !navbar.contains(e.target) && !menuBtn.contains(e.target)) {
    isMenuOpen = false;
    menuBtn.innerHTML = '<i class="bx bx-menu"></i>';
    navbar.classList.remove("active");
  }
});

// Active section highlighting with intersection observer
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

const observerOptions = {
  threshold: 0.5,
  rootMargin: "-100px 0px -50%"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${currentId}`
        );
      });
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// Form handling with validation and feedback
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  // Basic validation
  if (!formData.name || !formData.email || !formData.message) {
    showFormMessage("Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(formData.email)) {
    showFormMessage("Please enter a valid email address", "error");
    return;
  }

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
  submitBtn.disabled = true;

  try {
    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    showFormMessage(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );
    contactForm.reset();
  } catch (error) {
    showFormMessage("Something went wrong. Please try again later.", "error");
  } finally {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
});

function showFormMessage(message, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;

  const existingMessage = contactForm.querySelector(".form-message");
  if (existingMessage) existingMessage.remove();

  contactForm.insertBefore(messageDiv, contactForm.firstChild);
  setTimeout(() => messageDiv.remove(), 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Add scroll-triggered animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".skill-card, .experience-card, .testimonial-card"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add("animate");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
animateOnScroll(); // Initial check
// Newsletter form handling
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("newsletter-email").value.trim();

    if (!isValidEmail(email)) {
      showFormMessage(
        "Please enter a valid email address",
        "error",
        newsletterForm
      );
      return;
    }

    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<i class="bx bx-loader-alt bx-spin"></i> Subscribing...';
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showFormMessage("Thank you for subscribing!", "success", newsletterForm);
      newsletterForm.reset();
    } catch (error) {
      showFormMessage(
        "Something went wrong. Please try again.",
        "error",
        newsletterForm
      );
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

// Updated showFormMessage function to work with multiple forms
function showFormMessage(message, type, form) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;

  const existingMessage = form.querySelector(".form-message");
  if (existingMessage) existingMessage.remove();

  form.insertBefore(messageDiv, form.firstChild);
  setTimeout(() => messageDiv.remove(), 5000);
}
