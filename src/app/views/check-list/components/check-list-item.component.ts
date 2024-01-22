import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-check-list-item',
  standalone: true,
  template: `
    <div class="task">
      <input
        type="checkbox"
        [checked]="task.completed"
        (change)="toggle.emit(task)"
      />
      <span [ngClass]="{ completed: task.completed }">{{ task.name }}</span>
      <button
        [attr.aria-label]="'Supprimer la tache: ' + task.name"
        (click)="remove.emit(task)"
      >
        X
      </button>
    </div>
  `,
  imports: [CommonModule],
})
export class CheckListItemComponent {
  @Input({ required: true }) task: Task;
  @Output() toggle = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();
}
