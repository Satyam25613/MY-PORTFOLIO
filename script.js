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
                    toggleActions: "play none none none" // Changed from reverse to none to keep elements visible
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all" // Ensure inline styles are cleared after animation
            });
        }
    });
});

// Force visibility on page load and back/forward navigation
window.addEventListener('pageshow', (event) => {
    // If the page was restored from bfcache, or just normal load
    const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
    hiddenElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
    });

    // Refresh ScrollTrigger to ensure positions are correct
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

// Fallback: Ensure content is visible if JS/GSAP fails or hangs
setTimeout(() => {
    const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
    hiddenElements.forEach(el => {
        if (getComputedStyle(el).opacity === '0') {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.visibility = 'visible';
        }
    });
}, 500);

// Mobile Menu Logic
// Dropdown Menu Logic
// Dropdown Menu Logic
const menuBtn = document.getElementById('menu-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

if (menuBtn && dropdownMenu) {
    // Toggle menu
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = dropdownMenu.classList.contains('hidden');

        if (isHidden) {
            dropdownMenu.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                dropdownMenu.classList.remove('opacity-0', 'scale-95');
                dropdownMenu.classList.add('opacity-100', 'scale-100');
            }, 10);
        } else {
            dropdownMenu.classList.remove('opacity-100', 'scale-100');
            dropdownMenu.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                dropdownMenu.classList.add('hidden');
            }, 200); // Wait for transition
        }
    });

    // Close when clicking links
    dropdownMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            dropdownMenu.classList.remove('opacity-100', 'scale-100');
            dropdownMenu.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                dropdownMenu.classList.add('hidden');
            }, 200);
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            if (!dropdownMenu.classList.contains('hidden')) {
                dropdownMenu.classList.remove('opacity-100', 'scale-100');
                dropdownMenu.classList.add('opacity-0', 'scale-95');
                setTimeout(() => {
                    dropdownMenu.classList.add('hidden');
                }, 200);
            }
        }
    });
}
