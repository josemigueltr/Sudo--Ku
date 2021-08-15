import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'src/app/shared/mixins';
import { Producto } from 'src/app/shared/models';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from 'sweetalert2'

declare const bootstrap: any;


@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {
  // TODO vista: agregar producto

  constructor(
    private servicioProductos: ProductosService
  ) { }

  ngOnInit(): void {

  }


  ngAfterViewInit() {
  }






}
