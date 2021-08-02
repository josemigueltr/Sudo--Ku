import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private http: HttpClient
  ) { }

  consultarProductosMasVendidos(): Observable<Producto[]> {
    return this.http.get<Producto[]>('')
  }

  consultarListaProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>('http://localhost:5000/productos/')
  }

  buscarProducto(busqueda: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`http://localhost:5000/productos/search/${busqueda}`)
  }

  verInformacionProducto(): Observable<Producto> {
    return this.http.get<Producto>('')
  }

  agregarProducto(): Observable<any> {
    return this.http.post('', {})
  }

  editarProducto(): Observable<Producto> {
    return this.http.put<Producto>('', {})
  }

  eliminarProducto(): Observable<any> {
    return this.http.delete('')
  }

  calificarProducto(): Observable<any> {
    return this.http.post('', {})
  }
}
