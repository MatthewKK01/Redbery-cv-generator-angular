import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) { }

  @Input() public isHomePage!: boolean;
  @Output() updateIsHomePage = new EventEmitter<boolean>();

  naviagteToHomePage() {
    this.router.navigate(['/profile']);
    this.updateIsHomePage.emit(false);
  }
}
