#include "Arduino.h"
#include "Agrosmart.h"
#include <ESP8266HTTPClient.h>

String AgroSmart::post_data(String data, String url){
    HTTPClient http;
    http.begin(url);
    http.addHeader("Content-Type", "application/json"); // Specify content-type header
    int httpCode = http.POST(data);
    String httpResponse;
    
    Serial.println("..........Printing Response..........");
    if(httpCode<1){
      httpResponse = "Server Error: POST Failed";
    }
    else{
      httpResponse = String(httpCode)+"\n\n"+http.getString();
    }
    http.end();
    return httpResponse;
}

String AgroSmart::get_data(String url){
  HTTPClient http;
  http.begin(url);
  http.addHeader("Content-Type", "application/json"); // Specify content-type header
  String httpResponse;
  int httpCode = http.GET();
  if(httpCode<1){
    httpResponse = "Server Error: GET request Failed";
  }
  else{
    httpResponse = http.getString();
  }
  http.end();
  return httpResponse;
}
