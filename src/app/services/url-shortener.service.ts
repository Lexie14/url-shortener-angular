import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { urlShortenerResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(private http: HttpClient) {}

  public shortenUrl(url: string): Observable<urlShortenerResponse> {
    return this.http.post<urlShortenerResponse>(AppSettings.URL_ENDPOINT, {
      long_url: url
    });
  }
}
