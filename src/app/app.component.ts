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
    // Retrieve the value from local storage if it exists
    const storedValue = localStorage.getItem('isHomePage');
    if (storedValue !== null) {
      this.isHomePage = JSON.parse(storedValue);
    }
  }
  updateIsHomePage(value: boolean) {
    console.log("clicked")
    localStorage.setItem('isHomePage', JSON.stringify(value));
    this.isHomePage = value;
  }
}
