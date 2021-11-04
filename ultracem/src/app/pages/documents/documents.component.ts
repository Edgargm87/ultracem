import { Component, OnInit } from '@angular/core';
import { CreditService } from 'src/app/services/credit.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  documentos: any;

  constructor(
    private _creditService: CreditService
  ) { }

  ngOnInit(): void {
    this.getdocumentos()
  }
  getdocumentos() {
    this._creditService.getDocuments('CC', 112).subscribe(resp => {
      this.documentos = resp.data;
      console.log(resp);
      
    })
  }
}
