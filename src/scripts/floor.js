// Flat page that tilts back into a floor and breaks into 12 lifted UI tiles on scroll.
import { WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, PlaneGeometry, MeshBasicMaterial, CanvasTexture, SRGBColorSpace, MathUtils } from 'three';

const COLS = 4, ROWS = 3, TW = 640, TH = 448;   // tile canvas size in px
const W = 6.4, H = 4.48;                         // tile size in world units (same ratio)
const PAGE = '#e9edf5', INK = '#0b1b3d', MUTED = '#51607d', LINE = '#dfe4ee';
const AMBER = '#ffc447', BLUE = '#1d4ed8', GREEN = '#0f9d7a', VIOLET = '#7c5cd6';

const section = document.getElementById('floor');
const stage = document.getElementById('floor-stage');
const canvasEl = document.getElementById('floor-canvas');
const heads = [...document.querySelectorAll('#floor .headline')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smoother = (t) => (t = clamp(t), t * t * t * (t * (t * 6 - 15) + 10));
const lerp = (a, b, t) => a + (b - a) * t;

// ---------- tile drawing ----------
function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
function txt(c, s, x, y, size, weight = 600, color = INK, align = 'left') {
  c.font = `${weight} ${size}px "Plus Jakarta Sans", system-ui, sans-serif`;
  c.fillStyle = color; c.textAlign = align; c.textBaseline = 'alphabetic'; c.fillText(s, x, y);
}
function pill(c, s, x, y, bg, fg) {
  c.font = '700 20px "Plus Jakarta Sans", system-ui, sans-serif';
  const w = c.measureText(s).width + 28; rr(c, x, y, w, 36, 18); c.fillStyle = bg; c.fill();
  txt(c, s, x + 14, y + 25, 20, 700, fg); return w;
}
function toggle(c, x, y, on) {
  rr(c, x, y, 72, 40, 20); c.fillStyle = on ? GREEN : '#c9d1e0'; c.fill();
  c.beginPath(); c.arc(on ? x + 52 : x + 20, y + 20, 15, 0, Math.PI * 2); c.fillStyle = '#fff'; c.fill();
}
function cover(c, img, x, y, w, h) {
  const s = Math.max(w / img.width, h / img.height), iw = img.width * s, ih = img.height * s;
  c.save(); rr(c, x, y, w, h, 22); c.clip(); c.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih); c.restore();
}

