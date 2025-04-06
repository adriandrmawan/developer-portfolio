/* ThemeManager import removed */

document.addEventListener('DOMContentLoaded', () => {
    /* ThemeManager initialization removed */
    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const menuToggle = document.querySelector('.mobile-menu-toggle'); // Need toggle here too

            if (targetSection) {
                // Tutup menu mobile jika terbuka sebelum scroll / Close mobile menu if open before scrolling
                if (document.body.classList.contains('menu-open')) {
                    document.body.classList.remove('menu-open');
                    if (menuToggle) {
                        menuToggle.classList.remove('menu-open');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                    document.body.style.overflow = ''; // Restore scroll
                }

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Optional: Update URL hash without page jump
                // history.pushState(null, null, targetId);
            }
        });
    });

    // --- Toggle Menu Mobile Fullscreen / Fullscreen Mobile Menu Toggle ---
    const mobileNav = document.querySelector('.mobile-nav'); // Select the mobile <nav> element inside the overlay
    const menuToggle = document.querySelector('.mobile-menu-toggle'); // Select the toggle button (now direct child of body)
    const fullscreenOverlay = document.querySelector('.fullscreen-menu-overlay'); // Select the overlay div

    // Ensure the toggle button exists before adding listener
    if (menuToggle && fullscreenOverlay) { // Added fullscreenOverlay check here
        console.log('Mobile menu toggle button found. Adding listener.'); // Debug log

        menuToggle.addEventListener('click', () => {
            console.log('Mobile menu toggle clicked!'); // Debug log
            const isOpening = !document.body.classList.contains('menu-open');

            if (isOpening) {
                // --- OPENING MENU ---
                document.body.classList.remove('menu-closing'); // Ensure closing class is removed
                document.body.classList.add('menu-open');
                menuToggle.classList.add('menu-open');
                menuToggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            } else {
                // --- CLOSING MENU ---
                // Check if already closing to prevent multiple listeners
                if (!document.body.classList.contains('menu-closing')) {
                    document.body.classList.add('menu-closing');

                    fullscreenOverlay.addEventListener('transitionend', () => {
                        // This runs *after* the closing CSS transition finishes
                        console.log('Closing transition ended.'); // Debug log
                        document.body.classList.remove('menu-open');
                        document.body.classList.remove('menu-closing');
                        menuToggle.classList.remove('menu-open');
                        menuToggle.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = ''; // Restore scroll
                    }, { once: true }); // Important: listener runs only once per click
                }
            }
        });

        // --- Close menu when clicking a nav link ---
        // Needs similar closing logic
        if (mobileNav) { // Check mobileNav separately
            fullscreenOverlay.addEventListener('click', (e) => {
                if (e.target.closest('.mobile-nav a[href^="#"]')) {
                    console.log('Mobile nav link clicked, closing menu.'); // Debug log
                    if (!document.body.classList.contains('menu-closing')) {
                        document.body.classList.add('menu-closing');

                        fullscreenOverlay.addEventListener('transitionend', () => {
                            console.log('Link click closing transition ended.'); // Debug log
                            document.body.classList.remove('menu-open');
                            document.body.classList.remove('menu-closing');
                            menuToggle.classList.remove('menu-open');
                            menuToggle.setAttribute('aria-expanded', 'false');
                            document.body.style.overflow = '';
                        }, { once: true });
                    }
                    // Smooth scroll is handled by the separate listener above
                }
            });
        }

        // --- Handle window resize (ensure closing class is removed) ---
        window.addEventListener('resize', () => {
            if (window.innerWidth > 833) { // Use the same breakpoint as CSS
                // Reset status menu mobile di layar besar / Reset mobile menu state on larger screens
                document.body.classList.remove('menu-open');
                document.body.classList.remove('menu-closing'); // Also remove closing class
                if (menuToggle) {
                    menuToggle.classList.remove('menu-open');
                    // menuToggle.classList.remove('toggle-hidden'); // No longer needed
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
                document.body.style.overflow = '';
            }
        });

    } else {
         console.error('Mobile menu toggle button or fullscreen overlay not found!'); // Error log
    }

    // --- Smooth Scrolling (Keep as is, but adjusted logic slightly) ---
    // Note: This listener might conflict slightly if clicking links *within* the open mobile menu.
    // The overlay click listener above handles closing, but this might still prevent default scroll.
    // Consider if default anchor behavior is acceptable after menu close, or refine this further.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only prevent default and scroll if the click is NOT inside the mobile menu overlay
            if (!this.closest('.fullscreen-menu-overlay')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // If inside overlay, let the overlay listener handle close & allow default jump OR refine further
        });
    });


    // --- Pengalihan Bahasa / Language Switching (Keep as is) ---
    const langButtons = document.querySelectorAll('.lang-button');
    const body = document.body;

    function setLanguage(lang) {
        body.classList.remove('lang-en', 'lang-id');
        body.classList.add(`lang-${lang}`);
        document.documentElement.lang = lang; // Update html lang attribute

        // Update active button state
        langButtons.forEach(button => {
            if (button.dataset.lang === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        // Optional: Store preference in localStorage
        // localStorage.setItem('preferredLanguage', lang);
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang);
        });
    });

    // Optional: Load preferred language from localStorage on page load
    // const preferredLanguage = localStorage.getItem('preferredLanguage');
    // if (preferredLanguage) {
    //     setLanguage(preferredLanguage);
    // } else {
    //     // Default to English if no preference stored
    //     setLanguage('en');
    // }
    // Initial setup based on default class
    setLanguage(body.classList.contains('lang-id') ? 'id' : 'en');

    // --- Set Item Index for Staggered Animation ---
    const mobileNavItems = document.querySelectorAll('.fullscreen-menu-overlay .mobile-nav li');
    mobileNavItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

});
