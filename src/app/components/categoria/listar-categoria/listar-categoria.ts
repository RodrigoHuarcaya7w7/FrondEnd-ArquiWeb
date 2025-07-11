import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria-service';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';

@Component({
  selector: 'app-listar-categoria',
  standalone: false,
  templateUrl: './listar-categoria.html',
  styleUrl: './listar-categoria.css'
})
export class ListarCategoria {


   hgDataSource: MatTableDataSource<Categoria> = new MatTableDataSource();
hgDisplayedColumns: string[] = ['idCategoria', 'nombre', 'descripcion', 'acciones'];

  @ViewChild(MatPaginator) hgPaginator!: MatPaginator;

  constructor(
    private hgCategoriaService: CategoriaService,
    private hgSnackBar: MatSnackBar,
    private hgDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.hgCargarCategorias();
  }

  hgCargarCategorias() {
    this.hgCategoriaService.getCategorias().subscribe((hgData: Categoria[]) => {
      this.hgDataSource = new MatTableDataSource(hgData);
      this.hgDataSource.paginator = this.hgPaginator;

      this.hgDataSource.filterPredicate = (hgData: Categoria, filter: string) => {
        const menor = filter.trim().toLowerCase();
        return hgData.nombre.toLowerCase().includes(menor) || hgData.descripcion.toLowerCase().includes(menor);
      };
    });
  }

  applyFilter(event: Event) {
    const hgrValue = (event.target as HTMLInputElement).value;
    this.hgDataSource.filter = hgrValue;
  }

  hgEliminar(hgId: number) {
    const hgDRef = this.hgDialog.open(ConfirmacionEliminar);
    hgDRef.afterClosed().subscribe((hgDRef) => {
      if (hgDRef) {
        this.hgCategoriaService.deleteCategoria(hgId).subscribe(() => {
          this.hgCargarCategorias();
          this.hgSnackBar.open('Categoría eliminada con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        });
      }
    });
  }

}
