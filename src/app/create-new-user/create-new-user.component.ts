import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateUser } from './create-new-user.interfase';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-new-user-card',
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogClose,
  ],
})
export class CreateUserDialogComponent {
  @Output()
  createUser = new EventEmitter<CreateUser>();

  public form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),

    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    website: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    companyName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
  });


  get newUsers(): CreateUser {
    const formValue = this.form.value;

    return {
      name: formValue.name ?? '',
      email: formValue.email ?? '',
      website: formValue.website ?? '',
      companyName: formValue.companyName ?? '',
    };
  }
}
