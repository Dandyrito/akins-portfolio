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
      "Enterprise Wide Switch Lifecyle Project (Commodity to Cisco Switch),",
      "LAN and WAN Deployment.",
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
    icon: "assets/icons/windows-logo.png", // ensure this file exists
    desc: "Enterprise Windows deployments, automation, and system optimization.",
    details: [
      { title: "🖥️ Windows Server", content: "Upgrades, clustering, and Active Directory enhancements." },
      { title: "📂 Group Policy", content: "Design, hardening, and compliance enforcement." },
      { title: "⚙️ OS Deployment", content: "Automated builds with MDT and Intune Autopilot." },
      { title: "📊 Performance", content: "Tuning and monitoring with native Windows tools." },
      { title: "🔒 Endpoint Security", content: "Patch management, Defender ATP, and vulnerability remediation." },
      { title: "💻 Enterprise Wide Windows OS Upgrade", content: "Windows 7 → 10 and Windows 10 → 11 migration." },
      { title: "🔧 Enterprise SCCM Modernization & Patch Optimization", content: "Infrastructure upgrade, patch cycle optimization, and co‑management with Intune." }
    ]
  }
];

// ==================== DOM-Ready Initialization ====================
document.addEventListener("DOMContentLoaded", () => {
  // ---------- Generate Project Cards & Modals ----------
  const container = document.getElementById("projects-container");
  if (container) {
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
      observer.observe(card);

      const modalOverlay = document.createElement("div");
      modalOverlay.className = "modal-overlay";
      modalOverlay.id = `modal-${p.id}`;

      let detailsHTML = "";
      if (Array.isArray(p.details) && p.details.length && typeof p.details[0] === "object") {
        const accordionItems = p.details.map(d => `
          <div class="accordion-item">
            <button class="accordion-header">${d.title}</button>
            <div class="accordion-content"><p>${d.content}</p></div>
          </div>
        `).join("");

        detailsHTML = `
          <div class="accordion-controls">
            <button id="expand-all-${p.id}" class="accordion-toggle">Expand All</button>
            <button id="collapse-all-${p.id}" class="accordion-toggle">Collapse All</button>
          </div>
          ${accordionItems}
        `;
      } else {
        detailsHTML = `<ul>${(p.details || []).map(d => `<li>${d}</li>`).join("")}</ul>`;
      }

      modalOverlay.innerHTML = `
        <div class="modal">
          <span class="close-modal">&times;</span>
          <h3>${p.title} – Details</h3>
          ${detailsHTML}
        </div>
      `;
      document.body.appendChild(modalOverlay);
    });
  }

  // ---------- Scroll Animations ----------
  const scrollElems = document.querySelectorAll('section, .card, .hero h1, .hero h2, .hero-logo');
  scrollElems.forEach(el => observer.observe(el));

  // ---------- Sync <title> with Hero Section ----------
  const pageTitle = document.title;
  let name = pageTitle;
  let subtitle = "";

  if (pageTitle.includes(" - ")) {
    const parts = pageTitle.split(" - ");
    name = parts[0].trim();
    subtitle = parts[1].trim();
  }

  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");

  if (heroTitle) heroTitle.textContent = name;
  if (heroSubtitle && subtitle) heroSubtitle.textContent = subtitle;

  document.querySelectorAll(".hero h1, .hero h2, .hero-logo")
    .forEach(el => el.classList.add("show-on-scroll"));

  const heroLogo = document.querySelector(".hero-logo");
  if (heroLogo) heroLogo.classList.add("visible");

  // ---------- Smooth Scroll for Navbar Links ----------
  document.querySelectorAll('.navbar a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Sticky Header Shrink on Scroll ----------
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });

  // ---------- Lazy-load Images (with fade-in) ----------
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

  // ---------- Scroll-to-Top Button ----------
  const scrollBtn = document.createElement("button");
  scrollBtn.textContent = "↑ Top";
  scrollBtn.className = "scroll-to-top";
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ==================== Global Click Handlers (Modal + Accordion) ====================
document.addEventListener("click", e => {
  // Open modal
  if (e.target.matches('.project-details-btn')) {
    const id = e.target.dataset.modal;
    const el = document.getElementById(`modal-${id}`);
    if (el) el.style.display = "flex";
    return;
  }
  // Close modal via X
  if (e.target.matches('.close-modal')) {
    const overlay = e.target.closest('.modal-overlay');
    if (overlay) overlay.style.display = "none";
    return;
  }
  // Close modal by clicking backdrop
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = "none";
    return;
  }

  // Accordion toggle (smooth)
  if (e.target.classList.contains("accordion-header")) {
    const item = e.target.parentElement;
    const content = item.querySelector(".accordion-content");
    if (!content) return;

    if (item.classList.contains("active")) {
      content.style.maxHeight = null;
      item.classList.remove("active");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      item.classList.add("active");
    }
    return;
  }

  // Expand All
  if (e.target.id.startsWith("expand-all")) {
    const modal = e.target.closest(".modal");
    if (!modal) return;
    modal.querySelectorAll(".accordion-item").forEach(item => {
      const content = item.querySelector(".accordion-content");
      if (!content) return;
      content.style.maxHeight = content.scrollHeight + "px";
      item.classList.add("active");
    });
    return;
  }

  // Collapse All
  if (e.target.id.startsWith("collapse-all")) {
    const modal = e.target.closest(".modal");
    if (!modal) return;
    modal.querySelectorAll(".accordion-item").forEach(item => {
      const content = item.querySelector(".accordion-content");
      if (!content) return;
      content.style.maxHeight = null;
      item.classList.remove("active");
    });
  }
});
