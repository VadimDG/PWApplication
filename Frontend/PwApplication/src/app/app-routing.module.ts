import { MakeTransactionComponent } from './components/make-transaction/make-transaction.component';
import { TransfersHistoryComponent } from './components/transfers-history/transfers-history.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login-user.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'make-transaction', component: MakeTransactionComponent },
      { path: 'transfers-history', component: TransfersHistoryComponent }
    ],
    canActivate: [LoginGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', component: NotfoundComponent }
];

@NgModule({
  providers: [LoginGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
