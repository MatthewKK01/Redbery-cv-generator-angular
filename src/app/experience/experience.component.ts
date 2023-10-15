import { Component, OnInit } from '@angular/core';
import { Experience, UserProfile } from '../models';
import { DatashareService } from '../datashare.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  user: UserProfile;

  xpForm!: FormGroup;



  constructor(private dataShareService: DatashareService, private router: Router, private fb: FormBuilder) { }



  ngOnInit() {
    console.log(this.user);
    this.dataShareService.getUser().subscribe((res) => {
      this.user = res;
    })
    this.xpForm = new FormGroup({
      experiences: new FormArray([ // this is an array
        new FormGroup({ // this is an object 
          position: new FormControl("", [Validators.required, Validators.minLength(2)]),
          employer: new FormControl("", [Validators.required, Validators.minLength(2)]),
          start_date: new FormControl("", [Validators.required]),
          due_date: new FormControl("", [Validators.required]),
          description: new FormControl("", [Validators.required]),
        })
      ])
    })
  }
  get experiences() {
    return this.xpForm.get('experiences') as FormArray // get experiences from xpForm but in array state otherwise it has an error in ngFor loop when I want to get experiences.controls
  }

  navigateToProfile() {
    this.router.navigate(['/profile'])
  }
  onSubmit() {
    this.router.navigate(['/education'])
  }

  addExperience() {
    this.experiences.push(
      new FormGroup({
        position: new FormControl("", [Validators.required, Validators.minLength(2)]),
        employer: new FormControl("", [Validators.required, Validators.minLength(2)]),
        start_date: new FormControl("", [Validators.required]),
        due_date: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
      })
    )
  }


}
