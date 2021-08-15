import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // TODO: vista: iniciar sesión

  username = ''
  password = ''
  tipo = 'comprador'
  loading = false

  constructor(
    private servicio: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  
  }

  iniciarSesion(): void {
    this.loading = true
    this.servicio.iniciarSesion(
      this.username, 
      this.password, 
      this.tipo === 'comprador'
    ).subscribe(
      respuesta => {
        this.loading = false
        localStorage.setItem("token", respuesta.token)
        localStorage.setItem("es_comprador", respuesta.es_comprador)
        this.servicio.isAuthenticated.next(true)
        if (respuesta.es_comprador)
          this.router.navigate(['/catalogo'])
        else
          this.router.navigate(['/vendedor'])
      },
      error => {
        this.loading = false
        console.error(error)
        if (error.status === 401)
          Swal.fire('Lo siento', 'Usuario o contraseña incorrectos', 'error')
        else
          Swal.fire('Error del servidor', 'Por favor, intentalo mas tarde', 'error')
      }
    )
  }
}
