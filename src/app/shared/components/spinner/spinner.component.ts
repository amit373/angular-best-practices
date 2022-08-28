import {
  Component,
  OnDestroy,
  Input,
  OnInit,
  OnChanges,
  SimpleChange,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SpinnerService } from './spinner.service';
import {
  LOADERS,
  DEFAULTS,
  Size,
  ISpinner,
  PRIMARY_SPINNER,
} from './spinner.enum';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', animate(200, style({ opacity: 0 }))),
    ]),
  ],
})
export class SpinnerComponent implements OnDestroy, OnInit, OnChanges {
  @Input() bdColor: string;
  @Input() size: Size;
  @Input() color: string;
  @Input() type: string | undefined;
  @Input() fullScreen: boolean;
  @Input() name: string;
  @Input() zIndex: number;
  @Input() template: string | null;
  @Input() showSpinner: boolean;
  @Input() disableAnimation: boolean = false;
  spinner: ISpinner = new ISpinner();
  divArray: Array<number>;
  divCount: number;
  show: boolean;
  ngUnsubscribe: Subject<void> = new Subject();
  @ViewChild('overlay')
  spinnerDOM!: { nativeElement: any };

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.spinnerDOM && this.spinnerDOM.nativeElement) {
      if (
        this.fullScreen ||
        (!this.fullScreen && this.isSpinnerZone(event.target))
      ) {
        event.returnValue = false;
        event.preventDefault();
      }
    }
  }

  constructor(
    private spinnerService: SpinnerService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {
    this.bdColor = DEFAULTS.BD_COLOR;
    this.zIndex = DEFAULTS.Z_INDEX;
    this.color = DEFAULTS.SPINNER_COLOR;
    this.size = 'large';
    this.fullScreen = true;
    this.name = PRIMARY_SPINNER;
    this.template = null;
    this.showSpinner = false;
    this.divArray = [];
    this.divCount = 0;
    this.show = false;
  }

  initObservable() {
    this.spinnerService
      .getSpinner(this.name)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((spinner: ISpinner) => {
        this.setDefaultOptions();
        Object.assign(this.spinner, spinner);
        if (spinner.show) {
          this.onInputChange();
        }
        this.changeDetector.detectChanges();
      });
  }

  ngOnInit() {
    this.setDefaultOptions();
    this.initObservable();
  }

  isSpinnerZone(element: any): boolean {
    if (element === this.elementRef.nativeElement.parentElement) {
      return true;
    }
    return element.parentNode && this.isSpinnerZone(element.parentNode);
  }

  setDefaultOptions = () => {
    this.spinner = ISpinner.create({
      name: this.name,
      bdColor: this.bdColor,
      size: this.size,
      color: this.color,
      type: this.type,
      fullScreen: this.fullScreen,
      divArray: this.divArray,
      divCount: this.divCount,
      show: this.show,
      zIndex: this.zIndex,
      template: this.template!,
      showSpinner: this.showSpinner,
    });
  };

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (const propName in changes) {
      if (propName) {
        const changedProp = changes[propName];
        if (changedProp.isFirstChange()) {
          return;
        } else if (
          typeof changedProp.currentValue !== 'undefined' &&
          changedProp.currentValue !== changedProp.previousValue
        ) {
          if (changedProp.currentValue !== '') {
            (this.spinner as any)[propName] = changedProp.currentValue;
            if (propName === 'showSpinner') {
              if (changedProp.currentValue) {
                this.spinnerService.show(this.spinner.name, this.spinner);
              } else {
                this.spinnerService.hide(this.spinner.name);
              }
            }

            if (propName === 'name') {
              this.initObservable();
            }
          }
        }
      }
    }
  }

  getClass(type: string, size: Size): string {
    this.spinner.divCount = (LOADERS as any)[type];
    this.spinner.divArray = Array(this.spinner.divCount)
      .fill(0)
      .map((_, i) => i);
    let sizeClass = '';
    switch (size.toLowerCase()) {
      case 'small':
        sizeClass = 'la-sm';
        break;
      case 'medium':
        sizeClass = 'la-2x';
        break;
      case 'large':
        sizeClass = 'la-3x';
        break;
      default:
        break;
    }
    return 'la-' + type + ' ' + sizeClass;
  }

  onInputChange() {
    this.spinner.class = this.getClass(this.spinner.type, this.spinner.size);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
