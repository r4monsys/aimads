import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'jaouhar-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements AfterViewInit {

  @ViewChild('stepperRef') stepperRef?: ElementRef;
  @Input()
  steps: string[] = [];
  @Input()
  currentStep?: number = 0;

  @Output()
  changeStep = new EventEmitter<number>();

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const children = this.stepperRef?.nativeElement.children;

    for (let i = 0; i < children.length; i++) {
      children[i].style.width = `${100 / this.steps.length}%`;
      children[i].setAttribute('stepper-content', `${i + 1}`);
    }
  }

  setStep(index: number) {
    this.currentStep = index;
    this.changeStep.emit(this.currentStep);
  }
}
