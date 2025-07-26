let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


const hideCompletedCheckbox = document.getElementById("hideCompletedCheckbox");
const taskList = document.getElementById("taskList");

if (hideCompletedCheckbox) {
  hideCompletedCheckbox.addEventListener("change", renderTasks);
}

function generateToken() {
  return 'TKN' + Math.floor(1000 + Math.random() * 9000);
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const newTask = {
    id: Date.now(),
    token: generateToken(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const hideCompleted = hideCompletedCheckbox?.checked;

  const filtered = tasks.filter(task => {
    if (hideCompleted && task.completed) return false;
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filtered.forEach(task => {
    const taskItem = document.createElement("div");
    taskItem.className = `list-group-item d-flex justify-content-between align-items-center ${
      task.completed ? "list-group-item-success" : ""
    }`;

    taskItem.innerHTML = `
      <div>
        <input type="checkbox" class="form-check-input me-2" onchange="toggleTask(${task.id})" ${
      task.completed ? "checked" : ""
    }>
        <span contenteditable="true" onblur="editTask(${task.id}, this.innerText)">${task.text}</span><br/>
        <small class="text-muted">Token: ${task.token}</small>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-info" onclick="trackByToken('${task.token}')">Track</button>
        <button class="btn btn-sm btn-danger ms-2" onclick="deleteTask(${task.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    taskList.appendChild(taskItem);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function editTask(id, newText) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, text: newText.trim() } : task
  );
  saveTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

function trackTask() {
  const tokenInput = document.getElementById("trackTokenInput").value.trim().toUpperCase();
  trackByToken(tokenInput);
  document.getElementById("trackTokenInput").value = "";
}

function trackByToken(token) {
  const task = tasks.find(t => t.token === token);
  if (task) {
    alert(`🔍 Task Found:\n\n📝 ${task.text}\n📌 Status: ${task.completed ? "✅ Completed" : "⏳ Pending"}`);
  } else {
    alert("❌ No task found with this Token ID.");
  }
}


renderTasks();
