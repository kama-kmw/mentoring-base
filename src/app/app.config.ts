import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideStore } from '@ngrx/store';
import { userReducer } from './users-list/store/users.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoReducer } from './todos-list/store/todos.reducer';

import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './users-list/store/user.effects';
import { TodoEffects } from './todos-list/store/todos.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), // Подключаем анимации
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      },
    },
    provideStore({
      users: userReducer,
      todos: todoReducer,
    }),

    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    
    provideEffects(UserEffects, TodoEffects),
  ],
};
