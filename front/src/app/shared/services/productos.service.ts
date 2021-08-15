import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from '../constants';
import { Producto, ProductoOpinion } from '../models';

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

  verInformacionProducto(id: number): Observable<ProductoOpinion> {
    return this.http.get<ProductoOpinion>(`${API_BASE}/productos/${id}`)
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
    if (foto) {
      data.append('foto', foto)
      console.log('si hay foto')
    }

    return this.http.put<Producto>(`${API_BASE}/productos/${producto.id_producto}`, data)
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${API_BASE}/productos/${id}`)
  }

  calificarProducto(): Observable<any> {
    return this.http.post('', {})
  }


  consultarListaProductosDeVendedor(): Observable<Producto[]> {
    return this.http.get<Producto[]>(API_BASE + '/productos/productos-vendedor')
  }

}
