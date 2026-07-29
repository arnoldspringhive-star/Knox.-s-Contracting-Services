document.addEventListener('DOMContentLoaded', () => {
    // Calculate scrollbar width for pixel-perfect fixed header alignment
    const setScrollbarWidth = () => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    };
    setScrollbarWidth();
    window.addEventListener('resize', setScrollbarWidth);

    /* ==========================================================================
       Sticky Navigation
       ========================================================================== */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* ==========================================================================
       Scroll Reveal Animation
       ========================================================================== */
    function reveal() {
        var reveals = document.querySelectorAll('.reveal');
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', reveal);

    // Trigger once on load
    reveal();

    /* ==========================================================================
       Interactive Tabs (Why Choose Us)
       ========================================================================== */
    const tabItems = document.querySelectorAll('.tab-item');
    const tabImages = document.querySelectorAll('.tab-image');

    if (tabItems.length > 0 && tabImages.length > 0) {
        tabItems.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabItems.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                // Get the data-tab number
                const tabId = tab.getAttribute('data-tab');

                // Remove active class from all images
                tabImages.forEach(img => img.classList.remove('active'));
                // Add active class to corresponding image
                const targetImg = document.getElementById(`tab-img-${tabId}`);
                if (targetImg) {
                    targetImg.classList.add('active');
                }
            });
        });
    }

    /* ==========================================================================
       Contact Form Submission
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple visual feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.style.opacity = '0.8';

            // Simulate network request
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = 'Message Sent Successfully!';
                btn.style.backgroundColor = '#4caf50';
                btn.style.color = '#fff';
                btn.style.borderColor = '#4caf50';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});
