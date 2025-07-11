 

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ImagenclienteService } from '../../../services/imagencliente-service';
import { ImagenCliente } from '../../../models/ImagenCliente ';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';

@Component({
  selector: 'app-listar-imagenclientes',
  standalone: false,
  templateUrl: './listar-imagenclientes.html',
  styleUrl: './listar-imagenclientes.css'
})
export class ListarImagenclientes implements OnInit {
  hgDataSource: MatTableDataSource<ImagenCliente> = new MatTableDataSource();
  hgDisplayedColumns: string[] = ['idImagenCliente', 'nombreArchivo', 'urlImagen', 'cliente', 'acciones'];

  @ViewChild(MatPaginator) hgPaginator!: MatPaginator;

  constructor(
    private hgImagenClienteService: ImagenclienteService,
    private hgSnackBar: MatSnackBar,
    private hgDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.hgCargarImagenes();
  }

  hgCargarImagenes() {
    this.hgImagenClienteService.getAll().subscribe((hgData: ImagenCliente[]) => {
      this.hgDataSource = new MatTableDataSource(hgData);
      this.hgDataSource.paginator = this.hgPaginator;

      this.hgDataSource.filterPredicate = (data: ImagenCliente, filter: string) => {
        const val = filter.trim().toLowerCase();
        return data.nombreArchivo.toLowerCase().includes(val) || data.urlImagen.toLowerCase().includes(val);
      };
    });
  }

  applyFilter(event: Event) {
    const hgrValue = (event.target as HTMLInputElement).value;
    this.hgDataSource.filter = hgrValue;
  }

  hgEliminar(hgId: number) {
    const hgDRef = this.hgDialog.open(ConfirmacionEliminar);
    hgDRef.afterClosed().subscribe((result) => {
      if (result) {
        this.hgImagenClienteService.delete(hgId).subscribe(() => {
          this.hgCargarImagenes();
          this.hgSnackBar.open('Imagen eliminada correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        });
      }
    });
  }
}