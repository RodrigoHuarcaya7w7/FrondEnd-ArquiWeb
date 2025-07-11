import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from '../../../models/pedido';
import { PedidoService } from '../../../services/pedido-service';

@Component({
  selector: 'app-listar-pedido',
  standalone: false,
  templateUrl: './listar-pedido.html',
  styleUrl: './listar-pedido.css'
})
export class ListarPedido {
 pedidos: Pedido[] = [];
  dataSource: MatTableDataSource<Pedido> = new MatTableDataSource();
  displayedColumns: string[] = ['idPedido', 'fecha', 'estado', 'monto', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pedidoService: PedidoService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidoService.getPedidos().subscribe({
      next: (data: Pedido[]) => {
        this.pedidos = data;
        this.dataSource = new MatTableDataSource(this.pedidos);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error al cargar los pedidos', err);
        this.snack.open('Error al cargar los pedidos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarPedido(id: number) {
    const dialogRef = this.dialog.open(ConfirmacionEliminar);
    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.pedidoService.deletePedido(id).subscribe({
          next: () => {
            this.cargarPedidos(); // Recargar pedidos después de eliminar
            this.snack.open('Pedido eliminado con éxito', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error al eliminar el pedido', err);
            this.snack.open('No se pudo eliminar el pedido', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

}
