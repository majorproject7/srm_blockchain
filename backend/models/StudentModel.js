const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  Ayear: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
    enum: ['CSE', 'CSM', 'CSD'], // Add more branches if needed
  },
  section: {
    type: String,
    required: true,
    enum: ['A', 'B'], // Add more sections if needed
  },
  roll_no: {
    type: String,
    required: true,
    unique : true,
  },
  dob : {
    type: Date,
    required : true,
  },
  image : {
    type : String,
    required : true
  }
});

const Student = mongoose.model('Students', studentSchema,'Students');

module.exports = Student;