import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface nodeData {
  message: string;
  nodeDetails: any;
}

interface controller {
  controllerID: string;
  relay1: number;
  relay2: number;
  relay3: number;
  relay4: number;
  servo1: number;
  solarIntensity: number;
  lastChangedTime: Date;
}


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  getPropertyId() {
    const propertyId = this.cookieService.get('propertyId');
    return propertyId;
  }

  getNodeData() {
    var propertyID = this.cookieService.get('propertyId');
    //var propertyID = "6-YaNQcL";
    if(propertyID) {
      console.log("Data for Property ID -  " + this.cookieService.get('propertyId'));
      return this.http.post<nodeData>(environment.api + '/graphs/data', {
        propertyID
      })
    } 
  }

  getControllerState(controllerID) {
    let url = environment.api + '/controller/' + controllerID;
    return this.http.get<controller>(url)
  }

  currentPlace () {
    if(this.cookieService.get('location')) {
      return [this.cookieService.get('location')];
    } else {
    return ['Kolkata'];
    }
  }
  currentLatitude(){
    return ["22.570"]
  }
  currentLongitude(){
    return ["88.370"]
  }

  bigChart() {
    return [{
      name: 'Node 1 - ESP 32',
      data: [13.36, 14.20, 16.05, 14.5, 15.2]
    }, {
      name: 'Node 2 - ESP 8266',
      data: [13.45, 14.2, 15.9, 14.70, 15.4]
    }, {
      name: 'Node 3 - ESP 32',
      data: [13.22, 14.28, 16.1, 14.65, 15.29]
    }, {
      name: 'Controller 1',
      data: [13.30, 14.12, 15.95, 14.5, 15.35]
    }];
  }
}
