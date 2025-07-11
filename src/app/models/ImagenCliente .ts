import { Cliente } from './cliente';

export interface ImagenCliente {
  idImagenCliente: number;
  nombreArchivo: string;
  urlImagen: string;
  cliente: number;
}