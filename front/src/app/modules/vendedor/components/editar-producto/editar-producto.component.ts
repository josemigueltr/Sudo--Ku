import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'src/app/shared/mixins';
import { Producto } from 'src/app/shared/models';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from 'sweetalert2';

declare const bootstrap: any;

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit, AfterViewInit {
  // TODO vista: editar producto

  // input
  productoValue: Producto | undefined
  @Input()
  set producto(producto: Producto | undefined) {
    this.productoValue = producto
    this.form.patchValue({
      nombre: this.producto?.nombre,
      descripcion: this.producto?.descripcion,
      precio: this.producto?.precio,
      stock: this.producto?.stock
    })
  }
  get producto(): Producto | undefined {
    return this.productoValue
  }

  // output
  @Output() updated = new EventEmitter<Producto>();

  // view childs
  @ViewChild('preview') preview!: ElementRef;

  // properties
  form: FormGroup
  foto: File | undefined
  modal: any
  loading = false

  constructor(
    private servicioProductos: ProductosService
  ) {
    this.form = new FormGroup({
      nombre: new FormControl(this.producto?.nombre, [
        Validators.required,
        Validators.maxLength(200)
      ]),
      descripcion: new FormControl(this.producto?.descripcion, [
        Validators.required,
      ]),
      precio: new FormControl(this.producto?.precio, [
        Validators.required
      ]),
      stock: new FormControl(this.producto?.stock, [
        Validators.required
      ]),
      foto: new FormControl(this.foto)
    })
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.modal = bootstrap.Modal.getOrCreateInstance(
      document.querySelector('#modal-editar-producto')
    )
  }

  // form getters
  get nombre() { return this.form.get('nombre')!; }
  get descripcion() { return this.form.get('descripcion')!; }
  get precio() { return this.form.get('precio')!; }
  get stock() { return this.form.get('stock')!; }
  get fotoForm() { return this.form.get('foto')!; }

  cargaImagen(event: Event) {
    if (!event.target) return
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return
    this.foto = file
    const reader = new FileReader();
    reader.onload = () => {
      this.preview.nativeElement.src = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  editarProducto() {
    // validamos
    if (this.form.status === 'INVALID') {
      Toast.fire({
        title: 'El formulario debe estar bien validado antes de enviar',
        icon: 'error'
      })
    }

    // todo bien validado. Mandamos a editar
    this.loading = true
    this.servicioProductos.editarProducto(
      {...this.form.value, id_producto: this.producto?.id_producto} as Producto, 
      this.foto
    ).subscribe(
      producto => {
        this.loading = false
        Toast.fire({
          title: 'Tus cambios han sido guardados',
          icon: 'success'
        })
        this.updated.emit(producto)
        this.modal.hide()
      },
      error => {
        this.loading = false
        console.log(error)
        Swal.fire('Ocurrió un error en el servidor', 'Por favor, intentalo mas tarde', 'error')
      }
    )
  }

}
