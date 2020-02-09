import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  error: string | null;

  constructor() { }

  ngOnInit() {
    this.error = 'Usuário inválido.';
  }

  submit() {

    console.log(this.form);

    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

}
