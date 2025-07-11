 

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from '../../../services/categoria-service';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-editar-categoria',
  standalone: false,
  templateUrl: './editar-categoria.html',
  styleUrl: './editar-categoria.css'
})
export class EditarCategoria {

   addEditForm!: FormGroup;
  categoriaId: number = 0;

  constructor(
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.CargarFormulario();
  }

  CargarFormulario() {
    this.addEditForm = this.formBuilder.group({
      id: [""],
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      descripcion: ["", [Validators.required, Validators.minLength(4)]]
    });

    this.categoriaId = parseInt(this.activatedRoute.snapshot.params["id"]);

    if (this.categoriaId > 0 && this.categoriaId != undefined) {
      this.categoriaService.getCategoriaById(this.categoriaId).subscribe({
        next: (data: Categoria) => {
          this.addEditForm.get("id")?.setValue(data.idCategoria);
          this.addEditForm.get("nombre")?.setValue(data.nombre);
          this.addEditForm.get("descripcion")?.setValue(data.descripcion);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.categoriaId = 0;
    }
  }

  GrabarCategoria() {
    const categoria: Categoria = {
      idCategoria: this.addEditForm.get("id")?.value,
      nombre: this.addEditForm.get("nombre")?.value,
      descripcion: this.addEditForm.get("descripcion")?.value
    };

    if (this.categoriaId > 0) {
      this.categoriaService.updateCategoria(this.categoriaId, categoria).subscribe({
        next: (data: Categoria) => {
          this.router.navigate(["categoria/listar"]);
          this.snack.open("Se actualizó correctamente la categoría", "OK", { duration: 2000 });
        },
        error: (err) => {
          console.log(err);
          this.snack.open("No se actualizó correctamente la categoría", "OK", { duration: 2000 });
        }
      });
    } else {
      this.categoriaService.createCategoria(categoria).subscribe({
        next: (data: Categoria) => {
          this.router.navigate(["categoria/listar"]);
          this.snack.open("Se registró correctamente la categoría", "OK", { duration: 2000 });
        },
        error: (err) => {
          console.log(err);
          this.snack.open("No se registró correctamente la categoría", "OK", { duration: 2000 });
        }
      });
    }
  }

}
