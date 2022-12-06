import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2";
import { CreditService } from "../../../services/credit.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-firmar-documentos',
  templateUrl: './firmar-documentos.component.html',
  styleUrls: ['./firmar-documentos.component.scss']
})
export class FirmarDocumentosComponent implements OnInit, OnDestroy {

  public unsubscribe$: Subject<any> = new Subject<any>();
  public cantidadDocumentos: any = []
  adjuntoSolicitud: boolean=false;
  adjuntoAutorizacion: boolean=false;
  adjuntoPagare: boolean=false;
  constructor(
    public dialogRef: MatDialogRef<FirmarDocumentosComponent>,
    public _creditService: CreditService,
    private _generiService: GenericService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {

  }

  descargar(type: number) {
    let url = '';
    let nombre
    switch (type) {
      case 1:
        url = "/assets/documentos/solicitudCredito.pdf";
        nombre = "Solicitud_de_crédito"
        break;

      case 2:
        url = `/assets/documentos/centralesRiesgo${this.data.typeSolicitud == 'CC' ? 'Natural' : 'Juridica'}.pdf`;
        nombre = `centralesRiesgo${this.data.typeSolicitud == 'CC' ? 'Natural' : 'Juridica'}`
        break;
      case 3:
        url = "/assets/documentos/pagare.pdf";
        nombre = "pagare"
        break;
    }
    let link = document.createElement('a');
    link.href = url;
    link.download = `${nombre}_${this.data.codigoSolicitud}.pdf`;
    link.dispatchEvent(new MouseEvent('click'));
  }

  subirSolicitud(input: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    let formulario: {};
    const files = input.target.files;
    console.log(files);
    if (files && files.length) {
      const fileToRead = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileToRead);
      reader.onloadend = () => {
        const file: string | ArrayBuffer | null = reader.result;
        const nombre: string = fileToRead.name.split('.')[0];
        const extension: string = fileToRead.type.split('/')[1];
        const fechaHoy = Date.now();
        formulario = {
          nombreArchivo: nombre + '' + fechaHoy,
          extension: extension,
          fuente: 'archivo-multi',
          identificador: '',
          numeroSolicitud: this.data.codigoSolicitud,
          tipoArchivo: this.data.typeSolicitud === 'CC' ? 484 : 485,
          categoria: 79,
          agencia: 'OP',
          tipo: 'negocio',
          base64: file
        };
        this.guardarAdjunto(formulario,1);

      }

    }

  }

  subirAutorizacion(input: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    let formulario: {};
    const files = input.target.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileToRead);
      reader.onloadend = () => {
        const file: string | ArrayBuffer | null = reader.result;
        const nombre: string = fileToRead.name.split('.')[0];
        const extension: string = fileToRead.type.split('/')[1];
        const fechaHoy = Date.now();
        formulario = {
          nombreArchivo: nombre + '' + fechaHoy,
          extension: extension,
          fuente: 'archivo-multi',
          identificador: '',
          numeroSolicitud: this.data.codigoSolicitud,
          tipoArchivo: this.data.typeSolicitud === 'CC' ? 483 : 482,
          categoria: 78,
          agencia: 'OP',
          tipo: 'negocio',
          base64: file
        };
        this.guardarAdjunto(formulario,2);
      }

    }
  }

  subirPagare(input: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    let formulario: {};
    const files = input.target.files;
    console.log(files);
    if (files && files.length) {
      const fileToRead = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileToRead);
      reader.onloadend = () => {
        const file: string | ArrayBuffer | null = reader.result;
        const nombre: string = fileToRead.name.split('.')[0];
        const extension: string = fileToRead.type.split('/')[1];
        const fechaHoy = Date.now();
        formulario = {
          nombreArchivo: nombre + '' + fechaHoy,
          extension: extension,
          fuente: 'archivo-multi',
          identificador: '',
          numeroSolicitud: this.data.codigoSolicitud,
          tipoArchivo: this.data.typeSolicitud === 'CC' ? 487 : 488,
          categoria: 80,
          agencia: 'OP',
          tipo: 'negocio',
          base64: file
        };
        this.guardarAdjunto(formulario,3);
      }
    }
  }

  onFirmar(): void {
    /**
     * @description: Metodo para firmar documentos
     */
    let url = `generic/cre-cambiar-estado-solicitud`;
    let data = {
      "numeroSolicitud": Number(this.data.codigoSolicitud),
      "estado": "FA",
      "subEstado": "C"
    }
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._generiService.posData(url, data).subscribe((res: any) => {
      if (res.status == 200) {
        Swal.fire(
          '¡Información!',
          `Se guardo el registro con éxito`,
          'success'
        ).then(resultado => {
          if (resultado.isConfirmed) {
            let url = `/finalizado`;
            this.router.navigateByUrl(url);
          }
        });
      }
    });

  }

  private guardarAdjunto(data: any,type:number): void {
    this._creditService.adjuntarDocumento(data)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        if (data.status == 200) {
          Swal.fire(
            'Información',
            `Se guardo el registro con éxito`,
            'success'
          ).then(resultado => {
            if (resultado.isConfirmed) {
              // this.getdocumentos();
              this.cantidadDocumentos.push(1);
              switch (type) { 
                case 1: this.adjuntoSolicitud=true; break;
                case 2: this.adjuntoAutorizacion=true; break;
                case 3: this.adjuntoPagare=true; break;
              }
            }
          });
        }

      }, error => {
        Swal.fire(
          'Información',
          `Ha ocurrido un error`,
          'error',
        );
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

}
