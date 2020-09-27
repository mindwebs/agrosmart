# AgroSmart - A Smart Farming Solution
IoT Based Field Monitorin and Control Platfornm Using MEAN Stack.

## Abstract
We have implemented IOT and smart agriculture techniques to conserve the limiting natural resources and maximize the production of the fields. AgroSmart was directed to make the work of the farmers easier and less complicated. We have approached the solution of this problem by designing certain devices called SmartPods, which are to be sowed in the soil (having a limited coverage) they will provide valuable information like soil quality, humidity, temperature (all the features required to be monitored while farming) easily with the help of controllers and the results are displayed in a webpage which is designed solely for monitoring real time data gathered from the Smart Pods. After analysing the statistical data and graphs we could predict the meteorological conditions of the area, the type of crop suitable for cultivation in that area and the optimum requirements of that crop in the given environment, which helped us in estimating the exact amount of resources required, the crop to be cultivated and what uncertainties to expect from the weather of the region.

## Sections of this Project
This project has a physical layer under "SmartPODS", back end framework in ExpressJS and Frontend in Angular. The physical layer can be used over any WiFi enabled microcontroller like NodeMCU (ESP8266) or ESP32.  
You can find all the arduino libraries and the code inside the ``Smart Pods`` Folder.  
The backend API is located under the ``api`` folder.  
And the front-end is located under ``web/dashboard`` folder.  

## How to Contribute
Fork this Repository, Make a Local Instance of MongoDB or create a free atlas account and push that details in /api/config/db.js and create a database dbAgro under that username in your mongo instance.  
You can find the connect URI where you should put the details in username:password@host:port/dbName format.

After implementing the changes you can create a pull request to this repository.

## Access the Live Link
If you wish to test the live application, please write to us at contact@mindwebs.org with the subject heading "Access to AgroSmart Web Dashboard". Please feed in your complete developer details, so that we can evaluate and give you the access to it. Please don't forget to write the reason of your request of access. If granted, you will be mailed with the email and password to get into the dashboard.

## Project Creators
1. [Dipan Roy](https://github.com/dipan29)
2. [Ritankar Paul](https://github.com/xritzx)
  
For more details, please check out the Contribution.md and make sure to add your name while submiting a pull request into that file.
  
Thank You!
