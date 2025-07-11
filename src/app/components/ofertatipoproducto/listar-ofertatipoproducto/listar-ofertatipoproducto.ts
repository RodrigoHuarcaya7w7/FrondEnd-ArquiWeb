import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
 
import { ConfirmacionEliminar } from '../../confirmaciones/confirmacion-eliminar/confirmacion-eliminar'; // Componente de confirmación
import { Ofertatipoproducto } from '../../../models/ofertatipoproducto';
import { OfertatipoproductoService } from '../../../services/ofertatipoproducto-service';


@Component({
  selector: 'app-listar-ofertatipoproducto',
  standalone: false,
  templateUrl: './listar-ofertatipoproducto.html',
  styleUrl: './listar-ofertatipoproducto.css'
})
export class ListarOfertatipoproducto {

  xxdsListaOfertatipoproducto = new MatTableDataSource<Ofertatipoproducto>();
  xxdisplayedColumns: string[] = ['id', 'fechaAplicacion', 'producto', 'tipoOferta', 'acciones'];

    @ViewChild(MatPaginator) xxPaginator!: MatPaginator;

  constructor(
    private xxofertaTipoProductoService: OfertatipoproductoService,
    private xxsnap: MatSnackBar,
    private xxdialog: MatDialog,
    
    
  ) {}

  ngOnInit(): void {
    this.xxCargaLista();
  }

  applyFilter(event: Event) {
    const xxfilterValue = (event.target as HTMLInputElement).value;
    this.xxdsListaOfertatipoproducto.filter = xxfilterValue.trim().toLowerCase();
  }

  xxBorrarOfertatipoproducto(id: number) {
    const xxdialogRef = this.xxdialog.open(ConfirmacionEliminar);
    xxdialogRef.afterClosed().subscribe(
      xxopcionSeleccionada => {
        if (xxopcionSeleccionada === true) {
          this.xxofertaTipoProductoService.deleteOfertaTipoProducto(id).subscribe({
            next: () => {
              this.xxCargaLista(); // Recargar la lista después de eliminar
              this.xxsnap.open('Oferta tipo producto eliminada con éxito', 'Cerrar', { duration: 3000 });
            },
            error: (xxerr) => {
              console.error('Error al eliminar la oferta tipo producto', xxerr);
              this.xxsnap.open('No se pudo eliminar la oferta tipo producto', 'Cerrar', { duration: 3000 });
            }
          });
        }
      }
    );
  }

  xxCargaLista() {
    this.xxofertaTipoProductoService.getOfertaTipoProductos().subscribe({
      next: (xxdata: Ofertatipoproducto[]) => {
        this.xxdsListaOfertatipoproducto = new MatTableDataSource(xxdata);
        this.xxdsListaOfertatipoproducto.paginator = this.xxPaginator;
      },
      error: (xxerr) => {
        console.error('Error al cargar las ofertas tipo producto', xxerr);
        this.xxsnap.open('Error al cargar las ofertas tipo producto', 'Cerrar', { duration: 3000 });
      }
    });
  }

}
