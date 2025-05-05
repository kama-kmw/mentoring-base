import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateUser } from './create-user-form.interfase';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.html',
  styleUrl: './create-user-form.scss',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})

export class CreateUserFormComponent {
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

  public submitForm() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      this.createUser.emit({
        name: formData.name,
        email: formData.email,
        website: formData.website,
        companyName: formData.companyName,
      });
      this.form.reset();
    }
  }
}
