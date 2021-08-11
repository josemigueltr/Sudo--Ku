import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  // TODO vista: lista de productos de vendedor
  constructor(private productosService:ProductosService) {

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

  eliminarproducto(id:any){
    this.productosService.eliminarProducto(id)
    .subscribe(
      data =>{

        //Aqui falta tener una funcion para poder  actualizar la lista de productos y 
        //se actualice la vista

        Swal.fire(
          'Exito!',
          'El producto ha sido eliminado',
          'success'
        )
      },
      err =>{
        Swal.fire({
          title: '<b>OoPs...</b>',
          html: '<h3>Algo salio mal <br>Por favor intentalo mas tarde </h3><br>', 
          icon: 'error'
        }) 
      }
    )  

  }

  elimina(id:any){
    Swal.fire({
      title: 'Estas seguro que quieres eliminar este producto?',
      text:"La accion no se puede revertir" ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarproducto(id)

      }
    })
  }

}
