import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { urlShortenerResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(private http: HttpClient) {}

  public shortenUrl(url: string): Observable<urlShortenerResponse> {
    return this.http
      .post<urlShortenerResponse>(
        AppSettings.URL_ENDPOINT,
        { long_url: url },
        AppSettings.HTTP_OPTIONS
      )
      .pipe(
        retry(1),
        catchError(error => {
          let errorMessage: string;
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = this.getErrorMessage(error);
          }
          return throwError(errorMessage);
        })
      );
  }

  public getErrorMessage(error: HttpErrorResponse) {
    switch (error.status) {
      case 403: {
        return `Access Denied: ${error.error.message}`;
      }
      case 404: {
        return `Not Found: ${error.error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.error.message}`;
      }
    }
  }
}
