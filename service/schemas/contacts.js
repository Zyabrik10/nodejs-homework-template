const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const conatcts = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false }
);

const Contacts = mongoose.model("contacts", conatcts);

module.exports = Contacts;
