import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, map, catchError } from 'rxjs';

import { AuthService, LoaderService } from '@app/shared/services';
import { environment } from '@environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly loaderService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.startLoader();
    const authToken: string | boolean = this.authService.getToken();
    const isApiUrl: boolean = request.url.startsWith(environment.apiUrl);
    if (!request.withCredentials) {
      return next.handle(request).pipe(
        map((res) => {
          this.loaderService.stopLoader();
          return res;
        })
      );
    } else {
      if (authToken && isApiUrl) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${authToken}` },
        });
      }

      return next.handle(request).pipe(
        map((res: any) => {
          this.loaderService.stopLoader();
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          this.loaderService.stopLoader();
          return throwError(() => err);
        })
      );
    }
  }
}
