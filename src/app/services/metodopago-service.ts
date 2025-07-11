import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetodoPago } from '../models/metodopago';
 

@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {


  private apiUrl = 'http://localhost:8082/api/metodos-pago'; // URL del backend


  constructor(private http: HttpClient) { }

  // Obtener todos los métodos de pago
  getMetodosPago(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(this.apiUrl);
  }

  // Obtener un método de pago por su ID
  getMetodoPagoById(id: number): Observable<MetodoPago> {
    return this.http.get<MetodoPago>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo método de pago
createMetodoPago(metodoPago: MetodoPago): Observable<MetodoPago> {
  // No enviar idMetodoPago al crear
  return this.http.post<MetodoPago>(this.apiUrl, metodoPago);
}
  // Actualizar un método de pago existente
  updateMetodoPago(id: number, metodoPago: MetodoPago): Observable<MetodoPago> {
    return this.http.put<MetodoPago>(`${this.apiUrl}/${id}`, metodoPago);
  }

  // Eliminar un método de pago
  deleteMetodoPago(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
