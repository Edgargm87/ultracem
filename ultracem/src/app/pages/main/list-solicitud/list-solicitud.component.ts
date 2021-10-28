import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-list-solicitud',
  templateUrl: './list-solicitud.component.html',
  styleUrls: ['./list-solicitud.component.scss']
})
export class ListSolicitudComponent implements OnInit {
  list: any=[];
  cedula: number=0;

  constructor(private _utilityService: UtilityService) { }

  ngOnInit(): void {
    this.solicitudes() 
    this.cedula=parseInt(localStorage.getItem('infoauth')+'');
  }

  
  solicitudes() {
    
    let url= `generic/qry/cre-solicitudes-cliente/${this.cedula}`;
    this._utilityService.getQuery(url,true).subscribe(resp => {
      let respuesta:any= resp;
      this.list=respuesta.data;
    })
  }

}
