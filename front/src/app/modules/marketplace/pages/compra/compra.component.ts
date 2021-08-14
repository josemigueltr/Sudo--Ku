import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CartService } from 'src/app/shared/services/cart.service';
import { OrdenesService} from 'src/app/shared/services/ordenes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Item } from 'src/app/shared/models';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})

export class CompraComponent implements OnInit {
  // TODO: vista: comprar producto
  exform!: FormGroup;
  loading=false;
 
  
  constructor(private cartService: CartService,
              private ordenService: OrdenesService,
              private router: Router) { }



  ngOnInit() {

    this.exform = new FormGroup({
      'direccion' : new FormControl('', Validators.required),
      'estado' : new FormControl('', [Validators.required]),
      'entreQueCalles' : new FormControl('', [Validators.required]),
      'codigoPostal' : new FormControl('',[Validators.required]),
      'propietario' : new FormControl('', [Validators.required]),
      'numeroDeTarjeta' : new FormControl('',[
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]),
      'mes' : new FormControl('', [Validators.required]),
      'anio' : new FormControl('', [Validators.required]),
      'cvv' : new FormControl('', [
        Validators.required,Validators.maxLength(3), 
        Validators.minLength(16),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
    });    
  }

    get total(){
      return this.cartService.getTotalPrice()
    }
    get direccion() {
      return this.exform.get('direccion')!;
    }
    get estado() {
      return this.exform.get('estado')!;
    }
  
    get entreQueCalles() {
      return this.exform.get('entreQueCalles')!;
    }
    get codigoPostal() {
      return this.exform.get('codigoPostal')!;
    }

    get propietario() {
      return this.exform.get('propietario')!;
    }

    get numeroDeTarjeta() {
      return this.exform.get('numeroDeTarjeta')!;
    }

    get mes() {
      return this.exform.get('mes')!;
    }

    get anio() {
      return this.exform.get('anio')!;
    }
    get cvv() {
      return this.exform.get('cvv')!;
    }

    get ordenes(){ 
      let items=this.cartService.getItems()
      let productos= items.map((it:Item)=>{
        return { "id_producto": it.producto.id_producto, "cantidad":it.cantidad}
      })
  
      return productos;

    }

    get direccionEnvio(){
      return {
        "direccion": this.direccion.value,
        "estado": this.estado.value,
        "calles" : this.entreQueCalles.value,
        "cp": this.codigoPostal.value                  
      }
    }

    creaCompra(){
      return {
          "productos":this.ordenes,
          "direccion_envio":this.direccionEnvio,
          "comprador":"migueltr"
        }
    }

    
    onSubmit(){
     
      if (this.exform.invalid) {
        return;
      }
     
      let compra=this.creaCompra()
  
    this.loading = true;
    this.ordenService.comprarProducto(compra).subscribe(
      data => {
        this.loading=false
        Swal.fire({
             title: 'Compra Realizada',
             html: `<h3>Muchas gracias por tu compra </h3><br><br> 
             <h2> El monto total fue de: <b>$ ${this.total}</b></h2><br><br> 
             <small> En breve recibiras un correo de confirmación</small><br><br>`,
             icon: 'success'
            }) 
            this.router.navigate(['/catalogo']);
            this.cartService.clearCart();
          },
          err => {
            console.log(err)
            this.loading = false;
            Swal.fire({
                title: '<b>OoPs...</b>',
                html: '<h3>Algo salio mal <br>Por favor intentalo mas tarde </h3><br>', 
                icon: 'error'
              }) 
          });
  }
  }
