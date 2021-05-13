import { Component } from '@angular/core';
import { UrlService } from './services/url-shortener.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public shortenedUrl: string;
  public errorMessage: string;

  constructor(private urlService: UrlService) {}

  public handleClick(value: string) {
    this.urlService.shortenUrl(value).subscribe(
      response => {
      console.log(response)
        // @ts-ignore
        this.shortenedUrl = response.link;
      },
      error => {
        console.log(error)
        this.errorMessage = error;
      }
    );
  }
}
