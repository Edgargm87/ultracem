import {Component, OnDestroy, OnInit} from '@angular/core';
import { CreditService } from 'src/app/services/credit.service';
import {GenericService} from "../../services/generic.service";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  documentos: any;
  public subscription$!: Subscription;

  constructor(
    private _creditService: CreditService,
    private _generiService: GenericService
  ) {
  }

  ngOnInit(): void {
    this.getdocumentos()
  }

  getdocumentos() {
    this._creditService.getDocuments('CC', 112).subscribe(resp => {
      this.documentos = resp.data;
      console.log(resp);

    })
  }
  /**
   * @description: Carga imagen en base 64
   */
  subirArchivo(input: any, item: any): void {
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
          numeroSolicitud: "112",
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
    this.subscription$ = this._creditService.adjuntarDocumento(data).subscribe((data: any) => {
      if (data.status == 200){
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
    this.subscription$.unsubscribe();
  }

}
