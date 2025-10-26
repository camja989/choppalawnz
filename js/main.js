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

// Contact Dropdown Mobile Toggle
const contactDropdown = document.querySelector('.contact-dropdown');
const contactDropdownBtn = contactDropdown?.querySelector('button');
const contactDropdownContent = contactDropdown?.querySelector('.contact-dropdown-content');

if (contactDropdownBtn) {
    contactDropdownBtn.addEventListener('click', (e) => {
        // On mobile, toggle the dropdown
        if (window.innerWidth <= 768) {
            e.stopPropagation();
            contactDropdown.classList.toggle('mobile-open');
        }
    });
}

// Close dropdown when clicking outside, but not when clicking inside
document.addEventListener('click', (e) => {
    if (contactDropdown && !contactDropdown.contains(e.target)) {
        contactDropdown.classList.remove('mobile-open');
    }
});

// Prevent dropdown from closing when clicking on links (for both hover and mobile)
if (contactDropdownContent) {
    contactDropdownContent.addEventListener('click', (e) => {
        // Allow the link to work normally
        e.stopPropagation();
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

// Calculator functionality (for calculator.html) - UPDATED WITH PREMIUM PRICING
function calculateLawnPrice() {
    const squareMeters = parseFloat(document.getElementById('squareMeters')?.value) || 0;
    const address = document.getElementById('address')?.value || '';
    const clippingsRemoval = document.getElementById('clippingsRemoval')?.checked || false;
    const firstMow = document.getElementById('firstMow')?.checked || false;
    
    if (squareMeters <= 0) {
        alert('Please enter a valid square meter value');
        return;
    }

    // PREMIUM Wellington lawn mowing rates - SIGNIFICANTLY INCREASED
    const baseRatePerSqm = 0.28; // $0.28 per square meter (3.5x increase)
    const minimumCharge = 120; // Minimum $120 charge (increased from $45)
    
    // Calculate base mowing cost
    let mowingCost = Math.max(squareMeters * baseRatePerSqm, minimumCharge);
    
    // ONE-OFF MOW PREMIUM - Apply massive surcharge for one-off mows
    let oneOffSurcharge = 0;
    if (firstMow) {
        // One-off mows get 80-150% surcharge due to overgrown grass and no ongoing revenue
        const surchargePercent = 0.8 + (Math.random() * 0.7); // Random between 80-150%
        oneOffSurcharge = mowingCost * surchargePercent;
        mowingCost += oneOffSurcharge;
    }
    
    // Calculate travel cost to Karori (INCREASED RATES)
    let travelCost = 0;
    if (address.toLowerCase().includes('karori') || address.toLowerCase().includes('wellington')) {
        // Increased IRD rate to $1.20 per km (2024)
        const avgDistanceToKarori = 18; // Increased average distance
        const returnTripDistance = avgDistanceToKarori * 2;
        travelCost = returnTripDistance * 1.20;
    } else if (address) {
        // Increased travel cost for other Wellington suburbs
        travelCost = 45; // Increased from $20
    }
    
    // Clippings removal cost - PREMIUM PRICING
    let clippingsCost = 0;
    if (clippingsRemoval) {
        clippingsCost = firstMow ? 65 : 35; // Significantly increased from $20/$10
    }
    
    // Calculate totals
    const total = mowingCost + travelCost + clippingsCost;
    
    // Display results with one-off warning
    const resultDiv = document.getElementById('calculatorResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h3>Premium Price Estimate</h3>
            ${firstMow ? `
            <div style="background: #ffebee; border: 2px solid #f44336; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                <h4 style="color: #d32f2f; margin-bottom: 0.5rem;">
                    <i class="fas fa-exclamation-triangle"></i> One-Off Mow Premium Pricing
                </h4>
                <p style="color: #d32f2f; font-weight: 600; margin: 0;">
                    One-off mows are priced at a premium ($250-$750+ range) due to overgrown grass requiring specialized equipment 
                    and significantly more time. Regular service customers receive much better value.
                </p>
            </div>
            ` : ''}
            <div class="price-breakdown">
                <div class="price-item">
                    <span>Professional lawn mowing (${squareMeters}m²)</span>
                    <span>$${(mowingCost - oneOffSurcharge).toFixed(2)}</span>
                </div>
                ${oneOffSurcharge > 0 ? `
                <div class="price-item" style="color: #d32f2f;">
                    <span>One-off mow premium surcharge</span>
                    <span>+$${oneOffSurcharge.toFixed(2)}</span>
                </div>
                ` : ''}
                ${travelCost > 0 ? `
                <div class="price-item">
                    <span>Travel cost (premium rate)</span>
                    <span>$${travelCost.toFixed(2)}</span>
                </div>
                ` : ''}
                ${clippingsCost > 0 ? `
                <div class="price-item">
                    <span>Clippings removal (premium service)</span>
                    <span>$${clippingsCost.toFixed(2)}</span>
                </div>
                ` : ''}
                <div class="price-item">
                    <strong>Total Premium Service</strong>
                    <strong>$${total.toFixed(2)}</strong>
                </div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background: #e8f5e8; border-radius: 0.5rem; font-size: 0.9rem; color: #2d5016;">
                <strong>💡 Save significantly with ongoing service:</strong> Regular customers pay standard rates without premium surcharges! 
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
