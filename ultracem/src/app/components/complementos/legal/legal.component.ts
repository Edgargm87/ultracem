import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {
  alto: string;
  ancho: string;
  step:number=1;
  constructor() {

    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';
   }

  ngOnInit(): void {
  }

  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.alto = window.innerHeight + 'px';
    this.ancho = window.innerWidth + 'px';
  }

}
