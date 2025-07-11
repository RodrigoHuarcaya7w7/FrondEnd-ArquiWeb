import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoofertaService } from '../../../services/tipooferta-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TipoOferta } from '../../../models/tipooferta';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-tipooferta',
  standalone: false,
  templateUrl: './editar-tipooferta.html',
  styleUrl: './editar-tipooferta.css'
})
export class EditarTipooferta {

   addEditForm!: FormGroup;
  tipoOfertaId: number = 0;
 
  constructor(
    private formBuilder: FormBuilder,
    private tipoOfertaService: TipoofertaService,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.addEditForm = this.formBuilder.group({
      idTipoOferta: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      importe: ['', [Validators.required, Validators.pattern('^[0-9]*\\.?[0-9]+$')]]  // Validar que sea un número
    });

    this.tipoOfertaId = parseInt(this.activatedRoute.snapshot.params['id']);

    if (this.tipoOfertaId > 0 && this.tipoOfertaId != undefined) {
      this.tipoOfertaService.getTipoOfertaById(this.tipoOfertaId).subscribe({
        next: (data: TipoOferta) => {
          this.addEditForm.get('idTipoOferta')?.setValue(data.idTipoOferta);
          this.addEditForm.get('nombre')?.setValue(data.nombre);
          this.addEditForm.get('descripcion')?.setValue(data.descripcion);
          this.addEditForm.get('importe')?.setValue(data.importe);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  grabarTipoOferta() {
    const tipoOferta: TipoOferta = {
      idTipoOferta: this.addEditForm.get('idTipoOferta')?.value,
      nombre: this.addEditForm.get('nombre')?.value,
      descripcion: this.addEditForm.get('descripcion')?.value,
      importe: this.addEditForm.get('importe')?.value
    };

    if (this.tipoOfertaId > 0) {
      this.tipoOfertaService.updateTipoOferta(this.tipoOfertaId, tipoOferta).subscribe({
        next: () => {
          this.router.navigate(['/tipooferta/listar']);
          this.snack.open('Tipo de Oferta actualizado con éxito', 'OK', { duration: 2000 });
        },
        error: (err) => {
          console.log(err);
          this.snack.open('No se actualizó correctamente el tipo de oferta', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.tipoOfertaService.createTipoOferta(tipoOferta).subscribe({
        next: () => {
          this.router.navigate(['/tipooferta/listar']);
          this.snack.open('Tipo de Oferta registrado con éxito', 'OK', { duration: 2000 });
        },
        error: (err) => {
          console.log(err);
          this.snack.open('No se registró correctamente el tipo de oferta', 'OK', { duration: 2000 });
        }
      });
    }
  }
}
