import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
// import { CreditsService } from '../../services/credits/credits.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
// import { Store } from '@ngrx/store';
// import * as reducers from '../../reducers/reducers';
// import { Subscription } from 'rxjs';
// import { GetListRequest } from '../../actions/list-requests.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reconocer',
  templateUrl: './reconocer.component.html',
  styleUrls: ['./reconocer.component.scss']
})
export class ReconocerComponent implements OnInit, OnDestroy {
  UrlReconocer:string = environment.reconocer;
  auth: any;
  procesoConvenioGuid: any;
  token: any;
  iFrameContainer:any;
  iFrame: any;
  validacion: any;
  loadingRequest: boolean=false;
  showStep: boolean = false;
  numSolicitud: any;
  uniNegocio: any;
  main: string ="";

  // listRequest$ = this.store.select(reducers.getListRequestResponse);
  // subReq$: Subscription;
  dataUser:any= { telefono: "", email: "", cc: "" };

  constructor(
    // private store: Store<reducers.State>,
    // private creditService: CreditsService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    public _generic: GenericService,
  ) { }

  ngOnDestroy(): void {
    // this.subReq$.unsubscribe();
  }

  ngOnInit() {
    this.activateRouter.params.subscribe(({ num, neg }) => {
      this.numSolicitud = num;
      this.uniNegocio = neg;
      this.dataUser = { telefono:3045337156, email: 'ingshirleyjohanna@gmail.com', cc: '1143163517' }
    })

    this.getCredits();
    // this.subReq$ = this.listRequest$.subscribe(data => {
    //   let request = data.filter(req => req.numero_solicitud == this.numSolicitud);
    //   if (request) {
    //     this.dataUser = { telefono: request[0].celular, email: request[0].email, cc: request[0].identificacion }
    //   }
    // });

    this.iFrame = document.getElementById('iFrame');
    this.iFrameContainer = document.getElementById('iFrameContainer');
    // prueba
    // this.auth = {
    //   clientId: "FINTRA",
    //   clientSecret: "F1ntr4P@$$w0rd"
    // };
    // prod
        this.auth = {
      clientId: "FINTRA",
      clientSecret: "Me@uB@!E44CQ%EAP"
    };

    this.validacion = {
      guidConv: "7aacec4f-2f02-4901-81f8-1d5772653434",
      tipoValidacion: "1",
      asesor: "Fintra",
      sede: "344889",
      tipoDoc: "CC",
      numDoc: "",
      email: "",
      celular: "",
      usuario: "FINTRA",
      clave: "Fintra.2021*",
      consultaFuentes: false
    }

    this.runValidation();

    this.main = (window.innerHeight - 150) + 'px';

    window.onmessage = async (event) => {
      if (event.data.for === "resultData") {
        // alert("Proceso terminado, Estado:" + event.data.isSuccess);
        this.iFrameContainer.classList.add('hide');
        this.iFrameContainer.classList.remove('show');
        if (event.data.isSuccess) {
          this.loadingRequest = false;

          // this.queryDataCredit()
          // prod:  https://recidaw.olimpiait.com/index.html
          // prueba: "https://demorcs.olimpiait.com:6314/Validacion/ConsultarValidacion"
          await this.ConsultarValidacion(`${this.UrlReconocer}/Validacion/ConsultarValidacion`, this.token).then((resp: any) => {
            if (resp && resp.code == 200) {
              const data = resp.data;
              this.saveReconocerID(data).subscribe(Response => {
                console.log(Response);
                
              });
              // --(finalizado = TRUE and EstadoProceso = (1: enrolamiento) and cacelado =false) // Paso las validaciones de identidad  
              // --(finalizado = TRUE and EstadoProceso = (2: validacion) and cancelado =false and aprobado=true  ) // Pasa cliente enrolados previamente
              if (data.finalizado == true && data.estadoProceso == 1 && data.cancelado == false) {
                this.router.navigate([`/app/upload/${this.uniNegocio}/${this.numSolicitud}`]);
              }
              if (data.finalizado == true && data.estadoProceso == 2 && data.cancelado == false && data.aprobado == true) {
                this.router.navigate([`/app/upload/${this.uniNegocio}/${this.numSolicitud}`]);
              }
              if (data.finalizado == true && (data.estadoProceso == 2 || data.estadoProceso == 1) && data.cancelado == false && data.aprobado == false) {
                // TODO la solicitud fue rechazada (la validación de reconocer no pasó los filtros)
                // this.currentStep = 4;
                this.showStep = true;
              }
            }
          });
        } else {
          this.saveReconocerID(event.data);
        }
      }
    }
  }

  getCredits() {
    // this.store.dispatch(new GetListRequest({ filter: null, credits: false, identificacion: '', limit: 1000, offset: 0 }));
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.main = (window.innerHeight - 150) + 'px';
  }

  aceptar() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }

  async runValidation() {

    this.loadingRequest = true;
    this.validacion = { ...this.validacion, numDoc: this.dataUser.cc, email: this.dataUser.email, celular: this.dataUser.telefono }
    // let token;
    let url;
    await this.Post("https://recidaw.olimpiait.com/TraerToken", this.auth).then((resp: any) => {
      this.token = resp.accessToken;
    });
    // debugger;
    //SOLICITAR VALIDACIÓN
    await this.Post("https://recidaw.olimpiait.com/Validacion/SolicitudValidacion", this.validacion, this.token).then((resp: any) => {
      if (resp && resp.code == 200) {
        url = resp.data.url;
        this.procesoConvenioGuid = resp.data.procesoConvenioGuid
        this.loadingRequest = false;
      }
    })
      .catch(err => {
        this.loadingRequest = false;
      });
    if (url) {

      this.iFrame.src = url;
      this.iFrameContainer.classList.remove('hide');
      this.iFrameContainer.classList.add('show');
    }

  }

  Post(url: string, dataRequest: any, token = "") {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('POST', url);
      if (token !== "") {
        request.setRequestHeader("Authorization", "Bearer " + token);
      };
      request.setRequestHeader('Content-type', 'application/json');
      request.responseType = 'json';
      request.onload = function () {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error('No fue posible hacer la verificación:' + request.statusText));
        }
      };
      request.onerror = function () {
        reject(Error('Ocurrio un error de red.'));
      };
      // Send the request
      request.send(JSON.stringify(dataRequest));
    });
  }

  ConsultarValidacion(url: string, token = "") {

    let data = {
      "guidConv": "7aacec4f-2f02-4901-81f8-1d5772653434",
      "procesoConvenioGuid": this.procesoConvenioGuid,
      "usuario": "Fintra",
      "clave": "Fintra.2021*"
    }

    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('POST', url);
      if (token !== "") {
        request.setRequestHeader("Authorization", "Bearer " + token);
      };
      request.setRequestHeader('Content-type', 'application/json');
      request.responseType = 'json';
      request.onload = function () {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error('No fue posible hacer la verificación:' + request.statusText));
        }
      };
      request.onerror = function () {
        reject(Error('Ocurrio un error de red.'));
      };
      // Send the request
      request.send(JSON.stringify(data));
    });
  }

  saveReconocerID(data: any) {
    // console.log(data)
    return this._generic.saveReconocerID({ "numero_solicitud": '', "identificacion": this.dataUser.cc, "tipo_trama": 2, "unidad_negocio":32, "json_resp": data })
  }

}
