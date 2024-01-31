
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    enum: ['CSE', 'CSD', 'CSM', 'IT'], // Enforce valid department values
    required: true
  },
  subjects: [
    {
      type: String,
      required: true
    }
  ],
  subject_references: {
    type: Object,
    required: true
  },
  sections: {
    type :{
      Year1: {
        type: {
          A: [String], // Ensure subject references are strings
          B: [String],
          C: [String]
        }
      },
      Year2: {
        type: Object // Define structure for other years similarly
      },
      Year3: {
        type: Object
      },
      Year4: {
        type: Object
      }
    },
    required: true
  },
  qualifications: [String],
  experience: {
    type: Number,
    min: 0 // Ensure experience is non-negative
  },
  contact: {
    email: {
      type: String,
      required: true,
     
      },
      phone: String
    },
  
  },
  
);

module.exports = mongoose.model('Teacher', teacherSchema,'Teacher');

