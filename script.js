const giftBox = document.getElementById("giftBox");
const openBtn = document.getElementById("openBtn");
const surprise = document.getElementById("surprise");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const restartBtn = document.getElementById("restartBtn");
const giftBtn = document.getElementById("giftBtn");
const giftMsg = document.getElementById("giftMsg");

openBtn.addEventListener("click", () => {
  giftBox.classList.add("open");
  document.querySelector(".lid").style.transform = "translateY(-150px) rotate(-20deg)";
  document.querySelector(".lid").style.transition = "1.2s ease";

  setTimeout(() => {
    document.querySelector(".gift-container").style.display = "none";
    surprise.classList.add("show");
    startEffects();
    musicBtn.style.display = "block";
    restartBtn.style.display = "block";
    giftBtn.style.display = "inline-block";
  }, 1500);
});

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "🔇 Stop Music";
  } else {
    music.pause();
    musicBtn.textContent = "🎵 Play Music";
  }
});

restartBtn.addEventListener("click", () => {
  surprise.classList.remove("show");
  setTimeout(() => location.reload(), 500);
});

giftBtn.addEventListener("click", () => {
  giftMsg.textContent = "💌 Sorry I’m not there to make something special for you, but you have three wishes — and if I can, I’ll make them all come true.😅";
  giftMsg.classList.add("show");
});

function startEffects() {
  const canvas = document.getElementById("effects");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const doves = [];
  const petals = [];
  const sparkles = [];
  const hearts = [];

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

  class Dove {
    constructor() {
      this.x = Math.random() * innerWidth;
      this.y = innerHeight + 50;
      this.size = 20 + Math.random() * 20;
      this.speed = 1 + Math.random() * 2;
      this.opacity = 0.7;
    }
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.quadraticCurveTo(this.x - 10, this.y - 10, this.x, this.y - this.size);
      ctx.quadraticCurveTo(this.x + 10, this.y - 10, this.x, this.y);
      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      ctx.fill();
    }
    update() {
      this.y -= this.speed;
      this.x += Math.sin(this.y / 40) * 1.2;
      if (this.y < -50) this.y = innerHeight + 50;
      this.draw();
    }
  }

  class Petal {
    constructor() {
      this.x = Math.random() * innerWidth;
      this.y = Math.random() * innerHeight;
      this.size = 4 + Math.random() * 3;
      this.speed = 0.5 + Math.random();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,182,193,0.6)";
      ctx.fill();
    }
    update() {
      this.y += this.speed;
      this.x += Math.sin(this.y / 50);
      if (this.y > innerHeight) this.y = -10;
      this.draw();
    }
  }

  class Spark {
    constructor() {
      this.x = Math.random() * innerWidth;
      this.y = innerHeight;
      this.size = Math.random() * 2;
      this.speed = 1 + Math.random() * 3;
    }
    draw() {
      ctx.fillStyle = "rgba(255,255,200,0.8)";
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
      this.y -= this.speed;
      if (this.y < -10) this.y = innerHeight;
      this.draw();
    }
  }

  class Heart {
    constructor() {
      this.x = Math.random() * innerWidth;
      this.y = innerHeight + 10;
      this.size = 10 + Math.random() * 10;
      this.speed = 1 + Math.random();
      this.opacity = 0.6 + Math.random() * 0.4;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.size / 15, this.size / 15);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
      ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);
      ctx.fillStyle = `rgba(255,100,150,${this.opacity})`;
      ctx.fill();
      ctx.restore();
    }
    update() {
      this.y -= this.speed;
      if (this.y < -20) this.y = innerHeight + 20;
      this.draw();
    }
  }

  for (let i = 0; i < 15; i++) doves.push(new Dove());
  for (let i = 0; i < 50; i++) petals.push(new Petal());
  for (let i = 0; i < 80; i++) sparkles.push(new Spark());
  for (let i = 0; i < 20; i++) hearts.push(new Heart());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkles.forEach(s => s.update());
    petals.forEach(p => p.update());
    doves.forEach(d => d.update());
    hearts.forEach(h => h.update());
    requestAnimationFrame(animate);
  }
  animate();
}
