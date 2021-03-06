import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MyErrorStateMatcher } from '../shared/classes/my-error-state-matcher';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginSubmitted = false;
  form: FormGroup;
  matcher: MyErrorStateMatcher;
  error: string | null;
  loading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.form = this.formBuilder.group({
      cpf: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.form = new FormGroup({
      cpf: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ]),
    });

    this.matcher = new MyErrorStateMatcher();
  }

  validateForm() {
    if (this.form.valid) {
      this.error = null;
    }
  }

  login(value) {
    this.loginSubmitted = true;
    if (this.form.valid) {

      const cpf = this.formatCpf(this.form.value.cpf);
      const password = this.form.value.password;
      const params = {cpf, password};

      this.loading = true;

      this.loginService.login(params)
        .subscribe(response => {
          console.log(response);
          this.loading = false;
          this.router.navigate(['/extrato']);
        }, error => {
          this.loading = false;
          this.form.setValue({password: '', cpf});
          // Verificar o status para mensagem de erro
          // retorno 0 quer dizer q o serviço do nodejs parou
          this.error = 'Usuário ou senha inválido.';
        });
    }
  }

  formatCpf(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}
