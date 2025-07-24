import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenStorageService } from '../../../shared/services/token-storage.service';
import { Router } from '@angular/router'; // 👈 importa Router

@Component({
  selector: 'app-public-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  template: `
    <router-outlet></router-outlet>
  `
})
export class NavbarComponent {
  title = 'angular-jwt-login';
  isDarkMode = false;
  showMobileMenu = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router // 👈 inyecta Router
  ) {
    const darkPref = localStorage.getItem('isDarkMode');
    this.isDarkMode = darkPref === 'true';
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  isLoggedIn(): boolean {
    return !!this.tokenStorage.getToken();
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['/']); 
  }

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', String(this.isDarkMode));
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
