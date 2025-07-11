import { ImagenProducto } from "./imagenproducto";

 
 

export interface Producto {
  idProducto: number;
 idTipoOferta: number ; // Acepta tipoOferta o null
idCategoria: number ; // Acepta categoria o null
 estado:string;
  precioDescuento: number ;
  fechaRegistro :Date;
  color:  string;
 tamano: string;
 stock: number;
  precio: number;
  nombre: string;
  descripcion: string;

    imagenes?: ImagenProducto[]; 
  }