import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatashareService } from '../datashare.service';
import { UserProfile } from '../models';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss']
})
export class BackComponent {
  constructor(private router: Router, private dataShare: DatashareService) { }
  goBack() {
    this.dataShare.resetUser()
    this.dataShare.setIsHomepage(true);
    localStorage.clear()
    this.router.navigate(['/']);
  }
}
