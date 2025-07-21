import { Routes } from '@angular/router';
import { LoginComponent } from './public/pages/login/login.component';
import { AdminNavbarComponents } from './admin/components/admin-navbar/admin-navbar';
import { authGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './public/pages/home/home.component';                                                                                                       
import { ADPacientesComponent } from './admin/pages/admin-paciente/admin-paciente';
import { AdminMedico } from './admin/pages/admin-medico/admin-medico';
import { NavbarComponent } from './public/components/navbar/navbar';
import { DashboardComponent } from './admin/pages/dashboard/dashboard';
import { CommonModule } from '@angular/common';
import { AdminServiciosMedicosComponent } from './admin/pages/admin-servicios-medicos/admin-servicios-medicos';
import { AdminHorariosDisponibles } from './admin/pages/admin-horarios-disponibles/admin-horarios-disponibles';
import { RegisterComponent } from './public/pages/register/register.component';


export const routes: Routes = [

  {
    path: '',
    component: NavbarComponent,  // navbar y footer de usuario normal
    children: [
      { path: '', component: HomeComponent },
     { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      // otras públicas...
    ]
  },
  {
    path: 'admin',
    component: AdminNavbarComponents,  // sidebar y topbar admin
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'ADpacientes', component: ADPacientesComponent },
      { path: 'ADmedicos', component: AdminMedico },
      { path: 'ADservicios', component: AdminServiciosMedicosComponent },
      { path: 'ADhorarios', component: AdminHorariosDisponibles },
      // más admin...
    ]
  },
  { path: '**', redirectTo: '' }
];
