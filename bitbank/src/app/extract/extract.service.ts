import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from '../shared/services/auth.service';
import { Extract } from './extract.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExtractService {

  TOKEN: string;
  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.TOKEN = this.authService.getUser().token;
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.TOKEN);
  }

  getExtract(): Observable<Extract> {
    return this.http.get<Extract>(this.apiUrl, httpOptions);
  }
}
