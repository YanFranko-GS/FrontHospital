import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../../shared/services/pacientes.service';
import { CitasService } from '../../../shared/services/citas.service';
import { MedicoService } from '../../../shared/services/medicos.service';
import { ServiciosMedicosService } from '../../../shared/services/servicios-medicos.service';
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-mi-informacion',
  standalone: true,
  imports: [CommonModule, FormsModule , Footer],
  templateUrl: './paciente.html',
  styleUrls: ['./paciente.css']
})
export class MiInformacionComponent implements OnInit {

  paciente: any = null;
  pacienteNuevo: any = this.inicializarPaciente();
  editando: boolean = false;
  medicos: any[] = [];
  serviciosMedicos: any[] = [];
  citaSeleccionada: any = {
    idMedico: '',
    idServicioMedico: '',
    fecha: '',
    hora: '',
    motivo: ''
  };
  mensajeCita: string = '';
  citaAgendada: boolean = false;
  mostrarFormularioCita: boolean = false;

  constructor(
    private pacienteService: PacienteService,
    private citasService: CitasService,
    private medicoService: MedicoService,
    private serviciosMedicosService: ServiciosMedicosService
  ) {}

  ngOnInit(): void {
    // Simulamos obtener el idPaciente del usuario logueado (ej: desde token o localStorage)
    const idPacienteLogueado = Number(localStorage.getItem('idPaciente'));
    if (idPacienteLogueado) {
      this.cargarMiPaciente(idPacienteLogueado);
    }
    this.cargarMedicos();
    this.cargarServiciosMedicos();
  }

  inicializarPaciente() {
    return {
      nombreCompleto: '',
      fechaNacimiento: '',
      correoElectronico: '',
      telefono: '',
      direccion: '',
      sexo: '',
      tipoDocumento: '',
      numeroDocumento: ''
    };
  }

  cargarMiPaciente(id: number): void {
    this.pacienteService.getPacienteById(id).subscribe({
      next: (data) => {
        this.paciente = data;
      },
      error: () => {
        console.warn('Paciente no encontrado, puede registrarse.');
        this.editando = true; // activa formulario si no está registrado
      }
    });
  }

  cargarMedicos(): void {
    this.medicoService.getMedicos().subscribe({
      next: (data) => this.medicos = data,
      error: () => this.medicos = []
    });
  }

  cargarServiciosMedicos(): void {
    this.serviciosMedicosService.getServiciosMedicos().subscribe({
      next: (data) => this.serviciosMedicos = data,
      error: () => this.serviciosMedicos = []
    });
  }

  agendarCita(): void {
    this.mensajeCita = '';
    this.citaAgendada = false;
    const idPaciente = this.paciente?.idPaciente || Number(localStorage.getItem('idPaciente'));
    if (!idPaciente) {
      this.mensajeCita = 'No se encontró el paciente.';
      this.citaAgendada = false;
      return;
    }
    const cita = {
      idPaciente: idPaciente,
      idMedico: this.citaSeleccionada.idMedico,
      idServicioMedico: this.citaSeleccionada.idServicioMedico,
      fecha: this.citaSeleccionada.fecha,
      hora: this.citaSeleccionada.hora,
      motivo: this.citaSeleccionada.motivo
    };
    this.citasService.agregarCita(cita).subscribe({
      next: () => {
        this.mensajeCita = '¡Cita agendada exitosamente!';
        this.citaAgendada = true;
        this.citaSeleccionada = { idMedico: '', idServicioMedico: '', fecha: '', hora: '', motivo: '' };
      },
      error: (err) => {
        this.mensajeCita = 'Error al agendar la cita.';
        this.citaAgendada = false;
        console.error('Error al agendar cita:', err);
      }
    });
  }

  onSubmit(): void {
    // Completamos los campos opcionales con valor por defecto
    if (!this.paciente.telefono) this.paciente.telefono = 'No registrado';
    if (!this.paciente.direccion) this.paciente.direccion = 'No registrado';

    if (this.paciente.idPaciente) {
      this.pacienteService.actualizarPaciente(this.paciente.idPaciente, this.paciente).subscribe({
        next: () => {
          alert('Datos actualizados correctamente.');
          this.editando = false;
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.pacienteService.agregarPaciente(this.paciente).subscribe({
        next: (nuevo) => {
          alert('Datos registrados correctamente.');
          this.paciente = nuevo;
          localStorage.setItem('idPaciente', nuevo.idPaciente); // guardamos su id
          this.editando = false;
        },
        error: (err) => console.error('Error al registrar:', err)
      });
    }
  }

  habilitarEdicion(): void {
    this.editando = true;
  }

  cancelarEdicion(): void {
    this.editando = false;
  }
}
