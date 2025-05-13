import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../users-list.interface';
import { EditUser } from './edit-user-form.interfase';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-component.html',
  styleUrl: './edit-user-dialog.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatDialogClose,
  ],
})
export class EditUserDialogComponent {
  readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    name: new FormControl(this.data.user.name, {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    email: new FormControl(this.data.user.email, {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    website: new FormControl(this.data.user.website, {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    companyName: new FormControl(this.data.user.company.name, {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
  });

  get userWithUpdateFields(): EditUser {
    const formValue = this.form.value;

    return {
      name: formValue.name ?? '',
      email: formValue.email ?? '',
      website: formValue.website ?? '',
      company: {
        name: formValue.companyName ?? '',
      },
      id: this.data.user.id,
    };
  }
}
