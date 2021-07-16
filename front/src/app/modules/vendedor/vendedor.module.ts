import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendedorRoutingModule } from './vendedor-routing.module';
import { ListaProductosComponent } from './pages/lista-productos/lista-productos.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './components/eliminar-producto/eliminar-producto.component';

@NgModule({
  declarations: [
    ListaProductosComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    EliminarProductoComponent
  ],
  imports: [
    CommonModule,
    VendedorRoutingModule
  ]
})
export class VendedorModule { }
