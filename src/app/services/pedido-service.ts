import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido'; // Importa el modelo Pedido
import { PedidoDTO } from '../models/PedidoDTO ';
import { PedidoRequestDTO } from '../models/PedidoRequestDTO';
 

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

    private apiUrl = 'http://localhost:8082/api/pedidos';  // Cambia esto con la URL de tu API


      placeOrder(req: PedidoRequestDTO): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, req);
  }

  constructor(private http: HttpClient) { }

  // Obtener todos los pedidos
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  // Obtener un pedido por ID
  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo pedido
  createPedido(pedido: PedidoDTO): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  // Actualizar un pedido existente
  updatePedido(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido);
  }

  // Eliminar un pedido por ID
  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener pedidos por estado (e.g., 'CREADO', 'PAGADO')
  getPedidosByEstado(estado: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/estado/${estado}`);
  }

}
