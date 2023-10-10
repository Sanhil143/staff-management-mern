const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");

async function adminMiddle(req, res, next){
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith('Basic ')){
      const credentials = Buffer.from(authHeader.split(" ")[1], "base64")
        .toString("utf-8")
        .split(":");
        console.log(credentials);
      const username = credentials[0];
      const password = credentials[1];
      const validUser = await isValid(username, password);
      if (validUser === true) {
        next();
      } else {
        return res.status(401).send("Unauthorized");
      }
    }else if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      if (decodedToken.role === "Admin") {
        next();
      }
      return res
        .status(403)
        .json({ status: false, error: "Forbidden: Insufficient permissions" });
    }
    else {
      return res.status(401).send('Unauthorized');
    }
  } catch (error) {
    return res.status(401).json({ status: false, error: error.message });
  }
};

const isValid = async (email, pass) => {
  try {
    if (!email) {
      return "email is required";
    }
    const verifyEmail = await userModel.findOne({
      email: email,
    });
    if (!verifyEmail) {
      return "email is not exist";
    }
    if (!pass) {
      return "password is required";
    }
    const hashedPass = await bcrypt.compare(pass, verifyEmail.password);
    if (!hashedPass) {
      return "required correct password";
    }
    if (verifyEmail.role !== "Admin") {
      return false;
    }
    if (verifyEmail && hashedPass) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

module.exports =  {adminMiddle} ;
