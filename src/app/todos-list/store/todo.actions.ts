import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../todos-list.interface';

export const TodoActions = createActionGroup({
  source: 'Todos',
  events: {
    load: emptyProps(),
    set: props<{ todos: Todo[] }>(),
    edit: props<{ todo: Todo }>(),
    create: props<{ todo: Todo }>(),
    delete: props<{ id: number }>(),
  },
});
