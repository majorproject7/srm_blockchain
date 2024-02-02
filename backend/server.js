
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const LoginRoute = require('./routes/Login');
const AddTeacher = require('./routes/TeacherRoute');
const AddStu = require('./routes/students');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/srms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Middlewares


app.use(bodyParser.json());
app.use(cors());


app.use('/api/DashBoard', LoginRoute);
app.use('/api/addstu',AddStu);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));