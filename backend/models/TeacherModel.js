
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
 name : {
  type : String,
  required : true,
 },
 faculty_id :
 {
  type : String,
  required : true,
  unique : true
 },
 contact : {
  type :String,
  required : true,
 },
 email : {
  type : String,
  required : true,
 },
 dob :{
  type : Date,
  required : true
 },
 department_id : {
  type : String,
  required : true
 },
 qualification : {
  type : String,
  required : true,
 },
 login_pwd : {
  type : String,
  required : true,
 },
 image : {
   type : Buffer,
   required : true
 }
 
}
);

module.exports = mongoose.model('Teacher', teacherSchema,'Teacher');

