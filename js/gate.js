/* gate.js: an optional password gate.
 *
 * Off by default. To switch it on:
 *   1. Open the page in a browser, open the developer console and run
 *        await GATE.make('the password you want')
 *      It prints a long string of letters and numbers (a SHA-256 hash).
 *   2. Paste that string into `hash` below and set `enabled: true`.
 *
 * This is a deterrent, not security. The page is a static site, so its
 * text still reaches the browser; anyone who views the source can read
 * it. It stops casual visitors and nothing more. For real protection the
 * page needs proper sign-in, such as internal hosting.
 *
 * Unlock is remembered for the browser tab (sessionStorage), so it asks
 * once per visit.
 */
window.GATE = {
  enabled: false,
  hash: '',
  make: async function (pw) {
    var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(pw).trim()));
    var hex = Array.prototype.map.call(new Uint8Array(buf), function (b) { return b.toString(16).padStart(2, '0'); }).join('');
    if (window.console) console.log(hex);
    return hex;
  }
};

(function () {
  var G = window.GATE;
  function boot() {
    var gate = document.getElementById('gate');
    if (!gate) return;
    if (!G.enabled || !G.hash) { gate.remove(); return; }
    var KEY = 'fifty-gate-ok';
    try { if (sessionStorage.getItem(KEY) === '1') { gate.remove(); return; } } catch (e) { /* storage blocked */ }

    gate.hidden = false;
    document.body.style.overflow = 'hidden';
    var form = document.getElementById('gate-form');
    var input = document.getElementById('gate-input');
    var err = document.getElementById('gate-error');

    function unlock() {
      try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }
      document.body.style.overflow = '';
      gate.remove();
    }
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var ok = false;
      try {
        var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input.value.trim()));
        var hex = Array.prototype.map.call(new Uint8Array(buf), function (b) { return b.toString(16).padStart(2, '0'); }).join('');
        ok = hex === G.hash;
      } catch (e2) { ok = false; }
      if (ok) unlock();
      else { err.hidden = false; input.value = ''; input.focus(); }
    });
    input.focus();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
