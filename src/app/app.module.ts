import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HttpErrorHandleInterceptor } from './services//http-error-interceptor.service';
import { UrlShortenerAuthInterceptor } from './services/url-shortener-auth-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandleInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UrlShortenerAuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
