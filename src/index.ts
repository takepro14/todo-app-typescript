import { TodoManager } from './todo-manager';

let table: HTMLTableElement;
let message: HTMLInputElement;

const manager = new TodoManager();

function createTodo() {
  manager.create(message.value);
  manager.load();
  manager.list(table);
}

function clearTodo() {
  manager.clear();
  manager.load();
  manager.list(table);
}

window.addEventListener('load', () => {
  table = document.querySelector('#table');
  message = document.querySelector('#message');
  document.querySelector('#add').addEventListener('click', createTodo);
  document.querySelector('#clear').addEventListener('click', clearTodo);
  manager.load();
  manager.list(table);
});
