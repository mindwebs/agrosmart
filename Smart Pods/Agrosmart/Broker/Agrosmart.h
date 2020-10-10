#ifndef Agrosmart_h
#define Agrosmart_h
 
#include "Arduino.h"
#include <ESP8266HTTPClient.h>


/* Helper Classes
  Custom Library for Code Segmentations
	- Includes
		GET : Agrosmart Server
		POST : Agrosmart Server
		Serial Read : From WIFI Mesh
    Functions : Relay Functions
*/
class AgroSmart{
  public:
  // Returns: data, URL(optional) => response
  String post_data(String, String);
  String get_data(String);
  String patch_data(String);
};

#endif
