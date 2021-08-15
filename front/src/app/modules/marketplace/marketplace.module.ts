import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { MasVendidosComponent } from './components/mas-vendidos/mas-vendidos.component';
import { InformacionProductoComponent } from './pages/informacion-producto/informacion-producto.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MarketplaceRoutingModule } from './markerplace-routing.module';
import { CalificarProductoComponent } from './components/calificar-producto/calificar-producto.component';
import { CompraComponent } from './pages/compra/compra.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { CardProductoComponent } from './components/card-producto/card-producto.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    CatalogoComponent,
    MasVendidosComponent,
    InformacionProductoComponent,
    CarritoComponent,
    CalificarProductoComponent,
    CompraComponent,
    BusquedaComponent,
    CardProductoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MarketplaceRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MarketplaceModule { }
