import { format, isToday, isTomorrow, isThisWeek, parseISO } from "date-fns";

export default class Todo {
  constructor(
    title,
    description,
    dueDate,
    priority,
    projectId,
    completed = false,
    id = null
  ) {
    this.id = id || Date.now().toString();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
    this.completed = completed;
    this.createdAt = new Date();
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  updateDetails(newDetails) {
    Object.assign(this, newDetails);
  }

  getFormattedDueDate() {
    try {
      const date = parseISO(this.dueDate);
      if (isToday(date)) return "Today";
      if (isTomorrow(date)) return "Tomorrow";
      if (isThisWeek(date)) return format(date, "EEEE");
      return format(date, "MMM dd, yyyy");
    } catch (error) {
      return this.dueDate;
    }
  }

  getPriorityClass() {
    return `priority-${this.priority}`;
  }

  isOverdue() {
    try {
      return new Date(this.dueDate) < new Date() && !this.completed;
    } catch (error) {
      return false;
    }
  }
}
