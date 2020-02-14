import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsLoggedGuard } from '../shared/guards/is-logged.guard';
import { NotFoundComponent } from './not-found.component';


const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
    canActivate: [IsLoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule { }
