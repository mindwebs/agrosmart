import { Component, OnInit } from '@angular/core';
import { SetupService } from '../setup.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  
  controllers: any;

  constructor(
    private Setup: SetupService,
    private cookieService: CookieService
    ) { }

  ngOnInit() {

    let propertyID = this.cookieService.get('propertyId');


    this.Setup.getControllers(propertyID).subscribe(data => {
      this.controllers = data["controllerDetails"]["0"];
    });
  }

  setupCron(e){
    
  }
}
