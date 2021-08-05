import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [NavbarComponent, TruncatePipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent, TruncatePipe
  ]
})
export class SharedModule { }
