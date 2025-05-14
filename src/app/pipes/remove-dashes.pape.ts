import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDashes',
  standalone: true,
})
export class RemoveDashes implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    return value.replace(/\D/g, ''); // \D — все НЕ-цифры
  }
}
