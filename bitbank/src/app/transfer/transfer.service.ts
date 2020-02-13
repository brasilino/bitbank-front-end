import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from './../shared/services/auth.service';
import { UserToTransfer } from './user-to-transfer.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  TOKEN: string;
  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.TOKEN = this.authService.getUser().token;
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.TOKEN);
  }

  getUserToTransfer(account: string): Observable<UserToTransfer> {
    this.apiUrl += '/user/search?filter[numberAccount]=' + account;
    return this.http.get<UserToTransfer>(this.apiUrl, httpOptions);
  }

  transfer(params: {}): Observable<UserToTransfer> {
    return this.http.post<UserToTransfer>(this.apiUrl, params, httpOptions);
  }

}
