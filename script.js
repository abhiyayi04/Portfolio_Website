document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple intersection observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('section > div');
    animatedElements.forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });
});

// Toggle View More / View Less for Projects
const toggleBtn = document.getElementById('toggle-projects');
const moreProjects = document.getElementById('more-projects');

if (toggleBtn && moreProjects) {
    toggleBtn.addEventListener('click', () => {
        const isCollapsed = moreProjects.classList.contains('max-h-0');

        if (isCollapsed) {
            moreProjects.classList.remove('max-h-0');
            moreProjects.classList.add('max-h-[2000px]');
            toggleBtn.textContent = 'View Less';
        } else {
            moreProjects.classList.add('max-h-0');
            moreProjects.classList.remove('max-h-[2000px]');
            toggleBtn.textContent = 'View More';

            // Smooth scroll back to projects title
            document.getElementById('projects').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}