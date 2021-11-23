import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-solicitud',
  templateUrl: './list-solicitud.component.html',
  styleUrls: ['./list-solicitud.component.scss']
})
export class ListSolicitudComponent implements OnInit {
  list: any = [];
  infoauth: any = {};
  cedula: string = '';
  constructor(
    private _utilityService: UtilityService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.infoauth = JSON.parse(localStorage.getItem('infoauth') + '');
    this.cedula = this.infoauth.nit;
    this.solicitudes()
  }

  onCerrar(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('closeSession');
    localStorage.removeItem('infoauth');
    this.router.navigateByUrl('/login');
  }


  solicitudes() {
    Swal.fire({ title: 'Cargando', html: 'Cargando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    console.log(this.cedula);
    let url = `generic/qry/cre-solicitudes-cliente/${this.cedula}`;
    this._utilityService.getQuery(url, true).subscribe(resp => {
      Swal.close();
      let respuesta: any = resp;
      this.list = respuesta.data;
    })
  }
  gestion(x: number, type: string, stepPortal: string, stepFormulario: string) {

    switch (stepPortal) {
      case "1":
        switch (stepFormulario) {
          case "4":
            let url = `/main/legal/${x}`;
            this.router.navigateByUrl(url);
            break;

          default:
            if (type == 'CC') {
              let url = `/main/personanatural/${x}`;
              this.router.navigateByUrl(url);
            } else {
              let url = `/main/personajuridica/${x}`;
              this.router.navigateByUrl(url);
            }
            break;
        }
        break;
      case "2":
        let url = `/main/documents/${type}/${x}`;
        this.router.navigateByUrl(url);
        break;
      default:
        break;
    }
  }


  getImage(step: any, img: string) {
    switch (step.stepPortal) {
      case "1":
        return img.replace('enValidacion.svg', 'pendientesDocumetos.svg')
      case "2":
        return img.replace('enValidacion.svg', 'pendientesDocumetos.svg')
      case "3":
        return img
      case "4":
        return img.replace('enValidacion.svg', 'desembolsado.svg')
      case "5":
        return img.replace('enValidacion.svg', 'noAprobado.svg')
      default:
        return img
    }
  }


  capturarColor(step: any) {
    switch (step.stepPortal) {
      case "1":
        return "#32BEFA"
      case "2":
        return "#32BEFA"
      case "3":
        return "#F9A826"
      case "4":
        return "#00BFA6"
      case "5":
        return "#F50035"
      default:
        return "#F9A826"
    }
  }
  mostrarDatos(step:any){
    if(Number(step.stepPortal)>3){
      return true;
    }else{
      return false;
    }

  }


}
