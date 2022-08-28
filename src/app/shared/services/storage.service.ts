import { Injectable } from '@angular/core';

type IStorage = 'localStorage' | 'sessionStorage';

@Injectable()
export class StorageService {
  public saveToLocalStorage = (
    key: string,
    value: unknown,
    isStringify: boolean = true
  ): void => {
    window.localStorage[key] = isStringify ? JSON.stringify(value) : value;
  };

  public getFromLocalStorage = (
    key: string,
    isStringify: boolean = true
  ): any => {
    if (window.localStorage[key]) {
      return isStringify
        ? JSON.parse(window.localStorage[key])
        : window.localStorage[key];
    } else {
      return false;
    }
  };

  public removeFromLocalStorage = (key: string): any => {
    window.localStorage.removeItem(key);
  };

  public saveToSession = (key: string, value: unknown): void => {
    window.sessionStorage[key] = JSON.stringify(value);
  };

  public getSessionStorage = (key: string): any => {
    if (window.sessionStorage[key]) {
      return JSON.parse(window.sessionStorage[key]);
    } else {
      return false;
    }
  };

  public removeFromSessionStorage = (key: string): void => {
    window.sessionStorage.removeItem(key);
  };

  public resetStorage(type: IStorage = 'localStorage'): void {
    window[type].clear();
  }
}
