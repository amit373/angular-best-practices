import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCharacterOnly]',
})
export class CharacterOnlyDirective {
  constructor(private _el: ElementRef) {}
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue: string = this._el.nativeElement.value;
    this._el.nativeElement.value = initialValue.replace(/[^a-zA-Z ]*/g, '');
    if (initialValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
