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

  onImageSelected(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // Assuming you want to store the image file as a base64 string
      const reader = new FileReader();
      reader.onload = () => {
        this.user.image = reader.result as string; // Assign the base64 data to the image property
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  navigateToExperience() {
    this.router.navigate(['/experience'])
  }
}
