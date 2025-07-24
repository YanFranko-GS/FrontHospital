import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { TokenStorageService } from '../../../shared/services/token-storage.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.html',
  imports: [CommonModule, RouterOutlet, RouterLink],
  styleUrls: ['./admin-navbar.css']
})
export class AdminNavbarComponents implements OnInit {
  adminNombre: string | null = null;
  openSubmenus: string[] = [];

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
     this.adminNombre = this.tokenStorage.getUserName() || 'Administrador';
  }

  isLoggedIn(): boolean {
    return !!this.tokenStorage.getToken();
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }
}
