 
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { TipopagoService } from '../../../services/tipopago-service';
import { TipoPago } from '../../../models/tipopago';


@Component({
  selector: 'app-editar-tipopago',
  standalone: false,
  templateUrl: './editar-tipopago.html',
  styleUrl: './editar-tipopago.css'
})
export class EditarTipopago implements OnInit {
  addEditForm!: FormGroup;
  tipoPagoId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private tipoPagoService: TipopagoService,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario(): void {
    this.addEditForm = this.formBuilder.group({
      idTipoPago: [''],
      nombrePago: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.tipoPagoId = parseInt(this.activatedRoute.snapshot.params['id']);

    if (this.tipoPagoId > 0) {
      this.tipoPagoService.getTipoPagoById(this.tipoPagoId).subscribe({
        next: (data: TipoPago) => {
          this.addEditForm.patchValue({
            idTipoPago: data.idTipoPago,
            nombrePago: data.nombrePago
          });
        },
        error: (err) => {
          console.error('Error al cargar tipo de pago', err);
        }
      });
    }
  }

  grabarTipoPago(): void {
    const tipoPago: TipoPago = this.addEditForm.value;

    const peticion = this.tipoPagoId > 0
      ? this.tipoPagoService.updateTipoPago(this.tipoPagoId, tipoPago)
      : this.tipoPagoService.createTipoPago(tipoPago);

    peticion.subscribe({
      next: () => {
        const mensaje = this.tipoPagoId > 0 ? 'actualizado' : 'registrado';
        this.router.navigate(['/TipoPago/listar']);
        this.snack.open(`Tipo de pago ${mensaje} con éxito`, 'OK', { duration: 2000 });
      },
      error: (err) => {
        console.error('Error al guardar tipo de pago', err);
        this.snack.open('No se pudo completar la operación', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
