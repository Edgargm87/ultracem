import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericService } from 'src/app/services/generic.service';
import { UtilityService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-moneda-extranjera',
  templateUrl: './moneda-extranjera.component.html',
  styleUrls: ['./moneda-extranjera.component.scss']
})
export class MonedaExtranjeraComponent implements OnInit {
  formModal: FormGroup;
  titulo: string = '';


  constructor(private fb: FormBuilder,
    public matDialogRef: MatDialogRef<MonedaExtranjeraComponent>,
    public _generic: GenericService,
    @Inject(MAT_DIALOG_DATA) public data: any, private _Service: UtilityService) {


      // validacion  requerida   de campos   de formulario 

      
    this.formModal = this.fb.group({
     
      entidad: ['' ,[Validators.required]],
      producto: ['', [Validators.required]],
      numeroProducto: [null,[Validators.required]],
      ciudad: ['',[Validators.required]],
      pais: ['',[Validators.required]],
      moneda: ['',[Validators.required]], 
      monto: ['',[Validators.required]],
    })
  }

  ngOnInit(): void {

  }


}
