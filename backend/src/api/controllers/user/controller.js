const userModel = require("../../../models/userModel");

const updateUser = async (req, res) => {
      try {
          const {firstName,lastName,profilePic} = req.body;  
      } catch (error) {
            return res.status(500).send({status:false,message:error.message});
      }
};

module.exports = {updateUser}
