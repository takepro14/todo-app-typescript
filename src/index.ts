import { TaskManager } from './task-manager';

const taskManager = new TaskManager();

console.log('TODOリストアプリが起動しました！');

// タスク作成
const task1 = taskManager.createTask('初めてのタスク');
const task2 = taskManager.createTask('TypeScriptの学習');

console.log('タスクが作成されました:');
console.log(taskManager.getTasks());

// タスク削除
const deleteSuccess = taskManager.deleteTask(task1.id);
console.log(
  deleteSuccess ? 'タスクを削除しました:' : 'タスクが見つかりません:',
);
