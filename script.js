// EmailJS Setup - REPLACE WITH YOUR KEYS FROM emailjs.com
emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Get from emailjs.com dashboard

// Smooth scroll
function scrollToForm() {
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// Form submit
document.getElementById('gameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        proof: document.getElementById('proof').value,
        discord: document.getElementById('discord').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        title: document.getElementById('title').value,
        gameTypes: Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.value).join(', ') || 'Not specified',
        description: document.getElementById('description').value
    };
    
    // Show loading
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    // Send email
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Hide form, show success
            document.querySelector('.order-form').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
            
        }, function(error) {
            console.log('FAILED...', error);
            alert('Error sending! Check console or try again.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 191, 255, 0.95)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #00bfff, #0099cc)';
    }
});
