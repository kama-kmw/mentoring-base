import { createReducer, on } from '@ngrx/store';
import { User } from '../../users-list/users-list.interface';
import { UserActions } from './user.actions';

const initialState: { users: User[] } = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.set, (state, payload) => ({
    ...state,
    users: payload.users,
  })),
  on(UserActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user: User) => {
      return user.id === payload.user.id ? payload.user : user;
    }),
  })),

  on(UserActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
  })),

  on(UserActions.delete, (state, payload: { id: number }) => ({
    ...state,
    users: state.users.filter((user: User) => user.id !== payload.id),
  }))
);
