const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    name: {
      type: String,
    },
    familyName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    img : {
        type: String,
        default: "default.png"
    }
  }, { timestamps: true });



module.exports = mongoose.model("User", userSchema);