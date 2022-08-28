import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
})
export class NumbersOnlyDirective {
  @Input() numbersOnly: boolean | undefined;
  navigationKeys: Array<string> = ['Backspace'];
  constructor() {}

  integerOnly(event: KeyboardEvent) {
    const e = <KeyboardEvent>event;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter, etc
      this.navigationKeys.indexOf(e.key) > -1 ||
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Cmd+X (Mac)
    ) {
      return; // let it happen, don't do anything
    }

    if (
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1
    ) {
      e.preventDefault();
    }
    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const regex: RegExp = /[0-9]/g;
    const e: ClipboardEvent = <ClipboardEvent>event;
    const pasteData: string = e.clipboardData!.getData('text/plain');
    let m;
    let matches: number = 0;
    while ((m = regex.exec(pasteData)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((_, __) => {
        matches++;
      });
    }
    if (matches === pasteData.length) {
      return;
    } else {
      e.preventDefault();
    }
  }

  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    this.integerOnly(event);
  }
}
