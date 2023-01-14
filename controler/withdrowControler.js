const Withdrow = require("../model/withdrowModel");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.withdrowRequest = async (req, res, next) => {
  const { password, PayId, email, withdrowAmoun } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist)
    return res.status(202).send({ success: false, message: "User Not Found!" });

  // compare password
  const matchPassword = await bcrypt.compare(password, userExist.password);
  if (!matchPassword)
    return res
      .status(202)
      .send({ success: false, message: "Please Valid Password" });
  userExist.balance = parseInt(userExist.balance) - parseInt(withdrowAmoun);
  userExist.save();
  await Withdrow.create({
    PayId,
    email,
    withdrowAmoun: parseInt(withdrowAmoun),
  });
  res.send({ success: true, message: "processing Successfull. Please wait" });
};
