const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const sendToken = require("../utilitis/sendToken");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, userId, whatsApp, invitedCode, referId } =
      req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(202)
        .send({ success: false, message: "User allready exsits" });
    }

    if (referId) {
      let refersUser = await User.findOne({ userId: parseInt(referId) });
      console.log(refersUser);
      if (!refersUser) {
        res.status(202).send({ success: false, message: "ReferId Not Valid" });
      }
      console.log(refersUser);
      refersUser.balance = refersUser.balance + 30;
      refersUser.shared = refersUser.shared + 1;
      await refersUser.save();
    }

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

// exports.referingRegisterUser = async (req, res, next) => {
//   try {
//     const { name, email, password, userId, whatsApp, invitedCode , referId } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       return res
//         .status(202)
//         .send({ success: false, message: "User allready exsits" });
//     }

//     //     password hassing
//     const salt = await bcrypt.genSalt(6);
//     const hassPassword = await bcrypt.hash(password, salt);

//     const addedUser = await User.create({
//       name,
//       email,
//       password: hassPassword,
//       userId,
//       whatsApp,
//       invitedCode,
//     });

//     sendToken(addedUser, 200, res);
//   } catch (e) {
//     console.log(e);
//   }
// };
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist)
      return res
        .status(202)
        .send({ success: false, message: "User Not Found!" });

    // compare password
    const matchPassword = await bcrypt.compare(password, userExist.password);
    if (!matchPassword)
      return res
        .status(202)
        .send({ success: false, message: "Please Valid Password" });

    sendToken(userExist, 200, res);
  } catch (e) {}
};

exports.forgatePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      req.status(202).send({ success: false, message: "User Not Found!" });
    }
    //     password hassing
    const salt = await bcrypt.genSalt(6);
    const hassPassword = await bcrypt.hash(password, salt);
    user.password = hassPassword;
    user.save();
    res.send({ success: true, message: "Password Change Successfull" });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllUser = async (req, res, next) => {
  const user = await User.find({});
  res.send({ success: true, user });
};

exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).send({ success: false, message: "user not find" });

    res.send({ success: true, user });
  } catch (e) {}
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
    const adminRequester = req.query.admin;
    const requestAdmin = await User.findOne({ email: adminRequester });
    if (requestAdmin.role == "Admin") {
      const roleAction = req.query.roleAction;

      const makeAdmin = await User.updateOne(
        { email },
        {
          $set: { role: "Admin" },
        }
      );
      if (makeAdmin.modifiedCount > 0) {
        res.status(200).json({
          success: true,
          message: "Admin Make Successfull",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Allready Admin",
        });
      }

      //  if (roleAction === "owner") {
      //   const makeUser = await User.updateOne(
      //     { email },
      //     {
      //       $set: { role: "owner" },
      //     }
      //   );
      //   if (makeUser.modifiedCount > 0) {
      //     res.status(200).json({
      //       success: true,
      //       message: "Owner Make Succssfull",
      //     });
      //   } else {
      //     res.status(200).json({
      //       success: true,
      //       message: "Owner request fail",
      //     });
      //   }
      // }
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

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      const isAdmin = user.role === "Admin";
      console.log(isAdmin);
      res.status(200).json({
        success: true,
        admin: isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const withdrow = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.send({
      success: true,
      message: "Update Successfull",
    });
  } catch (e) {
    console.log(e);
  }
};
