import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
import Swal from 'sweetalert2';
import { CargoPublicoComponent } from '../../modals/cargo-publico/cargo-publico.component';
import { DeclaracionComponent } from '../../modals/declaracion/declaracion.component';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {
  alto: string;
  ancho: string;
  step: number = 1;
  codigoSolicitud: any;
  formTab1: FormGroup;
  formTab3: FormGroup;
  ListOperaciones: any;
  formTab4: FormGroup;
  cantidadSI: number = 0;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _generic: GenericService,
    private router: Router,) {

    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';

    this.formTab1 = this.fb.group({
      pregunta1: [false],
      cargo: "",
      entidad: "",
      vinculadoActualmente: "",
      fechaDesvinculacion: "",
      familiar_vinculacion: "",
      familiar_nombre: "",
      familiar_tipoId: "",
      familiar_identificacion: "",
      familiar_nacionalidad: "",
      familiar_Entidad: "",
      familiar_cargo: "",
      familiar_vinculadoActualmente: "",
      familiar_fechaDesvinculacion: "",
      pregunta2: [false],
      pregunta3: [false],
      pregunta4: [false],
    })
    this.formTab3 = this.fb.group({
      pregunta1: ['N', [Validators.required]],
      pregunta2: [''],
      pregunta3: ['N', [Validators.required]],
      pregunta4: ['']
    })
    this.formTab4 = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
    })
    this.getListados();
  }

  getListados() {
    let url = "generic/qry/consulta-lista-generica/TIPO-OPERACION";
    this._generic.getData(url).subscribe(resp => {
      this.ListOperaciones = resp;
    })
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(param => {
      this.codigoSolicitud = param.codigoSolicitud
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';
  }

  siguiente() {
    const dialogRef = this.dialog.open(DeclaracionComponent, {
      width: '50%',
      maxHeight: '60vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result!=false) {
        let url = '', data = {};
        url = 'credito/tk/formulario-solicitud-tabs';
        data = {
          "recurso": "guardar-legales-solicitud",
          "numeroSolicitud": this.codigoSolicitud,
          "tipo": "T",
          "legalCargoPublico": this.formTab1.value.pregunta1 == true ? 'S' : 'N',
          "cargoPublico": this.formTab1.value.cargo,
          "entidadPublico": this.formTab1.value.entidad,
          "vinculadoActualPublico": this.formTab1.value.vinculadoActualmente,
          "fechaDesvinculacionPublico": this.formTab1.value.fechaDesvinculacion == '' ? '0099-01-01':this.formTab1.value.fechaDesvinculacion,
          "legalPersonalExpuesta": this.formTab1.value.pregunta2 == true ? 'S' : 'N',
          "vinculacionExpuesta": this.formTab1.value.familiar_vinculacion,
          "nombreExpuesta": this.formTab1.value.familiar_nombre,
          "tipoIdentificacionExpuesta": this.formTab1.value.familiar_tipoId,
          "identificacionExpuesta": this.formTab1.value.familiar_identificacion,
          "nacionalidadExpuesta": this.formTab1.value.familiar_nacionalidad,
          "entidadExpuesta": this.formTab1.value.familiar_Entidad,
          "cargoExpuesta": this.formTab1.value.familiar_cargo,
          "vinculadoActualExpuesta": this.formTab1.value.familiar_vinculadoActualmente,
          "fechaDesvinculacionExpuesta": this.formTab1.value.familiar_fechaDesvinculacion == '' ? '0099-01-01':this.formTab1.value.familiar_fechaDesvinculacion,
          "legalDesarrollaActividadApnfd": this.formTab1.value.pregunta4 == true ? 'S' : 'N',
          "legalCargoPartidoPolitico": this.formTab1.value.pregunta3 == true ? 'S' : 'N',
          "legalOperacionCriptomoneda": this.formTab3.value.pregunta1,
          "tipoOperacionCriptomoneda": this.formTab3.value.pregunta2,
          "legalOperacionExtranjera": this.formTab3.value.pregunta3,
          "tipoOperacionExtranjera": this.formTab3.value.pregunta4,
          "declaroIngresoDeclaracionAuto": result.declaracion,
          "otroIngresoDeclaracionAuto": result.otro,
          "autoricacionDatosPersonalClaracionAuto": "S",
          "clausulaAnticurrupcionClaracionAuto": "S"
        }
        Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
        this._generic.posData(url, data).subscribe((response: any) => {
          Swal.close();
          if (response) {
            if (response.status == 200) {
              Swal.fire(
                '¡Información!',
                `Se guardo el registro con éxito`,
                'success'
              ).then(resultado => {
                if (resultado) {
                  let url = `/main/listRequest`;
                  this.router.navigateByUrl(url);
                  this.step = response.data.stepLegal
                }
              });
            } else {
              Swal.fire(
                'Información',
                `Hubo un error en los datos enviados, favor evaluar`,
                'error'
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
    }); 
  }

  openModalCargoPublico(tipo: String, valor: boolean) {
    if (
      (valor == false) && (tipo == 'P')
    ) {
      this.formTab1.controls['cargo'].setValue('');
      this.formTab1.controls['entidad'].setValue('');
      this.formTab1.controls['vinculadoActualmente'].setValue('');
      this.formTab1.controls['fechaDesvinculacion'].setValue('');
      return;
    }
    if (
      (valor == false) && (tipo == 'F')
    ) {
      this.formTab1.controls['vinculacion'].setValue('')
      this.formTab1.controls['nombre'].setValue('')
      this.formTab1.controls['tipoId'].setValue('')
      this.formTab1.controls['identificacion'].setValue('')
      this.formTab1.controls['nacionalidad'].setValue('')
      this.formTab1.controls['Entidad'].setValue('')
      this.formTab1.controls['vinculadoActualmente'].setValue('')
      this.formTab1.controls['fechaDesvinculacion'].setValue('')
      return;
    }
    const dialogRef = this.dialog.open(CargoPublicoComponent, {
      data: { tipo: tipo }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (tipo == 'P') {
        if (result == undefined) {
          this.formTab1.controls['pregunta1'].setValue(false);
          return;
        }
        if (result.length == 0) {
          this.formTab1.controls['pregunta1'].setValue(false);
          return;
        }
        this.formTab1.controls['cargo'].setValue(result[0].value.cargo);
        this.formTab1.controls['entidad'].setValue(result[0].value.entidad);
        this.formTab1.controls['vinculadoActualmente'].setValue(result[0].value.vinculadoActualmente);
        this.formTab1.controls['fechaDesvinculacion'].setValue(result[0].value.fechaVinculado);
      }
      if (tipo == 'F') {
        if (result == undefined) {
          this.formTab1.controls['pregunta2'].setValue(false);
          return;
        }
        if (result.length == 0) {
          this.formTab1.controls['pregunta2'].setValue(false);
          return
        }
        this.formTab1.controls['familiar_vinculacion'].setValue(result[0].value.relacion)
        this.formTab1.controls['familiar_nombre'].setValue(result[0].value.nombre)
        this.formTab1.controls['familiar_tipoId'].setValue(result[0].value.tipoID)
        this.formTab1.controls['familiar_identificacion'].setValue(result[0].value.documento)
        this.formTab1.controls['familiar_nacionalidad'].setValue(result[0].value.nacionalidad)
        this.formTab1.controls['familiar_Entidad'].setValue(result[0].value.entidad)
        this.formTab1.controls['familiar_cargo'].setValue(result[0].value.cargo)
        this.formTab1.controls['familiar_vinculadoActualmente'].setValue(result[0].value.vinculadoActualmente)
        this.formTab1.controls['familiar_fechaDesvinculacion'].setValue(result[0].value.fechaVinculado)
      }
    });
  }

}
