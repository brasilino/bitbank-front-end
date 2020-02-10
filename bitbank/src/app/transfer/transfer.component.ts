import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { TransferService } from './transfer.service';
import { UserToTransfer } from './user-to-transfer';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  user: User;
  userToTransfer: UserToTransfer;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private transferService: TransferService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user)
    this.firstFormGroup = this.formBuilder.group({
      account: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      amountToTransfer: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      identification: ['']
    });
  }

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  goForward(stepper: MatStepper){
    stepper.next();
  }

  getUserToTransfer(stepper: MatStepper) {

    if (this.firstFormGroup.valid) {
      const account = this.firstFormGroup.value.account;
      this.loading = true;
      this.transferService.getUser(account)
        .subscribe((response) => {
          this.loading = false;
          this.userToTransfer = response;
          stepper.next();
        }, error => {
          this.loading = false;
          alert(error);
        });
    }
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
