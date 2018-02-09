import { LoginComponent } from './login/login.componnet';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MerchantComponent } from './merchant/merchant.component';
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent},
  { path: 'merchant', component: MerchantComponent},
  // { path:  'login', component: LoginComponent},
  // { path: '**',redirectTo: 'home'  }
];
