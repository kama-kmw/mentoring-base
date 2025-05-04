import { Injectable } from '@angular/core';
import { User } from './users-list/users-list.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  setUsers(users: User[]) {
    this.usersSubject.next(users);
  }

  editUser(editedUser: User) {
    this.usersSubject.next(
      this.usersSubject.value.map((user: User) =>
        user.id === editedUser.id ? editedUser : user
      )
    );
  }

  createUser(user: User) {
    const existingUser = this.usersSubject.value.find(
      (el: User) => el.email === user.email
    );

    if (existingUser !== undefined) {
      alert('такой email уже есть');
    } else {
      this.usersSubject.next([...this.usersSubject.value, user]),
        alert('новый user успешно добавлен');
    }
  }

  deleteUser(id: number) {
    this.usersSubject.next(
      this.usersSubject.value.filter((item: User) => id !== item.id)
    );
  }
}
