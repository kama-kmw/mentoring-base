import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';

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
  imports: [NgFor],
})
export class headerComponent {
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
}
