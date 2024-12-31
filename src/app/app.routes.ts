import { provideRouter, Routes } from '@angular/router';
import { PolicyComponent } from './policy/policy.component';
import { CategoryComponent } from './category/category.component';
import { SummaryComponent } from './summary/summary.component';
import { RatesComponent } from './rates/rates.component';
import { LoginComponent } from './login/login.component';
import { DiscountComponent } from './discount/discount.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { FullSummaryComponent } from './full-summary/full-summary.component';
import { DashboardComponent } from './dashboard/dashboard.component';
export const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'category', component: CategoryComponent,canActivate: [AuthGuard] },
  { path: 'summary', component: SummaryComponent,canActivate: [AuthGuard] },
  { path: 'rates', component: RatesComponent,canActivate: [AuthGuard]},
  //{ path: 'discount', component: DiscountComponent ,canActivate: [AuthGuard]},
  { path: 'policy', component: PolicyComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'discount/:ticketNumber', component: DiscountComponent,canActivate: [AuthGuard]},
  { path: 'full-summary/:ticketNumber', component: FullSummaryComponent,canActivate: [AuthGuard] },
  {path:'dashboard',component:DashboardComponent},
  
 
];

export const appRouterProviders = [
  provideRouter(routes)
];
