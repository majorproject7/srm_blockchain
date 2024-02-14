const mongoose = require('mongoose');

// Define a schema
const ResultSchema = new mongoose.Schema({
  roll_no: {
    type: String,
    required: true
  },
  Department_ID: {
    type: String,
    required: true
  },
  Department_Name: {
    type: String,
    required: true
  },
  Result: [{
    AYear: {
      type: Number,
      required: true
    },
    Semester: {
      type: Number,
      required: true
    },
    SGPA: {
      type: Number,
      required: true
    },
    ExamStatus: {
      type: String,
      enum: ['PASS', 'FAIL'],
      required: true
    },
    PublishingData: {
      type: Date,
      required: true
    },
    GradesList: [{
      subjectCode: {
        type: String,
        required: true
      },
      grade: {
        type: String,
        required: true
      }
    }],
    SHA_HASH: {
      type: String,
      required: true
    },
    Block_Chain_Txn: {
      type: String,
      required: true
    }
  }]
});

// Create a model
const ResultModel = mongoose.model('Result', ResultSchema,'Result');

module.exports = ResultModel;