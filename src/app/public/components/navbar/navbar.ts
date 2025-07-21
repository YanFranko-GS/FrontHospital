import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenStorageService } from '../../../shared/services/token-storage.service';

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

  constructor(private tokenStorage: TokenStorageService) {}

  isLoggedIn(): boolean {
    return !!this.tokenStorage.getToken();
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}


