import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar'; // Componente de confirmación
import { TipoOferta } from '../../../models/tipooferta';
import { TipoofertaService } from '../../../services/tipooferta-service';


@Component({
  selector: 'app-listar-tipooferta',
  standalone: false,
  templateUrl: './listar-tipooferta.html',
  styleUrl: './listar-tipooferta.css'
})
export class ListarTipooferta {

   tipoOfertas: TipoOferta[] = [];
  dataSource: MatTableDataSource<TipoOferta> = new MatTableDataSource();
  displayedColumns: string[] = ['idOfertaTipoProducto', 'nombre', 'descripcion', 'importe', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tipoOfertaService: TipoofertaService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarTipoOfertas();
  }

  cargarTipoOfertas() {
    this.tipoOfertaService.getTipoOfertas().subscribe({
      next: (data: TipoOferta[]) => {
        this.tipoOfertas = data;
        this.dataSource = new MatTableDataSource(this.tipoOfertas);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error al cargar los tipos de oferta', err);
        this.snack.open('Error al cargar los tipos de oferta', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarTipoOferta(id: number) {
    const dialogRef = this.dialog.open(ConfirmacionEliminar);
    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.tipoOfertaService.deleteTipoOferta(id).subscribe({
          next: () => {
            this.cargarTipoOfertas(); // Recargar la lista después de eliminar
            this.snack.open('Tipo de oferta eliminado con éxito', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error al eliminar el tipo de oferta', err);
            this.snack.open('No se pudo eliminar el tipo de oferta', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

}
