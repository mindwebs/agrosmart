import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  constructor(private titleService:Title) {
    this.titleService.setTitle("AgroSmart - Make Agriculture Smarter");
  }

  ngOnInit() {
  }

}
