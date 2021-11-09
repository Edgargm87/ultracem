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
    // this.cedula= '900600256';
    this.solicitudes()


  }


  solicitudes() {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    console.log(this.cedula);
    let url = `generic/qry/cre-solicitudes-cliente/${this.cedula}`;
    this._utilityService.getQuery(url, true).subscribe(resp => {
      Swal.close();
      let respuesta: any = resp;
      this.list = respuesta.data;
    })
  }
  gestion(x: number, type: string, stepPortal: string,stepFormulario:number) {
    debugger
    switch (stepPortal) {
      case "1":
        switch (stepFormulario) {
          case 4:
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
        let url = `/main/documents`;
        this.router.navigateByUrl(url);
        break;
      default:


      break;
    }


  }



}
