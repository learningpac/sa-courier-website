// SA Courier Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .cta-button, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that point to an ID on the page
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            
            // Clear the form
            contactForm.reset();
            
            // Show success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Thank you for your message, ${name}!</h3>
                <p>We'll get back to you shortly at ${email}.</p>
                <button class="close-btn">Close</button>
            `;
            
            formContainer.appendChild(successMessage);
            
            // Add event listener to close button
            const closeBtn = successMessage.querySelector('.close-btn');
            closeBtn.addEventListener('click', function() {
                successMessage.remove();
            });
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if(successMessage.parentElement) {
                    successMessage.remove();
                }
            }, 5000);
        });
    }
    
    // Add animation to stats when they come into view
    const stats = document.querySelectorAll('.stat-number');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to animate counting up
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Check if stats are in viewport on scroll
    let animated = false;
    window.addEventListener('scroll', function() {
        if(!animated && stats.length > 0 && isInViewport(stats[0])) {
            animated = true;
            
            stats.forEach(stat => {
                const value = parseInt(stat.textContent);
                animateValue(stat, 0, value, 2000);
            });
        }
    });
    
    // Trigger initial check
    window.dispatchEvent(new Event('scroll'));
});

// Add styles for success message
const style = document.createElement('style');
style.textContent = `
    .success-message {
        background-color: #d4edda;
        color: #155724;
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 2rem;
        text-align: center;
        animation: fadeIn 0.5s;
    }
    
    .success-message h3 {
        margin-top: 0;
        color: #155724;
    }
    
    .close-btn {
        background-color: #155724;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 1rem;
    }
    
    .close-btn:hover {
        background-color: #0f3e1a;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
