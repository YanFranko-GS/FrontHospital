export interface LoginRequest {
  nombreOrCorreo: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  nombreUsuario: string;
  correoElectronico: string;
  roles: string[];
}