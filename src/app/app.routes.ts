import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HeaderComponent } from './app-header/app-header.component';
import { UserComponent } from './app-user/app-user.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },

  {
    path: 'user',
    component: UserComponent,
  },

  // { path: 'users', outlet: 'header', component: headerComponent },
  // { path: 'users', outlet: 'list', component: UsersListComponent },
];
