import { videoSources } from '../data/videos.js';
import { ICON_MUTED } from '../utils/icons.js';


function createSlide(src) {
  const slide = document.createElement('section');
  slide.className = 'slide';

  const video = document.createElement('video');
  video.className = 'slide__video';
  video.src = src;
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
  return slide;
}

export function renderFeed(container) {
  const fragment = document.createDocumentFragment();

  for (const src of videoSources) {
    fragment.appendChild(createSlide(src));
  }

  container.replaceChildren(fragment);
}
