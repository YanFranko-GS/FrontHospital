import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosDisponiblesService {

  private apiUrl = 'http://localhost:8080/api/v1/horarios';

  constructor(private http: HttpClient) {}

  // Listar todos los horarios disponibles
  getHorariosDisponibles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Buscar horario disponible por ID
  getHorarioDisponibleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Buscar horario disponible por fecha
  getHorarioDisponibleByFecha(fecha: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fecha/${fecha}`);
  }

  // Agregar nuevo horario disponible
  agregarHorarioDisponible(horario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, horario);
  }

  // Actualizar horario disponible por ID
  actualizarHorarioDisponible(id: number, horario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, horario);
  }

  // Eliminar horario disponible por ID
  eliminarHorarioDisponible(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
