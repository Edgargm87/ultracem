import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private _utilityService: UtilityService, private router: Router,) { }

  ngOnInit(): void {

    this.infoauth= JSON.parse(localStorage.getItem('infoauth')+'');
    this.cedula= this.infoauth.nit;
    // this.cedula= '900600256';
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
  gestion(x: number,type:string){
    if(type=='CC'){
      let url=`/main/personanatural/${x}`;
      this.router.navigateByUrl(url);
    }else{
      let url=`/main/personajuridica/${x}`;
      this.router.navigateByUrl(url);
    }

  }

}
