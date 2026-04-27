const OS_CONFIG = {
  windows: {
    name: "Windows",
    line: "Compatível com Windows 10/11 · 64-bit",
    file: "computational-processing-windows.exe",
  },
  macos: {
    name: "macOS",
    line: "Compatível com macOS 12+ · Intel & Apple Silicon",
    file: "computational-processing-macos.dmg",
  },
  linux: {
    name: "Linux",
    line: "Compatível com Ubuntu 22.04 / Fedora 38+",
    file: "computational-processing-linux.AppImage",
  },
};

let currentOS = "windows";

const tabs = document.querySelectorAll(".tab");
const osNameEl = document.getElementById("osName");
const osLineEl = document.getElementById("osLine");
const installBtn = document.getElementById("installBtn");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const progressLabel = document.getElementById("progressLabel");
const progressPct = document.getElementById("progressPct");
const progressFoot = document.getElementById("progressFoot");

function detectOS() {
  const ua = navigator.userAgent || "";
  if (/Mac/i.test(ua)) return "macos";
  if (/Linux/i.test(ua)) return "linux";
  if (/Win/i.test(ua)) return "windows";
  return "windows";
}

function setOS(os) {
  if (!OS_CONFIG[os]) return;
  currentOS = os;
  const cfg = OS_CONFIG[os];
  if (osNameEl) osNameEl.textContent = cfg.name;
  if (osLineEl) osLineEl.textContent = cfg.line;
  if (installBtn && installBtn.tagName === "A") {
    installBtn.href = `./files/${cfg.file}`;
    installBtn.setAttribute("download", cfg.file);
  }
  tabs.forEach((t) => {
    t.classList.toggle("active", t.dataset.os === os);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    setOS(tab.dataset.os);
  });
});

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function showDownloadFeedback(e) {
  const cfg = OS_CONFIG[currentOS];

  if (!progress) return;
  progress.hidden = false;

  const checks = [
    { pct: 25, label: "Passo 1 de 4", foot: `A localizar pacote para ${cfg.name}…` },
    { pct: 55, label: "Passo 2 de 4", foot: "A verificar disponibilidade do ficheiro…" },
    { pct: 85, label: "Passo 3 de 4", foot: "A preparar entrega…" },
    { pct: 100, label: "Passo 4 de 4", foot: `A iniciar transferência: ${cfg.file}` },
  ];

  for (const step of checks) {
    progressBar.style.width = step.pct + "%";
    progressPct.textContent = step.pct + "%";
    progressLabel.textContent = step.label;
    progressFoot.textContent = step.foot;
    await sleep(450);
  }

  progressLabel.textContent = "Pronto";
  progressFoot.textContent =
    "Se o download não começou automaticamente, é porque o ficheiro do instalador ainda não foi colocado neste site.";
}

if (installBtn) {
  installBtn.addEventListener("click", () => {
    showDownloadFeedback();
  });
}

if (osNameEl) {
  setOS(detectOS());
}

const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section, .feature, .req-card, .steps li").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  observer.observe(el);
});
