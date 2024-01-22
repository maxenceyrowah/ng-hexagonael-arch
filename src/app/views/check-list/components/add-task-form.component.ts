import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-tast-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form
      class="heading"
      (submit)="add.emit(taskInput.value); taskInput.value = ''"
    >
      <input
        #taskInput
        type="text"
        name="ajoute une tache"
        placeholder="Ex: Tourner une video sur angular"
      />
      <button type="submit">Ajouter</button>
    </form>
  `,
})
export class AddTaskFormComponent {
  @Output() add = new EventEmitter<string>();
}
