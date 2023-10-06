const userModel = require("../../../models/userModel");
const organisationModel = require('../../../models/organisationModel');
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
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
    const verifyorganisation = await organisationModel.findOne({ _id: organisationId });
    if (!verifyorganisation) {
      return res
        .status(400)
        .send({ status: false, error: "organisation is not exist" });
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
    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = "Admin";

    const lastEmployee = await userModel
      .findOne({ organisationId: verifyorganisation._id, role: "Admin" })
      .sort({ employeeCode: -1 });
    let nextAdminCode = "";
    if (lastEmployee) {
      const lastCode = lastEmployee.employeeCode;
      const lastNumber = parseInt(lastCode.slice(-3));
      nextAdminCode = `${verifyorganisation.organisationName}-ADM${(
        lastNumber + 1
      )
        .toString()
        .padStart(3, "0")}`;
    } else {
      nextAdminCode = `${verifyorganisation.organisationName}-ADM001`;
    }
    req.body.employeeCode = nextAdminCode;
    const savedData = await userModel.create(req.body);
    if(!savedData){
      return res.status(400).send({status:false,error:'error during admin creation'})
    }
    const responseData = { ...savedData.toObject() };
    delete responseData.password;
    return res.status(201).send({status:true,message:'admin account created successfully',data:responseData})
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { addAdmin };
