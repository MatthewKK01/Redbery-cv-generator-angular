import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';

import { UserProfile } from '../models';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  userdata!: UserProfile

  constructor(private data: DatashareService) { }

  ngOnInit(): void {
    this.data.getUser().subscribe(res => this.userdata = res);
  }

  check() {
    console.log(this.userdata)
  }
}
