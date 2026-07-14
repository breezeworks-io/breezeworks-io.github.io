document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Copyright Year
    const copyrightYearEl = document.getElementById('copyrightYear');
    if (copyrightYearEl) {
        copyrightYearEl.textContent = new Date().getFullYear();
    }

    // Sticky Header
    const header = document.getElementById('header');
    const toggleHeaderClass = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', toggleHeaderClass);
    toggleHeaderClass(); // Run once in case user starts refreshed/scrolled down

    // Modern IntersectionObserver for Scroll Reveal Elements
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% of the element is visible
        rootMargin: '0px 0px -40px 0px' // trigger slightly early for smoother reveals
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth Scroll for navigation and internal links
    const smoothScrollLinks = document.querySelectorAll('.nav-links a, .btn-primary, .btn-secondary, .btn-nav-cta, .footer-nav a, .logo-container');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 70; // scrolled header height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
});
