import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UrlShortenerService } from './services/url-shortener.service';
import { of, throwError, Observable } from 'rxjs';
import { UrlShortenerResponse } from './interfaces';
import { HttpErrorResponse } from '@angular/common/http';

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let urlShortenerServiceSpy: jasmine.SpyObj<UrlShortenerService>;
  const urlShortenerServiceResponse: Partial<UrlShortenerResponse> = {
    link: 'https://bit.ly/3vhlwnr'
  };
  const urlShortenerServiceErrorResponse: string = 'An error occured';

  const buildComponent = (response, error) => {
    const urlShortenerServiceSpy = jasmine.createSpyObj('UrlShortenerService', [
      'shortenUrl'
    ]);
    if (response) {
      urlShortenerServiceSpy.shortenUrl.and.returnValue(
        of(response)
      );
    } else {
      urlShortenerServiceSpy.shortenUrl.and.returnValue(
        throwError(error)
      );
    }

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: UrlShortenerService, useValue: urlShortenerServiceSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  };

  it('should create component', () => {
    buildComponent(urlShortenerServiceResponse, null);
    expect(component).toBeTruthy();
  });

  it('handleShortenButtonClick should set the right values if validated on urlShortenerService response', () => {
    buildComponent(urlShortenerServiceResponse, null);
    component.handleShortenButtonClick('http://test-link.com');
    expect(component.wrongUrlFormat).toBe(false);
    expect(component.errorMessage).toBe(null);
    expect(component.shortenedUrl).toBe('https://bit.ly/3vhlwnr');
  });

  it('handleShortenButtonClick should set the right values if url validation failed', () => {
    buildComponent(null, null);
    component.handleShortenButtonClick('');
    expect(component.wrongUrlFormat).toBe(true);
    expect(component.errorMessage).toBe(null);
    expect(component.shortenedUrl).toBe(null);
  });

  it('handleShortenButtonClick should set the right value on urlShortenerService error', () => {
    buildComponent(null, urlShortenerServiceErrorResponse);
    component.handleShortenButtonClick('http://test-link.com');
    expect(component.errorMessage).toBe('An error occured');
  });

  it('handleCopyButtonClick should behave as expected', () => {
    buildComponent(urlShortenerServiceResponse, null);
    component.handleShortenButtonClick('http://test-link.com');
    fixture.detectChanges();
    component.handleCopyButtonClick();
    expect(component.copied).toBe(true);
  });
});
