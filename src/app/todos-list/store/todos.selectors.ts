import { createSelector } from '@ngrx/store';
import { Todo } from '../todos-list.interface';

interface TodoState {
  todos: Todo[];
}

interface AppState {
  todos: TodoState;
}

export const selectUsersFeature = (state: AppState) => state.todos;

export const selectTodos = createSelector(
  selectUsersFeature,
  (state: TodoState) => state.todos
);
