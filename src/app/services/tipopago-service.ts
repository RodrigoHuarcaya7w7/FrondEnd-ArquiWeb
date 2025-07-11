import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoPago } from '../models/tipopago';
 

@Injectable({
  providedIn: 'root'
})
export class TipopagoService {

  private apiUrl = 'http://localhost:8082/api/tipo-pagos'; // URL del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los tipos de pago
  getTipoPagos(): Observable<TipoPago[]> {
    return this.http.get<TipoPago[]>(this.apiUrl);
  }

  
  // Obtener un tipo de pago por ID
  getTipoPagoById(id: number): Observable<TipoPago> {
    return this.http.get<TipoPago>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo tipo de pago
  createTipoPago(tipoPago: TipoPago): Observable<TipoPago> {
    return this.http.post<TipoPago>(this.apiUrl, tipoPago);
  }

  // Actualizar un tipo de pago existente
  updateTipoPago(id: number, tipoPago: TipoPago): Observable<TipoPago> {
    return this.http.put<TipoPago>(`${this.apiUrl}/${id}`, tipoPago);
  }

  // Eliminar un tipo de pago por ID
  deleteTipoPago(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
