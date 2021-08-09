import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(
    private http: HttpClient
  ) { }

  comprarProducto(compra:any): Observable<any> {
    return this.http.post(API_BASE + '/ordenes/', compra)
  }
}
