import { TodoManager } from './todo-manager';

let table: HTMLTableElement;
let message: HTMLInputElement;

const manager = new TodoManager();

function loadTodo() {
  manager.load();
  manager.list(table);
}

function createTodo() {
  manager.create(message.value);
  loadTodo();
}

function clearTodo() {
  manager.clear();
  loadTodo();
}

window.addEventListener('load', () => {
  table = document.querySelector('#table');
  message = document.querySelector('#message');
  document.querySelector('#add').addEventListener('click', createTodo);
  document.querySelector('#clear').addEventListener('click', clearTodo);
  loadTodo();
});
