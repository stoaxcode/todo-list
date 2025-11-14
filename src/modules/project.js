export default class Project {
  constructor(name, id = null) {
    this.id = id || Date.now().toString();
    this.name = name;
    this.todos = [];
    this.createdAt = new Date();
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  getTodo(todoId) {
    return this.todos.find((todo) => todo.id === todoId);
  }

  getTodos() {
    return this.todos;
  }

  getCompletedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  getPendingTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }
}
