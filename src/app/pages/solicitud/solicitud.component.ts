import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DatosContactoComponent } from 'src/app/components/modals/datos-contacto/datos-contacto.component';
import { listaGenerica, CreditService } from 'src/app/services/credit.service';
import { format, getDate, parseISO } from 'date-fns'
import { GenericService } from 'src/app/services/generic.service';
import { MatCheckboxChange } from "@angular/material/checkbox";
import {delay, switchMap, tap} from "rxjs/operators";
import { Router } from "@angular/router";
import { ReconocerComponent } from '../../shared/reconocer/reconocer.component';
import Swal from 'sweetalert2';
import {ModalAceptoTerminosComponent} from "../../shared/modal-acepto-terminos/modal-acepto-terminos.component";
import {of} from "rxjs";
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class solicitudComponent implements OnInit {

  title = 'ultracem';
  alto: any;
  ancho: any;
  formInicial: FormGroup;
  formSolicitudNatural: FormGroup;
  formSolicitudJuridica: FormGroup;
  formSolicitudRepresentante: FormGroup;
  natural: boolean = true;
  tipoRegistro: listaGenerica[] = [];
  tipoRegistroJuridico: listaGenerica[] = [];
  siNo: listaGenerica[] = [];
  tipoGenero: listaGenerica[] = [];
  step: number = 1;
  cargando: boolean = false;
  existeDatos: boolean = false;
  public estadoSolicitud: any = {
    error: false,
    rechazado: false,
    aprobado: false
  }

  fechaMaxima: any;

  public formulario: any;
  public aplicaValidacionEntidad: boolean=false;
  public entidad: string="";

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _creditService: CreditService,
    public _generic: GenericService,
    private router: Router,
    private _matDialog: MatDialog
  ) {

    localStorage.clear();
    this.fechaValida();
    this.formSolicitudJuridica = this.fb.group({
      tipoTercero: ["", [Validators.required]], // Cambia en juridica
      tipoDocumento: ["", [Validators.required]],
      documento: ["", [Validators.required]],
      clienteUltracem: ["", [Validators.required]],

      primerNombre: [""],
      segundoNombre: [""],
      primerApellido: [""],
      segundoApellido: [""],
      fechaNacimiento: [""],
      genero: [""],

      nombreCompleto: ["", [Validators.required]], // razon Social
      celular: ["", [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(10)]],
      compraSemanal: ['', [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(/[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)]],
      antiguedadCompra: [0],
      aceptaTerminos: [false, [Validators.requiredTrue]],
      aceptaConsultaCentrales: [false, [Validators.requiredTrue]],
      telefono: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(7)]],
      digitoVerificacion: [''],
      fechaMatricula: ["", [Validators.required]],

      antiguedadNegocio: [''],
      numeroSolicitud: [""],
    });
    this.formSolicitudRepresentante = this.fb.group({
      tipoTercero: ["R", [Validators.required]],
      tipoDocumento: ["CC", [Validators.required]],
      documento: ["", [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(5), Validators.maxLength(10)]],
      clienteUltracem: ["N"],
      primerNombre: ["", [Validators.required]],
      segundoNombre: [""],
      primerApellido: ["", [Validators.required]],
      segundoApellido: [""],
      nombreCompleto: [""],
      fechaNacimiento: ["", Validators.required],
      genero: ["", [Validators.required]],
      celular: ["", [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(10)]],
      email: ["", [Validators.required, Validators.pattern(/[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)]],
      antiguedadNegocio: [0],
      antiguedadCompra: [0],
      compraSemanal: [0],
      aceptaTerminos: [false, [Validators.requiredTrue]],
      aceptaConsultaCentrales: [false, [Validators.requiredTrue]],
      fechaMatricula: [""],
      digitoVerificacion: [""],
      numeroSolicitud: [""],
    });
    this.formSolicitudNatural = this.fb.group({
      tipoTercero: ["", [Validators.required]], // Cambia en juridica
      tipoDocumento: ["", [Validators.required]],
      documento: ["", [Validators.required]],
      clienteUltracem: ["", [Validators.required]],
      primerNombre: ["", [Validators.required]],
      segundoNombre: [""],
      primerApellido: ["", [Validators.required]],
      segundoApellido: [""],
      nombreCompleto: [""],
      fechaNacimiento: ["", [Validators.required]],
      genero: ["", [Validators.required]],
      celular: ["", [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(11)]],
      email: ["", [Validators.required, Validators.pattern(/[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)]],
      antiguedadNegocio: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      antiguedadCompra: [0],
      compraSemanal: ['', [Validators.required]],
      aceptaTerminos: [false, [Validators.requiredTrue]],
      aceptaConsultaCentrales: [false, [Validators.requiredTrue]],
      fechaMatricula: [""],
      digitoVerificacion: [""],
      numeroSolicitud: [""],
    });
    this.formInicial = this.fb.group({
      cliente: ['', Validators.required],
      registrar: [{ value: '', disabled: true }, Validators.required],
      registrado: [{ value: '', disabled: true }, Validators.required],
      tipoDocumento: ['', Validators.required],
      documento: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    })
    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';
  }

  ngOnInit(): void {
    this.loguear();
    this.formInicial.controls['registrar'].valueChanges.subscribe(registrar => {
      if (registrar == 'CC') {
        this.natural = true;
        this.formInicial.controls['tipoDocumento'].setValue(registrar);
        this.formInicial.controls['documento'].setValidators([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(5), Validators.maxLength(10)]);

      } else if (registrar == 'NIT') {
        this.formInicial.controls['tipoDocumento'].setValue(registrar);
        this.formInicial.controls['documento'].setValidators([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(9)]);

        this.natural = false;
      }
    })
    this.formInicial.controls['registrado'].valueChanges.subscribe(registrado => {
      if (registrado == 'CC') {
        this.natural = true;
        this.formInicial.controls['tipoDocumento'].setValue('CC');
        this.formInicial.controls['documento'].setValidators([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(5), Validators.maxLength(10)]);
      } else if (registrado == 'NIT') {
        this.formInicial.controls['tipoDocumento'].setValue('NIT');
        this.formInicial.controls['documento'].setValidators([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(9)]);
        this.natural = false;
      }
      this.formInicial.controls['documento'].updateValueAndValidity();
    })
    this.formInicial.controls['cliente'].valueChanges.subscribe(cliente => {
      if (cliente == 'S') {
        this.formInicial.controls['registrar'].setValue('');
        this.formInicial.controls['registrar'].removeValidators(Validators.required);
        this.formInicial.controls['registrar'].updateValueAndValidity();
        this.formInicial.controls['registrar'].disable({ onlySelf: true })

        this.formInicial.controls['registrado'].enable({ onlySelf: true })
        this.formInicial.controls['registrado'].setValidators(Validators.required)
      } else {
        this.formInicial.controls['registrar'].setValidators(Validators.required)
        this.formInicial.controls['registrar'].enable({ onlySelf: true });

        this.formInicial.controls['registrado'].removeValidators(Validators.required)
        this.formInicial.controls['registrado'].setValue('');
        this.formInicial.controls['registrado'].updateValueAndValidity();
        this.formInicial.controls['registrado'].disable({ onlySelf: true })
      }
    });


    //aplica reconocer
    /*this._generic.getAplicaValidacionIdentidad().subscribe(res => {
      if (res.status == 200) {
        if ((res.data.aplica == "SI") && (res.data.entidad == "RECONOSER")) {
          this.aplicaValidacionEntidad = true;
          this.entidad = "RECONOSER";
          // this.openReconocer("1143163517","smuelle@fintra.co", "3045337156")
        } else {
          this.aplicaValidacionEntidad = false;
        }
      }
    })*/
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';
  }

  openDialog(tipoDocumento: string) {
    const dialogRef = this.dialog.open(DatosContactoComponent, {
      width: '25%',
      data: { tipoDocumento },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      const datos: any = { ...result };
      // console.log(datos);
      let form: any;
      let formJuridico: any;
      if (datos.tipoDocumento == 'CC') {
        form = { ...this.formSolicitudNatural.value };
      } else {
        formJuridico = { ...this.formSolicitudJuridica.value }
      }
      if (datos.tipoDocumento == 'CC' && datos.cerrar) {
        this.formSolicitudNatural.controls.celular.setValue(result.celular ? result.celular : form.celular);
        this.formSolicitudNatural.controls.email.setValue(result.email ? result.email : form.email);
        form.celular = this.formSolicitudNatural.controls.celular.value;
        form.email = this.formSolicitudNatural.controls.email.value;
        delete form.fechaMatricula
        form.compraSemanal = Number(this._generic.enviarNumero(this.formSolicitudNatural.value.compraSemanal));
        this.guardarSolicitudUltracem(form);

      } else if (datos.tipoDocumento == 'CC' && !datos.cerrar) {
        form.fechaNacimiento = format(this.formSolicitudNatural.value.fechaNacimiento, 'yyyy-MM-dd');
        form.nombreCompleto = `${this.formSolicitudNatural.value.primerNombre + ' '}${this.formSolicitudNatural.value.segundoNombre ? this.formSolicitudNatural.value.segundoNombre + ' ' : ''}${this.formSolicitudNatural.value.primerApellido && this.formSolicitudNatural.value.segundoApellido ? this.formSolicitudNatural.value.primerApellido + ' ' : this.formSolicitudNatural.value.primerApellido}${this.formSolicitudNatural.value.segundoApellido ? this.formSolicitudNatural.value.segundoApellido : ''}`
        delete form.fechaMatricula
        form.compraSemanal = Number(this._generic.enviarNumero(this.formSolicitudNatural.value.compraSemanal));
        this.guardarSolicitudUltracem(form);

      } else if (datos.tipoDocumento == 'NIT' && datos.cerrar) {
        this.formSolicitudJuridica.controls.telefono.setValue(result.telefono ? result.telefono : formJuridico.telefono);
        this.formSolicitudJuridica.controls.celular.setValue(result.celular ? result.celular : formJuridico.celular);
        this.formSolicitudJuridica.controls.email.setValue(result.email ? result.email : formJuridico.email);
        formJuridico.celular = this.formSolicitudJuridica.controls.celular.value;
        formJuridico.email = this.formSolicitudJuridica.controls.email.value;
        formJuridico.antiguedadNegocio = 0;
        formJuridico.fechaMatricula = format(this.formSolicitudJuridica.value.fechaMatricula, 'yyyy-MM-dd');
        formJuridico.compraSemanal = Number(this._generic.enviarNumero(this.formSolicitudJuridica.value.compraSemanal));
        this.guardarSolicitudJultracem(formJuridico);

      } else if (datos.tipoDocumento == 'NIT' && !datos.cerrar) {
        formJuridico.antiguedadNegocio = 0;
        formJuridico.fechaMatricula = format(this.formSolicitudJuridica.value.fechaMatricula, 'yyyy-MM-dd');
        formJuridico.compraSemanal = Number(this._generic.enviarNumero(this.formSolicitudJuridica.value.compraSemanal));
        this.guardarSolicitudJultracem(formJuridico);
      }
    });
  }

  openReconocer(documento: string, email: string, celular: string, typePerson:string) {
    if (this.aplicaValidacionEntidad) {
      switch (this.entidad) {
        case 'RECONOSER':
          const dialogRef = this.dialog.open(ReconocerComponent, {
            height: '98%',
            width: '100vw',
            data: {
              documento: documento,
              email: email,
              celular: celular
            },
            disableClose: true,
            panelClass: 'full-screen-modal'
          });
          dialogRef.afterClosed().subscribe(result => {
            if(result==true){
              if (typePerson == 'CC') {
                this.guardarSolicitudUltracem(this.formulario);
              }else{
                this.SolicitudRepresentante();
              }
            }

          });
        break;

        default:
          this.guardarSolicitudUltracem(this.formulario);
        break;
      }
    } else {
      this.guardarSolicitudUltracem(this.formulario);
    }





    // this.guardarSolicitudUltracem(this.formulario);

  }

  compareObjects(o1: any, o2: any) {
    if (o1 == o2) {
      return true;
    } else {
      return false;
    }
  }

  loguear(): void {
    this._creditService.login().subscribe(res => {
      localStorage.setItem('accessToken', res.data.token)
      this.eresclienteUltracem();
      this.obtenerTipoRegistro();
      this.obtenerTipoGenero();
      this.obtenerTipoRegistroJuridico();
    });
  }

  obtenerTipoRegistro() {
    this._creditService.getTipoRegistro().subscribe(resp => {
      this.tipoRegistro = resp.data;
    })
  }

  obtenerTipoRegistroJuridico(): void {
    this._creditService.getDocumentsTypes().subscribe(resp => {
      this.tipoRegistroJuridico = resp.data;
    })
  }

  obtenerTipoGenero() {
    this._creditService.getGeneros().subscribe(resp => {
      this.tipoGenero = resp.data;
    })
  }

  eresclienteUltracem(): void {
    this._creditService.getClienteUltracem().subscribe(resp => {
      this.siNo = resp.data;
    })
  }

  preaprobado(): void {
    if (this.formInicial.valid) {
      this.cargando = true;
      const datos: any = {
        documento: this.formInicial.controls.documento.value
      }
      this._creditService.validarSolicitud(datos).pipe(delay(500)).subscribe(resp => {
          if (resp.data.existe > 0) {
            this.router.navigateByUrl('/existente');
            return;
          }else {
            this._creditService.preaprobado(this.formInicial.value).pipe(delay(500)).subscribe((resp) =>{
              if (resp.data) {
                this.existeDatos = true;
                if (this.formInicial.value.tipoDocumento == 'CC') {
                  this.formSolicitudNatural.patchValue({
                    tipoTercero: 'T',
                    tipoDocumento: this.formInicial.value.tipoDocumento,
                    documento: (this.formInicial.value.documento).toString(),
                    clienteUltracem: this.formInicial.value.cliente,
                    primerNombre: resp.data.primerNombre,
                    segundoNombre: resp.data.segundoNombre,
                    primerApellido: resp.data.primerApellido,
                    segundoApellido: resp.data.segundoApellido,
                    nombreCompleto: resp.data.nombreCompleto,
                    fechaNacimiento: '',
                    genero: '',
                    celular: resp.data.celular,
                    email: resp.data.email,
                    antiguedadCompra: resp.data.antiguedadCompra,
                    compraSemanal: this._generic.formatearNumero(resp.data.compraSemanal.toString())
                  });
                  this.step = 2;
                } else {
                  this.formSolicitudJuridica.patchValue({
                    tipoTercero: 'T',
                    tipoDocumento: this.formInicial.value.tipoDocumento,
                    documento: (this.formInicial.value.documento).toString(),
                    clienteUltracem: this.formInicial.value.cliente,
                    nombreCompleto: resp.data.razonSocial,
                    celular: resp.data.celular,
                    email: resp.data.email,
                    compraSemanal: this._generic.formatearNumero(resp.data.compraSemanal.toString()),
                    antiguedadCompra: resp.data.antiguedadCompra,
                    telefono: resp.data.telefono,
                    digitoVerificacion: resp.data.digitoVerificacion
                  });
                  this.step = 3;
                }
              } else {
                if (this.formInicial.value.tipoDocumento == 'CC') {
                  this.formSolicitudNatural.patchValue({
                    tipoTercero: 'T',
                    tipoDocumento: this.formInicial.value.tipoDocumento,
                    documento: (this.formInicial.value.documento).toString(),
                    clienteUltracem: this.formInicial.value.cliente
                  });
                  this.step = 2;
                } else {
                  this.formSolicitudJuridica.patchValue({
                    tipoTercero: 'T',
                    tipoDocumento: this.formInicial.value.tipoDocumento,
                    documento: (this.formInicial.value.documento).toString(),
                    clienteUltracem: this.formInicial.value.cliente,
                    digitoVerificacion: this.calcularDigitoVerificacion(this.formInicial.value.tipoDocumento)
                  });
                  this.step = 3;
                }
              }
              this.cargando = false;
            })
          }
        });
    } else {
      this.formInicial.markAllAsTouched();
    }

  }

  fechaValida(): void {
    const anioActual = format(new Date(), "yyyy-MM-dd");
    this.fechaMaxima = anioActual;
  }

  SolicitudRepresentante(): void {
    // reconocer
    if (this.formSolicitudRepresentante.valid) {
      let form = { ...this.formSolicitudRepresentante.value }
      form.fechaNacimiento = format(this.formSolicitudRepresentante.value.fechaNacimiento, 'yyyy-MM-dd');
      form.documento = (this.formSolicitudRepresentante.value.documento).toString();
      this.guardarSolicitudJultracemRepresentante(form);
    } else {
      this.formSolicitudRepresentante.markAllAsTouched();
    }
  }

  SolicitudNUltracem(): void {
    if (this.formSolicitudNatural.valid) {
      console.log('SSSS')
      let form = { ...this.formSolicitudNatural.value }
      form.fechaNacimiento = format(this.formSolicitudNatural.value.fechaNacimiento, 'yyyy-MM-dd');
      form.nombreCompleto = `${this.formSolicitudNatural.value.primerNombre + ' '}${this.formSolicitudNatural.value.segundoNombre ? this.formSolicitudNatural.value.segundoNombre + ' ' : ''}${this.formSolicitudNatural.value.primerApellido && this.formSolicitudNatural.value.segundoApellido ? this.formSolicitudNatural.value.primerApellido + ' ' : this.formSolicitudNatural.value.primerApellido}${this.formSolicitudNatural.value.segundoApellido ? this.formSolicitudNatural.value.segundoApellido : ''}`
      delete form.fechaMatricula
      form.compraSemanal = Number(this._generic.enviarNumero(this.formSolicitudNatural.value.compraSemanal));
      this.formulario = form;
      this.openReconocer(form.documento, form.email, form.celular,'CC')
      // delete form.compraSemanal
      this.guardarSolicitudUltracem(form)

    } else {
      this.formSolicitudNatural.markAllAsTouched();
    }
  }

  onActualizarNultracem(): void {
    if (this.formSolicitudNatural.valid) {
      let form = { ...this.formSolicitudNatural.value };
      const tipoDocumento = form.tipoDocumento
      this.openDialog(tipoDocumento);
    } else {
      this.formSolicitudNatural.markAllAsTouched();
    }
  }

  onActualizarJultracem(): void {
    if (this.formSolicitudJuridica.valid) {
      let form = { ...this.formSolicitudJuridica.value };
      const tipoDocumento = form.tipoDocumento
      this.openDialog(tipoDocumento);
    } else {
      this.formSolicitudJuridica.markAllAsTouched();
    }
  }

  onAceptoTerminos(evento: MatCheckboxChange): void {
    if (evento.checked) {
      const dialogRef = this._matDialog.open(ModalAceptoTerminosComponent, {
        minWidth: '100%',
        height: '100%',
      })
      dialogRef.afterClosed().toPromise().then((res) => {
        console.log('Cerrado');
      });
    }
  }

  SolicitudJUltracem(): void {
    if (this.formSolicitudJuridica.valid) {
      let form = { ...this.formSolicitudJuridica.value }
      form.antiguedadNegocio = 0;
      form.fechaMatricula = format(this.formSolicitudJuridica.value.fechaMatricula, 'yyyy-MM-dd');
      form.compraSemanal = Number(this._generic.enviarNumero(this.formSolicitudJuridica.value.compraSemanal));
      this.guardarSolicitudJultracem(form);
      /*this._creditService.solicitudUltracem(form).subscribe(resp => {
        this.formSolicitudRepresentante.patchValue({
          numeroSolicitud: (resp.data.numeroSolicitud).toString()
        });

        this.step = 4;
        console.log(resp);
        console.log('representante', this.formSolicitudRepresentante.value);
      });*/
    } else {
      this.formSolicitudJuridica.markAllAsTouched();
    }
  }

  private guardarSolicitudUltracem(datos: any): void {
    this.cargando = true;
    this._creditService.solicitudUltracem(datos).pipe(delay(500))
      .subscribe(resp => {
        console.log(resp);
        switch (resp.data.estado) {
          case 'RECHAZADO':
            this.estadoSolicitud.rechazado = true;
            this.cargando = false;
            this.router.navigateByUrl('/rechazado');
            break;
          case 'APROBADO':
            this.estadoSolicitud.aprobado = true;
            this.cargando = false;
            this.router.navigateByUrl('/aprobado');
            break;
        }
      }, error => {
        this.router.navigateByUrl('/error');
      });
  }



  private guardarSolicitudJultracem(datos: any): void {
    this.cargando = true;
    this._creditService.solicitudUltracem(datos).pipe(delay(500))
      .subscribe(resp => {
        this.formSolicitudRepresentante.patchValue({
          numeroSolicitud: (resp.data.numeroSolicitud).toString()
        });
        this.cargando = false;

        this.step = 4;
        console.log(resp);
        console.log('representante', this.formSolicitudRepresentante.value);
      });
  }

  private guardarSolicitudJultracemRepresentante(datos: any): void {
    this.cargando = true;
    this._creditService.solicitudUltracem(datos).pipe(delay(500))
      .subscribe(resp => {
        console.log(resp);
        switch (resp.data.estado) {
          case 'RECHAZADO':
            this.estadoSolicitud.rechazado = true;
            this.cargando = false;
            this.router.navigateByUrl('/rechazado');
            break;
          case 'APROBADO':
            this.formSolicitudRepresentante.patchValue({
              numeroSolicitud: (resp.data.numeroSolicitud).toString()
            });
            this.cargando = false;

            this.step = 4;
            console.log(resp);
            console.log('representante', this.formSolicitudRepresentante.value);
            this.estadoSolicitud.aprobado = true;
            this.router.navigateByUrl('/aprobado');
            break;
        }
      }, error => {
        this.router.navigateByUrl('/error');
      });
  }

  private validaSolicitud(datos: any) {
    return this._creditService.validarSolicitud(datos);
  }

  calcularDigitoVerificacion(data: any): any {
    let vpri; let x; let y; let z;

    // Se limpia el Nit
    data = data.replace(/\s/g, ''); // Espacios
    data = data.replace(/,/g, ''); // Comas
    data = data.replace(/\./g, ''); // Puntos
    data = data.replace(/-/g, ''); // Guiones

    // Se valida el nit
    if (isNaN(data)) {
      console.log('El nit/cédula \'' + data + '\' no es válido(a).');
      return '';
    };

    // Procedimiento
    vpri = new Array(16);
    z = data.length;

    vpri[1] = 3;
    vpri[2] = 7;
    vpri[3] = 13;
    vpri[4] = 17;
    vpri[5] = 19;
    vpri[6] = 23;
    vpri[7] = 29;
    vpri[8] = 37;
    vpri[9] = 41;
    vpri[10] = 43;
    vpri[11] = 47;
    vpri[12] = 53;
    vpri[13] = 59;
    vpri[14] = 67;
    vpri[15] = 71;

    x = 0;
    y = 0;
    for (let i = 0; i < z; i++) {
      y = (data.substr(i, 1));
      x += (y * vpri[z - i]);
    }

    y = x % 11;
    return (y > 1) ? 11 - y : y;
  }
  /**
   * @description: Validacion de campos de formulario requerido
   */
  public validacionCamposRequerido(field: string) {
    return this.formInicial.controls[field].errors
      && this.formInicial.controls[field].touched;
  }

  public keyDown(event: any): boolean {
    return event.keyCode == 69 ? false : true;
  }

  public keyPress(event: any): any {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
}
