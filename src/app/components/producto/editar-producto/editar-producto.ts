import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto-service';
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

@Component({
  selector: 'app-editar-producto',
  standalone: false,
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export class EditarProducto {
   
  addEditForm!: FormGroup;
  productoId: number = 0;
  clientes: Cliente[] = [];
  categorias: Categoria[] = [];
  tipoOfertas: TipoOferta[] = [];
  selectedCliente: Cliente | null = null;
  selectedCategoria: Categoria | null = null;
  selectedTipoOferta: TipoOferta | null = null;

  constructor(
    private productoService: ProductoService,

    private categoriaService: CategoriaService,
    private tipoOfertaService: TipoofertaService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

ngOnInit() {
  this.CargarFormulario();
  this.CargarCategorias();
  this.CargarTipoOfertas();
}




CargarCategorias() {
  this.categoriaService.getCategorias().subscribe({
    next: (data) => {
      console.log('Categorías cargadas:', data);
      this.categorias = data;
    },
    error: (err) => console.log('Error al cargar categorías', err)
  });
}

CargarTipoOfertas() {
  this.tipoOfertaService.getTipoOfertas().subscribe({
    next: (data: TipoOferta[]) => {
      console.log('Tipos de ofertas cargados:', data);
      this.tipoOfertas = data;
    },
    error: (err) => console.log('Error al cargar tipos de ofertas', err)
  });
}

CargarFormulario() {
  this.addEditForm = this.formBuilder.group({
    id: [""],
    nombre: ["", [Validators.required, Validators.minLength(2)]],
    descripcion: ["", [Validators.required, Validators.minLength(4)]],
    precio: ["", [Validators.required, Validators.min(0)]],
    precioDescuento: [""],
    stock: ["", [Validators.required, Validators.min(1)]],
    estado: ["", [Validators.required]],
      color: ["", [Validators.required]], 
        tamano: ["", [Validators.required]],
    fechaRegistro: ["", [Validators.required]],
    idCategoria: ["", [Validators.required]],
    idTipoOferta: ["", [Validators.required]]
  });

  this.productoId = parseInt(this.activatedRoute.snapshot.params["id"]);


if (this.productoId > 0) {
  this.productoService.getProductoById(this.productoId).subscribe({
    next: (data: Producto) => {
      this.addEditForm.get("id")?.setValue(data.idProducto);
      this.addEditForm.get("idTipoOferta")?.setValue(data.idTipoOferta);
 this.addEditForm.get("idCategoria")?.setValue(data.idCategoria);  // Usar el ID
      this.addEditForm.get("estado")?.setValue(data.estado);
      this.addEditForm.get("precioDescuento")?.setValue(data.precioDescuento);
      this.addEditForm.get("fechaRegistro")?.setValue(data.fechaRegistro);
      this.addEditForm.get("stock")?.setValue(data.stock);
      this.addEditForm.get("precio")?.setValue(data.precio);
      this.addEditForm.get("nombre")?.setValue(data.nombre);
      this.addEditForm.get("descripcion")?.setValue(data.descripcion);
    },
    error: (err) => {
      console.log(err);
    }
  });
  }
}

  GrabarProducto() {
      const producto: Producto = {
    idProducto: this.addEditForm.get("id")?.value,
    idTipoOferta: this.addEditForm.get("idTipoOferta")?.value, // ID de tipo de oferta
    idCategoria: this.addEditForm.get("idCategoria")?.value, // ID de categoría
    estado: this.addEditForm.get("estado")?.value,
    precioDescuento: this.addEditForm.get("precioDescuento")?.value,
    fechaRegistro: this.addEditForm.get("fechaRegistro")?.value,
    stock: this.addEditForm.get("stock")?.value,
    precio: this.addEditForm.get("precio")?.value,
    descripcion: this.addEditForm.get("descripcion")?.value,
    nombre: this.addEditForm.get("nombre")?.value,
    color: this.addEditForm.get("color")?.value,
    tamano: this.addEditForm.get("tamano")?.value
  };

  if (this.productoId > 0) {
    this.productoService.updateProducto(this.productoId, producto).subscribe({
      next: (data: Producto) => {
        this.router.navigate(["producto/listar"]);
        this.snack.open("Se actualizó correctamente el producto", "OK", { duration: 2000 });
      },
      error: (err) => {
        console.log(err);
        this.snack.open("No se actualizó correctamente el producto", "OK", { duration: 2000 });
      }
    });
  } else {
    this.productoService.createProducto(producto).subscribe({
      next: (data: Producto) => {
        this.router.navigate(["producto/listar"]);
        this.snack.open("Se registró correctamente el producto", "OK", { duration: 2000 });
      },
      error: (err) => {
        console.log(err);
        this.snack.open("No se registró correctamente el producto", "OK", { duration: 2000 });
      }
    });
  }
}
}