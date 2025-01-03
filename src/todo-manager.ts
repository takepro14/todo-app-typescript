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

  edit(id: number): void {
    const index = this.todos.findIndex((t) => t.id === id);
    const newTitle = prompt('Edit TODO title:', this.todos[index].title);
    if (newTitle !== null && newTitle.trim() !== '') {
      this.todos[index].title = newTitle.trim();
      localStorage.setItem('todo', JSON.stringify(this.todos));
      this.load();
      this.list(document.querySelector('#table'));
      alert('TODO updated successfully!');
    }
  }

  list(table: HTMLTableElement): void {
    let html =
      '<thead>' +
      '<th>title</th>' +
      '<th>completed</th>' +
      '<th>createdAt</th>' +
      '<th></th>' +
      '</thead>' +
      '<tbody>';
    for (let todo of this.todos) {
      html +=
        '<tr>' +
        `<td>${todo.title}</td>` +
        `<td>${todo.completed}</td>` +
        `<td>${todo.createdAt.toLocaleString()}</td>` +
        `<td><button class="edit-btn btn btn-light" data-id="${todo.id}">Edit</button></td>` +
        '</tr>';
    }
    html += '</tbody>';
    table.innerHTML = html;

    document.querySelectorAll('.edit-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const id = target.dataset.id;
        if (id) {
          this.edit(Number(id));
        }
      });
    });
  }
}
