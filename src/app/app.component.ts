import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatosContactoComponent } from './components/modals/datos-contacto/datos-contacto.component';
import { CreditService, listaGenerica } from './services/credit.service';
import { format, parseISO } from 'date-fns'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
  
}
