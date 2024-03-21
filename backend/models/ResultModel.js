const mongoose = require('mongoose');

// Define a schema
const ResultSchema = new mongoose.Schema({
  roll_no : {
    type : String,
    required : true
  },
  Department_Name : {
    type : String,
    required : true
  },
  Published : { type : Boolean,
    required : true
  },
  Released : {
    type : Boolean,
    required : true
  },
  ResNo :{
    type : Number,
    required : true
  }
   ,
  AYear : {
      type : Number,
      required: true
    },
    Semester : {
      type : Number,
      required : true
    },
    SGPA : {
      type: Number,
      required: true
    },
    ExamStatus : {
      type : String,
      enum : ['PASS', 'FAIL'],
      required : true
    },
    PublishingDate: {
      type : Date,
      required: true
    },
    GradesList : [{
      SubjectCode : {
        type :  String,
        required: true
      },
      grade: {
        type : String,
        required: true
      }  
  }],

});

// Create a model
const ResultModel = mongoose.model('Result', ResultSchema,'Result');

module.exports = ResultModel;
