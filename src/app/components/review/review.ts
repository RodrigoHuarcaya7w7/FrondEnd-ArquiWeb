import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido-service';
import { OrderDataService } from '../../services/OrderDataService ';



@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.html',
  styleUrl: './review.css'
})
export class Review {

 constructor(
    public orderData: OrderDataService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  confirmar() {
    const dto = {
      direccion: this.orderData.direccion,
      cliente: Number(localStorage.getItem('user_id')),
      idMetodoPago: this.orderData.metodoPago.idMetodoPago,
      idProducto: this.orderData.producto.idProducto
    };
    this.pedidoService.placeOrder(dto).subscribe(() => {
      this.router.navigate(['/shop/order/thanks']);
    });
  }
}