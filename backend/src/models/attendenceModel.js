const mongoose = require('mongoose');


const attendenceSchema = new mongoose.Schema({
      userId : {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true
      },
      punchInTime:{
            type:Date,
            required:true
      },
      punchInImage:{
            type:String,
            required:true
      },
      punchInAddress:{
            type:String,
            default:null
      },
      punchOutTime:{
            type:Date,
            default:null
      },
      punchOutImage:{
            type:String,
            default:null
      },
      punchOutAddress:{
            type:String,
            default:null
      },
      attendanceStatus: {
            type: String,
            enum: ['Present', 'Absent'],
            default: 'Absent' // Default to 'Absent'
      },
},{timestamps:true});

module.exports = new mongoose.model('attendence',attendenceSchema);