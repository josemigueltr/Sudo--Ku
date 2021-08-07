import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from '../constants';
import { Producto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private http: HttpClient
  ) { }

  consultarProductosMasVendidos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(API_BASE + '/productos/mas-vendidos')
  }

  consultarListaProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(API_BASE + '/productos/')
  }

  buscarProducto(busqueda: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${API_BASE}/productos/search/${busqueda}`)
  }

  verInformacionProducto(): Observable<Producto> {
    return this.http.get<Producto>('')
  }

  agregarProducto(): Observable<any> {
    return this.http.post('', {})
  }

  editarProducto(producto: Producto, foto: File | undefined): Observable<Producto> {
    const data = new FormData();
    data.append('nombre', producto.nombre)
    data.append('descripcion', producto.descripcion)
    data.append('precio', producto.precio.toFixed(2))
    data.append('stock', producto.stock.toString())
    if (foto) data.append('foto', foto)

    // agregando autorizacion al header (hardcodeado)
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2ZW5kZWRvcjEiLCJpYXQiOjE1MTYyMzkwMjJ9.pp5DktBII_cFDrWhD0Oz9_F9UB0Eb3zlYYgGJR3Etns')
    
    return this.http.put<Producto>(`${API_BASE}/productos/${producto.id_producto}`, data, {headers})
  }

  eliminarProducto(): Observable<any> {
    return this.http.delete('')
  }

  calificarProducto(): Observable<any> {
    return this.http.post('', {})
  }
}
