"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var conatcts = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"]
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  favorite: {
    type: Boolean,
    "default": false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
}, {
  versionKey: false
});
var Contacts = mongoose.model("contacts", conatcts);
module.exports = Contacts;