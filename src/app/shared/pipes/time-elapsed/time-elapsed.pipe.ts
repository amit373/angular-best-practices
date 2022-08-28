import {
  Pipe,
  PipeTransform,
  OnDestroy,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';

@Pipe({ name: 'timeElapsed' })
export class TimeElapsedPipe implements PipeTransform, OnDestroy {
  private timer: number | null | undefined;
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly ngZone: NgZone
  ) {}

  transform(value: string): string {
    this.removeTimer();
    const newDate: Date = new Date(value);
    const now: Date = new Date();
    const seconds: number = Math.round(
      Math.abs((now.getTime() - newDate.getTime()) / 1000)
    );
    const timeToUpdate: number = this.getSecondsUntilUpdate(seconds) * 1000;
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });
    const minutes: number = Math.round(Math.abs(seconds / 60));
    const hours: number = Math.round(Math.abs(minutes / 60));
    const days: number = Math.round(Math.abs(hours / 24));
    const months: number = Math.round(Math.abs(days / 30.416));
    const years: number = Math.round(Math.abs(days / 365));
    if (seconds <= 45) {
      return 'just now';
    } else if (seconds <= 90) {
      return '1 min';
    } else if (minutes <= 45) {
      return `${minutes} mins`;
    } else if (minutes <= 90) {
      return '1 hr';
    } else if (hours <= 22) {
      return `${hours} hrs`;
    } else if (hours <= 36) {
      return '1 day';
    } else if (days <= 25) {
      return `${days} days`;
    } else if (days <= 45) {
      return '1 month';
    } else if (days <= 345) {
      return `${months} months`;
    } else if (days <= 545) {
      return '1 year';
    } else {
      return `${years} years`;
    }
  }

  /* Remove timer */
  private removeTimer(): void {
    if (this.timer) {
      window.clearTimeout(this.timer);
      if (this.timer) {
        this.timer = null;
      }
    }
  }

  /* Returns Seconds Until Update */
  private getSecondsUntilUpdate(seconds: number) {
    const min = 60;
    const hr = min * 60;
    const day = hr * 24;
    if (seconds < min) {
      // less than 1 min, update ever 2 secs
      return 2;
    } else if (seconds < hr) {
      // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < day) {
      // less then a day, update every 5 mins
      return 300;
    } else {
      // update every hour
      return 3600;
    }
  }

  public ngOnDestroy(): void {
    this.removeTimer();
  }
}
