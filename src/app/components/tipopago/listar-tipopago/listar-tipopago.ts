import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoPago } from '../../../models/tipopago';
import { TipopagoService } from '../../../services/tipopago-service';
@Component({
  selector: 'app-listar-tipopago',
  standalone: false,
  templateUrl: './listar-tipopago.html',
  styleUrl: './listar-tipopago.css'
})
export class ListarTipopago {

  
  tipoPagos: TipoPago[] = [];
  dataSource: MatTableDataSource<TipoPago> = new MatTableDataSource();
  displayedColumns: string[] = ['idTipoPago', 'nombrePago', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tipoPagoService: TipopagoService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarTipoPagos();
  }

  cargarTipoPagos() {
    this.tipoPagoService.getTipoPagos().subscribe({
      next: (data: TipoPago[]) => {
        this.tipoPagos = data;
        this.dataSource = new MatTableDataSource(this.tipoPagos);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error al cargar los tipos de pago', err);
        this.snack.open('Error al cargar los tipos de pago', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarTipoPago(id: number) {
    const dialogRef = this.dialog.open(ConfirmacionEliminar);
    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.tipoPagoService.deleteTipoPago(id).subscribe({
          next: () => {
            this.cargarTipoPagos(); // Recargar la lista de tipos de pago después de eliminar
            this.snack.open('Tipo de pago eliminado con éxito', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error al eliminar el tipo de pago', err);
            this.snack.open('No se pudo eliminar el tipo de pago', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

}
