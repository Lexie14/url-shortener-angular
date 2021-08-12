import { UrlShortenerService } from './url-shortener.service';
import { UrlShortenerResponse } from '../interfaces';
import { of } from 'rxjs';

describe('UrlShortenerService', () => {
  let urlShortenerService: UrlShortenerService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    urlShortenerService = new UrlShortenerService(httpClientSpy as any);
  });

  it('should return expected response from post request', () => {
    const urlShortenerResponse: UrlShortenerResponse = {
      link: 'https://bit.ly/3vhlwnr'
    };
    httpClientSpy.post.and.returnValue(of(urlShortenerResponse));
    urlShortenerService
      .shortenUrl('http://test-link.com')
      .subscribe(data => expect(data).toEqual(urlShortenerResponse));
  });
});
