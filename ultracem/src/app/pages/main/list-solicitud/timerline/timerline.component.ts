import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timerline',
  templateUrl: './timerline.component.html',
  styleUrls: ['./timerline.component.scss']
})
export class TimerlineComponent implements OnInit {
  @Input('currentStep') currentStep: number = 0;
  
  oneStepNumber: number = 1;
  twoStepNumber: number = 2;
  thirdStepNumber: number = 3;
  constructor() { }

  ngOnInit(): void {
  }

  getImage(step: number, img: string) {

    return this.currentStep == step ? img : step < this.currentStep ?
      img.replace('.svg', '_Verde.svg') :
      step > this.currentStep ? img.replace('.svg', '_Gris.svg') : img
      
  }

}
