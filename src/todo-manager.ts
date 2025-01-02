import { Todo } from './todo';

export class TodoManager {
  private todos: Todo[] = [];
  private currentId: number;

  load(): void {
    const savedTodos = JSON.parse(localStorage.getItem('todo'));
    const savedCurrentId = localStorage.getItem('currentId');
    this.todos = savedTodos ? savedTodos : [];
    this.currentId = savedCurrentId ? Number(savedCurrentId) : 0;
  }

  create(title: string): Todo {
    const newId = this.currentId + 1;
    const todo = new Todo(newId, title);
    this.todos.unshift(todo);
    localStorage.setItem('todo', JSON.stringify(this.todos));
    localStorage.setItem('currentId', String(newId));
    return todo;
  }

  delete(id: number): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }

  clear(): void {
    this.todos = [];
    localStorage.clear();
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

  list(table: HTMLTableElement): void {
    let html =
      '<thead>' +
      '<th>title</th>' +
      '<th>completed</th>' +
      '<th>createdAt</th>' +
      '</thead>' +
      '<tbody>';
    for (let todo of this.todos) {
      html +=
        '<tr>' +
        `<td>${todo.title}</td>` +
        `<td>${todo.completed}</td>` +
        `<td>${todo.createdAt.toLocaleString()}</td>` +
        '</tr>';
    }
    html += '</tbody>';
    table.innerHTML = html;
  }
}
