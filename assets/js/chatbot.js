// ================================
// FLOATING CHATBOT WIDGET
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Create floating chatbot HTML
    const chatbotHTML = `
        <div class="floating-chatbot">
            <button class="chatbot-toggle-btn" id="chatbotToggle" aria-label="Toggle Chatbot">
                <i class="fas fa-robot"></i>
            </button>
            
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chatbot-header">
                    <h4><i class="fas fa-robot me-2"></i>Serpo AI Assistant</h4>
                    <button class="chatbot-close" id="chatbotClose" aria-label="Close Chatbot">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chatbot-body">
                    <iframe
                        src="https://www.chatbase.co/chatbot-iframe/MT-8ZbLub2AH4W9NxVN6F"
                        width="100%"
                        height="100%"
                        frameborder="0"
                    ></iframe>
                </div>
            </div>
        </div>
    `;
    
    // Insert chatbot into body
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    
    // Get elements
    const toggleBtn = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const chatbotWindow = document.getElementById('chatbotWindow');
    
    // Toggle chatbot
    toggleBtn.addEventListener('click', function() {
        chatbotWindow.classList.toggle('active');
        toggleBtn.classList.toggle('active');
        
        // Change icon
        const icon = toggleBtn.querySelector('i');
        if (chatbotWindow.classList.contains('active')) {
            icon.className = 'fas fa-comments';
        } else {
            icon.className = 'fas fa-robot';
        }
    });
    
    // Close chatbot
    closeBtn.addEventListener('click', function() {
        chatbotWindow.classList.remove('active');
        toggleBtn.classList.remove('active');
        toggleBtn.querySelector('i').className = 'fas fa-robot';
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && chatbotWindow.classList.contains('active')) {
            chatbotWindow.classList.remove('active');
            toggleBtn.classList.remove('active');
            toggleBtn.querySelector('i').className = 'fas fa-robot';
        }
    });
});
