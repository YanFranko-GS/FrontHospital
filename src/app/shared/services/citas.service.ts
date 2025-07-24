import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiUrl = 'http://localhost:8080/api/v1/citas';

  constructor(private http: HttpClient) {}


  getCitas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  getCitaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  getCitaByFechaHora(fechaHora: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fechaHora/${fechaHora}`);
  }


  getCitaByEstado(estado: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estado/${estado}`);
  }


  agregarCita(cita: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cita);
  }


  actualizarCita(id: number, cita: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cita);
  }

  
  eliminarCita(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
