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

  user: UserProfile;
  profileForm: FormGroup;
  nameValid: boolean;

  constructor(private dataShareService: DatashareService, private router: Router) {




  }


  ngOnInit() {

    this.profileForm = new FormGroup({
      name: new FormControl(localStorage.getItem('name') || '', [Validators.required,
      Validators.pattern(/^[A-Za-z]+$/), Validators.minLength(2)]),
      surname: new FormControl(localStorage.getItem('surname') || '', [Validators.required,
      Validators.pattern(/^[A-Za-z]+$/), Validators.minLength(2)]),
      about_me: new FormControl(localStorage.getItem('about_me') || ''),
      image: new FormControl(localStorage.getItem('image') || ''),
      email: new FormControl(localStorage.getItem('email') || '', [Validators.required, Validators.email,
      Validators.pattern(/^[A-Za-z0-9._%+-]+@redberry\.ge$/)]),
      phone_number: new FormControl(localStorage.getItem('phone_number') || null, [Validators.required,
      Validators.pattern(/^(\+995|0)[5-9][0-9]{8}$/)])
    })
    // Subscribe to the user$ observable to get the initial user data.

    this.dataShareService.getUser().subscribe(user => {
      this.user = user;
    });

    this.profileForm.get('image').setValue(this.user.image);
  }

  updateLocalStorage() {
    for (const controlName of Object.keys(this.profileForm.controls)) {
      localStorage.setItem(controlName, this.profileForm.get(controlName).value);
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // Assuming you want to store the image file as a base64 string
      const reader = new FileReader();
      reader.onload = () => {
        // Assign the base64 data to the 'image' FormControl
        this.profileForm.get('image').setValue(reader.result as string);
        localStorage.setItem('image', reader.result as string)
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }





  onSubmit() {
    this.updateLocalStorage()
    const updatedUser: UserProfile = {
      ...this.user, // Copy the existing user data
      ...this.profileForm.value, // Update with the new form values
    };
    this.user = this.profileForm.value;
    this.dataShareService.updateUser(updatedUser); // Pass the updated user profile to the service
    this.router.navigate(['/experience'])

  }
}
