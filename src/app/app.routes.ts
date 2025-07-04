import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/dash-admin/dash-admin';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';                                                                                                         
import { PacientesComponent } from './components/pacientes/pacientes';
   
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'IndexDash', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'Paciente', component: PacientesComponent, canActivate: [authGuard] },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];