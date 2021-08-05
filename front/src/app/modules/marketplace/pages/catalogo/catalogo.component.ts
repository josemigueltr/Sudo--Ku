import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/shared/models';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  // TODO: vista: consultar lista de productos

  // properties
  productos: Producto[] | undefined

  constructor(
    private servicioProductos: ProductosService
  ) { }

  ngOnInit(): void {
    this.servicioProductos.consultarListaProductos().subscribe(
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
