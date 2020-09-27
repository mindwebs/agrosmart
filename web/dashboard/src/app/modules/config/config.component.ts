import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetupService } from '../setup.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  constructor(private router: Router, private Setup: SetupService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  setupApp(event){
    event.preventDefault();
    const target = event.target;
    const propertyName = target.querySelector('#name').value;
    const uniqueCode = target.querySelector('#uniqueCode').value;
    const location = target.querySelector('#location').value;
    const latitude = target.querySelector('#latitude').value;
    const longitude = target.querySelector('#longitude').value;
    const elevation = target.querySelector('#elevation').value;
    const area = target.querySelector('#area').value;
    const adminName = target.querySelector('#username').value;

    this.Setup.setupAppDetails(propertyName, uniqueCode, location, latitude, longitude, elevation, area, adminName).subscribe(data => {
      if(data.success) {
        var propertyId = data.propertyId.valueOf();
        const dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + 180);
        this.cookieService.deleteAll();
        this.cookieService.set('propertyId', propertyId, dateNow);
        this.cookieService.set('location', location, dateNow);
        console.log("Property Created. ID - " + propertyId);
        this.router.navigate(['/setup/selectProperty'])
      } else {
        window.alert(data.message)
      }
    })

    console.log(event);
  }

}
