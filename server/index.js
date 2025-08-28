const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
// const  dotenv = require("dotenv");
// dotenv.config()


//load config fromm env file
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//middleware to parse json request body
app.use(express.json());
app.use(cookieParser());


//import routes for user api
const userRoutes = require('./routes/user');
const dashboardRoutes = require('./routes/dashboard');
const profileRoutes = require('./routes/profile');
const studentRoutes = require('./routes/student');
const courseRoutes = require('./routes/course');
const instructorRoutes = require('./routes/instructor');
const adminRoutes = require('./routes/admin');
const cors = require('cors');
app.use(cors()); 

//mount the user aspi routes
app.use("/api/v1", userRoutes);
app.use("/api/v2", dashboardRoutes);
app.use("/api/v3", profileRoutes );
app.use("/api/v4/student", studentRoutes);
app.use("/api/v5/course", courseRoutes);
app.use("/api/v6/instructor", instructorRoutes);
app.use("/api/v7/admin", adminRoutes);


// start the server

app.listen(PORT, ()=>{
    console.log(`srever is started successful at ${PORT}`)
}) 

//connect to the database

const {connect} = require('./config/database');
connect();

//default route
app.get('/', (req, res) =>{
    res.send('get all user')
})