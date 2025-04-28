import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HeaderComponent } from './app-header/app-header.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { HomePageComponent } from './app-homepage/app-homepage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'todos',
    component: TodosListComponent,
  },
];
