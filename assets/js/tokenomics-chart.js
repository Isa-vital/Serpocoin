// ================================
// TOKENOMICS CHART - CHART.JS
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const chartCanvas = document.getElementById('tokenomicsChart');
    
    // Only run if canvas exists (tokenomics page)
    if (!chartCanvas) return;

    const ctx = chartCanvas.getContext('2d');
    
    // Chart data - Matching the updated token allocation
    const data = {
        labels: [
            'Community & Airdrops',
            'Partnerships & Merchants',
            'Future System Upgrades',
            'Creator Wallet'
        ],
        datasets: [{
            data: [0.5, 2, 2, 1],
            backgroundColor: [
                '#00D9FF', // Cyan
                '#9D4EDD', // Purple
                '#FF6B53', // Coral/Orange
                '#FFD700'  // Gold
            ],
            borderColor: [
                '#00D9FF',
                '#9D4EDD',
                '#FF6B53',
                '#FFD700'
            ],
            borderWidth: 3,
            hoverOffset: 15,
            spacing: 2
        }]
    };

    // Chart configuration
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
                padding: 10
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#e0e7ff',
                        font: {
                            size: 15,
                            family: 'Inter',
                            weight: '600'
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 12,
                        boxHeight: 12,
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${data.datasets[0].data[i]}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 14, 39, 0.98)',
                    titleColor: '#00ffff',
                    bodyColor: '#e0e7ff',
                    borderColor: 'rgba(0, 217, 255, 0.6)',
                    borderWidth: 2,
                    padding: 15,
                    displayColors: true,
                    titleFont: {
                        size: 16,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 14
                    },
                    callbacks: {
                        label: function(context) {
                            const percentage = context.parsed;
                            return ` ${percentage}% of Total Supply`;
                        },
                        footer: function(tooltipItems) {
                            const total = 1000000000;
                            const percentage = tooltipItems[0].parsed;
                            const tokens = (total * percentage / 100).toLocaleString();
                            return '\n' + tokens + ' SERPO';
                        }
                    },
                    footerFont: {
                        size: 13,
                        weight: 'bold'
                    },
                    footerColor: '#00ffff'
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            cutout: '65%'
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
