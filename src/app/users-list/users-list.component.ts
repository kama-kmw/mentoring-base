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
import { UsersService } from '../users.service';
import { CreateUser } from '../create-new-user/create-new-user.interfase';
import { EditUser } from './edit-user-dialog/edit-user-form.interfase';
import { CreateUserDialogComponent } from '../create-new-user/create-new-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

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
  readonly userService = inject(UsersService);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.userService.setUsers(response);
    });
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
    this.userService.deleteUser(id);
  }

  editUser(user: EditUser) {
    this.userService.editUser({
      ...user,
      company: {
        name: user.companyName,
      },
    });
  }

  public createUser(formData: CreateUser) {
    this.userService.createUser({
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: formData.company,
    });
  }
}
