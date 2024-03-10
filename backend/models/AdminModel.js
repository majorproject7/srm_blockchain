const mongoose = require('mongoose');

const AdminSchema =  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
        type: String,
        required: true,
      },
    admin_id: {
      type: String,
      required: true,
      unique : true,
    },
    dob : {
      type: Date,
      required : true,
    },
    passwd: {
      type : String,
      required : true,
    },
    
  image : {
    type : String,
    required : true
  }
  });
  

module.exports = mongoose.model('admin', AdminSchema,'admin');