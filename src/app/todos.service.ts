import { Injectable } from '@angular/core';
import { Todo } from './todos-list/todos-list.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public todos: Observable<Todo[]> = this.todosSubject.asObservable();

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
