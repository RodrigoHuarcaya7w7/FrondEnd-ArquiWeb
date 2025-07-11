// src/app/services/order-data.service.ts
import { Injectable } from '@angular/core';
 
import { MetodoPago } from '../models/metodopago';
import { ProductoReadDTO } from '../models/ProductoReadDTO ';

export interface TarjetaInfo {
  numero: string;
  expiracion: string;
  cvv: string;
    nombreTitular: string;
}

@Injectable({ providedIn: 'root' })
export class OrderDataService {
  producto!: ProductoReadDTO;
  direccion!: string;

  // Aquí guardaremos el objeto MetodoPago seleccionado
  metodoPago!: MetodoPago;

  descripcion!: string;
  tarjetaInfo?: TarjetaInfo;
  
}
