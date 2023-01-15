const Result = require("../model/resultModel");

exports.createResult = async (req, res, next) => {
  try {
    await Result.create(req.body);
    res.send({
      success: true,
      message: "Game win Or result published succesfull",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getPeroid = async (req, res, next) => {
  try {
    const peroid = await Result.find();
    const lastPeroid = peroid[peroid.length - 1];
    res.send({ success: true, peroid: lastPeroid.peroid + 1 });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllResult = async (req, res, next) => {
  try {
    const result = await Result.find();
    res.send({ success: true, result });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteResult = async (req, res, next) => {
  try {
    const user = await Result.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Result Not Found",
      });
    } else {
      user.remove();
      res.status(200).json({
        success: true,
        message: "Result Delete Successfull",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
