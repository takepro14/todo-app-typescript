export class Todo {
  public readonly id: number;
  public title: string;
  public completed: boolean;
  public readonly createdAt: Date;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.completed = false;
    this.createdAt = new Date();
  }

  toggleComplete(): void {
    this.completed = !this.completed;
  }
}
