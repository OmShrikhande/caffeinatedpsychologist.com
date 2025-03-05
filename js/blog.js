document.addEventListener("DOMContentLoaded", function() {
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