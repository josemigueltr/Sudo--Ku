import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  // TODO vista: lista de productos de vendedor
  constructor() {

  }

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
  ] ;

  ngOnInit(): void {

  }

}
