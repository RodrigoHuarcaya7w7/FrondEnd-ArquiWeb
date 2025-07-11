import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ofertatipoproducto } from '../../../models/ofertatipoproducto';
import { OfertatipoproductoService } from '../../../services/ofertatipoproducto-service';
import { ProductoService } from '../../../services/producto-service';
import { TipoofertaService } from '../../../services/tipooferta-service';
import { Producto } from '../../../models/producto';
import { TipoOferta } from '../../../models/tipooferta';

@Component({
  selector: 'app-editar-ofertatipoproducto',
  standalone: false,
  templateUrl: './editar-ofertatipoproducto.html',
  styleUrl: './editar-ofertatipoproducto.css'
})
export class EditarOfertatipoproducto implements OnInit {

  ofertaId: number = 0;
  form!: FormGroup;

  productos: Producto[] = [];
  tipoOfertas: TipoOferta[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ofertaService: OfertatipoproductoService,
    private productoService: ProductoService,
    private tipoOfertaService: TipoofertaService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.loadProductos();
    this.loadTipoOfertas();
  }

  loadForm(): void {
    this.form = this.fb.group({
      idProducto: ['', Validators.required],
      idTipoOferta: ['', Validators.required],
      fechaAplicacion: ['', Validators.required]
    });

    this.ofertaId = parseInt(this.route.snapshot.params['id']);

    if (this.ofertaId > 0) {
      this.ofertaService.getOfertaTipoProductoById(this.ofertaId).subscribe({
        next: (data) => {
          this.form.patchValue({
            idProducto: data.idProducto,
            idTipoOferta: data.idTipoOferta,
            fechaAplicacion: data.fechaAplicacion
          });
        },
        error: (err) => console.error(err)
      });
    }
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  loadTipoOfertas(): void {
    this.tipoOfertaService.getTipoOfertas().subscribe({
      next: (data) => (this.tipoOfertas = data),
      error: (err) => console.error('Error cargando tipo ofertas', err)
    });
  }

   grabar(): void {
  // Obtener los valores del formulario
  const idProducto = this.form.get('idProducto')?.value;
  const idTipoOferta = this.form.get('idTipoOferta')?.value;
  const fechaOriginal = this.form.get('fechaAplicacion')?.value;

  // Convertimos la fecha a formato ISO compatible con LocalDateTime
  const fechaAplicacionISO = new Date(fechaOriginal).toISOString();

  const dto = {
    idProducto: idProducto,
    idTipoOferta: idTipoOferta,
    fechaAplicacion: fechaAplicacionISO
  };

  if (this.ofertaId > 0) {
    const actualizacion = {
      idOfertaTipoProducto: this.ofertaId,
      ...dto
    };

    this.ofertaService.updateOfertaTipoProducto(this.ofertaId, actualizacion).subscribe({
      next: () => {
        this.snack.open('Oferta actualizada con éxito', 'OK', { duration: 2000 });
        this.router.navigate(['/OfertaTipoProducto/listar']);
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Error al actualizar la oferta', 'OK', { duration: 2000 });
      }
    });
  } else {
    this.ofertaService.createOfertaTipoProducto(dto).subscribe({
      next: () => {
        this.snack.open('Oferta registrada con éxito', 'OK', { duration: 2000 });
        this.router.navigate(['/OfertaTipoProducto/listar']);
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Error al registrar la oferta', 'OK', { duration: 2000 });
      }
    });
  }
}
}