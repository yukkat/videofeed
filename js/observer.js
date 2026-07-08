export function initVideoObserver() {
    const slides = [...document.querySelectorAll('.slide')];

    let activeIndex = 0;

    const observer = new IntersectionObserver(
        (entries) => {

            const visible = entries
                .find((entry) => entry.isIntersecting)

            if (!visible) return;

            const newIndex = slides.indexOf(visible.target);

            if (newIndex === activeIndex) return;

            activeIndex = newIndex;
            updateVideos(activeIndex);
        },
        {
            threshold: [0.75],
        }
    );

    slides.forEach((slide) => observer.observe(slide));

    // Инициализируем первый ролик
    updateVideos(activeIndex);

    return observer;

    function updateVideos(currentIndex) {
        slides.forEach((slide, index) => {
            const video = slide.querySelector('.slide__video');

            if (!video) return;

            const shouldBeLoaded =
                index >= currentIndex - 1 &&
                index <= currentIndex + 1;

            if (shouldBeLoaded) {
                loadVideo(video);
            } else {
                unloadVideo(video);
            }

            if (index === currentIndex) {
                playVideo(video);
            } else {
                pauseVideo(video);
            }
        });
    }

    function loadVideo(video) {
        if (video.src) return;

        video.src = video.dataset.src;
        video.load();
    }

    function unloadVideo(video) {
        if (!video.src) return;
        // Паузим видео перед выгрузкой для избежания побочных эффектов
        video.pause();

        video.removeAttribute('src');
        video.load();
    }

    function playVideo(video) {
        loadVideo(video);

        if (!video.paused) return;

        video.play().catch(e => {console.error(e);});
    }

    function pauseVideo(video) {
        if (video.paused) return;

        video.pause();
        video.currentTime = 0;
    }
}