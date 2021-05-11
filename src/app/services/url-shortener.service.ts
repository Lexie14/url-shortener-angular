import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(private http: HttpClient) {}

  public shortenUrl(url: string): Observable<string> {
    return this.http.post<any>(
      AppSettings.URL_ENDPOINT,
      { long_url: url },
      AppSettings.HTTP_OPTIONS
    );
  }
}
