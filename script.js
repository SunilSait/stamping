// ===== FOILCRAFT — UTILITY SCRIPTS =====
// Auth page interactions, dashboard toggles, animations

(function () {
    'use strict';

    // ---- Password Toggle ----
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function () {
            const wrapper = this.closest('.input-wrapper');
            const input = wrapper ? wrapper.querySelector('input') : null;
            if (input) {
                const isText = input.type === 'text';
                input.type = isText ? 'password' : 'text';
                const icon = this.querySelector('i');
                if (icon) icon.className = isText ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
            }
        });
    });

    // ---- Auth Page Theme Toggle ----
    const darkToggles = document.querySelectorAll('.dark-toggle');
    darkToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const html = document.documentElement;
            const isDark = html.classList.toggle('dark');
            localStorage.setItem('fc-dark-mode', isDark ? 'true' : 'false');
            const icon = btn.querySelector('i');
            if (icon) icon.className = isDark ? 'fas fa-sun text-yellow-400' : 'fas fa-moon';
        });
    });

    // ---- Auth Page RTL Toggle ----
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const html = document.documentElement;
            const isRTL = html.getAttribute('dir') === 'rtl';
            html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
            localStorage.setItem('fc-rtl', isRTL ? 'false' : 'true');
        });
    });

    // ---- Restore settings ----
    (function restoreSettings() {
        const html = document.documentElement;
        if (localStorage.getItem('fc-dark-mode') === 'true' ||
            (!localStorage.getItem('fc-dark-mode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            html.classList.add('dark');
            document.querySelectorAll('.dark-toggle i').forEach(i => i.className = 'fas fa-sun text-yellow-400');
        }
        if (localStorage.getItem('fc-rtl') === 'true') {
            html.setAttribute('dir', 'rtl');
        }
    })();

    // ---- Animate on scroll ----
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        elements.forEach(el => observer.observe(el));
    });

    // ---- Dashboard Sidebar Toggle ----
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            if (overlay) overlay.classList.toggle('show');
        });
    }

    if (overlay && sidebar) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
        });
    }

    // ---- Dashboard Notification Panel ----
    const notifBtn = document.getElementById('notif-btn');
    const notifPanel = document.getElementById('notif-panel');
    if (notifBtn && notifPanel) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifPanel.classList.toggle('hidden');
        });
        document.addEventListener('click', () => notifPanel.classList.add('hidden'));
    }

    // ---- Profile Dropdown ----
    const profileBtn = document.getElementById('profile-btn');
    const profileMenu = document.getElementById('profile-menu');
    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('hidden');
        });
        document.addEventListener('click', () => profileMenu.classList.add('hidden'));
    }

    // ---- Dashboard Theme Toggle ----
    const dashThemeToggle = document.getElementById('dash-theme-toggle');
    if (dashThemeToggle) {
        dashThemeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const isDark = html.classList.toggle('dark');
            localStorage.setItem('fc-dark-mode', isDark ? 'true' : 'false');
            const icon = dashThemeToggle.querySelector('i');
            if (icon) icon.className = isDark ? 'fas fa-sun text-yellow-400' : 'fas fa-moon';
        });
    }

    // ---- Counter Animation ----
    function animateCounter(el) {
        const target = parseFloat(el.dataset.target || el.textContent.replace(/[^0-9.]/g, ''));
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const isInt = Number.isInteger(target);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = prefix + (isInt ? Math.round(current) : current.toFixed(1)) + suffix;
        }, duration / steps);
    }

    document.querySelectorAll('[data-counter]').forEach(el => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(el);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(el);
    });

    // ---- Tabs ----
    document.querySelectorAll('.tab-bar').forEach(tabBar => {
        const buttons = tabBar.querySelectorAll('.tab-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const target = btn.dataset.tab;
                const container = tabBar.closest('[data-tabs]') || document;
                container.querySelectorAll('[data-tab-content]').forEach(panel => {
                    panel.classList.toggle('hidden', panel.dataset.tabContent !== target);
                });
            });
        });
    });

    // ---- Foil & Color Visualizer ----
    const visualizerSection = document.getElementById('visualizer-section');
    if (visualizerSection) {
        const card = document.getElementById('visualizer-card');
        const reflection = document.getElementById('visualizer-reflection');
        const cardTitle = document.getElementById('visualizer-card-title');
        const cardSubtitle = document.getElementById('visualizer-card-subtitle');
        const cardSymbol = document.getElementById('visualizer-card-symbol');
        const paperLabel = document.getElementById('visualizer-paper-label');
        const finishLabel = document.getElementById('visualizer-finish-label');
        const tag = document.getElementById('visualizer-card-footer-tag');
        const year = document.getElementById('visualizer-card-footer-year');
        const cities = document.getElementById('visualizer-card-footer-cities');

        let currentPaper = 'charcoal';
        let currentPaperColor = '#1A1A2E';
        let currentFinish = 'gold';
        let currentFinishColor = '#C9A96E';

        const updateCardStyles = () => {
            // Update paper background
            card.style.backgroundColor = currentPaperColor;
            
            // Adjust card text contrast if paper is light (off-white)
            const isLightPaper = currentPaper === 'offwhite';
            if (isLightPaper) {
                card.style.borderColor = 'rgba(0,0,0,0.1)';
                card.classList.remove('shadow-2xl');
                card.classList.add('shadow-lg');
                cardSubtitle.style.color = '#4B5563';
                paperLabel.style.color = '#4B5563';
                paperLabel.style.backgroundColor = 'rgba(0,0,0,0.06)';
                tag.style.color = '#6B7280';
                year.style.color = '#6B7280';
                cities.style.color = '#4B5563';
            } else {
                card.style.borderColor = 'rgba(255,255,255,0.1)';
                card.classList.remove('shadow-lg');
                card.classList.add('shadow-2xl');
                cardSubtitle.style.color = '#FFFFFF';
                paperLabel.style.color = '#FFFFFF';
                paperLabel.style.backgroundColor = 'rgba(255,255,255,0.1)';
                tag.style.color = '#FFFFFF';
                year.style.color = '#FFFFFF';
                cities.style.color = '#FFFFFF';
            }

            // Update foil/deboss finishes
            if (currentFinish === 'deboss') {
                // Apply blind debossing effect using text-shadows and color blending
                if (isLightPaper) {
                    cardTitle.style.color = 'rgba(0,0,0,0.25)';
                    cardTitle.style.textShadow = '-1px -1px 1px rgba(0,0,0,0.15), 1px 1px 1px rgba(255,255,255,0.8)';
                    cardSymbol.style.color = 'rgba(0,0,0,0.25)';
                    cardSymbol.style.textShadow = '-1px -1px 1px rgba(0,0,0,0.15), 1px 1px 1px rgba(255,255,255,0.8)';
                } else {
                    cardTitle.style.color = 'rgba(0,0,0,0.4)';
                    cardTitle.style.textShadow = '-1px -1px 1px rgba(0,0,0,0.6), 1px 1px 1px rgba(255,255,255,0.1)';
                    cardSymbol.style.color = 'rgba(0,0,0,0.4)';
                    cardSymbol.style.textShadow = '-1px -1px 1px rgba(0,0,0,0.6), 1px 1px 1px rgba(255,255,255,0.1)';
                }
                reflection.style.opacity = '0.15';
            } else {
                cardTitle.style.color = currentFinishColor;
                cardTitle.style.textShadow = '0 2px 4px rgba(0,0,0,0.15)';
                cardSymbol.style.color = currentFinishColor;
                cardSymbol.style.textShadow = '0 2px 4px rgba(0,0,0,0.15)';
                
                reflection.style.opacity = '0.45';
                if (currentFinish === 'gold') {
                    reflection.style.backgroundImage = 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(158,125,70,0.4) 100%)';
                } else if (currentFinish === 'silver') {
                    reflection.style.backgroundImage = 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(156,163,175,0.4) 100%)';
                } else if (currentFinish === 'rose') {
                    reflection.style.backgroundImage = 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(213,140,119,0.4) 100%)';
                } else if (currentFinish === 'copper') {
                    reflection.style.backgroundImage = 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(158,87,46,0.4) 100%)';
                }
            }
        };

        document.querySelectorAll('.visualizer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                const value = btn.dataset.value;
                const label = btn.dataset.label;
                const color = btn.dataset.color;

                const btnContainer = btn.closest('div');
                btnContainer.querySelectorAll('.visualizer-btn').forEach(b => {
                    b.classList.remove('active', 'border-[#C9A96E]', 'text-[#C9A96E]');
                    b.classList.add('border-neutral-200', 'dark:border-neutral-800', 'text-neutral-600', 'dark:text-neutral-400');
                });

                btn.classList.remove('border-neutral-200', 'dark:border-neutral-800', 'text-neutral-600', 'dark:text-neutral-400');
                btn.classList.add('active', 'border-[#C9A96E]', 'text-[#C9A96E]');

                if (type === 'paper') {
                    currentPaper = value;
                    currentPaperColor = color;
                    paperLabel.innerText = label;
                } else if (type === 'finish') {
                    currentFinish = value;
                    currentFinishColor = color;
                    finishLabel.innerText = label;
                }

                updateCardStyles();
            });
        });

        updateCardStyles();
    }

})();
