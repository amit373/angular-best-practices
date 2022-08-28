import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ISpinner, PRIMARY_SPINNER, Spinner } from './spinner.enum';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public spinnerObservable = new BehaviorSubject<ISpinner | null>(null);
  constructor() {}

  getSpinner(name: string): Observable<ISpinner> {
    return this.spinnerObservable
      .asObservable()
      .pipe(filter((x: any) => x && x?.name === name));
  }

  show(name: string = PRIMARY_SPINNER, spinner?: Spinner) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        if (spinner && Object.keys(spinner).length) {
          (spinner as any)['name'] = name;
          this.spinnerObservable.next(new ISpinner({ ...spinner, show: true }));
          resolve(true);
        } else {
          this.spinnerObservable.next(new ISpinner({ name, show: true }));
          resolve(true);
        }
      }, 10);
    });
  }

  hide(name: string = PRIMARY_SPINNER, debounce: number = 10) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        this.spinnerObservable.next(new ISpinner({ name, show: false }));
        resolve(true);
      }, debounce);
    });
  }
}
