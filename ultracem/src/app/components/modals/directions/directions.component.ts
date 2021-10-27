import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements OnInit {


  listadoTipoVia: any;
  // datos!: { callePrincipal: any; tipovia: any; numero: any; numero2: any; complemento: any; viaNombre: any; }; 

  constructor(
    public matDialogRef: MatDialogRef<DirectionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _Service: UtilityService) { }

  ngOnInit(): void {
    // this.datos = this.data;
    // this.datos = {
    //   callePrincipal: '',
    //   tipovia: '',
    //   numero: '',
    //   numero2: '',
    //   complemento: ''
    // }

  }

  consultaTipoVia(data: any) {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._Service
      .getQuery(`/nomenclarturas-direcciones/${data}`, true)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listadoTipoVia = response.data;
        } else {
          this.listadoTipoVia = [];
        }
      });
  }


  // nombreVia(dato: string) {
  //   let index = this.listadoTipoVia.findIndex((data: { id: string; }) => data.id == dato);
  //   let retu='';
  //   if (index != -1) {
  //     retu = this.listadoTipoVia[index].nombre;

  //   } else {
  //     retu = '';
  //   }
  //   this.datos.viaNombre = retu;
  // }

}
