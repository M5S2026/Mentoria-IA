/**
 * SILVIAASSAY.COM - MAIN JAVASCRIPT
 * Professional Interactive Features
 * =====================================
 */

// =====================================
// 1. MOBILE MENU TOGGLE
// =====================================

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/**
 * Close mobile menu when clicking on a link
 */
function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    navMenu.classList.remove('active');
}

// Event Listeners for Mobile Menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-btn')) {
        closeMobileMenu();
    }
});

// =====================================
// 2. SMOOTH SCROLL FOR ANCHOR LINKS
// =====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignore if href is just "#"
        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for sticky navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================
// 3. FAQ ACCORDION
// =====================================

const faqQuestions = document.querySelectorAll('.faq-question');

/**
 * Handle FAQ accordion toggle
 */
function handleFaqToggle(e) {
    const question = e.currentTarget;
    const answer = question.nextElementSibling;
    const isExpanded = question.getAttribute('aria-expanded') === 'true';

    // Close other open items
    faqQuestions.forEach(q => {
        if (q !== question && q.getAttribute('aria-expanded') === 'true') {
            q.setAttribute('aria-expanded', 'false');
            q.nextElementSibling.hidden = true;
        }
    });

    // Toggle current item
    question.setAttribute('aria-expanded', !isExpanded);
    answer.hidden = isExpanded;

    // Track event
    trackEvent('FAQ', 'accordion_toggle', question.textContent.trim());
}

faqQuestions.forEach(question => {
    question.addEventListener('click', handleFaqToggle);
});

// Allow keyboard navigation
faqQuestions.forEach(question => {
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// =====================================
// 4. FORM VALIDATION
// =====================================

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate form fields
 */
function validateForm(form) {
    const errors = [];

    // Check required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            errors.push(`${field.name || field.id} é obrigatório`);
        }
    });

    // Validate email fields
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            errors.push('Email inválido');
        }
    });

    return errors;
}

/**
 * Show form validation errors
 */
function showFormErrors(form, errors) {
    // Remove previous error messages
    const prevErrors = form.querySelectorAll('.error-message');
    prevErrors.forEach(err => err.remove());

    if (errors.length > 0) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = '<ul>' +
            errors.map(err => `<li>${err}</li>`).join('') +
            '</ul>';
        form.insertBefore(errorDiv, form.firstChild);
        return false;
    }
    return true;
}

// Handle all form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const errors = validateForm(form);
        if (showFormErrors(form, errors)) {
            // Form is valid - here you would submit to your backend
            console.log('Form submitted successfully');

            // Track event
            trackEvent('Form', 'submission', form.id || 'contact-form');

            // Optional: Show success message
            showSuccessMessage(form);
        }
    });
});

/**
 * Show success message after form submission
 */
function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = 'Obrigado! Seus dados foram recebidos. Em breve entraremos em contato.';

    // Style the success message
    successDiv.style.cssText = `
        padding: 1rem;
        margin-bottom: 1rem;
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
        border-radius: 0.5rem;
        animation: slideDown 300ms ease-in-out;
    `;

    form.insertBefore(successDiv, form.firstChild);

    // Reset form
    form.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// =====================================
// 5. ANALYTICS TRACKING
// =====================================

/**
 * Send event to Google Analytics
 */
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': 1
        });
    }
}

/**
 * Track page views
 */
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-H3Q2WL3KBG', {
            'page_path': window.location.pathname
        });
    }
}

// Track page view on load
window.addEventListener('load', trackPageView);

/**
 * Track CTA button clicks
 */
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'button_click', btn.textContent.trim());
    });
});

// =====================================
// 6. SCROLL ANIMATIONS
// =====================================

/**
 * Intersection Observer for fade-in animations on scroll
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 600ms ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation to cards and sections
document.querySelectorAll(
    '.problem-card, .product-card, .testimonial-card, .faq-item'
).forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// =====================================
// 7. NAVBAR SCROLL EFFECT
// =====================================

const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

/**
 * Handle navbar behavior on scroll
 */
