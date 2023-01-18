const mongoose = require("mongoose");
const rechargeShema = new mongoose.Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User' ,
//     required: [true, "Please Enter userId"],
//   },
PayId: {
    type: Number,
    required: [true, "Please Enter Number"],
  },
  RechargeAmoun: {
    type: Number,
    required: [true, "Please Enter Money"],
  },
  email: {
    type: String,
   
  },
  images: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      status: {
        type: String,
        default: "Pending",
      },
  
});

const rechargeModel = new mongoose.model("Rechage", rechargeShema);

module.exports = rechargeModel;
