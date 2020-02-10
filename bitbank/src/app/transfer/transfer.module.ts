import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';


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
    MatProgressBarModule
  ]
})
export class TransferModule { }
