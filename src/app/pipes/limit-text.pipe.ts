import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitText',
  standalone: true,
})
export class LimitText implements PipeTransform {
  transform(text: string, maxLength: number = 10) {
    return text.slice(0, maxLength) + '...';
  }
}
