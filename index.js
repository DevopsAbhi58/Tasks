let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (currentFilter === "all") return true;
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
  });

  filtered.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task-item ${task.completed ? "completed" : ""}`;

    taskDiv.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
      <span class="task-text" contenteditable="true" onblur="editTask(${index}, this.innerText)">${task.text}</span>
      <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;

    list.appendChild(taskDiv);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;
  tasks.push({ text, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index, newText) {
  tasks[index].text = newText.trim();
  saveTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

renderTasks();
