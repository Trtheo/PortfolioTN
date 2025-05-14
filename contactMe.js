document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your User ID
    emailjs.init('Ff9znu7JIWBWd_uOk'); // Replace with your actual User ID

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        try {
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Send email using EmailJS
            await emailjs.sendForm(
                'service_6kra4d2', // Replace with your Service ID
                'template_m5ub7ph', // Replace with your Template ID
                contactForm
            );

            // Show success message
            showMessage('Message sent successfully! I will respond shortly.', 'success');
            contactForm.reset();
        } catch (error) {
            // Show error message
            showMessage('Failed to send message. Please try again later.', 'error');
            console.error('Email sending error:', error);
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Show notification messages
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;

        document.body.appendChild(messageDiv);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});