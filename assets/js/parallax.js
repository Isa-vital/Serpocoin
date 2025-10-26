// ================================
// PARALLAX EFFECTS FOR VISION PAGE
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const parallaxLayers = document.querySelectorAll('.parallax-stars');
    
    if (parallaxLayers.length === 0) return;

    // Parallax scroll effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxLayers.forEach((layer, index) => {
            const speed = 0.3 + (index * 0.15);
            const yPos = -(scrolled * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    // Mouse parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateParallax() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        parallaxLayers.forEach((layer, index) => {
            const depth = (index + 1) * 10;
            layer.style.transform = `translate(${currentX * depth}px, ${currentY * depth}px)`;
        });
        
        requestAnimationFrame(animateParallax);
    }

    animateParallax();
});