const P = 22, CX = P, CY = P, CW = TW - 2 * P, CH = TH - 2 * P; // inner white card
const tiles = [
  (c) => { // profile
    c.beginPath(); c.arc(CX + 92, CY + 110, 58, 0, Math.PI * 2); c.fillStyle = '#0b1f4a'; c.fill();
    txt(c, 'MP', CX + 92, CY + 126, 44, 800, AMBER, 'center');
    txt(c, 'Mark Angelo Pasion', CX + 176, CY + 104, 32, 800);
    txt(c, 'Software developer · Philippines', CX + 176, CY + 140, 22, 500, MUTED);
    let x = CX + 40; for (const s of ['C#', '.NET', 'MAUI', 'SQLite']) x += pill(c, s, x, CY + 230, '#eef2fb', BLUE) + 12;
    txt(c, '4 apps built end to end', CX + 40, CY + 340, 24, 600, MUTED);
  },
  (c) => { // payment notice
    c.beginPath(); c.arc(CX + 70, CY + 80, 34, 0, Math.PI * 2); c.fillStyle = GREEN; c.fill();
    c.strokeStyle = '#fff'; c.lineWidth = 7; c.beginPath(); c.moveTo(CX + 55, CY + 81); c.lineTo(CX + 66, CY + 93); c.lineTo(CX + 88, CY + 68); c.stroke();
    txt(c, 'GCash cash-in recorded', CX + 124, CY + 90, 28, 700);
    txt(c, '₱1,500.00', CX + 40, CY + 210, 64, 800);
    txt(c, 'Fee earned ₱15.00 · 2:48 PM', CX + 40, CY + 262, 24, 500, MUTED);
    pill(c, 'Kaha', CX + 40, CY + 320, '#e3f6f0', GREEN);
  },
  (c) => { // calendar
    txt(c, 'October 2026', CX + 32, CY + 58, 28, 800);
    txt(c, 'Night shift 9 PM to 6 AM', CX + CW - 32, CY + 58, 20, 600, BLUE, 'right');
    const days = 'MTWTFSS', gw = (CW - 64) / 7;
    for (let i = 0; i < 7; i++) txt(c, days[i], CX + 32 + gw * i + gw / 2, CY + 106, 18, 700, MUTED, 'center');
    for (let d = 1; d <= 31; d++) {
      const i = d + 2, col = i % 7, row = Math.floor(i / 7), x = CX + 32 + gw * col, y = CY + 124 + row * 52;
      const shift = col < 5 && d % 7 !== 0;
      if (shift) { rr(c, x + 6, y, gw - 12, 42, 10); c.fillStyle = d === 19 ? AMBER : '#e6edfc'; c.fill(); }
      txt(c, String(d), x + gw / 2, y + 29, 20, 600, shift ? INK : MUTED, 'center');
    }
  },
  (c) => { // chart
    txt(c, 'Sales, last 7 days', CX + 32, CY + 58, 26, 700, MUTED);
    txt(c, '₱18,640', CX + 32, CY + 120, 52, 800);
    txt(c, '+12% vs same time', CX + 260, CY + 118, 22, 700, GREEN);
    const v = [.45, .62, .5, .7, .78, .66, .95], bw = 52, base = CY + CH - 34;
    v.forEach((h, i) => { const bh = h * 210, x = CX + 40 + i * (bw + 22); rr(c, x, base - bh, bw, bh, 10); c.fillStyle = i === 6 ? BLUE : '#cfdcf7'; c.fill(); });
  },
  (c, img) => { cover(c, img.payroll, CX, CY, CW, CH); },
  (c) => { // chat
    const bub = (s, me, y) => { c.font = '600 22px "Plus Jakarta Sans", system-ui, sans-serif'; const w = c.measureText(s).width + 40, x = me ? CX + CW - 28 - w : CX + 28;
      rr(c, x, y, w, 56, 24); c.fillStyle = me ? BLUE : '#eef1f7'; c.fill(); txt(c, s, x + 20, y + 36, 22, 600, me ? '#fff' : INK); };
    txt(c, 'Demo request', CX + 28, CY + 52, 24, 800);
    bub('Pwede po ba ma-demo ang payroll?', false, CY + 84);
    bub('Oo naman! Dalhin mo ang isang cutoff.', true, CY + 158);
    bub('Sige, salamat po!', false, CY + 232);
    txt(c, 'Seen 9:12 AM', CX + CW - 28, CY + 322, 18, 500, MUTED, 'right');
  },
  (c) => { // toggles
    txt(c, 'Settings', CX + 32, CY + 58, 28, 800);
    [['Works offline', true], ['Senior / PWD discount', true], ['Night differential', true], ['Print kitchen slips', false]].forEach(([s, on], i) => {
      const y = CY + 92 + i * 74; txt(c, s, CX + 32, y + 32, 24, 600); toggle(c, CX + CW - 104, y + 4, on);
      if (i < 3) { c.fillStyle = LINE; c.fillRect(CX + 32, y + 62, CW - 64, 2); }
    });
  },
  (c) => { // task list
    txt(c, 'Collection route today', CX + 32, CY + 58, 26, 800);
    [['Aling Nena', '₱500', true], ['Mang Ben', '₱300', true], ['Ate Joy', '₱450 + multa ₱20', false], ['Kuya Rey', '₱1,000', false]].forEach(([n, a, done], i) => {
      const y = CY + 96 + i * 70;
      rr(c, CX + 32, y, 36, 36, 10); c.fillStyle = done ? VIOLET : '#fff'; c.fill(); c.strokeStyle = VIOLET; c.lineWidth = 3; c.stroke();
      if (done) { c.strokeStyle = '#fff'; c.lineWidth = 5; c.beginPath(); c.moveTo(CX + 41, y + 18); c.lineTo(CX + 48, y + 26); c.lineTo(CX + 60, y + 11); c.stroke(); }
      txt(c, n, CX + 88, y + 27, 24, 600, done ? MUTED : INK); txt(c, a, CX + CW - 32, y + 27, 22, 700, done ? MUTED : INK, 'right');
    });
  },
  (c) => { // payslip
    txt(c, 'Payslip · Oct 1 to 15', CX + 32, CY + 58, 26, 800);
    [['Basic pay', '12,500.00'], ['Night differential', '1,050.00'], ['Overtime', '2,062.50'], ['Deductions', '-1,286.00']].forEach(([k, v], i) => {
      const y = CY + 110 + i * 46; txt(c, k, CX + 32, y, 22, 500, MUTED); txt(c, v, CX + CW - 32, y, 22, 700, INK, 'right');
    });
    c.fillStyle = LINE; c.fillRect(CX + 32, CY + 292, CW - 64, 2);
    txt(c, 'Net pay', CX + 32, CY + 350, 26, 700); txt(c, '₱14,326.50', CX + CW - 32, CY + 352, 40, 800, INK, 'right');
  },
  (c, img) => { cover(c, img.pos, CX, CY, CW, CH); },
  (c) => { // low stock
    txt(c, 'Low stock', CX + 32, CY + 58, 28, 800);
    [['Condensed Milk', 'Out', '#fde2e2', '#b42318'], ['Caramel Syrup', '150 ml', '#fdf0d8', '#8a5300'], ['Oat Milk', '600 ml', '#fdf0d8', '#8a5300'], ['16oz Cup', '36 pcs', '#fdf0d8', '#8a5300']].forEach(([n, q, bg, fg], i) => {
      const y = CY + 92 + i * 72; txt(c, n, CX + 32, y + 32, 24, 600);
      c.font = '700 20px "Plus Jakarta Sans", system-ui, sans-serif'; pill(c, q, CX + CW - 32 - (c.measureText(q).width + 28), y + 6, bg, fg);
    });
  },
  (c) => { // clock-in
    txt(c, 'Clocked in', CX + 32, CY + 58, 26, 700, MUTED);
    txt(c, '8:58 PM', CX + 32, CY + 160, 84, 800);
    txt(c, 'Time stamped by the server · Night shift', CX + 32, CY + 206, 22, 500, MUTED);
    rr(c, CX + 32, CY + 266, 220, 72, 18); c.fillStyle = INK; c.fill(); txt(c, 'Clock out', CX + 142, CY + 312, 26, 700, '#fff', 'center');
    pill(c, 'Easy Payroll', CX + 280, CY + 284, '#fff4d6', '#7a5200');
  },
];

