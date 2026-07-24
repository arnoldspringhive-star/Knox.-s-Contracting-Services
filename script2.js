document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if(navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#fff';
                navLinks.style.padding = '2rem 0';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            }
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger immediately on load

    // 4. Video Modal Logic
    const videoBtn = document.querySelector('.editorial-image');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const aboutVideo = document.getElementById('aboutVideo');

    if (videoBtn && videoModal) {
        videoBtn.addEventListener('click', () => {
            videoModal.classList.add('active');
            aboutVideo.play();
        });

        closeModal.addEventListener('click', () => {
            videoModal.classList.remove('active');
            aboutVideo.pause();
        });

        // Close on outside click
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                aboutVideo.pause();
            }
        });
    }

    // 5. Carousel Logic (Loop & Auto-play)
    const track = document.getElementById('servTrack');
    const nextBtn = document.getElementById('servNext');
    const prevBtn = document.getElementById('servPrev');

    if (track && nextBtn && prevBtn) {
        const scrollNext = () => {
            const card = track.querySelector('.carousel-card');
            if(!card) return;
            const cardWidth = card.offsetWidth + 32; // approx gap
            
            // Check if we hit the right end
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' }); // Loop back to start
            } else {
                track.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        };

        const scrollPrev = () => {
            const card = track.querySelector('.carousel-card');
            if(!card) return;
            const cardWidth = card.offsetWidth + 32;
            
            // Check if we hit the left end
            if (track.scrollLeft <= 10) {
                track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' }); // Loop to end
            } else {
                track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
        };

        nextBtn.addEventListener('click', scrollNext);
        prevBtn.addEventListener('click', scrollPrev);

        // Auto-loop every 3 seconds
        let autoPlay = setInterval(scrollNext, 3000);
        
        // Pause on hover
        const wrapper = document.querySelector('.carousel-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
            wrapper.addEventListener('mouseleave', () => {
                autoPlay = setInterval(scrollNext, 3000);
            });
        }
    }
    // 6. Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const body = item.querySelector('.accordion-body');
            const icon = this.querySelector('.accordion-icon i');
            
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                body.style.display = 'none';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                document.querySelectorAll('.accordion-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-body').style.display = 'none';
                    const otherIcon = otherItem.querySelector('.accordion-icon i');
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                });
                
                item.classList.add('active');
                body.style.display = 'block';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });
});
