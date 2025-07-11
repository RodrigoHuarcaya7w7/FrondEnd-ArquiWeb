import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Ofertatipoproducto } from '../models/ofertatipoproducto';
import { OfertatipoproductoDTO } from '../models/ofertatipoproductoDTO';

@Injectable({
  providedIn: 'root'
})
export class OfertatipoproductoService {

 private apiUrl = 'http://localhost:8082/api/ofertas-tipo-productos';  // URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener todas las ofertas tipo producto
  getOfertaTipoProductos(): Observable<Ofertatipoproducto[]> {
    return this.http.get<Ofertatipoproducto[]>(this.apiUrl);
  }

  // Obtener una oferta tipo producto por su ID
  getOfertaTipoProductoById(id: number): Observable<Ofertatipoproducto> {
    return this.http.get<Ofertatipoproducto>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva oferta tipo producto
  createOfertaTipoProducto(ofertaTipoProducto: OfertatipoproductoDTO): Observable<Ofertatipoproducto> {
    return this.http.post<Ofertatipoproducto>(this.apiUrl, ofertaTipoProducto);
  }

  // Actualizar una oferta tipo producto
  updateOfertaTipoProducto(id: number, ofertaTipoProducto: Ofertatipoproducto): Observable<Ofertatipoproducto> {
    return this.http.put<Ofertatipoproducto>(`${this.apiUrl}/${id}`, ofertaTipoProducto);
  }

  // Eliminar una oferta tipo producto
  deleteOfertaTipoProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
