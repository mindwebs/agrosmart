import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface GraphData {
  bundle: Array<any>;
}

@Injectable({
  providedIn: 'root'
})

export class GraphsService {

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  getDayAverageData() {
    const propertyID = this.cookieService.get('propertyId') || 'qz6l93ia';
    if (propertyID) {
      console.log('Data for Property ID - ' + this.cookieService.get('propertyId'));
      return this.http.post<GraphData>(environment.api + '/graphs/data', {
        propertyID
      });
    }
  }

  getDateData() {
    const getDate = new Date().toString().substring(4, 15); // to Format Feb 21 2020
    const propertyID = this.cookieService.get('propertyId') || 'qz6l93ia';
    console.log(`Getting Data on ${getDate}`);
    return this.http.post<GraphData>(environment.api + '/graphs/date', {
      propertyID,
      getDate
    });
  }

}
