import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HoverHighlight } from '../directives/hover-highlight.directive';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { UserService } from '../user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

const showItemMenu = (item: string) => {
  return item;
};
const itemMenu = showItemMenu('О компании');

const menuElements = [
  'Каталог ',
  'Стройматериалы ',
  'Инструменты ',
  'Электрика ',
  'Интерьер и одежда',
];

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    CommonModule,
    HoverHighlight,
    AsyncPipe,
    MatButtonModule,
  ],
})
export class HeaderComponent {
  readonly headerNavLink1 = 'Главная';
  readonly headerNavLink2 = 'О компании';
  readonly headerNavLink3 = 'Каталог';

  aboutCompany = itemMenu;
  menuItems = menuElements;

  isUpperCase = true;
  private readonly dialog = inject(MatDialog);
  public readonly userService = inject(UserService);
  private readonly router = inject(Router);

  private _snackBar = inject(MatSnackBar);

  changeMenuText() {
    this.menuItems = menuElements.map((item) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    );
    this.isUpperCase = !this.isUpperCase;
  }

  today: Date = new Date();

  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {});

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'admin') {
        this.userService.loginAsAdmin();

        this.userService.users$.subscribe((user) => {
          if (user?.isAdmin) {
            this.router.navigate(['/admin']);
            this._snackBar.open(`Вход администратора`, 'OK', {
              duration: 5000,
              panelClass: ['success-snackbar'],
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        });
      } else if (result === 'user') {
        this.userService.loginAsUser();
        this.router.navigate(['/todos']);
        this._snackBar.open(`Вход пользователя`, 'OK', {
          duration: 5000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      } else return undefined;
    });
  }

  public logout() {
    if (confirm('Вы точно хотите выйти')) {
      return this.userService.logout();
    } else {
      return false;
    }
  }
}
