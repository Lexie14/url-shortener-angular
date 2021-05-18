import { Component } from '@angular/core';
import { UrlService } from './services/url-shortener.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public shortenedUrl: string;
  public errorMessage: string;
  public input = new FormControl('');

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
