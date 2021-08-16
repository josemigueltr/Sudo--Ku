import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlreadyLoggedGuard } from './shared/guards/already-logged.guard';
import { CompradorGuard } from './shared/guards/comprador.guard';
import { VendedorGuard } from './shared/guards/vendedor.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/marketplace/marketplace.module').then(m => m.MarketplaceModule),
    canActivate: [CompradorGuard]
  },{
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AlreadyLoggedGuard]
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
