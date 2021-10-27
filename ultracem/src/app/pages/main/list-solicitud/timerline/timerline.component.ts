import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timerline',
  templateUrl: './timerline.component.html',
  styleUrls: ['./timerline.component.scss']
})
export class TimerlineComponent implements OnInit {
  @Input('currentStep') currentStep: number = 0;
  
  oneStepNumber: number = 0;
  twoStepNumber: number = 6;
  thirdStepNumber: number = 3;
  fourStepNumber: number = 8;
  constructor() { }

  ngOnInit(): void {
  }

  getImage(step: number, img: string) {

    return this.currentStep == step ? img : step < this.currentStep ?
      img.replace('.svg', '_Verde.svg') :
      step > this.currentStep ? img.replace('.svg', '_Gris.svg') : img
      
  }

}
