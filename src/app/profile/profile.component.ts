import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';

import { UserProfile } from '../models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: UserProfile;

  constructor(private dataShareService: DatashareService) { }



  ngOnInit() {
    // Subscribe to the user$ observable to get the initial user data.
    this.dataShareService.user$.subscribe((res) => {
      this.user = res;
    })
  }
}
