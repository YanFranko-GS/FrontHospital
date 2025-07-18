import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorariosDisponiblesService } from '../../../shared/services/horarios-disponibles.service';
import { ServiciosMedicosService } from '../../../shared/services/servicios-medicos.service';

@Component({
  selector: 'app-admin-horarios-disponibles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-horarios-disponibles.html',
  styleUrl: './admin-horarios-disponibles.css'
})
export class AdminHorariosDisponibles implements OnInit {

  horarios: any[] = [];
  serviciosMedicos: any[] = [];
  horarioNuevo: any = this.inicializarHorario();
  horarioEditando: any = null;

  constructor(
    private horarioService: HorariosDisponiblesService,
    private serviciosService: ServiciosMedicosService
  ) {}

  ngOnInit(): void {
    this.loadHorarios();
    this.loadServiciosMedicos();
  }

  get modeloHorario() {
    return this.horarioEditando ?? this.horarioNuevo;
  }

  inicializarHorario() {
    return {
      fechaDisponibilidad: '',
      horaInicio: '',
      horaFin: '',
      estado: '',
      servicioMedico: { idServicio: '' }
    };
  }

  loadHorarios(): void {
    this.horarioService.getHorariosDisponibles().subscribe({
      next: (data) => this.horarios = data,
      error: (err) => console.error('Error al cargar horarios:', err)
    });
  }

  loadServiciosMedicos(): void {
    this.serviciosService.getServiciosMedicos().subscribe({
      next: (data) => this.serviciosMedicos = data,
      error: (err) => console.error('Error al cargar servicios médicos:', err)
    });
  }

  onSubmit(): void {
    if (this.horarioEditando) {
      this.horarioService.actualizarHorarioDisponible(this.horarioEditando.idHorario, this.modeloHorario).subscribe({
        next: () => {
          this.loadHorarios();
          this.horarioEditando = null;
        },
        error: (err) => console.error('Error al actualizar horario:', err)
      });
    } else {
      this.horarioService.agregarHorarioDisponible(this.modeloHorario).subscribe({
        next: () => {
          this.loadHorarios();
          this.horarioNuevo = this.inicializarHorario();
        },
        error: (err) => console.error('Error al agregar horario:', err)
      });
    }
  }

  cargarHorario(id: number): void {
    this.horarioService.getHorarioDisponibleById(id).subscribe({
      next: (data) => {
        this.horarioEditando = { ...data };
        if (!this.horarioEditando.servicioMedico) {
          this.horarioEditando.servicioMedico = { idServicio: '' };
        }
      },
      error: (err) => console.error('Error al cargar horario:', err)
    });
  }

  eliminarHorario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este horario?')) {
      this.horarioService.eliminarHorarioDisponible(id).subscribe({
        next: () => this.loadHorarios(),
        error: (err) => console.error('Error al eliminar horario:', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.horarioEditando = null;
  }

}
