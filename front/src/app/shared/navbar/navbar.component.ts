import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  // TODO: vista: cerrar sesión

  // properties
  busqueda = ''

  constructor(
    private router: Router
  ) { }

  buscarProducto() {
    this.router.navigate([`/busqueda/${this.busqueda.replace(/\s/g, '_')}`])
  }

}
