import { EMPTY, Observable, of } from 'rxjs';

import { Task } from '../models/task.model';
import { TaskGateway } from '../ports/task.gatway';

export class InMemoryTaskGateway extends TaskGateway {
  private tasks: Task[] = [];

  withTasks(tasks: Task[]): InMemoryTaskGateway {
    this.tasks = tasks;
    return this;
  }

  retrieveAll(): Observable<Task[]> {
    return of(this.tasks);
  }

  add(taskName: string): Observable<Task> {
    const task = { id: `id-${taskName}`, name: taskName, completed: false };
    this.tasks = [...this.tasks, task];
    return of(task);
  }

  markAsComplete(taskId: string): Observable<Task> {
    const task = this.tasks.find((task) => task.id === taskId)!;
    task.completed = true;
    return of(task);
  }

  markAsUnComplete(taskId: string): Observable<Task> {
    const task = this.tasks.find((task) => task.id === taskId)!;
    task.completed = false;
    return of(task);
  }

  remove(taskId: string): Observable<void> {
    this.tasks = this.tasks.filter((task) => task.id != taskId);
    return of(undefined);
  }
}
