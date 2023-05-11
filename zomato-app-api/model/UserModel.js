const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
});

const UserModel = mongoose.model("user", UsersSchema, 'user');

module.exports = UserModel;
