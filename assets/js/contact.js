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
                        title: '✅ Message Sent!',
                        html: '<p style="font-size: 16px; margin-top: 10px;">Thank you for contacting us!<br>We\'ll get back to you soon.</p>',
                        background: '#0a0e27',
                        color: '#e0e7ff',
                        confirmButtonColor: '#00ffff',
                        confirmButtonText: '<i class="fas fa-check me-2"></i>Awesome!',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        },
                        customClass: {
                            popup: 'cosmic-swal-popup',
                            title: 'cosmic-swal-title',
                            confirmButton: 'cosmic-swal-button'
                        },
                        timer: 5000,
                        timerProgressBar: true
                    });
                    contactForm.reset();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '❌ Oops...',
                        html: '<p style="font-size: 16px; margin-top: 10px;">' + (data.message || 'Something went wrong. Please try again.') + '</p>',
                        background: '#0a0e27',
                        color: '#e0e7ff',
                        confirmButtonColor: '#ff6b6b',
                        confirmButtonText: '<i class="fas fa-redo me-2"></i>Try Again',
                        showClass: {
                            popup: 'animate__animated animate__shakeX'
                        },
                        customClass: {
                            popup: 'cosmic-swal-popup',
                            title: 'cosmic-swal-title',
                            confirmButton: 'cosmic-swal-button-error'
                        }
                    });
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                Swal.fire({
                    icon: 'error',
                    title: '⚠️ Connection Error',
                    html: '<p style="font-size: 16px; margin-top: 10px;">Unable to send message.<br>Please check your internet connection.</p>',
                    background: '#0a0e27',
                    color: '#e0e7ff',
                    confirmButtonColor: '#ff6b6b',
                    confirmButtonText: '<i class="fas fa-wifi me-2"></i>OK',
                    showClass: {
                        popup: 'animate__animated animate__shakeX'
                    },
                    customClass: {
                        popup: 'cosmic-swal-popup',
                        title: 'cosmic-swal-title',
                        confirmButton: 'cosmic-swal-button-error'
                    }
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
                        title: '🚀 Subscribed!',
                        html: '<p style="font-size: 16px; margin-top: 10px;">Welcome to the Serpo community!<br>Check your email for confirmation.</p>',
                        background: '#0a0e27',
                        color: '#e0e7ff',
                        confirmButtonColor: '#00ffff',
                        confirmButtonText: '<i class="fas fa-rocket me-2"></i>Great!',
                        showClass: {
                            popup: 'animate__animated animate__bounceIn'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        },
                        customClass: {
                            popup: 'cosmic-swal-popup',
                            title: 'cosmic-swal-title',
                            confirmButton: 'cosmic-swal-button'
                        },
                        timer: 5000,
                        timerProgressBar: true
                    });
                    newsletterForm.reset();
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: '⚠️ Subscription Failed',
                        html: '<p style="font-size: 16px; margin-top: 10px;">' + (data.message || 'Something went wrong. Please try again.') + '</p>',
                        background: '#0a0e27',
                        color: '#e0e7ff',
                        confirmButtonColor: '#ffd700',
                        confirmButtonText: '<i class="fas fa-redo me-2"></i>Try Again',
                        showClass: {
                            popup: 'animate__animated animate__shakeX'
                        },
                        customClass: {
                            popup: 'cosmic-swal-popup',
                            title: 'cosmic-swal-title',
                            confirmButton: 'cosmic-swal-button-warning'
                        }
                    });
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                Swal.fire({
                    icon: 'error',
                    title: '⚠️ Connection Error',
                    html: '<p style="font-size: 16px; margin-top: 10px;">Unable to subscribe.<br>Please try again later.</p>',
                    background: '#0a0e27',
                    color: '#e0e7ff',
                    confirmButtonColor: '#ff6b6b',
                    confirmButtonText: '<i class="fas fa-times me-2"></i>OK',
                    showClass: {
                        popup: 'animate__animated animate__shakeX'
                    },
                    customClass: {
                        popup: 'cosmic-swal-popup',
                        title: 'cosmic-swal-title',
                        confirmButton: 'cosmic-swal-button-error'
                    }
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
