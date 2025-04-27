import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './users-list/users-list.interface';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  readonly apiService = inject(HttpClient);

  getUsers() {
    return this.apiService.get<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
}

class Test1 {
  field1: number;
  field2: number;

  constructor() {
    this.field1 = 10;
    this.field2 = 20;
  }
}

const newClassTest = new Test1();

newClassTest.field1;
