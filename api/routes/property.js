const express = require('express');
const router = express.Router();

const shortid = require('shortid');

const Property = require('../models/Property');

router.post('/create', async (req, res) => {
    const propertyId = shortid.generate();;
    const { propertyName } = req.body;
    const { uniqueCode } = req.body;
    const { location } = req.body;
    const { latitude } = req.body;
    const { longitude } = req.body;
    const { elevation } = req.body;
    const { area } = req.body;
    const { adminName } = req.body;
    const createDate = new Date();

    try {
        let property = await Property.findOne({ uniqueCode });

        if(property) {
            var message = 'Prpperty Unique Identifier Already Exists';
            var success = true;
            // var propertyId = property.propertyId;            
            return res.status(200).json({ success, message, propertyId });
        } else {
            property = new Property({
                propertyId,
                propertyName,
                uniqueCode,
                location,
                latitude,
                longitude,
                elevation,
                area,
                adminName,
                createDate
            });

            await property.save();
            var message = 'Property has been created successfully';
            var success = true;
            // var propertyId = property.propertyId;
            res.json({ success, message, propertyId});
        }
    } catch (err) {
        console.error(err);
        var message = 'Server Error! Please Try Again Later.';
        var success = false;
        propertyId = 0;
        res.status(200).json({ success, message, propertyId});
    }

});

router.post('/update', async (req, res) => {
    const uniqueCode = req.body.uniqueCode;
    const propertyId = req.body.propertyId;
    const { latitude } = req.body;
    const { longitude } = req.body;
    const { area } = req.body;
    const { elevation } = req.body;

    try{
        let property = await Property.findOne({ propertyId });
        let mode = "P";

        if (!property) {
            property = await Property.findOne({ uniqueCode });
            mode = "C";
        }

        if(property) {
            if(mode == "P" && uniqueCode == property.uniqueCode) {
                let update = await Property.updateOne({ propertyId }, { $set: { latitude, longitude, elevation, area } });
                if(update) {
                    var message = "Update Successfully!";                    
                    var returnJson = { message, name };
                    res.status(200).json(returnJson);
                } else {
                    res.status(500).json('There was some error.');
                }
            } else if(mode == "C" && propertyId == property.propertyId) {
                let update = await Property.updateOne({ uniqueCode }, { $set: { latitude, longitude, elevation, area } });
                if(update) {
                    var message = "Update Successfully!";
                    var returnJson = { message, propertyId };
                    res.status(200).json(returnJson);
                } else {
                    res.status(500).json('There was some error.');
                }            
            } else {
                res.status(401).json('Unique Code & Property ID did not match! Try again.');
            }
        } else {
            res.status(404).json('Property not Found! Try Again');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
});

router.post('/getProperties', async (req, res) => {
    const {adminName} = req.body;

    var propertyDetails = [];
    try {
        Property.find({ adminName } , function(err, nodes, next) {
            if(err){
                res.status(500).json('Some Error Occured');
                console.log(err);
                next();
            }
            propertyDetails.push(nodes);
            res.status(200).json( { propertyDetails });
        }).select("propertyName propertyId uniqueCode location");            
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
});

module.exports = router;