const mongoose = require("mongoose");
const resultShema = new mongoose.Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User' ,
//     required: [true, "Please Enter userId"],
//   },
 peroid: {
    type: Number,
    required: [true, "Please Enter Number"],
  },
   price: {
    type: String,
    required: [true, "Please Enter Money"],
  },
  winResult: {
    type: String,
    required: true,
  },
});

const resultModel = new mongoose.model("Result", resultShema);

module.exports = resultModel;
