import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  user: User;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user)
    this.firstFormGroup = this.formBuilder.group({
      account: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      value: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      identificacao: ['']
    });
  }

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  goForward(stepper: MatStepper){

      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        stepper.next();
      }, 3000);
  }

  transferTo(stepper: MatStepper, account: string) {
    console.log('Realizar transferência!');
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      stepper.next();
    }, 3000);
  }

}
