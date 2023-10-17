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
  spinner: boolean = false;

  constructor(private dataShareService: DatashareService) { }
  ngOnInit() {
    this.loadData()

    this.dataShareService.isHomepage$.subscribe((value: boolean) => {
      this.isHomePage = value;
    });
  }

  loadData() {
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
    }, 3000);
  }

  updateIsHomePage(value: boolean) {

    this.isHomePage = value;
  }
}
