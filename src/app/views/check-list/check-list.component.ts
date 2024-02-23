import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, exhaustMap, filter, merge, startWith, switchMap } from 'rxjs';

import { TaskGateway } from '../../core/ports/task.gatway';
import { FormsModule } from '@angular/forms';
import { Task } from 'src/app/core/models/task.model';
import { AddTaskFormComponent } from './components/add-task-form.component';
import { CheckListItemComponent } from './components/check-list-item.component';

@Component({
  selector: 'app-check-list',
  standalone: true,
  styleUrls: ['./check-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    AddTaskFormComponent,
    CheckListItemComponent,
  ],
  template: `
    <div>
      <div>
        <h1>Check-list</h1>

        <app-add-tast-form (add)="add$$.next($event)" />

        <div class="content">
          <app-check-list-item
            *ngFor="let task of tasks()"
            [task]="task"
            (remove)="delete$$.next($event)"
            (toggle)="toggle$$.next($event)"
          />

          <div class="empty" *ngIf="!tasks()?.length">
            Ajoute ta premiere tache
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckListComponent {
  taskGateway = inject(TaskGateway);

  add$$ = new Subject<string>();
  toggle$$ = new Subject<Task>();
  delete$$ = new Subject<Task>();

  private add$ = this.add$$.asObservable().pipe(
    filter(Boolean),
    exhaustMap((taskName) => this.taskGateway.add(taskName))
  );

  private toggle$ = this.toggle$$
    .asObservable()
    .pipe(
      switchMap((task) =>
        task.completed
          ? this.taskGateway.markAsUnComplete(task.id)
          : this.taskGateway.markAsComplete(task.id)
      )
    );

  private delete$ = this.delete$$
    .asObservable()
    .pipe(switchMap((task) => this.taskGateway.remove(task.id)));

  tasks = toSignal(
    merge(this.add$, this.toggle$, this.delete$).pipe(
      startWith(void 0),
      switchMap(() => this.taskGateway.retrieveAll())
    )
  );
}
