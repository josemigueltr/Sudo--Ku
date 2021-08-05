import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Producto, Opinion} from 'src/app/shared/models';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion-producto',
  templateUrl: './informacion-producto.component.html',
  styleUrls: ['./informacion-producto.component.scss']
})
export class InformacionProductoComponent implements OnInit {
  // TODO: vista: ver información del producto
 
  producto: Producto | undefined
  opiniones: Opinion[] | undefined
  
  constructor(
      private servicioProductos: ProductosService,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


  }

}
