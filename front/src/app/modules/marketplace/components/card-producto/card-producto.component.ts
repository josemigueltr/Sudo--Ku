import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/shared/models';

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.scss']
})
export class CardProductoComponent {

  // inputs
  @Input() producto: Producto | undefined

  constructor() { }

  counter(size: number): any[] {
    return new Array(size)
  }

}
