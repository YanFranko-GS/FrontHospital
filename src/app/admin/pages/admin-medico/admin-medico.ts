import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicoService } from '../../../shared/services/medicos.service';

@Component({
  selector: 'app-admin-medico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-medico.html',
  styleUrl: './admin-medico.css'
})
export class AdminMedico implements OnInit {

  medicos: any[] = [];
  medicoNuevo: any = this.inicializarMedico();
  medicoEditando: any = null;

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.loadMedicos();
  }

  get modeloMedico() {
    return this.medicoEditando ?? this.medicoNuevo;
  }

  inicializarMedico() {
    return {
      nombreCompleto: '',
      especialidad: '',
      numeroColegiado: '',
      horarioLaboral: '',
      consultorio: '',
      telefono: '',
      correoElectronico: ''
    };
  }

  loadMedicos(): void {
    this.medicoService.getMedicos().subscribe({
      next: (data) => this.medicos = data,
      error: (err) => console.error('Error al cargar médicos:', err)
    });
  }

  onSubmit(): void {
    if (this.medicoEditando) {
      this.medicoService.actualizarMedico(this.medicoEditando.idMedico, this.modeloMedico).subscribe({
        next: () => {
          this.loadMedicos();
          this.medicoEditando = null;
        },
        error: (err) => console.error('Error al actualizar médico:', err)
      });
    } else {
      this.medicoService.agregarMedico(this.modeloMedico).subscribe({
        next: () => {
          this.loadMedicos();
          this.medicoNuevo = this.inicializarMedico();
        },
        error: (err) => console.error('Error al agregar médico:', err)
      });
    }
  }

  cargarMedico(id: number): void {
    this.medicoService.getMedicoById(id).subscribe({
      next: (data) => {
        this.medicoEditando = { ...data };
      },
      error: (err) => console.error('Error al cargar médico:', err)
    });
  }

  eliminarMedico(id: number): void {
    if (confirm('¿Estás seguro de eliminar este médico?')) {
      this.medicoService.eliminarMedico(id).subscribe({
        next: () => this.loadMedicos(),
        error: (err) => console.error('Error al eliminar médico:', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.medicoEditando = null;
  }
}
