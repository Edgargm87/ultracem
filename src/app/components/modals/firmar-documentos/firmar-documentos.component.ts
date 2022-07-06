import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2";
import { CreditService } from "../../../services/credit.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { GenericService } from 'src/app/services/generic.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-firmar-documentos',
  templateUrl: './firmar-documentos.component.html',
  styleUrls: ['./firmar-documentos.component.scss']
})
export class FirmarDocumentosComponent implements OnInit, OnDestroy {

  public unsubscribe$: Subject<any> = new Subject<any>();
  public cantidadDocumentos: any = []
  adjuntoSolicitud: boolean = false;
  adjuntoAutorizacion: boolean = false;
  adjuntoPagare: boolean = false;
  paso: number = 3;
  counter$: any;
  secunds: number = 280;
  documentosFirmar: any = [];
  numeroOTP: String = '';
  signingForm: FormGroup;
  timeLeft: number = 280;
  interval: any
  codigoSolicitud: any = this.route.snapshot.paramMap.get('codigoSolicitud');
  typeSolicitud: any = this.route.snapshot.paramMap.get('type');
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    // public dialogRef: MatDialogRef<FirmarDocumentosComponent>,
    public _creditService: CreditService,
    private _generiService: GenericService,
    private router: Router,
    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.signingForm = this.formBuilder.group({
      conditions: ['', Validators.requiredTrue],
      contrasena: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(8), this.numberValid, this.lowercaseUppercaseValid, this.repeatLetter]],
      confirmcontrasena: ['', Validators.required]
    }, { validator: this.confirmPassword });
  }

  ngOnInit(): void {

    // this.comenzarPaso2();
    let url = `generic/qry/documento-a-firmar/${this.codigoSolicitud}`;
    Swal.fire({ title: 'Cargando', html: 'Listando documentos...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._generiService.getData(url).subscribe((res: any) => {
      Swal.close();
      console.log(res);
      this.documentosFirmar = res;
    });
  }

  descargar(type: number) {
    switch (type) {
      case 525:
        this.verPagare();
        break;
      case 526:
        this.verPagare();
        break;

      default:
        break;
    }
  }

  verPagare() {
    let data = {
      "numeroSolicitud": this.codigoSolicitud,
      "tipoTercero": 'T'
    }
    Swal.fire({ title: 'Cargando', html: 'Generando pagare', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._generiService.posData('/deceval/deceval-mostrar-pagare-pdf', data).subscribe((res: any) => {
      Swal.close();
      if (res.status == 200) {
        console.log(res)
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.href = res.data.base64;
        downloadLink.target = '_self';
        downloadLink.download = `pagare_${this.codigoSolicitud}.pdf`;
        downloadLink.click();
      }
    });
  }

  generaOTP() {
    let data = {
      "numeroSolicitud": Number(this.codigoSolicitud),
      "tipoTercero": 'T'
    }
    Swal.fire({ title: 'Cargando', html: 'Generando OTP', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._generiService.posData('/firma/solicitud-generar-otp', data).subscribe((res: any) => {
      Swal.close();
      if (res.status == 200) {
        console.log(res)
        Swal.fire({
          title: `${res.data.title} `,
          icon: 'success',
          html:
            `${res.data.body} ` +
            `<strong>${res.data.value} </strong>`,
        }).then(resultado => {
          if (resultado) {
           
          }

        })
        setTimeout(() => {
          this.comenzarPaso2();
        }, 1000);
      }
    });
  }
  comenzarPaso2() {
    this.paso = 2;
    this.startTimer();
  }



  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
      }
    }, 1000)
  }


  ValidarOTP() {
    debugger;
    let data = {
      "numeroSolicitud": Number(this.codigoSolicitud),
      "tipoTercero": 'T',
      "numeroOTP": this.numeroOTP
    }
    Swal.fire({ title: 'Cargando', html: 'Validando OTP', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._generiService.posData('/firma/solicitud-validar-otp', data).subscribe((res: any) => {
      Swal.close();
      if (res.status == 200) {
        this.paso = 3;

      }
    });
  }

  guardarContrasena() {
    debugger;
    let data = {
      "numeroSolicitud": Number(this.codigoSolicitud),
      "tipoTercero": 'T',
      "claveFirma": "dfd"
    }
    Swal.fire({ title: 'Cargando', html: 'Guardando información', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this._generiService.posData('/deceval/deceval-firmar-pagare', data).subscribe((res: any) => {
      Swal.close();
      if (res.status == 200) {
        this.paso = 3;

      }
    });
  }

  subirSolicitud(input: any): void {
    Swal.fire({ title: 'Cargando', html: 'Subir solicitud', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
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
          numeroSolicitud: this.codigoSolicitud,
          tipoArchivo: this.typeSolicitud === 'CC' ? 484 : 485,
          categoria: 79,
          agencia: 'OP',
          tipo: 'negocio',
          base64: file
        };
        this.guardarAdjunto(formulario, 1);

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
          numeroSolicitud: this.codigoSolicitud,
          tipoArchivo: this.typeSolicitud === 'CC' ? 483 : 482,
          categoria: 78,
          agencia: 'OP',
          tipo: 'negocio',
          base64: file
        };
        this.guardarAdjunto(formulario, 2);
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
          numeroSolicitud: this.codigoSolicitud,
          tipoArchivo: this.typeSolicitud === 'CC' ? 487 : 488,
          categoria: 80,
          agencia: 'OP',
          tipo: 'negocio',
          base64: file
        };
        this.guardarAdjunto(formulario, 3);
      }
    }
  }

  onFirmar(): void {
    /**
     * @description: Metodo para firmar documentos
     */
    let url = `generic/cre-cambiar-estado-solicitud`;
    let data = {
      "numeroSolicitud": Number(this.codigoSolicitud),
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

  /**
 * 
 * @param group Es el formulario en el que se esta haciendo la validación
 */
  confirmPassword(group: FormGroup) {
    const pass = group.controls.contrasena.value;
    const confirmpass = group.controls.confirmcontrasena.value;
    if (pass !== confirmpass) {
      group.controls.confirmcontrasena.setErrors({ notSame: true });
    }
    return null;
  }

  /**
* 
* @param control El control sobre el cual se esta haciendo la validación
*/
  numberValid(control: FormControl): { [s: string]: boolean } {
    const mayuscula = new RegExp('.*[0-9].*');
    if (control.value !== '' && !control.value.match(mayuscula)) {
      return { notNumber: true };
    }
    return { notNumber: false };
  }

  lowercaseUppercaseValid(control: FormControl): { [s: string]: boolean } {
    const mayuscula = new RegExp('.*[a-zA-Z].*');
    if (!control.value.match(mayuscula) && control.value !== '') {
      return { notLowerUpper: true };
    }
    return { notLowerUpper: false };
  }

  repeatLetter(control: FormControl): { [s: string]: boolean } {
    const repeat = new RegExp('.*([a-z])\\1{4,}.*');
    if (control.value !== '' && control.value.match(repeat)) {
      // if (control.value !== '' && repeat.test(control.value)) {
      return { notRepite: true };
    }
    return { notRepite: false };
  }

  aceptarTerminos(event: Event) {
    // event.preventDefault();
    // const modalRef: NgbModalRef = this.modalService.open(ModalTermns, { backdrop: 'static', centered: true, size: 'xl' });
    // modalRef.result.then(null, (acepted: any) => {
    //   this.signingForm.patchValue({
    //     conditions: acepted
    //   })
    // });
  }
  private guardarAdjunto(data: any, type: number): void {
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
                case 1: this.adjuntoSolicitud = true; break;
                case 2: this.adjuntoAutorizacion = true; break;
                case 3: this.adjuntoPagare = true; break;
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

  atras() {
    let url = `main/listRequest`;
    this.router.navigateByUrl(url);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

}
