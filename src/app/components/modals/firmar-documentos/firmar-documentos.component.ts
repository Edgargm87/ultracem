import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-firmar-documentos',
  templateUrl: './firmar-documentos.component.html',
  styleUrls: ['./firmar-documentos.component.scss']
})
export class FirmarDocumentosComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<FirmarDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {

  }

  descargar(type: number) {
debugger;
    let url = '';
    let nombre
    switch (type) {
      case 1:
        url = "/assets/documentos/centralesRiesgoJuridica.pdf";
        nombre = "Solicitud_de_crédito"
        break;

      case 2:
        url = `/assets/documentos/centralesRiesgo${this.data.typeSolicitud=='CC'?'Natural':'Juridica'}.pdf`;
        nombre = `centralesRiesgo${this.data.typeSolicitud=='CC'?'Natural':'Juridica'}`
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

}
