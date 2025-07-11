import { Component ,OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-usuario',
  standalone: false,
  templateUrl: './producto-usuario.html',
  styleUrl: './producto-usuario.css'
})
export class ProductoUsuario  implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.productoService.getProductosConImagen()
      .subscribe(data => this.productos = data);
  }

  seleccionar(p: Producto) {
this.router.navigate(['/shop/order', p.idProducto]);
  }
}