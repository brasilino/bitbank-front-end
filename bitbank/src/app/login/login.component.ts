import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

  submit() {

    console.log(this.form);

    if (this.form.valid) {
      this.login(this.form.value.cpf, this.form.value.password);
    }
  }

  login(cpf: string, password: string) {
    console.log('login');
    this.loginService.login(cpf, password)
      .subscribe(response => {
        console.log(response);
        alert('direcionar para extrato');
        //this.router.navigate(['extrato']);
      }, error => {
        this.error = error;
      });
  }

}
