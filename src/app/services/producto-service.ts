import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoDTO } from '../models/productDTO';
import { ProductoReadDTO } from '../models/ProductoReadDTO ';
 
@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private apiUrl = 'http://localhost:8082/api/productos'; // Cambia a la URL de tu API

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoDetalle(id: number): Observable<ProductoReadDTO> {
  return this.http.get<ProductoReadDTO>(`${this.apiUrl}/con-imagenes/${id}`);
}

  getProductosConImagen(): Observable<Producto[]> {
  return this.http.get<Producto[]>(`${this.apiUrl}/con-imagenes`);
}

  /*
getProductoDetalle(id: number): Observable<Producto> {
  return this.http.get<Producto>(`${this.apiUrl}/detalle/${id}`);
}
*/
 
  getByCategoria(catId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/categoria/${catId}`);
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }


  getProductoById(id: number): Observable<Producto> {
  return this.http.get<Producto>(`${this.apiUrl}/${id}`);
}

  createProducto(producto: ProductoDTO): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  updateProducto(id: number, producto: ProductoDTO): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}