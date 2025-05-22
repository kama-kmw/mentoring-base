import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../users-list/users-list.interface';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    load: emptyProps(), 
    set: props<{ users: User[] }>(),
    edit: props<{ user: User }>(),
    create: props<{ user: User }>(),
    delete: props<{ id: number }>(),
  },
});
