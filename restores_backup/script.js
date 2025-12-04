// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

// Check local storage or default to LIGHT
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    lightIcon.classList.remove('hidden');
    darkIcon.classList.add('hidden');
} else {
    // Default to light
    document.documentElement.setAttribute('data-theme', 'light');
    darkIcon.classList.remove('hidden');
    lightIcon.classList.add('hidden');
}

// Toggle theme event
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
        // Toggle icons
        darkIcon.classList.toggle('hidden');
        lightIcon.classList.toggle('hidden');

        // If is light, switch to dark
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// GSAP Animations
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    if (document.querySelector(".animate-fade-in-up")) {
        gsap.from(".animate-fade-in-up", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.1
        });
    }

    // Image Reveal
    if (document.querySelector(".hero-img-reveal")) {
        gsap.from(".hero-img-reveal", {
            x: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.3
        });
    }

    // Scroll Reveal Animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Skip hero section if it's already animated
        if (section.id === 'home') return;

        const children = section.querySelectorAll('.reveal-on-scroll');
        if (children.length > 0) {
            gsap.from(children, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    });
});
