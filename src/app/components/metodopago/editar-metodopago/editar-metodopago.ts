import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetodopagoService } from '../../../services/metodopago-service';
import { TipopagoService } from '../../../services/tipopago-service';
import { MetodoPago } from '../../../models/metodopago';
import { HttpErrorResponse } from '@angular/common/http'; // Importa HttpErrorResponse

@Component({
  selector: 'app-editar-metodopago',
  standalone: false,
  templateUrl: './editar-metodopago.html',
  styleUrl: './editar-metodopago.css'
})
export class EditarMetodopago {

   addEditForm!: FormGroup;
  metodoPagoId: number = 0;
  tiposPago!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private metodoPagoService: MetodopagoService,
    private tipoPagoService: TipopagoService,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarTiposPago();
    this.cargarFormulario();
  }
  cargarTiposPago() {
    this.tipoPagoService.getTipoPagos().subscribe({
      next: (tipos: any[]) => {
        this.tiposPago = tipos;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.snack.open('Error al cargar los tipos de pago', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cargarFormulario() {
    this.addEditForm = this.formBuilder.group({
      idMetodoPago: [''],
      descripcion: ['', Validators.required],
      idTipoPago: ['', Validators.required]
    });

    this.metodoPagoId = parseInt(this.activatedRoute.snapshot.params['id']);

    if (this.metodoPagoId > 0) {
      this.metodoPagoService.getMetodoPagoById(this.metodoPagoId).subscribe({
        next: (data: MetodoPago) => {
          this.addEditForm.patchValue({
            idMetodoPago: data.idMetodoPago,
            descripcion: data.descripcion,
            idTipoPago: data.idTipoPago
          });
        },
        error: (err) => {
          console.error(err);
          this.snack.open('Error al cargar los datos del método de pago', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  grabarMetodoPago() {
    const metodoPago: MetodoPago = {
      
       idMetodoPago: this.addEditForm.get('idMetodoPago')?.value,
      descripcion: this.addEditForm.get('descripcion')?.value,
      idTipoPago: this.addEditForm.get('idTipoPago')?.value
    };

    console.log("Datos enviados:", metodoPago);

    if (this.metodoPagoId > 0) {
      // Actualización de MetodoPago
      this.metodoPagoService.updateMetodoPago(this.metodoPagoId, metodoPago).subscribe({
        next: () => {
          this.router.navigate(['/metodopago']);
          this.snack.open('Método de pago actualizado con éxito', 'OK', { duration: 2000 });
        },
        error: (err) => {
          console.log(err);
          this.snack.open('No se actualizó correctamente el método de pago', 'OK', { duration: 2000 });
        }
      });
    } else {
      // Creación de MetodoPago
      this.metodoPagoService.createMetodoPago(metodoPago).subscribe({
        next: () => {
          this.router.navigate(['/metodopago']);
          this.snack.open('Método de pago registrado con éxito', 'OK', { duration: 2000 });
        },
        error: (err) => {
          console.log(err);
          this.snack.open('No se registró correctamente el método de pago', 'OK', { duration: 2000 });
        }
      });
    }
  }

}
