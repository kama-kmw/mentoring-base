import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { headerComponent } from './app-header/app-header.component';


export const routes: Routes = [
  {
    path: '',
    component: headerComponent,
  },
  {
    path: 'users',
    component: UsersListComponent,
  },
];
