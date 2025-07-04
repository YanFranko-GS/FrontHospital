import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, // Añade esto
    ReactiveFormsModule, 
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm; // Eliminamos la inicialización aquí

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    // Inicializamos el formulario en el constructor
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
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser({
            nombreUsuario: data.nombreUsuario,
            correoElectronico: data.correoElectronico,
            roles: data.roles
          });
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          // Mostrar mensaje de error al usuario
        }
      });
    }
  }
}