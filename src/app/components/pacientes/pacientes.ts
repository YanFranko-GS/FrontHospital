import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pacientes.html',
  styleUrls: ['./pacientes.css']
})
export class PacientesComponent implements OnInit {

  pacientes: any[] = [];
  pacienteNuevo: any = this.inicializarPaciente();
  pacienteEditando: any = null;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.loadPacientes();
  }

  get modeloPaciente() {
    return this.pacienteEditando ?? this.pacienteNuevo;
  }

  inicializarPaciente() {
    return {
      nombreCompleto: '',
      fechaNacimiento: '',
      correoElectronico: '',
      telefono: null,
      direccion: '',
      sexo: '',
      tipoDocumento: '',
      numeroDocumento: ''
    };
  }

  loadPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => this.pacientes = data,
      error: (err) => console.error('Error al cargar pacientes:', err)
    });
  }

  onSubmit(): void {
    if (this.pacienteEditando) {
      this.pacienteService.actualizarPaciente(this.pacienteEditando.idPaciente, this.modeloPaciente).subscribe({
        next: () => {
          this.loadPacientes();
          this.pacienteEditando = null;
        },
        error: (err) => console.error('Error al actualizar paciente:', err)
      });
    } else {
      this.pacienteService.agregarPaciente(this.modeloPaciente).subscribe({
        next: () => {
          this.loadPacientes();
          this.pacienteNuevo = this.inicializarPaciente();
        },
        error: (err) => console.error('Error al agregar paciente:', err)
      });
    }
  }

cargarPaciente(id: number): void {
  this.pacienteService.getPacienteById(id).subscribe({
    next: (data) => {
      this.pacienteEditando = { ...data }; 
    },
    error: (err) => console.error('Error al cargar paciente:', err)
  });
}



  eliminarPaciente(id: number): void {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      this.pacienteService.eliminarPaciente(id).subscribe({
        next: () => this.loadPacientes(),
        error: (err) => console.error('Error al eliminar paciente:', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.pacienteEditando = null;
  }
}