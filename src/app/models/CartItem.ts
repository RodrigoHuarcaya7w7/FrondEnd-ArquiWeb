import { Producto } from './producto';

export interface CartItem {
  product: Producto;
  quantity: number;
  total: number;
}