import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utilities.service';
import Swal from 'sweetalert2';
import {GenericService} from "../../../services/generic.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements OnInit {
  public form!: FormGroup;
  public formulario: boolean = false;
  public vias: any[] = [];
  // datos!: { callePrincipal: any; tipovia: any; numero: any; numero2: any; complemento: any; viaNombre: any; };

  constructor(
    public matDialogRef: MatDialogRef<DirectionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _generic: GenericService,
    private _Service: UtilityService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getVias();
    this.crearFormulario();
  }
  /**
   * @description: Almacena la direccion en memoria
   */
  public onGuardar(): void {
    const direccion: any = this.form.getRawValue();
    const direccionCompleta: string =
      `${direccion.direccion.tipo +' '}${direccion.direccion.callePrincipal? direccion.direccion.callePrincipal + ' ' : ''}${direccion.direccion.numeroInicial? direccion.direccion.numeroInicial + ' ': ''}${direccion.direccion.numeroFinal? direccion.direccion.numeroFinal + ' ' : ''}${direccion.direccion.complemento? direccion.direccion.complemento + ' ' : ''}`;
    this.matDialogRef.close(direccionCompleta);
  }
  /**
   * @description: Carga el listado de las vias
   */
  public getVias() {
    const codigo: string = this.data.codigo;
    if (codigo) {
      this.formulario = true;
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
      let url: string = `generic/qry/nomenclarturas-direcciones/${codigo}`;
      this._generic.getData(url).subscribe(res => {
        Swal.close();
        this.vias = res;
      });
    }else {
      Swal.fire(
        'Error',
        'Seleccione una ciudad de residencia valida.',
        'error'
      );
      setTimeout(() => {
        this.matDialogRef.close();
      }, 100)
    }
    /*this._Service
      .getQuery(`/nomenclarturas-direcciones/${data}`, true)
      .subscribe((response: any) => {
        Swal.close();
        if (response) {
          this.listadoTipoVia = response.data;
        } else {
          this.listadoTipoVia = [];
        }
      });*/
  }
  /**
   * @description: Crea formulario
   */
  private crearFormulario(): void {
    this.form = this.fb.group({
      direccion: this.fb.group({
        tipo: [''],
        viaPrincipal: [''],
        numeroInicial: [''],
        numeroFinal: [''],
        complemento: ['']
      })
    })
  }


}
