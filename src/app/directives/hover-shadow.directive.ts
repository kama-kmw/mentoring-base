import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverShadow]',
  standalone: true,
})
export class AppHoverShadow {
  @HostBinding('style.boxShadow') boxShadow = 'none';
  @HostBinding('style.transition') transition = 'box-shadow 0.3s ease';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.boxShadow = 'none';
  }
}
