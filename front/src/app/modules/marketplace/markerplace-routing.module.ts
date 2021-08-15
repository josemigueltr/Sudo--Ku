import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CompraComponent } from './pages/compra/compra.component';
import { InformacionProductoComponent } from './components/informacion-producto/informacion-producto.component';
import { MasVendidosComponent } from "./components/mas-vendidos/mas-vendidos.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalogo'
  },{
    path: 'catalogo',
    component: CatalogoComponent
  },{
    path: 'carrito',
    component: CarritoComponent
  },{
    path: 'compra',
    component: CompraComponent
  },{
    path: 'busqueda/:busqueda',
    component: BusquedaComponent
  }, {
    path: 'mas-vendidos',
    component: MasVendidosComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
