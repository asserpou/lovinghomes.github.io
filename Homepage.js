document.addEventListener('DOMContentLoaded', function() {

// =============================================
// PACKAGES DATA
// =============================================

const packagesData = {
    premium: {
        id: 'premium',
        name: 'Premium Package',
        badge: 'Best Choice',
        color: '#fbbf24',
        bgGradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        features: [
            { title: 'Four walks/activities per day', desc: 'Multiple exercise sessions throughout the day' },
            { title: 'Private grass area', desc: 'Exclusive outdoor space for your pet' },
            { title: 'Daily updates/photos', desc: 'Stay connected with real-time updates' },
            { title: 'Treats (as agreed with owner)', desc: 'Special snacks based on your preferences' }
        ],
        price: { original: '$300', current: '$200', unit: 'per night' }
    },
    classic: {
        id: 'classic',
        name: 'Classic Package',
        badge: 'Most Popular',
        color: '#2563eb',
        bgGradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        features: [
            { title: 'Three walks/activities per day', desc: 'Regular exercise and outdoor time' },
            { title: 'Indoor play barn', desc: 'Climate-controlled play environment' },
            { title: 'Zen zone', desc: 'Quiet relaxation area for downtime' },
            { title: 'Grooming session', desc: 'Professional grooming included' }
        ],
        price: { original: '$200', current: '$150', unit: 'per night' }
    },
    day: {
        id: 'day',
        name: 'Day Package',
        badge: 'Flexible',
        color: '#10b981',
        bgGradient: 'linear-gradient(135deg, #10b981, #059669)',
        features: [
            { title: 'Two walks per day', desc: 'Morning and afternoon exercise' },
            { title: 'External play area', desc: 'Outdoor play space access' },
            { title: 'Agility track', desc: 'Fun obstacle course activities' },
            { title: 'Sand digging pit', desc: 'Natural play and enrichment area' }
        ],
        price: { original: '$150', current: '$100', unit: 'per day' }
    }
};

// =============================================
// CREATE PACKAGE MODAL
// =============================================

function createPackageModal(packageKey) {
    const data = packagesData[packageKey];
    if (!data) return;

    const template = document.getElementById('packageModalTemplate');
    const modal = template.cloneNode(true);
    modal.removeAttribute('id');
    modal.style.display = 'block';

    const overlay = modal.querySelector('.package-modal-overlay');
    const header = modal.querySelector('.package-modal-header');
    const badge = modal.querySelector('.package-badge');
    const title = modal.querySelector('.package-title');
    const currentPrice = modal.querySelector('.current-price');
    const originalPrice = modal.querySelector('.original-price');
    const priceUnit = modal.querySelector('.price-unit');
    const featuresGrid = modal.querySelector('.features-grid');
    const closeBtn = modal.querySelector('.modal-close-btn');

    header.style.background = data.bgGradient;
    badge.textContent = data.badge;
    badge.style.backgroundColor = data.color;
    title.textContent = data.name;
    currentPrice.textContent = data.price.current;
    originalPrice.textContent = data.price.original;
    priceUnit.textContent = `/ ${data.price.unit}`;

    // Add features
    featuresGrid.innerHTML = data.features.map(feature => `
        <div class="feature-item">
            <div class="feature-icon" style="background: ${data.bgGradient};">
                <span class="checkmark">✓</span>
            </div>
            <div class="feature-content">
                <h4>${feature.title}</h4>
                <p>${feature.desc}</p>
            </div>
        </div>
    `).join('');

    document.body.appendChild(modal);
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });

    closeBtn.onclick = () => closeModal(overlay, modal);
    overlay.onclick = (e) => {
        if (e.target === overlay) closeModal(overlay, modal);
    };
}

// =============================================
// CREATE BOOKING MODAL FOR ROOMS
// =============================================

