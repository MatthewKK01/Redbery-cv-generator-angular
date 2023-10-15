import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'redberry-cv-generator';
  isHomePage = false; // this must be true;

  ngOnInit() {

  }
  updateIsHomePage(value: boolean) {

    this.isHomePage = value;
  }
}
