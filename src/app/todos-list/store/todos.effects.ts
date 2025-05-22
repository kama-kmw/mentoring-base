import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoActions } from './todo.actions';
import { TodosApiService } from '../../todos-api.service';
import { concatMap, map } from 'rxjs/operators';
import { Todo } from '../todos-list.interface';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todosApiService: TodosApiService
  ) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.load),
      concatMap(() =>
        this.todosApiService
          .getTodos()
          .pipe(map((todos: Todo[]) => TodoActions.set({ todos })))
      )
    )
  );
}
