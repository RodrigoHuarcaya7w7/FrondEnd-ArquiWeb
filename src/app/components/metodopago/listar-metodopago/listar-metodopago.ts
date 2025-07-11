 
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MetodoPago } from '../../../models/metodopago';
import { MetodopagoService } from '../../../services/metodopago-service';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';


@Component({
  selector: 'app-listar-metodopago',
  standalone: false,
  templateUrl: './listar-metodopago.html',
  styleUrl: './listar-metodopago.css'
})
export class ListarMetodopago {
  metodosPago: MetodoPago[] = [];
  dataSource: MatTableDataSource<MetodoPago> = new MatTableDataSource();
  displayedColumns: string[] = ['idMetodoPago', 'descripcion', 'tipoPago', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private metodoPagoService: MetodopagoService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarMetodosPago();
  }

  cargarMetodosPago() {
    this.metodoPagoService.getMetodosPago().subscribe({
      next: (data: MetodoPago[]) => {
        this.metodosPago = data;
        this.dataSource = new MatTableDataSource(this.metodosPago);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error al cargar los métodos de pago', err);
        this.snack.open('Error al cargar los métodos de pago', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarMetodoPago(id: number) {
    const dialogRef = this.dialog.open(ConfirmacionEliminar);
    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.metodoPagoService.deleteMetodoPago(id).subscribe({
          next: () => {
            this.cargarMetodosPago(); // Recargar la lista de métodos de pago después de eliminar
            this.snack.open('Método de pago eliminado con éxito', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error al eliminar el método de pago', err);
            this.snack.open('No se pudo eliminar el método de pago', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

}
