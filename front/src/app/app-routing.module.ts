import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/marketplace/marketplace.module').then(m => m.MarketplaceModule),
    canActivate: [AuthGuard]
  },{
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },{
    path: 'vendedor',
    loadChildren: () => import('./modules/vendedor/vendedor.module').then(m => m.VendedorModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
