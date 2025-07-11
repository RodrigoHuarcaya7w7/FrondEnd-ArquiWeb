 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImagenCliente } from '../../../models/ImagenCliente ';
import { ImagenclienteService } from '../../../services/imagencliente-service';
import { ClienteService } from '../../../services/cliente-service';
import { ViewChild } from '@angular/core';
import { ImagenClienteDTO } from '../../../models/ImagenClienteDTO';

@Component({
  selector: 'app-editar-imagenclientes',
  standalone: false,
  templateUrl: './editar-imagenclientes.html',
  styleUrl: './editar-imagenclientes.css'
})
export class EditarImagenCliente implements OnInit {
  addEditForm!: FormGroup;
  imagenId: number = 0;
  clientes: any[] = [];

  constructor(
    private imagenService: ImagenclienteService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.CargarFormulario();
    this.cargarClientes();
  }

  CargarFormulario(): void {
    this.addEditForm = this.formBuilder.group({
      id: [''],
      nombreArchivo: ['', [Validators.required]],
      urlImagen: ['', [Validators.required]],
      cliente: ['', [Validators.required]]
    });

    this.imagenId = parseInt(this.activatedRoute.snapshot.params['id']);

    if (this.imagenId > 0) {
      this.imagenService.getById(this.imagenId).subscribe({
        next: (data: ImagenCliente) => {
          this.addEditForm.patchValue({
            id: data.idImagenCliente,
            nombreArchivo: data.nombreArchivo,
            urlImagen: data.urlImagen,
            cliente: data.cliente
          });
             this.previewUrl = data.urlImagen;
        }
      });
    }
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => (this.clientes = data),
      error: (err) => console.error('Error cargando clientes', err)
    });
  }

GrabarImagen(): void {
  if (this.imagenId > 0) {
    // Editar
    const imagen: ImagenCliente = {
      idImagenCliente: this.addEditForm.get('id')?.value,
      nombreArchivo: this.addEditForm.get('nombreArchivo')?.value,
      urlImagen: this.addEditForm.get('urlImagen')?.value,
      cliente: this.addEditForm.get('cliente')?.value // Aquí ya es el ID directo
    };

    this.imagenService.update(this.imagenId, imagen).subscribe({
      next: () => {
        this.router.navigate(['imagenCliente/listar']);
        this.snack.open('Imagen actualizada correctamente', 'OK', { duration: 2000 });
      }
    });
  } else {
    // Crear
    const imagenDto: ImagenClienteDTO = {
      nombreArchivo: this.addEditForm.get('nombreArchivo')?.value,
      urlImagen: this.addEditForm.get('urlImagen')?.value,
      clienteId: this.addEditForm.get('cliente')?.value
    };

    this.imagenService.create(imagenDto).subscribe({
      next: () => {
        this.router.navigate(['imagenCliente/listar']);
        this.snack.open('Imagen registrada correctamente', 'OK', { duration: 2000 });
      }
    });
  }
}

  @ViewChild('fileInput') fileInput!: any;
dropActivo = false;
previewUrl: string | null = null;

onDragOver(event: DragEvent) {
  event.preventDefault();
  this.dropActivo = true;
}

onDragLeave(event: DragEvent) {
  event.preventDefault();
  this.dropActivo = false;
}

onDrop(event: DragEvent) {
  event.preventDefault();
  this.dropActivo = false;
  const archivo = event.dataTransfer?.files[0];
  if (archivo) this.procesarArchivo(archivo);
}

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input?.files?.length) {
    this.procesarArchivo(input.files[0]);
  }
}

procesarArchivo(archivo: File) {
  const reader = new FileReader();
  reader.onload = () => {
    this.previewUrl = reader.result as string;
    this.addEditForm.get('urlImagen')?.setValue(this.previewUrl);
  };
  reader.readAsDataURL(archivo);
}

}
