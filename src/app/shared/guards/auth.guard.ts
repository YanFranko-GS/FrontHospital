import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private tokenService: TokenStorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.tokenService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.tokenService.getUserRole();
    const requiredRole = route.data['role'];

    if (requiredRole && userRole !== requiredRole) {
      console.warn(`Acceso denegado. Rol requerido: ${requiredRole} - Rol del usuario: ${userRole}`);
      this.router.navigate(['/unauthorized']); // Puedes redirigir a una página 403
      return false;
    }

    return true;
  }
}
