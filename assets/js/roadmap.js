// ================================
// ROADMAP - DYNAMIC LOADING
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const roadmapContainer = document.getElementById('roadmap-container');
    
    // Only run if container exists (roadmap page)
    if (!roadmapContainer) return;

    // Fetch roadmap data
    fetch('data/roadmap.json')
        .then(response => response.json())
        .then(data => {
            renderRoadmap(data);
            animateRoadmap();
        })
        .catch(error => {
            console.error('Error loading roadmap:', error);
            roadmapContainer.innerHTML = '<p class="text-center text-muted">Unable to load roadmap data.</p>';
        });

    function renderRoadmap(roadmapData) {
        roadmapContainer.innerHTML = '';
        
        roadmapData.forEach((item, index) => {
            const roadmapItem = document.createElement('div');
            roadmapItem.className = `roadmap-item ${item.status}`;
            roadmapItem.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
            roadmapItem.setAttribute('data-aos-delay', index * 100);
            
            roadmapItem.innerHTML = `
                <div class="roadmap-icon">
                    <i class="${item.icon}"></i>
                </div>
                <div class="roadmap-content">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <span class="badge ${getStatusBadgeClass(item.status)} mb-2">${item.status.replace('-', ' ').toUpperCase()}</span>
                            <h3 class="gradient-text mb-2">${item.phase}</h3>
                            <p class="text-cyan mb-0"><i class="fas fa-calendar-alt me-2"></i>${item.timeline}</p>
                        </div>
                    </div>
                    <p class="mb-3">${item.description}</p>
                    <h5 class="text-purple mb-3"><i class="fas fa-tasks me-2"></i>Key Milestones:</h5>
                    <ul class="custom-list">
                        ${item.milestones.map(milestone => `<li>${milestone}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            roadmapContainer.appendChild(roadmapItem);
        });
    }

    function getStatusBadgeClass(status) {
        switch(status) {
            case 'completed':
                return 'bg-success';
            case 'in-progress':
                return 'bg-primary';
            case 'upcoming':
                return 'bg-warning';
            default:
                return 'bg-secondary';
        }
    }

    function animateRoadmap() {
        if (typeof gsap !== 'undefined') {
            gsap.from('.roadmap-item', {
                scrollTrigger: {
                    trigger: '.roadmap-timeline',
                    start: 'top 80%',
                },
                y: 100,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: 'power3.out'
            });
        }
    }
});
