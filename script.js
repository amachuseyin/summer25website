// --- Theme Switcher ---
const themeSwitcher = document.getElementById('theme-switcher');
const docElement = document.documentElement;

// The code to apply the theme on load has been moved to an inline script in the HTML head.

themeSwitcher.addEventListener('click', () => {
    const isDark = docElement.classList.contains('dark');
    
    // Toggle theme classes without affecting other classes like 'party'
    if (isDark) {
        docElement.classList.remove('dark');
        docElement.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        docElement.classList.remove('light');
        docElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// --- Mobile Menu ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));


// --- Sliding Navigation Indicator ---
function initSlidingNav() {
    const navContainer = document.querySelector('header nav.hidden.md\\:flex');
    if (!navContainer) return;

    const navLinks = navContainer.querySelectorAll('.nav-link');
    const activeLink = navContainer.querySelector('.nav-link.active');

    if (!activeLink) return;

    const setIndicator = (element) => {
        const PADDING = 24; // 12px padding on each side
        const left = element.offsetLeft;
        const width = element.offsetWidth;
        navContainer.style.setProperty('--indicator-left', `${left - PADDING / 2}px`);
        navContainer.style.setProperty('--indicator-width', `${width + PADDING}px`);
    };

    // Use a timeout to ensure fonts are loaded and widths are correct
    setTimeout(() => {
        setIndicator(activeLink);
    }, 100);

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => setIndicator(link));
    });

    navContainer.addEventListener('mouseleave', () => setIndicator(activeLink));

    window.addEventListener('resize', () => {
        setTimeout(() => {
            setIndicator(activeLink);
        }, 100);
    });
}

// The script is deferred, so the DOM is ready.
initSlidingNav();

// Re-enable transitions after the page has loaded to prevent animation on load
window.addEventListener('load', () => {
  document.documentElement.classList.remove('no-transition');
});
