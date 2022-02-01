import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { listaGenerica, CreditService } from 'src/app/services/credit.service';
import { GenericService } from 'src/app/services/generic.service';
import { DirectionsComponent } from '../../../components/modals/directions/directions.component';
import { CargoPublicoComponent } from '../../../components/modals/cargo-publico/cargo-publico.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dato-complementario-pnatural',
  templateUrl: './dato-complementario-pnatural.component.html',
  styleUrls: ['./dato-complementario-pnatural.component.scss']
})
export class DatoComplementarioPnaturalComponent implements OnInit {


  title = 'ultracem';
  alto: any;
  ancho: any;

  // no se utlizara


  // se utlizara
  step: number = 1;
  cargando: boolean = false;
  formTab1: FormGroup;
  formTab2: FormGroup;
  formTab3: FormGroup;


  Listdepartamentos: any[] = [];
  ListNivelEstudio: any[] = [];
  ListCiudades: any[] = [];
  ListTipoVivienda: any[] = [];
  ListBarrios: any;
  ListCiudadesNacionalidad: any;
  ListCiudadesResidencia: any;
  codigoSolicitud: any;
  ListCiudadesNegocio: any;
  ListBarriosNegocio: any;
  ListCMunicipio: any;
  viveNegocioCondicion: boolean = false;


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    public _generic: GenericService,
    private router: Router,
  ) {

    this.formTab1 = this.fb.group({
      nacionalidad: ["Colombia", [Validators.required]],
      departamentoNacionalidad: ["", [Validators.required]],
      ciudadNacionalidad: ["", [Validators.required]],
      departamentoResidencia: ["", [Validators.required]],
      ciudadResidencia: ["", [Validators.required]],
      barrioResidencia: ["", [Validators.required]],
      direccionResidencia: ["", [Validators.required]],
      tipoVivienda: ["", [Validators.required]],
      nivelEstudio: ["", [Validators.required]],
      viveEnNegocio: ["", [Validators.required]],
    })
    this.formTab2 = this.fb.group({
      departamentoNegocio: ["", [Validators.required]],
      departamentoNombreNegocio: [""],
      ciudadNegocio: ["", [Validators.required]],
      ciudadNombreNegocio: [""],
      barrioNegocio: ["", [Validators.required]],
      barrioNombreNegocio: [""],
      direccionNegocio: ["", [Validators.required]],
      telefonoNegocio: ["", [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
      camaraComercio: ["", [Validators.required]],
      nit: [""],
      nombreNegocio: [""],
      declarante: ["", [Validators.required]],
      activos: ["", [Validators.required]],
      ventasMensuales: ["", [Validators.required]],
    })
    this.formTab3 = this.fb.group({

      pPrimerNombre: ["", [Validators.required]],
      pSegundoNombre: [""],
      pPrimerApellido: ["", [Validators.required]],
      pSegundoApellido: [""],
      ptelefono: ["", [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
      cRazonSocial: ["", [Validators.required]],
      cCelular: ["", [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
      cDepartamento: ["", [Validators.required]],
      cMunicipio: ["", [Validators.required]],
      cAntiguedad: ["", [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    })



    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(param => {
      this.codigoSolicitud = param.codigoSolicitud
      this.getEstados(this.codigoSolicitud)
    })
    this.getListados();
    this.escuchaCambios();

    //  this.openModalCargoPublico('P');
  }

  noCambios() {
    this.formTab1.controls['nacionalidad'].setValue('Colombia');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';
  }


  getListados() {
    let url = "generic/qry/departamentos/CO";
    this._generic.getData(url).subscribe(resp => {
      this.Listdepartamentos = resp;

    })
    url = "generic/qry/consulta-lista-generica/NIVEL-ESTUDIO";
    this._generic.getData(url).subscribe(resp => {
      this.ListNivelEstudio = resp;
    })
    url = "generic/qry/consulta-lista-generica/tipo-vivienda";
    this._generic.getData(url).subscribe(resp => {
      this.ListTipoVivienda = resp;
    })
  }

  getListadosCiudades(departamento: string, type: number) {
    let url = `generic/qry/ciudades/CO/${departamento}`;
    this._generic.getData(url).subscribe(resp => {

      switch (type) {
        case 1:
          this.ListCiudadesNacionalidad = resp;
          break;
        case 2:
          this.ListCiudadesResidencia = resp;
          break;
        case 3:
          this.ListCiudadesNegocio = resp;
          break;
        case 4:
          this.ListCMunicipio = resp
          break;
        default:
          break;
      }

    })
  }
  getListadosBarrios(departamento: string, ciudad: string, type: number) {
    let url = `generic/qry/barrios/${ciudad}`;
    this._generic.getData(url).subscribe(resp => {

      switch (type) {
        case 1:
          this.ListBarrios = resp;
          break;
        case 2:
          this.ListBarriosNegocio = resp;
          break;
        default:
          break;
      }
    })
  }

  escuchaCambios(): void {
    this.formTab2.controls.camaraComercio.valueChanges.subscribe(tipo => {
      if (tipo == 'S') {
        this.formTab2.controls['nit'].addValidators(Validators.required);
        this.formTab2.controls['nit'].addValidators(Validators.pattern(/^[0-9]*$/));
        this.formTab2.controls['nit'].addValidators(Validators.minLength(9));
        this.formTab2.controls['nit'].addValidators(Validators.maxLength(10));
      } else {
        this.formTab2.controls['nit'].removeValidators(Validators.required);
        this.formTab2.controls['nit'].updateValueAndValidity();
      }
    });
  }

  openModalDirection() {
    const codigo: string = this.formTab1.controls['ciudadResidencia'].value;

    const dialogRef = this.dialog.open(DirectionsComponent, {
      // width: '250px',
      data: { codigo: codigo, valido: true },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.formTab1.controls['direccionResidencia'].setValue(res);
    })
  }
  openModalDirectionNegocio() {
    const codigo: string = this.formTab2.controls['ciudadNegocio'].value;

    const dialogRef = this.dialog.open(DirectionsComponent, {
      // width: '250px',
      data: { codigo: codigo, valido: true },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.formTab2.controls['direccionNegocio'].setValue(res);
    })
  }

  openModalCargoPublico(tipo: String) {
    const dialogRef = this.dialog.open(CargoPublicoComponent, {
      data: { tipo: tipo }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  siguienteTab(key: number) {
    let url = '', data = {};
    if (this.formTab1.valid || this.formTab2.valid || this.formTab3.valid) {
      url = 'credito/tk/formulario-solicitud-tabs';
      switch (key) {
        case 1:
          if (this.formTab1.valid) {
            data = {
              "recurso": "tab-cc-dato-natural",
              "numeroSolicitud": this.codigoSolicitud,
              "nacionalidad": this.formTab1.value.nacionalidad,
              "departamentoNacimiento": this.formTab1.value.departamentoNacionalidad,
              "ciudadNacimiento": this.formTab1.value.ciudadNacionalidad,
              "departamentoResidencia": this.formTab1.value.departamentoResidencia,
              "ciudadResidencia": this.formTab1.value.ciudadResidencia,
              "barrioResidencia": this.formTab1.value.barrioResidencia,
              "direccionResidencia": this.formTab1.value.direccionResidencia,
              "nivelEstudio": this.formTab1.value.nivelEstudio,
              "tipoVivienda": this.formTab1.value.tipoVivienda,
              "viveEnNegocio": this.formTab1.value.viveEnNegocio
            }
            this.guardarDatos(url, 1, data);
          } else { this.formTab1.markAllAsTouched(); }
          break;
        case 2:
          if (this.formTab2.valid) {
            data = {
              "recurso": "tab-cc-dato-negocio",
              "numeroSolicitud": this.codigoSolicitud,
              "departamentoNegocio": this.formTab2.value.departamentoNegocio,
              "ciudadNegocio": this.formTab2.value.ciudadNegocio,
              "barrioNegocio": this.formTab2.value.barrioNegocio.toString(),
              "direccionNegocio": this.formTab2.value.direccionNegocio,
              "telefonoNegocio": this.formTab2.value.telefonoNegocio,
              "camaraComercio": this.formTab2.value.camaraComercio,
              "nitNegocio": this.formTab2.value.nit,
              "nombreNegocio": this.formTab2.value.nombreNegocio,
              "declarante": this.formTab2.value.declarante,
              "activos": Number(this._generic.enviarNumero(this.formTab2.value.activos)),
              "ventasMensuales": Number(this._generic.enviarNumero(this.formTab2.value.ventasMensuales)),
            }
            this.guardarDatos(url, 2, data);
          } else { this.formTab2.markAllAsTouched(); }
          break;
        case 3:
          if (this.formTab3.valid) {
            url = "credito/formulario-solicitud-tabs-ref";
            data = {
              "detalle": [
                {
                  "recurso": "tab-referencia-personal",
                  "numeroSolicitud": this.codigoSolicitud,
                  "primerNombre": this.formTab3.value.pPrimerNombre,
                  "segundoNombre": this.formTab3.value.pSegundoNombre,
                  "primerApellido": this.formTab3.value.pPrimerApellido,
                  "segundoApellido": this.formTab3.value.pSegundoApellido,
                  "telefono": this.formTab3.value.ptelefono
                },
                {
                  "recurso": "tab-referencia-comercial",
                  "numeroSolicitud": this.codigoSolicitud,
                  "nombreCompleto": this.formTab3.value.cRazonSocial,
                  "codigoDepartamento": this.formTab3.value.cDepartamento,
                  "codigoCiudad": this.formTab3.value.cMunicipio,
                  "telefono": this.formTab3.value.cCelular,
                  "antiguedad": Number(this.formTab3.value.cAntiguedad)
                }
              ]
            }
            this.guardarDatos(url, 3, data);
          } else { this.formTab3.markAllAsTouched();  }
          break;
        default:
          break;
      }
    } else {
      this.formTab1.markAllAsTouched();
      this.formTab2.markAllAsTouched();
      this.formTab3.markAllAsTouched();
    }

  }

  atras() {

  }

  private guardarDatos(url: string, key: number, data: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._generic
      .posData(url, data)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          if (response.status == 200) {
            Swal.fire(
              '¡Información!',
              `Se guardo el registro con éxito`,
              'success'
            ).then(resultado => {
              if (resultado) {
                this.step = key + 1;
                if (this.step == 4) {
                  let url = `/main/legal/${this.codigoSolicitud}`;
                  this.router.navigateByUrl(url);
                }
                if (this.step == 2) {
                  this.viveNegocio(this.codigoSolicitud);
                }
              }
            });

          } else {
            Swal.fire(
              'Información',
              `Hubo un error en los datos enviados, favor evaluar`,
              'success'
            );
          }
        } else {
          Swal.fire(
            'Advertencia',
            'Hubo un error en el envio de los datos, favor verificar',
            'error'
          );
        }

      });
  }

  getEstados(codigo: string): void {
    let url: string = '';
    url = `generic/qry/consulta-step-formulario/${codigo}`;
    this._generic.getData(url).subscribe((res: any) => {
      this.step = res.stepFormulario;
      if (this.step == 2) {
        this.viveNegocio(codigo);
      }
    });
  }

  viveNegocio(codigo: string): void {
    let url = `generic/qry/tab-auto-completar-info-negocio/${codigo}`
    this._generic.getData(url).subscribe((res: any) => {
      if (res) {
        this.formTab2.controls['departamentoNombreNegocio'].setValue(res.departamento);
        this.formTab2.controls['departamentoNegocio'].setValue(res.codigoDepartamento);
        this.formTab2.controls['ciudadNombreNegocio'].setValue(res.ciudad);
        this.formTab2.controls['ciudadNegocio'].setValue(res.codigoCiudad);
        this.formTab2.controls['barrioNombreNegocio'].setValue(res.barrio);
        this.formTab2.controls['barrioNegocio'].setValue(res.codigo_barrio);
        this.formTab2.controls['direccionNegocio'].setValue(res.direccion);
        this.viveNegocioCondicion = true;
      }
      // departamentoNombreNegocio: [""],

      // this.formTab2.controls['departamentoNombreNegocio'].setValue(res);
    });
  }

  //borrar


}
