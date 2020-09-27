import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DashboardService } from '../dashboard.service';
import { ApixuService } from '../apixu.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { GraphsService } from '../graphs.service';
import { SetupService } from '../setup.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchLocation = [];

  // Graph Details
  bigChart = [];
  relays = [false,false,false,false];
  servo: number = 90;
  xdata = [];
  title: string;
  subtitle: string;
  public defaultController: string;

  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public forecast: any;
  public airData: any;
  controllers: any;
  //controllerID : string;

  constructor(
    private titleService: Title,
    private dashBoardService: DashboardService,
    private apixuService: ApixuService,
    private graphService: GraphsService,
    private Setup: SetupService,
    private cookieService: CookieService,
    private router: Router
    ) {
    this.titleService.setTitle('AgroSmart - DashBoard');
  }

  ngOnInit() {
    
    if ((!sessionStorage.getItem('loginHash'))) {
      this.router.navigate(['/setup'])
    }

    this.defaultController = this.cookieService.get('controllerId');
    
    this.controllerChange(this.defaultController);

    let propertyID = this.cookieService.get('propertyId');

    this.Setup.getControllers(propertyID).subscribe(data => {
      this.controllers = data["controllerDetails"]["0"];
    });

    this.searchLocation = this.dashBoardService.currentPlace();

    this.apixuService
      .getWeather(this.searchLocation)
      .subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
      });

    this.apixuService
      .getForecast(this.searchLocation)
      .subscribe(data => {
        this.forecast = data;
        console.log(this.forecast);
      });  

    this.apixuService
      .getAirQuality(this.searchLocation)
      .subscribe(data => {
        this.airData = data;
        console.log(this.airData);
      });

    const today = new Date();
    const back = new Date();
    back.setDate(back.getDate() - 10);

    this.graphService.getDayAverageData().subscribe(data => {
      this.bigChart = data.bundle[0].sensorGraph;
      this.bigChart[0].data.slice(-10);
      this.bigChart[1].data.slice(-10);
      this.bigChart[2].data.slice(-10);
      this.bigChart[3].data.slice(-10);
      this.xdata = data.bundle[0].timeStamps;
      this.xdata.slice(-10);
      this.title = 'Day Average Plot';
      this.subtitle = 'Plot: Environmental parameters vs Day average';
      console.log('Updated');
    });
  }

  controllerChange(controllerID){
    //let controllerID = 
    //console.log("On Change - "+ controllerID);
    this.getController(controllerID);
  }

  getController(controllerID) {
    this.defaultController = controllerID;
    this.dashBoardService.getControllerState(controllerID).subscribe(data => {
      this.relays[0] = data.relay1?true:false;
      this.relays[1] = data.relay2?true:false;
      this.relays[2] = data.relay3?true:false;
      this.relays[3] = data.relay4?true:false;
      //console.log(this.relays);
      this.servo = data.servo1;

    });
  }
}
