import { Component, inject } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todos-list.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogTodoComponent } from '../delete-todo/delete-todo.component';
import { MatButtonModule } from '@angular/material/button';
import { LimitText } from '../../pipes/limit-text.pipe';

@Component({
  selector: 'app-todos-card',
  templateUrl: './todos-card.component.html',
  styleUrl: './todos-card.scss',
  standalone: true,
  imports: [MatButtonModule, LimitText],
})
export class TodosCardComponent {
  @Input()
  todo!: Todo;

  @Output()
  deleteTodo = new EventEmitter<number>();

  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  openDeleteConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogTodoComponent, {
      data: {
        todoTitle: this.todo.title,
        todoId: this.todo.id,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { delete: boolean; todoId: number }) => {
        if (result && result.delete) {
          this.deleteTodo.emit(result.todoId);
          this._snackBar.open(`Задача удалена`, 'OK', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      });
  }

  onDeleteTodo(todoId: number) {
    this.deleteTodo.emit(todoId);
  }
}
