import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImagenproductoService } from '../../../services/imagenproducto-service';
import { ImagenProducto } from '../../../models/imagenproducto';
import { ImagenProductoDTO } from '../../../models/ImagenProductoDTO';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto-service';

@Component({
  selector: 'app-editar-imagenproducto',
  standalone: false,
  templateUrl: './editar-imagenproducto.html',
  styleUrl: './editar-imagenproducto.css'
})
export class EditarImagenProductoComponent implements OnInit {
  formImagen!: FormGroup;
  esEdicion = false;
  id!: number;
  productos: Producto[] = [];

   constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ImagenproductoService,
    private productoService: ProductoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formImagen = this.fb.group({
      urlImagen: ['', Validators.required],
      descripcion: [''],
      idProducto: [null, Validators.required]
    });

    this.cargarProductos();

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId;
      this.esEdicion = true;
      this.service.getImagenById(this.id).subscribe((data: ImagenProducto) => {
        this.formImagen.patchValue(data);
      });
    }
  }

  cargarProductos(): void {
this.productoService.getProductos().subscribe((lista: Producto[]) => {
  this.productos = lista;
});
}

  cargarArchivo(event: Event): void {
  const archivo = (event.target as HTMLInputElement).files?.[0];
  if (archivo) {
    const reader = new FileReader();
    reader.onload = () => {
      const imagenBase64 = reader.result;
      this.formImagen.patchValue({ urlImagen: imagenBase64 });
    };
    reader.readAsDataURL(archivo); // convierte imagen a Base64
  }
}

  guardar(): void {
    const valores = this.formImagen.value;

    if (this.esEdicion) {
    const imagenActualizada: ImagenProducto = {
  idImagenProducto: this.id,
  urlImagen: valores.urlImagen,
  descripcion: valores.descripcion,
  idProducto: valores.idProducto
};

      this.service.updateImagen(this.id, imagenActualizada).subscribe(() => {
        this.snackBar.open('Imagen actualizada correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/ImagenProducto/listar']);
      });
    } else {
      const dto: ImagenProductoDTO = {
        urlImagen: valores.urlImagen,
        descripcion: valores.descripcion,
        idProducto: valores.idProducto
      };

      this.service.createImagen(dto).subscribe(() => {
        this.snackBar.open('Imagen creada correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/ImagenProducto/listar']);
      });
    }
  }
}