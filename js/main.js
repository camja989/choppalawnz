// Mobile and Desktop Navigation Toggle - Full Screen Menu
const hamburger = document.querySelector('.hamburger');
const navOverlay = document.querySelector('.nav-overlay');

if (hamburger && navOverlay) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navOverlay.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside menu content
    navOverlay.addEventListener('click', (e) => {
        if (e.target === navOverlay) {
            hamburger.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
            hamburger.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
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

// Calculator functionality (for calculator.html) - UPDATED PRICING STRUCTURE
function calculateLawnPrice() {
    const squareMeters = parseFloat(document.getElementById('squareMeters')?.value) || 0;
    const address = document.getElementById('address')?.value || '';
    const clippingsRemoval = document.getElementById('clippingsRemoval')?.checked || false;
    const firstMow = document.getElementById('firstMow')?.checked || false;
    
    if (squareMeters <= 0) {
        alert('Please enter a valid square meter value');
        return;
    }

    // NEW TIERED PRICING STRUCTURE
    const minimumCharge = 49.90; // Minimum charge for 0-20 sqm
    let mowingCost;
    
    if (squareMeters <= 20) {
        mowingCost = minimumCharge;
    } else if (squareMeters <= 40) {
        mowingCost = minimumCharge * 2; // Double for 20-40 sqm
    } else if (squareMeters <= 80) {
        mowingCost = minimumCharge * 4; // 4x for 40-80 sqm
    } else {
        // For lawns over 80 sqm, calculate proportionally
        // 80 sqm = 4x minimum (199.60), so rate per sqm = 199.60/80 = $2.495/sqm
        const rate = (minimumCharge * 4) / 80;
        mowingCost = squareMeters * rate;
    }
    
    // ONE-OFF MOW PREMIUM - Apply surcharge for one-off mows
    let oneOffSurcharge = 0;
    if (firstMow) {
        // One-off mows get 80-150% surcharge due to overgrown grass
        const surchargePercent = 1.0; // 100% surcharge for consistency
        oneOffSurcharge = mowingCost * surchargePercent;
        mowingCost += oneOffSurcharge;
    }
    
    // Calculate travel cost with $9.90 minimum
    let travelCost = 9.90; // Minimum travel cost
    if (address.toLowerCase().includes('karori') || address.toLowerCase().includes('wellington')) {
        // IRD rate: $1.00 per km for return trips over 10km
        const avgDistanceToKarori = 15; // Average distance to Karori
        const returnTripDistance = avgDistanceToKarori * 2; // 30km return
        if (returnTripDistance > 10) {
            const chargeableKm = returnTripDistance - 10;
            travelCost = 9.90 + (chargeableKm * 1.00);
        }
    }
    
    // Clippings removal cost - TIERED PRICING
    let clippingsCost = 0;
    if (clippingsRemoval) {
        if (firstMow) {
            // One-off mows
            clippingsCost = 29.90;
        } else if (squareMeters > 100) {
            // First mow on larger properties (ongoing customers)
            clippingsCost = 19.90;
        } else {
            // Regular ongoing maintenance
            clippingsCost = 9.90;
        }
    }
    
    // Calculate totals
    const total = mowingCost + travelCost + clippingsCost;
    
    // Display results with one-off warning
    const resultDiv = document.getElementById('calculatorResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h3>Price Estimate</h3>
            ${firstMow ? `
            <div style="background: #ffebee; border: 2px solid #f44336; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                <h4 style="color: #d32f2f; margin-bottom: 0.5rem;">
                    <i class="fas fa-exclamation-triangle"></i> One-Off Mow Premium Pricing
                </h4>
                <p style="color: #d32f2f; font-weight: 600; margin: 0;">
                    One-off mows are priced at a premium ($249.90-$749.90+ range) due to overgrown grass requiring specialized equipment 
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
                    <span>One-off mow premium surcharge (100%)</span>
                    <span>+$${oneOffSurcharge.toFixed(2)}</span>
                </div>
                ` : ''}
                <div class="price-item">
                    <span>Travel cost (min $9.90, $1/km over 10km return)</span>
                    <span>$${travelCost.toFixed(2)}</span>
                </div>
                ${clippingsCost > 0 ? `
                <div class="price-item">
                    <span>Clippings removal ${firstMow ? '(one-off)' : squareMeters > 100 ? '(first mow, large)' : '(ongoing)'}</span>
                    <span>$${clippingsCost.toFixed(2)}</span>
                </div>
                ` : ''}
                <div class="price-item">
                    <strong>Total Service Cost</strong>
                    <strong>$${total.toFixed(2)}</strong>
                </div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background: #e8f5e8; border-radius: 0.5rem; font-size: 0.9rem; color: #2d5016;">
                <strong>💡 Save with ongoing service:</strong> Regular customers pay standard rates without premium surcharges! 
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
