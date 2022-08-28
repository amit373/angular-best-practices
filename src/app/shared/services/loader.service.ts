import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}

  startLoader() {
    this.isLoading$.next(true);
  }

  stopLoader() {
    this.isLoading$.next(false);
  }
}
