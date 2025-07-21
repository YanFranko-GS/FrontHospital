import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { Router } from '@angular/router';

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('contrasena')?.value;
  const confirm = control.get('confirmarContrasena')?.value;
  return password === confirm ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm;
  showPassword = false;
  showConfirmPassword = false;
  registroExitoso = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    public router: Router
  ) {
    this.registerForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]],
      confirmarContrasena: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      const { nombreUsuario, correoElectronico, contrasena } = this.registerForm.value;
      const registro = {
        nombreUsuario: nombreUsuario ?? '',
        correoElectronico: correoElectronico ?? '',
        contrasena: contrasena ?? ''
      };
      this.authService.register(registro).subscribe({
        next: (data) => {
          this.registroExitoso = true;
          setTimeout(() => {
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUser({
              nombreUsuario: data.nombreUsuario,
              correoElectronico: data.correoElectronico,
              roles: data.roles
            });
            const userRole = this.tokenStorage.getUserRole();
            if (userRole === 'ROLE_ADMIN') {
              this.router.navigate(['/admin']);
            } else if (userRole === 'ROLE_USER') {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/']);
            }
          }, 2000);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
} 