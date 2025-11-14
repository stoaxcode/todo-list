import Project from "./project.js";
import Todo from "./todo.js";
import Storage from "./storage.js";
import DOM from "./dom.js";

export default class App {
  constructor() {
    this.projects = this.loadProjects();
    this.currentProjectId = this.projects[0]?.id || null;
    this.init();
  }

  loadProjects() {
    let projects = Storage.loadProjects();
    if (!projects || projects.length === 0) {
      projects = Storage.initializeDefaultProjects();
      Storage.saveProjects(projects);
    }
    return projects;
  }

  init() {
    DOM.init();
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    document.addEventListener("projectSave", (e) =>
      this.handleProjectSave(e.detail)
    );
    document.addEventListener("todoSave", (e) => this.handleTodoSave(e.detail));
  }

  handleProjectSave({ id, name }) {
    if (id) {
      // Edit existing project
      const project = this.getProject(id);
      if (project) {
        project.name = name;
      }
    } else {
      // Create new project
      const newProject = new Project(name);
      this.projects.push(newProject);
      this.currentProjectId = newProject.id;
    }

    this.saveAndRender();
  }

  handleTodoSave({ id, title, description, dueDate, priority }) {
    const currentProject = this.getCurrentProject();
    if (!currentProject) return;

    if (id) {
      // Edit existing todo
      const todo = currentProject.getTodo(id);
      if (todo) {
        todo.updateDetails({ title, description, dueDate, priority });
      }
    } else {
      // Create new todo
      const newTodo = new Todo(
        title,
        description,
        dueDate,
        priority,
        currentProject.id
      );
      currentProject.addTodo(newTodo);
    }

    this.saveAndRender();
  }

  getProject(projectId) {
    return this.projects.find((project) => project.id === projectId);
  }

  getCurrentProject() {
    return this.getProject(this.currentProjectId);
  }

  switchProject(projectId) {
    this.currentProjectId = projectId;
    this.render();
  }

  deleteProject(projectId) {
    if (this.projects.length <= 1) {
      alert("You must have at least one project!");
      return;
    }

    this.projects = this.projects.filter((project) => project.id !== projectId);

    if (this.currentProjectId === projectId) {
      this.currentProjectId = this.projects[0].id;
    }

    this.saveAndRender();
  }

  toggleTodoComplete(todoId) {
    const project = this.getCurrentProject();
    const todo = project.getTodo(todoId);
    if (todo) {
      todo.toggleComplete();
      this.saveAndRender();
    }
  }

  deleteTodo(todoId) {
    const project = this.getCurrentProject();
    project.removeTodo(todoId);
    this.saveAndRender();
  }

  editTodo(todo) {
    DOM.showTodoModal(todo);
  }

  saveAndRender() {
    Storage.saveProjects(this.projects);
    this.render();
  }

  render() {
    const currentProject = this.getCurrentProject();
    DOM.renderProjects(
      this.projects,
      this.currentProjectId,
      (projectId) => this.switchProject(projectId),
      (projectId) => this.deleteProject(projectId)
    );

    if (currentProject) {
      DOM.renderTodos(
        currentProject,
        (todoId) => this.toggleTodoComplete(todoId),
        (todoId) => this.deleteTodo(todoId),
        (todo) => this.editTodo(todo)
      );
    }
  }
}
