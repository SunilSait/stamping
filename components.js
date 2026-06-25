// ===== FOILCRAFT — SHARED COMPONENTS =====
// Custom Embossing & Foil Stamping Print Studio
// Shared navbar + footer injected across all pages

(function () {
    'use strict';

    // --- Configuration ---
    const BRAND_NAME = 'Foilcraft';
    const BRAND_TAGLINE = 'Custom Embossing & Foil Stamping Print Studio';
    const CURRENT_YEAR = new Date().getFullYear();
    const PHONE = '+1 (555) 382-7490';
    const EMAIL = 'studio@foilcraft.co';
    const ADDRESS = '14 Gilded Lane, Artisan Quarter';

    const NAV_LINKS = [
        { label: 'Home', href: 'index.html' },
        { label: 'Home 2', href: 'home2.html' },
        { label: 'Services', href: 'services.html' },
        { label: 'Gallery', href: 'gallery.html' },
        { label: 'Pricing', href: 'pricing.html' },
        { label: 'About', href: 'about.html' },
        { label: 'Contact', href: 'contact.html' }
    ];

    const SOCIAL_LINKS = [
        { icon: 'fab fa-instagram', href: '#', label: 'Instagram' },
        { icon: 'fab fa-pinterest-p', href: '#', label: 'Pinterest' },
        { icon: 'fab fa-facebook-f', href: '#', label: 'Facebook' },
        { icon: 'fab fa-youtube', href: '#', label: 'YouTube' }
    ];

    // --- Brand Logo SVG ---
    const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--logo-primary)"/>
                <stop offset="50%" stop-color="#F2D98A"/>
                <stop offset="100%" stop-color="var(--logo-primary)"/>
            </linearGradient>
        </defs>
        <!-- Outer circle stamp ring -->
        <circle cx="50" cy="50" r="47" stroke="var(--logo-primary)" stroke-width="2" stroke-opacity="0.4" fill="none"/>
        <circle cx="50" cy="50" r="42" stroke="var(--logo-primary)" stroke-width="0.8" stroke-dasharray="4 3" stroke-opacity="0.5" fill="none"/>
        <!-- Diamond shape - foil press die -->
        <path d="M50 15 L75 40 L75 60 L50 85 L25 60 L25 40 Z" fill="url(#goldGrad)" fill-opacity="0.12" stroke="url(#goldGrad)" stroke-width="2"/>
        <!-- Inner emboss lines -->
        <path d="M50 22 L70 42 L70 58 L50 78 L30 58 L30 42 Z" fill="none" stroke="var(--logo-primary)" stroke-width="0.8" stroke-opacity="0.5"/>
        <!-- F monogram -->
        <path d="M40 38 L40 62 M40 38 L60 38 M40 50 L55 50" stroke="var(--logo-primary)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    // --- Get current page filename ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // --- Render Navbar ---
    function renderNavbar() {
        const navLinksDesktop = NAV_LINKS.map(link => {
            if (link.dropdown) {
                const isDropdownActive = link.dropdown.some(sub => sub.href === currentPage);
                const dropdownItems = link.dropdown.map(sub => {
                    const isSubActive = sub.href === currentPage;
                    return `<a href="${sub.href}" class="flex items-center gap-2 px-5 py-3 text-xs font-semibold transition-all duration-300 hover:bg-amber-50/30 dark:hover:bg-white/5 ${isSubActive ? 'text-[#C9A96E]' : 'text-neutral-600 dark:text-neutral-300 hover:text-[#C9A96E]'}">
                        ${sub.label}
                    </a>`;
                }).join('');

                return `
                <div class="relative group py-2">
                    <button class="nav-link whitespace-nowrap text-[12.5px] font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer group-hover:text-[#C9A96E] ${isDropdownActive ? 'text-[#C9A96E]' : 'text-neutral-700 dark:text-neutral-300'}">
                        ${link.label} <i class="fas fa-chevron-down text-[9px] transition-transform duration-300 group-hover:rotate-180 opacity-60"></i>
                    </button>
                    <div class="absolute left-0 mt-3 w-52 bg-white dark:bg-[#1C1C2E] border border-[#E8E2D8] dark:border-[#2D2D4A] rounded-2xl shadow-2xl py-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                        ${dropdownItems}
                    </div>
                </div>`;
            }

            const isActive = link.href === currentPage ||
                             (currentPage === '' && link.href === 'index.html') ||
                             (currentPage === 'stamping' && link.href === 'index.html');
            return `<a href="${link.href}" class="nav-link whitespace-nowrap text-[12.5px] font-semibold tracking-widest uppercase transition-all duration-300 hover:text-[#C9A96E] relative group ${isActive ? 'text-[#C9A96E]' : 'text-neutral-700 dark:text-neutral-300'}">
                ${link.label}
                <span class="absolute -bottom-1 left-0 h-[1.5px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : 'w-0'}"></span>
            </a>`;
        }).join('');

        const navLinksMobile = NAV_LINKS.map(link => {
            if (link.dropdown) {
                const isDropdownActive = link.dropdown.some(sub => sub.href === currentPage);
                const dropdownItems = link.dropdown.map(sub => {
                    const isSubActive = sub.href === currentPage;
                    return `<a href="${sub.href}" class="flex items-center py-3 pl-8 text-sm font-medium transition-all duration-300 ${isSubActive ? 'text-[#C9A96E]' : 'text-neutral-600 dark:text-neutral-300 hover:text-[#C9A96E]'}">
                        ${sub.label}
                    </a>`;
                }).join('');

                return `
                <div class="mobile-dropdown border-b border-neutral-100 dark:border-[#2D2D4A]">
                    <button class="js-mobile-dropdown-btn w-full flex items-center justify-between px-5 py-4 text-sm font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-200 hover:text-[#C9A96E] transition-all duration-300 ${isDropdownActive ? 'text-[#C9A96E]' : ''}">
                        <span>${link.label}</span>
                        <i class="fas fa-chevron-down text-sm transition-transform duration-300 opacity-60"></i>
                    </button>
                    <div class="js-mobile-dropdown-menu hidden bg-neutral-50/50 dark:bg-[#0D0D1A]/30 py-1 border-t border-neutral-100 dark:border-[#2D2D4A]">
                        ${dropdownItems}
                    </div>
                </div>`;
            }

            const isActive = link.href === currentPage || (currentPage === '' && link.href === 'index.html');
            return `<a href="${link.href}" class="nav-link flex items-center px-5 py-4 text-sm font-semibold uppercase tracking-wider border-b border-neutral-100 dark:border-[#2D2D4A] hover:text-[#C9A96E] transition-all ${isActive ? 'text-[#C9A96E] bg-amber-50/40 dark:bg-[#C9A96E]/5' : 'text-neutral-700 dark:text-neutral-200'}">
                ${link.label}
            </a>`;
        }).join('');

        return `
        <nav id="main-nav" class="sticky top-0 z-50 bg-[#FAF8F3]/95 dark:bg-[#0D0D1A]/95 backdrop-blur-md border-b border-[#E8E2D8] dark:border-[#2D2D4A] transition-all duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-6">
                <div class="flex justify-between items-center h-20">
                    <!-- Logo -->
                    <a href="index.html" class="flex items-center gap-2.5 group shrink-0">
                        ${LOGO_SVG}
                        <span class="font-bold text-xl tracking-tight text-[#1A1A2E] dark:text-[#F0EBE0] group-hover:text-[#C9A96E] transition-colors" style="font-family: 'Cormorant Garamond', serif;">
                            ${BRAND_NAME}
                        </span>
                    </a>

                    <!-- Desktop Nav -->
                    <div id="desktop-links" class="hidden xl:flex items-center gap-4 xl:gap-5">
                        ${navLinksDesktop}
                    </div>

                    <!-- Right Actions -->
                    <div class="flex items-center gap-2">
                        <!-- RTL Toggle -->
                        <button id="dir-toggle" class="js-dir-toggle hidden xl:flex w-10 h-10 items-center justify-center rounded-xl bg-white dark:bg-[#1C1C2E] border border-[#E8E2D8] dark:border-[#2D2D4A] hover:border-[#C9A96E] text-neutral-500 dark:text-neutral-400 hover:text-[#C9A96E] transition-all shadow-sm" aria-label="Toggle RTL">
                            <i class="fas fa-exchange-alt text-sm"></i>
                        </button>

                        <!-- Theme Toggle -->
                        <button id="theme-toggle-desktop" class="js-theme-toggle hidden xl:flex w-10 h-10 items-center justify-center rounded-xl bg-white dark:bg-[#1C1C2E] border border-[#E8E2D8] dark:border-[#2D2D4A] hover:border-[#C9A96E] text-neutral-500 dark:text-neutral-400 hover:text-[#C9A96E] transition-all shadow-sm" aria-label="Toggle theme">
                            <i class="fas fa-moon text-sm"></i>
                        </button>



                        <!-- Secondary CTA -->
                        <a href="signup.html" class="hidden xl:inline-flex items-center gap-2 border border-[#C9A96E] text-[#C9A96E] px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-widest hover:bg-[#C9A96E] hover:text-white transition-all whitespace-nowrap">
                            Sign Up
                        </a>

                        <!-- Mobile Menu Btn -->
                        <button id="mobile-menu-btn" class="xl:hidden p-2.5 rounded-xl bg-white dark:bg-[#1C1C2E] border border-[#E8E2D8] dark:border-[#2D2D4A] text-neutral-700 dark:text-neutral-300 transition-all" aria-label="Toggle menu">
                            <i class="fas fa-bars text-lg" id="menu-icon"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden xl:hidden bg-[#FAF8F3]/98 dark:bg-[#0D0D1A]/98 border-b border-[#E8E2D8] dark:border-[#2D2D4A]" style="position: absolute; top: 100%; left: 0; right: 0; z-index: 100; max-height: 85vh; overflow-y: auto;">
                <div class="max-w-7xl mx-auto pt-2 pb-6">
                    <div class="flex flex-col gap-0 mb-4">
                        ${navLinksMobile}
                    </div>
                    <div class="flex flex-col sm:flex-row items-center gap-3 px-5 pt-4 border-t border-neutral-100 dark:border-[#2D2D4A]">
                        <div class="flex gap-2 w-full sm:w-auto">
                            <button class="js-dir-toggle flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1C1C2E] border border-[#E8E2D8] dark:border-[#2D2D4A] text-neutral-600 dark:text-neutral-400 flex-1 sm:flex-none justify-center text-sm">
                                <i class="fas fa-exchange-alt"></i>
                                <span class="text-xs font-bold uppercase tracking-wider">LTR / RTL</span>
                            </button>
                            <button class="js-theme-toggle flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1C1C2E] border border-[#E8E2D8] dark:border-[#2D2D4A] text-neutral-600 dark:text-neutral-400 flex-1 sm:flex-none justify-center text-sm">
                                <i class="fas fa-moon"></i>
                                <span class="text-xs font-bold uppercase tracking-wider">Theme</span>
                            </button>
                        </div>
                        <div class="flex gap-2 w-full sm:w-auto">
                            <a href="signup.html" class="flex-1 sm:flex-none text-center border border-[#C9A96E] text-[#C9A96E] px-5 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#C9A96E] hover:text-white transition-all">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>`;
    }

    // --- Render Footer ---
    function renderFooter() {
        const socialLinksHtml = SOCIAL_LINKS.map(s =>
            `<a href="${s.href}" aria-label="${s.label}" class="w-10 h-10 flex items-center justify-center rounded-full border border-[#E8E2D8] dark:border-[#2D2D4A] text-neutral-500 dark:text-neutral-400 hover:text-[#C9A96E] hover:border-[#C9A96E] hover:-translate-y-1 transition-all duration-300">
                <i class="${s.icon} text-sm"></i>
            </a>`
        ).join('');

        return `
        <footer class="bg-[#F7F5F0] dark:bg-[#0A0A14] border-t border-[#E8E2D8] dark:border-[#2D2D4A] pt-16 pb-6 transition-colors duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <!-- Main Footer Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
                    <!-- Brand -->
                    <div class="lg:col-span-1 space-y-5">
                        <a href="index.html" class="flex items-center gap-2.5 group">
                            ${LOGO_SVG}
                            <span class="font-bold text-xl tracking-tight text-[#1A1A2E] dark:text-[#F0EBE0]" style="font-family: 'Cormorant Garamond', serif;">${BRAND_NAME}</span>
                        </a>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            ${BRAND_TAGLINE}. Elevating every impression with precision craftsmanship and premium metallic finishes.
                        </p>
                        <div class="flex gap-3">${socialLinksHtml}</div>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="font-bold mb-5 text-[#1A1A2E] dark:text-white uppercase text-xs tracking-[0.15em]">Quick Links</h4>
                        <ul class="space-y-2.5">
                            <li><a href="index.html" class="footer-link">Home</a></li>
                            <li><a href="home2.html" class="footer-link">Home 2 — Premium</a></li>
                            <li><a href="services.html" class="footer-link">Services</a></li>
                            <li><a href="gallery.html" class="footer-link">Gallery</a></li>
                            <li><a href="pricing.html" class="footer-link">Pricing</a></li>
                            <li><a href="about.html" class="footer-link">About Studio</a></li>
                        </ul>
                    </div>

                    <!-- Resources -->
                    <div>
                        <h4 class="font-bold mb-5 text-[#1A1A2E] dark:text-white uppercase text-xs tracking-[0.15em]">Resources</h4>
                        <ul class="space-y-2.5">
                            <li><a href="contact.html" class="footer-link">Contact Studio</a></li>
                            <li><a href="coming-soon.html" class="footer-link">Coming Soon</a></li>
                            <li><a href="404.html" class="footer-link">404 Page</a></li>
                            <li><a href="login.html" class="footer-link">Sign In</a></li>
                        </ul>
                    </div>

                    <!-- Newsletter -->
                    <div class="bg-white dark:bg-[#141420] p-6 rounded-2xl border border-[#E8E2D8] dark:border-[#2D2D4A]">
                        <h4 class="font-bold mb-2 text-[#1A1A2E] dark:text-white" style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;">Stay Gilded</h4>
                        <p class="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Subscribe for studio updates, technique guides & exclusive foil collections.</p>
                        <form id="newsletter-form" class="space-y-2.5">
                            <input type="email" required placeholder="your@email.com"
                                class="w-full px-4 py-3 text-sm bg-[#FAF8F3] dark:bg-[#1C1C2E] border border-[#E8E2D8] dark:border-[#2D2D4A] focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 rounded-xl outline-none transition-all dark:text-white placeholder:text-neutral-400" />
                            <button type="submit" class="w-full bg-gradient-to-r from-[#C9A96E] to-[#9E7D46] hover:from-[#D4B87E] hover:to-[#C9A96E] text-white text-sm font-bold py-3 rounded-xl transition-all">
                                Subscribe
                            </button>
                        </form>
                        <p id="newsletter-success" class="hidden text-xs text-emerald-500 mt-2 font-bold text-center">✦ Thank you for subscribing!</p>
                    </div>
                </div>

                <!-- Bottom Bar -->
                <div class="border-t border-[#E8E2D8] dark:border-[#2D2D4A] pt-8">
                    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p class="text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                            &copy; ${CURRENT_YEAR} ${BRAND_NAME}. Crafted with ✦ precision.
                        </p>
                        <div class="flex items-center gap-6">
                            <a href="#" class="text-[11px] uppercase tracking-widest text-neutral-400 hover:text-[#C9A96E] transition-colors">Privacy</a>
                            <a href="#" class="text-[11px] uppercase tracking-widest text-neutral-400 hover:text-[#C9A96E] transition-colors">Terms</a>
                            <span class="text-[11px] uppercase tracking-widest text-neutral-400">${PHONE}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <!-- Back to Top -->
        <button id="back-to-top" aria-label="Back to top" class="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#C9A96E] to-[#9E7D46] text-white border-none cursor-pointer opacity-0 translate-y-5 transition-all duration-300 hover:-translate-y-1 hover:scale-110 shadow-lg shadow-[#C9A96E]/30 active:scale-95">
            <i class="fas fa-chevron-up text-sm"></i>
        </button>`;
    }

    // --- Inject Global Styles ---
    function injectGlobalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .card { display: flex !important; flex-direction: column !important; height: 100% !important; align-self: stretch !important; }
            .card > *:last-child { margin-top: auto !important; }
            .pricing-card { display: flex !important; flex-direction: column !important; height: 100% !important; align-self: stretch !important; }
            .pricing-card .btn { margin-top: auto !important; }
            .grid-2 { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; align-items: stretch !important; }
            .grid-3 { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 24px !important; align-items: stretch !important; }
            .grid-4 { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 24px !important; align-items: stretch !important; }
            .animate-on-scroll.visible { transform: none !important; will-change: auto !important; }
            @media (max-width: 1024px) {
                .grid-2 { grid-template-columns: 1fr !important; }
                .grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
                .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
                .grid-3 > *:last-child:nth-child(odd),
                .grid-4 > *:last-child:nth-child(odd) {
                    grid-column: 1 / span 2 !important;
                    max-width: calc(50% - 12px) !important;
                    width: 100% !important;
                    margin: 0 auto !important;
                }
            }
            @media (max-width: 768px) {
                .grid-3 { grid-template-columns: 1fr !important; }
                .grid-4 { grid-template-columns: 1fr !important; }
            }
        `;
        document.head.appendChild(style);
    }

    // --- Initialize ---
    function init() {
        injectGlobalStyles();

        const navContainer = document.getElementById('navbar-container');
        if (navContainer) navContainer.innerHTML = renderNavbar();

        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) footerContainer.innerHTML = renderFooter();

        initTheme();
        initDirection();
        initMobileMenu();
        initScrollEffects();
        initNewsletter();
        initScrollReveal();
        initMobileDropdowns();
    }

    // --- Mobile Dropdowns ---
    function initMobileDropdowns() {
        const dropdowns = document.querySelectorAll('.mobile-dropdown');
        dropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector('.js-mobile-dropdown-btn');
            const menu = dropdown.querySelector('.js-mobile-dropdown-menu');
            if (btn && menu) {
                btn.addEventListener('click', () => {
                    const isHidden = menu.classList.toggle('hidden');
                    const chevron = btn.querySelector('.fa-chevron-down');
                    if (chevron) chevron.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
                });
                const sublinks = menu.querySelectorAll('a');
                let hasActive = false;
                sublinks.forEach(link => { if (link.getAttribute('href') === currentPage) hasActive = true; });
                if (hasActive) {
                    menu.classList.remove('hidden');
                    const chevron = btn.querySelector('.fa-chevron-down');
                    if (chevron) chevron.style.transform = 'rotate(180deg)';
                }
            }
        });
    }

    // --- Theme ---
    function initTheme() {
        const html = document.documentElement;
        const themeBtns = document.querySelectorAll('.js-theme-toggle');

        const setTheme = (isDark) => {
            if (isDark) {
                html.classList.add('dark');
                themeBtns.forEach(btn => {
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = 'fas fa-sun text-sm text-yellow-400';
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'Light Mode';
                });
                localStorage.setItem('fc-dark-mode', 'true');
            } else {
                html.classList.remove('dark');
                themeBtns.forEach(btn => {
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = 'fas fa-moon text-sm';
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'Dark Mode';
                });
                localStorage.setItem('fc-dark-mode', 'false');
            }
        };

        themeBtns.forEach(btn => btn.addEventListener('click', () => setTheme(!html.classList.contains('dark'))));

        const stored = localStorage.getItem('fc-dark-mode');
        if (stored === 'true' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme(true);
        } else {
            setTheme(false);
        }
    }

    // --- Direction ---
    function initDirection() {
        const html = document.documentElement;
        const dirBtns = document.querySelectorAll('.js-dir-toggle');

        const setDir = (dir) => {
            html.setAttribute('dir', dir);
            localStorage.setItem('fc-rtl', dir === 'rtl' ? 'true' : 'false');
            dirBtns.forEach(btn => {
                const span = btn.querySelector('span');
                if (span) span.textContent = dir === 'rtl' ? 'RTL' : 'LTR';
            });
        };

        dirBtns.forEach(btn => btn.addEventListener('click', () => {
            setDir((html.getAttribute('dir') || 'ltr') === 'ltr' ? 'rtl' : 'ltr');
        }));

        localStorage.getItem('fc-rtl') === 'true' ? setDir('rtl') : setDir('ltr');
    }

    // --- Mobile Menu ---
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.toggle('hidden');
                if (menuIcon) menuIcon.className = isHidden ? 'fas fa-bars text-lg' : 'fas fa-times text-lg';
            });
        }
    }

    // --- Scroll Effects ---
    function initScrollEffects() {
        const backToTop = document.getElementById('back-to-top');
        const nav = document.getElementById('main-nav');

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            if (backToTop) {
                backToTop.classList.toggle('opacity-0', scrollTop <= 400);
                backToTop.classList.toggle('translate-y-5', scrollTop <= 400);
                backToTop.classList.toggle('opacity-100', scrollTop > 400);
                backToTop.classList.toggle('translate-y-0', scrollTop > 400);
            }
            if (nav) nav.classList.toggle('shadow-lg', scrollTop > 10);
        });

        if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // --- Newsletter ---
    function initNewsletter() {
        const form = document.getElementById('newsletter-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const btn = this.querySelector('button[type="submit"]');
                const success = document.getElementById('newsletter-success');
                btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Subscribing...';
                setTimeout(() => {
                    this.classList.add('hidden');
                    if (success) success.classList.remove('hidden');
                }, 1500);
            });
        }
    }

    // --- Scroll Reveal ---
    function initScrollReveal() {
        const revealEls = document.querySelectorAll('.reveal');
        if (!revealEls.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealEls.forEach(el => observer.observe(el));
    }

    // --- DOM Ready ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
