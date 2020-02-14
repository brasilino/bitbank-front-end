import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from '../shared/services/auth.service';
import { HistoricTransfer } from './extract.interface';

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

  getExtract(): Observable<HistoricTransfer> {
    return this.http.get<HistoricTransfer>(this.apiUrl, httpOptions);
  }

  getExtrato(page: number): Observable<HistoricTransfer[]> {
    const headers = new HttpHeaders({
      token: '....token de autenticação....',
    });

    return this.http.get<HistoricTransfer[]>(this.apiUrl + '/transacoes', {
      params: {
        _page: String(page)
      },
      headers
    });
  }

  getHistoricTransferPorId(idTransacao): Observable<HistoricTransfer> {
    return this.http.get<HistoricTransfer>(this.apiUrl + '/transacoes/' + idTransacao);
  }
}
