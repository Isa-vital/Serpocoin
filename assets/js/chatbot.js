// ================================
// FLOATING CHATBOT WIDGET
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Create floating chatbot HTML
    const chatbotHTML = `
        <div class="floating-chatbot">
            <a href="https://ai.serpocoin.io" target="_blank" rel="noopener noreferrer" class="chatbot-toggle-btn" id="chatbotToggle" aria-label="Open Serpo AI Assistant">
                <i class="fas fa-robot"></i>
                <span class="chatbot-tooltip">Chat with Serpo AI</span>
            </a>
        </div>
    `;
    
    // Insert chatbot into body
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
});
