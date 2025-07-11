import { Component, OnInit }      from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router }                 from '@angular/router';
import { CommonModule }           from '@angular/common';
import { MatFormFieldModule }     from '@angular/material/form-field';
import { MatSelectModule }        from '@angular/material/select';
import { MatRadioModule }         from '@angular/material/radio';
import { MatInputModule }         from '@angular/material/input';
import { MatButtonModule }        from '@angular/material/button';
import { MetodoPago } from '../../models/metodopago';
import { OrderDataService,TarjetaInfo  } from '../../services/OrderDataService ';
import { MetodopagoService } from '../../services/metodopago-service';
import { PaymentService } from '../../services/PaymentService ';
import { TipoPago } from '../../models/tipopago';
import { TipopagoService } from '../../services/tipopago-service';
import { forkJoin } from 'rxjs';
 


 interface MetodoConTipo {
  metodo: MetodoPago;
  tipo: TipoPago;
}

@Component({
  selector: 'app-payment-select',
   standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './payment-select.html',
  styleUrl: './payment-select.css'
})
export class PaymentSelect     implements OnInit {
  form!: FormGroup;
  metodosConNombre: Array<MetodoPago & { nombrePago: string }> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService,
    private tipoPagoService: TipopagoService,
    private orderData: OrderDataService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      metodoPago:    [null as MetodoPago | null, Validators.required],
      numero:        ['', Validators.required],
      expiracion:    ['', Validators.required],
      cvv:           ['', Validators.required],
      nombreTitular: ['', Validators.required]
    });

    forkJoin({
      metodos: this.paymentService.getMetodosPago(),
      tipos:   this.tipoPagoService.getTipoPagos()
    }).subscribe(({ metodos, tipos }) => {
  console.log('metodos:', metodos);
  console.log('tipos:', tipos);

  const tipoMap = new Map<number,string>();
  tipos.forEach((t: TipoPago) => {
    console.log(`tipo ${t.idTipoPago} => ${t.nombrePago}`);
    tipoMap.set(t.idTipoPago, t.nombrePago);
  });

  this.metodosConNombre = metodos.map((m: MetodoPago) => {
    const nombre = tipoMap.get(m.idTipoPago);
    console.log(`metodo ${m.idMetodoPago} usa idTipoPago=${m.idTipoPago} => nombre='${nombre}'`);
    return {
      ...m,
      nombrePago: nombre ?? 'Desconocido'
    };
  });
});
  }

  siguiente(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const m = this.form.value.metodoPago as MetodoPago;
    this.orderData.metodoPago  = m;
    this.orderData.descripcion =
      `Número: ${this.form.value.numero} | Vence: ${this.form.value.expiracion} | ` +
      `CVV: ${this.form.value.cvv} | Titular: ${this.form.value.nombreTitular}`;
    this.router.navigate(['/shop/order/review']);
  }
}