export interface PedidoDTO {
  direccion: string;
  fecha: Date;
  estado: string;
  monto: number;
  clienteId: number;
  metodoPagoId: number;
}