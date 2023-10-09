import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'redberry-cv-generator';
  isHomePage = true;

  ngOnInit() {
    console.log(this.isHomePage);
  }
  updateIsHomePage(value: boolean) {
    console.log("clicked")
    this.isHomePage = value;
  }
}
