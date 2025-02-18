import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSwitchImg]',
})
export class SwitchImgDirective {
  @Input({ required: true })
  src1: string = '';
  @Input({ required: true })
  src2: string = '';
  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    let start = this.el.nativeElement.children[0].src.indexOf('icons');
    let end = this.el.nativeElement.children[0].src.length;

    if (this.el.nativeElement.children[0].src.slice(start, end) == this.src2)
      this.el.nativeElement.children[0].src = this.src1;
    else this.el.nativeElement.children[0].src = this.src2;
  }
}
