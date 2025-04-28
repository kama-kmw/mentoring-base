import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

const newPages = [5, 4, 3, 2, 1];

@Component({
  selector: 'app-homepage',
  templateUrl: './app-homepage.component.html',
  styleUrl: './app-homepage.component.scss',
  standalone: true,
  imports: [NgIf, NgFor],
})
export class HomePageComponent {
  isShowBanner = true;
  newPages = newPages;
}
