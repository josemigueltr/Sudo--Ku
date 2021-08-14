import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from "sweetalert2";

import { Producto } from 'src/app/shared/models';

@Component({
  selector: 'app-mas-vendidos',
  templateUrl: './mas-vendidos.component.html',
  styleUrls: ['./mas-vendidos.component.scss']
})
export class MasVendidosComponent implements OnInit {
  // TODO: consultar productos más vendidos

  productos: Producto[] | undefined

  constructor(
    private servicioProductos: ProductosService
  ) {}

  ngOnInit(): void {
    this.servicioProductos.consultarProductosMasVendidos().subscribe(
      productos => this.productos = productos,
      error => {
        console.error(error);
        this.productos = []
        Swal.fire({
          title: 'Error del servidor',
          text: 'Por favor, inténtalo mas tarde',
          icon: 'error'
        })
      }
    )
  }

}
