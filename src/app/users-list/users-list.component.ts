import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { User } from './users-list.interface';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './usets-list.component.scss',
  standalone: true,
  imports: [NgFor, UserCardComponent],
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  users: User[] = [];

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.users = response;
    });
  }

  deleteUser(id: number) {
    this.users = this.users.filter((item) => id !== item.id);
  }
}
