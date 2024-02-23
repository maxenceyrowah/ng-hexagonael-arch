import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TaskGateway } from './core/ports/task.gatway';
import { InMemoryTaskGateway } from './core/adapters/in-memory-task.gateway';
import { TaskBuilder } from './core/models/builder/task.builder';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: TaskGateway,
      useFactory: () => new InMemoryTaskGateway().withTasks([]),
    },
  ],
};
