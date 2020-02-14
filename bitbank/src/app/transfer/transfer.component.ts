import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import { MyErrorStateMatcher } from '../shared/classes/my-error-state-matcher';
import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { TransferService } from './transfer.service';
import { UserToTransfer } from './user-to-transfer.interface';

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
  editable = true;

  matStepper: MatStepper;
  smallScreen: boolean;

  matcher: MyErrorStateMatcher;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private transferService: TransferService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      console.log(result.matches);
      this.smallScreen = result.matches;
    });
  }

  ngOnInit() {

    this.user = this.authService.getUser();
    console.log(this.user)

    this.firstFormGroup = this.formBuilder.group({
      account: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7)
      ]]
    });
    this.secondFormGroup = this.formBuilder.group({
      amountToTransfer: ['', [
        Validators.required,
        Validators.min(10),
        Validators.max(100000)
      ]]
    });
    this.thirdFormGroup = this.formBuilder.group({
      identification: ['']
    });

    this.matcher = new MyErrorStateMatcher();
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  reset(stepper: MatStepper) {
    this.editable = true;
    stepper.reset();
  }

  getUserToTransfer(stepper: MatStepper) {

    if (this.firstFormGroup.valid) {
      const account = this.firstFormGroup.value.account;
      this.loading = true;
      this.transferService.getUserToTransfer(account)
        .subscribe((response) => {
          console.log(response)
          this.loading = false;
          this.userToTransfer = response;
          stepper.next();
        }, error => {
          this.loading = false;
          console.log(error.status);
        });
    }
  }

  transferTo(stepper: MatStepper) {

    const params = {
      numberAccount: this.userToTransfer.numberAccount,
      amountTransferred: 1000, //this.secondFormGroup.value.amountToTransfer,
      cpf: this.userToTransfer.cpf,
    };

    this.transferService.transfer(params)
      .subscribe((response) => {
        console.log(response);
        this.loading = false;
        this.editable = false;
        stepper.next();
      }, error => {
        this.loading = false;
        console.log(error.status);
      });
  }

}
