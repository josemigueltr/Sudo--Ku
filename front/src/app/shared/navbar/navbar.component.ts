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
    // TODO: vista: cerrar sesión

    // NOTA: despues de cerrar sesion, cambiar esta variable
    // a false para que el navbar no muestre de nuevo el boton
    // de Cerrar sesion
    // this.isAuthenticated = false
  }

}
