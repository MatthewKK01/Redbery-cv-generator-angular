import { Component } from '@angular/core';
import { Experience, UserProfile } from '../models';
import { DatashareService } from '../datashare.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  user!: UserProfile;

  public index !: number;

  constructor(private dataShareService: DatashareService, private router: Router) { }



  ngOnInit() {
    // Subscribe to the user$ observable to get the initial user data.
    this.dataShareService.user$.subscribe((res) => {
      this.user = res;
    })
  }

  addExperience() {
    const newExperience: Experience = {
      position: '',
      employer: '',
      start_date: '',
      due_date: '',
      description: ''
    };
    this.user?.experiences?.push(newExperience);
  }

  navigateToExperience() {
    this.router.navigate(['/experience'])
    this.addExperience();
  }
  navigateToEducation() {
    this.router.navigate(['/education'])
  }
}
