import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CODES } from '../../config/codes';

@Injectable({
  providedIn: 'root'
})
export class ApploadService {

  constructor(private httpClient: HttpClient) { }

  getCodes() {
    const promise = this.httpClient.post('http://localhost:8000/api/auth/secret', { sec: 'nohack', ret: 'pls' })
      .toPromise()
      .then(codes => {
        APP_CODES.CODES = codes;
        console.log(APP_CODES);
        return codes;
      });
    return promise;
  }

}
