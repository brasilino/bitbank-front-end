import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  login(params: {}): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'api/login', params)
            .pipe(
              delay(2000),
              tap(user => this.authService.setUser(user))
            );
  }
}
