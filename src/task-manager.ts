import { Task } from './task';

export class TaskManager {
  private tasks: Task[] = [];
  private nextId: number = 1;

  createTask(title: string): Task {
    const newTask: Task = {
      id: this.nextId++,
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  deleteTask(id: number): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks.length < initialLength;
  }
}
