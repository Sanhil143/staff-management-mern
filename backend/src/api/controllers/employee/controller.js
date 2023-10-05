const userModel = require('../../../models/userModel');


const createEmployee = async(req,res) => {
      try {
            const {firstName,lastName,designation,organisation,email,mobile} = req.body;
            if(!firstName){
                  return res.status(400).send({status:false,error:'first name is required'})
            }
            if(!lastName){
                  return res.status(400).send({status:false,error:'last name is required'})
            }
            if(!designation){
                  return res.status(400).send({status:false,error:'designation is required'})
            }
            if(!organisation){
                  return res.status(400).send({status:false,error:'organisation is required'})
            }
            if(!email){
                  return res.status(400).send({status:false,error:'email is required'})
            }
            if(!mobile){
                  return res.status(400).send({status:false,error:'email is required'})
            }
            const verifyEmail = await userModel.findOne({email:email})
            if(verifyEmail){
                  return res.status(400).send({status:false,error:'email is already exist'})
            }
            const verifyMobile = await userModel.findOne({mobile:mobile})
            if(verifyMobile){
                  return res.status(400).send({status:false,error:'mobile no. is already exist'})
            }
            
      } catch (error) {
            return res.status(500).send({status:false,error:error.message});
      }
}

module.exports = {createEmployee}
