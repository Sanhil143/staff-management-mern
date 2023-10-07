const userModel = require("../../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignin = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
    if (!email && !mobile) {
      return res.status(400).send({
        status: false,
        error: "please provide email or number for signin",
      });
    }
    if (!password) {
      return res
        .status(400)
        .send({ status: false, error: "please provide password for signin" });
    }
    const existingUser = await userModel.findOne({
      $or: [{ email }, { mobile }],
    });
    if (!existingUser) {
      return res
        .status(400)
        .send({ status: false, error: "email or mobile is not exist" });
    }
    const hashedPass = await bcrypt.compare(
      password.trim(),
      existingUser.password
    );
    if (!hashedPass) {
      return res
        .status(400)
        .send({ status: false, error: "Please enter correct password" });
    }
    let token = jwt.sign(
      { userId: existingUser._id, role: existingUser.role },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );
    let responsedata = { ...existingUser.toObject() };
    delete responsedata.password;
    let obj = { responsedata, token };
    return res
      .status(200)
      .send({ status: true, message: "login successfully", data: obj });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { userSignin };
