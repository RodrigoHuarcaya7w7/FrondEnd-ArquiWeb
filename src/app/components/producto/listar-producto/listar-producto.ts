 
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto-service';
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar';
import { Cliente } from '../../../models/cliente';
import { Categoria } from '../../../models/categoria';
import { TipoOferta } from '../../../models/tipooferta';
import { ClienteService } from '../../../services/cliente-service';
import { CategoriaService } from '../../../services/categoria-service';
import { TipoofertaService } from '../../../services/tipooferta-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-producto',
  standalone: false,
  templateUrl: './listar-producto.html',
  styleUrl: './listar-producto.css'
})
export class ListarProducto {

  displayedColumns: string[] = ['idProducto', 'idOfertaTipoProducto','categoria','estado','precioDescuento','fechaRegistro','color','tamano','stock','precio','nombre','descripcion','acciones'];
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  clientes: Cliente[] = [];
  categorias: Categoria[] = [];
  tipoOfertas: TipoOferta[] = [];

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private categoriaService: CategoriaService,
    private tipoOfertaService: TipoofertaService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.CargarProductos();
    this.CargarClientes();
    this.CargarCategorias();
    this.CargarTipoOfertas();
  }

  // Cargar productos desde el servicio
  CargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.log(err)
    });
  }

  // Cargar clientes
  CargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
      },
      error: (err) => console.log(err)
    });
  }

  // Cargar categorías
  CargarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data;
      },
      error: (err) => console.log(err)
    });
  }

  // Cargar tipos de ofertas
  CargarTipoOfertas() {
    this.tipoOfertaService.getTipoOfertas().subscribe({
      next: (data: TipoOferta[]) => {
        this.tipoOfertas = data;
      },
      error: (err) => console.log(err)
    });
  }

  // Filtro para la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para eliminar un producto
  eliminarProducto(productoId: number) {
    const confirmDialog = this.dialog.open(ConfirmacionEliminar);
    confirmDialog.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.productoService.deleteProducto(productoId).subscribe({
          next: () => {
            this.CargarProductos();
            this.snack.open('Producto eliminado con éxito', 'Cerrar', {
              duration: 2000
            });
          },
          error: (err) => {
            console.error(err);
            this.snack.open('Hubo un error al eliminar el producto', 'Cerrar', {
              duration: 2000
            });
          }
        });
      }
    });
  }
}
