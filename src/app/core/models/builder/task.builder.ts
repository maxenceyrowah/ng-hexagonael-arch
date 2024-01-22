import { Task } from '../task.model';

export class TaskBuilder {
  protected id: string;
  protected name: string;
  protected completed: boolean;

  withId(id: string): TaskBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): TaskBuilder {
    this.name = name;
    return this;
  }

  complete(): TaskBuilder {
    this.completed = true;
    return this;
  }

  uncomplete(): TaskBuilder {
    this.completed = false;
    return this;
  }

  build(): Task {
    return {
      id: this.id,
      name: this.name,
      completed: this.completed,
    };
  }
}

export class StubTaskBuilder extends TaskBuilder {
  protected override id: 'id';
  protected override name: 'Tourner une video sur angular';
  protected override completed = false;
}