function createBookingModal(roomName) {
    const template = document.getElementById('simpleBookingTemplate');
    const modal = template.cloneNode(true);
    modal.removeAttribute('id');
    modal.style.display = 'block';

    const overlay = modal.querySelector('.simple-booking-overlay');
    const title = modal.querySelector('.simple-booking-title');
    const submitBtn = modal.querySelector('.simple-booking-submit');
    const messageDiv = modal.querySelector('.simple-booking-message');
    const inputs = modal.querySelectorAll('input, textarea');
    const closeBtn = modal.querySelector('.simple-booking-close');

    title.textContent = `Book ${roomName}`;

    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });

    // Clear error on input
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '#e9ecef';
            messageDiv.classList.remove('show');
            messageDiv.textContent = '';
        });
    });

    // Form submission
    submitBtn.onclick = () => {
        const formData = {};
        let isValid = true;

        // Reset all borders first
        inputs.forEach(input => {
            input.style.borderColor = '#e9ecef';
        });

        // Validate each field
        inputs.forEach(input => {
            const value = input.value.trim();
            if (input.hasAttribute('required') && !value) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                formData[input.name] = value;
            }
        });

        if (!isValid) {
            messageDiv.textContent = 'Please fill in all fields';
            messageDiv.classList.add('show', 'error');
            messageDiv.classList.remove('success');
            return;
        }

        if (formData.email && !isValidEmail(formData.email)) {
            const emailInput = modal.querySelector('[name="email"]');
            emailInput.style.borderColor = '#ef4444';
            messageDiv.textContent = 'Please enter a valid email address';
            messageDiv.classList.add('show', 'error');
            messageDiv.classList.remove('success');
            return;
        }

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Show success message in the modal
            messageDiv.textContent = `Thank you ${formData.name}! We will contact you soon.`, 'success';
            messageDiv.classList.add('show', 'success');
            messageDiv.classList.remove('error');
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Close modal after showing success
            setTimeout(() => {
                overlay.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                    document.body.classList.remove('modal-open');
                    document.documentElement.classList.remove('modal-open');
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }, 350);
            }, 2500);
        }, 1500);
    };

    // Close handlers
    closeBtn.onclick = () => closeSimpleModal(overlay, modal);
    overlay.onclick = (e) => {
        if (e.target === overlay) closeSimpleModal(overlay, modal);
    };
}

// =============================================
// HELPER FUNCTIONS
// =============================================

function closeModal(overlay, modal) {
    overlay.classList.remove('active');
    setTimeout(() => {
        modal.remove();
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }, 350);
}

function closeSimpleModal(overlay, modal) {
    overlay.classList.remove('active');
    setTimeout(() => {
        modal.remove();
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }, 350);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// =============================================
// PACKAGE CARDS CLICK HANDLERS
// =============================================

const packageCards = document.querySelectorAll('.packages_card');
packageCards.forEach((card, index) => {
    const packageKeys = ['premium', 'classic', 'day'];
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', () => {
        createPackageModal(packageKeys[index]);
    });
});

// =============================================
// ROOM BOOKING HANDLERS
// =============================================

const bookNowButtons = document.querySelectorAll('.room_card .card_button button');
bookNowButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const roomCard = button.closest('.room_card');
        const roomName = roomCard.querySelector('h3').textContent;
        createBookingModal(roomName);
    });
});

// =============================================
// SMOOTH SCROLL NAVIGATION
// =============================================

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            updateActiveNavLink(this);
        }
    });
});

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// =============================================
// UPDATE ACTIVE NAV ON SCROLL
// =============================================

let scrollTicking = false;

window.addEventListener('scroll', function() {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            updateNavOnScroll();
            updateNavbarBackground();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

function updateNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navHeight = document.querySelector('.main-nav').offsetHeight;
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const sectionId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function updateNavbarBackground() {
    const navbar = document.querySelector('.main-nav');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'white';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
    }
}

// =============================================
// BUTTON CLICK HANDLERS
// =============================================

const bookNowBtn = document.querySelector('.nav_btn');
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', () => scrollToSection('contact'));
}

const viewMoreBtn = document.querySelector('.btn_img');
if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => scrollToSection('about'));
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        const targetPosition = section.offsetTop - navHeight - 20;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// =============================================
// CAROUSEL INITIALIZATION
// =============================================

initCarousel('.facilities-carousel', '.facilities-dots', 3);

