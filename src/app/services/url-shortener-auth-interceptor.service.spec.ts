import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerAuthInterceptor } from './url-shortener-auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppSettings } from '../app.settings';

describe(`AuthHttpInterceptor`, () => {
  let urlShortenerService: UrlShortenerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UrlShortenerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UrlShortenerAuthInterceptor,
          multi: true
        }
      ]
    });

    urlShortenerService = TestBed.get(UrlShortenerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    urlShortenerService.shortenUrl('').subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${AppSettings.URL_ENDPOINT}`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(
      'Bearer BITLY_TOKEN'
    );
  });
});
