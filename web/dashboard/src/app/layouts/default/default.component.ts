import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})

export class DefaultComponent implements OnInit {

  sideBarOpen = false;

  screenHeight: number;
  screenWidth: number;

  ngOnInit() { }

  sideBarToogler(event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

  constructor(private titleService: Title) {
    this.titleService.setTitle('AgroSmart - DashBoard');
    this.getScreenSize();

    if (this.screenWidth > 760) {
      this.sideBarOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          console.log(this.screenHeight, this.screenWidth);
    }
}
