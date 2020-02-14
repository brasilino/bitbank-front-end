import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsLoggedGuard } from './shared/guards/is-logged.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    // canActivate: [IsNotLoggedGuard]
  },
  {
    path: 'extrato',
    loadChildren: () => import('./extract/extract.module').then(m => m.ExtractModule),
    // canActivate: [IsLoggedGuard]
  },
  {
    path: 'transferencia',
    loadChildren: () => import('./transfer/transfer.module').then(m => m.TransferModule),
    // canActivate: [IsLoggedGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'extrato',
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'nao-encontrado',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule),
    canActivate: [IsLoggedGuard]
  },
  {
    path: '**',
    redirectTo: 'nao-encontrado'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
