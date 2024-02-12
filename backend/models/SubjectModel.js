const mongoose = require('mongoose');

// Define the subject schema
const subjectSchema = new mongoose.Schema({
    Semester: {
        type: Number,
        required: true
    },
    Subject: [{
        Name: {
            type: String,
            required: true
        },
        SubCode: {
            type: String,
            required: true
        },
        credits: {
            type: Number,
            required: true
        }
    }]
});

// Define the main schema for the Subjects collection
const SubjectsSchema = new mongoose.Schema({
    Department: {
        type: String,
        required: true
    },
    Dep_ID: {
        type: String,
        required: true
    },
    Subjects: [subjectSchema]
});

// Create and export the Subjects model
module.exports = mongoose.model('Subjects', SubjectsSchema,'Subjects');
