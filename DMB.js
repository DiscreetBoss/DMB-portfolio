// Loading animation
document.addEventListener('DOMContentLoaded', () => {
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);

    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 500);
    }, 1000);
});

// Typed.js initialization
const typed = new Typed('.typed-text', {
    strings: [
        'SEO Optimization',
        'Social Media Strategy',
        'Content Marketing',
        'Brand Development',
        'Digital Analytics'
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: '|'
});

// Smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Mobile menu functionality with animation
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    menuBtn.innerHTML = isMenuOpen ? '<i class="bx bx-x"></i>' : '<i class="bx bx-menu"></i>';
    navbar.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !navbar.contains(e.target) && !menuBtn.contains(e.target)) {
        isMenuOpen = false;
        menuBtn.innerHTML = '<i class="bx bx-menu"></i>';
        navbar.classList.remove('active');
    }
});

// Active section highlighting with intersection observer
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '-100px 0px -50%'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Form submission functionality
document.addEventListener('DOMContentLoaded', () => {
    // Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Create the mailto link
            const mailtoLink = `mailto:DiscreetMarketingboss@outlook.com?subject=Newsletter Subscription&body=Please add this email to your newsletter: ${email}`;
            window.location.href = mailtoLink;
            
            // Show success message
            showMessage('Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Create the mailto link with form data
            const mailtoLink = `mailto:DiscreetMarketingboss@outlook.com?subject=Contact Form Submission from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
            window.location.href = mailtoLink;
            
            // Show success message
            showMessage('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
});

// Utility function to show messages
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Form handling with validation and feedback
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(formData.email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));
        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    } catch (error) {
        showFormMessage('Something went wrong. Please try again later.', 'error');
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();
    
    contactForm.insertBefore(messageDiv, contactForm.firstChild);
    setTimeout(() => messageDiv.remove(), 5000);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Newsletter Form Handling
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');

newsletterForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    
    // Basic email validation
    if (!isValidEmail(email)) {
        showNewsletterMessage('Please enter a valid email address', 'error');
        return;
    }
    
    try {
        // Simulate API call - Replace with actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Success
        showNewsletterMessage('Thank you for subscribing! Please check your email to confirm.', 'success');
        newsletterForm.reset();
        
        // Optional: Trigger a confetti animation on success
        createConfettiEffect();
        
    } catch (error) {
        showNewsletterMessage('Something went wrong. Please try again later.', 'error');
        console.error('Newsletter subscription error:', error);
    }
});

function showNewsletterMessage(message, type) {
    newsletterMessage.textContent = message;
    newsletterMessage.className = `newsletter-message ${type}`;
    
    // Clear message after 5 seconds
    setTimeout(() => {
        newsletterMessage.textContent = '';
        newsletterMessage.className = 'newsletter-message';
    }, 5000);
}

function createConfettiEffect() {
    const colors = ['#2563eb', '#1e40af', '#60a5fa', '#93c5fd'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add scroll-triggered animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .experience-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Initial check
