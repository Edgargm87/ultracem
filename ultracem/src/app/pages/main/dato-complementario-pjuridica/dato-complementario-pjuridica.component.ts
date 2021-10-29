import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DirectionsComponent } from 'src/app/components/modals/directions/directions.component';
import { CreditService } from 'src/app/services/credit.service';
import { GenericService } from 'src/app/services/generic.service';
import {MatSelectChange} from "@angular/material/select";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs/operators";
import Swal from "sweetalert2";
import {format} from "date-fns";

@Component({
  selector: 'app-dato-complementario-pjuridica',
  templateUrl: './dato-complementario-pjuridica.component.html',
  styleUrls: ['./dato-complementario-pjuridica.component.scss']
})
export class DatoComplementarioPjuridicaComponent implements OnInit {



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
  formTab4: FormGroup;
  Listdepartamentos: any[]=[];
  ListNivelEstudio: any[]=[];
  public departamentosResidencia: any[]=[];
  public ciudades: any[] = [];
  public ciudadesResidencia: any[] = [];
  public barrios: any[] = [];
  public tipoVivienda: any[] = [];
  public departamentoRepresentante: any[] =[];
  public ciudadRepresentante: any[] =[];
  public ciudadReferencia: any[] =[];
  public barrioRepresentante: any[] =[];
  public barrioReferencia: any[] =[];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _creditService: CreditService,
    private _generic: GenericService,
    private route: ActivatedRoute
  ) {

    this.formTab1=this.fb.group({
      departamentoNegocio: ['', [Validators.required]],
      ciudadNegocio: ['', [Validators.required]],
      barrioNegocio: ['', [Validators.required]],
      direccionNegocio: ['', [Validators.required]],
      telefonoNegocio: ['', [Validators.required]],
      activos: ['', [Validators.required]],
      ventasMensuales: ['', [Validators.required]],
      declarante: ['', [Validators.required]],
      recurso: ['tab-nit-dato-negocio'],
      viveNegocio: ['', [Validators.required]],
      numeroSolicitud: ['', [Validators.required]],
    })
    this.formTab2=this.fb.group({
      departamentoResidencia: ["", [Validators.required]],
      ciudadResidencia: ["", [Validators.required]],
      barrioResidencia: ["", [Validators.required]],
      direccionResidencia: ["", [Validators.required]],
      fechaNacimiento: ["", [Validators.required]],
      nivelEstudio: ["", [Validators.required]],
      tipoVivienda: ["", [Validators.required]],
      numeroSolicitud: ['', [Validators.required]],
      recurso: ['tab-nit-dato-representante'],
    })
    this.formTab3=this.fb.group({

      pPrimerNombre: ["", [Validators.required]],
      pSegundoNombre: ["", [Validators.required]],
      pPrimerApellido: ["", [Validators.required]],
      pSegundoApellido: ["", [Validators.required]],
      ptelefono: ["", [Validators.required]],
      cRazonSocial: ["", [Validators.required]],
      cCelular: ["", [Validators.required]],
      cDepartamento: ["", [Validators.required]],
      cMunicipio: ["", [Validators.required]],
      cAntiguedad: ["", [Validators.required]],
    })
    this.formTab4=this.fb.group({
      nacionalidad: ["Colombia", [Validators.required]],
      departamentoNacionalidad: ["", [Validators.required]],
      ciudadNacionalidad: ["", [Validators.required]],
      departamentoResidencia: ["", [Validators.required]],
      ciudadResidencia: ["", [Validators.required]],
      barrioResidencia: ["", [Validators.required]],
      direccionResidencia: ["", [Validators.required]],
      tipoVivienda: ["", [Validators.required]],
      nivelEstudio: ["", [Validators.required]],
    })


    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';

    route.params.pipe(take(1)).subscribe((params) => {
      const numeroSolicitud: string = params.codigoSolicitud;
      this.formTab1.controls['numeroSolicitud'].setValue(numeroSolicitud);
      this.formTab2.controls['numeroSolicitud'].setValue(numeroSolicitud);
    });
  }

  ngOnInit(): void {
   this.getListados();

  }
  /**
   * @description: Selecciona ciudad
   */
  public seleccionCiudad(evento: MatSelectChange, params: string): void {
    const codigo: string = evento.value;
    this.getCiudades(codigo, params);
  }
  /**
   * @description: Selecciona barrios
   */
  public seleccionBarrios(evento: MatSelectChange, params: string): void {
    const codigo: string = evento.value;
    this.getBarrios(codigo, params);
  }

  noCambios(){
    this.formTab1.controls['nacionalidad'].setValue('Colombia');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';
  }


  getListados(){
    let url="generic/qry/departamentos/CO";
    this._generic.getData(url).subscribe(resp => {
      this.Listdepartamentos = resp;
      this.departamentosResidencia = resp;
      this.departamentoRepresentante = resp;
    });
    url="generic/qry/consulta-lista-generica/NIVEL-ESTUDIO";
    this._generic.getData(url).subscribe(resp => {
      this.ListNivelEstudio = resp;
    });
    url = 'generic/qry/consulta-lista-generica/TIPO-VIVIENDA';
    this._generic.getData(url).subscribe(resp => {
      this.tipoVivienda = resp;
    });
  }

  public onGuardarUno(key: number): void {
    let url: string = 'credito/tk/formulario-solicitud-tabs';
    const datos: any = this.formTab1.getRawValue();
    const {
      departamentoNegocio,
      ciudadNegocio,
      barrioNegocio,
      direccionNegocio,
      telefonoNegocio,
      activos,
      ventasMensuales,
      declarante,
      recurso,
      viveNegocio,
      numeroSolicitud,
    } = datos;

    const formulario = {
      departamentoResidencia: departamentoNegocio,
      ciudadResidencia: ciudadNegocio,
      barrioResidencia: String(barrioNegocio),
      direccionResidencia: direccionNegocio,
      telefonoNegocio: telefonoNegocio,
      activos: Number(activos),
      ventasMensuales: Number(ventasMensuales),
      declarante: declarante,
      recurso: recurso,
      viveNegocio: viveNegocio,
      numeroSolicitud: numeroSolicitud,
    }

    this._generic.posData(url, formulario).subscribe((res: any) => {
      if (res) {
        if (res.status === 200) {
          Swal.fire(
            '¡Información!',
            `Se guardo el registro con éxito`,
            'success'
          ).then(resultado => {
            if (resultado) {
              this.step == key + 1;
            }
          });
        }
      }

    });
  }
  public onGuardarDos(key: number): void {
    let url: string = 'credito/tk/formulario-solicitud-tabs';
    const datos: any = this.formTab2.getRawValue();
    const {
      departamentoResidencia,
      ciudadResidencia,
      barrioResidencia,
      direccionResidencia,
      fechaNacimiento,
      nivelEstudio,
      tipoVivienda,
      numeroSolicitud,
      recurso,

    } = datos;

    const formulario = {
      departamentoResidencia: departamentoResidencia,
      ciudadResidencia: ciudadResidencia,
      barrioResidencia: String(barrioResidencia),
      direccionResidencia: direccionResidencia,
      nivelEstudio: nivelEstudio,
      tipoVivienda: tipoVivienda,
      recurso: recurso,
      numeroSolicitud: numeroSolicitud,
      fechaNacimiento: format(fechaNacimiento, 'yyyy-MM-dd')
    }

    console.log(formulario);

    this._generic.posData(url, formulario).subscribe((res: any) => {
      if (res) {
        if (res.status === 200) {
          Swal.fire(
            '¡Información!',
            `Se guardo el registro con éxito`,
            'success'
          ).then(resultado => {
            if (resultado) {
              this.step == key + 1;
            }
          });
        }
      }
    });
  }

  /**
   * @description: Carga las ciudades
   */
  private getCiudades(codigo: string, params: string): void {
    let url: string = '';
    switch (params) {
      case 'NA':
        url = `generic/qry/ciudades/CO/${codigo}`;
        this._generic.getData(url).subscribe((rest) => {
          this.ciudades = rest;
        });
        break;
      case 'REP':
        url= `generic/qry/ciudades/CO/${codigo}`;
        this._generic.getData(url).subscribe((rest) => {
          this.ciudadRepresentante = rest;
        });
        break;
      case 'REF':
        url= `generic/qry/ciudades/CO/${codigo}`;
        this._generic.getData(url).subscribe((rest) => {
          this.ciudadReferencia = rest;
        });
        break;
    }

  }

  private getBarrios(codigo: string, params: string): void {
    let url: string = '';
    switch (params) {
      case 'NA':
        url = `generic/qry/barrios/${codigo}`;
        this._generic.getData(url).subscribe((rest) => {
          this.barrios = rest;
        });
      break;
      case 'REP':
        url = `generic/qry/barrios/${codigo}`;
        this._generic.getData(url).subscribe((rest) => {
          this.barrioRepresentante = rest;
        });
        break;
      case 'REF':
        url = `generic/qry/barrios/${codigo}`;
        this._generic.getData(url).subscribe((rest) => {
          this.barrioReferencia = rest;
        });
    }

  }

  openModalDirection(){
    let codigo: string = '';
    codigo = this.formTab1.controls['ciudadNegocio'].value;

    const dialogRef = this.dialog.open(DirectionsComponent, {
      // width: '250px',
      data: { codigo: codigo, valido: true },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.formTab1.controls['direccionNegocio'].setValue(res);
    })

  }
  openModalDirectionRepresentante(){
    let codigo: string = '';
    codigo = this.formTab2.controls['ciudadResidencia'].value;

    const dialogRef = this.dialog.open(DirectionsComponent, {
      // width: '250px',
      data: { codigo: codigo, valido: true },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.formTab2.controls['direccionResidencia'].setValue(res);
    })

  }

  siguienteTab(){

  }
  atras(){

  }

  //borrar


}
