import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comprador } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  roles = ['comprador','vendedor']
  loading = false;
  exform!: FormGroup;

  usuario!: Comprador;
  contrasena = '';
  es_comprador = true;

  constructor(
    private servicioAuth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exform = new FormGroup({
      'username' : new FormControl('', Validators.required),
      'rol': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
  }

  get username() {
    return this.exform.get('username')!;
  }

  get rol() {
    return this.exform.get('rol')!;
  }

  get password() {
    return this.exform.get('password')!;
  }

  onSubmit() {
    this.usuario = this.exform.value;
    if (this.exform.invalid) {
      return;
    }
    this.loading = true;
    this.servicioAuth.iniciarSesion(this.usuario, this.contrasena, this.es_comprador)
      .subscribe(
        respuesta => {
          localStorage.setItem("token", respuesta.token)
          localStorage.setItem("es_comprador", respuesta.es_comprador)
          if (respuesta.es_comprador) {
            this.router.navigate(['/catalogo']);
          }
          else {
            this.router.navigate(['/vendedor']);
          }
        },
        err => {
          this.loading = false;
          if (err.status === 401) {
            Swal.fire({
              title: '<b>OoPs...</b>',
              html: '<h3>Usuario o contraseña incorrectos. Intenta nuevamente.</h3><br>', 
              icon: 'error'
            }) 
          }
          else {
            Swal.fire({
              title: '<b>OoPs...</b>',
              html: '<h3>No se ha podido iniciar sesión. Intenta nuevamente.</h3><br>', 
              icon: 'error'
            })
          }
        }
      );
  }
}