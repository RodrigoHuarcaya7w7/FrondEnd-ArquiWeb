import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
 
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar'; // Componente de confirmación
import { DetallepedidoService } from '../../../services/detallepedido-service';
import { DetallePedido } from '../../../models/detallepedido';

@Component({
  selector: 'app-listar-detallepedido',
  standalone: false,
  templateUrl: './listar-detallepedido.html',
  styleUrl: './listar-detallepedido.css'
})
export class ListarDetallepedido {

  detallePedidos: DetallePedido[] = [];
  dataSource: MatTableDataSource<DetallePedido> = new MatTableDataSource();
  displayedColumns: string[] = ['idDetalle', 'cantidad', 'precio', 'pedido', 'producto', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private detallePedidoService: DetallepedidoService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarDetallePedidos();
  }

  cargarDetallePedidos() {
    this.detallePedidoService.getDetallePedidos().subscribe({
      next: (data: DetallePedido[]) => {
        this.detallePedidos = data;
        this.dataSource = new MatTableDataSource(this.detallePedidos);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error al cargar los detalles de pedidos', err);
        this.snack.open('Error al cargar los detalles de pedidos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarDetallePedido(id: number) {
    const dialogRef = this.dialog.open(ConfirmacionEliminar);
    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.detallePedidoService.deleteDetallePedido(id).subscribe({
          next: () => {
            this.cargarDetallePedidos(); // Recargar la lista de detalles de pedidos después de eliminar
            this.snack.open('Detalle de pedido eliminado con éxito', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error al eliminar el detalle de pedido', err);
            this.snack.open('No se pudo eliminar el detalle de pedido', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }
}
