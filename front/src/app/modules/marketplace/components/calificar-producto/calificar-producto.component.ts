import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/shared/models';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { Router } from '@angular/router';
import { Toast } from 'src/app/shared/mixins';
import Swal from "sweetalert2";

@Component({
  selector: 'app-calificar-producto',
  templateUrl: './calificar-producto.component.html',
  styleUrls: ['./calificar-producto.component.scss']
})
export class CalificarProductoComponent implements OnInit {
  loading = false;
  exform!: FormGroup;

  producto!: Producto;
  calificacion = 0;
  opinion = "";

  constructor(
    private servicioProductos: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exform = new FormGroup({
      'rating' : new FormControl('', Validators.required),
      'comentario': new FormControl('', [Validators.maxLength(200)])
    });
  }

  get rating() {
    return this.exform.get('rating')!;
  }

  get comentario() {
    return this.exform.get('comentario')!;
  }

  onSubmit() {
    this.producto = this.exform.value;
    if (this.exform.invalid) {
      return;
    }
    this.loading = true;
    this.servicioProductos.calificarProducto(this.exform.value, this.producto.id_producto)
      .subscribe(
        respuesta => {
          Toast.fire({
            title: 'Se ha registrado tu opinión. Gracias!',
            icon: 'success'
          })
          this.router.navigate(['/']);
        },
        error => {
          this.loading = false;
          Swal.fire({
            title: '<b>OoPs...</b>',
            html: '<h3>Ha ocurrido un error. Intenta nuevamente.</h3><br>', 
            icon: 'error'
          }) 
        }
      );
  }
}