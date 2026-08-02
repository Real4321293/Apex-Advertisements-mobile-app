/* ============================================================
   SCRIPT.JS - Nova Advertising Agency
   All interactive features, animations, and functionality
   ============================================================ */

// ============================================================
// 1. PAGE LOADER
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('page-loader');
    
    // Hide loader after page loads
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1200);
});

// ============================================================
// 2. STICKY NAVBAR WITH BLUR EFFECT
// ============================================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for glass effect
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll down/up (optional)
    if (currentScroll > lastScroll && currentScroll > 300) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
    
    // Update active nav link
    updateActiveNavLink();
});

// ============================================================
// 3. MOBILE HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================================
// 4. ACTIVE NAVIGATION LINK
// ============================================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-cta)');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scroll = window.pageYOffset;
        
        if (scroll >= sectionTop && scroll < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================================
// 5. SCROLL REVEAL ANIMATIONS (Intersection Observer)
// ============================================================
const revealElements = document.querySelectorAll('.service-card, .feature-card, .portfolio-card, .pricing-card, .process-step, .testimonial-card, .faq-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(el);
});

// ============================================================
// 6. ANIMATED COUNTERS
// ============================================================
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const duration = 2000;
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current;
        }
    }, stepTime);
}

// ============================================================
// 7. FAQ ACCORDION
// ============================================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current
        if (!isActive) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

// ============================================================
// 8. TESTIMONIAL SLIDER
// ============================================================
const slider = document.getElementById('testimonialSlider');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
let currentSlide = 0;
const cards = slider.querySelectorAll('.testimonial-card');
const visibleCards = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
const cardWidth = slider.querySelector('.testimonial-card').offsetWidth + 30;

function slideTestimonials(direction) {
    const maxSlide = cards.length - visibleCards;
    currentSlide += direction;
    
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide > maxSlide) currentSlide = maxSlide;
    
    slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
}

// Add sliding styles
slider.style.display = 'flex';
slider.style.transition = 'transform 0.5s ease';

prevBtn.addEventListener('click', () => slideTestimonials(-1));
nextBtn.addEventListener('click', () => slideTestimonials(1));

// Auto-slide every 5 seconds
let autoSlide = setInterval(() => slideTestimonials(1), 5000);

// Pause auto-slide on hover
slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => slideTestimonials(1), 5000);
});

// ============================================================
// 9. SMOOTH SCROLLING (for anchor links)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================
// 10. BACK TO TOP BUTTON
// ============================================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================================
// 11. CARD TILT EFFECT (3D Hover)
// ============================================================
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        this.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ============================================================
// 12. MOUSE FOLLOWER EFFECT (Glow Cursor)
// ============================================================
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', function(e) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Enlarge glow on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-card, .pricing-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '400px';
        cursorGlow.style.height = '400px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)';
    });
    el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '300px';
        cursorGlow.style.height = '300px';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%)';
    });
});

// ============================================================
// 13. PARALLAX BACKGROUND BLOBS
// ============================================================
const blobs = document.querySelectorAll('.hero-blob');

document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    blobs.forEach((blob, index) => {
        const speed = 1 + index * 0.3;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ============================================================
// 14. FLOATING PARTICLES (Simple sparkles)
// ============================================================
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${['#2563EB', '#7C3AED', '#06B6D4', '#FFFFFF'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.4 + 0.1};
            animation: floatParticle ${Math.random() * 20 + 15}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
            pointer-events: none;
            z-index: 0;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation keyframes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes floatParticle {
        0% { transform: translate(0, 0) scale(1); opacity: 0.1; }
        25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5); opacity: 0.4; }
        50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8); opacity: 0.2; }
        75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.8); opacity: 0.5; }
        100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
    }
`;
document.head.appendChild(styleSheet);

createParticles();

// ============================================================
// 15. CONTACT FORM VALIDATION
// ============================================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputs = this.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
            input.style.borderWidth = '2px';
            
            setTimeout(() => {
                input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                input.style.borderWidth = '1px';
            }, 3000);
        }
    });
    
    if (isValid) {
        // Success message
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            this.reset();
        }, 3000);
    }
});

// ============================================================
// 16. IMAGE ZOOM EFFECT ON PORTFOLIO
// ============================================================
const portfolioImages = document.querySelectorAll('.portfolio-card img');

portfolioImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ============================================================
// 17. GRADIENT TEXT ANIMATION (Glow pulse)
// ============================================================
const gradientTexts = document.querySelectorAll('.gradient-text');

gradientTexts.forEach(text => {
    text.style.backgroundSize = '200% 200%';
    text.style.animation = 'gradientShift 4s ease-in-out infinite';
});

// Add gradient animation keyframes
const gradientStyle = document.createElement('style');
gradientStyle.textContent = `
    @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
