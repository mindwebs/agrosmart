/* This is for relaying the different parameters of the current position of the controller */
const mongoose = require('mongoose');

const controlSchema = new mongoose.Schema({
    propertyID: {type: String, default: 0},
    controllerID: String,
    controllerType: {type: String, default: "ESP8266"},
    relay1: Number, // 0 - Off; 1 - On
    relay2: Number,
    relay3: Number,
    relay4: Number,
    servo1: Number, // 0-180 (in degrees)
    solarIntensity: { type: Number, default: null },
    lastChangedTime: { type: Date, default: Date.now },
    createTime: String
},{
  collection: 'controllers',
});

module.exports = mongoose.model('Controller', controlSchema);