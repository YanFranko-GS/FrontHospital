import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nombreOrCorreo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { nombreOrCorreo, contrasena } = this.loginForm.value;

      this.authService.login({ nombreOrCorreo, contrasena } as any).subscribe({
        next: (data) => {
          console.log('Respuesta login:', data);

          // Guardar token
          this.tokenStorage.saveToken(data.token);

          // Guardar usuario
          this.tokenStorage.saveUser({
            nombreUsuario: data.nombreUsuario,
            correoElectronico: data.correoElectronico,
            roles: data.roles
          });

          // Decodificar y obtener el rol
          const userRole = this.tokenStorage.getUserRole();
console.log('Rol decodificado:', userRole);

if (userRole === 'ROLE_ADMIN') {
  this.router.navigate(['/admin']);
} else if (userRole === 'ROLE_USER') {
  this.router.navigate(['/']);
} else {
  this.router.navigate(['/']);
}
        },
        error: (err) => {
          console.error(err);
          // Mostrar mensaje de error al usuario (puedes colocar un alert o snackbar aquí)
        }
      });
    }
  }
}
