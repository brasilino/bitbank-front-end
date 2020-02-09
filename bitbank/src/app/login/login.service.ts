import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService: AuthService) { }


  login(cpf: string, password: string): Observable<User> {

    if (cpf === '39401951896' && password === '123') {
      return of({
        name: 'Alan Silva Brasilino',
        cpf: '394.019.518-96',
        token: 'xxxxxxxxxxxx'
      }).pipe(
        delay(2000),
        tap(user => {
          this.authService.setUser(user);
        })
      );
    } else {
      return throwError('Usuário ou senha inválido.');
    }

  }
}
