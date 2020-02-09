import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// const routes2: Routes = [{
//   path: 'home',
//   component: HomeComponent,
//   //loadChildren: () => import('path-modulo-da-home').then(m => m.HomeModule)
//   canActivate: [EstaLogadoGuard]
// },{
//   path: 'login',
//   component: LoginComponent,
//   canActivate: [NaoEstaLogadoGuard]
// },{
//   path: 'extrato',
//   component: ExtratoComponent,
//   canActivate: [EstaLogadoGuard]
// },{
//   path: 'extrato/transacoes/:idTransacao',
//   component: DetalheTransacaoComponent,
//   canActivate: [EstaLogadoGuard]
// },{
//   path: 'transferencia',
//   component: TransferenciaComponent,
//   canActivate: [EstaLogadoGuard]
// },{
//   path: 'nao-encontrado',
//   component: NaoEncontradoComponent
// },{
//   path: '',
//   pathMatch: 'full',
//   redirectTo: 'home',
//   canActivate: [EstaLogadoGuard]
// },{
//   path: '**',
//   redirectTo: 'nao-encontrado'
// }];

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
