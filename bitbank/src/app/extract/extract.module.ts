import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from '../shared/shared.module';
import { ExtractRoutingModule } from './extract-routing.module';
import { ExtractComponent } from './extract.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';


@NgModule({
  declarations: [
    ExtractComponent,
    TransactionDetailComponent,

  ],
  imports: [
    CommonModule,
    ExtractRoutingModule,
    MatTabsModule,
    SharedModule,
    MatButtonModule,
    MatProgressBarModule

  ],
  exports: [
    SharedModule
  ]
})
export class ExtractModule { }
