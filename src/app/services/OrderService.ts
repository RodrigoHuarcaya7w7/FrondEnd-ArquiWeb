// src/app/services/order.service.ts
import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';
import { Pedido }       from '../models/pedido';
import { PedidoRequestDTO } from '../models/PedidoRequestDTO';
 

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'http://localhost:8082/api/pedidos';

  constructor(private http: HttpClient) {}

  placeOrder(request: PedidoRequestDTO): Observable<Pedido> {
    return this.http.post<Pedido>(this.baseUrl, request);
  }

  getOrdersByCliente(id: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/cliente/${id}`);
  }

  // Opcional: endpoints admins
  adminCreate(dto: any) {
    return this.http.post<Pedido>(`${this.baseUrl}/admin`, dto);
  }
}
