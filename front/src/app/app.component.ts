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
    console.log(token !== null)
    this.servicioAuth.isAuthenticated.next(token !== null)
   }
}
