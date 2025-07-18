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

  constructor(private tokenStorage: TokenStorageService) {}

  isLoggedIn(): boolean {
    return !!this.tokenStorage.getToken();
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  isDarkMode = false;

toggleMode() {
  this.isDarkMode = !this.isDarkMode;
  document.body.classList.toggle('dark-mode', this.isDarkMode);
}

}


