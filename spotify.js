'use strict';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Leiste ----------
const bar = document.getElementById('bar');
const onScroll = () => bar.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Partikel ----------
// Gleiche Funkenflug wie auf Shop, Events und Discord: die Bitmap wird mit der
// Geraetepixeldichte multipliziert, gerechnet wird weiter in CSS-Pixeln.
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let viewW = window.innerWidth;
let viewH = window.innerHeight;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  viewW = window.innerWidth;
  viewH = window.innerHeight;
  canvas.width = Math.round(viewW * dpr);
  canvas.height = Math.round(viewH * dpr);
  canvas.style.width = viewW + 'px';
  canvas.style.height = viewH + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const PARTICLE_COUNT = viewW < 600 ? 60 : 110;
const particles = [];

function resetParticle(p, fresh) {
  p.x = Math.random() * viewW;
  p.y = Math.random() * viewH;
  p.r = p.r || Math.random() * 1.4 + 0.3;
  p.dx = (Math.random() - 0.5) * 0.08;
  p.dy = -Math.random() * 0.12 - 0.02;
  p.life = fresh ? Math.random() : 1;
  return p;
}
for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(resetParticle({}, true));

function drawParticles() {
  ctx.clearRect(0, 0, viewW, viewH);
  for (const p of particles) {
    const a = Math.max(0, p.life) * 0.8;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201, 168, 76, ${a})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    p.life -= 0.0035;
    if (p.life <= 0 || p.y < -4) resetParticle(p, false);
  }
  if (!reduceMotion) requestAnimationFrame(drawParticles);
}
drawParticles();
