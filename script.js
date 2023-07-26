/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = window.innerWidth);
const CANVAS_HEIGHT = (canvas.height = window.innerHeight);

const rangeInput = document.getElementById('circles');
const speedInput = document.getElementById('speed');
rangeInput.addEventListener('change', function(event) {
  circles = event.target.value;
  time = 0;
  wave = [];
});

speedInput.addEventListener('change', function(event) {
  speed = event.target.value;
  time = 0;
  wave = [];
});

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let time = 0;
let speed = 2;
let wave = [];
let circles = 2;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let x = 0;
  let y = 0;
  let prevCentre = new Point(CANVAS_WIDTH / 5, CANVAS_HEIGHT / 2);
  for (let i = 0; i < circles; i++) {
    let n = i * 2 + 1;
    let r = 100 * (4 / (n * Math.PI));
    let center = prevCentre;

    ctx.beginPath();
    ctx.arc(center.x, center.y, r, 2 * Math.PI, false);
    ctx.lineWidth = 1;
    ctx.stroke();

    x = center.x + r * Math.cos(n * time);
    y = center.y + r * Math.sin(n * time);

    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    prevCentre = new Point(x, y);
  }
  wave.unshift(y);

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(3 * CANVAS_WIDTH / 4, wave[0]);
  ctx.stroke();

  ctx.beginPath();
  for (let j = 0; j < wave.length; j++) {
    ctx.lineTo(j + 3 * CANVAS_WIDTH / 4, wave[j]);
  }
  ctx.stroke();
  if (wave.length > 400) wave.pop();

  time += 0.01 * speed;

  requestAnimationFrame(animate);
}

animate();