function handleNavbarScroll() {
    const scrollTop = window.scrollY;

    // Add shadow on scroll
    if (scrollTop > 0) {
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-md)';
    }

    lastScrollTop = scrollTop;
}

window.addEventListener('scroll', handleNavbarScroll);

// =====================================
// 8. HERO METRICS COUNTER
// =====================================

/**
 * Animate numbers in hero section
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
}

/**
 * Trigger counter animation when metrics are visible
 */
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metric = entry.target;
            const strong = metric.querySelector('strong');
            const text = strong.textContent;

            // Extract number from text (e.g., "500+" -> "500")
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/\d/g, '');

            if (!isNaN(number)) {
                animateCounter(strong, number);
                strong.textContent += suffix;
            }

            metricsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.metric').forEach(metric => {
    metricsObserver.observe(metric);
});

// =====================================
// 9. KEYBOARD NAVIGATION
// =====================================

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }

    // Quick access to sections with keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                document.querySelector('#produtos')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '2':
                document.querySelector('#mentoria')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '3':
                document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

// =====================================
// 10. THEME TOGGLE (Light/Dark Mode)
// =====================================

const THEME_STORAGE_KEY = 'silviaassay-theme';
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

/**
 * Get the current theme (dark is default)
 */
function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
}

/**
 * Set theme and save to localStorage
 */
function setTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
        if (themeIcon) themeIcon.textContent = '🌙';
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
    }

    // Track theme change
    trackEvent('Theme', 'toggle', theme);
}

/**
 * Toggle between dark and light mode
 */
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

/**
 * Initialize theme on page load (dark is default)
 */
function initializeTheme() {
    // Check if user has saved preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme) {
        // Use saved preference
        setTheme(savedTheme);
    } else {
        // Default to dark theme (tech neon style)
        setTheme('dark');
    }
}

// Add event listener to theme toggle button
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Keyboard support (Enter or Space)
    themeToggleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-change if no saved preference
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize theme on load
window.addEventListener('load', initializeTheme);

// =====================================
// 11. LAZY LOADING IMAGES
// =====================================

/**
 * Native lazy loading for images
 */
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
});

// =====================================
// 12. PERFORMANCE MONITORING
// =====================================

/**
 * Report Core Web Vitals to Google Analytics
 */
if ('web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(metric => trackEvent('Web Vitals', 'CLS', metric.label, Math.round(metric.value * 1000)));
        getFID(metric => trackEvent('Web Vitals', 'FID', metric.label, Math.round(metric.value)));
        getFCP(metric => trackEvent('Web Vitals', 'FCP', metric.label, Math.round(metric.value)));
        getLCP(metric => trackEvent('Web Vitals', 'LCP', metric.label, Math.round(metric.value)));
        getTTFB(metric => trackEvent('Web Vitals', 'TTFB', metric.label, Math.round(metric.value)));
    }).catch(err => console.log('Web Vitals not loaded'));
}

// =====================================
// 13. UTILITY FUNCTIONS
// =====================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll and resize events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =====================================
// 14. INITIALIZATION
// =====================================

/**
 * Initialize all scripts on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Silviaassay.com - Initialized');

    // Add data attribute for JavaScript detection
    document.documentElement.setAttribute('data-js', 'enabled');

    // Verify required elements exist
    if (!mobileMenuBtn || !navMenu) {
        console.warn('Navigation elements not found');
    }
});

/**
 * Global error handler
 */
window.addEventListener('error', (e) => {
    console.error('Global Error:', e.error);
    // Could send to error tracking service here
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could send to error tracking service here
});

// =====================================
// 15. EXPORT FUNCTIONS FOR TESTING
// =====================================

// Make functions available globally for testing if needed
window.SilviaApp = {
    toggleMobileMenu,
    closeMobileMenu,
    validateForm,
    trackEvent,
    animateCounter,
    debounce,
    throttle,
    toggleTheme,
    setTheme,
    getCurrentTheme,
    initializeTheme
};

console.log('Silviaassay.com - Ready to use. Call window.SilviaApp.* for functions.');
