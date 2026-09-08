/* Hero shot — writes the open/closed progress of the plate under the hero.
 *
 * The stage is sticky inside a track two-and-a-bit viewports tall, so while
 * the track passes the top of the screen the plate is pinned and the only
 * thing changing is this one number. Everything visual (margin, corner
 * radius, height, veil, buttons) is a function of it in CSS, so the stages
 * cannot drift apart the way separately-timed animations do.
 *
 * The number reaches 1 at 82% of the pinned distance rather than at the very
 * end, which leaves a beat of full-bleed before the next section arrives —
 * without it the plate finishes opening exactly as it leaves, and the payoff
 * is never actually on screen.
 */
(function () {
  var sec = document.getElementById('shot');
  if (!sec) return;

  // The CSS already presents a static, fully legible plate in this case.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var track = sec.querySelector('.shot__track');
  if (!track) return;

  var HOLD = 0.82;
  var queued = false;
  var lastP = -1;
  var lastE = -1;

  function clamp01(n) { return n < 0 ? 0 : n > 1 ? 1 : n; }

  function write() {
    queued = false;
    var r = track.getBoundingClientRect();
    var vh = window.innerHeight;

    /* Entry: 0 while the plate is still below the fold, 1 by the time it has
       climbed to the top of the screen. This is the phase that happens at the
       bottom of the hero, before anything is pinned, and it is what fades the
       dark ground in — without it the veil would appear out of nowhere the
       moment the pin engaged. */
    var e = clamp01(1 - r.top / vh);

    /* Open: how far through the pinned run we are. Reaching 1 early leaves a
       held beat of full bleed before the next section arrives. */
    var span = (r.height - vh) * HOLD;
    var p = span > 0 ? clamp01(-r.top / span) : 0;

    // sub-pixel churn isn't worth a style recalc
    if (Math.abs(p - lastP) > 0.0015) {
      lastP = p;
      sec.style.setProperty('--sp', p.toFixed(4));
    }
    if (Math.abs(e - lastE) > 0.0015) {
      lastE = e;
      sec.style.setProperty('--se', e.toFixed(4));
    }
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(write);
  }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  addEventListener('orientationchange', function () { setTimeout(write, 300); });
  write();
})();
