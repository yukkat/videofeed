import {ICON_MUTED, ICON_UNMUTED} from "../utils/icons.js";

function toggleMute(video, btn) {
  video.muted = !video.muted;
  btn.innerHTML = video.muted ? ICON_MUTED : ICON_UNMUTED;
  btn.classList.toggle('slide__mute--muted', video.muted);
}

function togglePlay(video) {
  if (video.paused) {
    video.play().catch(() => {});
  } else {
    video.pause();
  }
}

export function initPlayer(container) {
  const slides = container.querySelectorAll('.slide');

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const video = entry.target.querySelector('.slide__video');
      if (!video) continue;
      if (entry.isIntersecting) {
        video.play().catch((e) => { throw e });
      } else {
        video.pause();
      }
    }
  }, { threshold: 0.5 });

  slides.forEach((slide) => observer.observe(slide));

  container.addEventListener('click', (e) => {
    const muteBtn = e.target.closest('.slide__mute');
    if (muteBtn) {
      const slide = muteBtn.closest('.slide');
      const video = slide.querySelector('.slide__video');
      toggleMute(video, muteBtn);
      return;
    }

    const video = e.target.closest('.slide__video');
    if (video) {
      togglePlay(video);
    }
  });
}
