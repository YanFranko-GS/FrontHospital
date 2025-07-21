import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})
export class TestimoniosComponent {
  testimonios = [
    {
      nombre: 'María López',
      foto: 'https://randomuser.me/api/portraits/women/68.jpg',
      texto: 'La atención fue excelente y el personal muy amable. Recomiendo la clínica al 100%.'
    },
    {
      nombre: 'Carlos Ruiz',
      foto: 'https://randomuser.me/api/portraits/men/45.jpg',
      texto: 'Me sentí seguro y bien informado durante todo mi tratamiento. ¡Gracias por todo!'
    },
    {
      nombre: 'Lucía Fernández',
      foto: 'https://randomuser.me/api/portraits/women/22.jpg',
      texto: 'Instalaciones modernas y médicos muy profesionales. Volvería sin dudarlo.'
    }
  ];
} 