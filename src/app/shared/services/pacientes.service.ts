import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:8080/api/v1/pacientes';

  constructor(private http: HttpClient) {}

  
  getPacientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  
  getPacienteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); 
  }

  
  agregarPaciente(paciente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, paciente);
  }

  
  eliminarPaciente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  
  actualizarPaciente(id: number, paciente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, paciente);
  }
}