import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    private router: Router
  ) { }

  setUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  getUser(): User | null {

    if (!this.user) {

      const user = sessionStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      } else {
        this.user = null;
      }
    }
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.getUser() ? true : false;
  }

  logout() {
    this.user = null;
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
