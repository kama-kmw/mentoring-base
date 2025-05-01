import { Injectable } from '@angular/core';
import { Todo } from './todos-list/todos-list.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosService {
  todosSubject = new BehaviorSubject<Todo[]>([]);

  setTodos(todos: Todo[]) {
    this.todosSubject.next(todos);
  }

  editedTodo(editedUser: Todo) {
    this.todosSubject.next(
      this.todosSubject.value.map((todo: Todo) =>
        todo.id === editedUser.id ? editedUser : todo
      )
    );
  }

  createTodo(todo: Todo) {
    this.todosSubject.next([...this.todosSubject.value, todo]);
  }

  deleteTodo(id: number) {
    this.todosSubject.next(
      this.todosSubject.value.filter((item: Todo) => id !== item.id)
    );
  }
}
