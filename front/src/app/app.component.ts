import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private servicioAuth: AuthService
  ) {}

   ngOnInit() {
    const token = localStorage.getItem('token')
    const es_comprador = JSON.parse(localStorage.getItem('es_comprador') || 'false')
    this.servicioAuth.isAuthenticated.next(token !== null)
    this.servicioAuth.isComprador.next(es_comprador)
   }
}
