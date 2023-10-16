import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DatashareService } from '../datashare.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private service: DatashareService) { }

  @Input() public isHomePage: boolean;
  @Output() updateIsHomePage = new EventEmitter<boolean>();

  ngOnInit() {
    this.isHomePage = this.service.isHomePage;
  }

  naviagteToHomePage() {
    this.updateIsHomePage.emit(false);
    this.service.isHomePage = false

    this.router.navigate(['/profile']);
  }
}
