import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from './interface/user-role.interface'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject$ = new BehaviorSubject<UserRole | null>(null);
  public readonly users$ = this.userSubject$.asObservable();

  private user: UserRole = {
    name: 'Кама',
    email: 'test@mail.ru',
    isAdmin: null,
  };

  loginAsAdmin() {
    this.userSubject$.next({ ...this.user, isAdmin: true });
  }

  loginAsUser() {
    this.userSubject$.next({ ...this.user, isAdmin: false });
  }

  get isAdmin() {
    return this.userSubject$.value?.isAdmin;
  }

  logout() {
    this.userSubject$.next(null);
  }
}
