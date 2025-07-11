import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
 
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ImagenproductoService } from '../../../services/imagenproducto-service';
import { ImagenProducto } from '../../../models/imagenproducto';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listar-imagenproducto',
  standalone: false,
  templateUrl: './listar-imagenproducto.html',
  styleUrl: './listar-imagenproducto.css'
})
export class ListarImagenProductoComponent implements OnInit {
  dataSource: MatTableDataSource<ImagenProducto> = new MatTableDataSource();
  displayedColumns: string[] = ['idImagenProducto', 'urlImagen', 'descripcion', 'idProducto', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private imagenService: ImagenproductoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarImagenes();
  }

  cargarImagenes(): void {
    this.imagenService.getImagenes().subscribe((data: ImagenProducto[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

      this.dataSource.filterPredicate = (img: ImagenProducto, filter: string) => {
        const val = filter.trim().toLowerCase();
        return img.urlImagen.toLowerCase().includes(val) ||
               img.descripcion.toLowerCase().includes(val) ||
               img.idProducto.toString().includes(val);
      };
    });
  }

  applyFilter(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(id: number): void {
    this.imagenService.deleteImagen(id).subscribe(() => {
      this.snackBar.open('Imagen eliminada correctamente', 'Cerrar', { duration: 3000 });
      this.cargarImagenes();
    });
  }
}