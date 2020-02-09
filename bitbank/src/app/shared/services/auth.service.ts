import { Injectable } from '@angular/core';

import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor() { }

  setUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {

    if (!this.user) {

      const user = sessionStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      }
    }
    return this.user;
  }

  deleteUser() {
    sessionStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.getUser() ? true : false;
  }
}
