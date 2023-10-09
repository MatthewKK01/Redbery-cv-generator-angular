import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';

import { UserProfile } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
}
