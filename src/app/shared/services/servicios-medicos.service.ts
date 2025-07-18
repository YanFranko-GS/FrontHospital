import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosMedicosService {

  private apiUrl = 'http://localhost:8080/api/v1/servicios';

  constructor(private http: HttpClient) {}

  // Listar todos los servicios médicos
  getServiciosMedicos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Buscar servicio médico por ID
  getServicioMedicoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Buscar servicio médico por nombre
  getServicioMedicoByNombre(nombreServicio: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nombre/${nombreServicio}`);
  }

  // Agregar nuevo servicio médico
  agregarServicioMedico(servicio: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, servicio);
  }

  // Actualizar servicio médico por ID
  actualizarServicioMedico(id: number, servicio: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, servicio);
  }

  // Eliminar servicio médico por ID
  eliminarServicioMedico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
