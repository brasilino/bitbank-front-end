import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../shared/interfaces/user.interface';
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
  user: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.TOKEN = this.authService.getUser().token;
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.TOKEN);
    this.user = authService.getUser();
  }

  getUserToTransfer(account: string): Observable<UserToTransfer> {
    const ulr = this.apiUrl + 'user/search?filter[numberAccount]=' + account;
    return this.http.get<UserToTransfer>(ulr, httpOptions);
  }

  transfer(params: any): Observable<any> {
    const ulr = this.apiUrl + `user/${this.user.body._id}/transactions`;
    return this.http.post(ulr, params, httpOptions);
  }

}
