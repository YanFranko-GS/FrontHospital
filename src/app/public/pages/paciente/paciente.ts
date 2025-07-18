import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../../shared/services/pacientes.service';

@Component({
  selector: 'app-mi-informacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paciente.html',
  styleUrls: ['./paciente.css']
})
export class MiInformacionComponent implements OnInit {

  paciente: any = null;
  pacienteNuevo: any = this.inicializarPaciente();
  editando: boolean = false;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    // Simulamos obtener el idPaciente del usuario logueado (ej: desde token o localStorage)
    const idPacienteLogueado = Number(localStorage.getItem('idPaciente'));
    if (idPacienteLogueado) {
      this.cargarMiPaciente(idPacienteLogueado);
    }
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
