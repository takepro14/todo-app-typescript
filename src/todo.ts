export class Todo {
  public readonly id: number;
  public title: string;
  public completed: boolean;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.completed = false;
  }

  toggleComplete(): void {
    this.completed = !this.completed;
  }
}
