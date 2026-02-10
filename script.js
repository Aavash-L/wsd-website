// ===========================
// CONFIGURATION - UPDATE THESE LINKS
// ===========================

const CONFIG = {
    // Your Discord invite link
    discordLink: 'https://discord.gg/aBxP9C2rEu',
    
    // Your Whop premium membership link
    whopLink: 'https://whop.com/wallstreetdegens/premium-membership-wsd/?ref=279362452045561858-e7xfj8',
    
    // Your premium pricing
    originalPrice: '$60',
    discountPrice: '$30',
    discountPercent: '50% OFF'
};

// ===========================
// LINK HANDLERS
// ===========================

function setupLinks() {
    // All Discord CTAs
    const discordButtons = [
        'join-discord',
        'free-discord',
        'final-discord'
    ];
    
    discordButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.href = CONFIG.discordLink;
            btn.addEventListener('click', (e) => {
                // Track analytics here if needed
                console.log('Discord join clicked');
            });
        }
    });

    // All Premium/Whop CTAs
    const premiumButtons = [
        'premium-btn',
        'premium-whop',
        'final-premium'
    ];
    
    premiumButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.href = CONFIG.whopLink;
            btn.addEventListener('click', (e) => {
                // Track analytics here if needed
                console.log('Premium membership clicked');
            });
        }
    });
}

// ===========================
// SMOOTH SCROLL
// ===========================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Animate feature cards, proof cards, etc.
    const animatedElements = document.querySelectorAll(
        '.feature-card, .proof-card, .faq-item, .pricing-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

function setupNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ===========================
// STATS COUNTER ANIMATION
// ===========================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Animation speed

    const countUp = (counter) => {
        const target = counter.innerText;
        
        // Skip if not a number
        if (isNaN(target)) return;
        
        const increment = target / speed;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            counter.innerText = Math.ceil(current);

            if (current >= target) {
                counter.innerText = target;
                clearInterval(timer);
            }
        }, 10);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ===========================
// MOBILE MENU (OPTIONAL)
// ===========================

function setupMobileMenu() {
    // You can add a hamburger menu here if needed
    // For now, navigation is hidden on mobile (see CSS)
    
    // Example implementation:
    /*
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    
    const nav = document.querySelector('.nav-content');
    nav.insertBefore(menuToggle, nav.firstChild);
    
    menuToggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
    */
}

// ===========================
// FORM VALIDATION (if you add email capture later)
// ===========================

function setupEmailCapture() {
    // Placeholder for future email capture functionality
    // You could add this to capture emails before Discord join
    
    /*
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            // Send to your backend/email service
            console.log('Email captured:', email);
            
            // Redirect to Discord
            window.location.href = CONFIG.discordLink;
        });
    }
    */
}

// ===========================
// ANALYTICS TRACKING (optional)
// ===========================

function trackEvent(eventName, eventData = {}) {
    // Integration for Google Analytics, Facebook Pixel, etc.
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    console.log('Event tracked:', eventName, eventData);
}

// Track page sections viewed
function setupSectionTracking() {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('section_viewed', {
                    section: entry.target.id
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Wall Street Degens - Website Loaded');
    
    // Core functionality
    setupLinks();
    setupSmoothScroll();
    setupNavbar();
    
    // Visual enhancements
    setupScrollAnimations();
    animateCounters();
    
    // Optional features
    setupMobileMenu();
    setupSectionTracking();
    
    console.log('⚠️ REMINDER: Update your Discord and Whop links in script.js!');
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Detect if user came from TikTok
function detectTrafficSource() {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source') || urlParams.get('utm_source');
    
    if (source) {
        console.log('Traffic source:', source);
        trackEvent('page_view', { source });
    }
    
    // You can add ?source=tiktok to your bio link to track
}

detectTrafficSource();

// Exit intent popup (optional - shows when user tries to leave)
function setupExitIntent() {
    let shown = false;
    
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !shown) {
            shown = true;
            
            // Show a popup or highlight the free Discord CTA
            const cta = document.querySelector('.final-cta');
            if (cta) {
                cta.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Uncomment to enable exit intent
// setupExitIntent();