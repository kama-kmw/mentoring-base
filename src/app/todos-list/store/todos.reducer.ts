import { createReducer, on } from '@ngrx/store';
import { TodoActions } from './todo.actions';
import { Todo } from '../todos-list.interface';

const initialState: { todos: Todo[] } = {
  todos: [],
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.set, (state, payload) => ({
    ...state,
    todos: payload.todos,
  })),
  on(TodoActions.edit, (state, payload) => ({
    ...state,
    todos: state.todos.map((todo: Todo) => {
      return todo.id === payload.todo.id ? payload.todo : todo;
    }),
  })),

  on(TodoActions.create, (state, payload) => ({
    ...state,
    todos: [...state.todos, payload.todo],
  })),

  on(TodoActions.delete, (state, payload: { id: number }) => ({
    ...state,
    todos: state.todos.filter((todo: Todo) => todo.id !== payload.id),
  }))
);
