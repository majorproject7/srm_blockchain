
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Admin = require('./routes/AdminRoute');
const Teacher = require('./routes/TeacherRoute');
const Stu = require('./routes/StudentRoute');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/srms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(bodyParser.json());
app.use(cors());


app.use('/api/AdminRoute',Admin);
app.use('/api/TeacherRoute',Teacher)
app.use('/api/StudentRoute',Stu);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));