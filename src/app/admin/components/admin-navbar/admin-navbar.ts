import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenStorageService } from '../../../shared/services/token-storage.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.html',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  styleUrls: ['./admin-navbar.css']
})
export class AdminNavbarComponents implements OnInit {
  adminNombre: string = '';
  openSubmenus: string[] = [];

  constructor(private tokenStorage: TokenStorageService) {}


  ngOnInit(): void {
    this.adminNombre = localStorage.getItem('adminNombre') || 'Administrador';
  }



  isLoggedIn(): boolean {
    return !!this.tokenStorage.getToken();
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
