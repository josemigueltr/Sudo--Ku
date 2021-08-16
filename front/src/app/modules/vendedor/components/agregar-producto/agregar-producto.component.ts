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

  @Output() updated = new EventEmitter<Producto>();
  @ViewChild('preview') preview!: ElementRef;

  form: FormGroup
  foto: File | undefined
  modal: any
  loading = false


  constructor(
    private servicioProductos: ProductosService
  ) {
    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(200)
      ]),
      descripcion: new FormControl('', [
        Validators.required,
      ]),
      precio: new FormControl('', [
        Validators.required
      ]),
      stock: new FormControl('', [
        Validators.required
      ]),
      foto: new FormControl(this.foto)
    })
  }

  ngOnInit(): void {

  }


  ngAfterViewInit() {
    this.modal = bootstrap.Modal.getOrCreateInstance(
      document.querySelector('#modal-agregar-producto')
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

  agregarProducto(){

    // validamos
    if (this.form.status === 'INVALID') {
      Toast.fire({
        title: 'El formulario debe estar bien validado antes de enviar',
        icon: 'error'
      })
    }



    this.loading = true
    console.log({...this.form.value});

    this.servicioProductos.agregarProducto(
      {...this.form.value } as Producto,
      this.foto
    ).subscribe(
      producto => {
        this.loading = false
        Toast.fire({
          title: 'El producto se ha registrado con éxito.',
          icon: 'success'
        })
        // this.updated.emit(producto)
        this.form.reset();
        this.updated.emit(producto)
        this.modal.hide();

      },
      error => {
        this.loading = false
        console.log(error)
        Swal.fire('Ocurrió un error en el servidor', 'Por favor, intentalo mas tarde', 'error')
      }
    )

  }






}