function drawTile(i, img) {
  const cv = document.createElement('canvas'); cv.width = TW; cv.height = TH;
  const c = cv.getContext('2d');
  rr(c, 0, 0, TW, TH, 36); c.fillStyle = PAGE; c.fill();             // tile base, same as the backing page
  rr(c, CX, CY, CW, CH, 26); c.fillStyle = '#fff'; c.fill();         // the UI card
  tiles[i](c, img);
  return cv;
}

function shadowCanvas() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 256;
  const c = cv.getContext('2d'), g = c.createRadialGradient(128, 128, 10, 128, 128, 128);
  g.addColorStop(0, 'rgba(11,27,61,.55)'); g.addColorStop(1, 'rgba(11,27,61,0)');
  c.fillStyle = g; c.fillRect(0, 0, 256, 256); return cv;
}

const loadImg = (src) => new Promise((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = no; im.src = src; });

// ---------- scene ----------
let renderer;
try { renderer = new WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true }); }
catch (e) { console.warn('3D intro off:', e); section.classList.add('no-webgl'); }

if (renderer) start().catch((e) => { console.warn('3D intro off:', e); section.classList.add('no-webgl'); });

async function start() {
  await document.fonts.load('800 32px "Plus Jakarta Sans"');
  // Banner URLs come from the canvas data attributes (built and hashed by Astro).
  const img = { payroll: await loadImg(canvasEl.dataset.payroll), pos: await loadImg(canvasEl.dataset.pos) };

  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 400);
  const group = new Group(); scene.add(group);

  const disposables = [], canvases = [];
  const track = (o) => (disposables.push(o), o);

  const backing = new Mesh(track(new PlaneGeometry(COLS * W, ROWS * H)),
    track(new MeshBasicMaterial({ color: PAGE, transparent: true, toneMapped: false })));
  backing.renderOrder = 0; group.add(backing);

  const shadowCv = shadowCanvas(); canvases.push(shadowCv);
  const shadowTex = track(new CanvasTexture(shadowCv));
  const tileGeo = track(new PlaneGeometry(W, H));
  const shadowGeo = track(new PlaneGeometry(W * 1.35, H * 1.45));
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  // Fixed per-tile variety so the layout is the same on every visit.
  const lifts = [1.6, 0.7, 2.3, 1.1, 0.9, 2.0, 1.3, 2.6, 1.9, 1.0, 2.4, 0.8];
  const rots  = [-.06, .05, -.03, .07, .04, -.07, .06, -.04, .03, -.05, .08, -.02];
  const items = [];
  for (let r = 0; r < ROWS; r++) for (let col = 0; col < COLS; col++) {
    const i = r * COLS + col, cv = drawTile(i, img); canvases.push(cv);
    const tex = track(new CanvasTexture(cv)); tex.colorSpace = SRGBColorSpace; tex.anisotropy = maxAniso;
    const mesh = new Mesh(tileGeo, track(new MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false })));
    const shadow = new Mesh(shadowGeo, track(new MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0, depthWrite: false, toneMapped: false })));
    const bx = (col - (COLS - 1) / 2) * W, by = ((ROWS - 1) / 2 - r) * H;
    mesh.renderOrder = 2; shadow.renderOrder = 1;
    group.add(shadow, mesh);
    items.push({ mesh, shadow, bx, by, front: ROWS - 1 - r, lift: lifts[i], rz: rots[i], rx: rots[(i + 5) % 12] });
  }

  let dist = 40, lookY = 0;
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    const tan = Math.tan(MathUtils.degToRad(camera.fov / 2));
    // Fit the page into the lower ~62% of the view, leaving room for the headline above it.
    dist = Math.max((COLS * W) / (0.92 * 2 * tan * camera.aspect), (ROWS * H) / (0.6 * 2 * tan));
    lookY = 0.17 * 2 * dist * tan;
    wake();
  }

  function apply(p) {
    const a = smoother(p / 0.42);                       // phase 1: tilt back, camera rises
    group.rotation.x = -1.2 * a;
    camera.position.set(0, lerp(lookY, dist * 0.42, a), lerp(dist, dist * 0.78, a));
    camera.lookAt(0, lerp(lookY, 0, a), 0);

    const b = clamp((p - 0.42) / 0.58);                 // phase 2: break apart, front row first
    let avg = 0;
    for (const it of items) {
      const t = smoother((b - it.front * 0.16) / 0.68); avg += t / items.length;
      const s = 1 + 0.4 * t;
      it.mesh.position.set(it.bx * s, it.by * s, 0.02 + it.lift * t);
      it.mesh.rotation.set(it.rx * t, 0, it.rz * t);
      it.shadow.position.set(it.bx * s, it.by * s, 0.01);
      it.shadow.scale.setScalar(1 + it.lift * 0.08 * t);
      it.shadow.material.opacity = 0.75 * t;
    }
    backing.material.opacity = 1 - avg;
    // Pull back and aim a little above the floor as it spreads, so the wider layout stays clear of the headline.
    const k = 1 + 0.32 * avg;
    camera.position.multiplyScalar(k);
    camera.lookAt(0, lerp(lookY, 0, a) + avg * dist * 0.1, 0);

    heads.forEach((el, i) => { el.style.opacity = clamp(1 - Math.abs(p - i / (heads.length - 1)) * 4.2); });
    renderer.render(scene, camera);
  }

  const target = () => clamp((stage.getBoundingClientRect().top - section.getBoundingClientRect().top) / (section.offsetHeight - stage.clientHeight));
  let cur = target(), raf = 0;
  function frame() {
    const t = target(); cur += (t - cur) * 0.09;
    if (Math.abs(t - cur) < 0.0004) cur = t;
    apply(cur);
    raf = cur === t ? 0 : requestAnimationFrame(frame);
  }
  function wake() { if (reduced) return apply(1); if (!raf) raf = requestAnimationFrame(frame); }

  addEventListener('resize', resize);
  if (!reduced) addEventListener('scroll', wake, { passive: true });
  resize();

  addEventListener('pagehide', () => {
    cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('scroll', wake);
    disposables.forEach((o) => o.dispose());
    canvases.forEach((cv) => { cv.width = cv.height = 0; });
    renderer.dispose();
  }, { once: true });
}
