import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

import { TaskGateway } from '../../core/ports/task.gatway';
import { FormsModule } from '@angular/forms';
import { Task } from 'src/app/core/models/task.model';
import { AddTaskFormComponent } from './components/add-task-form.component';
import { CheckListItemComponent } from './components/check-list-item.component';

@Component({
  selector: 'app-check-list',
  standalone: true,
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    AddTaskFormComponent,
    CheckListItemComponent,
  ],
})
export class CheckListComponent {
  taskGateway = inject(TaskGateway);
  reload$ = new BehaviorSubject<void>(undefined);
  tasks = toSignal(
    this.reload$.pipe(switchMap(() => this.taskGateway.retrieveAll()))
  );

  addTask(taskName: string) {
    if (!taskName) return;

    this.taskGateway
      .add(taskName)
      .pipe(tap(() => this.reload$.next()))
      .subscribe();
  }
  toggle(task: Task) {
    const toggle$ = task.completed
      ? this.taskGateway.markAsUnComplete(task.id)
      : this.taskGateway.markAsComplete(task.id);

    toggle$.pipe(tap(() => this.reload$.next())).subscribe();
  }

  remove(task: Task) {
    return this.taskGateway
      .remove(task.id)
      .pipe(tap(() => this.reload$.next()))
      .subscribe();
  }
}
