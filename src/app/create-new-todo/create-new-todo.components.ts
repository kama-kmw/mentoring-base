import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Todo } from '../todos-list/todos-list.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export function completedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim().toLowerCase();
    if (value === 'да' || value === 'нет') {
      return null;
    }
    return { invalidCompleted: true };
  };
}

@Component({
  selector: 'app-create-todo-form',
  templateUrl: './create-new-todo.components.html',
  styleUrl: './create-new-todo.components.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class CreateTodoDialogComponent {
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

    completed: new FormControl('', [Validators.required, completedValidator()]),
  });

  private getComputedValue(): boolean {
    const value = this.form.get('completed')?.value!.trim().toLowerCase();
    return value === 'да';
  }

  get newTodos(): Todo | null {
    const formValue = this.form.value;

    // Проверка на наличие userId
    if (!formValue.userId) {
      return null; // Если нет userId, возвращаем null
    }

    return {
      title: formValue.title ?? '',
      userId: formValue.userId,
      completed: this.getComputedValue(),
    };
  }

  public submitForm(): void {
    if (this.form.invalid) {
      console.log('Форма невалидна');
      return; // Не отправляем данные, если форма невалидна
    }

    // Эмитируем событие с новой задачей
    const todo: Todo = this.newTodos!;
    this.createTodo.emit(todo);

    // Сбрасываем форму после отправки
    this.form.reset();
  }
}
