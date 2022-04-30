import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'jaouhar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data?: Data;
  steps: string[] = [];
  currentStep = -1;

  isBtnNextEnabled = false;

  private _jsonURL = 'assets/data.json';

  constructor(private http: HttpClient) {
    this.http.get(this._jsonURL).pipe(map(data => data as Data)).subscribe(data => { 
      this.data = data;
      this.steps = new Array(this.data?.questions.length).fill('');
    })
  }

  next() {
    this.currentStep++;
    this.isBtnNextEnabled = false;
  }

  selectChoice(choice: Choice) {
    const question = this.data?.questions[this.currentStep];

    choice.selected = choice.selected != undefined ? !choice.selected : true;


    if(question?.choices.filter(c => c.selected == true).length == question?.maxChoices) {
      setTimeout(() => { this.currentStep++ }, 450);
    } 
    //this.isBtnNextEnabled = true;
  }

}

interface Data {
  title: string;
  subtitle: string;
  questions: Question[];
}

interface Question {
  question: string;
  maxChoices: number;
  choices: Choice[];
}

interface Choice {
  img?: string,
  label: string;
  selected?: boolean;
}