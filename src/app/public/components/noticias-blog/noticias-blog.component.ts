import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticias-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticias-blog.component.html',
  styleUrls: ['./noticias-blog.component.css']
})
export class NoticiasBlogComponent {
  noticias = [
    {
      titulo: 'Nueva campaña de vacunación 2025',
      fecha: '21/07/2025',
      resumen: 'Iniciamos la campaña de vacunación anual para toda la familia. Consulta fechas y horarios.'
    },
    {
      titulo: 'Tips para una vida saludable',
      fecha: '15/07/2025',
      resumen: 'Descubre consejos prácticos para mejorar tu bienestar y prevenir enfermedades.'
    },
    {
      titulo: 'Nuevo equipo de resonancia magnética',
      fecha: '10/07/2025',
      resumen: 'Contamos con tecnología de última generación para diagnósticos más precisos.'
    }
  ];
} 