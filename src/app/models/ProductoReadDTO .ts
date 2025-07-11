import { ImagenProductoDTO } from "./ImagenProductoDTO";

 

export interface ProductoReadDTO {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  idCategoria: number;
  imagenes: ImagenProductoDTO[];
}
