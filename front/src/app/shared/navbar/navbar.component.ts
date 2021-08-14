import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  // properties
  busqueda = ''
  isAuthenticated = false

  constructor(
    private router: Router,
    private servicioAuth: AuthService
  ) { 
    this.servicioAuth.isAuthenticated.subscribe(
      isAuthenticated => this.isAuthenticated = isAuthenticated
    )
  }

  buscarProducto() {
    this.router.navigate([`/busqueda/${this.busqueda.replace(/\s/g, '_')}`])
  }

  cerrarSesion() {
    localStorage.clear()
    this.isAuthenticated = false
    this.router.navigate(['/auth/login']);

  }

}
