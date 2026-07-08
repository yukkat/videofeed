import { renderFeed } from './feed.js';
import { initPlayer } from './player.js';

const feed = document.getElementById('feed');

if (!feed) {
  throw new Error('Feed container not found');
}

renderFeed(feed);
initPlayer(feed);
