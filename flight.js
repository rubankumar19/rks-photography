/* flight.js — a paper butterfly that drifts calmly around the page with slow
   flickering wings and glides gently away from the cursor. Every so often it
   flies out through an edge, waits, and re-enters from a different edge.
   Included once per page:  <script src="flight.js"></script>  */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var mx = -600, my = -600; // cursor (offscreen until it moves)
  window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });

  function injectCss() {
    var s = document.createElement('style');
    s.textContent =
      '.flit{position:fixed;top:0;left:0;z-index:140;pointer-events:none;width:34px;height:26px;' +
        'perspective:90px;will-change:transform;filter:drop-shadow(0 3px 5px rgba(20,15,10,.2));}' +
      '.flit .side{position:absolute;top:2px;width:16px;height:22px;}' +
      '.flit .side .fore{position:absolute;top:0;width:16px;height:15px;background:linear-gradient(135deg,#dcb47c,#b98f5c);}' +
      '.flit .side .hind{position:absolute;top:12px;width:11px;height:11px;background:linear-gradient(135deg,#c99f66,#a3794a);}' +
      '.flit .side.l{left:1px;transform-origin:right center;animation:flapL .66s ease-in-out infinite alternate;}' +
      '.flit .side.r{right:1px;transform-origin:left center;animation:flapR .66s ease-in-out infinite alternate;}' +
      '.flit .side.l .fore{left:0;border-radius:88% 22% 28% 60% / 92% 28% 34% 74%;}' +
      '.flit .side.l .hind{left:3px;border-radius:58% 42% 62% 74%;}' +
      '.flit .side.r .fore{right:0;border-radius:22% 88% 60% 28% / 28% 92% 74% 34%;}' +
      '.flit .side.r .hind{right:3px;border-radius:42% 58% 74% 62%;}' +
      '.flit .body{position:absolute;left:15px;top:2px;width:4px;height:22px;background:#4a3c2a;border-radius:2px;z-index:2;}' +
      '.flit.flee .side{animation-duration:.46s;}' +
      '@keyframes flapL{from{transform:rotateY(-8deg)}to{transform:rotateY(50deg)}}' +
      '@keyframes flapR{from{transform:rotateY(8deg)}to{transform:rotateY(-50deg)}}';
    document.head.appendChild(s);
  }

  var el, x, y, vx, vy, angle = 0, t = 0;
  var mode = 'enter';           // 'enter' | 'fly' | 'leave'
  var tx = 0, ty = 0;           // steer target while entering/leaving

  function build() {
    el = document.createElement('div');
    el.className = 'flit';
    el.innerHTML =
      '<div class="side l"><div class="fore"></div><div class="hind"></div></div>' +
      '<div class="side r"><div class="fore"></div><div class="hind"></div></div>' +
      '<div class="body"></div>';
    document.body.appendChild(el);
  }

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  // place just outside a random edge, aim inward
  function enter() {
    var vw = window.innerWidth, vh = window.innerHeight, O = 46, e = Math.floor(Math.random() * 4);
    if (e === 0)      { x = -O;      y = 80 + Math.random() * (vh - 160); tx = vw * 0.4; ty = y; }
    else if (e === 1) { x = vw + O;  y = 80 + Math.random() * (vh - 160); tx = vw * 0.6; ty = y; }
    else if (e === 2) { x = 100 + Math.random() * (vw - 200); y = -O;     tx = x; ty = vh * 0.4; }
    else              { x = 100 + Math.random() * (vw - 200); y = vh + O; tx = x; ty = vh * 0.6; }
    var d = Math.hypot(tx - x, ty - y) || 1;
    vx = (tx - x) / d * 1.6; vy = (ty - y) / d * 1.6;
    mode = 'enter';
    if (el) el.style.visibility = 'visible';
  }

  // pick an exit target beyond a random edge
  function leave() {
    var vw = window.innerWidth, vh = window.innerHeight, e = Math.floor(Math.random() * 4);
    if (e === 0)      { tx = -140;     ty = 80 + Math.random() * (vh - 160); }
    else if (e === 1) { tx = vw + 140; ty = 80 + Math.random() * (vh - 160); }
    else if (e === 2) { tx = 100 + Math.random() * (vw - 200); ty = -140; }
    else              { tx = 100 + Math.random() * (vw - 200); ty = vh + 140; }
    mode = 'leave';
  }

  function loop() {
    requestAnimationFrame(loop);
    t += 0.016;
    var vw = window.innerWidth, vh = window.innerHeight;
    var fleeing = false;

    if (mode === 'fly') {
      // gentle wandering
      vx += (Math.random() - 0.5) * 0.12 + Math.cos(t * 0.6) * 0.03;
      vy += (Math.random() - 0.5) * 0.12 + Math.sin(t * 0.8) * 0.03;
      // glide softly away from the cursor
      var dx = x - mx, dy = y - my, d = Math.sqrt(dx * dx + dy * dy), R = 175;
      if (d < R && d > 0.01) { var f = (1 - d / R) * 0.8; vx += (dx / d) * f; vy += (dy / d) * f; fleeing = true; }
      // steer away from edges
      var m = 76;
      if (x < m) vx += 0.22; if (x > vw - m) vx -= 0.22;
      if (y < m) vy += 0.22; if (y > vh - m) vy -= 0.22;
      vx *= 0.95; vy *= 0.95;
      var sp = Math.sqrt(vx * vx + vy * vy), max = fleeing ? 2.7 : 0.95;
      if (sp > max) { vx = vx / sp * max; vy = vy / sp * max; }
      else if (sp < 0.28) { vx += (Math.random() - 0.5) * 0.3; vy += (Math.random() - 0.5) * 0.3; }
      x += vx; y += vy;
      x = clamp(x, 8, vw - 8); y = clamp(y, 8, vh - 8);
    } else {
      // enter / leave: steer toward target, no cursor, no clamp
      var gx = tx - x, gy = ty - y, gd = Math.hypot(gx, gy) || 1;
      var acc = mode === 'leave' ? 0.16 : 0.10;
      vx += (gx / gd) * acc; vy += (gy / gd) * acc;
      vx *= 0.96; vy *= 0.96;
      var s2 = Math.hypot(vx, vy), mx2 = mode === 'leave' ? 3.4 : 2.2;
      if (s2 > mx2) { vx = vx / s2 * mx2; vy = vy / s2 * mx2; }
      x += vx; y += vy;

      if (mode === 'enter' && x > 76 && x < vw - 76 && y > 76 && y < vh - 76) {
        mode = 'fly';
        setTimeout(leave, 13000 + Math.random() * 6000);       // stay ~15s (±)
      }
      if (mode === 'leave' && (x < -40 || x > vw + 40 || y < -40 || y > vh + 40)) {
        el.style.visibility = 'hidden';
        setTimeout(enter, 8000 + Math.random() * 6000);        // gone ~10s (±)
        mode = 'gone';
      }
    }

    if (mode === 'gone') return;

    var target = clamp(vx * 6, -26, 26);
    angle += (target - angle) * 0.07;
    el.style.transform = 'translate(' + (x - 17) + 'px,' + (y - 13) + 'px) rotate(' + angle + 'deg)';
    if (fleeing) el.classList.add('flee'); else el.classList.remove('flee');
  }

  function start() {
    if (!document.body) return setTimeout(start, 200);
    injectCss();
    build();
    enter();
    requestAnimationFrame(loop);
  }
  start();
})();
