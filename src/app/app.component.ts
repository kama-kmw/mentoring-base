import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

const showItemMenu = (item: string) => {
  return item;
};
const itemMenu = showItemMenu('О компании');

const newPages = [5, 4, 3, 2, 1];

const menuElements = [
  'Каталог ',
  'Стройматериалы ',
  'Инструменты ',
  'Электрика ',
  'Интерьер и одежда',
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mentoring-first-project';

  isShowBanner = true;

  readonly headerNavLink1 = 'Главная';
  readonly headerNavLink2 = 'О компании';
  readonly headerNavLink3 = 'Каталог';

  aboutCompany = itemMenu;
  newPages = newPages;
  menuItems = menuElements;

  isUpperCase = true;

  changeMenuText() {
    this.menuItems = menuElements.map((item) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    );
    this.isUpperCase = !this.isUpperCase;
  }
}
