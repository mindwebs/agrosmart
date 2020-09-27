import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeather(location) {
    return this.http.get(
      'http://api.openweathermap.org/data/2.5/weather?appid=913625056cfd266d73c8feb4ee18924a&q=' + location
    );
  }
  getForecast(location) {
    return this.http.get(
      'http://api.openweathermap.org/data/2.5/forecast?appid=913625056cfd266d73c8feb4ee18924a&q=' + location
    );
  }

  getAirQuality(location){
    return this.http.get(
      'http://api.waqi.info/feed/'+ location + '/?token=7cc2cc0a80ff18f1ac5387c27d6d83f051999a5b'
    )
  }
  getAirQualityL(latitude, longitude){
    return this.http.get(
      'http://api.waqi.info/feed/geo:'+ latitude + ';' + longitude + '/?token=7cc2cc0a80ff18f1ac5387c27d6d83f051999a5b'
    )
  }
}
