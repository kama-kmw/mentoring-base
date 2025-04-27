import { Component, inject } from '@angular/core';
import { TodosApiService } from '../todos-api.service';
import { Todos } from './todos-list.interface';
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
  todos: Todos[] = [];

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todos[]) => {
      this.todos = response.map((todo) => ({
        ...todo,
        completedText: todo.completed ? 'да' : 'нет',
      }));
    });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((item) => id !== item.id);
  }
}
