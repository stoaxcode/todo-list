import Todo from "./todo.js";

export default class DOM {
  static init() {
    this.bindProjectEvents();
    this.bindTodoEvents();
    this.bindModalEvents();
  }

  static bindProjectEvents() {
    document
      .getElementById("new-project-btn")
      .addEventListener("click", () => this.showProjectModal());
    document
      .getElementById("project-form")
      .addEventListener("submit", (e) => this.handleProjectSubmit(e));
    document
      .getElementById("cancel-project")
      .addEventListener("click", () => this.hideProjectModal());
  }

  static bindTodoEvents() {
    document
      .getElementById("new-todo-btn")
      .addEventListener("click", () => this.showTodoModal());
    document
      .getElementById("todo-form")
      .addEventListener("submit", (e) => this.handleTodoSubmit(e));
    document
      .getElementById("cancel-todo")
      .addEventListener("click", () => this.hideTodoModal());
  }

  static bindModalEvents() {
    // Close modals when clicking X
    document.querySelectorAll(".close").forEach((closeBtn) => {
      closeBtn.addEventListener("click", (e) => {
        e.target.closest(".modal").style.display = "none";
      });
    });

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
      }
    });
  }

  static renderProjects(
    projects,
    currentProjectId,
    onProjectSelect,
    onProjectDelete
  ) {
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = "";

    projects.forEach((project) => {
      const projectElement = document.createElement("div");
      projectElement.className = `project-item ${
        project.id === currentProjectId ? "active" : ""
      }`;
      projectElement.innerHTML = `
                <span class="project-name">${project.name}</span>
                <span class="project-count">${
                  project.getPendingTodos().length
                }</span>
                <button class="btn-delete-project" data-project-id="${
                  project.id
                }">×</button>
            `;

      projectElement.addEventListener("click", () =>
        onProjectSelect(project.id)
      );

      const deleteBtn = projectElement.querySelector(".btn-delete-project");
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        onProjectDelete(project.id);
      });

      projectsList.appendChild(projectElement);
    });
  }

  static renderTodos(project, onTodoToggle, onTodoDelete, onTodoEdit) {
    const container = document.getElementById("todos-container");
    const titleElement = document.getElementById("current-project-title");

    titleElement.textContent = project.name;
    container.innerHTML = "";

    if (project.todos.length === 0) {
      container.innerHTML =
        '<p class="empty-state">No tasks yet. Add your first task!</p>';
      return;
    }

    project.todos.forEach((todo) => {
      const todoElement = document.createElement("div");
      todoElement.className = `todo-item ${
        todo.completed ? "completed" : ""
      } ${todo.getPriorityClass()} ${todo.isOverdue() ? "overdue" : ""}`;
      todoElement.innerHTML = `
                <div class="todo-checkbox">
                    <input type="checkbox" ${
                      todo.completed ? "checked" : ""
                    } data-todo-id="${todo.id}">
                </div>
                <div class="todo-content">
                    <h3 class="todo-title">${todo.title}</h3>
                    <p class="todo-description">${todo.description}</p>
                    <div class="todo-meta">
                        <span class="todo-due-date">${todo.getFormattedDueDate()}</span>
                        <span class="todo-priority ${todo.priority}">${
        todo.priority
      }</span>
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="btn-edit" data-todo-id="${
                      todo.id
                    }">Edit</button>
                    <button class="btn-delete" data-todo-id="${
                      todo.id
                    }">Delete</button>
                </div>
            `;

      // Bind events
      const checkbox = todoElement.querySelector('input[type="checkbox"]');
      checkbox.addEventListener("change", () => onTodoToggle(todo.id));

      const editBtn = todoElement.querySelector(".btn-edit");
      editBtn.addEventListener("click", () => onTodoEdit(todo));

      const deleteBtn = todoElement.querySelector(".btn-delete");
      deleteBtn.addEventListener("click", () => onTodoDelete(todo.id));

      container.appendChild(todoElement);
    });
  }

  static showProjectModal(project = null) {
    const modal = document.getElementById("project-modal");
    const title = document.getElementById("project-modal-title");
    const form = document.getElementById("project-form");
    const input = document.getElementById("project-name");

    if (project) {
      title.textContent = "Edit Project";
      input.value = project.name;
      form.dataset.editId = project.id;
    } else {
      title.textContent = "New Project";
      input.value = "";
      delete form.dataset.editId;
    }

    modal.style.display = "block";
    input.focus();
  }

  static showTodoModal(todo = null, currentProjectId = null) {
    const modal = document.getElementById("todo-modal");
    const title = document.getElementById("todo-modal-title");
    const form = document.getElementById("todo-form");

    if (todo) {
      title.textContent = "Edit Task";
      document.getElementById("todo-title").value = todo.title;
      document.getElementById("todo-description").value = todo.description;
      document.getElementById("todo-dueDate").value = todo.dueDate;
      document.getElementById("todo-priority").value = todo.priority;
      form.dataset.editId = todo.id;
    } else {
      title.textContent = "New Task";
      document.getElementById("todo-title").value = "";
      document.getElementById("todo-description").value = "";
      document.getElementById("todo-dueDate").value = "";
      document.getElementById("todo-priority").value = "medium";
      delete form.dataset.editId;
    }

    modal.style.display = "block";
    document.getElementById("todo-title").focus();
  }

  static hideProjectModal() {
    document.getElementById("project-modal").style.display = "none";
  }

  static hideTodoModal() {
    document.getElementById("todo-modal").style.display = "none";
  }

  static handleProjectSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = document.getElementById("project-name").value.trim();
    const editId = form.dataset.editId;

    if (name) {
      const event = new CustomEvent("projectSave", {
        detail: { id: editId, name },
      });
      document.dispatchEvent(event);
      this.hideProjectModal();
    }
  }

  static handleTodoSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const title = document.getElementById("todo-title").value.trim();
    const description = document
      .getElementById("todo-description")
      .value.trim();
    const dueDate = document.getElementById("todo-dueDate").value;
    const priority = document.getElementById("todo-priority").value;
    const editId = form.dataset.editId;

    if (title && dueDate) {
      const event = new CustomEvent("todoSave", {
        detail: {
          id: editId,
          title,
          description,
          dueDate,
          priority,
        },
      });
      document.dispatchEvent(event);
      this.hideTodoModal();
    }
  }
}
