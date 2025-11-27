// ==================== Projects Data ====================
const projects = [
  // ... (your projects array stays the same)
];

// ==================== Generate Project Cards & Modals ====================
const container = document.getElementById("projects-container");

projects.forEach(p => {
  const card = document.createElement("div");
  card.className = "card project-card";
  card.innerHTML = `
    <div class="project-header">
      <img src="${p.icon}" class="project-icon" alt="${p.title} Icon" loading="lazy">
      <h4>${p.title}</h4>
    </div>
    <p>${p.desc}</p>
    <button class="project-details-btn" data-modal="${p.id}">View Project Details</button>
  `;
  container.appendChild(card);

  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.id = `modal-${p.id}`;
  modalOverlay.innerHTML = `
    <div class="modal">
      <span class="close-modal">&times;</span>
      <h3>${p.title} – Details</h3>
      <ul>${p.details.map(d => `<li>${d}</li>`).join("")}</ul>
    </div>
  `;
  document.body.appendChild(modalOverlay);
});

// ==================== Modal Logic ====================
document.addEventListener("click", e => {
  if (e.target.matches('.project-details-btn')) {
    document.getElementById(`modal-${e.target.dataset.modal}`).style.display = "flex";
  } else if (e.target.matches('.close-modal')) {
    e.target.closest('.modal-overlay').style.display = "none";
  } else if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = "none";
  }
});

// ==================== Scroll Animations ====================
const scrollElems = document.querySelectorAll('section, .card, .hero h1, .hero h2, .hero-logo');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-on-scroll');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

scrollElems.forEach(el => observer.observe(el));

// 👉 Ensure hero is visible immediately
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hero h1, .hero h2, .hero-logo")
    .forEach(el => el.classList.add("show-on-scroll"));
});

// ==================== Smooth Scroll for Navbar Links ====================
document.querySelectorAll('.navbar a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==================== Sticky Header Shrink on Scroll ====================
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

// ==================== Lazy-load Images ====================
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      imgObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

lazyImages.forEach(img => imgObserver.observe(img));

// ==================== Scroll-to-Top Button ====================
const scrollBtn = document.createElement("button");
scrollBtn.textContent = "↑ Top";
scrollBtn.className = "scroll-to-top";
scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "30px";
scrollBtn.style.right = "30px";
scrollBtn.style.padding = "10px 15px";
scrollBtn.style.borderRadius = "6px";
scrollBtn.style.border = "none";
scrollBtn.style.background = "#00b8d4";
scrollBtn.style.color = "#fff";
scrollBtn.style.fontWeight = "600";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";
scrollBtn.style.zIndex = "1000";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
