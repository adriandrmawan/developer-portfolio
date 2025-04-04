import ThemeManager from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
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
                    // No need to toggle class on mainNav itself, CSS handles it via body.menu-open
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
    const mobileNav = document.querySelector('.mobile-nav'); // Select the mobile <nav> element
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('.site-header');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isMenuOpen = document.body.classList.toggle('menu-open'); // Toggle on body
            menuToggle.classList.toggle('menu-open'); // Toggle on button for X animation
            menuToggle.setAttribute('aria-expanded', isMenuOpen); // Update ARIA state

            // Toggle overflow hidden pada body saat menu terbuka / Toggle overflow hidden on body when menu is open
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Tutup menu saat link di dalam menu diklik / Close menu when a link inside is clicked
        mobileNav.addEventListener('click', (e) => {
            // Check if the clicked element is a link inside the nav container
            if (e.target.closest('a[href^="#"]')) { // Use closest to handle clicks on spans inside links
                document.body.classList.remove('menu-open');
                menuToggle.classList.remove('menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // Restore scroll
                // Smooth scroll is handled by the separate listener above
            }
        });
    }

    // --- Tangani perilaku scroll untuk header / Handle scroll behavior for header ---
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) { // Only apply on mobile
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else if (currentScroll < lastScroll - 10 || currentScroll < 100) {
                // Scrolling up or near top
                header.classList.remove('header-hidden');
            }
            lastScroll = currentScroll;
        } else {
            // Ensure header is visible on larger screens
            header.classList.remove('header-hidden');
        }
    });

    // --- Handle window resize ---
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Reset status menu mobile di layar besar / Reset mobile menu state on larger screens
            document.body.classList.remove('menu-open');
            if (menuToggle) {
                menuToggle.classList.remove('menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
            // No need to manipulate mobileNav display style, CSS handles it
        }
        // No specific action needed for resizing *to* mobile, CSS handles initial hidden state
    });

    // --- Pengalihan Bahasa / Language Switching ---
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

});
