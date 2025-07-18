import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private TOKEN_KEY = 'auth-token';

  constructor() {}

  public saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    localStorage.setItem('auth-user', JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem('auth-user');
    return user ? JSON.parse(user) : null;
  }

  // 👉 Método nuevo para obtener el rol desde el token decodificado
  public getUserRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    // Decodificamos el payload (parte central del token)
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Payload decodificado:', payload);

    // Retornamos el rol (que viene como string "ROLE_USER" o "ROLE_ADMIN")
    return payload.roles || null;
  }

  public signOut(): void {
    localStorage.clear();
  }
}