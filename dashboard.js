// ===== Task Data =====
// Statuses: "completed" | "in-progress" | "not-started"
const STORAGE_KEY = "techbridge_task_progress_v1";

let tasks = [
  {
    id: 1,
    title: "TechBridge Landing Page",
    description: "Build the marketing homepage introducing the TechBridge internship program.",
    detail: "Covers semantic HTML structure, a hero section, and a responsive layout using CSS Flexbox and Grid.",
    status: "completed"
  },
  {
    id: 2,
    title: "Company Research & About Page",
    description: "Create an About page summarizing TechBridge's mission and team.",
    detail: "Focused on content hierarchy, readable typography, and basic accessibility practices.",
    status: "completed"
  },
  {
    id: 3,
    title: "Responsive Navigation & Layout",
    description: "Implement a responsive site-wide navigation bar and page layout system.",
    detail: "Introduced mobile breakpoints, a hamburger menu pattern, and consistent spacing tokens.",
    status: "completed"
  },
  {
    id: 4,
    title: "Contact Form & Validation",
    description: "Build a contact form with client-side validation and feedback states.",
    detail: "Used JavaScript form validation, error messaging, and success confirmation without a page reload.",
    status: "completed"
  },
  {
    id: 5,
    title: "Challenge Hub",
    description: "Build a page where users can browse and explore TechBridge coding challenges.",
    detail: "Introduced dynamic card rendering from a JavaScript data array, the same pattern used in this dashboard.",
    status: "completed"
  },
  {
    id: 6,
    title: "Intern Dashboard",
    description: "Build the interactive dashboard you're using right now to track internship progress.",
    detail: "Covers DOM manipulation, event listeners, filtering, modals, and connecting multiple pages together.",
    status: "in-progress"
  },
  {
    id: 7,
    title: "API Integration Basics",
    description: "Connect a frontend page to a public API and render live data.",
    detail: "Will introduce fetch requests, async/await, loading states, and handling errors from an API.",
    status: "not-started"
  },
  {
    id: 8,
    title: "Final Capstone Project",
    description: "Combine everything learned into one polished, full-featured project.",
    detail: "The closing project of the internship track, pulling together every skill from Tasks 1-7.",
    status: "not-started"
  }
];

let currentFilter = "all";

// ===== Persistence (optional, best-effort) =====
function saveProgress() {
  try {
    const statuses = tasks.map(t => ({ id: t.id, status: t.status }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  } catch (e) {
    // localStorage unavailable — progress just won't persist across reloads
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    saved.forEach(s => {
      const task = tasks.find(t => t.id === s.id);
      if (task) task.status = s.status;
    });
  } catch (e) {
    // ignore corrupt/missing data
  }
}

// ===== Status label helper =====
function statusLabel(status) {
  if (status === "completed") return "Completed";
  if (status === "in-progress") return "In Progress";
  return "Not Started";
}

// ===== Progress calculations =====
function updateProgressUI() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const remaining = total - completed;
  const percent = Math.round((completed / total) * 100);

  document.getElementById("statCompleted").textContent = completed;
  document.getElementById("statRemaining").textContent = remaining;
  document.getElementById("statPercent").textContent = percent + "%";
  document.getElementById("progressFill").style.width = percent + "%";
  document.getElementById("progressLabel").textContent = `${completed} / ${total} Tasks Completed`;
}

// ===== Render task cards =====
function renderTasks() {
  const grid = document.getElementById("taskGrid");
  grid.innerHTML = "";

  const visible = tasks.filter(t => currentFilter === "all" || t.status === currentFilter);

  if (visible.length === 0) {
    grid.innerHTML = `<p class="muted">No tasks match this filter.</p>`;
    return;
  }

  visible.forEach(task => {
    const card = document.createElement("div");
    card.className = `task-card ${task.status}`;

    card.innerHTML = `
      <span class="task-num">TASK ${task.id}</span>
      <h3 class="task-title">${task.title}</h3>
      <p class="task-desc">${task.description}</p>
      <div class="task-status-row">
        <span class="status-badge ${task.status}">${statusLabel(task.status)}</span>
      </div>
      <div class="task-actions">
        <button class="btn btn-secondary" data-action="view" data-id="${task.id}">View Task</button>
        <button class="btn btn-complete" data-action="complete" data-id="${task.id}" ${task.status === "completed" ? "disabled" : ""}>
          ${task.status === "completed" ? "Completed" : "Mark as Completed"}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ===== Mark task complete =====
function markComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (!task || task.status === "completed") return;
  task.status = "completed";
  saveProgress();
  renderTasks();
  updateProgressUI();
}

// ===== Modal =====
function openModal(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  document.getElementById("modalNum").textContent = `TASK ${task.id}`;
  document.getElementById("modalTitle").textContent = task.title;
  const statusEl = document.getElementById("modalStatus");
  statusEl.textContent = statusLabel(task.status);
  statusEl.className = `status-badge ${task.status}`;
  document.getElementById("modalDesc").textContent = task.description;
  document.getElementById("modalDetail").textContent = task.detail;

  document.getElementById("modalOverlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}

// ===== Filters =====
function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  renderTasks();
}

// ===== Technology Explorer content =====
const techContent = {
  nextjs: {
    meta: "Frontend Framework · React-based",
    title: "Next.js",
    body: "Next.js is a framework built on top of React for building modern web applications. It's commonly used for server-side rendering, static site generation, and building full websites where fast page loads and good SEO matter."
  },
  vuejs: {
    meta: "Frontend Framework · Progressive",
    title: "Vue.js",
    body: "Vue.js is a progressive JavaScript framework for building user interfaces. Developers use it because it's approachable for smaller projects but scales up to complex single-page applications, with a gentle learning curve compared to some alternatives."
  },
  angular: {
    meta: "Frontend Framework · Full Platform",
    title: "Angular",
    body: "Angular is a full-featured frontend framework maintained by Google, built with TypeScript. It's commonly used in larger enterprise applications where structure, built-in tooling, and long-term maintainability are priorities."
  },
  backend: {
    meta: "Server-Side Development",
    title: "Backend Development",
    body: "Backend development handles the server-side of a website — things like databases, authentication, and business logic — and connects to the frontend through APIs that send and receive data. Common backend technologies include Node.js with Express.js, Python's Django or Flask, PHP's Laravel, and Microsoft's .NET. Each one runs on a server, processes requests from the frontend, and sends back the data or responses the interface displays."
  }
};

function renderTechPanel(key) {
  const data = techContent[key];
  const panel = document.getElementById("techPanel");
  panel.innerHTML = `
    <span class="tech-meta">${data.meta}</span>
    <h3>${data.title}</h3>
    <p>${data.body}</p>
    <button class="btn btn-primary" type="button" onclick="alert('${data.title} — explore the official docs to go deeper.')">Learn More</button>
  `;
}

function setTechTab(key) {
  document.querySelectorAll(".tech-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tech === key);
  });
  renderTechPanel(key);
}

// ===== Event wiring =====
document.addEventListener("DOMContentLoaded", () => {
  loadProgress();
  renderTasks();
  updateProgressUI();
  renderTechPanel("nextjs");

  // Task grid: delegated click handling for View / Complete buttons
  document.getElementById("taskGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    if (btn.dataset.action === "view") openModal(id);
    if (btn.dataset.action === "complete") markComplete(id);
  });

  // Filters
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
  });

  // Tech explorer tabs
  document.querySelectorAll(".tech-tab").forEach(btn => {
    btn.addEventListener("click", () => setTechTab(btn.dataset.tech));
  });

  // Modal close
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
