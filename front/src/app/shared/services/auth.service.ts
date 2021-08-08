import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comprador } from 'src/app/shared/models';
import { API_BASE } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  registrarse(user:Comprador): Observable<any> {
    return this.http.post(API_BASE + '/auth/signin', user)
  }

  iniciarSesion(): Observable<any> {
    return this.http.post('', {})
  }

  cerrarSesion(): Observable<any> {
    return this.http.post('', {})
  }
}
