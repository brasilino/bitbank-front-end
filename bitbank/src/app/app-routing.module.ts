import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExtractComponent } from './extract/extract.component';
import { IsLoggedGuard } from './shared/guards/is-logged.guard';
import { IsNotLoggedGuard } from './shared/guards/is-not-logged.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [IsNotLoggedGuard]
  },
  {
    path: 'extrato',
    component: ExtractComponent,
    canActivate: [IsLoggedGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'extrato',
    canActivate: [IsLoggedGuard]
  },
  {
    path: '**',
    redirectTo: 'extrato' // Criar página not-found e redirecionar
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
