import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { User } from '../shared/interfaces/user.interface';
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
  apiUrl = environment.apiUrl;
  user: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    // this.TOKEN = this.authService.getUser().token;
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.TOKEN);
    this.user = this.authService.getUser();
  }

  getExtract(): Observable<Extract> {

    return this.http.get<Extract>(`${this.apiUrl}user/${this.user.body._id}/transactions`, httpOptions);
  }

  getExtractPage(page: number): Observable<Extract[]> {
    const headers = new HttpHeaders({
      token: '....token de autenticação....',
    });

    return this.http.get<Extract[]>(this.apiUrl + '/transacoes', {
      params: {
        _page: String(page)
      },
      headers
    });
  }

  getExtractPorId(idTransacao): Observable<Extract> {
    return this.http.get<Extract>(this.apiUrl + '/transacoes/' + idTransacao);
  }
}
