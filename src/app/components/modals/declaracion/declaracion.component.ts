import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-declaracion',
  templateUrl: './declaracion.component.html',
  styleUrls: ['./declaracion.component.scss']
})
export class DeclaracionComponent implements OnInit {

  formTab4: FormGroup;
  listDeclaraciones: any = [];
  dataEnviar: any;

  constructor(private fb: FormBuilder, private _generic: GenericService, public dialogRef: MatDialogRef<DeclaracionComponent>) {
    this.formTab4 = this.fb.group({
      descripcion: ['', [Validators.required]],
      otro: [''],
      autorizacion: [false, [Validators.requiredTrue]],
      clausula: [false, [Validators.requiredTrue]]
    })
  }

  ngOnInit(): void {
    this.getListados();
    this.formTab4.controls['otro'].disable();
  }

  getListados() {
    let url = "generic/qry/consulta-lista-generica/DECLARO-INGRESO";
    this._generic.getData(url).subscribe(resp => {
      if (resp) {
        this.listDeclaraciones = resp;
      }else{
        this.listDeclaraciones = [];
      }
      
    })
  }

  habilitar(item: any){
    if (item=='OT') {
      this.formTab4.controls['otro'].enable();
    }else{
      this.formTab4.controls['otro'].disable();
      this.formTab4.patchValue({
        otro: ''
      });
    }
  }

  siguiente(){
    if (this.formTab4.value.otro==undefined) {
      this.dataEnviar = {
        "declaracion": this.formTab4.value.descripcion,
        "otro": ''
      }
    } else {
      this.dataEnviar = {
        "declaracion": this.formTab4.value.descripcion,
        "otro": this.formTab4.value.otro
      }
    }
    this.dialogRef.close(this.dataEnviar)
  }

}
