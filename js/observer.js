const BUFFER = 1;

export function initVideoObserver(container, videoSources, populateSlide, destroySlide) {
    let activeIndex = 0;
    const sections = new Map();
    let rafId = null;

    function createSection(index) {
        if (sections.has(index)) return;

        const section = document.createElement('section');
        section.className = 'slide';
        section.style.top = `${index * 100}dvh`;

        container.appendChild(section);
        sections.set(index, section);
        populateSlide(section, videoSources[index]);
    }

    function removeSection(index) {
        const section = sections.get(index);
        if (!section) return;

        destroySlide(section);
        section.remove();
        sections.delete(index);
    }

    function reconcile() {
        for (let i = activeIndex - BUFFER; i <= activeIndex + BUFFER; i++) {
            if (i >= 0 && i < videoSources.length) {
                createSection(i);
            }
        }

        for (const [idx] of sections) {
            if (Math.abs(idx - activeIndex) > BUFFER) {
                removeSection(idx);
            }
        }

        for (const [idx, section] of sections) {
            const video = section.querySelector('.slide__video');

            if (!video) continue;

            if (idx === activeIndex) {
                playVideo(video);
            } else {
                pauseVideo(video);
            }
        }
    }

    function onScroll() {
        if (rafId) return;

        rafId = requestAnimationFrame(() => {
            rafId = null;

            const newIndex = Math.round(container.scrollTop / container.clientHeight);

            if (newIndex === activeIndex) return;
            if (newIndex < 0 || newIndex >= videoSources.length) return;

            activeIndex = newIndex;
            reconcile();
        });
    }

    container.addEventListener('scroll', onScroll, { passive: true });

    reconcile();

    return {
        disconnect() {
            container.removeEventListener('scroll', onScroll);
            if (rafId) cancelAnimationFrame(rafId);
        }
    };

    function playVideo(video) {
        if (!video.src) {
            video.src = video.dataset.src;
            video.load();
        }

        if (!video.paused) return;

        video.play().catch(e => {console.error(e);});
    }

    function pauseVideo(video) {
        if (video.paused) return;

        video.pause();
        video.currentTime = 0;
    }
}
