const mongoose = require("mongoose");

//const {ObjectId} = mongoose.Schema.Types;

const menuItemSchema = new mongoose.Schema({
        name: {type: String, require: true },
        description: {type: String, require: true },
        ingridients: {type: Array, require: true },
        image: {type: String, require: true },
        reataurantId: {type: mongoose.Schema.Types.ObjectId},
        qty:{type: Number, require: true },
        cost: {type: Number, require: true }
});

const MenuItemModel = mongoose.model("menuitem", menuItemSchema, "menuitems");

module.exports = MenuItemModel;