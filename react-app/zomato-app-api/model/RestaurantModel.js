const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
        thumb: {type: Array, require: true},
        name: {type: String, require: true},
        city: {type: String, require: true},
        location_id:{type: Number, require: true},
        city_id:{type: Number, require: true},
        locality: {type: String, require: true},
        aggregate_rating:{type: Number, require: true},
        rating_text: {type: String, require: true},
        contact_number:{type: Number, require: true},
        cuisines_id:{type: Array, require: true},
        image: {type: String, require: true},
        mealtype_id:{type: Number, require: true},
        cuisines:{type: Array, require: true},
        cost: {type: Number, require: true},
        address: {type: String, require: true},
      
});

const RestaurantModel = mongoose.model("restaurant", restaurantSchema, "restaurants");

module.exports = RestaurantModel;