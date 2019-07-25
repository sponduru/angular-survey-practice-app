import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { SurveyService } from './survey.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-survey-app';
  surveyData: any;
  surveyForm: FormGroup;
  items: any[];
  favouritesData: any;

  constructor(private surveyService: SurveyService, private fb: FormBuilder) {
    this.surveyForm = new FormGroup({
      checkboxes: new FormGroup({}),
      favourites: new FormGroup({}),
      gender: new FormControl('', []),
      ages: new FormControl('', []),
    });
  }
  ngOnInit(){
    this.surveyService.getSurveyData().subscribe(data => {
      this.surveyData = (data['pages']);
      this.items = this.surveyData[3].rows;
      this.favouritesData = this.surveyData[4];
      this.items.forEach(item => {
        (this.surveyForm.controls['checkboxes'] as FormGroup).addControl(item, new FormControl(false));
      });

      this.favouritesData.rows.forEach(item => {
        (this.surveyForm.controls['favourites'] as FormGroup).addControl(item, new FormControl(''));
      });
    });

  }

  updateSelection(selOption) {
    if (selOption === 'None of the above') {
      Object.keys((this.surveyForm.controls['checkboxes'] as FormGroup).controls).forEach((ele) => {
        if (ele !== 'None of the above') {
          this.surveyForm.controls['checkboxes'].get(ele).setValue(false);
        }
      });
    }
    else {
      this.surveyForm.controls['checkboxes'].get('None of the above').setValue(false);
    }
  }
}
