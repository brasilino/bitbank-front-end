import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import { MyErrorStateMatcher } from '../shared/classes/my-error-state-matcher';
import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { TransferService } from './transfer.service';
import { UserToTransfer } from './user-to-transfer';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit, AfterViewInit {

  user: User;
  userToTransfer: UserToTransfer;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  loading = false;
  editable = true;

  matStepper: MatStepper;
  viewInit = false;
  smallScreen: boolean;

  matcher: MyErrorStateMatcher;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private transferService: TransferService,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      //Breakpoints.Small
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

    //this.viewInit = true;
  }

  ngAfterViewInit() {
    //this.viewInit = true;
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
    //this.matStepper.next();
  }

  reset(stepper: MatStepper) {
    this.editable = true;
    stepper.reset();
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
      this.editable = false;
      stepper.next();
    }, 3000);
  }

}
