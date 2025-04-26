import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HeaderComponent } from './app-header/app-header.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },

];
