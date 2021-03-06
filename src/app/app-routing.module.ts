import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard.ts.guard";
import { RegisterBusComponent } from './components/register-bus/register-bus.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AddbusComponent } from './components/side-bar/addbus/addbus.component';
import { ViewbusComponent } from './components/side-bar/viewbus/viewbus.component';
import { EditbusComponent } from './components/side-bar/editbus/editbus.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'register-a-bus', component: RegisterBusComponent },
  { path: 'sidebar', component: SideBarComponent, children: [
      { path: 'addbus', component: AddbusComponent },
      { path: 'viewbus', component: ViewbusComponent },
      { path: 'editbus/:id', component: EditbusComponent }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
