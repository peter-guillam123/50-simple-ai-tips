/* deck-video.js: screen recordings that play when their slide does.
 *
 * Any <video> in a slide starts from the beginning each time that slide
 * comes up, and stops when you move on, so a demo never plays to an empty
 * room or arrives half-finished. Videos are muted and loop. With reduced
 * motion asked for, nothing plays by itself: the video shows its poster
 * frame and its controls instead.
 *
 * Load after deck-stage.js. Nothing here is load-bearing: without it the
 * videos still play, they just don't restart on arrival.
 */
(() => {
  'use strict';

  const stage = document.querySelector('deck-stage');
  const videos = Array.from(document.querySelectorAll('deck-stage video'));
  if (!stage || !videos.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  videos.forEach((v) => {
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.removeAttribute('autoplay');
    v.pause();
    if (reduced) v.controls = true;
  });

  function playIn(slide) {
    videos.forEach((v) => {
      if (slide && slide.contains(v)) {
        if (reduced) return;
        v.currentTime = 0;
        const p = v.play();
        if (p && p.catch) p.catch(() => { v.controls = true; });
      } else {
        v.pause();
      }
    });
  }

  stage.addEventListener('slidechange', (e) => playIn(e.detail.slide));
  /* The stage's first slidechange fires before this script runs, so start
     whatever is on the slide we open on. */
  playIn(document.querySelector('deck-stage > section[data-deck-active]'));
})();
