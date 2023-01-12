const mongoose = require("mongoose");
const { Schema } = mongoose;
const gameShema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User' ,
    required: [true, "Please Enter userId"],
  },
  money: {
    type: Number,
    required: [true, "Please Enter Money"],
  },
  gameName: {
    type: String,
    required: [true, "Please Enter Money"],
  },
  PeroidNo: {
    type: Number,
    required: true,
  },
  userIdNumber: {
    type: Number,
    required: true,
  },
});

const gameModel = new mongoose.model("Game", gameShema);

module.exports = gameModel;
