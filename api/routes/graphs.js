const express = require('express');
const router = express.Router();

const Controller = require('../models/Controller');
const Node_data = require('../models/Node_data');


// Fetches all data in a given date Bundles together
router.post('/date', async (req, res) => {
    const { propertyID } = req.body;
    // Feb 26 2020 <-- Format expected
    let { getDate } = req.body;
    let graphData = [];

    try {
        Node_data.find({ 
            propertyID
        }, function(err, nodes, next) {
            if(err){
                res.status(500).json(`Unable to fetch data | Data on ${getData} doesn't Exist`);
                console.log(err);
                next();
            }
            nodes.forEach(node => {
                graphData.push({
                    deviceID: node.deviceID,
                    timeStamps: [],
                    sensorGraph: [
                        {name : "Temperature", data : []},
                        {name : "Humidity", data : []},
                        {name : "Soil Moisture", data : []},
                        {name : "Solar Intensity", data : []}
                    ]
                });

                let last = graphData[graphData.length-1];
                node.sensorData.forEach(dataPack => {
                    if(dataPack.temp!=0 && dataPack.humidity!=0){
                        if(getDate == dataPack.timeStamp.toString().substring(4, 15)){
                            last.sensorGraph[0].data.push(dataPack.temp);
                            last.sensorGraph[1].data.push(dataPack.humidity);
                            last.sensorGraph[2].data.push(dataPack.moisture);
                            last.sensorGraph[3].data.push(dataPack.solarIntensity);
                            // For X-axis plotting
                            last.timeStamps.push(dataPack.timeStamp.toTimeString().substring(0, 8));
                        }
                    }
                });

            });
            res.status(200).json({bundle:graphData});
        }).select("sensorData deviceID");
    } catch (err) {
        console.error(err);
        res.status(500).json('Some error occured!');
    }
});

// Return Day average Data Parameters
router.post('/data', async (req, res) => {
    const { propertyID } = req.body;
    const { params } = req.body;
    let graphData = [];

    try {
        Node_data.find({ 
            propertyID
        }, function(err, nodes, next) {
            if(err){
                res.status(500).json('Some Error Occured');
                console.log(err);
                next();
            }

            nodes.forEach(node => {
                graphData.push({
                    deviceID: node.deviceID,
                    timeStamps: [],
                    sensorGraph: [
                        {name : "Temperature", data : []},
                        {name : "Humidity", data : []},
                        {name : "Soil Moisture", data : []},
                        {name : "Solar Intensity", data : []}
                    ]
                });

                let last = graphData[graphData.length-1];
                let lastTimeStamp=null, temp=null, humidity=null, moisture=null, solarIntensity=null;

                node.sensorData.forEach(dataPack => {
                    if(dataPack.temp!=0 && dataPack.humidity!=0){
                        if(lastTimeStamp == dataPack.timeStamp.toString().substring(0, 10)){
                            temp = Math.round((temp + dataPack.temp)/2);
                            humidity = Math.round((humidity + dataPack.humidity)/2);
                            moisture = Math.round((moisture + dataPack.moisture)/2);
                            solarIntensity = Math.round((solarIntensity + dataPack.solarIntensity)/2);
                            last.sensorGraph[0].data.pop();
                            last.sensorGraph[1].data.pop();
                            last.sensorGraph[2].data.pop();
                            last.sensorGraph[3].data.pop();
                        }else{
                            temp = dataPack.temp;
                            humidity = dataPack.humidity;
                            moisture = dataPack.moisture;
                            solarIntensity = dataPack.solarIntensity;
                            // For X-axis plotting
                            last.timeStamps.push(dataPack.timeStamp.toString().substring(0, 10));
                        }
                        last.sensorGraph[0].data.push(temp);
                        last.sensorGraph[1].data.push(humidity);
                        last.sensorGraph[2].data.push(moisture);
                        last.sensorGraph[3].data.push(solarIntensity);
                        lastTimeStamp = dataPack.timeStamp.toString().substring(0, 10);
                    }
                });

            });
            res.status(200).json({bundle:graphData});
        }).select("sensorData deviceID");
    } catch (err) {
        console.error(err);
        res.status(500).json('Some error occured!');
    }
});

module.exports = router;