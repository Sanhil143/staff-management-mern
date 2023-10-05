const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
      organisationName:{
            type:String,
            required:true,
            unique:true
      },
      organisationCode:{
            type:String,
            required:true,
            unique:true
      },
      isActive:{
            type:Boolean,
            default:true
      },
      isDelete:{
            type:Boolean,
            default:false
      },

},{timestamps:true});

module.exports = new mongoose.model('organisation',organisationSchema)