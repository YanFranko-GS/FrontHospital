import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(data: { nombreUsuario: string; correoElectronico: string; contrasena: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

//  obtenerPerfil(): Observable<UsuarioResponse> {
//    return this.http.get<UsuarioResponse>(`${environment.apiUrl}/usuarios/perfil`);
//  }

}