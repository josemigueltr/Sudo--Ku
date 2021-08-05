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
 
  producto: Producto | undefined
  opiniones: Opinion[] | undefined
  
  constructor(
      private servicioProductos: ProductosService,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const id = params.get('id')?.replace(/_/g, ' ') || ''
    this.servicioProductos.verInformacionProducto(id).subscribe(
      data => {
        this.producto = data.producto
        this.opiniones = data.opiniones
      },
      error => {
        Swal.fire({
          title: 'Error del servidor',
          text: 'Por favor, intentalo mas tarde',
          icon: 'error'
        })
      }
    )
    })

  }

  counter(size: number): any[] {
      return new Array(size)
  }

}
