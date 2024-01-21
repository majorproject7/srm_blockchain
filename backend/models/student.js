const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollno: { type: String, required: true },
    dob: { type: Date, required: true },
    // Add other fields as needed
});

module.exports = mongoose.model('students', studentSchema);