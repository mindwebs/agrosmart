import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SetupService } from '../setup.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  controllers: any;
  public defaultController: string;

  constructor(private router: Router, private setup: SetupService, private cookieService: CookieService, private Setup: SetupService) { }

  ngOnInit() {
    this.defaultController = this.cookieService.get('controllerId');
    
    //this.controllerChange(this.defaultController);
    let propertyID = this.cookieService.get('propertyId');

    this.Setup.getControllers(propertyID).subscribe(data => {
      this.controllers = data["controllerDetails"]["0"];
    });
  }

  controllerChange(controllerID){ 

    const propertyID = this.cookieService.get('propertyId');
    

    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 180);

    this.cookieService.set('controllerId', controllerID, dateNow);
    console.log(controllerID, propertyID);
    
    this.Setup.setupController(propertyID, controllerID).subscribe(data => {
      if(data.success) {
        //var controllerId = data.controllerId.valueOf();
        alert("Default Controller Set. ID - " + controllerID);
        this.router.navigate([''])
      } else {
        window.alert("Some error occured! Please try again later.")
      }
    })
    
  }

  setupNode(event) {
    event.preventDefault();
    const target = event.target;
    const deviceID = target.querySelector('#deviceID').value;
    const propertyID = this.cookieService.get('propertyId');

    this.setup.setNodeDetails( propertyID, deviceID ).subscribe(data => {
      if(data.success){
        window.alert(data.message)
      } else {
        window.alert(data.message)
      }
    });
  }
}
