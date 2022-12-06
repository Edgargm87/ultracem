import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  constructor( private router: Router,) { }

  ngOnInit(): void {
  }
  atras() {
    let url = `/login`;
    this.router.navigateByUrl(url);
  }
  listado() {
    let url = `main/listRequest`;
    this.router.navigateByUrl(url);
  }

}
