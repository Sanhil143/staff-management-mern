const cron = require('node-cron');
const attendenceModel = require('../../../models/attendenceModel');
const userModel = require('../../../models/userModel');
const {compressImages} = require('../../../common/imageReducer')
const {validObjectId} = require('../../../common/validators')

cron.schedule('0 0 * * *', async () => {
      try {
        // Find all attendance records for the current day that are missing punch-out times
        const currentDate = new Date();
        const startOfDay = new Date(currentDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 59, 999);
    
        const absentEmployees = await attendenceModel.find({
          punchInTime: { $gte: startOfDay, $lte: endOfDay },
          punchOutTime: null,
        });
    
        // Set the absent status for these employees
        for (const record of absentEmployees) {
          record.punchOutTime = currentDate;
          record.attendenceStatus = 'Absent';
          await record.save();
        }
    
        console.log('Updated attendance records for absent employees.');
      } catch (error) {
        console.error('Error updating attendance records:', error);
      }
    });

const punchIn = async(req,res) => {
      try {
            const userId = req.params.userId;
            const image = req.files;
            if(!userId){
                  return res.status(400).send({status:false,error:'userId is required'});
            }
            if (!validObjectId(userId)) {
                  return res.status(400).send({ status: false, error: "Please enter valid userId on param" })
            }
            const checkUser = await userModel.findOne({_id:userId,isActive:true,isDeleted:false})
            if(!checkUser){
                  return res.status(404).send({status:false,error:'user not found'});
            }
            if(!image){
                  return res.status(400).send({status:false,error:'image is required'});
            }
            const folderPath = './images/punchIn';
            const imageUrl = await compressImages(image,folderPath);
            const obj = {};
            obj.userId = userId;
            obj.punchInTime = Date.now();
            obj.punchInImage = imageUrl;
            obj.punchInAddress = 'Jabalpur';
            obj.attendanceStatus = 'Present';

            const savedPunchin = await attendenceModel.create(obj);
            if(!savedPunchin){
                  return res.status(400).send({status:false,error:'error during punchIn'});
            }
            return res.status(200).send({status:true,message:'attendence saved successfully'});
      } catch (error) {
            return res.status(500).send({status:false,error:error.message})
      }
}



module.exports = {punchIn};