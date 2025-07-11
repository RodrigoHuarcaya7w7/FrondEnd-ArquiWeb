import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { Observable } from 'rxjs';
import { ImagenProducto } from '../models/imagenproducto';
import { ImagenProductoDTO } from '../models/ImagenProductoDTO';

@Injectable({
  providedIn: 'root'
})
export class ImagenproductoService {

 
  private apiUrl = 'http://localhost:8082/api/imagenes-producto';


   constructor(private http: HttpClient) {}

  // GET: retorna entidades completas
  getImagenes(): Observable<ImagenProducto[]> {
    return this.http.get<ImagenProducto[]>(this.apiUrl);
  }

  getImagenById(id: number): Observable<ImagenProducto> {
    return this.http.get<ImagenProducto>(`${this.apiUrl}/${id}`);
  }

  // POST: usa DTO
  createImagen(dto: ImagenProductoDTO): Observable<ImagenProducto> {
    return this.http.post<ImagenProducto>(this.apiUrl, dto);
  }

  // PUT: entidad completa
  updateImagen(id: number, imagen: ImagenProducto): Observable<ImagenProducto> {
    return this.http.put<ImagenProducto>(`${this.apiUrl}/${id}`, imagen);
  }

  // DELETE: por ID
  deleteImagen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}