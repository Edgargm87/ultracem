import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DatosContactoComponent } from 'src/app/components/modals/datos-contacto/datos-contacto.component';
import { listaGenerica, CreditService } from 'src/app/services/credit.service';
import { format, parseISO } from 'date-fns'
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
  siNo: listaGenerica[] = [];
  tipoGenero: listaGenerica[] = [];
  step: number = 1;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _creditService: CreditService
  ) {
    localStorage.removeItem('TOKEN')
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
      celular: ["", [Validators.required]],
      compraSemanal: ['', [Validators.required]],
      email: ["", [Validators.required]],
      antiguedadCompra: ['', [Validators.required]],
      aceptaTerminos: [false, [Validators.requiredTrue]],
      aceptaConsultaCentrales: [false, [Validators.requiredTrue]],
      telefono: ['', [Validators.required]],
      digitoVerificacion: [''],
      fechaMatricula: ["", [Validators.required]],

      antiguedadNegocio: [''],
      numeroSolicitud: [""],
    });
    this.formSolicitudRepresentante = this.fb.group({
      tipoTercero: ["R", [Validators.required]],
      tipoDocumento: ["CC", [Validators.required]],
      documento: ["", [Validators.required]],
      clienteUltracem: ["N"],
      primerNombre: ["", [Validators.required]],
      segundoNombre: [""],
      primerApellido: ["", [Validators.required]],
      segundoApellido: [""],
      nombreCompleto: [""],
      fechaNacimiento: [""],
      genero: ["", [Validators.required]],
      celular: ["", [Validators.required]],
      email: ["", [Validators.required]],
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
      celular: ["", [Validators.required]],
      email: ["", [Validators.required]],
      antiguedadNegocio: ['', [Validators.required]],
      antiguedadCompra: ['', [Validators.required]],
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
      documento: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)] ],
    })
    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';
  }

  ngOnInit(): void {
    this.loguear();
    this.formInicial.controls['registrar'].valueChanges.subscribe(registrar => {
      if (registrar == 'CC') {
        this.natural = true;
        this.formInicial.controls['tipoDocumento'].setValue(registrar)
      } else if (registrar == 'NIT') {
        this.formInicial.controls['tipoDocumento'].setValue(registrar)
        this.natural = false;
      }
    })
    this.formInicial.controls['registrado'].valueChanges.subscribe(registrado => {
      if (registrado == 'CC') {
        this.natural = true;
        this.formInicial.controls['tipoDocumento'].setValue('CC');
        this.formInicial.controls['documento'].addValidators(Validators.minLength(5));
        this.formInicial.controls['documento'].addValidators(Validators.maxLength(10));
        this.formInicial.controls['documento'].removeValidators(Validators.minLength(9));
        this.formInicial.controls['documento'].removeValidators(Validators.maxLength(9));
      } else if (registrado == 'NIT') {
        this.formInicial.controls['tipoDocumento'].setValue('NIT');
        // this.formInicial.controls['documento'].addValidators(Validators.minLength(9));
        // this.formInicial.controls['documento'].addValidators(Validators.maxLength(9));
        //this.formInicial.controls['documento'].removeValidators(Validators.minLength(5));
        // this.formInicial.controls['documento'].removeValidators(Validators.maxLength(10));

        this.natural = false;
      }
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
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';
  }

  openDialog() {
    const dialogRef = this.dialog.open(DatosContactoComponent, {
      width: '250px',
      data: { name: 1, animal: 2 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
      localStorage.setItem('TOKEN', res.data.token)
      this.eresclienteUltracem();
      this.obtenerTipoRegistro();
      this.obtenerTipoGenero();
    });
  }

  obtenerTipoRegistro() {
    this._creditService.getTipoRegistro().subscribe(resp => {
      this.tipoRegistro = resp.data;
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
    if (this.formInicial.invalid) {
      return;
    };
    this.cargando = true;
    this._creditService.preaprobado(this.formInicial.value).subscribe(resp => {
      if (resp.data) {
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
            fechaNacimiento: resp.data.fechaNacimiento,
            genero: resp.data.genero,
            celular: resp.data.celular,
            email: resp.data.email,
            antiguedadCompra: resp.data.antiguedadCompra,
            compraSemanal: resp.data.compraSemanal
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
            compraSemanal: resp.data.compraSemanal,
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

  SolicitudRepresentante(): void {
    if (this.formSolicitudRepresentante.invalid) {
      return;
    }
    let form = { ...this.formSolicitudRepresentante.value }
    form.fechaNacimiento = format(this.formSolicitudRepresentante.value.fechaNacimiento, 'yyyy-MM-dd');
    form.documento = (this.formSolicitudRepresentante.value.documento).toString();
    this._creditService.solicitudUltracem(form).subscribe(resp => {
      console.log(resp);
    });
  }

  SolicitudNUltracem(): void {
    if (this.formSolicitudNatural.invalid) {
      return;
    }
    let form = { ...this.formSolicitudNatural.value }
    form.fechaNacimiento = format(this.formSolicitudNatural.value.fechaNacimiento, 'yyyy-MM-dd');
    delete form.fechaMatricula
    this._creditService.solicitudUltracem(form).subscribe(resp => {
      console.log(resp);
    });
  }

  SolicitudJUltracem(): void {
    if (this.formSolicitudJuridica.invalid) {
      return;
    }
    let form = { ...this.formSolicitudJuridica.value }
    form.antiguedadNegocio = 0;
    form.fechaMatricula = format(this.formSolicitudJuridica.value.fechaMatricula, 'yyyy-MM-dd');
    this._creditService.solicitudUltracem(form).subscribe(resp => {
      this.formSolicitudRepresentante.patchValue({
        numeroSolicitud: (resp.data.numeroSolicitud).toString()
      });
      this.step = 4;
      console.log(resp);
      console.log('representante', this.formSolicitudRepresentante.value);
    });
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
   * @description: Validacion de caracteres minimos
   */
  public validacionCampoMinimo(field: string) {
    return this.formInicial.controls[field].hasError('minlength');
  }
  /**
   * @description: Validacion de caracteres minimos
   */
  public validacionCampoMinimoJuridico(field: string, valid: boolean) {
    return this.formInicial.controls[field].hasError('minlength') && valid;
  }
  /**
   * @description: Validacion de caracteres maximos
   */
  public validacionCampoMaximo(field: string) {
    return this.formInicial.controls[field].hasError('maxlength');
  }
  /**
   * @description: Validacion de solo numeros
   */
  public validacionSoloNumero(field: string) {
    return this.formInicial.controls[field].hasError('pattern');
  }
}
