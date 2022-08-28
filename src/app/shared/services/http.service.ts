import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IApiDef, IApiInput, IMethod } from '@app/core/interfaces';
import { environment } from '@environments/environment';

interface IOption {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  needAuthToken?: boolean;
}

@Injectable()
export class RestApiService {
  constructor(public readonly http: HttpClient) {}

  public invoke<T>(
    def: IApiDef,
    apiInput: IApiInput = {},
    data?: T,
    queryMap?: any,
    header?: any
  ): Observable<T> {
    return this.invokeAPI(
      def.api(apiInput),
      def.method,
      data,
      queryMap,
      header,
      !def.noNeedAuthToken
    );
  }

  // function for post
  private invokeAPI<T>(
    api: string,
    method: string,
    body?: T,
    queryMap?: any,
    header?: any,
    needApiAuthToken?: boolean
  ): Observable<T> {
    const apiUrl: string = environment.apiUrl + api;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    for (const key in header) {
      if (header.hasOwnProperty(key)) {
        headers = headers.append(key, header[key]);
      }
    }
    let queryParams: HttpParams = new HttpParams();
    if (queryMap !== undefined && queryMap !== null) {
      for (const key of Object.keys(queryMap)) {
        if (queryMap[key] || queryMap[key] === 0 || queryMap[key] === false) {
          if (queryMap[key] instanceof Array) {
            queryMap[key].forEach((item: any) => {
              queryParams = queryParams.append(`${key.toString()}`, item);
            });
          } else {
            queryParams = queryParams.append(key.toString(), queryMap[key]);
          }
        }
      }
    }
    const httpOptions: IOption = {
      headers,
      params: queryParams,
      observe: 'body',
      withCredentials: needApiAuthToken,
    };
    switch (method) {
      case IMethod.GET:
        return this.get<T>(apiUrl, httpOptions);
      case IMethod.POST:
        return this.post<T>(apiUrl, body!, httpOptions);
      case IMethod.PUT:
        return this.put<T>(apiUrl, body!, httpOptions);
      case IMethod.PATCH:
        return this.patch<T>(apiUrl, body!, httpOptions);
      case IMethod.DELETE:
        return this.delete<T>(apiUrl, httpOptions);
      default:
        return of();
    }
  }

  private post<T>(api: string, body: T, httpOptions: IOption): Observable<T> {
    return this.http
      .post<T>(api, body, httpOptions)
      .pipe(catchError((err) => this.handleError<T>(err)));
  }

  private get<T>(api: string, httpOptions: IOption): Observable<T> {
    return this.http
      .get<T>(api, httpOptions)
      .pipe(catchError((err) => this.handleError<T>(err)));
  }

  private put<T>(api: string, body: T, httpOptions: IOption): Observable<T> {
    return this.http
      .put<T>(api, body, httpOptions)
      .pipe(catchError((err) => this.handleError<T>(err)));
  }

  private delete<T>(api: string, httpOptions: IOption): Observable<T> {
    return this.http
      .delete<T>(api, httpOptions)
      .pipe(catchError((err) => this.handleError<T>(err)));
  }

  private patch<T>(api: string, body: T, httpOptions: IOption): Observable<T> {
    return this.http
      .patch<T>(api, body, httpOptions)
      .pipe(catchError((err) => this.handleError<T>(err)));
  }

  private handleError<T>(error: HttpErrorResponse): Observable<T> {
    if (error?.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
    }
    return throwError(() => error);
    // return an observable with a user-facing error message
  }
}
