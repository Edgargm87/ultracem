import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensaje-error',
  templateUrl: './mensaje-error.component.html',
  styleUrls: ['./mensaje-error.component.scss']
})
export class MensajeErrorComponent implements OnInit {
  infoauth: any;

  constructor() { }

  ngOnInit(): void {
    this.infoauth = JSON.parse(localStorage.getItem('infoauth') + '');
  }

}
