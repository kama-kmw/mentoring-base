import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from '../todos-list/todos-list.interface';

@Component({
  selector: 'app-create-todo-form',
  templateUrl: './create-todo-form.components.html',
  styleUrl: './create-todo-form.components.scss',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})
export class CreateTodoFormComponent {
  @Output()
  createTodo = new EventEmitter<Todo>();

  public form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    userId: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),

    completed: new FormControl(false, { nonNullable: true }),
  });

  public submitForm() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();

      if (formData.userId === null) {
        alert('Поле "Автор задачи" обязательно!');
        return;
      }

      this.createTodo.emit({
        title: formData.title,
        userId: formData.userId,
        completed: formData.completed,
      });
      this.form.reset();
    }
  }
}
