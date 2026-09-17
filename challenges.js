/* ============================================================
   TECHBRIDGE — CHALLENGE HUB
   Data, filtering, search and detail-panel logic
   ============================================================ */

const CHALLENGES = [
  {
    id: "sales-snapshot",
    track: "data",
    trackLabel: "Data Analytics",
    difficulty: "beginner",
    name: "Retail Sales Snapshot",
    desc: "Dig into a small retail dataset and figure out what actually sold, when, and to whom.",
    outcome: "A one-page summary highlighting your top 3 sales insights.",
    objective: "Explore a month of retail transactions to uncover which products, days, and categories drove the most revenue.",
    skills: "Spreadsheet basics, filtering and sorting, simple formulas (SUM, AVERAGE, COUNTIF).",
    tools: "Excel or Google Sheets.",
    produce: "A short summary sheet with three key findings and one supporting chart.",
    result: "You can look at raw transaction data and confidently pull out a story.",
    time: "3–4 hrs"
  },
  {
    id: "feedback-breakdown",
    track: "data",
    trackLabel: "Data Analytics",
    difficulty: "beginner",
    name: "Customer Feedback Breakdown",
    desc: "Sort a batch of customer comments into themes and see what people are actually praising or complaining about.",
    outcome: "A categorized breakdown showing the top 3 recurring themes in customer feedback.",
    objective: "Read through customer feedback entries, tag each one by theme and sentiment, then summarize the patterns you find.",
    skills: "Data categorization, basic sentiment tagging, simple charting.",
    tools: "Excel, Google Sheets, or Airtable.",
    produce: "A tagged dataset plus a bar chart showing how often each theme appears.",
    result: "You've turned messy text feedback into a structured, decision-ready summary.",
    time: "3 hrs"
  },
  {
    id: "expense-dashboard",
    track: "data",
    trackLabel: "Data Analytics",
    difficulty: "intermediate",
    name: "Monthly Expense Tracker Dashboard",
    desc: "Take a raw list of company expenses and turn it into a dashboard leadership could actually use.",
    outcome: "An interactive dashboard showing spend by category, month, and department.",
    objective: "Clean an expense dataset, group it by category and department, and build a dashboard that surfaces spending trends.",
    skills: "Data cleaning, pivot tables, dashboard design.",
    tools: "Excel or Google Sheets (pivot tables and charts), or Looker Studio.",
    produce: "A dashboard with at least three visualizations and one clear recommendation.",
    result: "You can go from messy raw data to a dashboard someone outside the data team can actually read.",
    time: "5–6 hrs"
  },
  {
    id: "churn-signals",
    track: "data",
    trackLabel: "Data Analytics",
    difficulty: "advanced",
    name: "Customer Churn Signals",
    desc: "Look at usage patterns to spot which customers are quietly on their way out the door.",
    outcome: "A ranked list of at-risk customers with a churn rate calculation and retention recommendations.",
    objective: "Analyze customer usage history to identify drop-off patterns, calculate an overall churn rate, and flag high-risk accounts.",
    skills: "Data analysis, basic statistics, cohort thinking.",
    tools: "Excel/Sheets, or Python with pandas if you're comfortable with it.",
    produce: "A churn rate calculation, a risk-ranked customer list, and two to three retention recommendations.",
    result: "You can turn behavioral data into an early-warning signal a business could actually act on.",
    time: "6–8 hrs"
  },
  {
    id: "landing-page",
    track: "web",
    trackLabel: "Web Development",
    difficulty: "beginner",
    name: "Responsive Landing Page",
    desc: "Design and build a landing page for a fictional product, from hero section to call-to-action.",
    outcome: "A single-page site that looks good on a phone, tablet, and desktop.",
    objective: "Build a marketing landing page for a made-up product, including a hero section, a features section, and a call-to-action.",
    skills: "HTML structure, CSS layout with flexbox or grid, responsive design.",
    tools: "HTML and CSS.",
    produce: "One responsive page that adapts cleanly across screen sizes.",
    result: "You can turn a design idea into a page that holds up on any device.",
    time: "3–4 hrs"
  },
  {
    id: "portfolio-site",
    track: "web",
    trackLabel: "Web Development",
    difficulty: "beginner",
    name: "Personal Portfolio Site",
    desc: "Build a personal portfolio with an about section, project highlights, and a way to get in touch.",
    outcome: "A working portfolio site you could genuinely link to a recruiter.",
    objective: "Create a personal portfolio page featuring an introduction, a projects section, and contact details.",
    skills: "HTML semantics, CSS styling, basic layout composition.",
    tools: "HTML and CSS.",
    produce: "A multi-section personal site — a single page is completely fine.",
    result: "You'll have a real, presentable portfolio you can keep improving after this task.",
    time: "4 hrs"
  },
  {
    id: "contact-form",
    track: "web",
    trackLabel: "Web Development",
    difficulty: "intermediate",
    name: "Interactive Contact Form",
    desc: "Build a contact form that checks itself as people type, with no page reload required.",
    outcome: "A form that validates input live and shows a confirmation message without refreshing.",
    objective: "Build a contact form with real-time validation for required fields and email format, plus an inline success message on submit.",
    skills: "Form handling, JavaScript event listeners, basic validation logic.",
    tools: "HTML, CSS, and JavaScript.",
    produce: "A validated form with a script handling all of the interaction.",
    result: "You understand how to catch a user's mistakes early instead of after they submit.",
    time: "4–5 hrs"
  },
  {
    id: "product-showcase",
    track: "web",
    trackLabel: "Web Development",
    difficulty: "advanced",
    name: "Dynamic Product Showcase",
    desc: "Build a product grid people can filter, sort, and interact with, similar to a small online store.",
    outcome: "A product page with working filters, sorting, and an add-to-cart style interaction.",
    objective: "Build a product listing page where users can filter by category, sort by price, and add items to a running cart total.",
    skills: "DOM manipulation, array methods like filter, sort and map, basic state management.",
    tools: "HTML, CSS, and JavaScript.",
    produce: "A product grid with functioning filters, sorting, and cart interaction.",
    result: "You can build a page that responds fluidly to several kinds of user input at once.",
    time: "6–8 hrs"
  }
];

