import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasBlogComponent } from '../../components/noticias-blog/noticias-blog.component';
import { MapaUbicacionComponent } from '../../components/mapa-ubicacion/mapa-ubicacion.component';
import { TestimoniosComponent } from '../../components/testimonios/testimonios.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NoticiasBlogComponent,
    MapaUbicacionComponent,
    TestimoniosComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  welcomeMessage = 'Bienvenido al sistema';
}