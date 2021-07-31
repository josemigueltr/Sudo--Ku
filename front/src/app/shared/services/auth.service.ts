import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  registrarse(): Observable<any> {
    return this.http.post('', {})
  }

  iniciarSesion(): Observable<any> {
    return this.http.post('', {})
  }

  cerrarSesion(): Observable<any> {
    return this.http.post('', {})
  }
}
