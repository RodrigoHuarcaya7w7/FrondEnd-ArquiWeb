import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetallePedido } from '../models/detallepedido';
import { DetallePedidoDTO } from '../models/DetallePedidoDTO';
 

@Injectable({
  providedIn: 'root'
})
export class DetallepedidoService {

 
  private apiUrl = 'http://localhost:8082/api/detalle-pedidos';  // URL del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los detalles de pedidos
  getDetallePedidos(): Observable<DetallePedido[]> {
    return this.http.get<DetallePedido[]>(this.apiUrl);
  }

  // Obtener un detalle de pedido por ID
  getDetallePedidoById(id: number): Observable<DetallePedido> {
    return this.http.get<DetallePedido>(`${this.apiUrl}/${id}`);
  }

 createDetallePedidoDesdeDTO(detalleDTO: DetallePedidoDTO): Observable<DetallePedido> {
  return this.http.post<DetallePedido>(this.apiUrl, detalleDTO);
}

  // Actualizar un detalle de pedido
  updateDetallePedido(id: number, detallePedido: DetallePedido): Observable<DetallePedido> {
    return this.http.put<DetallePedido>(`${this.apiUrl}/${id}`, detallePedido);
  }

  // Eliminar un detalle de pedido
  deleteDetallePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
