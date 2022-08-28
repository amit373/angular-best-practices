import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UtilsService implements OnDestroy {
  public isConnected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer
  ) {}

  public setConnected(connected: boolean): void {
    this.isConnected$.next(connected);
  }

  // Show Fixed value after . ex: 10.000
  public static toFixedDown(integer: number, digits: number = 0): number {
    const numberString: string = (integer || 0).toFixed(10);
    const regexp: RegExp = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)'),
      m = numberString.match(regexp);
    const result: number = m
      ? parseFloat(m[1])
      : parseFloat(numberString).valueOf();
    return integer >= 0 ? result : -1 * result;
  }

  // Count Decimal from value
  public static countDecimals(value: any): number {
    const match = ('' + Number(value)).match(
      /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/
    );
    if (!match) {
      return 0;
    }
    return Math.max(
      0,
      (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)
    );
  }

  // Get Path
  public getPath(): string {
    return this.location.href;
  }

  // Navigate to new Route
  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  // Navigate to New Tab
  public navigateToNewTab(path: string): void {
    window.open(path);
  }

  // Allow Selected Keycode on keypress
  public onKeyPressAllowNumbers(e: any, val: any): void {
    if (
      [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      if (e.keyCode === 46 && val.indexOf('.') === -1) {
        return;
      }
    }
    // Ensure that it is a number and stop the keypress & do not allow multiple points
    if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
    }
  }

  // Get Local Date Object
  public getLocalTimeDateObject(timeInUtc: string): string | Date {
    if (timeInUtc && timeInUtc.indexOf('Z') < 0) {
      timeInUtc += 'Z';
      return new Date(timeInUtc);
    }
    return timeInUtc;
  }

  // Check is Number
  isNumber(numString: string): boolean {
    const num = Number(numString) as number;
    return isNaN(num) ? false : true;
  }

  // Get Number from String
  getNumber(numString: string): number | string {
    if (this.isNumber(numString)) {
      return Number(numString);
    }
    throw new Error('Not a valid number!');
  }

  // Generate HTML
  sanitizeHTML(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  // Remove HTML Tags
  escapeHTML(text: string): string {
    text = text.replace(/\{/g, '&#123;');
    text = text.replace(/\}/g, '&#125;');
    return text;
  }

  downloadFile(blob: Blob, fileName: string): void {
    const url: string = URL.createObjectURL(blob);
    const downloadLink: HTMLAnchorElement = document.createElement('a');
    downloadLink.href = url;
    downloadLink.target = '_blank';
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  ngOnDestroy() {
    if (this.isConnected$) {
      this.isConnected$.unsubscribe();
    }
  }
}
