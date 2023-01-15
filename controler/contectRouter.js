const Contect = require("../model/contectModel");

exports.createContect = async (req, res, next) => {
  try {
    const { name, phone, email, subject, message } = req.body;
    const sendProudcts = await Contect.create({
      name,
      phone,
      email,
      subject,
      message,
    });
    res.status(200).json({
      success: true,
      message: "Message Send Successfull",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllContectList = async (req, res, next) => {
  try {
    const contect = await Contect.find({});
    res.send({ success: true, contect });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteContect = async (req, res, next) => {
  try {
    const id = req.params.id;
    let contect = await Contect.findById(id);
    if (!contect) {
      res.status(500).json({
        success: false,
        message: "contect Not found",
      });
    }
    await contect.remove();
    res.status(200).json({
      success: true,
      message: "Message Delete Successfull",
    });
  } catch (e) {}
};

exports.getContectDetels = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contect = await Contect.findById(id);
    res.json({
      success: true,
      contect,
    });
  } catch (e) {}
};
