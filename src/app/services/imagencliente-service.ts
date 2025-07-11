import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { ImagenCliente } from '../models/ImagenCliente ';
import { Observable } from 'rxjs';
import { ImagenClienteDTO } from '../models/ImagenClienteDTO';

@Injectable({
  providedIn: 'root'
})
export class ImagenclienteService {

  
    private apiUrl = 'http://localhost:8082/api/imagenes-cliente';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ImagenCliente[]> {
    return this.http.get<ImagenCliente[]>(this.apiUrl);
  }

  getById(id: number): Observable<ImagenCliente> {
    return this.http.get<ImagenCliente>(`${this.apiUrl}/${id}`);
  }

  create(imagen: ImagenClienteDTO): Observable<ImagenCliente> {
    return this.http.post<ImagenCliente>(this.apiUrl, imagen);
  }

  update(id: number, imagen: ImagenCliente): Observable<ImagenCliente> {
    return this.http.put<ImagenCliente>(`${this.apiUrl}/${id}`, imagen);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByCliente(idCliente: number): Observable<ImagenCliente[]> {
    return this.http.get<ImagenCliente[]>(`${this.apiUrl}/cliente/${idCliente}`);
  }

}
