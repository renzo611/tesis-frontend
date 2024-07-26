import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "recoverpassword/:tokenPassword",
        component: RecoverPasswordComponent
      },
      {
        path: "sendmail",
        component: SendEmailComponent
      },
      {
        path: "change-password",
        component: ChangePasswordComponent
      },
      {
        path: '**',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
