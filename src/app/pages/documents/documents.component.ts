import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreditService } from 'src/app/services/credit.service';
import { GenericService } from "../../services/generic.service";
import Swal from "sweetalert2";
import {Subject, Subscription} from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import {takeUntil} from "rxjs/operators";

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

  constructor(
    private _creditService: CreditService,
    private _activatedRoute: ActivatedRoute,
    private _generiService: GenericService,
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
      console.log(resp);

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
          '¡Información!',
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
        '¡Información!',
        `Ha ocurrido un error`,
        'error',
      );
    })
  }

  ngOnDestroy(): void {
    this.subject$.unsubscribe();
  }
  atras(){
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
    this._generiService.posData(url,data).subscribe((res: any) => {
      if (res.status == 200) {
        Swal.fire(
          '¡Información!',
          `Se guardo el registro con éxito`,
          'success'
        ).then(resultado => {
          if (resultado.isConfirmed) {
            this.getdocumentos();
          }
        });
      }
    });
  }

}