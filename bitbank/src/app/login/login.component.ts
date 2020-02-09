import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { MyErrorStateMatcher } from './my-error-state-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  matcher: MyErrorStateMatcher;
  error: string | null;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      cpf: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });

    this.matcher = new MyErrorStateMatcher();
  }

  validateForm() {
    if (this.form.valid) {
      this.error = null;
    }
  }

  login() {

    if (this.form.valid) {

      const cpf = this.form.value.cpf;
      const password = this.form.value.password;

      this.loginService.login(cpf, password)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(['extrato']);
        }, error => {
          this.form.setValue({password: '', cpf});
          this.error = error;
        });
    }
  }

}
