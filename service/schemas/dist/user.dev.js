"use strict";

var mongoose = require("mongoose");

var bCrypt = require("bcryptjs");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  subscription: {
    type: String,
    "enum": ["starter", "pro", "business"],
    "default": "starter"
  },
  token: String
}, {
  versionKey: false
});

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

var User = mongoose.model("users", userSchema);
module.exports = User;