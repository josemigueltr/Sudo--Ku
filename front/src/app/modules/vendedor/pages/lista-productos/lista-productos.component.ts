import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/shared/models';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from "sweetalert2";

declare const bootstrap: any;

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements AfterViewInit {
  // TODO vista: lista de productos de vendedor

  modalEditarProducto: any;
  modalAgregarProducto: any;
  productos: Producto[] = [];

  headElements = ['#', 'Nombre', 'Precio', 'Calificacion', 'Stock', 'Action'];

  productoSeleccionado: Producto | undefined = {
    id_producto: 1,
    calificacion: 0,
    descripcion: "¡COMIENZA EL JUEGO! El gabinete Blade 2101 está pensado para competir en el mercado de los gabinetes de entrada su principal atractivo es el precio, este Gabinete te permite un buen manejo de cables, flujo de aire y espacio para tarjetas de video de tamaño grande.",
    foto: "https://ebarrotes.s3.us-west-1.amazonaws.com/assets/gabinete1.webp",
    nombre: "Gabinete Yeyian Blad",
    precio: 819.0,
    stock: 10,
    username: "vendedor1"
  }

  constructor(
    private servicioProductos: ProductosService
  ){}

  ngOnInit(): void {
    this.servicioProductos.consultarListaProductosDeVendedor().subscribe(
      productos => this.productos = productos,
      error =>{
        console.error(error);
        console.log(this.productos);
        this.productos = []
        Swal.fire({
          title: 'Error del servidor',
          text: 'Por favor, inténtalo mas tarde',
          icon: 'error'
        })
      })
  }

  ngAfterViewInit() {
     this.modalEditarProducto = bootstrap.Modal.getOrCreateInstance(
     document.querySelector('#modal-editar-producto')
     )
  }


  agregarProducto() {
    // TODO: pasar producto al agregar de editar-producto
    this.modalAgregarProducto.show()
  }

  editarProducto(id:any) {
    // TODO: pasar producto al componente de editar-producto
    this.productoSeleccionado = this.productos.filter( (e) => {return e.id_producto == id} )[0] ;
    this.modalEditarProducto.show()
  }

  eliminarproducto(id:any){
    this.servicioProductos.eliminarProducto(id)
      .subscribe(
        data =>{
          this.productos =  this.productos.filter( (e)=> {return e['id_producto'] != id})
          this.productos = [...this.productos];

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
    })}


  }
