
 

export interface PedidoRequestDTO {
  direccion: string;
  cliente: number;       // idCliente (lo tomaremos de localStorage)
  idMetodoPago: number;
  idProducto: number;
}
