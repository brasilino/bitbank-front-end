import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsLoggedGuard } from '../shared/guards/is-logged.guard';
import { TransferComponent } from './transfer.component';


const routes: Routes = [
  {
    path: '',
    component: TransferComponent,
    canActivate: [IsLoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule { }
