import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  public checkAuthentication(): boolean {
    return true;
  }

  public getToken(): string | boolean {
    return '';
  }
}
