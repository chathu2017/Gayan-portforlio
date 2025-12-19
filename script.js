document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Mobile Navigation --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    /* --- 2. Accordion Logic (Career Journey) --- */
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(item => {
        const header = item.querySelector('.accordion-head');
        
        header.addEventListener('click', () => {
            const body = item.querySelector('.accordion-body');
            const isActive = item.classList.contains('active');

            // Optional: Close others when one is opened
            accordions.forEach(acc => {
                if (acc !== item) {
                    acc.classList.remove('active');
                    acc.querySelector('.accordion-body').style.maxHeight = null;
                }
            });

            if (isActive) {
                item.classList.remove('active');
                body.style.maxHeight = null;
            } else {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    /* --- 3. Scroll Fade-In Animation (CRITICAL FIX) --- */
    // This part makes your content visible. Without it, opacity stays at 0.
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    /* --- 4. Logo Scroll to Top (Clean URL Fix) --- */
    const logoLink = document.querySelector('.logo');
    
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the default jump that adds #
            
            // Clean the URL (removes #hash)
            history.replaceState(null, null, window.location.pathname);

            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});