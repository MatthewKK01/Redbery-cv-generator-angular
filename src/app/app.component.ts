import { Component } from '@angular/core';
import { DatashareService } from './datashare.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'redberry-cv-generator';
  isHomePage: boolean; // this must be true;

  constructor(private dataShareService: DatashareService) { }
  ngOnInit() {
    this.isHomePage = this.dataShareService.isHomePage
  }

  updateIsHomePage(value: boolean) {

    this.isHomePage = value;
  }
}
