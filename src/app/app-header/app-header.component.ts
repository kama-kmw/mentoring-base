import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HoverHighlight } from '../directives/hover-highlight.directive';

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
  imports: [NgFor, RouterLink, CommonModule, HoverHighlight],
})
export class HeaderComponent {
  readonly headerNavLink1 = 'Главная';
  readonly headerNavLink2 = 'О компании';
  readonly headerNavLink3 = 'Каталог';

  aboutCompany = itemMenu;
  menuItems = menuElements;

  isUpperCase = true;

  changeMenuText() {
    this.menuItems = menuElements.map((item) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    );
    this.isUpperCase = !this.isUpperCase;
  }

  today: Date = new Date();
}
