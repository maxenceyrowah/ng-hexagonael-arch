import { Observable } from 'rxjs';

import { Task } from '../models/task.model';

export abstract class TaskGateway {
  abstract retrieveAll(): Observable<Task[]>;
  abstract add(taskName: string): Observable<Task>;
  abstract markAsComplete(taskId: string): Observable<Task>;
  abstract markAsUnComplete(taskId: string): Observable<Task>;
  abstract remove(taskId: string): Observable<void>;
}