`;
document.head.appendChild(gradientStyle);

// ============================================================
// 18. PROGRESS BAR ANIMATION (Skills/Stats)
// ============================================================
// This is a decorative feature - adds subtle progress bars
// to the "Why Choose Us" section if you want to display skills

// ============================================================
// 19. NEWSLETTER POPUP (Appears after 10 seconds)
// ============================================================
setTimeout(() => {
    // Create newsletter popup
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 40px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(16px);
        padding: 30px;
        border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.2);
        max-width: 320px;
        z-index: 9998;
        border: 1px solid rgba(255,255,255,0.2);
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.5s ease;
    `;
    
    popup.innerHTML = `
        <button id="closePopup" style="position:absolute;top:10px;right:14px;background:none;border:none;font-size:1.2rem;cursor:pointer;color:#64748b;">&times;</button>
        <h4 style="margin-bottom:8px;font-size:1.1rem;">Subscribe to Insights</h4>
        <p style="font-size:0.9rem;color:#64748b;margin-bottom:14px;">Get case studies & insider tips.</p>
        <form id="popupForm" style="display:flex;gap:8px;">
            <input type="email" placeholder="Your email" style="flex:1;padding:10px 14px;border:1px solid #e2e8f0;border-radius:50px;font-family:var(--font);" required />
            <button type="submit" style="padding:10px 18px;border:none;border-radius:50px;background:#2563EB;color:white;cursor:pointer;font-weight:600;">Go</button>
        </form>
    `;
    
    document.body.appendChild(popup);
    
    // Trigger entrance animation
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';
    }, 100);
    
    // Close popup
    document.getElementById('closePopup').addEventListener('click', function() {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(20px)';
        setTimeout(() => popup.remove(), 500);
    });
    
    // Handle popup form
    document.getElementById('popupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        if (input.value.trim()) {
            const btn = this.querySelector('button');
            btn.textContent = '✓';
            btn.style.background = '#10b981';
            setTimeout(() => {
                popup.style.opacity = '0';
                popup.style.transform = 'translateY(20px)';
                setTimeout(() => popup.remove(), 500);
            }, 1500);
        }
    });
    
}, 10000);

// ============================================================
// 20. COOKIE NOTIFICATION
// ============================================================
// Check if cookie consent already given
if (!localStorage.getItem('cookieConsent')) {
    const cookieBanner = document.createElement('div');
    cookieBanner.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(12px);
        padding: 16px 28px;
        border-radius: 50px;
        color: white;
        display: flex;
        align-items: center;
        gap: 20px;
        z-index: 9997;
        font-size: 0.9rem;
        border: 1px solid rgba(255,255,255,0.08);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        flex-wrap: wrap;
        justify-content: center;
        max-width: 90%;
    `;
    
    cookieBanner.innerHTML = `
        <span>🍪 We use cookies to enhance your experience.</span>
        <div style="display:flex;gap:10px;">
            <button id="acceptCookies" style="padding:8px 24px;border:none;border-radius:50px;background:#2563EB;color:white;cursor:pointer;font-weight:600;">Accept</button>
            <button id="declineCookies" style="padding:8px 24px;border:1px solid rgba(255,255,255,0.2);border-radius:50px;background:transparent;color:white;cursor:pointer;">Decline</button>
        </div>
    `;
    
    document.body.appendChild(cookieBanner);
    
    document.getElementById('acceptCookies').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'true');
        cookieBanner.style.opacity = '0';
        setTimeout(() => cookieBanner.remove(), 500);
    });
    
    document.getElementById('declineCookies').addEventListener('click', function() {
        cookieBanner.style.opacity = '0';
        setTimeout(() => cookieBanner.remove(), 500);
    });
}

// ============================================================
// 21. PARALLAX ON SCROLL (For hero illustration)
// ============================================================
const heroIllustration = document.querySelector('.hero-illustration img');

window.addEventListener('scroll', function() {
    if (heroIllustration) {
        const scrollY = window.pageYOffset;
        heroIllustration.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
});

// ============================================================
// 22. SMOOTH NAVBAR HIDE ON SCROLL (Enhanced)
// ============================================================
let scrollTimeout;

window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Navbar already handled in section 2
    }, 100);
});

// ============================================================
// 23. INITIAL ACTIVE NAV LINK
// ============================================================
setTimeout(updateActiveNavLink, 500);

// ============================================================
// 24. RESPONSIVE TESTIMONIALS (Recalculate on resize)
// ============================================================
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate slider if needed
        const visible = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
        // Reset slider position if current slide exceeds max
        const maxSlide = cards.length - visible;
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
            slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
        }
    }, 250);
});

// ============================================================
// 25. KEYBOARD ACCESSIBILITY (Escape to close menus)
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        // Close any open FAQ
        faqItems.forEach(item => item.classList.remove('active'));
    }
});

console.log('🚀 Nova Advertising Agency - All systems go!');