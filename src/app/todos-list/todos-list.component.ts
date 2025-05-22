import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TodosApiService } from '../todos-api.service';
import { Todo } from './todos-list.interface';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodosCardComponent } from './todos-card/todos-card.component';
import { CreateTodoDialogComponent } from '../create-new-todo/create-new-todo.components';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectTodos } from '../todos-list/store/todos.selectors';
import { TodoActions } from '../todos-list/store/todo.actions';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    TodosCardComponent,
    AsyncPipe,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);

  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor() {
    this.store.dispatch(TodoActions.load());
  }
  openDialogCreateTodo() {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {});

    dialogRef.afterClosed().subscribe((result: Todo) => {
      if (result) {
        this.createTodo(result);
        this._snackBar.open(`Задача создана`, 'OK', {
          duration: 5000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.delete({ id }));
  }

  public createTodo(formData: Todo) {
    this.store.dispatch(
      TodoActions.create({
        todo: {
          id: new Date().getTime(),
          title: formData.title,
          userId: formData.userId,
          completed: formData.completed,
        },
      })
    );
  }
}
