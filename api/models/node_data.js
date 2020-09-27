
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    propertyID: {type: String, default:"UNSET"},
    deviceID: String,
    deviceType: { type: String, default: "Node"},
    sensorData: [
        { 
          temp: Number,
          humidity: Number,
          moisture: Number,
          solarIntensity: {type: Number, default: 0},
          waterLevel: {type: Number, default: 0},
          timeStamp: {type: Date, default: Date.now}
        }
      ],
},{
  collection: 'node_data',
});

module.exports = mongoose.model('Node_data', dataSchema);