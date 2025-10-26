// ================================
// CONTACT FORM - AJAX SUBMISSION
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            
            fetch('contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Message Sent!',
                        text: 'Thank you for contacting us. We\'ll get back to you soon!',
                        background: '#0a0e27',
                        color: '#e0e7ff',
                        confirmButtonColor: '#00ffff',
                        confirmButtonText: 'Awesome!'
                    });
                    contactForm.reset();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message || 'Something went wrong. Please try again.',
                        background: '#0a0e27',
                        color: '#e0e7ff',
                        confirmButtonColor: '#9d4edd'
                    });
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Connection Error',
                    text: 'Unable to send message. Please check your internet connection.',
                    background: '#0a0e27',
                    color: '#e0e7ff',
                    confirmButtonColor: '#9d4edd'
                });
                console.error('Error:', error);
            });
        });
    }

    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Subscribing...';
            
            fetch('contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Subscribed!',
                        text: 'Welcome to the Serpo community! Check your email for confirmation.',
                        background: '#0a0e27',
                        color: '#e0e7ff',
                        confirmButtonColor: '#00ffff',
                        confirmButtonText: 'Great!'
                    });
                    newsletterForm.reset();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Subscription Failed',
                        text: data.message || 'Something went wrong. Please try again.',
                        background: '#0a0e27',
                        color: '#e0e7ff',
                        confirmButtonColor: '#9d4edd'
                    });
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                Swal.fire({
                    icon: 'error',
                    title: 'Connection Error',
                    text: 'Unable to subscribe. Please try again later.',
                    background: '#0a0e27',
                    color: '#e0e7ff',
                    confirmButtonColor: '#9d4edd'
                });
                console.error('Error:', error);
            });
        });
    }

    // Form field validation effects
    const inputs = document.querySelectorAll('.cosmic-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#00ffff';
            this.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = 'rgba(0, 255, 255, 0.2)';
                this.style.boxShadow = 'none';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.style.borderColor = '#00ffff';
            } else {
                this.style.borderColor = '#ff6b35';
            }
        });
    });
});
