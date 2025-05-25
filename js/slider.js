document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll('.slider, .recent-sessions');

    sliders.forEach(slider => {
        const slides = slider.querySelector('.slides');
        const prevButton = slider.querySelector('.prev');
        const nextButton = slider.querySelector('.next');
        const slideItems = slides.children;
        let index = 0;

        // Create dots container
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'dots';
        slider.appendChild(dotsContainer);

        // Create dots based on number of slides
        Array.from(slideItems).forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function updateDots(i) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[i].classList.add('active');
        }

        function showSlide(i) {
            index = (i + slideItems.length) % slideItems.length;
            slides.style.transform = `translateX(${-index * 100}%)`;
            updateDots(index);
        }

        prevButton.addEventListener('click', () => showSlide(index - 1));
        nextButton.addEventListener('click', () => showSlide(index + 1));

        // Autoplay every 5 seconds
        let autoplay = setInterval(() => showSlide(index + 1), 5000);

        // Pause autoplay on hover
        slider.addEventListener('mouseenter', () => clearInterval(autoplay));
        slider.addEventListener('mouseleave', () => {
            autoplay = setInterval(() => showSlide(index + 1), 5000);
        });

        // Touch swipe support
        let touchStartX = 0;

        slides.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });

        slides.addEventListener('touchend', e => {
            let touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                showSlide(index + 1); // swipe left
            } else if (touchEndX - touchStartX > 50) {
                showSlide(index - 1); // swipe right
            }
        });
    });

    // Animation observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animated-section').forEach(section => {
        observer.observe(section);
    });
});
