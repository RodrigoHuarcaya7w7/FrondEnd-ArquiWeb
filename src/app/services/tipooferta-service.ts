import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoOferta } from '../models/tipooferta';
 
@Injectable({
  providedIn: 'root'
})
export class TipoofertaService {

   private apiUrl = 'http://localhost:8082/api/tipoofertas';  // URL de tu API de tipo ofertas

  constructor(private http: HttpClient) { }

  // Obtener todas las tipo ofertas
  getTipoOfertas(): Observable<TipoOferta[]> {
    return this.http.get<TipoOferta[]>(this.apiUrl);
  }

  // Obtener una tipo oferta por su ID
  getTipoOfertaById(id: number): Observable<TipoOferta> {
    return this.http.get<TipoOferta>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva tipo oferta
  createTipoOferta(tipoOferta: TipoOferta): Observable<TipoOferta> {
    return this.http.post<TipoOferta>(this.apiUrl, tipoOferta);
  }

  // Actualizar una tipo oferta existente
  updateTipoOferta(id: number, tipoOferta: TipoOferta): Observable<TipoOferta> {
    return this.http.put<TipoOferta>(`${this.apiUrl}/${id}`, tipoOferta);
  }

  // Eliminar una tipo oferta por ID
  deleteTipoOferta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
