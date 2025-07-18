import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiciosMedicosService } from '../../../shared/services/servicios-medicos.service';

@Component({
  selector: 'app-servicios-medicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-servicios-medicos.html',
  styleUrls: ['./admin-servicios-medicos.css']
})
export class AdminServiciosMedicosComponent implements OnInit {

  servicios: any[] = [];
  servicioNuevo: any = this.inicializarServicio();
  servicioEditando: any = null;

  constructor(private serviciosMedicosService: ServiciosMedicosService) {}

  ngOnInit(): void {
    this.loadServicios();
  }

  // getter que devuelve el servicio activo (nuevo o en edición)
  get modeloServicio() {
    return this.servicioEditando ?? this.servicioNuevo;
  }

  // inicializa objeto vacío para nuevo servicio
  inicializarServicio() {
    return {
      nombreServicio: '',
      precio: 0,
      duracion: 0,
      descripcion: '',
      estado: ''
    };
  }

  // obtiene todos los servicios médicos
  loadServicios(): void {
    this.serviciosMedicosService.getServiciosMedicos().subscribe({
      next: (data) => this.servicios = data,
      error: (err) => console.error('Error al cargar servicios médicos:', err)
    });
  }

  // agregar o actualizar
  onSubmit(): void {
    if (this.servicioEditando) {
      this.serviciosMedicosService.actualizarServicioMedico(this.servicioEditando.idServicio, this.modeloServicio).subscribe({
        next: () => {
          this.loadServicios();
          this.servicioEditando = null;
        },
        error: (err) => console.error('Error al actualizar servicio médico:', err)
      });
    } else {
      this.serviciosMedicosService.agregarServicioMedico(this.modeloServicio).subscribe({
        next: () => {
          this.loadServicios();
          this.servicioNuevo = this.inicializarServicio();
        },
        error: (err) => console.error('Error al agregar servicio médico:', err)
      });
    }
  }

  // cargar para editar
  cargarServicio(id: number): void {
    this.serviciosMedicosService.getServicioMedicoById(id).subscribe({
      next: (data) => {
        this.servicioEditando = { ...data };
      },
      error: (err) => console.error('Error al cargar servicio médico:', err)
    });
  }

  // eliminar
  eliminarServicio(id: number): void {
    if (confirm('¿Estás seguro de eliminar este servicio médico?')) {
      this.serviciosMedicosService.eliminarServicioMedico(id).subscribe({
        next: () => this.loadServicios(),
        error: (err) => console.error('Error al eliminar servicio médico:', err)
      });
    }
  }

  // cancelar edición
  cancelarEdicion(): void {
    this.servicioEditando = null;
  }

}
