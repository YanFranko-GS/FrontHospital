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
import { AdminCitas } from './admin/pages/admin-citas/admin-citas';
import { MiInformacionComponent } from './public/pages/paciente/paciente';
import { UnauthorizedComponent } from './unauthorized/unauthorized';
import { Pag404Component } from './pag404/pag404';



export const routes: Routes = [

  {
    path: '',
    component: NavbarComponent,  
//    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reservar-citas', component: MiInformacionComponent },
      
    ]
  },
  {
    path: 'admin',
    component: AdminNavbarComponents, 
    canActivate: [authGuard],
    data: { role: 'ROLE_ADMIN' },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'ADpacientes', component: ADPacientesComponent },
      { path: 'ADmedicos', component: AdminMedico },
      { path: 'ADservicios', component: AdminServiciosMedicosComponent },
      { path: 'ADhorarios', component: AdminHorariosDisponibles },
     { path: 'ADcitas', component: AdminCitas  },
      
    ]
  },
  { path: 'unauthorized', component: UnauthorizedComponent },


  // Esto tienes que ir siempre al final no olvidar pa no kgarla y perder 4putas horas de 
  { path: '**', component: Pag404Component }
];
