// ===============================================
// Growly Digital Marketing Agency - JavaScript
// ===============================================

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// ===============================================
// Navbar Scroll Effect
// ===============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===============================================
// Smooth Scroll for Navigation Links
// ===============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ===============================================
// Back to Top Button
// ===============================================
const backToTop = document.getElementById('backToTop');

// Show/hide back to top button on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Scroll to top when button is clicked
backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===============================================
// Contact Form Submission
// ===============================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message (integrate with your backend here)
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    
    // Reset form
    this.reset();
});

// ===============================================
// Active Nav Link on Scroll
// ===============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section's nav link
            const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
    });
}

// Run on scroll
window.addEventListener('scroll', highlightNavLink);

// Run on page load
window.addEventListener('load', highlightNavLink);

// ===============================================
// Pricing Button Click Handler
// ===============================================
document.querySelectorAll('.btn-pricing').forEach(button => {
    button.addEventListener('click', function() {
        const pricingCard = this.closest('.pricing-card');
        const planName = pricingCard.querySelector('.pricing-title').textContent;
        const planPrice = pricingCard.querySelector('.pricing-price').textContent;
        
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = contactSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Optional: Pre-fill the contact form or show a message
        setTimeout(() => {
            alert(`Great choice! You've selected the ${planName} plan (${planPrice}/month). Please fill out the form below and we'll get you started!`);
        }, 500);
    });
});

// ===============================================
// Mobile Menu Close on Link Click
// ===============================================
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// ===============================================
// Form Input Validation & Styling
// ===============================================
document.querySelectorAll('.form-control').forEach(input => {
    // Add focus effect
    input.addEventListener('focus', function() {
        this.style.borderColor = '#FF6B35';
    });
    
    // Remove focus effect
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.style.borderColor = '#e0e0e0';
        }
    });
    
    // Validate on input
    input.addEventListener('input', function() {
        if (this.value !== '') {
            this.style.borderColor = '#FF6B35';
        }
    });
});

// ===============================================
// Parallax Effect for Hero Section
// ===============================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const parallaxElements = heroSection.querySelectorAll('.hero-image svg g');
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// ===============================================
// Animated Counter for Stats Section
// ===============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isPercentage = target.toString().includes('%');
    const isPlus = target.toString().includes('+');
    const numericTarget = parseInt(target);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= numericTarget) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            if (isPercentage) {
                element.textContent = Math.floor(start) + '%';
            } else if (isPlus) {
                element.textContent = Math.floor(start) + '+';
            } else {
                element.textContent = Math.floor(start);
            }
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
let hasAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = stat.textContent;
                animateCounter(stat, target);
            });
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===============================================
// Service Cards Stagger Animation on Hover
// ===============================================
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transition = 'all 0.4s ease';
    });
});

// ===============================================
// Console Welcome Message
// ===============================================
console.log('%c Welcome to Growly! ', 'background: linear-gradient(135deg, #FF6B35 0%, #F77F00 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c We\'re hiring! Check out our careers page. ', 'color: #FF6B35; font-size: 14px;');

// ===============================================
// Page Load Animation
// ===============================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===============================================
// Testimonial Cards Random Order (Optional)
// ===============================================
function shuffleTestimonials() {
    const container = document.querySelector('.testimonials-section .row');
    if (container) {
        const cards = Array.from(container.children);
        cards.sort(() => Math.random() - 0.5);
        cards.forEach(card => container.appendChild(card));
    }
}

// Uncomment to enable random testimonial order on page load
// shuffleTestimonials();

// ===============================================
// Easter Egg - Konami Code
// ===============================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 You found the secret! Use code KONAMI for 10% off!');
        }, 2000);
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
