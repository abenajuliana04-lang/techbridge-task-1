// TechBridge Dashboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    // --- Sample Dashboard Data ---
    const dashboardData = {
        totalDays: 30,
        currentDay: 6,
        userXP: 1200,
        streakDays: 6,
        level: "02 Explorer",
        tasks: [
            {
                id: 1,
                title: "Build the TechBridge Intern Dashboard",
                category: "HTML5 · CSS3 · JAVASCRIPT",
                duration: "4–6 HOURS",
                difficulty: "INTERMEDIATE",
                completed: false
            },
            {
                id: 2,
                title: "Responsive Navigation & Mobile Drawer",
                category: "CSS GRID · FLEXBOX",
                duration: "2 HOURS",
                difficulty: "BEGINNER",
                completed: true
            },
            {
                id: 3,
                title: "Local Storage Data Persistence",
                category: "JAVASCRIPT ES6",
                duration: "3 HOURS",
                difficulty: "INTERMEDIATE",
                completed: false
            }
        ]
    };

    // --- State Management ---
    // Load saved tasks state from localStorage if available
    let savedTasks = JSON.parse(localStorage.getItem('techbridge_tasks'));
    if (savedTasks) {
        dashboardData.tasks = savedTasks;
    }

    // --- Core Functions ---

    /**
     * Updates progress bar percentage based on completed tasks or day progress
     */
    function updateProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');

        if (!progressBar || !progressText) return;

        const totalTasks = dashboardData.tasks.length;
        const completedTasks = dashboardData.tasks.filter(t => t.completed).length;
        const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% Completed`;
    }

    /**
     * Renders task list into the DOM dynamically
     */
    function renderTasks() {
        const taskContainer = document.getElementById('task-list');
        if (!taskContainer) return;

        taskContainer.innerHTML = '';

        dashboardData.tasks.forEach(task => {
            const taskCard = document.createElement('article');
            taskCard.className = `card task-card ${task.completed ? 'completed' : ''}`;
            
            taskCard.innerHTML = `
                <div class="task-header">
                    <span class="badge">${task.completed ? 'COMPLETED' : 'CURRENT OBJECTIVE'}</span>
                    <button class="btn-toggle" data-id="${task.id}">
                        ${task.completed ? '✓ Done' : 'Mark Complete'}
                    </button>
                </div>
                <h2>${task.title}</h2>
                <p class="tech-stack">${task.category}</p>
                <div class="meta-info">
                    <span>⏱ ${task.duration}</span>
                    <span>⚡ ${task.difficulty}</span>
                </div>
            `;

            taskContainer.appendChild(taskCard);
        });

        // Add event listeners to completion buttons
        document.querySelectorAll('.btn-toggle').forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = parseInt(e.target.getAttribute('data-id'), 10);
                toggleTaskCompletion(taskId);
            });
        });
    }

    /**
     * Toggles a task's completion state and updates local storage
     */
    function toggleTaskCompletion(taskId) {
        dashboardData.tasks = dashboardData.tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        // Save updated state
        localStorage.setItem('techbridge_tasks', JSON.stringify(dashboardData.tasks));

        // Re-render dashboard UI
        renderTasks();
        updateProgressBar();
    }

    /**
     * Populates static user metadata on the page
     */
    function renderUserStats() {
        const statsList = document.querySelector('.stats-list');
        if (!statsList) return;

        statsList.innerHTML = `
            <li><strong>Level:</strong> ${dashboardData.level}</li>
            <li><strong>XP Gained:</strong> ${dashboardData.userXP.toLocaleString()} XP</li>
            <li><strong>Current Streak:</strong> ${dashboardData.streakDays} Days 🔥</li>
        `;
    }

    // --- Initial Run ---
    renderTasks();
    renderUserStats();
    updateProgressBar();
});