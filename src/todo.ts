export class Todo {
  public readonly id: number;
  public title: string;
  public isCompleted: boolean;
  public readonly createdAt: Date;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.isCompleted = false;
    this.createdAt = new Date();
  }

  toggleComplete(): void {
    this.isCompleted = !this.isCompleted;
  }
}
