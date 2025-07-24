import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasService } from '../../../shared/services/citas.service';
import { HorariosDisponiblesService } from '../../../shared/services/horarios-disponibles.service';
import { MedicoService } from '../../../shared/services/medicos.service';
import { PacienteService } from '../../../shared/services/pacientes.service';
import { ServiciosMedicosService } from '../../../shared/services/servicios-medicos.service';

@Component({
  selector: 'app-admin-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-citas.html',
  styleUrl: './admin-citas.css'
})
export class AdminCitas implements OnInit {

  citas: any[] = [];
  serviciosMedicos: any[] = [];
  pacientes: any[] = [];
  medicos: any[] = [];
  horarios: any[] = [];

  citaNueva: any = this.inicializarCita();
  citaEditando: any = null;

  constructor(
    private citasService: CitasService,
    private horarioService: HorariosDisponiblesService,
    private serviciosService: ServiciosMedicosService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService
  ) {}

  ngOnInit(): void {
    this.loadCitas();
    this.loadServiciosMedicos();
    this.loadPacientes();
    this.loadMedicos();
    this.loadHorarios();
  }

  get modeloCita() {
    return this.citaEditando ?? this.citaNueva;
  }

  inicializarCita() {
    return {
      fechaHora: '',
      estado: '',
      motivo: '',
      observaciones: '',
      horario: { idHorario: '' },
      medico: { idMedico: '' },
      paciente: { idPaciente: '' },
      servicioMedico: { idServicio: '' }
    };
  }

  loadCitas(): void {
    this.citasService.getCitas().subscribe({
      next: (data) => this.citas = data,
      error: (err) => console.error('Error al cargar citas:', err)
    });
  }

  loadServiciosMedicos(): void {
    this.serviciosService.getServiciosMedicos().subscribe({
      next: (data) => this.serviciosMedicos = data,
      error: (err) => console.error('Error al cargar servicios médicos:', err)
    });
  }

  loadPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => this.pacientes = data,
      error: (err) => console.error('Error al cargar pacientes:', err)
    });
  }

  loadMedicos(): void {
    this.medicoService.getMedicos().subscribe({
      next: (data) => this.medicos = data,
      error: (err) => console.error('Error al cargar médicos:', err)
    });
  }

  loadHorarios(): void {
    this.horarioService.getHorariosDisponibles().subscribe({
      next: (data) => this.horarios = data,
      error: (err) => console.error('Error al cargar horarios:', err)
    });
  }

  onSubmit(): void {
    if (this.citaEditando) {
      this.citasService.actualizarCita(this.citaEditando.idCita, this.modeloCita).subscribe({
        next: () => {
          this.loadCitas();
          this.citaEditando = null;
        },
        error: (err) => console.error('Error al actualizar cita:', err)
      });
    } else {
      this.citasService.agregarCita(this.modeloCita).subscribe({
        next: () => {
          this.loadCitas();
          this.citaNueva = this.inicializarCita();
        },
        error: (err) => console.error('Error al agregar cita:', err)
      });
    }
  }

  cargarCita(id: number): void {
    this.citasService.getCitaById(id).subscribe({
      next: (data) => {
        this.citaEditando = { ...data };
        if (!this.citaEditando.servicioMedico) this.citaEditando.servicioMedico = { idServicio: '' };
        if (!this.citaEditando.paciente) this.citaEditando.paciente = { idPaciente: '' };
        if (!this.citaEditando.medico) this.citaEditando.medico = { idMedico: '' };
        if (!this.citaEditando.horario) this.citaEditando.horario = { idHorario: '' };
      },
      error: (err) => console.error('Error al cargar cita:', err)
    });
  }

  eliminarCita(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta cita?')) {
      this.citasService.eliminarCita(id).subscribe({
        next: () => this.loadCitas(),
        error: (err) => console.error('Error al eliminar cita:', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.citaEditando = null;
  }

}
