import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreditService } from 'src/app/services/credit.service';
import { GenericService } from "../../services/generic.service";
import Swal from "sweetalert2";
import { Subject, Subscription } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { FirmarDocumentosComponent } from 'src/app/components/modals/firmar-documentos/firmar-documentos.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  documentos: any;
  public subscription$!: Subscription;
  public subject$: Subject<any> = new Subject<any>();
  codigoSolicitud: any;
  typeSolicitud: any;
  validado: boolean = false;
  constructor(
    private _creditService: CreditService,
    private _activatedRoute: ActivatedRoute,
    private _generiService: GenericService,
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(param => {
      this.codigoSolicitud = param.codigoSolicitud
      this.typeSolicitud = param.type
      this.getdocumentos()
    })

  }

  getdocumentos() {
    Swal.fire({ title: 'Cargando', html: 'Cargando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._creditService.getDocuments(this.typeSolicitud, this.codigoSolicitud).subscribe(resp => {
      Swal.close();
      this.documentos = resp.data;
      // console.log(resp);

    })
  }
  /**
   * @description: Carga imagen en base 64
   */
  subirArchivo(input: any, item: any): void {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    let formulario: {};
    const files = input.target.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileToRead);
      reader.onloadend = () => {
        const file: string | ArrayBuffer | null = reader.result;
        const extension: string = fileToRead.type.split('/')[1];
        const fechaHoy = Date.now();
        formulario = {
          nombreArchivo: item.nombreArchivo + '' + fechaHoy,
          extension: extension,
          fuente: 'archivo-multi',
          identificador: '',
          numeroSolicitud: this.codigoSolicitud,
          tipoArchivo: item.idArchivo,
          categoria: item.idCategoria,
          agencia: 'OP',
          tipo: 'negocio',
          base64: file
        }
        this.guardarAdjunto(formulario);
      };

    }
  }

  private guardarAdjunto(data: any): void {
    this._creditService.adjuntarDocumento(data)
      .pipe(takeUntil(this.subject$))
      .subscribe((data: any) => {
        if (data.status == 200) {
          Swal.fire(
            'Información',
            `Se guardo el registro con éxito`,
            'success'
          ).then(resultado => {
            if (resultado.isConfirmed) {
              this.getdocumentos();
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
    this.subject$.unsubscribe();
  }
  atras() {
    let url = `main/listRequest`;
    this.router.navigateByUrl(url);
  }
  eliminarArchivo(x: string) {
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    let url: string = '';
    url = `generic/cre-inactivar-doc`;
    let data = {
      "numeroSolicitud": parseInt(this.codigoSolicitud),
      "idArchivoCargado": parseInt(x)
    }
    this._generiService.posData(url, data).subscribe((res: any) => {
      if (res.status == 200) {
        Swal.fire(
          '¡Información!',
          `Se elimino el adjunto con éxito`,
          'success'
        ).then(resultado => {
          if (resultado.isConfirmed) {
            this.getdocumentos();
          }
        });
      }
    });
  }
  descargar(url:string, nombre:string,id:number) {


      let data = {
        "numeroSolicitud": parseInt(this.codigoSolicitud),
        "tipificacionId": id,
        "unidadNegocio":32,
      }
      Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
      this._generiService.posData('credito/llenado-documentos-pdf', data).subscribe((res: any) => {
        Swal.close();
        if (res.status == 200) {
         console.log(res)
         const downloadLink = document.createElement('a');
            document.body.appendChild(downloadLink);
            downloadLink.href = res.data.base64;
            downloadLink.target = '_self';
            downloadLink.download = `${nombre}_${this.codigoSolicitud}.pdf`;
            downloadLink.click();
        }
      });
    
  }
  firmar() {
    // debugger;
    let contador = 0;
    for (const iterator of this.documentos) {
      // archivo no cargado

      if ((iterator.archivoCargado == 'N') && (iterator.requerido == "S")) {
        contador = +1
      }
    }

    if (contador > 0) {
      this.validado = true;
      Swal.fire(
        'Información',
        `Aún falta documentos obligatorios por cargar`,
        'info'
      ).then(resultado => {
        if (resultado.isConfirmed) {

        }
      });
      return;
    }
    /**
   * @description: Metodo para firmar documentos
   * "ES": ESTUDIO
   * "FC": FABRICA COMPLETACIÓN
   */
    let url = `generic/cre-cambiar-estado-solicitud`;
    let data = {
      "numeroSolicitud": Number(this.codigoSolicitud),
      "estado": "ES",
      "subEstado": "FC"
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

}
