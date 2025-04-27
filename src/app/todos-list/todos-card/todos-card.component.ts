import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todos-list.interface';

@Component({
  selector: 'app-todos-card',
  templateUrl: './todos-card.component.html',
  styleUrl: './todos-card.scss',
  standalone: true,
})
export class TodosCardComponent {
  @Input()
  todo!: Todo;

  @Output()
  deleteTodo = new EventEmitter<number>();

  onDeleteTodo(todoId: number) {
    this.deleteTodo.emit(todoId);
  }
}
