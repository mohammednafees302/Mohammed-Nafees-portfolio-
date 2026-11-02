// ============================================================
// PREMIUM PORTFOLIO JAVASCRIPT
// ============================================================

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + "px";
  follower.style.top = followerY + "px";
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll("a, button, .glass-card, .bubble, .trusted-logo").forEach(el => {
  el.addEventListener("mouseenter", () => { cursor.style.transform = "translate(-50%,-50%) scale(2)"; follower.style.transform = "translate(-50%,-50%) scale(1.5)"; });
  el.addEventListener("mouseleave", () => { cursor.style.transform = "translate(-50%,-50%) scale(1)"; follower.style.transform = "translate(-50%,-50%) scale(1)"; });
});

// ---- PARTICLES ----
const particlesContainer = document.getElementById("particles");
function createParticle() {
  const p = document.createElement("div");
  p.className = "particle";
  const size = Math.random() * 4 + 1;
  const left = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const drift = (Math.random() - 0.5) * 200;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${left}%;
    animation-duration:${duration}s;
    animation-delay:${Math.random() * -20}s;
    --drift:${drift}px;
    opacity:0.4;
    background: ${Math.random() > 0.5 ? "rgba(0,168,255,0.6)" : "rgba(123,47,255,0.6)"};
  `;
  particlesContainer.appendChild(p);
}
for (let i = 0; i < 40; i++) createParticle();

// ---- NAVBAR ----
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);

  // Active nav link
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// ---- HAMBURGER ----
const hamburger = document.getElementById("hamburger");
const navLinksEl = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinksEl.classList.toggle("open");
  const spans = hamburger.querySelectorAll("span");
  if (navLinksEl.classList.contains("open")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity = "";
    spans[2].style.transform = "";
  }
});

// Close nav on link click
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinksEl.classList.remove("open");
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "";
    spans[1].style.opacity = "";
    spans[2].style.transform = "";
  });
});

// ---- INTERSECTION OBSERVER ----
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -60px 0px" };

// Fade-in on scroll
const fadeEls = document.querySelectorAll(".glass-card, .process-step, .about-card, .contact-form, .section-header");
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeEls.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  fadeObserver.observe(el);
});

// ---- COUNTER ANIMATION ----
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + (target >= 100 ? "%" : "+");
  }, 16);
}
counters.forEach(c => counterObserver.observe(c));

// ---- SKILL BARS ----
const skillBars = document.querySelectorAll(".skill-bar-fill");
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      setTimeout(() => { entry.target.style.width = width + "%"; }, 200);
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => barObserver.observe(bar));

// ---- CONTACT FORM ----
const form = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.innerHTML = `<span class="spinner"></span> Sending...`;
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";
  await new Promise(r => setTimeout(r, 1800));
  submitBtn.innerHTML = `Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`;
  submitBtn.disabled = false;
  submitBtn.style.opacity = "1";
  formSuccess.style.display = "block";
  form.reset();
  setTimeout(() => { formSuccess.style.display = "none"; }, 5000);
});

// ---- DOWNLOAD RESUME ----
document.getElementById("downloadBtn").addEventListener("click", e => {
  e.preventDefault();
  alert("Resume download coming soon! Please contact me directly for my resume.");
});

// ---- SMOOTH SCROLL ACTIVE NAV ----
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ---- HERO PARALLAX ----
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector(".hero-content");
  const heroImg = document.querySelector(".hero-image-wrapper");
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
    heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// ---- TILT EFFECT ON CARDS ----
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    card.style.transform = `translateY(-8px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ---- GLASSMORPHISM GLOW ON HOVER ----
document.querySelectorAll(".glass-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--glow-x", x + "%");
    card.style.setProperty("--glow-y", y + "%");
  });
});

console.log("Portfolio loaded! 🚀 Built with passion by a BE CSE Graduate.");
