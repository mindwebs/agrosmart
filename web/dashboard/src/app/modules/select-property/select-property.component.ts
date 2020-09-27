import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetupService } from '../setup.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-select-property',
  templateUrl: './select-property.component.html',
  styleUrls: ['./select-property.component.scss']
})
export class SelectPropertyComponent implements OnInit {

  properties: any;
  propertyID: string;
  selectedValue: any;
  
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private Setup: SetupService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const adminName = this.cookieService.get('user_email').replace(/%40/g,"@");;
    this.Setup.getProperties(adminName).subscribe(data => {
      this.properties = data["propertyDetails"]["0"];
    });
  }

  routeClick() {
    this.router.navigateByUrl('/setup/config');
  };

  changeP(data) {
    this.propertyID = data;
    console.log("Property ID Selected : " + data);
  }

  setupApp(event) {
    event.preventDefault();
    const target = event.target;
    //const propertyID = target.querySelector('#propertyId').selected;
    const propertyID = this.propertyID;
    const controllerID = target.querySelector('#controllerId').value;
    const location = target.querySelector('#location').value;

    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 180);
    this.cookieService.delete('propertyId');
    this.cookieService.set('propertyId', propertyID, dateNow);

    this.cookieService.delete('location');
    this.cookieService.set('location', location, dateNow);

    this.cookieService.set('controllerId', controllerID, dateNow);
    console.log(controllerID, propertyID);
    
    this.Setup.setupController(propertyID, controllerID).subscribe(data => {
      if(data.success) {
        //var controllerId = data.controllerId.valueOf();
        console.log("Controller Attached. ID - " + controllerID);
        this.router.navigate([''])
      } else {
        window.alert("Some error occured! Please try again later.")
      }
    })
    
  }

}
