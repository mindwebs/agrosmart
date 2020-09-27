/* This is for the client basis farm/field location details*/ 
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  propertyId: String,
  propertyName: String,
  uniqueCode: String, //Something that is unique to that person who is holding the land, can be land holding no, tax identification no, or anything
  location: String, // Enter Short Address
  latitude: String,
  longitude: String, // Lat Long atleast upto 8 decimals
  elevation: { type: String, default: 0 }, // In Metres only
  area: { type: Number, default: null }, // In Acres Only
  adminName: { type: String, default: "Administrator Default"},
  createDate: { type: String, default: Date.now }
}, {
  collection: 'property'
});

module.exports = mongoose.model('Property', propertySchema);