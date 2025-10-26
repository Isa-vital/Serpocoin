// ================================
// TOKENOMICS CHART - CHART.JS
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const chartCanvas = document.getElementById('tokenomicsChart');
    
    // Only run if canvas exists (tokenomics page)
    if (!chartCanvas) return;

    const ctx = chartCanvas.getContext('2d');
    
    // Chart data
    const data = {
        labels: [
            'Community & Airdrops (40%)',
            'Liquidity & Staking (30%)',
            'Partnerships & Merchants (15%)',
            'Ecosystem Development (15%)'
        ],
        datasets: [{
            data: [40, 30, 15, 15],
            backgroundColor: [
                'rgba(0, 255, 255, 0.8)',
                'rgba(157, 78, 221, 0.8)',
                'rgba(65, 97, 238, 0.8)',
                'rgba(255, 107, 53, 0.8)'
            ],
            borderColor: [
                'rgba(0, 255, 255, 1)',
                'rgba(157, 78, 221, 1)',
                'rgba(65, 97, 238, 1)',
                'rgba(255, 107, 53, 1)'
            ],
            borderWidth: 2,
            hoverOffset: 20
        }]
    };

    // Chart configuration
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#e0e7ff',
                        font: {
                            size: 14,
                            family: 'Inter'
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 14, 39, 0.95)',
                    titleColor: '#00ffff',
                    bodyColor: '#e0e7ff',
                    borderColor: 'rgba(0, 255, 255, 0.5)',
                    borderWidth: 1,
                    padding: 15,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        },
                        footer: function(tooltipItems) {
                            const total = 1000000000;
                            const percentage = tooltipItems[0].parsed;
                            const tokens = (total * percentage / 100).toLocaleString();
                            return 'Tokens: ' + tokens + ' SERPO';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            cutout: '60%'
        }
    };

    // Create chart
    const tokenomicsChart = new Chart(ctx, config);

    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tokenomicsChart.update('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(chartCanvas);

    // Add glow effect to chart on hover
    chartCanvas.addEventListener('mouseover', function() {
        this.style.filter = 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))';
    });

    chartCanvas.addEventListener('mouseout', function() {
        this.style.filter = 'none';
    });
});
