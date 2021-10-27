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
  formModal: FormGroup;

  constructor(private fb: FormBuilder,
    public matDialogRef: MatDialogRef<CargoPublicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _Service: UtilityService) {

    this.formModal = this.fb.group({
      cargo: [''],
      entidad: [''],
      vinculadoActualmente: [''],
      fechaVinculado: [''],
      relacion: [''],
      nombre: [''],
      tipoID: [''],
      documento: [''],
      nacionalidad: [''],
    })
  }

  ngOnInit(): void {
  }

}
