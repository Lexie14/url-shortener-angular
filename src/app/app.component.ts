import { Component } from '@angular/core';
import { UrlService } from './services/url-shortener.service';

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
        this.shortenedUrl = response.link;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }
}
