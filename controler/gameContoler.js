const Game = require("../model/gameModel");
const User = require("../model/userModel");
const Result = require("../model/resultModel");
exports.playGame = async (req, res, next) => {
  const { money, userId, gameName, PeroidNo, userIdNumber } = req.body;

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

  const exsitGame = await Game.findOne({
    $and: [{ userId: userId }, { PeroidNo: parseInt(PeroidNo) }, { gameName }],
  });
  console.log(exsitGame);
  if (exsitGame) {
    console.log(exsitGame);
    exsitGame.money = parseInt(exsitGame.money) + parseInt(money);
    await exsitGame.save();
    res.send({
      success: true,
      message: "game start successfull, please wait drow",
    });
  } else {
    await Game.create({
      money: parseInt(money),
      userId,
      gameName,
      PeroidNo: parseInt(PeroidNo),
      userIdNumber,
    });
    res.send({
      success: true,
      message: "game start successfull, please wait drow",
    });
  }
  console.log(exsitGame);
};

exports.findAllGame = async (req, res, next) => {
  const { peroid } = req.params;

  const gameResult = await Game.find({ PeroidNo: peroid });

  if (gameResult.length == 0)
    return res.send({ success: false, message: "game not found" });

  const facebook = gameResult.filter((game) => game.gameName == "facebook");
  const tiktok = gameResult.filter((game) => game.gameName == "Tiktok");

  res.send({ success: true, facebook, tiktok });
};

exports.winGameFacebook = async (req, res, next) => {
  const result = req.body;
  const users = await User.find({});

  // calculate user balance
  const combinedArray = users.reduce((acc, cur) => {
    const user = result.find((item) => item.id == cur._id);
    console.log(user);
    if (user) {
      acc.push({
        id: user.id,
        name: cur.name,
        balance: cur.balance + user.money,
      });
    }
    return acc;
  }, []);

  // update user balance
  combinedArray.forEach(async (item) => {
    console.log(item);
    const user = await User.findOne({ _id: item.id });
    console.log(user);
    user.balance = parseInt(item.balance);
    await user.save();
  });

  res.send({ success: true, message: "Game win Successfull" });
};
exports.winGameTiktok = async (req, res, next) => {
  try {
    const result = req.body;
    const users = await User.find({});

    // calculate user balance
    const combinedArray = users.reduce((acc, cur) => {
      const user = result.find((item) => item.id == cur._id);
      console.log(user);
      if (user) {
        acc.push({
          id: user.id,
          name: cur.name,
          balance: cur.balance + user.money,
        });
      }
      return acc;
    }, []);

    // update user balance
    combinedArray.forEach(async (item) => {
      console.log(item);
      const user = await User.findOne({ _id: item.id });
      console.log(user);
      user.balance = parseInt(item.balance);
      await user.save();
    });

    res.send({ success: true, message: "Game win Successfull" });
  } catch (e) {}
};

exports.myGameRecorde = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const record = await Game.find({ userIdNumber: userId });
    const gameResult = await Result.find({});

    const combaintArray = record.reduce((acc, cur) => {
      const findResult = gameResult.find((item) => item.peroid == cur.PeroidNo);

      // const matchWinResult = findResult.find((item) => item.winResult == cur.gameName)
      if (findResult) {
        acc.push({
          id: cur._id,
          money: cur.money,
          PeroidNo: cur.PeroidNo,
          selectGame: cur.gameName,
          resultGameName: findResult.winResult,
        });
      }

      return acc;

      // console.log(matchWinResult)
    }, []);

    res.send({ success: true, record: combaintArray });
  } catch (e) {}
};

exports.deleteRecode = async (req, res, next) => {
  try {
    const user = await Game.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "recode Not Found",
      });
    } else {
      user.remove();
      res.status(200).json({
        success: true,
        message: " Delete Successfull",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
