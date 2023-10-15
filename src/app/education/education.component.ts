import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  EducationForm: FormGroup;


  ngOnInit(): void {
    this.EducationForm = new FormGroup({
      educations: new FormArray([
        new FormGroup({
          institute: new FormControl('', [Validators.required, Validators.minLength(2)]),
          degree_id: new FormControl('Choose Degree'),
          due_date: new FormControl(''),
          description: new FormControl('')
        })
      ])
    })
  }
  onSubmit() {
    console.log(`submitted`);
  }
  addEducation() {
    this.Educations.push(
      new FormGroup({
        institute: new FormControl('', [Validators.required, Validators.minLength(2)]),
        degree_id: new FormControl('', Validators.required),
        due_date: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
      })
    )
  }
  get Educations() {
    return this.EducationForm.get('educations') as FormArray;
  }

}
