import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.html',
})
export class UnauthorizedComponent { 
}
