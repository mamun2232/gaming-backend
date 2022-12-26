const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
  },
  //     avatar: {
  //       public_id: {
  //         type: String,
  //         required: true,
  //       },
  //       url: {
  //         type: String,
  //         required: true,
  //       },
  //     },

  userId: {
    type: String,
    unique: true,
  },
  balance: {
    type: String,
    default: "00",
  },
  whatsApp: {
    type: String,
    default: "no number",
  },
  invitedCode: {
    type: String,
    default: "no Code",
  },
  role: {
    type: String,
    default: "user",
  },
});

userShema.methods.getJWTtoken = function () {
  return jwt.sign({ email: this.email }, process.env.SCRECT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const userModel = new mongoose.model("User", userShema);

module.exports = userModel
