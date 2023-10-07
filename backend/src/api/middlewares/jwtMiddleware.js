const jwt = require("jsonwebtoken");


const adminMiddle = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    if (decodedToken.role !== "Admin") {
      return res
        .status(403)
        .json({ status: false, error: "Forbidden: Insufficient permissions" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ status: false, error: "Unauthorized" });
  }
};



module.exports = {adminMiddle}
