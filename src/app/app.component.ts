import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mentoring-first-project';
  readonly headerNavLink1 = 'Главная';
  readonly headerNavLink2 = 'О компании';
  readonly headerNavLink3 = 'Каталог';
  readonly headerSubNavLink1 = 'Каталог';
  readonly headerSubNavLink2 = 'Стройматериалы';
  readonly headerSubNavLink3 = 'Инструменты';
  readonly headerSubNavLink4 = 'Электрика';
  readonly headerSubNavLink5 = 'Интерьер и отделка';
}
