// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
 
import { Producto } from '../models/producto';
import { CartItem } from '../models/CartItem';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];

  addToCart(product: Producto, quantity: number): void {
    const existingItem = this.items.find(i => i.product.idProducto === product.idProducto);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.quantity * existingItem.product.precio;
    } else {
      const newItem: CartItem = {
        product,
        quantity,
        total: product.precio * quantity
      };
      this.items.push(newItem);
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.items.find(i => i.product.idProducto === productId);
    if (item) {
      item.quantity = quantity;
      item.total = item.product.precio * quantity;
    }
  }

  removeItem(productId: number): void {
    this.items = this.items.filter(i => i.product.idProducto !== productId);
  }

  getTotal(): number {
    return this.items.reduce((sum, i) => sum + i.total, 0);
  }

  clearCart(): void {
    this.items = [];
  }
}