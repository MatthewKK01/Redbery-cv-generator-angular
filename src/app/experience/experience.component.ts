import { Component } from '@angular/core';
import { UserProfile } from '../models';
import { DatashareService } from '../datashare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  user!: UserProfile;

  constructor(private dataShareService: DatashareService, private router: Router) { }



  ngOnInit() {
    // Subscribe to the user$ observable to get the initial user data.
    this.dataShareService.user$.subscribe((res) => {
      this.user = res;
    })
  }


  navigateToExperience() {
    this.router.navigate(['/experience'])
  }
  navigateToEducation() {
    this.router.navigate(['/education'])
  }
}
