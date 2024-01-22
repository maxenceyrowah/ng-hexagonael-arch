import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListComponent } from './check-list.component';
import { TaskGateway } from '../../core/ports/task.gatway';
import { InMemoryTaskGateway } from '../../core/adapters/in-memory-task.gateway';
import { Task } from '../../core/models/task.model';
import { StubTaskBuilder } from '../../core/models//builder/task.builder';

describe('CheckListComponent', () => {
  let taskGateway: InMemoryTaskGateway;
  let fixture: ComponentFixture<CheckListComponent>;

  beforeEach(() => {
    taskGateway = new InMemoryTaskGateway();

    TestBed.configureTestingModule({
      imports: [CheckListComponent],
      providers: [{ provide: TaskGateway, useFactory: () => taskGateway }],
    });
  });

  it('should not have any task', () => {
    setup([]);

    expect(fixture.nativeElement.textContent).toContain(
      'Ajoute ta premiere tache'
    );
  });

  it('should have tasks', () => {
    setup([
      new StubTaskBuilder().uncomplete().build(),
      new StubTaskBuilder().complete().build(),
    ]);

    expect(getCheckboxes({ checked: false }).length).toBe(2);
    expect(getCheckboxes({ checked: true }).length).toBe(1);
    expect(fixture.nativeElement.textContent).not.toContain(
      'Ajoute ta premiere tache'
    );
  });

  it('should add task', () => {
    setup([]);
    getElement(`input[name="ajoute une tache"]`).value =
      'Tourner une video sur angular';

    getElement(`button[type="submit"]`).click();
    fixture.detectChanges();

    expect(getCheckboxes({ checked: false }).length).toBe(1);
  });

  it('should mark task as complete', () => {
    setup([new StubTaskBuilder().uncomplete().build()]);
    jest.spyOn(taskGateway, 'markAsComplete');
    getCheckboxes({ checked: false })[0].click();

    expect(getCheckboxes({ checked: true }).length).toBe(1);
  });

  it('should mark tast as uncomplete', () => {
    setup([new StubTaskBuilder().complete().build()]);
    jest.spyOn(taskGateway, 'markAsUnComplete');
    getCheckboxes({ checked: false })[0].click();

    expect(getCheckboxes({ checked: true }).length).toBe(0);
  });

  it('should remove task', () => {
    setup([new StubTaskBuilder().withName('Aller au sport').build()]);
    getElement(
      `button[aria-label="Supprimer la tache: Aller au sport"]`
    ).click();
    fixture.detectChanges();

    expect(getCheckboxes({ checked: false }).length).toBe(0);
  });

  function setup(tasks: Task[]) {
    taskGateway.withTasks(tasks);
    fixture = TestBed.createComponent(CheckListComponent);
    fixture.detectChanges();
  }
  function getCheckboxes({ checked }: { checked: boolean }) {
    return fixture.nativeElement.querySelectorAll(
      `input[type='checkbox']${checked ? ':checked' : ''}`
    );
  }
  function getElement(selector: string) {
    return fixture.nativeElement.querySelector(selector);
  }
});
