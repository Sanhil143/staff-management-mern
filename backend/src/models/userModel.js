const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  designation:{
      type:String,
      required:true
  },
  organisationId:{
      type:objectId,
      ref:'organisation',
      required:true
  },
  employeeCode:{
    type:String,
    required:true
  },
  role:{
      type:String,
      enum:['Admin','User'],
      required:true
  },
  email: {
    type: String,
    unique: true,
    required:true
  },
  mobile: {
    type: String,
    unique: true,
    required:true
  },
  password:{
    type:String,
    default:null
  },
  profileUrl:{
      type:String
  },
  address:{
    type:String
  },
  isEmailVerified:{
    type:Boolean,
    default:false
  },
  isMobileVerified:{
    type:Boolean,
    default:false
  },
  isDeleted:{
      type:Boolean,
      default:false
  },
  isActive:{
      type:Boolean,
      default:true
  }
},{timestamps:true});


module.exports = new mongoose.model('user',userSchema)