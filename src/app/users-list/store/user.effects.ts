import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from './user.actions';
import { UsersApiService } from '../../users-api.service';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { User } from '../users-list.interface';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions, // поток все экшены в приложении
    private usersApiService: UsersApiService // // сервис который делает запрос к API и получает пользователей
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.load), // Слушаем экшен load
      concatMap(
        () =>
          // Когда он пришел, делаем запрос к серверу
          this.usersApiService
            .getUsers()
            .pipe(map((users: User[]) => UserActions.set({ users }))) // Когда получили — диспатчим set с пользователями
      )
    )
  );
}
