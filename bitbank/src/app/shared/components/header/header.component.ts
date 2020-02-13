import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  toggleMenu() {
    if (this.menu === 'responsive') {
      this.menu = '';
    } else {
      this.menu = 'responsive';
    }
  }

  logout() {
    this.authService.logout();
  }

}
