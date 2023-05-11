//import mongoose
const mongoose = require("mongoose");

//create schema
const mealTypeSchema = new mongoose.Schema({
    name:{type: String, require: true},
    content: {type: String, require: true},
    image: {type: String, require: true},
    meal_type: {type: Number, require: true},
});

// create model
const MealTypeModel = mongoose.model("mealtype", mealTypeSchema, "mealtypes");

//export model
module.exports = MealTypeModel;