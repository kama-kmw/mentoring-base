import { state } from '@angular/animations';
import { User } from '../../users-list/users-list.interface';
import { createSelector } from '@ngrx/store';

interface UserState {
  users: User[];
}

interface AppState {
  users: UserState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UserState) => state.users
);
