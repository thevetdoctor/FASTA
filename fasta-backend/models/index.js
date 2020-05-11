const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
 
  password: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number,
    required: true
  },
  registeredDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("User", userSchema);
