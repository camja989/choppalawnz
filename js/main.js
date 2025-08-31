// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Calculator functionality (for calculator.html)
function calculateLawnPrice() {
    const squareMeters = parseFloat(document.getElementById('squareMeters')?.value) || 0;
    const address = document.getElementById('address')?.value || '';
    const clippingsRemoval = document.getElementById('clippingsRemoval')?.checked || false;
    const firstMow = document.getElementById('firstMow')?.checked || false;
    
    if (squareMeters <= 0) {
        alert('Please enter a valid square meter value');
        return;
    }

    // Wellington lawn mowing rates (per square meter)
    const baseRatePerSqm = 0.08; // $0.08 per square meter
    const minimumCharge = 45; // Minimum $45 charge
    
    // Calculate base mowing cost
    let mowingCost = Math.max(squareMeters * baseRatePerSqm, minimumCharge);
    
    // Calculate travel cost to Karori (if address provided)
    let travelCost = 0;
    if (address.toLowerCase().includes('karori') || address.toLowerCase().includes('wellington')) {
        // IRD rate is $0.83 per km (2024)
        const avgDistanceToKarori = 15; // Average distance to Karori in km
        const returnTripDistance = avgDistanceToKarori * 2;
        travelCost = returnTripDistance * 0.83;
    } else if (address) {
        // Default travel cost for other Wellington suburbs
        travelCost = 20;
    }
    
    // Clippings removal cost
    let clippingsCost = 0;
    if (clippingsRemoval) {
        clippingsCost = firstMow ? 20 : 10;
    }
    
    // Calculate totals
    const total = mowingCost + travelCost + clippingsCost;
    
    // Display results
    const resultDiv = document.getElementById('calculatorResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h3>Price Estimate</h3>
            <div class="price-breakdown">
                <div class="price-item">
                    <span>Lawn mowing (${squareMeters}m²)</span>
                    <span>$${mowingCost.toFixed(2)}</span>
                </div>
                ${travelCost > 0 ? `
                <div class="price-item">
                    <span>Travel cost</span>
                    <span>$${travelCost.toFixed(2)}</span>
                </div>
                ` : ''}
                ${clippingsCost > 0 ? `
                <div class="price-item">
                    <span>Clippings removal</span>
                    <span>$${clippingsCost.toFixed(2)}</span>
                </div>
                ` : ''}
                <div class="price-item">
                    <strong>Total</strong>
                    <strong>$${total.toFixed(2)}</strong>
                </div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background: #e8f5e8; border-radius: 0.5rem; font-size: 0.9rem; color: #2d5016;">
                <strong>💡 Save with ongoing service:</strong> Sign up for regular mowing and get your first mow FREE! 
                <a href="contact.html#contact-form" style="color: #ff6b9d; font-weight: 600;">Get Quote</a>
            </div>
        `;
        resultDiv.style.display = 'block';
    }
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ff6b9d';
            isValid = false;
        } else {
            field.style.borderColor = 'rgba(255, 107, 157, 0.2)';
        }
    });
    
    return isValid;
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .calculator-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading state to buttons
function addLoadingState(button, originalText) {
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Handle quote button clicks
document.addEventListener('DOMContentLoaded', () => {
    const quoteButtons = document.querySelectorAll('a[href*="contact.html#contact-form"]');
    quoteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add a small delay for better UX
            const originalText = button.innerHTML;
            addLoadingState(button, originalText);
        });
    });
});

// Price calculator auto-update
document.addEventListener('DOMContentLoaded', () => {
    const calculatorInputs = document.querySelectorAll('#squareMeters, #address, #clippingsRemoval, #firstMow');
    calculatorInputs.forEach(input => {
        input.addEventListener('input', () => {
            // Auto-calculate after a short delay
            clearTimeout(window.calcTimeout);
            window.calcTimeout = setTimeout(calculateLawnPrice, 500);
        });
    });
});
