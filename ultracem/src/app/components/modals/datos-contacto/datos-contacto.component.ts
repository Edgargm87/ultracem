import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-datos-contacto',
  templateUrl: './datos-contacto.component.html',
  styleUrls: ['./datos-contacto.component.scss']
})
export class DatosContactoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DatosContactoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
