import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionDetailComponent } from '../extract/transaction-detail/transaction-detail.component';
import { IsNotLoggedGuard } from '../shared/guards/is-not-logged.guard';
import { ExtractComponent } from './extract.component';


const routes: Routes = [{
  path: '',
  component: ExtractComponent,
  canActivate: [IsNotLoggedGuard]
}, {
  path: 'transacoes/:idTransacao',
  component: TransactionDetailComponent,
  canActivate: [IsNotLoggedGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtractRoutingModule { }
