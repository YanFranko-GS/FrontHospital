import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginComponent}  from '../login/login.component';
import { TokenStorageService } from '../../services/token-storage.service';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dash-admin.html',
  styleUrls: ['./dash-admin.css']
})
export class AdminDashboardComponent {
  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
}
