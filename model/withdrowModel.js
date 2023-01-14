const mongoose = require("mongoose");
const withdrowShema = new mongoose.Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User' ,
//     required: [true, "Please Enter userId"],
//   },
PayId: {
    type: Number,
    required: [true, "Please Enter Number"],
  },
  withdrowAmoun: {
    type: Number,
    required: [true, "Please Enter Money"],
  },
  email: {
    type: String,
    required: true,
  },
});

const withdrowModel = new mongoose.model("Withdrow", withdrowShema);

module.exports = withdrowModel;
