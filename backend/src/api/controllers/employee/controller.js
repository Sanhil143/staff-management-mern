const userModel = require('../../../models/userModel');


const addEmployee = async(req,res) => {
      try {
            const {firstName,lastName,designation,organisationId,email,mobile} = req.body;
            if(!firstName){
                  return res.status(400).send({status:false,error:'first name is required'})
            }
            if(!lastName){
                  return res.status(400).send({status:false,error:'last name is required'})
            }
            if(!designation){
                  return res.status(400).send({status:false,error:'designation is required'})
            }
            if(!organisationId){
                  return res.status(400).send({status:false,error:'organisationId is required'})
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
            const savedData = await userModel.create(req.body);
            return res.status(201).send({status:true,message:'employee added successfully', data:savedData});       
      } catch (error) {
            return res.status(500).send({status:false,error:error.message});
      }
}

module.exports = {addEmployee}
