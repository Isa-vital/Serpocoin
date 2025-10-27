// ================================
// ROADMAP - DYNAMIC LOADING
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const roadmapContainer = document.getElementById('roadmap-container');
    
    // Only run if container exists (roadmap page)
    if (!roadmapContainer) return;

    // Fetch roadmap data
    fetch('data/roadmap.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Roadmap data loaded:', data);
            renderRoadmap(data);
            animateRoadmap();
        })
        .catch(error => {
            console.error('Error loading roadmap:', error);
            roadmapContainer.innerHTML = `
                <div class="text-center text-light p-5">
                    <i class="fas fa-exclamation-triangle fa-3x mb-3 text-warning"></i>
                    <p>Unable to load roadmap data.</p>
                    <p class="small text-light">Error: ${error.message}</p>
                </div>
            `;
        });

    function renderRoadmap(roadmapData) {
        // Clear container only after successful data load
        roadmapContainer.innerHTML = '';
        
        roadmapData.forEach((item, index) => {
            const roadmapItem = document.createElement('div');
            roadmapItem.className = `roadmap-item ${item.status}`;
            roadmapItem.setAttribute('data-aos', 'fade-up');
            roadmapItem.setAttribute('data-aos-delay', index * 100);
            roadmapItem.style.display = 'grid';
            roadmapItem.style.opacity = '1';
            roadmapItem.style.visibility = 'visible';
            
            roadmapItem.innerHTML = `
                <div class="roadmap-icon">
                    <i class="${item.icon}"></i>
                </div>
                <div class="roadmap-timeline-date">
                    <span class="phase-number">${item.phase.split(':')[0]}</span>
                    <span><i class="fas fa-calendar-alt me-2"></i>${item.timeline}</span>
                </div>
                <div class="roadmap-content">
                    <div class="mb-3">
                        <span class="badge ${getStatusBadgeClass(item.status)} mb-2">${item.status.replace('-', ' ').toUpperCase()}</span>
                        <h3>${item.phase.split(':')[1] || item.phase}</h3>
                        ${item.subtitle ? `<p class="subtitle">"${item.subtitle}"</p>` : ''}
                    </div>
                    <p class="mb-3">${item.description}</p>
                    <h5><i class="fas fa-tasks me-2"></i>Key Milestones:</h5>
                    <ul class="custom-list">
                        ${item.milestones.map(milestone => `<li>${milestone}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            roadmapContainer.appendChild(roadmapItem);
        });
        
        console.log('Roadmap items rendered:', roadmapData.length);
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
