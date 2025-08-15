// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll-to-top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopButton);

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.innerHTML = '<span></span><span></span><span></span>'; // Hamburger icon
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.setAttribute('aria-label', 'Toggle navigation menu');
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.appendChild(mobileMenuButton);
    }

    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuButton.classList.remove('active');
            });
        });
    }
});

// Add animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ${entry.target.dataset.delay || '0s'} cubic-bezier(0.4, 0, 0.2, 1) forwards`;
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger animation a bit sooner
});

document.querySelectorAll('.feature-card, .card, .use-case-category, .custom-model pre, .auth-image, .screenshot').forEach((el, index) => {
    el.style.opacity = '0';
    el.dataset.delay = `${index * 0.05}s`;
    observer.observe(el);
});

// Add keyframes for animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.mobile-menu-button span {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    background-color: var(--dark-color);
    transition: all 0.3s ease-in-out;
}
.mobile-menu-button.active span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}
.mobile-menu-button.active span:nth-child(2) {
    opacity: 0;
}
.mobile-menu-button.active span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}
`;
document.head.appendChild(styleSheet);
