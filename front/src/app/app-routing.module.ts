import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },{
    path: 'auth',
    loadChildren: () => import('./modules/marketplace/marketplace.module').then(m => m.MarketplaceModule)
  },{
    path: 'vendedor',
    loadChildren: () => import('./modules/vendedor/vendedor.module').then(m => m.VendedorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
