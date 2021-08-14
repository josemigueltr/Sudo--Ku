import { Component, OnInit } from '@angular/core';
import {CartService } from 'src/app/shared/services/cart.service';
import { Item } from 'src/app/shared/models';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  // TODO: vista: comprar producto
 
  listProducts=this.cartService.getItems();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {}
  
  getTotal(){
    return this.cartService.getTotalPrice()
  }
  
  totalProduct(item:Item){
    return item.cantidad*item.producto.precio

  }
  

  stock(a:any) {}

  removeItem(item:Item){
    this.cartService.removeItem(item);
  }
}
