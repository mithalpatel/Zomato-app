const mongoose = require("mongoose");

const OdrderSchema = new mongoose.Schema({
        username: { type: String, require: true },
        user_Email:{type: String, require: true},
        mobile_no: {type: Number, require: true},
        order_list:{type: Array, require: true},
        total: {type: Number, require: true},
        order_id:{type: String, require: true},
        payment_id:{type: String, require: true},
        order_status: {type: Boolean, require: true},
        address: { type: String, require: true },
        username: { type: String, require: true },
        address:{ type: String, require: true }
    },{
        versionKey: false, //to avoid --v its a version key its shows in mongoDB compass  
    });

const OrderModel = mongoose.model("order", OdrderSchema, "orders");

module.exports = OrderModel;