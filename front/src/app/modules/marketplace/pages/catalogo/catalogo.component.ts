import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/shared/models';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from 'sweetalert2';

declare const bootstrap: any;

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit, AfterViewInit {
  // TODO: vista: consultar lista de productos

  // properties
  productos: Producto[] | undefined
  modalInformacionProducto: any

  constructor(
    private servicioProductos: ProductosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // obtenemos lista de productos
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

  ngAfterViewInit() {
    // obtenemos modal de informacion de producto
    this.modalInformacionProducto = bootstrap.Modal.getOrCreateInstance(
      document.getElementById('modal-informacion-producto')
    )
    // checamos la ruta actual
    this.route.paramMap.subscribe(params => {
      console.log('la url cambio!!')
      if (window.location.href.includes('producto')) {
        // estamos solicitando un producto.
        // abrimos modal
        this.modalInformacionProducto.show()
      }
    })
  }
}
