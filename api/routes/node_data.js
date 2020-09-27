const express = require('express');
const router = express.Router();

const Node_data = require('../models/Node_data');
const Controller = require('../models/Controller');

router.post('/send', async (req, res) => {
    const { deviceID } = req.body;
    const { deviceType } = req.body;
    const { propertyID } = req.body;
    const { temperature } = req.body;
    const { humidity } = req.body;
    const { waterLevel } = req.body;
    const { moisture } = req.body;
    const { solarIntensity } = req.body || 0;

    let chunk = {
        temp: temperature == 'nan' ? 0 : temperature,
        humidity: humidity == 'nan' ? 0 : humidity,
        moisture: moisture,
        solarIntensity: solarIntensity,
        waterLevel: waterLevel,
        timeStamp: new Date()
    }
    let sensorData = [chunk];


    let node = await Node_data.findOne({ deviceID: deviceID });
    if (node) {
        // Update the sensor bundle is the device exists
        try {
            node.sensorData.push(chunk);
            await node.save();
            res.json(chunk);
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error Push Failed');
        }
    }
    else {
        try {
            node_data = new Node_data({
                propertyID,
                deviceID,
                deviceType,
                sensorData,
            });
            await node_data.save();
            res.json(node_data);
        }
        catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    }
});

router.post('/setNode', async (req, res) => {
    const { deviceID } = req.body;
    let { deviceType } = req.body;
    let { propertyID } = req.body;

    if (!deviceType)
        deviceType = "SmartPOD Node";

    let node = await Node_data.findOne({ deviceID: deviceID });

    if (node) {
        // Update the sensor bundle is the device exists
        try {
            let controllerID = deviceID;
            let controllerType = deviceType;

            let update = await Node_data.updateOne({ deviceID }, { $set: { propertyID, deviceType } });
            let update2 = await Controller.updateOne({ controllerID }, { $set: { propertyID, controllerType } });
            if (update && update2) {
                var message = "Node has been sucessfully added";
                var success = true;
                var returnJson = ({ success, message });
                res.status(200).json(returnJson);
            } else {
                res.status(200).json('Device Could not be updated, or already updated!');
            }
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error Push Failed');
        }
    } else {
        var message = "Device ID not found. Please Try Again.";
        var success = false;
        var returnJson = ({ success, message });
        res.status(200).json(returnJson);
    }
});


module.exports = router;
