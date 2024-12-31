import { TodoManager } from './todo-manager';

let table: HTMLTableElement;
let message: HTMLInputElement;

const manager = new TodoManager();

window.addEventListener('load', () => {
  table = document.querySelector('#table');
  message = document.querySelector('#message');
  document.querySelector('#add').addEventListener('click', () => {
    manager.create(message.value);
  });
});
