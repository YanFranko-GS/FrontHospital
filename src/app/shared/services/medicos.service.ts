import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private apiUrl = 'http://localhost:8080/api/v1/medicos';

  constructor(private http: HttpClient) {}

  // Obtener todos los médicos
  getMedicos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un médico por ID
  getMedicoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener médico por especialidad
  getMedicoByEspecialidad(especialidad: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/especialidad/${especialidad}`);
  }

  // Agregar nuevo médico
  agregarMedico(medico: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, medico);
  }

  // Actualizar médico por ID
  actualizarMedico(id: number, medico: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, medico);
  }

  // Eliminar médico por ID
  eliminarMedico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
