import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TodosApiService } from '../todos-api.service';
import { Todo } from './todos-list.interface';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodosCardComponent } from './todos-card/todos-card.component';
import { TodosService } from '../todos.service';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.components';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  standalone: true,
  imports: [NgFor, TodosCardComponent, AsyncPipe, CreateTodoFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  readonly todoService = inject(TodosService);

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todoService.setTodos(response);
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  public createTodo(formData: Todo) {
    this.todoService.createTodo({
      id: new Date().getTime(),
      title: formData.title,
      userId: formData.userId,
      completed: formData.completed,
    });
  }
}
