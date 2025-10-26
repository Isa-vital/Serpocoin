// ================================
// SERPO COIN - MAIN JAVASCRIPT
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.cosmic-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // GSAP Animations for hero section
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate stats boxes
        gsap.utils.toArray('.stats-box').forEach((box, i) => {
            gsap.from(box, {
                scrollTrigger: {
                    trigger: box,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                delay: i * 0.2
            });
        });

        // Animate feature cards
        gsap.utils.toArray('.feature-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1
            });
        });
    }

    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('.btn-gradient, .btn-outline-light');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animated counter for stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Observe elements for counter animation
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.dataset.count);
                if (value) {
                    animateCounter(target, value);
                    observer.unobserve(target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-count]').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for backgrounds
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-stars');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Dynamic year in footer
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Typing effect for hero text (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Progressive image loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add active state to current page nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Particle cursor effect (optional enhancement)
    let particles = [];
    const particleCount = 20;
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            z-index: 9999;
        `;
        document.body.appendChild(particle);
        
        particles.push({ element: particle, life: 1 });
        
        if (particles.length > particleCount) {
            const old = particles.shift();
            old.element.remove();
        }
    }

    // Animation frame for particle fade
    function animateParticles() {
        particles.forEach((particle, index) => {
            particle.life -= 0.02;
            particle.element.style.opacity = particle.life;
            
            if (particle.life <= 0) {
                particle.element.remove();
                particles.splice(index, 1);
            }
        });
        requestAnimationFrame(animateParticles);
    }

    // Uncomment to enable particle cursor
    // document.addEventListener('mousemove', (e) => {
    //     if (Math.random() > 0.8) {
    //         createParticle(e.clientX, e.clientY);
    //     }
    // });
    // animateParticles();

    console.log('%c🛸 Welcome to Serpo Coin! 🌌', 'color: #00ffff; font-size: 20px; font-weight: bold;');
    console.log('%cA cosmic legend reborn in Web3', 'color: #9d4edd; font-size: 14px;');
});

// Page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
