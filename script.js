(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var isNarrow = window.matchMedia("(max-width: 900px)").matches;
  if (prefersReducedMotion) return;

  if (finePointer) {
    document.body.classList.add("fx-cursor-none");
  }

  var mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  var ring = document.getElementById("cursor-ring");
  var core = document.getElementById("cursor-core");
  var ringPos = { x: mouse.x, y: mouse.y };
  var corePos = { x: mouse.x, y: mouse.y };

  document.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animateCursor() {
    if (!finePointer) return;
    if (ring && core) {
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      corePos.x += (mouse.x - corePos.x) * 0.35;
      corePos.y += (mouse.y - corePos.y) * 0.35;
      ring.style.transform = "translate(" + ringPos.x + "px," + ringPos.y + "px) translate(-50%, -50%)";
      core.style.transform = "translate(" + corePos.x + "px," + corePos.y + "px) translate(-50%, -50%)";
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Parallax / 3D motion only on desktop — these transforms caused horizontal scroll on mobile
  if (!isNarrow && finePointer) {
    var parallaxItems = document.querySelectorAll("[data-parallax], [data-depth]");
    window.addEventListener("mousemove", function (e) {
      var px = (e.clientX / window.innerWidth - 0.5) * 2;
      var py = (e.clientY / window.innerHeight - 0.5) * 2;
      parallaxItems.forEach(function (el) {
        var depth = parseFloat(el.getAttribute("data-parallax") || el.getAttribute("data-depth") || "0.02");
        var tx = px * depth * 42;
        var ty = py * depth * 28;
        el.style.transform = "translate3d(" + tx + "px," + ty + "px,0)";
      });
    });

    var tilts = document.querySelectorAll("[data-tilt]");
    tilts.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width;
        var y = (e.clientY - r.top) / r.height;
        var rx = (0.5 - y) * 8;
        var ry = (x - 0.5) * 10;
        el.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-2px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });

    var frame = document.getElementById("holo-frame");
    if (frame) {
      window.addEventListener("mousemove", function (e) {
        var x = (e.clientX / window.innerWidth - 0.5) * 14;
        var y = (e.clientY / window.innerHeight - 0.5) * -10;
        frame.style.transform = "perspective(1000px) rotateY(" + x + "deg) rotateX(" + y + "deg)";
      });
    }
  } else {
    document.querySelectorAll("[data-parallax], [data-depth], #holo-frame").forEach(function (el) {
      el.style.transform = "";
    });
  }

  var canvas = document.getElementById("cyber-canvas");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var points = [];
  var pointCount = window.innerWidth < 768 ? 35 : 60;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  for (var i = 0; i < pointCount; i++) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }

  function drawGrid() {
    var spacing = 56;
    var ox = (mouse.x - canvas.width * 0.5) * 0.04;
    var oy = (mouse.y - canvas.height * 0.5) * 0.02;
    var horizon = canvas.height * 0.58;

    ctx.strokeStyle = "rgba(48,242,255,0.08)";
    ctx.lineWidth = 1;
    for (var x = -spacing; x < canvas.width + spacing; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x + ox, horizon);
      ctx.lineTo((x - canvas.width * 0.5) * 0.55 + canvas.width * 0.5 + ox * 1.5, canvas.height);
      ctx.stroke();
    }
    for (var y = horizon; y < canvas.height; y += spacing * 0.65) {
      var spread = (y - horizon) / (canvas.height - horizon);
      ctx.beginPath();
      ctx.moveTo(ox - spread * canvas.width, y + oy);
      ctx.lineTo(canvas.width + ox + spread * canvas.width, y + oy);
      ctx.stroke();
    }
  }

  function drawNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      var dMouse = Math.hypot(mouse.x - p.x, mouse.y - p.y);
      if (dMouse < 180) {
        p.x += (mouse.x - p.x) * 0.0045;
        p.y += (mouse.y - p.y) * 0.0045;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = "rgba(255,43,214," + (1 - dMouse / 180) * 0.35 + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(48,242,255,0.75)";
      ctx.fill();

      for (var j = i + 1; j < points.length; j++) {
        var q = points[j];
        var d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          var alpha = 1 - d / 120;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(48,242,255," + alpha * 0.18 + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawNetwork);
  }
  drawNetwork();
})();
