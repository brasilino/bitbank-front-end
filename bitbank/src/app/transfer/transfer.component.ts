import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

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
  errorRequest: boolean;
  messageError: string;

  matStepper: MatStepper;
  smallScreen: boolean;

  matcher: MyErrorStateMatcher;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private transferService: TransferService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit() {

    this.user = this.authService.getUser();
    this.validatorsForm();
  }

  validatorsForm() {
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
    this.validatorsForm();
  }

  getUserToTransfer(stepper: MatStepper) {

    if (this.firstFormGroup.valid) {
      this.loading = true;
      const account = this.formatNumberAccount(this.firstFormGroup.value.account);
      this.transferService.getUserToTransfer(account)
        .subscribe((response) => {
          this.loading = false;
          this.userToTransfer = response;
          stepper.next();
        }, error => {
          this.loading = false;
          //this.errorRequest = true;
          console.log(error)
          if (error.status === 400) {
            //this.messageError = error.error.message;
            alert(error.error.message);
          }
        });
    }
  }

  transferTo(stepper: MatStepper) {

    this.loading = true;

    const amountToTransfer = this.convertReaisToCents(this.secondFormGroup.value.amountToTransfer);

    const params = {
      numberAccount: this.userToTransfer.numberAccount,
      amountTransferred: amountToTransfer,
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

  formatNumberAccount(numberAccount: string) {
    return numberAccount.substr(0, 6) + '-' + numberAccount.substr(6, 1);
  }

  convertReaisToCents(amount: string) {
    const cents = (Number(amount) * 100);
    return parseFloat(String(cents)).toFixed(0);
  }

}
