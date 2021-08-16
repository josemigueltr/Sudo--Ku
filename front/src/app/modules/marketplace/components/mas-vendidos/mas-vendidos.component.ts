import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from "sweetalert2";

import { Producto } from 'src/app/shared/models';

declare const bootstrap: any

@Component({
  selector: 'app-mas-vendidos',
  templateUrl: './mas-vendidos.component.html',
  styleUrls: ['./mas-vendidos.component.scss']
})
export class MasVendidosComponent implements OnInit {
  // TODO: consultar productos más vendidos

  productos: Producto[] | undefined
  idProductoSeleccionado: number | undefined
  modalInformacionProducto: any

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

  ngAfterViewInit() {
    // obtenemos modal de informacion de producto
    this.modalInformacionProducto = bootstrap.Modal.getOrCreateInstance(
      document.getElementById('modal-informacion-producto')
    )
  }

  mostrarProducto(producto: Producto) {
    this.idProductoSeleccionado = producto.id_producto;
    this.modalInformacionProducto.show()
  }

}
