import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Injectable()
export class ResponsiveService implements OnDestroy {
  private unSubscriber$: Subject<any> = new Subject();
  private screenWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  public mediaBreakpoint$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {
    this.init();
  }

  private init(): void {
    this._setScreenWidth(window.innerWidth);
    this._setMediaBreakpoint(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(100), takeUntil(this.unSubscriber$))
      .subscribe((evt: Event) => {
        const target = evt.target as Window;
        this._setScreenWidth(target.innerWidth);
        this._setMediaBreakpoint(target.innerWidth);
      });
  }

  private _setScreenWidth(width: number): void {
    this.screenWidth$.next(width);
  }

  private _setMediaBreakpoint(width: number): void {
    if (width < 576) {
      this.isMobile$.next(true);
      this.mediaBreakpoint$.next('xs');
    } else if (width >= 576 && width < 768) {
      this.isMobile$.next(true);
      this.mediaBreakpoint$.next('sm');
    } else if (width >= 768 && width < 992) {
      this.isMobile$.next(false);
      this.mediaBreakpoint$.next('md');
    } else if (width >= 992 && width < 1200) {
      this.isMobile$.next(false);
      this.mediaBreakpoint$.next('lg');
    } else if (width >= 1200 && width < 1600) {
      this.isMobile$.next(false);
      this.mediaBreakpoint$.next('xl');
    } else {
      this.isMobile$.next(false);
      this.mediaBreakpoint$.next('xxl');
    }
  }

  public ngOnDestroy(): void {
    this.isMobile$.next(false);
    this.unSubscriber$.next(null);
    this.unSubscriber$.complete();
  }
}
