const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const sendToken = require("../utilitis/sendToken");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, userId, whatsApp, invitedCode } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(202)
        .send({ success: false, message: "User allready exsits" });
    }

    console.log(user);
    //     password hassing
    const salt = await bcrypt.genSalt(6);
    const hassPassword = await bcrypt.hash(password, salt);

    const addedUser = await User.create({
      name,
      email,
      password: hassPassword,
      userId,
      whatsApp,
      invitedCode,
    });

    sendToken(addedUser, 200, res);
  } catch (e) {
    console.log(e);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist)
    return res.status(202).send({ success: false, message: "User Not Found!" });

  // compare password
  const matchPassword = await bcrypt.compare(password, userExist.password);
  if (!matchPassword)
    return res
      .status(202)
      .send({ success: false, message: "Please Valid Password" });

  sendToken(userExist, 200, res);
};

exports.getAllUser = async (req, res, next) => {
  const user = await User.find({});
  res.send({ success: true, user });
};

exports.singleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send({ success: false, message: "user not find" });

  res.send({ success: true, user });
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "user Not Found",
      });
    } else {
      user.remove();
      res.status(200).json({
        success: true,
        message: "User Delete Successfull",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const email = req.params.email;
    const adminRequester = req.decoded.email;
    const requestAdmin = await User.findOne({ email: adminRequester });
    if (requestAdmin.role == "owner") {
      const roleAction = req.query.roleAction;

      if (roleAction == "controler") {
        const makeAdmin = await User.updateOne(
          { email },
          {
            $set: { role: "controler" },
          }
        );
        if (makeAdmin.modifiedCount > 0) {
          res.status(200).json({
            success: true,
            message: "Advaiser Make Successfull",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Advaiser request fail",
          });
        }
      } else if (roleAction === "owner") {
        const makeUser = await User.updateOne(
          { email },
          {
            $set: { role: "owner" },
          }
        );
        if (makeUser.modifiedCount > 0) {
          res.status(200).json({
            success: true,
            message: "Owner Make Succssfull",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Owner request fail",
          });
        }
      }
    } else {
      res.status(403).send({ message: "forbiden Accescc" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.removeAdmin = async (req, res, next) => {
  try {
    const email = req.params.email;

    const adminRequester = req.decoded.email;
    console.log(adminRequester);
    const requestAdmin = await User.findOne({ email: adminRequester });
    if (requestAdmin.role == "owner") {
      const roleAction = req.query.roleAction;
      if (roleAction == "user") {
        const makeAdmin = await User.updateOne(
          { email },
          {
            $set: { role: "user" },
          }
        );
        if (makeAdmin.modifiedCount > 0) {
          res.status(200).json({
            success: true,
            message: "Remove Admin Role",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Remove request fail",
          });
        }
      }
    } else {
      res.status(403).send({ message: "forbiden Accescc" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.cheackAdmin = async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    console.log(email);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      const isAdmin = user.role === "owner" || user.role === "controler";
      res.status(200).json({
        success: true,
        admin: isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
