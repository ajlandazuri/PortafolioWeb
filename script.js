document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- MASTER SCROLL LISTENER ---
    // Agrupa todas las funciones de scroll para reducir llamadas y mejorar rendimiento
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (typeof handleHeaderScroll === 'function') handleHeaderScroll();
                if (typeof handleActiveLinksScroll === 'function') handleActiveLinksScroll();
                if (typeof handleBackToTopScroll === 'function') handleBackToTopScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
    // 2. Header & Hero Scroll Effects
    const header = document.getElementById('header');
    const heroContent = document.querySelector('.hero-content');

    function handleHeaderScroll() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Hero Exit Animation
        if (heroContent) {
            if (window.scrollY > 100) {
                heroContent.classList.add('hero-exit');
            } else {
                heroContent.classList.remove('hero-exit');
            }
        }
    }

    // 3. reveal on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Exit animation: Remove active class when leaving viewport
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.15, // Slightly higher threshold for better exit detection
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Hash Initialization Corrector (Fixes layout shifting on direct section load)
    // Solo corregimos el scroll si es una navegación nueva (no un reload)
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === "reload";

    if (window.location.hash && !isReload) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 500); // Wait 500ms for lazy load and skills hydration to settle
    }


    // 6. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    function handleActiveLinksScroll() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    }

    // 8. Skills Filtering & Pagination Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = Array.from(document.querySelectorAll('.skill-card'));
    const loadMoreBtn = document.getElementById('load-more-skills');
    let isExpanded = false;
    const INITIAL_LIMIT = 16;

    function updateSkillsDisplay() {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        let visibleCount = 0;

        skillCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const matchesFilter = activeFilter === 'all' || cardCategory.includes(activeFilter);

            if (matchesFilter) {
                if (isExpanded || visibleCount < INITIAL_LIMIT) {
                    card.classList.remove('hide', 'paged-hidden');
                    card.classList.add('show');
                    visibleCount++;

                    // Trigger animation
                    card.classList.remove('anim-visible');
                    setTimeout(() => card.classList.add('anim-visible'), 50);
                } else {
                    card.classList.remove('show');
                    card.classList.add('hide', 'paged-hidden');
                    card.classList.remove('anim-visible');
                }
            } else {
                card.classList.remove('show');
                card.classList.add('hide', 'paged-hidden');
                card.classList.remove('anim-visible');
            }
        });

        // Toggle Load More button visibility
        const totalMatches = skillCards.filter(card => {
            const cat = card.getAttribute('data-category');
            return activeFilter === 'all' || cat.includes(activeFilter);
        }).length;

        if (loadMoreBtn) {
            if (totalMatches > INITIAL_LIMIT) {
                loadMoreBtn.parentElement.classList.remove('hide');
                loadMoreBtn.parentElement.classList.add('show');
                loadMoreBtn.style.display = 'flex';
            } else {
                loadMoreBtn.parentElement.classList.add('hide');
                loadMoreBtn.parentElement.classList.remove('show');
                loadMoreBtn.style.display = 'none';
            }
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateSkillsDisplay();
        });
    });

    if (loadMoreBtn) {
        const loadMoreText = document.getElementById('load-more-skills-text');
        const loadMoreIcon = document.getElementById('load-more-skills-icon');

        loadMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            updateSkillsDisplay();

            // Update text and icon
            if (loadMoreText) {
                loadMoreText.setAttribute('data-i18n', isExpanded ? 'show_less' : 'show_more');
                // Re-calculate translations
                if (typeof window.updateUI === 'function') {
                    const currentLang = localStorage.getItem('language') || 'en';
                    window.updateUI(currentLang);
                }
            }

            // Must fetch the icon again because updateUI/Lucide recreates it
            const currentIcon = document.getElementById('load-more-skills-icon');
            if (currentIcon) {
                currentIcon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
            }

            // Scroll to top of skills if collapsing
            if (!isExpanded) {
                const skillsSection = document.getElementById('skills');
                if (skillsSection) {
                    const headerOffset = 100;
                    const elementPosition = skillsSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Initialize display
    updateSkillsDisplay();

    // 9. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        let typewriterTimeout;
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 50;

        function getPhrases() {
            const lang = localStorage.getItem('language') || 'en';
            return window.translations[lang].hero_typewriter;
        }

        function type() {
            const phrases = getPhrases();
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2500; // Pause at the end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before next
            }

            typewriterTimeout = setTimeout(type, typeSpeed);
        }

        // Listen for language changes to restart typewriter
        window.addEventListener('languageChanged', () => {
            clearTimeout(typewriterTimeout);
            phraseIndex = 0;
            charIndex = 0;
            isDeleting = false;
            type();
        });

        setTimeout(type, 2000);
    }

    // 10. Data Particles Generation
    const particleContainer = document.getElementById('particles-container');
    if (particleContainer) {
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random properties
            const size = Math.random() * 3 + 1;
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const moveX = (Math.random() - 0.5) * 200; // Total movement in px
            const moveY = (Math.random() - 0.5) * 200;
            const duration = Math.random() * 10 + 10; // 10-20 seconds
            const delay = Math.random() * 5;

            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startX}%`;
            particle.style.top = `${startY}%`;

            // Modern Azure - Clean particles
            const colors = ['rgba(37, 99, 235, 0.4)', 'rgba(255, 255, 255, 0.8)'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            particle.style.setProperty('--moveX', `${moveX}px`);
            particle.style.setProperty('--moveY', `${moveY}px`);
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            particleContainer.appendChild(particle);

            // Clean up
            setTimeout(() => {
                particle.remove();
            }, (duration + delay) * 1000);
        };

        // Initial burst
        for (let i = 0; i < 20; i++) createParticle();

        // Continuous spawn
        setInterval(createParticle, 800);
    }

    // 11. Back to Top Logic
    const backToTopBtn = document.getElementById('back-to-top');
    function handleBackToTopScroll() {
        if (!backToTopBtn) return;
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    if (backToTopBtn) {

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 12. Advanced HUD Interactions (Hex Mask)
    const hexGrid = document.querySelector('.hex-grid');

    if (hexGrid) {
        let isHexMouseMoving = false;
        window.addEventListener('mousemove', (e) => {
            if (!isHexMouseMoving) {
                window.requestAnimationFrame(() => {
                    const x = e.clientX;
                    const y = e.clientY;

                    const xPct = (x / window.innerWidth) * 100;
                    const yPct = (y / window.innerHeight) * 100;
                    hexGrid.style.setProperty('--mouse-x', `${xPct}%`);
                    hexGrid.style.setProperty('--mouse-y', `${yPct}%`);
                    isHexMouseMoving = false;
                });
                isHexMouseMoving = true;
            }
        }, { passive: true });
    }

    // 13. Periodic Circuit Traces
    const circuitContainer = document.getElementById('circuit-container');
    if (circuitContainer) {
        const createTrace = () => {
            const trace = document.createElement('div');
            trace.classList.add('circuit-trace');

            const startY = Math.random() * 100;
            const width = Math.random() * 200 + 100;

            trace.top = `${startY}%`;
            trace.style.width = `${width}px`;

            circuitContainer.appendChild(trace);

            setTimeout(() => trace.remove(), 4000);
        };

        setInterval(createTrace, 3000);
    }

    // 14. Multi-Level Parallax & Wireframe Spawning
    const starfield = document.querySelector('.starfield');
    const particles = document.getElementById('particles-container');
    const wireframeContainer = document.querySelector('.wireframe-container');

    let isParallaxMoving = false;
    window.addEventListener('mousemove', (e) => {
        if (!isParallaxMoving) {
            window.requestAnimationFrame(() => {
                const xPct = (e.clientX / window.innerWidth - 0.5);
                const yPct = (e.clientY / window.innerHeight - 0.5);

                if (starfield) {
                    starfield.style.transform = `translate(${xPct * 10}px, ${yPct * 10}px)`;
                }
                if (particles) {
                    particles.style.transform = `translate(${xPct * 30}px, ${yPct * 30}px)`;
                }
                if (hexGrid) {
                    hexGrid.style.transform = `translate(${xPct * 20}px, ${yPct * 20}px)`;
                }
                isParallaxMoving = false;
            });
            isParallaxMoving = true;
        }
    }, { passive: true });

    if (wireframeContainer) {
        const icons = ['cpu', 'database', 'network', 'box', 'hash'];
        const spawnWireframe = () => {
            const node = document.createElement('div');
            node.classList.add('wireframe-node');
            const iconName = icons[Math.floor(Math.random() * icons.length)];
            node.innerHTML = `<i data-lucide="${iconName}"></i>`;

            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            node.style.fontSize = `${Math.random() * 40 + 20}px`;

            wireframeContainer.appendChild(node);
            lucide.createIcons();

            setTimeout(() => node.remove(), 20000);
        };

        for (let i = 0; i < 5; i++) spawnWireframe();
        setInterval(spawnWireframe, 8000);
    }

    // 15. Binary Rain Logic
    const binaryRainContainer = document.getElementById('binary-rain');
    if (binaryRainContainer) {
        const createBinaryStream = () => {
            const stream = document.createElement('div');
            stream.classList.add('binary-stream');

            let binaryContent = '';
            const length = Math.floor(Math.random() * 20) + 10;
            for (let i = 0; i < length; i++) {
                binaryContent += Math.round(Math.random()) + '<br>';
            }

            stream.innerHTML = binaryContent;
            stream.style.left = `${Math.random() * 100}%`;
            const duration = Math.random() * 10 + 5;
            stream.style.animationDuration = `${duration}s`;

            binaryRainContainer.appendChild(stream);
            setTimeout(() => stream.remove(), duration * 1000);
        };

        setInterval(createBinaryStream, 500);
    }

    // 16. Pulse Rings Triggers
    const pulseContainer = document.getElementById('pulse-rings');
    if (pulseContainer) {
        const createPulse = () => {
            const ring = document.createElement('div');
            ring.classList.add('pulse-ring');
            pulseContainer.appendChild(ring);
            setTimeout(() => ring.remove(), 4000);
        };

        setInterval(createPulse, 8000);
        setTimeout(createPulse, 1000); // Initial pulse
    }

    // --- Theme Switching Controller (Switch Logic) ---
    const themeBtn = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Set initial theme and checkbox state
    rootEl.setAttribute('data-theme', currentTheme);
    if (themeBtn) {
        // Checked = Dark Mode (Moon), Unchecked = Light Mode (Sun)
        themeBtn.checked = (currentTheme === 'dark');

        themeBtn.addEventListener('change', () => {
            const isChecked = themeBtn.checked;
            const newTheme = isChecked ? 'dark' : 'light';
            rootEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Refresh icons if using Lucide
            if (window.lucide) window.lucide.createIcons();
        });
    }

    // --- Certifications Carousel (Swiper Init with Improved Boundary Control) ---
    const certSwiperEl = document.querySelector('.cert-swiper');
    if (certSwiperEl && typeof Swiper !== 'undefined') {
        const certSwiper = new Swiper('.cert-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 1000,
            watchSlidesProgress: true, // Crucial for precise visibility control
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            slidesPerGroup: 1,
            pagination: {
                el: '.cert-carousel-wrapper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.cert-carousel-wrapper .swiper-button-next',
                prevEl: '.cert-carousel-wrapper .swiper-button-prev',
            },
            breakpoints: {
                // Mobile
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
                // Tablet
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                },
                // Desktop
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                }
            }
        });
    }

    // --- Projects Toggle Logic ---
    const toggleProjectsBtn = document.getElementById('toggle-projects-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const toggleProjectsText = document.getElementById('toggle-projects-text');
    const toggleProjectsIcon = document.getElementById('toggle-projects-icon');

    if (toggleProjectsBtn) {
        toggleProjectsBtn.addEventListener('click', () => {
            // Revisa el estado actual: si el primer elemento no tiene la clase, asume que está expandido
            let isExpandedNow = (hiddenProjects[0] && !hiddenProjects[0].classList.contains('hidden-project'));

            if (isExpandedNow) {
                // Ocultar: readicionamos la clase que oculta
                hiddenProjects.forEach(project => {
                    project.classList.add('hidden-project');
                });

                // i18n support
                toggleProjectsText.setAttribute('data-i18n', 'show_more');
                if (typeof window.updateUI === 'function') {
                    const currentLang = localStorage.getItem('language') || 'en';
                    window.updateUI(currentLang);
                }

                // Re-fetch icon as it's recreated by Lucide
                const currentIcon = document.getElementById('toggle-projects-icon');
                if (currentIcon) {
                    currentIcon.style.transform = 'rotate(0deg)';
                }

                // Hacer scroll suave hacia arriba en la sección para no perderse
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // Mostrar: removemos la clase que oculta
                hiddenProjects.forEach(project => {
                    project.classList.remove('hidden-project');
                });

                // i18n support
                toggleProjectsText.setAttribute('data-i18n', 'show_less');
                if (typeof window.updateUI === 'function') {
                    const currentLang = localStorage.getItem('language') || 'en';
                    window.updateUI(currentLang);
                }

                // Re-fetch icon as it's recreated by Lucide
                const currentIcon = document.getElementById('toggle-projects-icon');
                if (currentIcon) {
                    currentIcon.style.transform = 'rotate(180deg)';
                }
            }
        });
    }

    // --- Professional Section Animation Observer (.anim-) ---
    const animSections = document.querySelectorAll('.anim-section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineContainer = document.querySelector('.timeline');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const generalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');

                // Specific logic for timeline container
                if (entry.target.classList.contains('timeline')) {
                    entry.target.classList.add('anim-active');
                }
            } else {
                entry.target.classList.remove('anim-visible');
                if (entry.target.classList.contains('timeline')) {
                    entry.target.classList.remove('anim-active');
                }
            }
        });
    }, observerOptions);

    // Observe sections
    animSections.forEach(section => generalObserver.observe(section));

    // Observe timeline items individually for staggered effect
    timelineItems.forEach(item => generalObserver.observe(item));

    // Observe timeline container for the line animation
    if (timelineContainer) generalObserver.observe(timelineContainer);

    // Observe skill cards
    const cardsToObserve = document.querySelectorAll('.skill-card');
    cardsToObserve.forEach(card => generalObserver.observe(card));

    // Observe cinematic elements (About Me, etc.)
    const cinematicElements = document.querySelectorAll('.anim-slide-left, .anim-slide-right, .anim-scale-up, .stat-card-h');
    cinematicElements.forEach(el => generalObserver.observe(el));

    // --- Mobile Menu Toggle Logic ---
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenuWrapper = document.getElementById('nav-menu-wrapper');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileToggle && navMenuWrapper) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navMenuWrapper.classList.toggle('mobile-active');

            // Scroll is now allowed while menu is open per user request.
        });

        // Note: Automatic closing when a link is clicked has been removed per user request.
        // The menu will now remain open until the 'X' button is clicked.

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = navMenuWrapper.contains(e.target);
            const isClickOnToggle = mobileToggle.contains(e.target);
            const isClickOnThemeSwitch = e.target.closest('.theme-switch');

            if (!isClickInsideMenu && !isClickOnToggle && !isClickOnThemeSwitch && navMenuWrapper.classList.contains('mobile-active')) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                navMenuWrapper.classList.remove('mobile-active');
                document.body.style.overflow = '';
            }
        });
    }

    // 17. Number Counter Animation for Stat Cards (Repeatable)
    const statsCards = document.querySelectorAll('.stat-card-h');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const numberEl = entry.target.querySelector('.stat-number-h');
            if (!numberEl) return;

            if (entry.isIntersecting) {
                // Store original string in dataset if not already there
                if (!numberEl.dataset.targetStr) {
                    numberEl.dataset.targetStr = numberEl.innerText;
                }

                const finalStr = numberEl.dataset.targetStr;
                const targetNum = parseInt(finalStr.replace(/\D/g, ''));
                const suffix = finalStr.replace(/[0-9]/g, '');

                if (!isNaN(targetNum)) {
                    let currentNum = 0;

                    // Check if it's the "YEARS EXPERIENCE" card to count faster (supports both EN and ES)
                    const text = entry.target.innerText.toUpperCase();
                    const isYearExperience = text.includes('EXPERIENCE') || text.includes('EXPERIENCIA');
                    const duration = isYearExperience ? 300 : 2500;

                    const steps = isYearExperience ? 10 : 60;
                    const stepTime = Math.max(duration / steps, 16);
                    const increment = targetNum / (duration / stepTime);

                    // Start at 0 immediately
                    numberEl.innerText = `0${suffix}`;

                    // Clear previous timer if any
                    if (numberEl.intervalTracker) clearInterval(numberEl.intervalTracker);

                    numberEl.intervalTracker = setInterval(() => {
                        currentNum += increment;
                        if (currentNum >= targetNum) {
                            numberEl.innerText = finalStr;
                            clearInterval(numberEl.intervalTracker);
                        } else {
                            numberEl.innerText = `${Math.floor(currentNum)}${suffix}`;
                        }
                    }, stepTime);
                }
            } else {
                // Reset when element leaves view
                if (numberEl.dataset.targetStr) {
                    if (numberEl.intervalTracker) clearInterval(numberEl.intervalTracker);
                    const suffix = numberEl.dataset.targetStr.replace(/[0-9]/g, '');
                    numberEl.innerText = `0${suffix}`;
                }
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the card is visible

    statsCards.forEach(card => counterObserver.observe(card));

    // 18. Hide Spline Viewer Logo instantly without flashing
    let logoRemoved = false;
    let rafId;

    const hideSplineLogoInstant = () => {
        const splineViewer = document.querySelector('spline-viewer');
        if (splineViewer && splineViewer.shadowRoot) {
            const logo = splineViewer.shadowRoot.querySelector('#logo');
            if (logo) {
                // Inject CSS straight into shadowRoot to hide it even before removal completes
                const style = document.createElement('style');
                style.textContent = '#logo { display: none !important; opacity: 0 !important; visibility: hidden !important; z-index: -1 !important;}';
                splineViewer.shadowRoot.appendChild(style);

                logo.remove();
                return true;
            }
        }
        return false;
    };

    const runLogoHideLoop = () => {
        if (hideSplineLogoInstant()) {
            logoRemoved = true;
            cancelAnimationFrame(rafId);
        } else {
            rafId = requestAnimationFrame(runLogoHideLoop);
        }
    };

    // Start ultra-fast 60fps checking
    rafId = requestAnimationFrame(runLogoHideLoop);

    // Safety clear after 10 seconds to free resources
    setTimeout(() => {
        if (!logoRemoved) cancelAnimationFrame(rafId);
    }, 10000);

    // 19. Spline Robot & Contact Card Bridge
    const splineViewer = document.querySelector('spline-viewer');
    const contactCard = document.querySelector('.connect-card');

    if (splineViewer && contactCard) {
        contactCard.addEventListener('mouseenter', () => {
            // IMPORTANTE: Solo lanzar corazones si estamos en PC (más de 1380px donde NO está abajo)
            if (window.innerWidth > 1380 && typeof splineViewer.emitEvent === 'function') {
                splineViewer.emitEvent('mouseHover', 'CORAZON');
            }
        });

        contactCard.addEventListener('mouseleave', () => {
            if (window.innerWidth > 1380 && typeof splineViewer.emitEvent === 'function') {
                // splineViewer.emitEvent('mouseOut', 'CORAZON'); 
            }
        });
    }
});

/* --- Dynamic Project Data & Loading --- */

window.loadProjectDetails = function (id) {
    const lang = localStorage.getItem('language') || 'en';
    const t = window.translations[lang];
    const container = document.getElementById('project-detail-content');
    const projectRaw = projectsData[id];

    if (!projectRaw) {
        container.innerHTML = `
            <div class="error-container" style="text-align: center; padding: 5rem 0;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">${t.detail_error_title}</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">${t.detail_error_desc}</p>
                <a href="index.html#projects" class="btn btn-primary">${t.detail_error_btn}</a>
            </div>
        `;
        return;
    }

    const project = {
        ...projectRaw[lang],
        techStack: projectRaw.techStack,
        year: projectRaw.year,
        image: projectRaw.image,
        github: projectRaw.github
    };

    // Update document title
    document.title = `${project.title} | ${t.detail_breadcrumb_current}`;

    // Inject HTML structure
    container.innerHTML = `
        <div class="anim-detail-entry">
            <div class="project-hero">
                <div class="project-info-side">
                    <h1>${project.title}</h1>
                    <div class="project-accent-line"></div>
                    <p class="project-description-long">${project.description}</p>
                    
                        <a href="${project.github}" class="btn btn-primary project-github-btn" target="_blank" rel="noopener noreferrer" style="padding: 1rem 2.5rem; font-size: 1rem; display: inline-flex; align-items: center; gap: 10px;">
                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 496 512">
                                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                            </svg>
                            GitHub
                        </a>
                </div>
                
                <div class="project-preview-side">
                    <img loading="lazy" decoding="async" src="${project.image}" alt="${project.title}">
                </div>
            </div>

            <div class="project-stats-grid">
                <div class="stat-box">
                    <i data-lucide="calendar"></i>
                    <span class="stat-label">${t.detail_stat_year}</span>
                    <span class="stat-value">${project.year}</span>
                </div>
                <div class="stat-box">
                    <i data-lucide="user"></i>
                    <span class="stat-label">${t.detail_stat_role}</span>
                    <span class="stat-value">${project.role}</span>
                </div>
                <div class="stat-box">
                    <i data-lucide="layers"></i>
                    <span class="stat-label">${t.detail_stat_type}</span>
                    <span class="stat-value">${project.type}</span>
                </div>
                <div class="stat-box">
                    <i data-lucide="activity"></i>
                    <span class="stat-label">${t.detail_stat_status}</span>
                    <span class="stat-value ${project.status.toLowerCase().includes('completado') || project.status.toLowerCase().includes('completed') ? 'status-completed' : 'status-active'}">${project.status}</span>
                </div>
            </div>

            <div class="project-content-sections">
                <div class="tech-detail-content">
                    <h2><i data-lucide="cpu"></i> ${t.detail_tech_title}</h2>
                    <div class="detail-tech-list">
                        ${project.techStack.map(tech => {
        let icon = "code-2";
        const t = tech.toLowerCase();

        if (t.includes('power bi')) icon = "bar-chart-3";
        else if (t.includes('excel') || t.includes('spreadsheet') || t.includes('pandas') || t.includes('numpy')) icon = "table-2";
        else if (t.includes('dax') || t.includes('calc') || t.includes('formula')) icon = "calculator";
        else if (t.includes('analytics') || t.includes('visualization') || t.includes('reporting')) icon = "line-chart";
        else if (t.includes('java')) icon = "coffee";
        else if (t.includes('php')) icon = "elephant";
        else if (t.includes('c#') || t.includes('.net') || t.includes('framework')) icon = "layers";
        else if (t.includes('visual studio')) icon = "monitor";
        else if (t.includes('asp.net') || t.includes('mvc') || t.includes('web')) icon = "globe";
        else if (t.includes('wildfly') || t.includes('server') || t.includes('jboss') || t.includes('deployed')) icon = "server";
        else if (t.includes('sql') || t.includes('database') || t.includes('firebase') || t.includes('jpa') || t.includes('pickle')) icon = "database";
        else if (t.includes('erp') || t.includes('business') || t.includes('enterprise') || t.includes('management')) icon = "briefcase";
        else if (t.includes('api') || t.includes('rest') || t.includes('endpoint')) icon = "globe";
        else if (t.includes('python') || t.includes('backend') || t.includes('ejb') || t.includes('logic')) icon = "cpu";
        else if (t.includes('scikit') || t.includes('ml') || t.includes('learn') || t.includes('model') || t.includes('kimball')) icon = "brain";
        else if (t.includes('tailwind') || t.includes('css') || t.includes('palette') || t.includes('design')) icon = "palette";
        else if (t.includes('react') || t.includes('vue') || t.includes('frontend')) icon = "atom";
        else if (t.includes('iot') || t.includes('hardware') || t.includes('esp32')) icon = "plug-zap";
        else if (t.includes('flask') || t.includes('fastapi') || t.includes('express')) icon = "zap";
        else if (t.includes('architecture') || t.includes('sln') || t.includes('solution') || t.includes('layer')) icon = "layers";
        else if (t.includes('js') || t.includes('javascript') || t.includes('ts')) icon = "file-json";

        return `
                                <span class="tech-pill">
                                    <i data-lucide="${icon}" style="width: 16px; height: 16px; stroke-width: 2.5px;"></i>
                                    ${tech}
                                </span>
                            `;
    }).join('')}
                    </div>
                </div>
                
                <div class="section-card">
                    <h2><i data-lucide="zap"></i> ${t.detail_features_title}</h2>
                    <ul class="features-list">
                        ${project.features.map(feat => `
                            <li>
                                <i data-lucide="check-circle-2"></i>
                                <span>${feat}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => { if (window.lucide) window.lucide.createIcons(); }, 10);
};

