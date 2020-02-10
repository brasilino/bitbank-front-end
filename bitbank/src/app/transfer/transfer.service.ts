import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { UserToTransfer } from './user-to-transfer';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor() { }

  getUser(account: string): Observable<UserToTransfer> {

    if (account === '1111111') {
      return of({
        name: 'Jéssica Silva',
        cpf: '111.111.111-11',
        account: '111111-1'
      }).pipe(
        delay(2000)
      );
    } else {
      return throwError('Nenhum usuário foi localizado.');
    }

  }
}
