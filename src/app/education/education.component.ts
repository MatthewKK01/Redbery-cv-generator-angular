import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from '../models';
import { DatashareService } from '../datashare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  EducationForm: FormGroup;
  user: UserProfile;
  constructor(private dataShareService: DatashareService, private router: Router) { }


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
    this.dataShareService.getUser().subscribe((res) => {
      this.user = res;
    })
  }
  onSubmit() {

    // Create a new UserProfile object with the updated educations array
    const updatedUser: UserProfile = {
      ...this.user, // Copy the existing user data
      educations: this.Educations.value, // Update educations array
    };

    this.dataShareService.updateUser(updatedUser); // Update the user data in the service
    this.router.navigate(['/final-page']);
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
