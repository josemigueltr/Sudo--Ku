import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Producto } from 'src/app/shared/models';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from 'sweetalert2';

declare const bootstrap: any

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit, AfterViewInit {
  // TODO: vista: buscar producto

  // properties
  productos: Producto[] | undefined
  idProductoSeleccionado: number | undefined
  modalInformacionProducto: any

  constructor(
    private servicioProductos: ProductosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const busqueda = params.get('busqueda')?.replace(/_/g, ' ') || ''
      this.productos = undefined
      this.servicioProductos.buscarProducto(busqueda).subscribe(
        productos => {
          console.log(productos)
          this.productos = productos
        },
        error => {
          console.error(error)
          Swal.fire({
            title: 'Error del servidor',
            text: 'Por favor, intentalo mas tarde',
            icon: 'error'
          })
        }
      )
    })
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
