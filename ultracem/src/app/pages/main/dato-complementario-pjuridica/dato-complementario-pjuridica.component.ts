import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DirectionsComponent } from 'src/app/components/modals/directions/directions.component';
import { CreditService } from 'src/app/services/credit.service';
import { GenericService } from 'src/app/services/generic.service';
import {MatSelectChange} from "@angular/material/select";

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

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _creditService: CreditService,
    private _generic: GenericService,
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
      departamentoNegocio: ["", [Validators.required]],
      ciudadNegocio: ["", [Validators.required]],
      barrioNegocio: ["", [Validators.required]],
      direccionNegocio: ["", [Validators.required]],
      telefonoNegocio: ["", [Validators.required]],
      camaraComercio: ["", [Validators.required]],
      declarante: ["", [Validators.required]],
      activos: ["", [Validators.required]],
      ventasMensuales: ["", [Validators.required]],
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
  public seleccionBarrios(evento: MatSelectChange): void {
    const codigo: string = evento.value;
    this.getBarrios(codigo);
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
    })
    url="generic/qry/consulta-lista-generica/NIVEL-ESTUDIO";
    this._generic.getData(url).subscribe(resp => {
      this.ListNivelEstudio = resp;

    })
  }

  public onGuardar(): void {
    let url: string = 'formulario-solicitud-tabs';
    const datos: any = this.formTab1.getRawValue();
    this._generic.posData(url, datos).subscribe(console.log);
  }

  /**
   * @description: Carga las ciudades
   */
  private getCiudades(codigo: string, params: string): void {
    if (params === 'NA') {
      let url: string = `generic/qry/ciudades/CO/${codigo}`;
      this._generic.getData(url).subscribe((rest) => {
       this.ciudades = rest;
      })
    }else {
      let url: string = `generic/qry/ciudades/CO/${codigo}`;
      this._generic.getData(url).subscribe((rest) => {
       this.ciudadesResidencia = rest;
      })
    }
  }

  private getBarrios(codigo: string): void {
    let url: string = `generic/qry/barrios/${codigo}`;
    this._generic.getData(url).subscribe((rest) => {
      this.barrios = rest;
    })

  }

  openModalDirection(){
    const codigo: string = this.formTab1.controls['ciudadNegocio'].value;

      const dialogRef = this.dialog.open(DirectionsComponent, {
        // width: '250px',
        data: { codigo: codigo, valido: true },
        disableClose: false
      });

      dialogRef.afterClosed().subscribe((res) => {
        this.formTab1.controls['direccionNegocio'].setValue(res);
      })

  }

  siguienteTab(){

  }
  atras(){

  }

  //borrar


}
