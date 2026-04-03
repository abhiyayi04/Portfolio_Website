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

// Certifications carousel — manage button visibility based on scroll position
(function () {
    const track   = document.getElementById('cert-scroll');
    const prevBtn = document.getElementById('cert-prev');
    const nextBtn = document.getElementById('cert-next');

    if (!track || !prevBtn || !nextBtn) return;

    function updateButtonStates() {
        const maxScroll = track.scrollWidth - track.clientWidth;

        // Prev button: hide/disable when at the start
        if (track.scrollLeft <= 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = '';
        }

        // Next button: hide/disable when at the end
        if (track.scrollLeft >= maxScroll - 1) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = '';
        }
    }

    function scrollByPage(direction) {
        const items = track.querySelectorAll('.cert-item');
        if (items.length === 0) return;

        const itemWidth = items[0].offsetWidth + 24; // width + gap
        const amount = itemWidth * Math.floor(track.clientWidth / itemWidth);

        if (direction === 'next') {
            track.scrollBy({ left: amount, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: -amount, behavior: 'smooth' });
        }
    }

    // Button click handlers
    nextBtn.addEventListener('click', () => scrollByPage('next'));
    prevBtn.addEventListener('click', () => scrollByPage('prev'));

    // Update button states on scroll
    track.addEventListener('scroll', updateButtonStates, { passive: true });

    // Initial button state
    updateButtonStates();

    // Update on window resize
    window.addEventListener('resize', updateButtonStates);
})();

const ecBtn = document.getElementById('toggle-extracurriculars');
const ecMore = document.getElementById('more-extracurriculars');

const DURATION = 600; // ms (try 700–900 if you want even smoother)

function easeInOut(t) {
  return t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function animateHeight(from, to, callback) {
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / DURATION, 1);
    const eased = easeInOut(progress);
    const height = from + (to - from) * eased;

    ecMore.style.height = `${height}px`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      callback && callback();
    }
  }

  requestAnimationFrame(step);
}

if (ecBtn && ecMore) {
  ecBtn.addEventListener('click', () => {
    const isCollapsed = ecMore.clientHeight === 0;

    if (isCollapsed) {
      // Expand
      ecMore.style.display = 'block';
      const targetHeight = ecMore.scrollHeight;

      ecMore.classList.remove('opacity-0');
      ecMore.classList.add('opacity-100');

      animateHeight(0, targetHeight, () => {
        ecMore.style.height = 'auto';
      });

      ecBtn.textContent = 'View Less';
    } else {
      // Collapse
      const currentHeight = ecMore.scrollHeight;

      ecMore.classList.add('opacity-0');
      ecMore.classList.remove('opacity-100');

      animateHeight(currentHeight, 0, () => {
        ecBtn.textContent = 'View More';
        document
          .getElementById('extracurriculars')
          .scrollIntoView({ behavior: 'smooth' });
      });
    }
  });
}
