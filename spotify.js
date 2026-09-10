'use strict';

// Goldene Partikel, scharf auf hochauflösenden Bildschirmen
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let viewW = window.innerWidth;
let viewH = window.innerHeight;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  viewW = window.innerWidth;
  viewH = window.innerHeight;
  canvas.width = Math.round(viewW * dpr);
  canvas.height = Math.round(viewH * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * viewW;
    this.y = Math.random() * viewH;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.color = Math.random() > 0.5 ? 'rgba(201, 168, 76,' : 'rgba(232, 201, 109,';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > viewW) this.vx *= -1;
    if (this.y < 0 || this.y > viewH) this.vy *= -1;
    this.opacity = Math.max(0.1, Math.min(0.8, this.opacity + (Math.random() - 0.5) * 0.02));
  }
  draw() {
    ctx.fillStyle = this.color + this.opacity + ')';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = Array.from({ length: 80 }, () => new Particle());
function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, viewW, viewH);
  particles.forEach((p) => { p.update(); p.draw(); });
  if (!reduceMotion) requestAnimationFrame(animate);
}
animate();
