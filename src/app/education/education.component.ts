import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfile } from '../models';
import { DatashareService } from '../datashare.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  EducationForm: FormGroup;
  user: UserProfile;
  localXp = JSON.parse(localStorage.getItem('educations'));

  constructor(private dataShareService: DatashareService, private router: Router, private toastr: ToastrService) { }

  generateFormArray() {
    if (this.localXp) {
      this.EducationForm.setValue({ educations: this.localXp });
    }
  }
  showToast() {
    this.toastr.success("Resume successfully sent")
  }
  ngOnInit(): void {
    this.EducationForm = new FormGroup({
      educations: new FormArray([
        new FormGroup({
          institute: new FormControl(localStorage.getItem('institute') || "", [Validators.required, Validators.minLength(2)]),
          degree_id: new FormControl(localStorage.getItem('degree_id') || ""),
          due_date: new FormControl(localStorage.getItem('due_date') || ""),
          description: new FormControl(localStorage.getItem('description') || "")
        })
      ])
    })
    this.dataShareService.getUser().subscribe((res) => {
      this.user = res;
    })
    this.generateFormArray()
  }
  navigateToExperience() {
    this.router.navigate(['/experience'])
  }

  updateLocalStorage() {
    localStorage.setItem("educations", JSON.stringify(this.EducationForm.value.educations))
  }
  onSubmit() {
    this.updateLocalStorage()
    this.passData()

    // Create a new UserProfile object with the updated educations array
    // Update the user data in the service
    this.showToast()
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
    this.passData()
  }
  get Educations() {
    return this.EducationForm.get('educations') as FormArray;
  }

  passData() {
    const updatedUser: UserProfile = {
      ...this.user, // Copy the existing user data
      educations: this.Educations.value, // Update educations array
    };

    this.dataShareService.updateUser(updatedUser);
  }
}
