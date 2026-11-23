/* prompt-copy.js — click any prompt card to copy its text.
 *
 * The lesson plan's pre-flight says to have the model prompts open in a
 * notes file ready to paste. This removes that step: the deck itself is
 * the clipboard. Click the card, paste into Gemini.
 *
 * Load order matters. This script must run BEFORE motion.js, because
 * motion.js empties `.typed` spans to type them out character by
 * character; we capture the pristine text while it is still in the DOM.
 *
 * Tap zones are touch-only (deck-stage.js hides them on fine pointers),
 * so a click here never fights slide navigation on a laptop.
 */
(() => {
  'use strict';

  const boxes = document.querySelectorAll('[data-copy]');
  if (!boxes.length) return;

  /* Capture now, before motion.js clears anything. Works for prompt
     cards and for any other element opted in with data-copy. */
  const text = new WeakMap();

  boxes.forEach((box) => {
    /* Which part of the card is the prompt? Cards that carry a label as
       well as the text mark the text itself with data-copy-text. */
    const source = box.querySelector('[data-copy-text]') ||
                   box.querySelector('.prompt-text') ||
                   box;
    if (!source) return;

    /* Normalise whitespace: the markup is indented for readability,
       but what lands in the clipboard should be a clean prompt. Strip
       the display quote marks too - they're typography, not part of
       what you want to paste into Canvas. */
    const clean = source.textContent
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^["“”']+/, '')
      .replace(/["“”']+$/, '');
    text.set(box, clean);

    const badge = document.createElement('span');
    badge.className = 'copy-badge';
    badge.textContent = 'Copied';
    box.appendChild(badge);

    /* Keyboard reachable — the deck is presented, but it is also read. */
    box.setAttribute('role', 'button');
    box.setAttribute('tabindex', '0');
    box.setAttribute('aria-label', 'Copy this prompt to the clipboard');
  });

  async function copy(box) {
    const value = text.get(box);
    if (!value) return;

    let ok = false;
    try {
      /* Needs a secure context: fine on GitHub Pages and localhost,
         absent on file://, which is why the fallback exists. */
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch (_) {
      const scratch = document.createElement('textarea');
      scratch.value = value;
      scratch.setAttribute('readonly', '');
      scratch.style.cssText = 'position:fixed;top:-1000px;opacity:0;';
      document.body.appendChild(scratch);
      scratch.select();
      try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
      document.body.removeChild(scratch);
    }

    const badge = box.querySelector('.copy-badge');
    if (badge) badge.textContent = ok ? 'Copied' : 'Press ⌘C';
    box.setAttribute('data-copied', '');
    clearTimeout(box._copyTimer);
    box._copyTimer = setTimeout(() => box.removeAttribute('data-copied'), 1400);
  }

  boxes.forEach((box) => {
    box.addEventListener('click', (e) => {
      e.stopPropagation();
      copy(box);
    });
    box.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      e.stopPropagation();
      copy(box);
    });
  });
})();
