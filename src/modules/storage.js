import Project from "./project.js";
import Todo from "./todo.js";

export default class Storage {
  static saveProjects(projects) {
    localStorage.setItem("notedProjects", JSON.stringify(projects));
  }

  static getProjects() {
    const projects = localStorage.getItem("notedProjects");
    return projects ? JSON.parse(projects) : null;
  }

  static loadProjects() {
    const projectsData = this.getProjects();
    if (!projectsData) return null;

    // Reconstruct projects and todos with their methods
    return projectsData.map((projectData) => {
      const project = new Project(projectData.name, projectData.id);
      project.todos = projectData.todos.map((todoData) => {
        const todo = new Todo(
          todoData.title,
          todoData.description,
          todoData.dueDate,
          todoData.priority,
          todoData.projectId,
          todoData.completed,
          todoData.id
        );
        todo.createdAt = new Date(todoData.createdAt);
        return todo;
      });
      project.createdAt = new Date(projectData.createdAt);
      return project;
    });
  }

  static initializeDefaultProjects() {
    const defaultProject = new Project("Inbox");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Add sample todo
    const sampleTodo = new Todo(
      "Welcome to Noted po!",
      "This is your first task. Click to edit or mark as complete.",
      today.toISOString().split("T")[0],
      "medium",
      defaultProject.id
    );

    defaultProject.addTodo(sampleTodo);
    return [defaultProject];
  }
}
