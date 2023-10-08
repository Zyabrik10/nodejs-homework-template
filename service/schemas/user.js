const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false }
);

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

userSchema.methods.generateAvatar = function (email) {
  const emailHash = crypto
    .createHash("md5")
    .update("emailAdress")
    .digest("hex");
  this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
