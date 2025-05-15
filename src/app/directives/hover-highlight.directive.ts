import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
  standalone: true,
})
export class HoverHighlight {
  @HostBinding('style.backgroundColor') background = 'transparent';
  @HostBinding('style.transition') transition = 'background-color 0.3s ease';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    const span = this.el.nativeElement.querySelector('span');
    if (span) {
      this.renderer.setStyle(span, 'transition', 'color 0.3s ease');
    }

    const img = this.el.nativeElement.querySelector('img');
    if (img) {
      this.renderer.setStyle(img, 'filter', 'invert(100%)');
      this.renderer.setStyle(img, 'transition', 'filter 0.3s ease');
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.background = '#f0ba4e';
    const span = this.el.nativeElement.querySelector('span');
    if (span) {
      this.renderer.setStyle(span, 'color', '#111111');
    }

    const img = this.el.nativeElement.querySelector('img');
    if (img) {
      this.renderer.setStyle(img, 'filter', 'invert(100%)');
      this.renderer.setStyle(img, 'transition', 'filter 0.3s ease');
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.background = 'transparent';
    const span = this.el.nativeElement.querySelector('span');
    if (span) {
      this.renderer.removeStyle(span, 'color');
    }

    const img = this.el.nativeElement.querySelector('img');
    if (img) {
      this.renderer.setStyle(img, 'filter', 'invert(0%)'); // белый
    }
  }
}
