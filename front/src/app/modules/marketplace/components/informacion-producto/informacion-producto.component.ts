import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto, Opinion} from 'src/app/shared/models';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { CartService } from 'src/app/shared/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion-producto',
  templateUrl: './informacion-producto.component.html',
  styleUrls: ['./informacion-producto.component.scss']
})
export class InformacionProductoComponent {
 
  producto: Producto | undefined
  opiniones: Opinion[] | undefined
  loading = false

  // input
  @Input()
  set id_producto(id_producto: number | undefined) {
    if (id_producto)
      this.loadProducto(id_producto)
  }
  
  constructor(
      private servicioProductos: ProductosService,
      private route: ActivatedRoute, 
      private carro: CartService
  ) { }

  loadProducto(id: number) {
    this.loading = true
    this.servicioProductos.verInformacionProducto(id).subscribe(
      data => {
        this.producto = data.producto
        this.opiniones = data.opiniones
        console.log(this.opiniones)
      },
      error => {
        Swal.fire({
          title: 'Error del servidor',
          text: 'Por favor, intentalo mas tarde',
          icon: 'error'
        })
      },
      () => {
        this.loading = false
      }
    )
  }

  addCarro(): void {
    if(this.producto != undefined)
      this.carro.addToCart(this.producto!)
    Swal.fire({
      title: 'Hecho',
      text: 'Se ha agregado el producto a tu carrito',
      icon: 'success'
    })
  }

  counter(size: number): any[] {
      return new Array(size)
  }

}
