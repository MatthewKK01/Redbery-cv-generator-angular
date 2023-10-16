import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';

import { UserProfile } from '../models';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: UserProfile;
  profileForm!: FormGroup;

  constructor(private dataShareService: DatashareService, private router: Router) { }


  ngOnInit() {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      about_me: new FormControl(''),
      image: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email,
      Validators.pattern(/^[A-Za-z0-9._%+-]+@redberry\.ge$/)]),
      phone_number: new FormControl(null, [Validators.required,
      Validators.pattern(/^(\+995|0)[5-9][0-9]{8}$/)])
    })
    // Subscribe to the user$ observable to get the initial user data.
    this.dataShareService.getUser().subscribe(user => {
      this.user = user;
    });

    this.profileForm.get('image').setValue(this.user.image);

  }

  onImageSelected(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // Assuming you want to store the image file as a base64 string
      const reader = new FileReader();
      reader.onload = () => {
        // Assign the base64 data to the 'image' FormControl
        this.profileForm.get('image').setValue(reader.result as string);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  onSubmit() {
    const updatedUser: UserProfile = {
      ...this.user, // Copy the existing user data
      ...this.profileForm.value, // Update with the new form values
    };
    this.user = this.profileForm.value;
    this.dataShareService.updateUser(updatedUser); // Pass the updated user profile to the service
    this.router.navigate(['/experience'])

  }
}
