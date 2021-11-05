import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
import Swal from 'sweetalert2';
import { CargoPublicoComponent } from '../../modals/cargo-publico/cargo-publico.component';
import { MonedaExtranjeraComponent } from '../../modals/moneda-extranjera/moneda-extranjera.component';

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
  formTab2: FormGroup;
  formTab3: FormGroup;
  ListOperaciones: any;
  formTab4: FormGroup;

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
      familiar_vinculadoActualmente: "",
      familiar_fechaDesvinculacion: "",
      pregunta2: [false],
      pregunta3: [false],
    })
    this.formTab2 = this.fb.group({
      pregunta1: [false],
      pregunta2: [false],
      pregunta3: [false],
      pregunta4: [false],
      pregunta5: [false],
      pregunta6: [false]
    })
    this.formTab3 = this.fb.group({
      pregunta1: ['N', [Validators.required]],
      pregunta2: [''],
      pregunta3: ['N', [Validators.required]],
      pregunta4: [''],
      entidad: [""],
      tipoProducto: [""],
      numeroProducto: [""],
      ciudad: [""],
      pais: [""],
      moneda: [""],
      monto: [0]
    })
    this.formTab4 = this.fb.group({
      descripcion: ['', [Validators.required]],
    })
    this.getListados();
  }

  getListados() {
    let url = "generic/qry/consulta-lista-generica/TIPO-OPERACION";
    // http://{{localHost}}/api-fintra/api/generic/qry/consulta-lista-generica/TIPO-OPERACION
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

  siguiente(index: any) {
    // this.step += 1;
    let url = '', data = {};
    url = 'credito/formulario-solicitud-tabs-ref';
    switch (this.step) {
      case 1:
        data = {
          "detalle": [
            {
              "recurso": "tab-legal-pep-cargo-publico",
              "numeroSolicitud": this.codigoSolicitud,
              "valor": this.formTab1.value.pregunta1 == true ? 'S' : 'N',
              "cargo": this.formTab1.value.cargo,
              "entidad": this.formTab1.value.entidad,
              "vinculadoActualmente": this.formTab1.value.vinculadoActualmente,
              "fechaDesvinculacion": this.formTab1.value.fechaDesvinculacion

            },
            {
              "recurso": "tab-legal-pep-persona-expuesta",
              "numeroSolicitud": this.codigoSolicitud,
              "valor": this.formTab1.value.pregunta2 == true ? 'S' : 'N',
              "vinculacion": this.formTab1.value.familiar_vinculacion,
              "nombre": this.formTab1.value.familiar_nombre,
              "tipoId": this.formTab1.value.familiar_tipoId,
              "identificacion": this.formTab1.value.familiar_identificacion,
              "nacionalidad": this.formTab1.value.familiar_nacionalidad,
              "Entidad": this.formTab1.value.familiar_Entidad,
              "vinculadoActualmente": this.formTab1.value.familiar_vinculadoActualmente,
              "fechaDesvinculacion": this.formTab1.value.familiar_fechaDesvinculacion
            },
            {
              "recurso": "tab-legal-pep-actividad-apnfd",
              "numeroSolicitud": this.codigoSolicitud,
              "valor": this.formTab1.value.pregunta3 == true ? 'S' : 'N'
            }
          ]
        }
        break;
      case 2:

        url = 'credito/tk/formulario-solicitud-tabs';
        data = {
          "recurso": "tab-legal-declaracion-facta",
          "numeroSolicitud": this.codigoSolicitud,
          "factaUno": this.formTab2.value.pregunta1 == true ? 'S' : 'N',
          "factaDos": this.formTab2.value.pregunta2 == true ? 'S' : 'N',
          "factaTres": this.formTab2.value.pregunta3 == true ? 'S' : 'N',
          "factaCuatro": this.formTab2.value.pregunta4 == true ? 'S' : 'N',
          "factaCinco": this.formTab2.value.pregunta5 == true ? 'S' : 'N',
          "factaSeis": this.formTab2.value.pregunta6 == true ? 'S' : 'N'
        }
        break;
      case 3:
        data = {
          "detalle": [
            {
              "recurso": "tab-legal-cripto-moneda",
              "numeroSolicitud": this.codigoSolicitud,
              "valor": this.formTab3.value.pregunta1,
              "tipoOperacion": this.formTab3.value.pregunta2
            },
            {
              "recurso": "tab-legal-moneda-extranjera",
              "numeroSolicitud": this.codigoSolicitud,
              "valor": this.formTab3.value.pregunta3,
              "tipoOperacion": this.formTab3.value.pregunta4,
              "entidad": this.formTab3.value.entidad,
              "tipoProducto": this.formTab3.value.tipoProducto,
              "numeroProducto": this.formTab3.value.numeroProducto+'',
              "ciudad": this.formTab3.value.ciudad,
              "pais": this.formTab3.value.pais,
              "moneda": this.formTab3.value.moneda,
              "monto": Number(this.formTab3.value.monto)
            }
          ]

        }
        break;
      case 4:
        data = {
          "detalle": [
            {
              "recurso": "tab-legal-auto-declaracion",
              "numeroSolicitud": this.codigoSolicitud,
              "valor": "S",
              "descripcion": this.formTab4.value.descripcion,
              "tipoOperacion": "D"
            },
          ]
        }
        break;
      case 5:
        data = {
          "detalle": [
            {
              "recurso": "tab-legal-auto-declaracion",
              "numeroSolicitud": this.codigoSolicitud,
              "valor": "S",
              "descripcion": "",
              "tipoOperacion": "A"
            },
          ]
        }
        break;
      case 6:
        data = {
          "detalle": [
            {
              "recurso": "tab-legal-auto-declaracion",
              "numeroSolicitud": this.codigoSolicitud,
              "valor": "S",
              "descripcion": "",
              "tipoOperacion": "C"
            }
          ]
        }
        break;
      default:
        break;
    }
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
                this.step = response.data.stepLegal
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
  mostrarMonedaExtranjera() {
    if(this.formTab3.value.pregunta3=='S'){
      const dialogRef = this.dialog.open(MonedaExtranjeraComponent, {

      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
  
        if (result == undefined) {
          this.formTab3.controls['pregunta3'].setValue('N');
          return;
        }
        if(result.length==0){
          this.formTab3.controls['pregunta3'].setValue('N');
          return;
        }
        this.formTab3.controls['entidad'].setValue(result[0].value.entidad)
        this.formTab3.controls['tipoProducto'].setValue(result[0].value.producto)
        this.formTab3.controls['numeroProducto'].setValue(result[0].value.numeroProducto)
        this.formTab3.controls['ciudad'].setValue(result[0].value.ciudad)
        this.formTab3.controls['pais'].setValue(result[0].value.pais)
        this.formTab3.controls['moneda'].setValue(result[0].value.moneda)
        this.formTab3.controls['monto'].setValue(this._generic.enviarNumero(result[0].value.monto))
      })
    }else{
       this.formTab3.controls['entidad'].setValue('')
        this.formTab3.controls['tipoProducto'].setValue('')
        this.formTab3.controls['numeroProducto'].setValue('')
        this.formTab3.controls['ciudad'].setValue('')
        this.formTab3.controls['pais'].setValue('')
        this.formTab3.controls['moneda'].setValue('')
        this.formTab3.controls['monto'].setValue(0)
    }
    
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
        this.formTab1.controls['familiar_vinculadoActualmente'].setValue(result[0].value.vinculadoActualmente)
        this.formTab1.controls['familiar_fechaDesvinculacion'].setValue(result[0].value.fechaVinculado)

      }
    });
  }

}
