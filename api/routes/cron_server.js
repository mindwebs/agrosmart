const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const Controller = require('../models/Controller');
const Node_data = require('../models/Node_data');
const Activity = require('../models/Activity');
const Cron = require('../models/Cron');

router.post('/create', async (req, res) => {
    const { controllerID } = req.body;
    const { propertyID } = req.body;
    const { cronType } = req.body;
    const { key } = req.body;
    const { value } = req.body;
    const { cronTime } = req.body;
    const cronID = shortid.generate();;

    try {
        let cron = new Cron({
            cronID,
            cronType,
            controllerID,
            propertyID,
            key,
            value,
            cronTime,
            createTime: new Date()
        });

        let update = await cron.save();
        if(update) {
            res.status(200).json(cron);
        } else {
            res.status(200).json('There was some error, please try again');
        }
    } catch (err) {
        res.status(500).json('There was some error.');
        console.log(err);
    }

});

router.post('/delete', async (req, res) => {
    const { cronID } = req.body;
    let find = await Cron.findOne({ cronID });
    let update = await Cron.deleteOne({ cronID });
    if(update && find) {
        res.status(200).json('Deleted');
    } else {
        res.status(200).json('Could not find Cron ID');
    }
});

module.exports = router;