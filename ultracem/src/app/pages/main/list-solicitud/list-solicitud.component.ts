import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-list-solicitud',
  templateUrl: './list-solicitud.component.html',
  styleUrls: ['./list-solicitud.component.scss']
})
export class ListSolicitudComponent implements OnInit {
  list: any=[];
  infoauth: any={};
  cedula:string='';
  constructor(private _utilityService: UtilityService) { }

  ngOnInit(): void {
    
    this.infoauth= JSON.parse(localStorage.getItem('infoauth')+'');
    this.cedula= this.infoauth.nit;
    this.solicitudes() 
  }

  
  solicitudes() {
    console.log(this.cedula);
    let url= `generic/qry/cre-solicitudes-cliente/${this.cedula}`;
    this._utilityService.getQuery(url,true).subscribe(resp => {
      let respuesta:any= resp;
      this.list=respuesta.data;
    })
  }

}
