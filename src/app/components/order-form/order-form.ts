
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/producto';
import { OrderDataService } from '../../services/OrderDataService ';
import { ProductoService } from '../../services/producto-service';
import { ProductoReadDTO } from '../../models/ProductoReadDTO ';

@Component({
  selector: 'app-order-form',
  standalone: false,
  templateUrl: './order-form.html',
  styleUrl: './order-form.css'
})
export class OrderForm   implements OnInit {
  form!: FormGroup;
  producto!: ProductoReadDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ps: ProductoService,
    private orderData: OrderDataService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ps.getProductoDetalle(id).subscribe({
      next: data => this.producto = data,
      error: err  => console.error('Error cargando producto:', err)
    });

    this.form = this.fb.group({
      direccion: ['', Validators.required]
    });
  }

  siguiente() {
    if (this.form.invalid) return;

    // Ya no mapeas campos faltantes, solo asignas el DTO completo
    this.orderData.producto  = this.producto;
    this.orderData.direccion = this.form.value.direccion;
    this.router.navigate(['/shop/order/payment']);
  }
}