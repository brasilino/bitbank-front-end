import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsLoggedGuard } from '../shared/guards/is-logged.guard';
import { ExtractComponent } from './extract.component';


const routes: Routes = [
  {
  path: '',
  component: ExtractComponent,
  canActivate: [IsLoggedGuard]
  },
  // {
  //   path: 'transacoes/:idTransacao',
  //   component: TransactionDetailComponent,
  //   canActivate: [IsNotLoggedGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtractRoutingModule { }
