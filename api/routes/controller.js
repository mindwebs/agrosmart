const express = require('express');
const router = express.Router();

const Controller = require('../models/Controller');

const shortid = require('shortid');

router.post('/getControllers', async (req, res) => {
    const { propertyID } = req.body;

    var controllerDetails = [];
    try {
        Controller.find({ propertyID } , function(err, nodes, next) {
            if(err){
                res.status(500).json('Some Error Occured');
                console.log(err);
                next();
            }
            controllerDetails.push(nodes);
            res.status(200).json( { controllerDetails });
        }).select("controllerID controllerType");            
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        let controller = await Controller.findOne({ controllerID: req.params.id });

        if (controller) {
            /* Create the Required JSON */
            var controllerID = controller.controllerID;
            var relay1 = controller.relay1;
            var relay2 = controller.relay2;
            var relay3 = controller.relay3;
            var relay4 = controller.relay4;
            var servo1 = controller.servo1;
            var solarIntensity = controller.solarIntensity||0;

            var lastChangedTime = controller.lastChangedTime;
            var returnJson = { controllerID, relay1, relay2, relay3, relay4, servo1, solarIntensity, lastChangedTime };
            return res.status(200).json(returnJson);
        } else {
            var createTime = new Date();
            var controllerID = req.params.id;
            let controller = new Controller({
                propertyID: "UNSET",
                controllerID,
                relay1: 0,
                relay2: 0,
                relay3: 0,
                relay4: 0,
                servo1: 90,
                solarIntensity: 0,
                createTime
            });
            await controller.save();
            var returnJson = { controllerID:req.params.id, relay1:0, relay2:0, relay3:0, relay4:0, servo1:90};
            return res.status(200).json(returnJson);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json('Internal Server Error.');
    }
});

// #Depricated : Implemented creation in the get method to avoid object absence check/conflicts
router.post('/create', async (req, res) => {
    const propertyID = req.body.propertyId;
    const controllerType = req.body.controllerType;
    // let controllerID = shortid.generate();;
    const controllerID = req.body.controllerId;
    let controllerId = controllerID;

    try {
        let controller = await Controller.findOne({ controllerID });
        var success = true;
        if (controller) {
            res.status(200).json({ success, controllerId })
        } else {
            var createTime = new Date();
            let controller = new Controller({
                propertyID,
                controllerID,
                controllerType,
                relay1: 0,
                relay2: 0,
                relay3: 0,
                relay4: 0,
                servo1: 90,
                solarIntensity: 0,
                createTime
            });

            await controller.save();
            res.status(200).json({ success, controllerId })
            //res.json(controller);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }
});

router.post('/update', async (req, res) => {
    const { controllerID } = req.body;
    let { relay1 } = req.body?req.body:0;
    let { relay2 } = req.body?req.body:0;
    let { relay3 } = req.body?req.body:0;
    let { relay4 } = req.body?req.body:0;
    let { servo1 } = req.body?req.body:90;

    try {
        let controller = await Controller.findOne({ controllerID });
        if (controller) {
            let update = await Controller.updateOne({ controllerID }, { $set: { relay1, relay2, relay3, relay4, servo1 } });
            if (update) {
                res.status(200).json('Controller Status Updated, Acknoledged!');
            } else {
                res.status(502).json('There was some error!');
            }
        } else {
            res.status(404).json('Controller ID not Found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
});

router.post('/change', async (req, res) => {
    const { controllerID } = req.body;
    const { propertyID } = req.body;
    const { key } = req.body; //1,2,3,4, 5 - servo
    const { value } = req.body;
    let update, relay1, relay2, relay3, relay4, servo1;

    try {
        let controller = await Controller.findOne({ controllerID });
        if (controller) {
            if ( key == 1 ) {
                relay1 = value;
                update = await Controller.updateOne({ controllerID }, { $set: { relay1 } });
            } else if ( key == 2 ) {
                relay2 = value;
                update = await Controller.updateOne({ controllerID }, { $set: { relay2 } });
            } else if ( key == 3 ) {
                relay3 = value;
                update = await Controller.updateOne({ controllerID }, { $set: { relay3 } });
            } else if ( key == 4 ) {
                relay4 = value;
                update = await Controller.updateOne({ controllerID }, { $set: { relay4 } });
            } else if ( key == 5 ) {
                servo1 = value;
                update = await Controller.updateOne({ controllerID }, { $set: { servo1 } });
            } else {
                update = null;
            }       
            
            
            if (update) {
                res.status(200).json('Controller Status Updated, Acknoledged!');
            } else {
                res.status(200).json('There was some error!');
            }
        } else {
            res.status(200).json('Controller ID not Found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
});

router.post('/solar', async (req, res) => {
    const { controllerID } = req.body;
    const { solarIntensity } = req.body;

    try {
        let controller = await Controller.findOne({ controllerID });
        if (controller) {
            let update = await Controller.updateOne({ controllerID }, { $set: { solarIntensity } });
            if (update) {
                res.status(200).json('Solar Intensity Status Update, Acknoledged!');
            } else {
                res.status(502).json('There was some error!');
            }
        } else {
            res.status(404).json('Controller ID not Found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error!');
    }
});

module.exports = router;