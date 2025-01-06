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
    const confirmed = confirm('Are you sure you want to delete this TODO?');
    if (confirmed) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      if (index === -1) return false;
      this.todos.splice(index, 1);
      localStorage.setItem('todo', JSON.stringify(this.todos));
      this.load();
      this.list(document.querySelector('#table'));
      return true;
    }
  }

  clear(): void {
    this.todos = [];
    localStorage.clear();
  }

  complete(id: number): boolean {
    const index = this.todos.findIndex((t) => t.id === id);
    this.todos[index].completed = !this.todos[index].completed;
    localStorage.setItem('todo', JSON.stringify(this.todos));
    this.load();
    this.list(document.querySelector('#table'));
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
    }
  }

  list(table: HTMLTableElement): void {
    let html =
      '<thead>' +
      '<th>title</th>' +
      '<th>completed</th>' +
      '<th></th>' +
      '<th></th>' +
      '</thead>' +
      '<tbody>';
    for (let todo of this.todos) {
      html +=
        '<tr>' +
        `<td>${todo.title}</td>` +
        `<td><input class="js-check form-check-input" type="checkbox" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}></button></td>` +
        `<td><button class="js-edit btn btn-light" data-id="${todo.id}">Edit</button></td>` +
        `<td><button class="js-delete btn btn-warning" data-id="${todo.id}">Delete</button></td>` +
        '</tr>';
    }

    html += '</tbody>';
    table.innerHTML = html;

    document.querySelectorAll('.js-delete').forEach((button) => {
      button.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const id = target.dataset.id;
        if (id) {
          this.delete(Number(id));
        }
      });
    });

    document.querySelectorAll('.js-edit').forEach((button) => {
      button.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const id = target.dataset.id;
        if (id) {
          this.edit(Number(id));
        }
      });
    });

    document.querySelectorAll('.js-check').forEach((checkbox) => {
      checkbox.addEventListener('change', (event) => {
        const target = event.target as HTMLElement;
        const id = target.dataset.id;
        if (id) {
          this.complete(Number(id));
        }
      });
    });
  }
}
