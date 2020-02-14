import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

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
  ]
})
export class ExtractModule { }
