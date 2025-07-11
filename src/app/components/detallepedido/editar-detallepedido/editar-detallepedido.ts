import { Component, OnInit, ViewChild } from '@angular/core';
 
import { MatSnackBar } from '@angular/material/snack-bar';
 
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
 
import { DetallepedidoService } from '../../../services/detallepedido-service';
import { DetallePedidoDTO } from '../../../models/DetallePedidoDTO';
import { PedidoService } from '../../../services/pedido-service';
import { ProductoService } from '../../../services/producto-service';

@Component({
  selector: 'app-editar-detallepedido',
  standalone: false,
  templateUrl: './editar-detallepedido.html',
  styleUrl: './editar-detallepedido.css'
})
export class EditarDetallepedido implements OnInit {
  formDetalle!: FormGroup;
  esEdicion = false;
  idDetalle!: number;

  pedidos: any[] = [];
productos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: DetallepedidoService,
    private snack: MatSnackBar,
      private pedidoService: PedidoService,
  private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.formDetalle = this.fb.group({
      cantidad: [1, Validators.required],
      precio: [0, Validators.required],
      total: [{ value: 0, disabled: true }],
      idPedido: [null, Validators.required],
      idProducto: [null, Validators.required]
    });

    this.formDetalle.get('cantidad')?.valueChanges.subscribe(_ => this.calcularTotal());
    this.formDetalle.get('precio')?.valueChanges.subscribe(_ => this.calcularTotal());
  // Cargar combos
  this.pedidoService.getPedidos().subscribe(data => this.pedidos = data);
  this.productoService.getProductos().subscribe(data => this.productos = data);
  
    const param = this.route.snapshot.paramMap.get('id');
    this.idDetalle = param ? +param : 0;
    this.esEdicion = this.idDetalle > 0;

    // TODO: si es edición, cargar data con this.service.getDetallePedidoById(...)
  }

  calcularTotal(): void {
    const { cantidad, precio } = this.formDetalle.value;
    const total = cantidad * precio;
    this.formDetalle.patchValue({ total }, { emitEvent: false });
  }

  guardar(): void {
    const dto: DetallePedidoDTO = this.formDetalle.getRawValue();

    this.service.createDetallePedidoDesdeDTO(dto).subscribe({
      next: () => {
        this.snack.open('Detalle creado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/DetallePedido/listar']);
      },
      error: () => {
        this.snack.open('Error al crear detalle', 'Cerrar', { duration: 3000 });
      }
    });
  }
}