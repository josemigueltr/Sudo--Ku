import { AfterViewInit, Component } from '@angular/core';
import { Producto } from 'src/app/shared/models';

declare const bootstrap: any;

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements AfterViewInit {
  // TODO vista: lista de productos de vendedor

  modalEditarProducto: any

  headElements = ['#', 'Nombre', 'Precio', 'Calificacion', 'Stock', 'Action'];

  productos = [
    {
      "id_producto" : 1,
      "nombre": "pencils",
      "precio": 13.5,
      "calificacion" : 4,
      "stock": 5
    },
    {
      "id_producto" : 2,
      "nombre": "producto2",
      "precio": 50,
      "calificacion" : 10,
      "stock": 1
    }
  ];

  productoSeleccionado: Producto | undefined = {
    id_producto: 1,
    calificacion: 0,
    descripcion: "¡COMIENZA EL JUEGO! El gabinete Blade 2101 está pensado para competir en el mercado de los gabinetes de entrada su principal atractivo es el precio, este Gabinete te permite un buen manejo de cables, flujo de aire y espacio para tarjetas de video de tamaño grande.",
    foto: "https://ebarrotes.s3.us-west-1.amazonaws.com/assets/gabinete1.webp",
    nombre: "Gabinete Yeyian Blad",
    precio: 819.0,
    stock: 10,
    username: "vendedor1"
  }

  ngAfterViewInit() {
    this.modalEditarProducto = bootstrap.Modal.getOrCreateInstance(
      document.querySelector('#modal-editar-producto')
    )
  }

  editarProducto() {
    // TODO: pasar producto al componente de editar-producto
    this.modalEditarProducto.show()
  }

}
