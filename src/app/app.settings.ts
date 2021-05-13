import { HttpHeaders } from '@angular/common/http';

export class AppSettings {
  public static URL_ENDPOINT = 'https://api-ssl.bitly.com/v4/shorten';

  public static HTTP_OPTIONS = {
    headers: new HttpHeaders({
      Authorization: 'Bearer YOUR_TOKEN'
    })
  };
}
