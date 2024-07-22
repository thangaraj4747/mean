import { Routes } from '@angular/router';
import { RegisterComponent } from './core/register/register.component';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: 'dashboard', component: DashboardComponent },
];
