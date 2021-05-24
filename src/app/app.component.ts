import { Component } from '@angular/core';
import { UrlShortenerService } from './services/url-shortener.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public shortenedUrl: string;
  public errorMessage: string;
  public wrongUrlFormat = false;
  public copied = false;

  constructor(private urlShortenerService: UrlShortenerService) {}

  public handleShortenButtonClick(url: string) {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const validated = regex.test(url);

    if (validated) {
      this.wrongUrlFormat = false;
      this.errorMessage = null;
      this.urlShortenerService.shortenUrl(url).subscribe(
        response => {
          this.shortenedUrl = response.link;
        },
        error => {
          this.errorMessage = error;
          this.shortenedUrl = null;
          this.wrongUrlFormat = false;
        }
      );
    } else {
      this.wrongUrlFormat = true;
      this.shortenedUrl = null;
      this.errorMessage = null;
    }
  }

  public handleCopyButtonClick() {
    const shortenedUrl = document.querySelector('#shortenedUrl');
    const helperElement = document.createElement('textarea');
    document.body.appendChild(helperElement);
    helperElement.value = shortenedUrl.textContent;
    helperElement.select();
    document.execCommand('copy');
    document.body.removeChild(helperElement);
    this.copied = true;
  }
}
