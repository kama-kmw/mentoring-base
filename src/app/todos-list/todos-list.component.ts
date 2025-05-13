import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TodosApiService } from '../todos-api.service';
import { Todo } from './todos-list.interface';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodosCardComponent } from './todos-card/todos-card.component';
import { TodosService } from '../todos.service';
import { CreateTodoDialogComponent } from '../create-new-todo/create-new-todo.components';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
  readonly todoService = inject(TodosService);

  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todoService.setTodos(response);
    });
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
    this.todoService.deleteTodo(id);
  }

  public createTodo(formData: Todo) {
    this.todoService.createTodo({
      id: new Date().getTime(),
      title: formData.title,
      userId: formData.userId,
      completed: formData.completed,
    });
  }
}
