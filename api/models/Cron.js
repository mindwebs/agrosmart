const mongoose = require('mongoose');

const cronSchema = new mongoose.Schema({
    cronID: { type: String, default: 'UNSET'},
    createTime: { type: Date, default: Date.now },
    cronType: { type: String, default: 'Once'}, // Once, Daily, 
    controllerID: { type: String, default: null},
    propertyID: { type: String, default: null},
    key: Number, //1-5 for Relays, Servo
    value: Number, //0,1 or 0-180;
    cronTime: { type: Date, default: Date.now },
    expired: { type: Boolean, default: false}
}, {
    collection: 'cron_jobs',
});
module.exports = mongoose.model('Cron', cronSchema);