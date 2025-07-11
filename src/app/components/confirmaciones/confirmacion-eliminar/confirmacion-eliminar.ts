import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-eliminar',
  standalone: false,
  templateUrl: './confirmacion-eliminar.html',
  styleUrl: './confirmacion-eliminar.css'
})
export class ConfirmacionEliminar {

    constructor(private dialogRef: MatDialogRef<ConfirmacionEliminar>) {};

  cancelar() {
    this.dialogRef.close(false);
  }


  confirmar() {
    this.dialogRef.close(true);
  }

}
