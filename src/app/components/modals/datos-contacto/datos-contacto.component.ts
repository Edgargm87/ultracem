import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-datos-contacto',
  templateUrl: './datos-contacto.component.html',
  styleUrls: ['./datos-contacto.component.scss']
})
export class DatosContactoComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DatosContactoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    //validacion   
    this.form = this.fb.group({
      telefono: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(7)]],
      celular: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(11)]],
      email: ['', [Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]]
    })
  }


  ngOnInit(): void {
  }

  // se obtiene  valores  de los controles aun estando deshabiliados  co el metodogetraw
  onActualizar(): void {
    const datos = this.form.getRawValue();
    datos.tipoDocumento = this.data.tipoDocumento;
    datos.cerrar = true;
    this.dialogRef.close(datos);
  }

  onCerrar(): void {
    const datos: any = {
      cerrar: false,
      tipoDocumento: this.data.tipoDocumento
    }
    this.dialogRef.close(datos);
  }

}
