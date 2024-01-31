
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const LoginRoute = require('./routes/Login');
const AddTeacher = require('./routes/TeacherRoute');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://srmmajorproject1:vDkIIIgtyIvr2YQF@cluster0.ghcwogm.mongodb.net/SRMS', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Middlewares

AddTeacher.AddTeacher();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/DashBoard', LoginRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));