import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatosContactoComponent } from 'src/app/components/modals/datos-contacto/datos-contacto.component';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  title = 'ultracem';
  alto: any;
  ancho: any;
  formInicial: FormGroup;
  natural: boolean = true;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.formInicial = this.fb.group({
      cliente: ['', Validators.required],
      registrar: [{ value: '', disabled: true }, Validators.required],
      registrado: [{ value: '', disabled: true }, Validators.required],
      tipoDocumento: ['', Validators.required],
      documento: ['', Validators.required],
    })
    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';
  }

  ngOnInit(): void {
    this.formInicial.controls['registrar'].valueChanges.subscribe(registrar => {
      if (registrar == '1') {
        this.natural = true;
        this.formInicial.controls['tipoDocumento'].setValue('1')
      } else {
        this.formInicial.controls['tipoDocumento'].setValue('2')
        this.natural = false;
      }
    })
    this.formInicial.controls['registrado'].valueChanges.subscribe(registrado => {
      if (registrado == '1') {
        this.natural = true;
        this.formInicial.controls['tipoDocumento'].setValue('1')
      } else {
        this.formInicial.controls['tipoDocumento'].setValue('2')
        this.natural = false;
      }
    })
    this.formInicial.controls['cliente'].valueChanges.subscribe(cliente => {
      if (cliente == '1') {
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
      console.log(this.formInicial.controls);

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
      data: {name: 1, animal: 2}
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

}
