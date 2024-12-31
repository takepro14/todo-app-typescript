import { Todo } from './todo';

export class TodoManager {
  private todos: Todo[] = [];
  private currentId = 0;

  private generateId(): number {
    return ++this.currentId;
  }

  create(title: string): Todo {
    const todo = new Todo(this.generateId(), title);
    localStorage.setItem(`todo-${this.currentId}`, JSON.stringify(todo));
    this.todos.push(todo);
    return todo;
  }

  delete(id: number): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }

  find(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  toggleComplete(id: number): boolean {
    const todo = this.find(id);
    if (!todo) return false;
    todo.toggleComplete();
    return true;
  }

  list(): Todo[] {
    return this.todos;
  }
}
