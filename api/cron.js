// CRON SERVICES
//const express = require('express');
//const connectDB = require('./config/db');

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        //console.log('MongoDB Connected...');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();

const Cron = require('./models/Cron');
const Controller = require('./models/Controller');
const Node_data = require('./models/Node_data');

let d = new Date();
let now = d.toISOString();

const expired = false;

async function cronFunction() {

    try {
        Cron.find({ expired }, function (err, crons, next) {
            if (err) {
                console.log(err);
                next();
            }
            crons.forEach(cron => {
                console.log(cron.cronID);
                //next();
            });
        })
        return 1;
    } catch (err) {
        console.log(err);
        return 0;
    }
}

if (cronFunction()) {
    //console.log('');
    process.exit();
};

//console.log('Hello World - ' + n);

