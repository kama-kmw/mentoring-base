import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Injectable,
  Output,
} from '@angular/core';
import { User } from './users-list.interface';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { CreateUser } from '../create-new-user/create-new-user.interfase';
import { EditUser } from './edit-user-dialog/edit-user-form.interfase';
import { CreateUserDialogComponent } from '../create-new-user/create-new-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { UserActions } from '../users-list/store/user.actions';
import { selectUsers } from '../users-list/store/users.selectors';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './usets-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    UserCardComponent,
    AsyncPipe,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);

  constructor() {
    this.store.dispatch(UserActions.load());
  }

  @Output()
  createNewUser = new EventEmitter();
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  openDialogCreateUser() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {});

    dialogRef.afterClosed().subscribe((result: CreateUser) => {
      if (result) {
        this.createUser(result);
        this._snackBar.open(`Пользователь создан`, 'OK', {
          duration: 5000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  deleteUser(id: number) {
    this.store.dispatch(UserActions.delete({ id }));
  }

  editUser(user: EditUser) {
    this.store.dispatch(UserActions.edit({ user }));
  }

  public createUser(formData: CreateUser) {
    this.store.dispatch(
      UserActions.create({
        user: {
          id: new Date().getTime(),
          name: formData.name,
          email: formData.email,
          website: formData.website,
          company: {
            name: formData.company.name,
          },
        },
      })
    );
  }
}
