import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
 
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../../services/cliente-service';
import { CategoriaService } from '../../../services/categoria-service';
import { TipoofertaService } from '../../../services/tipooferta-service';
import { Cliente } from '../../../models/cliente';
import { Categoria } from '../../../models/categoria';
import { TipoOferta } from '../../../models/tipooferta';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
 
import { PedidoService } from '../../../services/pedido-service';
import { MetodopagoService } from '../../../services/metodopago-service';

@Component({
  selector: 'app-editar-pedido',
  standalone: false,
  templateUrl: './editar-pedido.html',
  styleUrl: './editar-pedido.css'
})
export class EditarPedido {

  formPedido!: FormGroup;
  pedidoId!: number;
  currentDateTimeLocal!: string;

  // Para combos desplegables
  clientes: any[] = [];
  metodosPago: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private metodoPagoService: MetodopagoService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
       this.currentDateTimeLocal = new Date().toISOString().slice(0,16);
const param = this.route.snapshot.paramMap.get('id');
this.pedidoId = param ? +param : 0;

    this.formPedido = this.fb.group({
      direccion: ['', Validators.required],
       fecha: [ this.currentDateTimeLocal, Validators.required ],
      estado: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(0)]],
      clienteId: [null, Validators.required],
      metodoPagoId: [null, Validators.required]
    });

// 👉 solo cargar si es edición
if (this.pedidoId > 0) {
  this.cargarPedido();
}

this.clienteService.getClientes().subscribe(data => (this.clientes = data));
this.metodoPagoService.getMetodosPago().subscribe(data => (this.metodosPago = data));
}

  cargarPedido(): void {
    this.pedidoService.getPedidoById(this.pedidoId).subscribe(p => {
      this.formPedido.patchValue({
        direccion: p.direccion,
        fecha: p.fecha,
        estado: p.estado,
        monto: p.monto,
        clienteId: p.cliente,
        metodoPagoId: p.metodoPago
      });
    });
  }

 guardarPedido(): void {
  const dto = this.formPedido.value;

  // MODO EDICIÓN
  if (this.pedidoId > 0) {
    this.pedidoService.updatePedido(this.pedidoId, dto).subscribe({
      next: () => {
        this.snack.open('Pedido actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/pedidos/listar']);
      },
      error: (err) => {
        console.error('Error al actualizar pedido', err);
        this.snack.open('No se pudo actualizar el pedido', 'Cerrar', { duration: 3000 });
      }
    });
  } 
  
  // MODO CREACIÓN
  else {
    this.pedidoService.createPedido(dto).subscribe({
      next: () => {
        this.snack.open('Pedido creado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/pedidos/listar']);
      },
      error: (err) => {
        console.error('Error al crear pedido', err);
        this.snack.open('No se pudo crear el pedido', 'Cerrar', { duration: 3000 });
      }
    });
  }
}

}
