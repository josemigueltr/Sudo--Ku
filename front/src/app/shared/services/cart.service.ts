import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/shared/models';
import { Item } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})


export class CartService {

    items:Item[];
  
  
    constructor() {
      this.items=this.getCart()
    }
  
    getCart() {
      let cart= localStorage.getItem("cart");
      if(cart){
        return JSON.parse(cart);
      }
      return [];
    }
    
    saveCart() {
     localStorage.setItem("cart", JSON.stringify(this.items));
    }

  addToCart(prod: Producto) {
    
    //Busco que es producto no este agregado
    const prodExist = this.getProduct(prod)
    //Si no tenemos agregado el producto
    if (!prodExist) {
      this.items.push({producto:prod, cantidad:1}); 
      this.saveCart();
      return;
   }
    prodExist.cantidad += 1;
    this.saveCart();
  }

  
  getProduct(prod: Producto){
    return this.items.find( ({ producto }) => producto.id_producto === prod.id_producto)
  }


  getItems() {
      return this.items;
    }
  
  
    getTotalPrice(){
      let Total = 0;
      this.items.map((it:Item)=>{
        Total += it.producto.precio * it.cantidad;
      })
      return Total;
    }


  removeItem(item:Item){
    this.items.map((it:Item, index:any)=>{
      if(item.producto.id_producto === it.producto.id_producto){
        this.items.splice(index,1);
        this.saveCart();
        return;
      }
    })
  }


  clearCart() {
    this.items = [];
    return this.items;
  }
}
