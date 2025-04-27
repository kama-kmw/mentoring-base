import { Component, inject } from '@angular/core';
import { TodosApiService } from '../todos-api.service';
import { Todo } from './todos-list.interface';
import { NgFor } from '@angular/common';
import { TodosCardComponent } from './todos-card/todos-card.component';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  standalone: true,
  imports: [NgFor, TodosCardComponent],
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  todos: Todo[] = [];

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todos = response.map((todo: Todo) => ({
        ...todo,
        completedText: todo.completed ? 'да' : 'нет',
      }));
    });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo: Todo) => id !== todo.id);
  }
}
