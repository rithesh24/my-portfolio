const videoGallery = document.getElementById("video-gallery");
const cylinder = document.getElementById("cylinder");

window.addEventListener("scroll", () => {
  const rect = videoGallery.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Check if the video section is in view
  if (rect.top < windowHeight && rect.bottom > 0) {
    // Calculate how far user has scrolled *within* the section
    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
    const rotateY = progress * 360; // Full 360° over the section
    cylinder.style.transform = `rotateY(${rotateY}deg)`;
  }
});
<script>
  const canvas = document.getElementById("mouseTrail");
  const ctx = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const points = [];

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  window.addEventListener("mousemove", (e) => {
    points.push({ x: e.clientX, y: e.clientY, alpha: 1 });
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.shadowColor = "white";
      ctx.shadowBlur = 10;
      ctx.fill();

      p.alpha -= 0.02;
      if (p.alpha <= 0) {
        points.splice(i, 1);
        i--;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
</script>

