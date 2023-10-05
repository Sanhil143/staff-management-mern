const userModel = require("../../../models/userModel");
const bcrypt = require('bcrypt');
const createAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      designation,
      organisationId,
      email,
      mobile,
      password,
    } = req.body;
    if (!firstName) {
      return res
        .status(400)
        .send({ status: false, error: "first name is required" });
    }
    if (!lastName) {
      return res
        .status(400)
        .send({ status: false, error: "last name is required" });
    }
    if (!designation) {
      return res
        .status(400)
        .send({ status: false, error: "designation is required" });
    }
    if (!organisationId) {
      return res
        .status(400)
        .send({ status: false, error: "organisation is required" });
    }
    const verifyorganisation = await userModel.findOne({ email: email });
    if (verifyorganisation) {
      return res
        .status(400)
        .send({ status: false, error: "email is already exist" });
    }
    if (!email) {
      return res
        .status(400)
        .send({ status: false, error: "email is required" });
    }
    if (!mobile) {
      return res
        .status(400)
        .send({ status: false, error: "email is required" });
    }
    const verifyEmail = await userModel.findOne({ email: email });
    if (verifyEmail) {
      return res
        .status(400)
        .send({ status: false, error: "email is already exist" });
    }
    const verifyMobile = await userModel.findOne({ mobile: mobile });
    if (verifyMobile) {
      return res
        .status(400)
        .send({ status: false, error: "mobile no. is already exist" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ status: false, error: "password is required" });
    }
    req.body.password = await bcrypt.hash(password,10)
    req.body.employeeCode = 'ADM' + 1;
    req.body.role = 'Admin';
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { createAdmin };
