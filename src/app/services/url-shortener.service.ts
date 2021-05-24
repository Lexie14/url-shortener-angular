import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { UrlShortenerResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {
  constructor(private http: HttpClient) {}

  public shortenUrl(url: string): Observable<UrlShortenerResponse> {
    return this.http.post<UrlShortenerResponse>(AppSettings.URL_ENDPOINT, {
      long_url: url
    });
  }
}
