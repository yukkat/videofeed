import { videoSources } from '../data/videos.js';
import { ICON_MUTED } from '../utils/icons.js';
import { initVideoObserver } from './observer.js';


function createSlideContent(slide, src) {
  if (slide.querySelector('.slide__video')) return;

  const video = document.createElement('video');
  video.className = 'slide__video';
  video.dataset.src = src;
  video.playsInline = true;
  video.loop = true;
  video.preload = 'none';
  video.muted = true;

  const muteBtn = document.createElement('button');
  muteBtn.className = 'slide__mute slide__mute--muted';
  muteBtn.setAttribute('aria-label', 'Включить звук');
  muteBtn.innerHTML = ICON_MUTED;

  slide.appendChild(video);
  slide.appendChild(muteBtn);
}

function destroySlideContent(slide) {
  const video = slide.querySelector('.slide__video');
  const muteBtn = slide.querySelector('.slide__mute');

  if (video) {
    video.pause();
    video.removeAttribute('src');
    video.load();
    video.remove();
  }
  if (muteBtn) {
    muteBtn.remove();
  }
}

export function renderFeed(container) {
  const spacer = document.createElement('div');
  spacer.style.height = `${videoSources.length * 100}dvh`;
  container.appendChild(spacer);

  const observer = initVideoObserver(container, videoSources, createSlideContent, destroySlideContent);

  document.addEventListener('beforeunload', () => {
    observer.disconnect();
  })
}


