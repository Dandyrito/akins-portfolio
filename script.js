// ==================== Scroll Animations Observer ====================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-on-scroll');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// ==================== Projects Data ====================
const projects = [
  {
    id: "aws",
    title: "AWS Infrastructure Modernization",
    icon: "assets/icons/cloud-server.png",
    desc: "Hybrid cloud migration, automation, and monitoring modernization.",
    details: [
      "Hybrid cloud migration using EC2, S3, VPC, CloudWatch & Auto Scaling.",
      "VMware workload migration and performance improvement.",
      "Automation using Terraform & CloudFormation.",
      "Enhanced reliability via monitoring pipelines."
    ]
  },
  {
    id: "intune",
    title: "Intune & Autopilot Deployment",
    icon: "assets/icons/secure-endpoint.png",
    desc: "Modern device management, compliance enforcement and provisioning automation.",
    details: [
      "Modern device management rollout.",
      "Compliance policies, profiles & conditional access.",
      "60% reduction in onboarding time."
    ]
  },
  {
    id: "network",
    title: "Network Upgrade & Optimization",
    icon: "assets/icons/network-topology.png",
    desc: "Multi-site network refresh, Wi-Fi optimization and segmentation redesign.",
    details: [
      "Switches, APs, firewalls refresh.",
      "Telemetry-based performance optimization"
    ]
  },
  {
    id: "adds",
    title: "Active Directory Domain Consolidation",
    icon: "assets/icons/ad-ds.png",
    desc: "Security hardening, identity governance, and forest/domain cleanup.",
    details: [
      "Multi-domain cleanup & consolidation.",
      "GPO hardening and identity governance."
    ]
  },
  {
    id: "dns",
    title: "DNS Security & High Availability",
    icon: "assets/icons/dns.png",
    desc: "DNS failover, secure configuration, replication tuning and HA.",
    details: [
      "Failover, scavenging & HA DNS design.",
      "Security hardening against spoofing & poisoning."
    ]
  },
  {
    id: "m365",
    title: "Microsoft 365 Tenant Governance",
    icon: "assets/icons/tenant-management.png",
    desc: "Identity lifecycle, mailflow, security policies and automation.",
    details: [
      "Tenant lifecycle governance.",
      "Exchange, Teams, SharePoint management.",
      "Security policies, DLP, CA enforcement."
    ]
  },
  {
    id: "windows",
    title: "Windows Infrastructure Projects",
    icon: "assets/icons/windows-logo.png", 
    desc: "Enterprise Windows deployments, automation, and system optimization.",
    details: [
      "🖥️ Windows Server: Upgrades, clustering, and Active Directory enhancements.",
      "📂 Group Policy: Design, hardening, and compliance enforcement.",
      "⚙️ OS Deployment: Automated builds with MDT and Intune Autopilot.",
      "💻 Enterprise Wide Windows OS Upgrade: Windows 7 → 10 and Windows 10 → 11 migration.",
      "📊 Performance: Tuning and monitoring with native Windows tools.",
      "🔒 Endpoint Security: Patch management, Defender ATP, and vulnerability remediation.",
      "🔧 Enterprise SCCM Modernization & Patch Optimization: Infrastructure upgrade, patch cycle optimization, and co‑management with Intune."
    ]
  }
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

  // ✅ Observe dynamically added cards
  observer.observe(card);

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
scrollElems.forEach(el => observer.observe(el));

// ==================== Sync <title> with Hero Section ====================
document.addEventListener("DOMContentLoaded", () => {
  // Get the <title> text
  const pageTitle = document.title;

  // Try to split into name and subtitle using " - "
  let name = pageTitle;
  let subtitle = "";

  if (pageTitle.includes(" - ")) {
    const parts = pageTitle.split(" - ");
    name = parts[0].trim();
    subtitle = parts[1].trim();
  }

  // Inject into hero section
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");

  if (heroTitle) heroTitle.textContent = name;
  if (heroSubtitle && subtitle) heroSubtitle.textContent = subtitle;

  // Force hero visible immediately
  document.querySelectorAll(".hero h1, .hero h2, .hero-logo")
    .forEach(el => el.classList.add("show-on-scroll"));

  const heroLogo = document.querySelector(".hero-logo");
  if (heroLogo) heroLogo.classList.add("visible");
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
