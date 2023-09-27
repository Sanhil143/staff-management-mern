const mongoose = require("mongoose");

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
  organisation:{
      type:String,
      required:true
  },
  organisation:{
      type:String,
  },
  role:{
      type:String,
      enum:['Admin','Employee'],
      default:'Admin',
      required:true
  },
  email: {
    type: String,
    unique: true,
    required:true
  },
  mobile: {
    type: Number,
    unique: true,
    required:true
  },
  profilePic:{
      type:String
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