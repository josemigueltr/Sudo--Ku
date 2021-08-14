import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // TODO: vista: iniciar sesión

  username = ''
  password = ''
  es_comprador = true

  constructor(
    private servicio: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  
  }

  iniciarSesion(): void {
    this.servicio.iniciarSesion(this.username, this.password, this.es_comprador).subscribe(respuesta => {
      localStorage.setItem("token", respuesta.token)
      localStorage.setItem("es_comprador", respuesta.es_comprador)
      if (respuesta.es_comprador)
        this.router.navigate({'/'})
      else
        this.router.navigate({'/vendedor'})
    })
  }

}