function initCarousel(carouselSelector, dotsSelector, visibleCards) {
    const container = document.querySelector(carouselSelector);
    if (!container) return;
    
    const track = container.querySelector('.carousel-track');
    const cards = container.querySelectorAll('.carousel-card');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    const dotsContainer = document.querySelector(dotsSelector);
    
    let currentIndex = 0;
    let cardsToShow = visibleCards;
    const totalCards = cards.length;
    
    function updateCardsToShow() {
        if (window.innerWidth <= 768) {
            cardsToShow = 1;
        } else if (window.innerWidth <= 992) {
            cardsToShow = 2;
        } else {
            cardsToShow = visibleCards;
        }
    }
    
    updateCardsToShow();
    
    function getTotalPages() {
        return Math.max(1, totalCards - cardsToShow + 1);
    }
    
    function createDots() {
        dotsContainer.innerHTML = '';
        const totalPages = getTotalPages();
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    createDots();
    
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        const totalPages = getTotalPages();
        currentIndex = Math.max(0, Math.min(index, totalPages - 1));
        
        const cardWidth = cards[0].offsetWidth + 30;
        const translateX = -currentIndex * cardWidth;
        
        track.style.transform = `translateX(${translateX}px)`;
        updateDots();
    }
    
    function nextSlide() {
        const totalPages = getTotalPages();
        currentIndex = (currentIndex + 1) % totalPages;
        goToSlide(currentIndex);
    }
    
    function prevSlide() {
        const totalPages = getTotalPages();
        currentIndex = (currentIndex - 1 + totalPages) % totalPages;
        goToSlide(currentIndex);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const threshold = 50;
        
        if (diff > threshold) {
            nextSlide();
        } else if (diff < -threshold) {
            prevSlide();
        }
    }, { passive: true });
    
    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCardsToShow();
            createDots();
            goToSlide(Math.min(currentIndex, getTotalPages() - 1));
        }, 250);
    });
}

// =============================================
// SCROLL REVEAL ANIMATION
// =============================================

const revealElements = document.querySelectorAll('.room_card, .pro_card, .packages_card, .about_text, .about_image, .custom_card');

revealElements.forEach(el => el.classList.add('scroll-reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// =============================================
// CONTACT FORM SUBMISSION
// =============================================

const contactForm = document.querySelector('.Contact_us form');
const messageDisplay = document.getElementById('messageDisplay');

if (contactForm) {
    const contactInputs = contactForm.querySelectorAll('input, textarea');
    const contactSubmitBtn = contactForm.querySelector('.btn_Contact');
    
    // Add input event listeners to clear errors
    contactInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '#e9ecef';
            if (messageDisplay) {
                messageDisplay.textContent = '';
                messageDisplay.style.color = '';
            }
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('username');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Reset all borders
        contactInputs.forEach(input => {
            input.style.borderColor = '#e9ecef';
        });
        
        // Validation
        let isValid = true;
        
        if (!name) {
            contactForm.querySelector('[name="username"]').style.borderColor = '#ef4444';
            isValid = false;
        }
        if (!email) {
            contactForm.querySelector('[name="email"]').style.borderColor = '#ef4444';
            isValid = false;
        }
        if (!phone) {
            contactForm.querySelector('[name="phone"]').style.borderColor = '#ef4444';
            isValid = false;
        }
        if (!message) {
            contactForm.querySelector('[name="message"]').style.borderColor = '#ef4444';
            isValid = false;
        }
        
        if (!isValid) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            contactForm.querySelector('[name="email"]').style.borderColor = '#ef4444';
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        const originalText = contactSubmitBtn.textContent;
        contactSubmitBtn.textContent = 'Sending...';
        contactSubmitBtn.disabled = true;
        
        setTimeout(() => {
            showFormMessage(`Thank you ${name}! We will contact you soon.`, 'success');
            this.reset();
            contactSubmitBtn.textContent = originalText;
            contactSubmitBtn.disabled = false;
        }, 1500);
    });
}

function showFormMessage(text, type) {
    if (messageDisplay) {
        messageDisplay.textContent = text;
        messageDisplay.style.color = type === 'success' ? '#10b981' : '#ef4444';
    }
}

// =============================================
// BOOKMARK TOGGLE
// =============================================

const bookmarks = document.querySelectorAll('.fa-bookmark');

bookmarks.forEach(bookmark => {
    bookmark.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('fa-solid');
        this.classList.toggle('fa-regular');
        
        if (this.classList.contains('fa-solid')) {
            this.style.color = '#007bff';
        } else {
            this.style.color = '#666';
        }
    });
});

// =============================================
// ESCAPE KEY TO CLOSE MODALS
// =============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeOverlay = document.querySelector('.package-modal-overlay.active, .simple-booking-overlay.active');
        if (activeOverlay) {
            const modal = activeOverlay.parentElement;
            if (activeOverlay.classList.contains('package-modal-overlay')) {
                closeModal(activeOverlay, modal);
            } else {
                closeSimpleModal(activeOverlay, modal);
            }
        }
    }
});

});