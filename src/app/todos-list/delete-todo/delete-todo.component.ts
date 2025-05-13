import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-todo-dialog',
  templateUrl: './delete-todo.component.html',
  styleUrl: './delete-todo.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDialogModule,
  ],
})
export class ConfirmDialogTodoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { todoTitle: string; todoId: number },
    public dialogRef: MatDialogRef<ConfirmDialogTodoComponent>
  ) {}
}
