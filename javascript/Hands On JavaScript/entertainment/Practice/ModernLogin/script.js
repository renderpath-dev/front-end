document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
    
    // Gradient background animation
    const body = document.querySelector('body');
    let gradientPosition = 0;
    
    function animateGradient() {
        gradientPosition += 0.5;
        if (gradientPosition > 200) gradientPosition = 0;
        
        body.style.backgroundImage = `linear-gradient(${gradientPosition}deg, #000000, #1a1a2e, #16213e, #0f3460, #000000)`;
        requestAnimationFrame(animateGradient);
    }
    
    // Start the gradient animation
    animateGradient();
    
    // Form validation
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        
        if (usernameInput.value.trim() === '') {
            showError(usernameInput, 'Username is required');
            isValid = false;
        } else {
            removeError(usernameInput);
        }
        
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else {
            removeError(passwordInput);
        }
        
        if (isValid) {
            // Simulate login - in a real app, you would send this to a server
            simulateLogin();
        }
    });
    
    function showError(input, message) {
        const parent = input.parentElement;
        removeError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        
        parent.appendChild(errorElement);
        input.style.borderColor = 'red';
    }
    
    function removeError(input) {
        const parent = input.parentElement;
        const error = parent.querySelector('.error-message');
        if (error) {
            parent.removeChild(error);
        }
        input.style.borderColor = '';
    }
    
    function simulateLogin() {
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerText;
        
        // Show loading state
        loginBtn.innerText = 'Logging in...';
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            loginBtn.innerText = 'Success!';
            loginBtn.style.backgroundColor = '#10B981'; // Success green
            
            // Reset after showing success
            setTimeout(() => {
                loginBtn.innerText = originalText;
                loginBtn.disabled = false;
                loginBtn.style.backgroundColor = '';
                
                // Clear form
                loginForm.reset();
                
                // Show success message
                alert('Login successful! This is where you would redirect to the dashboard.');
            }, 1500);
        }, 2000);
    }
    
    // Add subtle animation to input fields when focused
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`${provider} login would happen here. This would connect to the ${provider} OAuth API.`);
        });
    });
});