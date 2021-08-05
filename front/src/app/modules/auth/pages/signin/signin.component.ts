import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comprador } from 'src/app/shared/models';
import {AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  roles=['comprador','vendedor']
  loading=false;
  exform!: FormGroup;
  usuario!:Comprador;
  usernameDuplicado=false;
  correoDuplicado=false;

  constructor(
    private servicioAuth: AuthService,
    private router: Router
  ){}
  
  ngOnInit() {

  this.exform = new FormGroup({
    'username' : new FormControl('', Validators.required),
    'rol' : new FormControl('', [Validators.required]),
    'correo' : new FormControl('', [Validators.required, Validators.email]),
    'telefono' : new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
      ]),
  });
  }

  get username() {
    return this.exform.get('username')!;
  }
  get correo() {
    return this.exform.get('correo')!;
  }

  get telefono() {
    return this.exform.get('telefono')!;
  }
  get rol() {
    return this.exform.get('rol')!;
  }

  cambiaCorreo(){
    this.correoDuplicado=false
  }

  cambiaUsername(){
    this.usernameDuplicado=false
  }

  
  onSubmit() {

    this.usuario=this.exform.value; 
    console.log(this.usuario) 

    if (this.exform.invalid) {
      return;
  }

    this.loading = true;
    this.servicioAuth.registrarse(this.usuario)
      .subscribe(
          data => {
            this.loading=false
            Swal.fire({
              title: 'Exito',
              html: `<h3>Gracias por registrarte como: <b>${this.rol.value}</b></h3><br><br> 
                     <small> Se ha enviado un correo de confirmación a : </small><br><br>
                     <b>${this.correo.value}</b><br><br>
                     <small> En el correo encontrarás la información necesaria para acceder al sistema </small>`,
              icon: 'success'
            }) 
            this.router.navigate(['/auth/login']);
          },
          err => {
            this.loading = false;
            if(err.status===400){
                err.error.includes("correo") ? this.correoDuplicado=true: this.usernameDuplicado=true
              }
            else{
              Swal.fire({
                title: '<b>OoPs...</b>',
                html: '<h3>Algo salio mal <br>Por favor intentalo mas tarde </h3><br>', 
        
                icon: 'error'
              }) 
            }

          });

  }
 

}

