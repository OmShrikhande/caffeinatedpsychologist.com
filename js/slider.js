document.addEventListener("DOMContentLoaded", function() {
    const sliders = document.querySelectorAll('.slider, .recent-sessions');
    sliders.forEach(slider => {
        const slides = slider.querySelector('.slides');
        const prevButton = slider.querySelector('.prev');
        const nextButton = slider.querySelector('.next');
        let index = 0;

        function showSlide(i) {
            index = (i + slides.children.length) % slides.children.length;
            slides.style.transform = `translateX(${-index * 100}%)`;
        }

        prevButton.addEventListener('click', () => showSlide(index - 1));
        nextButton.addEventListener('click', () => showSlide(index + 1));
    });

    // Intersection Observer for animations
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