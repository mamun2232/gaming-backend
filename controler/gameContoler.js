const Game = require("../model/gameModel");
const User = require('../model/userModel')

exports.playGame = async (req, res, next) => {
  const { money, userId, gameName, PeroidNo } = req.body;

  const userExist = await User.findById(userId);
  if (!userExist)
    return res.status(202).send({ success: false, message: "User Not Found!" });
  const newBalance = parseInt(userExist.balance) - parseInt(money);

  await User.findByIdAndUpdate(
    userId,
    { balance: newBalance },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  await Game.create({ money, userId, gameName, PeroidNo: parseInt(PeroidNo) });
  res.send({
    success: true,
    message: "game start successfull, please wait drow",
  });
};
