//import mongoose
const mongoose = require("mongoose");

//create schema
const locationSchema = new mongoose.Schema({
    Location: {type: String, require: true},
    city_id: {type: Number, require: true},
    location_id: {type: Number, require: true},
    city: {type: String, require: true},
    state: {type: String, require: true},
    country: {type: String, require: true} 
});

// create model
const LocationModel = mongoose.model("location", locationSchema, "locations");

//export model
module.exports = LocationModel;