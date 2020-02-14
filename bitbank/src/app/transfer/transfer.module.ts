import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxCurrencyModule } from 'ngx-currency';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { SharedModule } from '../shared/shared.module';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    TransferComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(options),
    SharedModule
  ],
  exports: [SharedModule]
})
export class TransferModule { }
