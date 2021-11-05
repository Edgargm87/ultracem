import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-cargo-publico',
  templateUrl: './cargo-publico.component.html',
  styleUrls: ['./cargo-publico.component.scss']
})
export class CargoPublicoComponent implements OnInit {
  formModal_F: FormGroup;
  formModal_P: FormGroup;
  titulo: string = '';


  constructor(private fb: FormBuilder,
    public matDialogRef: MatDialogRef<CargoPublicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _Service: UtilityService) {

    this.formModal_F = this.fb.group({
      tipo: data.tipo,
      relacion: ['' ,[Validators.required]],
      nombre: ['', [Validators.required]],
      tipoID: ['',[Validators.required]],
      documento: ['',[Validators.required]],
      nacionalidad: ['',[Validators.required]],
      entidad: ['',[Validators.required]],
      vinculadoActualmente: ['',[Validators.required]],
      fechaVinculado: [''],
    })
    this.formModal_P = this.fb.group({
      tipo: data.tipo,
      cargo: ['',[Validators.required]],
      entidad: ['',[Validators.required]],
      vinculadoActualmente: ['',[Validators.required]],
      fechaVinculado: [''],
    })
  }

  ngOnInit(): void {
    if (this.data.tipo == 'P') {
      this.titulo = "Datos del cargo público";
    } else {
      this.titulo = "Datos de persona expuesta política y públicamente";
    }
  }

}
