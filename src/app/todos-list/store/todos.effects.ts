import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoActions } from './todo.actions';
import { TodosApiService } from '../../todos-api.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions, 
    private todosApiService: TodosApiService
  ) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.load),        
      switchMap(() =>                  
        this.todosApiService.getTodos().pipe(
          map(todos => TodoActions.set({ todos }))  
        )
      )
    )
  );
}
