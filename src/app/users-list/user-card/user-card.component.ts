import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../users-list.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { EditUser } from '../edit-user-dialog/edit-user-form.interfase';
import { ConfirmDialogComponent } from '../delete-user/delete-user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomUpperCasePipe } from '../../pipes/upper-case.pipe';
import { RemoveDashes } from '../../pipes/remove-dashes.pape';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
  imports: [MatButtonModule, CustomUpperCasePipe, RemoveDashes],
})
export class UserCardComponent {
  @Input()
  user!: User;

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<EditUser>();

  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((editResult: EditUser) => {
      if (editResult) {
        this.editUser.emit(editResult);
        this._snackBar.open(`Карточка обновлена`, 'OK', {
          duration: 5000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  openDeleteConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        userName: this.user.name,
        userId: this.user.id,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { delete: boolean; userId: number }) => {
        if (result && result.delete) {
          this.deleteUser.emit(result.userId);
          this._snackBar.open(`Пользователь удален`, 'OK', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      });
  }

  onDeleteUser(userId: number) {
    this.deleteUser.emit(userId);
  }
}
