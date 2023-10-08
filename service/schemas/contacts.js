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
      require: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Contacts must have an owner"],
    },
  },
  { versionKey: false }
);

const Contacts = mongoose.model("contacts", conatcts);

module.exports = Contacts;
