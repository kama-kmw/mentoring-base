import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';

const apiService = 'dsdsdsd';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './usets-list.component.scss',
  standalone: true,
  imports: [NgFor],
})
export class UsersListComponent {
  readonly apiService = inject(HttpClient);
  users: any = [];

  constructor() {
    this.apiService
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((response: any) => {
        this.users = response;
        console.log('Users:', this.users);
      });
  }

  deleteUser(id: number) {
    // this.users = this.users.filter((item: any) => item.id !== id);
    this.users = this.users.filter((item: any) => {
      if (id === item.id) {
        return false;
      } else {
        return true;
      }
    });
  }
}
