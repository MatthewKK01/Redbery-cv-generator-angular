import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../datashare.service';

import { UserProfile } from '../models';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  userdata: UserProfile | undefined;

  constructor(private data: DatashareService) { }

  ngOnInit(): void {
    this.data.getUser().subscribe(res => this.userdata = res);
    console.log(this.userdata);
  }

}