const DIFF_LABEL = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };

const state = { track: "all", difficulty: "all", search: "" };

const grid = document.getElementById("cardGrid");
const emptyState = document.getElementById("emptyState");
const resultsMeta = document.getElementById("resultsMeta");

function renderCards() {
  const filtered = CHALLENGES.filter((c) => {
    const matchesTrack = state.track === "all" || c.track === state.track;
    const matchesDiff = state.difficulty === "all" || c.difficulty === state.difficulty;
    const matchesSearch =
      state.search === "" || c.name.toLowerCase().includes(state.search.toLowerCase());
    return matchesTrack && matchesDiff && matchesSearch;
  });

  resultsMeta.textContent = `Showing ${filtered.length} of ${CHALLENGES.length} challenges`;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.add("show");
    return;
  }
  emptyState.classList.remove("show");

  grid.innerHTML = filtered
    .map(
      (c) => `
    <article class="hub-card" data-track="${c.track}">
      <div class="hub-card-top">
        <span class="track-badge ${c.track}">${c.trackLabel}</span>
        <span class="diff-chip">${DIFF_LABEL[c.difficulty]}</span>
      </div>
      <h3>${c.name}</h3>
      <p class="hub-desc">${c.desc}</p>
      <p class="hub-outcome"><b>By the end:</b> ${c.outcome}</p>
      <button class="hub-view-btn" data-id="${c.id}">
        View challenge
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.4"/></svg>
      </button>
    </article>
  `
    )
    .join("");

  grid.querySelectorAll(".hub-view-btn").forEach((btn) => {
    btn.addEventListener("click", () => openPanel(btn.dataset.id));
  });
}

/* ---------- filters ---------- */
document.getElementById("trackFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  state.track = btn.dataset.track;
  document
    .querySelectorAll("#trackFilters .filter-btn")
    .forEach((p) => p.setAttribute("aria-pressed", p === btn ? "true" : "false"));
  renderCards();
});

document.getElementById("diffFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  state.difficulty = btn.dataset.diff;
  document
    .querySelectorAll("#diffFilters .filter-btn")
    .forEach((p) => p.setAttribute("aria-pressed", p === btn ? "true" : "false"));
  renderCards();
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  state.search = e.target.value;
  renderCards();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  state.track = "all";
  state.difficulty = "all";
  state.search = "";
  document.getElementById("searchInput").value = "";
  document
    .querySelectorAll("#trackFilters .filter-btn")
    .forEach((p) => p.setAttribute("aria-pressed", p.dataset.track === "all" ? "true" : "false"));
  document
    .querySelectorAll("#diffFilters .filter-btn")
    .forEach((p) => p.setAttribute("aria-pressed", p.dataset.diff === "all" ? "true" : "false"));
  renderCards();
});

/* ---------- detail panel ---------- */
const overlay = document.getElementById("overlay");
const panel = document.getElementById("panel");
let lastFocused = null;

function openPanel(id) {
  const c = CHALLENGES.find((ch) => ch.id === id);
  if (!c) return;

  document.getElementById("panelBadge").textContent = c.trackLabel;
  document.getElementById("panelBadge").className = `track-badge ${c.track}`;
  document.getElementById("panelTitle").textContent = c.name;
  document.getElementById("panelDifficulty").textContent = DIFF_LABEL[c.difficulty];
  document.getElementById("panelObjective").textContent = c.objective;
  document.getElementById("panelSkills").textContent = c.skills;
  document.getElementById("panelTools").textContent = c.tools;
  document.getElementById("panelProduce").textContent = c.produce;
  document.getElementById("panelResult").textContent = c.result;
  document.getElementById("panelTime").textContent = c.time;
  document.getElementById("panelTrackLabel").textContent = c.trackLabel;

  lastFocused = document.activeElement;
  overlay.classList.add("show");
  panel.classList.add("show");
  document.body.style.overflow = "hidden";
  document.getElementById("panelClose").focus();
}

function closePanel() {
  overlay.classList.remove("show");
  panel.classList.remove("show");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

document.getElementById("panelClose").addEventListener("click", closePanel);
overlay.addEventListener("click", closePanel);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && panel.classList.contains("show")) closePanel();
});

/* ---------- init ---------- */
document.getElementById("statTotal").textContent = CHALLENGES.length;
renderCards();
