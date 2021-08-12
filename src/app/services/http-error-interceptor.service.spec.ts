import { HttpRequest, HttpHandler } from '@angular/common/http';
import { HttpErrorHandleInterceptor } from './http-error-interceptor.service';
import { throwError } from 'rxjs';

describe('AuthHttpInterceptor', () => {
  let httpErrorHandleInterceptor: HttpErrorHandleInterceptor;
  let httpRequestSpy: jasmine.SpyObj<HttpRequest<any>>;
  let httpHandlerSpy: jasmine.SpyObj<HttpHandler>;

  const interceptorMock = (status: number) => {
    httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['']);
    httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(
      throwError({ status: status, error: { message: 'Test Message' } })
    );
  };

  beforeEach(() => {
    httpErrorHandleInterceptor = new HttpErrorHandleInterceptor();
  });

  it('should create', () => {
    expect(httpErrorHandleInterceptor).toBeTruthy();
  });

  it('should return the right value for the error with status 403', () => {
    interceptorMock(403);
    httpErrorHandleInterceptor
      .intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => {},
        err => {
          expect(err).toEqual('Access Denied: Test Message');
        }
      );
  });

  it('should return the right value for the error with status 403', () => {
    interceptorMock(404);
    httpErrorHandleInterceptor
      .intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => {},
        err => {
          expect(err).toEqual('Not Found: Test Message');
        }
      );
  });

  it('should return the right value for the error with status 403', () => {
    interceptorMock(500);
    httpErrorHandleInterceptor
      .intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => {},
        err => {
          expect(err).toEqual('Internal Server Error: Test Message');
        }
      );
  });

  it('should return the right value for the error with status 403', () => {
    interceptorMock(undefined);
    httpErrorHandleInterceptor
      .intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => {},
        err => {
          expect(err).toEqual('Unknown Server Error: Test Message');
        }
      );
  });
});
