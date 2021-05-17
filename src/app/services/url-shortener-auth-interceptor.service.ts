import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

@Injectable()
export class UrlShortenerAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const bitlyAuthToken = 'BITLY_TOKEN';
    const urlShortenerRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${bitlyAuthToken}`)
    });
    return next.handle(urlShortenerRequest);
  }
}
